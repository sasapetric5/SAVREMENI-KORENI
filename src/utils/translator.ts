/**
 * Servis za automatski prevod sa srpskog na engleski jezik
 */
const ETHNO_DICTIONARY: Record<string, string> = {
  "šubara": "traditional sheepskin shepherd hat (šubara)",
  "subara": "traditional sheepskin shepherd hat (šubara)",
  "šubare": "traditional sheepskin shepherd hats",
  "opanci": "traditional leather peasant shoes (opanci)",
  "opanak": "traditional leather peasant shoe (opanak)",
  "nošnja": "traditional folk costume",
  "narodna nošnja": "authentic folk costume",
  "vuna": "pure natural sheep wool",
  "vuneni": "handcrafted woolen",
  "vunena": "handcrafted woolen",
  "ručni rad": "authentic handcraft / handmade",
  "rucni rad": "authentic handcraft / handmade",
  "pojas": "traditional woven sash / folk belt",
  "tkanica": "traditional handwoven sash belt (tkanica)",
  "ćilim": "authentic handwoven kilim rug",
  "cilim": "authentic handwoven kilim rug",
  "prsluk": "traditional embroidered vest (zubun)",
  "jelek": "traditional folk vest (jelek)",
  "torba": "traditional woven woolen shoulder bag",
  "čarape": "hand-knit authentic woolen socks",
  "carape": "hand-knit authentic woolen socks",
  "prirodno": "100% natural and authentic",
  "jagnjeće krzno": "genuine sheepskin / lamb fur",
  "koža": "genuine handcrafted leather",
  "zlatovez": "gold-thread heritage embroidery",
  "etno": "authentic Serbian folk heritage",
  "tradicija": "timeless Serbian tradition",
  "Srbija": "Serbia",
  "Homolje": "Homolje Mountains",
  "Zlatibor": "Zlatibor region",
  "Pirot": "Pirot heritage",
  "Koreni": "Roots & Heritage",
};

export async function translateTextToEnglish(text: string): Promise<string> {
  if (!text || text.trim() === '') return '';

  const cleanText = text.trim();

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=sr&tl=en&dt=t&q=${encodeURIComponent(cleanText)}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data[0])) {
        const translated = data[0].map((item: any) => item[0]).join('');
        if (translated && translated.trim().length > 0) {
          return translated.trim();
        }
      }
    }
  } catch (error) {
    console.warn("Direct translate failed, using smart ethno-fallback parser:", error);
  }

  let fallback = cleanText;
  Object.entries(ETHNO_DICTIONARY).forEach(([srWord, enWord]) => {
    const regex = new RegExp(`\\b${srWord}\\b`, 'gi');
    fallback = fallback.replace(regex, enWord);
  });

  return fallback !== cleanText ? fallback : `Handcrafted ${cleanText}`;
}
