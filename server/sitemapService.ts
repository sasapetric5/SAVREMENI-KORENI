import fs from 'fs';
import path from 'path';
import { productsData } from '../src/data/companyData';
import { blogPostsData } from '../src/data/blogData';
import { seoLandingPages } from '../src/data/seoLandingPagesData';
import { uploadedGalleryPhotos } from '../src/data/uploadedPhotosData';

export const BASE_URL = 'https://savremenikoreni.com';

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface SitemapOptions {
  customProducts?: Array<{ id: string; name?: string; nameEn?: string; category?: string; image?: string }>;
  extraBlogSlugs?: string[];
  lastModDate?: string;
}

/**
 * Dynamically builds sitemap.xml content covering:
 * - Root and bilingual links
 * - Target SEO landing pages (/subare-homolje, /nosnje-i-vez, etc.)
 * - Category filter pages
 * - All core + custom added products with image metadata
 * - All educational blog posts
 * - Complete gallery image index
 */
export function generateSitemapXml(options: SitemapOptions = {}): string {
  const currentDate = options.lastModDate || new Date().toISOString().split('T')[0];

  const catalogCategories = [
    'sve',
    'torbice',
    'subare',
    'carape',
    'kosulje',
    'nakit',
    'dom-pokloni'
  ];

  let allProducts = [...productsData];
  if (options.customProducts && options.customProducts.length > 0) {
    const existingIds = new Set(allProducts.map((p) => p.id));
    options.customProducts.forEach((cp) => {
      if (!existingIds.has(cp.id)) {
        allProducts.push({
          id: cp.id,
          name: cp.name || 'Unikatni ručni rad Savremeni Koreni',
          nameEn: cp.nameEn || 'Handcrafted Art Piece Savremeni Koreni',
          category: (cp.category as any) || 'torbice',
          priceRsd: 0,
          priceEur: 0,
          description: cp.name || '',
          descriptionEn: cp.nameEn || '',
          longDescription: '',
          longDescriptionEn: '',
          craftTechniques: ['Tradicionalni ručni rad'],
          craftTechniquesEn: ['Traditional Handcraft'],
          materials: ['Domaći prirodni materijali'],
          materialsEn: ['Local natural materials'],
          image: cp.image || '',
          images: cp.image ? [cp.image] : [],
          inStock: true,
          leadTimeDays: 7,
          badge: 'Unikat',
          badgeEn: 'Unique'
        });
      }
    });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- 1. Main Homepage (Serbian, English & Diaspora Alternate Links) -->
  <url>
    <loc>${BASE_URL}/</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-RS" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-BA" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-ME" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-DE" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-AT" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-CH" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="de" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="de-DE" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="de-AT" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="de-CH" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-GB" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-CA" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-AU" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${BASE_URL}/logo.jpg</image:loc>
      <image:title>Savremeni Koreni - Tradicionalni Zanati i Ručni Rad</image:title>
      <image:caption>Radionica Savremeni Koreni Jošanica, Žagubica, Homolje</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${BASE_URL}/?lang=en</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="sr-RS" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-GB" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>

  <!-- 2. Target High-Intent SEO Landing Pages -->
`;

  const landingPagesArray = Array.isArray(seoLandingPages) ? seoLandingPages : Object.values(seoLandingPages);

  landingPagesArray.forEach((lp: any) => {
    xml += `  <url>
    <loc>${BASE_URL}${lp.path}</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}${lp.path}" />
    <xhtml:link rel="alternate" hreflang="sr-RS" href="${BASE_URL}${lp.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${lp.path}?lang=en" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${BASE_URL}${lp.path}?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${lp.path}" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${BASE_URL}/logo.jpg</image:loc>
      <image:title>${escapeXml(lp.titleSr)}</image:title>
      <image:caption>${escapeXml(lp.subtitleSr)}</image:caption>
    </image:image>
  </url>
`;
  });

  xml += `
  <!-- 3. Category Filter Pages -->
`;

  catalogCategories.forEach((cat) => {
    xml += `  <url>
    <loc>${BASE_URL}/kategorija/${cat}</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}/kategorija/${cat}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/kategorija/${cat}?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/kategorija/${cat}" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  });

  xml += `
  <!-- 4. Dynamic Products -->
`;

  allProducts.forEach((prod) => {
    const prodTitle = escapeXml(prod.name);
    const prodDesc = escapeXml(prod.description);
    xml += `  <url>
    <loc>${BASE_URL}/?proizvod=${prod.id}</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}/?proizvod=${prod.id}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/?proizvod=${prod.id}&amp;lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/?proizvod=${prod.id}" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${BASE_URL}/logo.jpg</image:loc>
      <image:title>${prodTitle}</image:title>
      <image:caption>${prodDesc}</image:caption>
    </image:image>
  </url>
`;
  });

  xml += `
  <!-- 5. Educational SEO Blog Articles -->
`;

  blogPostsData.forEach((post) => {
    const postTitle = escapeXml(post.title);
    const postExcerpt = escapeXml(post.excerpt);
    xml += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}/blog/${post.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/blog/${post.slug}?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/${post.slug}" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>${BASE_URL}/logo.jpg</image:loc>
      <image:title>${postTitle}</image:title>
      <image:caption>${postExcerpt}</image:caption>
    </image:image>
  </url>
`;
  });

  xml += `
  <!-- 6. Google Image Search Index -->
  <url>
    <loc>${BASE_URL}/#galerija</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${BASE_URL}/#galerija" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/?lang=en#galerija" />
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
`;

  uploadedGalleryPhotos.forEach((photo) => {
    xml += `    <image:image>
      <image:loc>${BASE_URL}/logo.jpg</image:loc>
      <image:title>${escapeXml(photo.caption || 'Unikatna rukotvorina majstora Tanje Petrić')}</image:title>
      <image:caption>Autentični ručni rad iz radionice Savremeni Koreni u Homolju</image:caption>
    </image:image>
`;
  });

  xml += `  </url>
</urlset>`;

  return xml;
}

export function updateSitemapFiles(options: SitemapOptions = {}) {
  const xml = generateSitemapXml(options);
  const publicPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  const distPath = path.resolve(process.cwd(), 'dist', 'sitemap.xml');

  try {
    const publicDir = path.dirname(publicPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(publicPath, xml, 'utf8');
  } catch (err) {
    console.error('Failed to write sitemap to public/:', err);
  }

  try {
    if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
      fs.writeFileSync(distPath, xml, 'utf8');
    }
  } catch (err) {
    console.error('Failed to write sitemap to dist/:', err);
  }

  const urlMatches = xml.match(/<url>/g);
  const imageMatches = xml.match(/<image:image>/g);

  return {
    xml,
    urlCount: urlMatches ? urlMatches.length : 0,
    imageCount: imageMatches ? imageMatches.length : 0,
    timestamp: new Date().toISOString()
  };
}
