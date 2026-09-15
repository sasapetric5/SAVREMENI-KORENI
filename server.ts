import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { generateSitemapXml, updateSitemapFiles } from "./server/sitemapService";
import { generateGoogleMerchantFeedXml } from "./server/googleMerchantFeedService";

async function startServer() {
  const app = express();

  // Port 3000 is hardcoded for nginx container proxy
  const PORT = 3000;

  // Liveness and readiness health checks for Cloud Run and monitoring probes
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Google Search Console & Webmaster verification file endpoints (e.g. google[hash].html)
  app.get("/google:hash.html", (req, res) => {
    const hash = req.params.hash;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(`google-site-verification: google${hash}.html`);
  });

  // Ensure data directory exists for server-persisted custom products
  const dataDir = path.join(process.cwd(), 'data');
  const customProductsFile = path.join(dataDir, 'custom_products.json');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const loadServerCustomProducts = (): any[] => {
    try {
      if (fs.existsSync(customProductsFile)) {
        const raw = fs.readFileSync(customProductsFile, 'utf8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Could not read custom products file:", e);
    }
    return [];
  };

  // Initial sitemap generation on server start
  try {
    const initialCustom = loadServerCustomProducts();
    updateSitemapFiles({ customProducts: initialCustom });
    console.log("✅ Dynamic sitemap initialized on startup");
  } catch (err) {
    console.warn("Failed to generate initial sitemap:", err);
  }

  // Dynamic real-time sitemap.xml endpoint for Googlebot and search engines
  app.get("/sitemap.xml", (req, res) => {
    try {
      const customProducts = loadServerCustomProducts();
      const xml = generateSitemapXml({ customProducts });
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=3600");
      res.status(200).send(xml);
    } catch (err) {
      console.error("Sitemap generation error:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Google Merchant Center RSS 2.0 XML Feed endpoint for Google Shopping Free Listings
  const handleMerchantFeed = (req: express.Request, res: express.Response) => {
    try {
      const isEnglish = req.query.lang === 'en';
      const customProducts = loadServerCustomProducts();
      const xml = generateGoogleMerchantFeedXml({
        isEnglish,
        customProducts
      });
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=3600");
      res.status(200).send(xml);
    } catch (err) {
      console.error("Merchant feed generation error:", err);
      res.status(500).send("Error generating Google Merchant feed");
    }
  };

  app.get("/products-feed.xml", handleMerchantFeed);
  app.get("/merchant-feed.xml", handleMerchantFeed);
  app.get("/google-merchant-feed.xml", handleMerchantFeed);

  // API to trigger on-demand dynamic sitemap regeneration when products/posts change
  app.post("/api/sitemap/regenerate", express.json({ limit: '10mb' }), (req, res) => {
    try {
      let customProducts: any[] = [];
      if (req.body && Array.isArray(req.body.customProducts)) {
        customProducts = req.body.customProducts;
        fs.writeFileSync(customProductsFile, JSON.stringify(customProducts, null, 2), 'utf8');
      } else {
        customProducts = loadServerCustomProducts();
      }

      const extraBlogSlugs = req.body?.extraBlogSlugs || [];
      const result = updateSitemapFiles({ customProducts, extraBlogSlugs });
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      console.error("Regenerate sitemap API error:", err);
      res.status(500).json({ error: err.message || "Failed to regenerate sitemap" });
    }
  });

  // Endpoints to manage server-side custom products and automatically keep sitemap in sync
  app.get("/api/products/custom", (req, res) => {
    const products = loadServerCustomProducts();
    res.json(products);
  });

  app.post("/api/products/custom", express.json({ limit: '10mb' }), (req, res) => {
    try {
      const product = req.body;
      if (!product || !product.id) {
        return res.status(400).json({ error: "Missing product data or id" });
      }

      const current = loadServerCustomProducts();
      const existingIdx = current.findIndex((p: any) => p.id === product.id);
      if (existingIdx >= 0) {
        current[existingIdx] = product;
      } else {
        current.unshift(product);
      }

      fs.writeFileSync(customProductsFile, JSON.stringify(current, null, 2), 'utf8');
      const sitemapRes = updateSitemapFiles({ customProducts: current });

      res.status(200).json({ success: true, product, sitemap: sitemapRes });
    } catch (err: any) {
      console.error("Save custom product error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/products/custom/:id", (req, res) => {
    try {
      const id = req.params.id;
      const current = loadServerCustomProducts();
      const filtered = current.filter((p: any) => p.id !== id);
      fs.writeFileSync(customProductsFile, JSON.stringify(filtered, null, 2), 'utf8');
      const sitemapRes = updateSitemapFiles({ customProducts: filtered });

      res.status(200).json({ success: true, id, sitemap: sitemapRes });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Ensure upload directory exists in public/custom_products or dist/custom_products
  const publicUploadDir = path.join(process.cwd(), 'public/custom_products');
  const distUploadDir = path.join(process.cwd(), 'dist/custom_products');
  const uploadDir = fs.existsSync(publicUploadDir) ? publicUploadDir : distUploadDir;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Fallback workshop craft images in case a custom image is missing
  const fallbackImages = [
    path.join(process.cwd(), 'src/assets/images/etno_unikatna_torba_1789105500674.jpg'),
    path.join(process.cwd(), 'src/assets/images/srpska_subara_moderna_1789021862584.jpg'),
    path.join(process.cwd(), 'src/assets/images/vunene_carape_vez_1789021876638.jpg'),
    path.join(process.cwd(), 'src/assets/images/vezena_kosulja_1789021895745.jpg'),
    path.join(process.cwd(), 'src/assets/images/heklani_nakit_1789021909183.jpg'),
    path.join(process.cwd(), 'src/assets/images/makrame_predja_repromaterijal_1789032495554.jpg'),
    path.join(process.cwd(), 'src/assets/images/vlaska_bela_subara_1789032431671.jpg'),
    path.join(process.cwd(), 'src/assets/images/vezene_carape_folklor_1789032450227.jpg')
  ];

  // Statically serve custom products from both possible locations with caching
  const staticImageOptions = {
    maxAge: '7d',
    immutable: true,
    setHeaders: (res: express.Response) => {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  };
  app.use('/custom_products', express.static(publicUploadDir, staticImageOptions));
  if (fs.existsSync(distUploadDir) && distUploadDir !== publicUploadDir) {
    app.use('/custom_products', express.static(distUploadDir, staticImageOptions));
  }

  // Return 404 for missing custom product images so browser does not fall back to HTML or repeat images
  app.get('/custom_products/:filename', (req, res) => {
    res.status(404).send('Image not found');
  });

  // Raw body parser for file uploads
  app.post("/api/upload", express.raw({ type: '*/*', limit: '50mb' }), (req, res) => {
    try {
      const fileNameHeader = req.headers['x-file-name'] as string;
      if (!fileNameHeader) {
        return res.status(400).json({ error: 'Missing x-file-name header' });
      }

      const fileName = decodeURIComponent(fileNameHeader);
      const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_'); // Sanitize filename
      
      const filePath = path.join(uploadDir, `${Date.now()}_${safeFileName}`);
      
      fs.writeFileSync(filePath, req.body);
      
      // Keep sitemap synchronized with newly uploaded workshop photo
      try {
        const customProds = loadServerCustomProducts();
        updateSitemapFiles({ customProducts: customProds });
      } catch (sitemapErr) {
        console.warn("Could not refresh sitemap on upload:", sitemapErr);
      }

      res.status(200).json({ success: true, path: `/custom_products/${path.basename(filePath)}` });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload' });
    }
  });


  // Get list of uploaded custom photos
  app.get("/api/custom-photos", (req, res) => {
    try {
      if (!fs.existsSync(uploadDir)) {
        return res.json([]);
      }
      const files = fs.readdirSync(uploadDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
      res.json(files.map((file, idx) => ({
        id: `upl-${idx + 1}`,
        fileName: file,
        url: `/custom_products/${file}`
      })));
    } catch (err) {
      console.error("List photos error:", err);
      res.status(500).json({ error: "Failed to list photos" });
    }
  });

  // Determine if running in production or development
  const isProduction = process.env.NODE_ENV === "production" || Boolean(process.argv[1]?.includes("server.cjs"));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA fallback: Return index.html for any GET request that is not an API call
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/custom_products')) {
        return res.sendFile(path.join(distPath, 'index.html'));
      }
      next();
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });

  server.on('error', (err: any) => {
    console.error('Server listener error:', err);
  });
  
  // Ensure the server keeps the Node.js process alive
  if (server && typeof server.ref === 'function') {
    server.ref();
  }
  
  // Keep event loop alive
  setInterval(() => {}, 1000 * 60 * 60);
}

startServer();
