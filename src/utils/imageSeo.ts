import { Product, ProductCategory, BlogPost, GalleryPhoto } from '../types';

export interface ImageSeoMeta {
  alt: string;
  title: string;
  caption?: string;
  author: string;
  location: string;
  keywords: string[];
}

const categoryLabelsSr: Record<string, string> = {
  torbice: 'Unikatne heklane i makrame torbice',
  subare: 'Tradicionalne šubare i kape od prirodnog krzna',
  carape: 'Ručno pletene vunene čarape za folklor',
  kosulje: 'Narodna nošnja i vezene etno košulje',
  nakit: 'Unikatni heklani i drveni etno nakit',
  'dom-pokloni': 'Tradicionalni suveniri i etno dekoracije za dom'
};

const categoryLabelsEn: Record<string, string> = {
  torbice: 'Unique handcrafted macramé & crochet bags',
  subare: 'Traditional authentic sheepskin fur hats (šubare)',
  carape: 'Hand-knitted folk wool socks for dancers & KUD',
  kosulje: 'Authentic Serbian & Vlach folk costumes & embroidered shirts',
  nakit: 'Handmade crocheted statement jewelry & wooden beads',
  'dom-pokloni': 'Heritage Serbian artisan home decor & cultural souvenirs'
};

/**
 * Parses product name and category to inject highly descriptive, accessible,
 * and SEO-optimized 'alt' and 'title' attributes for ProductCatalog and shop components.
 */
export function parseProductImageAttributes(
  product: Partial<Product>,
  isEn: boolean = false
): { alt: string; title: string; 'aria-label': string } {
  if (!product) {
    const fallback = isEn
      ? 'Handcrafted authentic Serbian folk craft piece - Savremeni Koreni'
      : 'Autentični unikatni srpski ručni rad - Savremeni Koreni';
    return {
      alt: fallback,
      title: fallback,
      'aria-label': fallback
    };
  }

  const name = (isEn && product.nameEn ? product.nameEn : product.name) || (isEn ? 'Folk craft product' : 'Etno rukotvorina');
  const catKey = (product.category as string) || '';
  const categoryDesc = isEn
    ? (categoryLabelsEn[catKey] || 'Authentic folk craft')
    : (categoryLabelsSr[catKey] || 'Autentične rukotvorine');

  const technique = isEn && product.craftTechniquesEn && product.craftTechniquesEn.length > 0
    ? product.craftTechniquesEn[0]
    : (product.craftTechniques && product.craftTechniques.length > 0 ? product.craftTechniques[0] : '');

  const material = isEn && product.materialsEn && product.materialsEn.length > 0
    ? product.materialsEn[0]
    : (product.materials && product.materials.length > 0 ? product.materials[0] : '');

  // Construct structured, human-readable & search-engine optimized ALT tag
  let alt = isEn
    ? `${name} [${categoryDesc}]`
    : `${name} [Kategorija: ${categoryDesc}]`;

  const extraDetails = [technique, material].filter(Boolean);
  if (extraDetails.length > 0) {
    alt += ` - ${extraDetails.join(', ')}`;
  }

  alt += isEn
    ? ` | Handcrafted by Tanja Petrić, Savremeni Koreni (Jošanica, Homolje, Serbia)`
    : ` | Unikatni ručni rad Tanje Petrić, Savremeni Koreni (Jošanica, Homolje)`;

  // Construct informative hover title attribute
  const price = isEn && product.priceEur
    ? `~€${product.priceEur}`
    : (product.priceRsd ? `${product.priceRsd} RSD` : '');
  const stock = product.inStock
    ? (isEn ? 'In Stock' : 'Na stanju')
    : (isEn ? 'Made to Order' : 'Izrada po meri');

  const title = isEn
    ? `${name} — ${categoryDesc} (${stock}${price ? ` • ${price}` : ''}) — Savremeni Koreni Homolje`
    : `${name} — ${categoryDesc} (${stock}${price ? ` • ${price}` : ''}) — Savremeni Koreni Homolje`;

  return {
    alt,
    title,
    'aria-label': `${name} - ${categoryDesc}`
  };
}

/**
 * Generates an SEO-optimized, highly descriptive, accessibility-compliant ALT text for product images.
 * Adheres to WCAG AA and Google Image Search / Google Lens ranking guidelines:
 * - Specific description of what is depicted
 * - Craft technique and authentic materials
 * - Category classification
 * - Artisan branding and geographical heritage (Homolje, Jošanica)
 */
export function getProductImageAlt(product: Partial<Product>, isEn: boolean = false): string {
  return parseProductImageAttributes(product, isEn).alt;
}

/**
 * Generates image title tooltip attribute for extra UX clarity and hover feedback.
 */
export function getProductImageTitle(product: Partial<Product>, isEn: boolean = false): string {
  return parseProductImageAttributes(product, isEn).title;
}

/**
 * Generates SEO ALT for Blog post hero and in-article illustration images.
 */
export function getBlogPostImageAlt(post: Partial<BlogPost>, isEn: boolean = false): string {
  if (!post) return isEn ? 'Traditional folk craft blog illustration' : 'Ilustracija blog članka o starim zanatima';
  const title = post.title || '';
  const category = post.categoryLabel || post.category || '';
  
  if (isEn) {
    return `${title} - Heritage guide & artisan craft illustration | Savremeni Koreni Blog`;
  }
  return `${title} - Tradicionalni zanati i vlaško-srpsko nasleđe (${category}) | Blog Savremeni Koreni`;
}

/**
 * Generates SEO ALT for Workshop Gallery photos.
 */
export function getGalleryPhotoAlt(photo: Partial<GalleryPhoto>, isEn: boolean = false): string {
  if (!photo) return isEn ? 'Savremeni Koreni workshop photo' : 'Fotografija iz radionice Savremeni Koreni';
  const title = (isEn && photo.titleEn) ? photo.titleEn : (photo.title || '');
  const caption = (isEn && photo.captionEn) ? photo.captionEn : (photo.caption || '');
  
  if (isEn) {
    return `${title}${caption ? `: ${caption}` : ''} - Authentic workshop moments & handmade crafts by Tanja Petrić`;
  }
  return `${title}${caption ? `: ${caption}` : ''} - Autentični momenti iz radionice i unikatni radovi Tanje Petrić (Jošanica)`;
}

/**
 * Generates Schema.org ImageObject structured data for Google Lens and Google Images SEO.
 */
export function generateImageObjectSchema(
  imageUrl: string,
  name: string,
  caption: string,
  isEn: boolean = false
) {
  const absoluteUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `https://savremenikoreni.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;

  return {
    '@type': 'ImageObject',
    'contentUrl': absoluteUrl,
    'url': absoluteUrl,
    'name': name,
    'caption': caption,
    'description': caption,
    'author': {
      '@type': 'Person',
      'name': 'Tanja Petrić',
      'jobTitle': 'Artisan & Folk Textile Master Craftsman',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Savremeni Koreni',
        'url': 'https://savremenikoreni.com'
      }
    },
    'contentLocation': {
      '@type': 'Place',
      'name': 'Jošanica, Homolje',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Jošanica',
        'addressRegion': 'Žagubica, Braničevski okrug',
        'addressCountry': 'RS'
      }
    },
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'Savremeni Koreni - Tanja Petrić PR'
    },
    'inLanguage': isEn ? 'en' : 'sr'
  };
}
