/**
 * Utility for generating SEO-friendly URL slugs supporting Serbian (Latin & Cyrillic) and English text.
 */

// Cyrillic to Latin map for Serbian characters
const CYRILLIC_TO_LATIN_MAP: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ђ': 'dj', 'е': 'e', 'ж': 'z',
  'з': 'z', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n',
  'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ћ': 'c', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'c', 'џ': 'dz', 'ш': 's',
  'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Ђ': 'dj', 'Е': 'e', 'Ж': 'z',
  'З': 'z', 'И': 'i', 'Ј': 'j', 'К': 'k', 'Л': 'l', 'Љ': 'lj', 'М': 'm', 'Н': 'n',
  'Њ': 'nj', 'О': 'o', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't', 'Ћ': 'c', 'У': 'u',
  'Ф': 'f', 'Х': 'h', 'Ц': 'c', 'Ч': 'c', 'Џ': 'dz', 'Ш': 's'
};

// Specific Serbian Latin diacritics replacement
const LATIN_SERBIAN_MAP: Record<string, string> = {
  'đ': 'dj',
  'Đ': 'dj',
  'č': 'c',
  'Č': 'c',
  'ć': 'c',
  'Ć': 'c',
  'š': 's',
  'Š': 's',
  'ž': 'z',
  'Ž': 'z'
};

/**
 * Converts any title (Serbian Cyrillic, Serbian Latin, or English) into an SEO-optimized clean slug.
 * Example:
 *   "Zašto Izabrati Homoljsku Šubaru Sa Đulom i Čipkom?" -> "zasto-izabrati-homoljsku-subaru-sa-djulom-i-cipkom"
 *   "Шубаре и џемпери за фолклор" -> "subare-i-dzemperi-za-folklor"
 *   "5 Reasons to Buy Handcrafted Jelek (Traditional Vest)" -> "5-reasons-to-buy-handcrafted-jelek-traditional-vest"
 */
export function generateSeoSlug(text: string): string {
  if (!text) return '';

  let processed = text;

  // 1. Convert Cyrillic letters to Serbian Latin equivalents
  processed = processed.replace(/[а-шА-ШђјљњћџЂЈЉЊЋЏ]/g, (char) => CYRILLIC_TO_LATIN_MAP[char] || char);

  // 2. Transliterate Serbian Latin diacritics (đ -> dj, č -> c, etc.)
  processed = processed.replace(/[đĐčČćĆšŠžŽ]/g, (char) => LATIN_SERBIAN_MAP[char] || char);

  // 3. Remove standard combining diacritical marks (e.g. accents)
  processed = processed.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 4. Convert to lowercase
  processed = processed.toLowerCase();

  // 5. Replace non-alphanumeric characters (spaces, punctuation, symbols) with hyphens
  processed = processed.replace(/[^a-z0-9]+/g, '-');

  // 6. Collapse consecutive hyphens and trim leading/trailing hyphens
  processed = processed.replace(/-+/g, '-').replace(/^-+|-+$/g, '');

  return processed;
}
