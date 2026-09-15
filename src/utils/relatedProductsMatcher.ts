import { BlogPost, Product } from '../types';
import { productsData } from '../data/companyData';
import { seoLandingPages } from '../data/seoLandingPagesData';

export interface MatchedLandingPage {
  slug: string;
  path: string;
  title: string;
  badge: string;
  subtitle: string;
}

export interface BlogRelatedContent {
  products: Product[];
  landingPage?: MatchedLandingPage;
}

// Category mapping helper
const blogToProductCategories: Record<string, string[]> = {
  vez: ['kosulje', 'dom-pokloni'],
  nosnja: ['subare', 'kosulje', 'carape'],
  torbe: ['torbice'],
  vuna: ['carape', 'subare'],
  zanati: ['nakit', 'torbice'],
  tradicija: ['dom-pokloni', 'subare', 'kosulje', 'carape'],
  'materijali-pribor': ['dom-pokloni', 'kosulje']
};

// Keyword mapping for specific crafts
const keywordTriggers: { words: string[]; productIds: string[]; landingSlug?: string }[] = [
  {
    words: ['opanci', 'opanak', 'opancima', 'obuca', 'kud', 'šiljkani', 'kljun'],
    productIds: ['sk-opanci-01', 'sk-carape-01', 'sk-carape-02'],
    landingSlug: 'opanci-i-folklorna-obuca'
  },
  {
    words: ['šubara', 'subara', 'subare', 'šubare', 'krzno', 'jagnjece', 'vlaška', 'vlaska'],
    productIds: ['sk-subara-01', 'sk-subara-02'],
    landingSlug: 'subare-homolje'
  },
  {
    words: ['zlatovez', 'srma', 'srmom', 'jelek', 'plis', 'pliš', 'vez sa zlatnom niti'],
    productIds: ['sk-nosnja-02', 'sk-kosulja-02'],
    landingSlug: 'zlatovez-i-srma'
  },
  {
    words: ['čarape', 'carape', 'nazuvice', 'pet igala', 'stopala', 'lekovitost vune', 'lanolin'],
    productIds: ['sk-carape-01', 'sk-carape-02'],
    landingSlug: 'vunene-carape'
  },
  {
    words: ['makrame', 'cvorovanje', 'čvorovanje', 'kanap', 'ceger', 'pamucni kanap', 'torbe'],
    productIds: ['sk-torba-01', 'sk-nakit-01'],
    landingSlug: 'unikatne-makrame-torbe'
  },
  {
    words: ['nakit', 'ogrlice', 'ogrlica', 'mindjuse', 'minđuše', 'heklani nakit', 'mikro-heklanje'],
    productIds: ['sk-nakit-01', 'sk-nakit-02'],
    landingSlug: 'heklani-nakit-i-ogrlice'
  },
  {
    words: ['košulja', 'kosulja', 'platno', 'ruska kragna', 'svadba', 'vencanje', 'venčanje', 'slava'],
    productIds: ['sk-kosulja-01', 'sk-kosulja-02'],
    landingSlug: 'vezene-kosulje-za-svadbe-i-slave'
  },
  {
    words: ['poklon', 'dijaspora', 'suveniri', 'inostranstvo', 'kanada', 'nemacka', 'austrija', 'dar'],
    productIds: ['sk-poklon-02', 'sk-dom-01', 'sk-subara-01'],
    landingSlug: 'etno-pokloni-za-inostranstvo'
  },
  {
    words: ['homolje', 'josanica', 'jošanica', 'zagubica', 'žagubica', 'mlava', 'istocna srbija'],
    productIds: ['sk-dom-01', 'sk-subara-01', 'sk-carape-01'],
    landingSlug: 'homoljski-suveniri-i-josanica'
  },
  {
    words: ['nošnja', 'nosnja', 'vez', 'folklor', 'ručni rad', 'tradicija'],
    productIds: ['sk-kosulja-01', 'sk-nosnja-02', 'sk-subara-01'],
    landingSlug: 'nosnje-i-vez'
  }
];

/**
 * Automatically computes the top 2-3 most relevant products for any blog post.
 * Also finds the most relevant SEO landing page guide to boost internal link equity.
 */
export function getRelatedProductsForBlogPost(post: BlogPost, isEn: boolean): BlogRelatedContent {
  const scores: Record<string, number> = {};

  // Initialize all products with a baseline score
  productsData.forEach(p => {
    scores[p.id] = 0;
    if (p.featured) scores[p.id] += 5;
    if (p.inStock) scores[p.id] += 3;
  });

  // 1. If explicit relatedProductId exists in blog post data
  if (post.relatedProductId && scores[post.relatedProductId] !== undefined) {
    scores[post.relatedProductId] += 120;
  }

  // 2. Category matching
  const matchingCats = blogToProductCategories[post.category] || [];
  productsData.forEach(p => {
    if (matchingCats.includes(p.category)) {
      scores[p.id] += 25;
    }
  });

  // 3. Keyword / Text Trigger Matching
  const combinedPostText = [
    post.title,
    post.subtitle,
    post.excerpt || '',
    post.category,
    post.categoryLabel || '',
    ...(post.targetKeywords || []),
    post.slug || ''
  ].join(' ').toLowerCase();

  let matchedLandingSlug: string | undefined;

  keywordTriggers.forEach(trigger => {
    const isTriggered = trigger.words.some(word => combinedPostText.includes(word));
    if (isTriggered) {
      trigger.productIds.forEach((pid, idx) => {
        if (scores[pid] !== undefined) {
          scores[pid] += 40 - idx * 5;
        }
      });
      if (!matchedLandingSlug && trigger.landingSlug) {
        matchedLandingSlug = trigger.landingSlug;
      }
    }
  });

  // 4. Content words matching product properties
  productsData.forEach(p => {
    const productWords = [
      p.name.toLowerCase(),
      p.category.toLowerCase(),
      ...(p.craftTechniques || []).map(t => t.toLowerCase()),
      ...(p.materials || []).map(m => m.toLowerCase())
    ];

    productWords.forEach(pw => {
      const words = pw.split(/\s+/).filter(w => w.length > 3);
      words.forEach(w => {
        if (combinedPostText.includes(w)) {
          scores[p.id] += 8;
        }
      });
    });
  });

  // Sort products by score
  const sortedProducts = [...productsData].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  // Select top 3 distinct products
  const topProducts = sortedProducts.slice(0, 3);

  // Prepare matched landing page details if found
  let landingPage: MatchedLandingPage | undefined;
  if (matchedLandingSlug && seoLandingPages[matchedLandingSlug]) {
    const lp = seoLandingPages[matchedLandingSlug];
    landingPage = {
      slug: lp.slug,
      path: lp.path,
      title: isEn ? lp.titleEn : lp.titleSr,
      badge: isEn ? lp.badgeEn : lp.badgeSr,
      subtitle: isEn ? lp.subtitleEn : lp.subtitleSr
    };
  }

  return {
    products: topProducts,
    landingPage
  };
}
