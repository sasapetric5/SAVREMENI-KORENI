import fs from 'fs';
import path from 'path';

function verifySeo() {
  console.log('🔍 Starting SEO, Hreflang & Canonical verification for savremenikoreni.com...\n');

  const indexPath = path.resolve(process.cwd(), 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Error: index.html not found!');
    process.exit(1);
  }

  const htmlContent = fs.readFileSync(indexPath, 'utf-8');

  // 1. Check Canonical URL
  const canonicalMatch = htmlContent.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i);
  if (canonicalMatch) {
    const canonicalUrl = canonicalMatch[1];
    console.log(`✅ Canonical Tag found: ${canonicalUrl}`);
    if (canonicalUrl.startsWith('https://savremenikoreni.com')) {
      console.log(`   -> OK: Points correctly to production domain.`);
    } else {
      console.warn(`   -> WARNING: Canonical does not start with https://savremenikoreni.com`);
    }
  } else {
    console.error(`❌ Error: Canonical tag missing in index.html!`);
  }

  // 2. Check Hreflang Tags
  const hreflangRegex = /<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/?>/g;
  let match;
  let hreflangCount = 0;
  const domain = 'https://savremenikoreni.com';

  console.log('\n--- Hreflang Tags Analysis ---');
  while ((match = hreflangRegex.exec(htmlContent)) !== null) {
    hreflangCount++;
    const lang = match[1];
    const href = match[2];
    const isDomainCorrect = href.startsWith(domain);
    console.log(`[${lang}] -> ${href} ${isDomainCorrect ? '✅' : '❌ (Invalid domain)'}`);
  }

  console.log(`\n📊 Total verified hreflang links: ${hreflangCount}`);

  // 3. Check Sitemap if exists
  const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    console.log(`\n✅ sitemap.xml exists and contains ${urlCount} indexed URLs.`);
  } else {
    console.warn(`\n⚠️ sitemap.xml not found in public/. Run 'npm run generate:sitemap' first.`);
  }

  console.log('\n✨ SEO & Hreflang verification completed successfully!');
}

verifySeo();
