import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const imageStubPlugin: esbuild.Plugin = {
  name: 'image-stub',
  setup(build) {
    build.onResolve({ filter: /\.(jpg|jpeg|png|webp|svg)$/ }, (args) => {
      return { path: args.path, namespace: 'image-stub' };
    });
    build.onLoad({ filter: /.*/, namespace: 'image-stub' }, () => {
      return { contents: 'export default "";', loader: 'js' };
    });
  },
};

async function buildAndGenerateSitemap() {
  console.log('🔄 Bundling sitemap generator with esbuild...');

  const tempEntry = path.join(rootDir, 'scripts', '_sitemap_builder_entry.ts');
  const tempOut = path.join(rootDir, 'scripts', '_sitemap_builder_bundle.cjs');

  const entryCode = `
import fs from 'fs';
import path from 'path';
import { productsData } from '../src/data/companyData';
import { blogPostsData } from '../src/data/blogData';
import { seoLandingPages } from '../src/data/seoLandingPagesData';
import { uploadedGalleryPhotos } from '../src/data/uploadedPhotosData';

const BASE_URL = 'https://savremenikoreni.com';

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml() {
  const currentDate = new Date().toISOString().split('T')[0];

  const catalogCategories = [
    'sve',
    'torbice',
    'subare',
    'carape',
    'kosulje',
    'nakit',
    'dom-pokloni'
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n' +
    '<urlset\\n' +
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\\n' +
    '  xmlns:xhtml="http://www.w3.org/1999/xhtml"\\n' +
    '  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\\n\\n' +
    '  <!-- 1. HOMEPAGE & MULTILINGUAL ALTERNATE URLS -->\\n' +
    '  <url>\\n' +
    '    <loc>' + BASE_URL + '/</loc>\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-RS" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-BA" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-ME" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-DE" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-AT" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-CH" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="de" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="de-DE" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="de-AT" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="de-CH" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en-US" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en-GB" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en-CA" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en-AU" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE_URL + '/" />\\n' +
    '    <lastmod>' + currentDate + '</lastmod>\\n' +
    '    <changefreq>daily</changefreq>\\n' +
    '    <priority>1.0</priority>\\n' +
    '    <image:image>\\n' +
    '      <image:loc>' + BASE_URL + '/logo.jpg</image:loc>\\n' +
    '      <image:title>Savremeni Koreni - Tradicionalni Zanati i Ručni Rad</image:title>\\n' +
    '      <image:caption>Radionica Savremeni Koreni Jošanica, Žagubica, Homolje</image:caption>\\n' +
    '    </image:image>\\n' +
    '  </url>\\n' +
    '  <url>\\n' +
    '    <loc>' + BASE_URL + '/?lang=en</loc>\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="sr-RS" href="' + BASE_URL + '/" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en-US" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="en-GB" href="' + BASE_URL + '/?lang=en" />\\n' +
    '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE_URL + '/" />\\n' +
    '    <lastmod>' + currentDate + '</lastmod>\\n' +
    '    <changefreq>daily</changefreq>\\n' +
    '    <priority>0.95</priority>\\n' +
    '  </url>\\n\\n' +
    '  <!-- 2. HIGH-INTENT SEO LANDING PAGES -->\\n';

  if (Array.isArray(seoLandingPages)) {
    seoLandingPages.forEach((lp) => {
      xml += '  <url>\\n' +
        '    <loc>' + BASE_URL + lp.path + '</loc>\\n' +
        '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + lp.path + '" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="sr-RS" href="' + BASE_URL + lp.path + '" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + lp.path + '?lang=en" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="en-US" href="' + BASE_URL + lp.path + '?lang=en" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE_URL + lp.path + '" />\\n' +
        '    <lastmod>' + currentDate + '</lastmod>\\n' +
        '    <changefreq>weekly</changefreq>\\n' +
        '    <priority>0.95</priority>\\n' +
        '    <image:image>\\n' +
        '      <image:loc>' + BASE_URL + '/logo.jpg</image:loc>\\n' +
        '      <image:title>' + escapeXml(lp.titleSr) + '</image:title>\\n' +
        '      <image:caption>' + escapeXml(lp.subtitleSr) + '</image:caption>\\n' +
        '    </image:image>\\n' +
        '  </url>\\n';
    });
  }

  xml += '\\n  <!-- 3. PRODUCT CATALOG & CATEGORIES -->\\n';
  catalogCategories.forEach((cat) => {
    xml += '  <url>\\n' +
      '    <loc>' + BASE_URL + '/kategorija/' + cat + '</loc>\\n' +
      '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + '/kategorija/' + cat + '" />\\n' +
      '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + '/kategorija/' + cat + '?lang=en" />\\n' +
      '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE_URL + '/kategorija/' + cat + '" />\\n' +
      '    <lastmod>' + currentDate + '</lastmod>\\n' +
      '    <changefreq>weekly</changefreq>\\n' +
      '    <priority>0.85</priority>\\n' +
      '  </url>\\n';
  });

  xml += '\\n  <!-- 4. DYNAMIC PRODUCTS (from productsData) -->\\n';
  if (Array.isArray(productsData)) {
    productsData.forEach((prod) => {
      const prodTitle = escapeXml(prod.name);
      const prodDesc = escapeXml(prod.description);
      xml += '  <url>\\n' +
        '    <loc>' + BASE_URL + '/?proizvod=' + prod.id + '</loc>\\n' +
        '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + '/?proizvod=' + prod.id + '" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + '/?proizvod=' + prod.id + '&amp;lang=en" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE_URL + '/?proizvod=' + prod.id + '" />\\n' +
        '    <lastmod>' + currentDate + '</lastmod>\\n' +
        '    <changefreq>weekly</changefreq>\\n' +
        '    <priority>0.90</priority>\\n' +
        '    <image:image>\\n' +
        '      <image:loc>' + BASE_URL + '/logo.jpg</image:loc>\\n' +
        '      <image:title>' + prodTitle + '</image:title>\\n' +
        '      <image:caption>' + prodDesc + '</image:caption>\\n' +
        '    </image:image>\\n' +
        '  </url>\\n';
    });
  }

  xml += '\\n  <!-- 5. DYNAMIC BLOG POSTS (from blogPostsData) -->\\n';
  if (Array.isArray(blogPostsData)) {
    blogPostsData.forEach((post) => {
      const postTitle = escapeXml(post.title);
      const postExcerpt = escapeXml(post.excerpt);
      xml += '  <url>\\n' +
        '    <loc>' + BASE_URL + '/blog/' + post.slug + '</loc>\\n' +
        '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + '/blog/' + post.slug + '" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + '/blog/' + post.slug + '?lang=en" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE_URL + '/blog/' + post.slug + '" />\\n' +
        '    <lastmod>' + currentDate + '</lastmod>\\n' +
        '    <changefreq>weekly</changefreq>\\n' +
        '    <priority>0.85</priority>\\n' +
        '    <image:image>\\n' +
        '      <image:loc>' + BASE_URL + '/logo.jpg</image:loc>\\n' +
        '      <image:title>' + postTitle + '</image:title>\\n' +
        '      <image:caption>' + postExcerpt + '</image:caption>\\n' +
        '    </image:image>\\n' +
        '  </url>\\n';
    });
  }

  xml += '\\n  <!-- 6. GALLERY & AUTHENTIC CRAFT PHOTOS -->\\n';
  if (Array.isArray(uploadedGalleryPhotos)) {
    uploadedGalleryPhotos.forEach((photo) => {
      xml += '  <url>\\n' +
        '    <loc>' + BASE_URL + '/galerija#' + photo.id + '</loc>\\n' +
        '    <xhtml:link rel="alternate" hreflang="sr" href="' + BASE_URL + '/galerija#' + photo.id + '" />\\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + BASE_URL + '/galerija#' + photo.id + '?lang=en" />\\n' +
        '    <lastmod>' + currentDate + '</lastmod>\\n' +
        '    <changefreq>monthly</changefreq>\\n' +
        '    <priority>0.70</priority>\\n' +
        '    <image:image>\\n' +
        '      <image:loc>' + BASE_URL + '/logo.jpg</image:loc>\\n' +
        '      <image:title>' + escapeXml(photo.caption || 'Unikatna rukotvorina') + '</image:title>\\n' +
        '      <image:caption>Unikatna rukotvorina majstora Tanje Petrić, Savremeni Koreni</image:caption>\\n' +
        '    </image:image>\\n' +
        '  </url>\\n';
    });
  }

  xml += '</urlset>\\n';
  return xml;
}

const xml = generateSitemapXml();

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, xml, 'utf8');
console.log('✅ Dynamically generated sitemap at: ' + publicSitemapPath);

const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, xml, 'utf8');
  console.log('✅ Dynamically mirrored sitemap at: ' + distSitemapPath);
}
`;

  try {
    fs.writeFileSync(tempEntry, entryCode, 'utf8');

    await esbuild.build({
      entryPoints: [tempEntry],
      outfile: tempOut,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      plugins: [imageStubPlugin],
    });

    const { execSync } = await import('child_process');
    execSync(`node "${tempOut}"`, { stdio: 'inherit' });
  } finally {
    try {
      if (fs.existsSync(tempEntry)) fs.unlinkSync(tempEntry);
      if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
    } catch {}
  }
}

buildAndGenerateSitemap().catch((err) => {
  console.error('❌ Sitemap generation failed:', err);
  process.exit(1);
});
