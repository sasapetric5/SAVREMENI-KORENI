import fs from 'fs';
import path from 'path';

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

export interface MerchantProduct {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  priceRsd: number;
  priceEur?: number;
  category: string;
  image?: string;
  inStock?: boolean;
  materials?: string[];
  materialsEn?: string[];
  craftTechniques?: string[];
  craftTechniquesEn?: string[];
}

const defaultProductsForFeed: MerchantProduct[] = [
  {
    id: 'sk-subara-01',
    name: 'Tradicionalna Šubara sa Vezenom Bordurnom Trakom',
    nameEn: 'Traditional Fur Hat (Šubara) with Embroidered Trim',
    description: 'Topla šubara od mekog prirodnog krzna u spoju sa ručno tkanom i vezenom etno vrpcom, inspirisana homoljskim krajem.',
    descriptionEn: 'Warm winter hat crafted from ultra-soft natural sheepskin fur, accentuated with a hand-embroidered heritage geometric band inspired by the Homolje mountains.',
    priceRsd: 5900,
    priceEur: 50,
    category: 'subare',
    image: '/images/products/srpska_subara_moderna_1789021862584.jpg',
    inStock: true,
    materials: ['Prirodno meko krzno', 'Vezena pamučna traka', 'Termo satenska postava'],
    craftTechniques: ['Tradicionalno krznarstvo', 'Ručni vez na traci', 'Krojenje po meri']
  },
  {
    id: 'sk-subara-02',
    name: 'Autentična Bela Vlaška Šubara od Jagnjećeg Krzna',
    nameEn: 'Authentic White Vlach Fur Hat (Bela Šubara)',
    description: 'Visoka bela šubara specifična za homoljski i istočnosrpski kraj, ručno šivena od pažljivo selektovanog belog jagnjećeg runa.',
    descriptionEn: 'Iconic tall white sheepskin hat traditional to the Homolje highlands and eastern Serbian folklore, handcrafted from select virgin fleece.',
    priceRsd: 6800,
    priceEur: 58,
    category: 'subare',
    image: '/images/products/vlaska_bela_subara_1789032431671.jpg',
    inStock: true,
    materials: ['100% Prirodno belo jagnjeće krzno', 'Pamučno ojačanje'],
    craftTechniques: ['Tradicionalno krojenje', 'Ručno opšivanje krzna']
  },
  {
    id: 'sk-carape-01',
    name: 'Ručno Pletene Vunene Čarape sa Tradicionalnim Cvetnim Vezom',
    nameEn: 'Hand-Knitted Wool Socks with Folk Embroidery',
    description: 'Debele tople čarape pletene na pet igala od domaće runske vune sa gustim reljefnim etno cvetnim vezom u živim bojama.',
    descriptionEn: 'Heavyweight thermal wool socks traditionally knitted on 5 double-pointed needles using pure unbleached Homolje sheep wool, decorated with botanical motifs.',
    priceRsd: 3200,
    priceEur: 27,
    category: 'carape',
    image: '/images/products/vunene_carape_vez_1789021876638.jpg',
    inStock: true,
    materials: ['100% Prirodna runska vuna', 'Vuneni konac za vez'],
    craftTechniques: ['Pletenje na 5 igala', 'Reljefni vez cvetnih motiva', 'Ojačana peta i prsti']
  },
  {
    id: 'sk-carape-02',
    name: 'Vezene Čarape za Folklorne Ansamble i KUD-ove',
    nameEn: 'Stage Folklore Performance Embroidered Wool Socks',
    description: 'Autentične scenske čarape izrađene po etnološkim obrascima, prilagođene za nastupe kulturno-umetničkih društava.',
    descriptionEn: 'High-durability authentic performance socks tailored strictly to regional folklore archives with dense tight-stitch embroidery for dancers.',
    priceRsd: 3600,
    priceEur: 31,
    category: 'carape',
    image: '/images/products/vezene_carape_folklor_1789032450227.jpg',
    inStock: true,
    materials: ['Prirodna domaća vuna', 'Postojani etno vez'],
    craftTechniques: ['Scensko folklorno pletenje', 'Puni vez pokrsticom']
  },
  {
    id: 'sk-kosulja-01',
    name: 'Ručno Vezena Košulja od Domaćeg Platna sa Ruskom Kragnom',
    nameEn: 'Hand-Embroidered Folk Shirt with Mandarin Collar',
    description: 'Tradicionalna muška i ženska etno košulja sa preciznim vezom na grudima i manžetnama, pogodna za svadbe, slave i svečanosti.',
    descriptionEn: 'Timeless ceremonial heritage tunic woven from 100% natural textured cotton canvas featuring elaborate hand embroidery along the collar and cuffs.',
    priceRsd: 8500,
    priceEur: 72,
    category: 'kosulje',
    image: '/images/products/vezena_kosulja_1789021895745.jpg',
    inStock: false,
    materials: ['100% Pamučno domaće platno', 'Ljubičasti i bordo konac za vez'],
    craftTechniques: ['Ručni vez krstićem', 'Krojenje i porubljivanje', 'Tradicionalna ruska kragna']
  },
  {
    id: 'sk-nosnja-02',
    name: 'Svečani Jelek sa Raskošnim Zlatovezom i Srmom',
    nameEn: 'Ceremonial Folk Vest (Jelek) with Gold Thread Embroidery',
    description: 'Tradicionalni jelek od crnog pliša i čoje, bogato optočen zlatnom i srebrnom srmom, bućmom i gajtanima.',
    descriptionEn: 'Royal festive folk vest handcrafted from midnight black cotton velvet, elaborately hand-embroidered with archival golden srma cordings and wirework.',
    priceRsd: 14500,
    priceEur: 124,
    category: 'kosulje',
    image: '/images/products/srpski_zlatovez_srma_1789105485118.jpg',
    inStock: true,
    materials: ['Crni pamučni pliš', 'Zlatna i srebrna srma', 'Tekstilni gajtani'],
    craftTechniques: ['Tradicionalni zlatovez', 'Polaganje srme i bućme', 'Krojenje svečanog jeleka']
  },
  {
    id: 'sk-torba-01',
    name: 'Unikatna Makrame Torba sa Drvenim Ručkama',
    nameEn: 'Unique Macramé Handbag with Hand-Turned Wooden Handles',
    description: 'Moderna letnja torba izrađena tehnikom ručnog čvorovanja pamučnog kanapa sa poliranim drvenim ručkama od parene bukve.',
    descriptionEn: 'Contemporary bohemian tote knotted from premium 4mm single-twist cotton rope, complemented by polished beechwood arch handles.',
    priceRsd: 4800,
    priceEur: 41,
    category: 'torbice',
    image: '/images/products/etno_unikatna_torba_1789105500674.jpg',
    inStock: true,
    materials: ['100% Pamučni kanap 4mm', 'Parena bukovina', 'Pamučna postava sa džepom'],
    craftTechniques: ['Ručno makrame čvorovanje', 'Stolarska obrada ručki', 'Šivenje unutrašnje postave']
  },
  {
    id: 'sk-nakit-01',
    name: 'Heklana Etno Ogrlica sa Drvenim Perlama i Resama',
    nameEn: 'Crocheted Statement Necklace with Wooden Beads & Fringes',
    description: 'Lagan i upečatljiv komad nakita heklan od finog pamučnog konca sa detaljima od prirodnog drveta i perli u zemljanim tonovima.',
    descriptionEn: 'Lightweight tactile statement piece micro-crocheted from mercerized cotton thread interwoven with hand-drilled native wood beads.',
    priceRsd: 1900,
    priceEur: 16,
    category: 'nakit',
    image: '/images/products/heklani_nakit_1789021909183.jpg',
    inStock: true,
    materials: ['Mercerizovani pamučni konac', 'Drvene perle od lipe i oraha', 'Kopča bez nikla'],
    craftTechniques: ['Mikro-heklanje', 'Ručno nizanje perli', 'Antialergijska montaža']
  },
  {
    id: 'sk-opanci-01',
    name: 'Autentični Srpski Opanci sa Pletenim Kljunom za Folklor',
    nameEn: 'Authentic Serbian Leather Opanci Shoes with Curved Tip',
    description: 'Tradicionalna kožna obuća ručno pletena od goveđe kože sa prepoznatljivim savijenim kljunom i oputom, namenjena za nastupe i narodne nošnje.',
    descriptionEn: 'Traditional Balkan folk leather footwear meticulously hand-braided from natural vegetable-tanned cowhide, with curved toe tip.',
    priceRsd: 6200,
    priceEur: 53,
    category: 'kosulje',
    image: '/images/products/homoljska_narodna_nosnja_1789032467664.jpg',
    inStock: true,
    materials: ['100% Prirodna goveđa koža', 'Kožna oputa za pletenje'],
    craftTechniques: ['Ručno oputno pletenje', 'Kalupljenje kože', 'Tradicionalno opančarstvo']
  }
];

const categoryToGoogleMap: Record<string, { category: string; type: string }> = {
  subare: {
    category: 'Apparel & Accessories > Clothing Accessories > Hats',
    type: 'Odeća i Aksesoari > Kape i Šubare > Tradicionalne Šubare'
  },
  carape: {
    category: 'Apparel & Accessories > Clothing > Underwear & Socks > Socks',
    type: 'Odeća i Aksesoari > Odeća > Čarape > Ručno Pletene Vunene Čarape'
  },
  kosulje: {
    category: 'Apparel & Accessories > Clothing > Traditional & Ceremonial Clothing',
    type: 'Odeća i Aksesoari > Tradicionalna Odeća > Srpska Narodna Nošnja'
  },
  nosnje: {
    category: 'Apparel & Accessories > Clothing > Traditional & Ceremonial Clothing',
    type: 'Odeća i Aksesoari > Tradicionalna Odeća > Narodna Nošnja'
  },
  torbice: {
    category: 'Apparel & Accessories > Handbags, Wallets & Cases > Handbags',
    type: 'Odeća i Aksesoari > Torbe > Unikatne Makrame i Heklane Torbice'
  },
  nakit: {
    category: 'Apparel & Accessories > Jewelry',
    type: 'Odeća i Aksesoari > Nakit > Unikatni Heklani Etno Nakit'
  },
  'dom-pokloni': {
    category: 'Home & Garden > Decor',
    type: 'Dom i Dekor > Etno Rukotvorine > Tradicionalni Suveniri'
  }
};

export interface FeedOptions {
  isEnglish?: boolean;
  customProducts?: any[];
}

/**
 * Generates official Google Merchant Center standard XML RSS 2.0 Feed
 * Complies with Google Shopping Free Listings specifications:
 * https://support.google.com/merchants/answer/7052112
 */
export function generateGoogleMerchantFeedXml(options: FeedOptions = {}): string {
  const isEn = options.isEnglish || false;

  // Load custom products from disk if available
  let mergedProducts = [...defaultProductsForFeed];
  if (options.customProducts && Array.isArray(options.customProducts) && options.customProducts.length > 0) {
    const existingIds = new Set(mergedProducts.map((p) => p.id));
    options.customProducts.forEach((cp: any) => {
      if (!existingIds.has(cp.id)) {
        mergedProducts.push({
          id: cp.id,
          name: cp.name || 'Unikatni ručni rad Savremeni Koreni',
          nameEn: cp.nameEn || cp.name,
          description: cp.description || 'Autentični unikatni ručni rad iz radionice Savremeni Koreni, Jošanica, Homolje.',
          descriptionEn: cp.descriptionEn || cp.description,
          priceRsd: cp.priceRsd || 3500,
          priceEur: cp.priceEur || Math.round((cp.priceRsd || 3500) / 117),
          category: cp.category || 'torbice',
          image: cp.image || '/logo.jpg',
          inStock: cp.inStock !== false
        });
      }
    });
  }

  const channelTitle = isEn
    ? 'Savremeni Koreni - Authentic Serbian Folk Crafts & Heritage'
    : 'Savremeni Koreni - Autentične Srpske i Vlaške Rukotvorine Homolja';

  const channelDescription = isEn
    ? 'Official product catalog for Savremeni Koreni artisan studio in Jošanica, Serbia. Handcrafted sheepskin fur hats, folkloric wool socks, goldwork vests, and bespoke folk costumes by Tanja Petrić.'
    : 'Zvanični katalog proizvoda radionice Savremeni Koreni (Tanja Petrić PR, Jošanica, Homolje). Tradicionalne bele vlaške šubare, vezene čarape za folklor, narodna nošnja, makrame torbe i srpski zlatovez.';

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(channelDescription)}</description>
`;

  mergedProducts.forEach((prod) => {
    const title = isEn && prod.nameEn ? prod.nameEn : prod.name;
    const description = isEn && prod.descriptionEn ? prod.descriptionEn : prod.description;
    const priceStr = isEn && prod.priceEur ? `${prod.priceEur}.00 EUR` : `${prod.priceRsd}.00 RSD`;
    const availability = prod.inStock ? 'in_stock' : 'backorder';
    const productUrl = `${BASE_URL}/?product=${prod.id}${isEn ? '&amp;lang=en' : ''}`;
    
    // Resolve absolute image URL
    let imageUrl = prod.image || '/logo.jpg';
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      imageUrl = `${BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    const mapping = categoryToGoogleMap[prod.category] || {
      category: 'Apparel & Accessories > Clothing > Traditional & Ceremonial Clothing',
      type: 'Tradicija i Ručni Rad > Etno Proizvodi'
    };

    const materialsStr = (isEn && prod.materialsEn ? prod.materialsEn : prod.materials)?.join(', ') || '100% Prirodni materijali';

    xml += `    <item>
      <g:id>${escapeXml(prod.id)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${priceStr}</g:price>
      <g:brand>Savremeni Koreni</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${escapeXml(mapping.category)}</g:google_product_category>
      <g:product_type>${escapeXml(mapping.type)}</g:product_type>
      <g:material>${escapeXml(materialsStr)}</g:material>
      <g:custom_label_0>${isEn ? 'Handcrafted' : 'Ručni rad'}</g:custom_label_0>
      <g:custom_label_1>Homolje Jošanica</g:custom_label_1>
      <g:custom_label_2>Tanja Petrić Studio</g:custom_label_2>
      <g:custom_label_3>${isEn ? 'Heritage Folk Art' : 'Stari zanati i tradicija'}</g:custom_label_3>
      <g:shipping>
        <g:country>RS</g:country>
        <g:service>Post Express Srbija</g:service>
        <g:price>450.00 RSD</g:price>
      </g:shipping>
    </item>
`;
  });

  xml += `  </channel>
</rss>`;

  return xml;
}
