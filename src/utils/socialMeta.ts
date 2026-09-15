import { Product, BlogPost } from '../types';
import { getProductImageAlt, getBlogPostImageAlt } from './imageSeo';
import { seoLandingPages } from '../data/seoLandingPagesData';
import { getLocalizedBlogPost } from '../data/blogEnglishTranslations';

export interface SocialMetaConfig {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  ogType?: 'website' | 'article' | 'product.item' | 'product';
  siteName?: string;
  locale?: string;
  alternateLocales?: string[];
  product?: {
    priceAmount?: number | string;
    priceCurrency?: string;
    availability?: 'instock' | 'in stock' | 'out of stock' | 'made to order' | 'backorder';
    brand?: string;
    category?: string;
    condition?: string;
    retailerItemId?: string;
  };
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  twitterCard?: 'summary_large_image' | 'summary';
  twitterSite?: string;
  twitterCreator?: string;
  twitterLabels?: Array<{ label: string; data: string }>;
}

const SITE_DOMAIN = 'https://savremenikoreni.com';
const DEFAULT_BRAND = 'Savremeni Koreni';
const DEFAULT_IMAGE = 'https://savremenikoreni.com/logo.jpg';

const DEFAULT_META_SR: SocialMetaConfig = {
  title: 'Savremeni Koreni | Spoj tradicije i modernog dizajna',
  description: 'Savremeni Koreni (savremenikoreni.com) – vodeći autoritet za tradiciju i ručni rad: vlaška šubara (bela šubara), vezene čarape za folklor, narodna nošnja iz Homoljskog kraja (srpska i vlaška), ručni vez, vrste veza, unikatne torbice, modern makrame i heklanje. Autorski radovi Tanje Petrić iz Jošanice.',
  url: SITE_DOMAIN,
  imageUrl: DEFAULT_IMAGE,
  imageAlt: 'Savremeni Koreni - Serbian & Vlach Folk Heritage Crafts by Tanja Petrić',
  ogType: 'website',
  siteName: 'Savremeni Koreni',
  locale: 'sr_RS',
  alternateLocales: ['en_US', 'en_GB'],
  twitterCard: 'summary_large_image',
  twitterSite: '@savremenikoreni',
  twitterCreator: '@tanjapetric_homolje',
};

const DEFAULT_META_EN: SocialMetaConfig = {
  title: 'Savremeni Koreni | Authentic Serbian & Vlach Heritage Crafts',
  description: 'Savremeni Koreni by Tanja Petrić – Authentic handcrafted Serbian and Vlach traditional folk costumes, white sheepskin fur hats (šubare), hand-embroidered folklore socks, and unique macramé & crocheted bags from Homolje.',
  url: `${SITE_DOMAIN}/?lang=en`,
  imageUrl: DEFAULT_IMAGE,
  imageAlt: 'Savremeni Koreni - Serbian Heritage Artisan Crafts',
  ogType: 'website',
  siteName: 'Savremeni Koreni',
  locale: 'en_US',
  alternateLocales: ['sr_RS'],
  twitterCard: 'summary_large_image',
  twitterSite: '@savremenikoreni',
  twitterCreator: '@tanjapetric_homolje',
};

/**
 * Normalizes any image URL to a full absolute URL for external social crawlers.
 */
export function toAbsoluteUrl(url?: string): string {
  if (!url) return DEFAULT_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('data:')) return DEFAULT_IMAGE; // Social crawlers do not index inline base64 blobs
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_DOMAIN}${cleanPath}`;
}

/**
 * Helper to get or create a <meta> tag by name or property.
 */
function setMetaElement(attrKey: 'name' | 'property', attrVal: string, content: string): HTMLMetaElement {
  let element = document.head.querySelector(`meta[${attrKey}="${attrVal}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrKey, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
  return element;
}

/**
 * Removes custom dynamic meta tags matching a specific selector.
 */
function removeMetaElement(attrKey: 'name' | 'property', attrVal: string) {
  const elements = document.head.querySelectorAll(`meta[${attrKey}="${attrVal}"]`);
  elements.forEach((el) => el.remove());
}

/**
 * Updates or creates a link tag (e.g. canonical).
 */
function setLinkElement(rel: string, href: string): HTMLLinkElement {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  return element;
}

/**
 * Injects complete OpenGraph, Twitter Card, and SEO metadata into the document <head>.
 * Returns a cleanup function that restores previous metadata when unmounted.
 */
export function injectSocialMeta(config: SocialMetaConfig): () => void {
  // Store previous head state for reliable rollback
  const prevTitle = document.title;
  const prevDesc = (document.head.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || '';
  const prevOgTitle = (document.head.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content || '';
  const prevOgDesc = (document.head.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.content || '';
  const prevOgImage = (document.head.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content || '';
  const prevOgUrl = (document.head.querySelector('meta[property="og:url"]') as HTMLMetaElement)?.content || '';
  const prevOgType = (document.head.querySelector('meta[property="og:type"]') as HTMLMetaElement)?.content || 'website';
  const prevTwitterCard = (document.head.querySelector('meta[name="twitter:card"]') as HTMLMetaElement)?.content || 'summary_large_image';
  const prevCanonical = (document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href || SITE_DOMAIN;

  // 1. Basic SEO Tags
  document.title = config.title;
  setMetaElement('name', 'description', config.description);

  const fullUrl = config.url ? (config.url.startsWith('http') ? config.url : `${SITE_DOMAIN}${config.url}`) : SITE_DOMAIN;
  setLinkElement('canonical', fullUrl);

  const fullImageUrl = toAbsoluteUrl(config.imageUrl);

  // 2. OpenGraph Meta Tags
  setMetaElement('property', 'og:site_name', config.siteName || DEFAULT_BRAND);
  setMetaElement('property', 'og:title', config.title);
  setMetaElement('property', 'og:description', config.description);
  setMetaElement('property', 'og:url', fullUrl);
  setMetaElement('property', 'og:type', config.ogType || 'website');
  setMetaElement('property', 'og:image', fullImageUrl);
  setMetaElement('property', 'og:image:secure_url', fullImageUrl);
  setMetaElement('property', 'og:image:alt', config.imageAlt || config.title);
  setMetaElement('property', 'og:image:width', String(config.imageWidth || 1200));
  setMetaElement('property', 'og:image:height', String(config.imageHeight || 630));
  setMetaElement('property', 'og:locale', config.locale || 'sr_RS');

  // Alternate locales
  removeMetaElement('property', 'og:locale:alternate');
  if (config.alternateLocales && config.alternateLocales.length > 0) {
    config.alternateLocales.forEach((altLoc) => {
      const altMeta = document.createElement('meta');
      altMeta.setAttribute('property', 'og:locale:alternate');
      altMeta.setAttribute('content', altLoc);
      document.head.appendChild(altMeta);
    });
  }

  // 3. Product Specific OpenGraph & Twitter Tags
  if (config.product) {
    const p = config.product;
    if (p.priceAmount) setMetaElement('property', 'product:price:amount', String(p.priceAmount));
    if (p.priceCurrency) setMetaElement('property', 'product:price:currency', p.priceCurrency);
    if (p.availability) setMetaElement('property', 'product:availability', p.availability);
    if (p.brand) setMetaElement('property', 'product:brand', p.brand);
    if (p.category) setMetaElement('property', 'product:category', p.category);
    if (p.condition) setMetaElement('property', 'product:condition', p.condition);
    if (p.retailerItemId) setMetaElement('property', 'product:retailer_item_id', p.retailerItemId);
  } else {
    removeMetaElement('property', 'product:price:amount');
    removeMetaElement('property', 'product:price:currency');
    removeMetaElement('property', 'product:availability');
    removeMetaElement('property', 'product:brand');
    removeMetaElement('property', 'product:category');
    removeMetaElement('property', 'product:condition');
    removeMetaElement('property', 'product:retailer_item_id');
  }

  // 4. Article Specific OpenGraph Tags
  if (config.article) {
    const a = config.article;
    if (a.publishedTime) setMetaElement('property', 'article:published_time', a.publishedTime);
    if (a.author) setMetaElement('property', 'article:author', a.author);
    if (a.section) setMetaElement('property', 'article:section', a.section);
    
    removeMetaElement('property', 'article:tag');
    if (a.tags && a.tags.length > 0) {
      a.tags.forEach((tag) => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }
  } else {
    removeMetaElement('property', 'article:published_time');
    removeMetaElement('property', 'article:author');
    removeMetaElement('property', 'article:section');
    removeMetaElement('property', 'article:tag');
  }

  // 5. Twitter Card Tags
  setMetaElement('name', 'twitter:card', config.twitterCard || 'summary_large_image');
  setMetaElement('name', 'twitter:title', config.title);
  setMetaElement('name', 'twitter:description', config.description);
  setMetaElement('name', 'twitter:image', fullImageUrl);
  setMetaElement('name', 'twitter:image:alt', config.imageAlt || config.title);
  setMetaElement('name', 'twitter:site', config.twitterSite || '@savremenikoreni');
  setMetaElement('name', 'twitter:creator', config.twitterCreator || '@tanjapetric_homolje');

  // Twitter extra key-value data labels
  removeMetaElement('name', 'twitter:label1');
  removeMetaElement('name', 'twitter:data1');
  removeMetaElement('name', 'twitter:label2');
  removeMetaElement('name', 'twitter:data2');

  if (config.twitterLabels && config.twitterLabels.length > 0) {
    if (config.twitterLabels[0]) {
      setMetaElement('name', 'twitter:label1', config.twitterLabels[0].label);
      setMetaElement('name', 'twitter:data1', config.twitterLabels[0].data);
    }
    if (config.twitterLabels[1]) {
      setMetaElement('name', 'twitter:label2', config.twitterLabels[1].label);
      setMetaElement('name', 'twitter:data2', config.twitterLabels[1].data);
    }
  }

  // Return teardown function that reverts to saved initial state
  return () => {
    document.title = prevTitle;
    if (prevDesc) setMetaElement('name', 'description', prevDesc);
    if (prevOgTitle) setMetaElement('property', 'og:title', prevOgTitle);
    if (prevOgDesc) setMetaElement('property', 'og:description', prevOgDesc);
    if (prevOgImage) setMetaElement('property', 'og:image', prevOgImage);
    if (prevOgUrl) setMetaElement('property', 'og:url', prevOgUrl);
    if (prevOgType) setMetaElement('property', 'og:type', prevOgType);
    if (prevTwitterCard) setMetaElement('name', 'twitter:card', prevTwitterCard);
    if (prevCanonical) setLinkElement('canonical', prevCanonical);

    // Clean up entity-specific tags
    removeMetaElement('property', 'product:price:amount');
    removeMetaElement('property', 'product:price:currency');
    removeMetaElement('property', 'product:availability');
    removeMetaElement('property', 'product:brand');
    removeMetaElement('property', 'product:category');
    removeMetaElement('property', 'product:condition');
    removeMetaElement('property', 'product:retailer_item_id');
    removeMetaElement('property', 'article:published_time');
    removeMetaElement('property', 'article:author');
    removeMetaElement('property', 'article:section');
    removeMetaElement('property', 'article:tag');
    removeMetaElement('name', 'twitter:label1');
    removeMetaElement('name', 'twitter:data1');
    removeMetaElement('name', 'twitter:label2');
    removeMetaElement('name', 'twitter:data2');
  };
}

/**
 * Dynamically generates and injects OpenGraph and Twitter card meta tags for a PRODUCT.
 */
export function injectProductSocialMeta(product: Partial<Product>, isEn: boolean = false): () => void {
  if (!product) return () => {};

  const name = (isEn && product.nameEn ? product.nameEn : product.name) || (isEn ? 'Handcrafted Piece' : 'Ručni rad');
  const description = (isEn
    ? (product.descriptionEn || product.longDescriptionEn || product.description)
    : (product.description || product.longDescription)) || '';

  const cleanDesc = description.replace(/\s+/g, ' ').trim().slice(0, 200);
  const title = isEn
    ? `${name} — Handcrafted Serbian Folk Art | Savremeni Koreni`
    : `${name} — Unikatni srpski ručni rad | Savremeni Koreni`;

  const imageAlt = getProductImageAlt(product, isEn);
  const productUrl = `${SITE_DOMAIN}/katalog?product=${product.id || ''}`;
  const priceFormatted = isEn && product.priceEur ? `€${product.priceEur}` : `${product.priceRsd} RSD`;
  const availability = product.inStock ? 'instock' : 'made to order';

  return injectSocialMeta({
    title,
    description: cleanDesc || (isEn 
      ? `Authentic handcrafted ${name} created by Tanja Petrić, Savremeni Koreni in Homolje, Serbia.` 
      : `Autentični unikatni ručni rad "${name}" autorice Tanje Petrić, Savremeni Koreni (Jošanica, Homolje).`),
    url: productUrl,
    imageUrl: product.image,
    imageAlt,
    ogType: 'product.item',
    siteName: 'Savremeni Koreni',
    locale: isEn ? 'en_US' : 'sr_RS',
    alternateLocales: isEn ? ['sr_RS'] : ['en_US', 'en_GB'],
    product: {
      priceAmount: product.priceRsd,
      priceCurrency: 'RSD',
      availability,
      brand: 'Savremeni Koreni - Tanja Petrić',
      category: String(product.category || 'Rukotvorine'),
      condition: 'new',
      retailerItemId: product.id || ''
    },
    twitterCard: 'summary_large_image',
    twitterSite: '@savremenikoreni',
    twitterCreator: '@tanjapetric_homolje',
    twitterLabels: [
      {
        label: isEn ? 'Price' : 'Cena',
        data: priceFormatted
      },
      {
        label: isEn ? 'Availability' : 'Dostupnost',
        data: product.inStock ? (isEn ? 'In Stock' : 'Na stanju') : (isEn ? 'Made to Order' : 'Izrada po meri')
      }
    ]
  });
}

/**
 * Dynamically generates and injects OpenGraph and Twitter card meta tags for a BLOG POST.
 */
export function injectBlogPostSocialMeta(post: Partial<BlogPost>, isEn: boolean = false): () => void {
  if (!post) return () => {};

  const localized = getLocalizedBlogPost(post as BlogPost, isEn);
  const title = isEn
    ? `${localized.title} | Savremeni Koreni Heritage Guide`
    : `${localized.title} | Blog Savremeni Koreni`;

  const description = (localized.subtitle || localized.excerpt || '').replace(/\s+/g, ' ').trim().slice(0, 200);
  const imageAlt = getBlogPostImageAlt(localized, isEn);
  const articleUrl = `${SITE_DOMAIN}/blog/${localized.slug || localized.id || ''}`;

  return injectSocialMeta({
    title,
    description: description || (isEn
      ? `Read about Serbian folk heritage and traditional craft: ${localized.title}`
      : `Saznajte više o srpskoj tradiciji, vezu i unikatnom ručnom radu: ${localized.title}`),
    url: articleUrl,
    imageUrl: localized.coverImage,
    imageAlt,
    ogType: 'article',
    siteName: 'Savremeni Koreni',
    locale: isEn ? 'en_US' : 'sr_RS',
    alternateLocales: isEn ? ['sr_RS'] : ['en_US', 'en_GB'],
    article: {
      publishedTime: localized.publishDate ? new Date(localized.publishDate).toISOString() : new Date().toISOString(),
      author: localized.author || 'Tanja Petrić',
      section: localized.categoryLabel || localized.category || 'Tradicionalni zanati',
      tags: localized.targetKeywords || ['ručni rad', 'tradicija', 'Homolje', 'vez', 'narodna nošnja']
    },
    twitterCard: 'summary_large_image',
    twitterSite: '@savremenikoreni',
    twitterCreator: '@tanjapetric_homolje',
    twitterLabels: [
      {
        label: isEn ? 'Reading Time' : 'Vreme čitanja',
        data: localized.readingTime || '5 min'
      },
      {
        label: isEn ? 'Category' : 'Tema',
        data: localized.categoryLabel || localized.category || 'Tradicija'
      }
    ]
  });
}

/**
 * Dynamically generates and injects OpenGraph and Twitter card meta tags for an SEO LANDING PAGE.
 */
export function injectLandingPageSocialMeta(slug: string, isEn: boolean = false): () => void {
  const landing = seoLandingPages[slug];
  if (!landing) return () => {};

  const title = isEn && landing.metaTitleEn
    ? `${landing.metaTitleEn} | Savremeni Koreni`
    : `${landing.metaTitleSr} | Savremeni Koreni Homolje`;

  const desc = isEn && landing.metaDescriptionEn
    ? landing.metaDescriptionEn
    : landing.metaDescriptionSr;

  const cleanDesc = desc.replace(/\s+/g, ' ').trim().slice(0, 200);
  const url = `${SITE_DOMAIN}/${slug}`;

  return injectSocialMeta({
    title,
    description: cleanDesc,
    url,
    imageUrl: landing.heroImage || DEFAULT_IMAGE,
    imageAlt: `${title} - Savremeni Koreni`,
    ogType: 'website',
    siteName: 'Savremeni Koreni',
    locale: isEn ? 'en_US' : 'sr_RS',
    alternateLocales: isEn ? ['sr_RS'] : ['en_US'],
    twitterCard: 'summary_large_image',
    twitterSite: '@savremenikoreni',
    twitterCreator: '@tanjapetric_homolje'
  });
}

/**
 * Resets document metadata back to the base homepage OpenGraph & Twitter tags.
 */
export function resetSocialMeta(isEn: boolean = false): void {
  injectSocialMeta(isEn ? DEFAULT_META_EN : DEFAULT_META_SR);
}
