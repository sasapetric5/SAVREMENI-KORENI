const subaraImg = '/images/srpska_subara_moderna_1789021862584.jpg';
const vlaskaSubaraImg = '/images/vlaska_bela_subara_1789032431671.jpg';
const subaraIzradaImg = '/images/vlaska_subara_izrada_1789032512168.jpg';
const carapeImg = '/images/vunene_carape_vez_1789021876638.jpg';
const folklorCarapeImg = '/images/vezene_carape_folklor_1789032450227.jpg';
const nosnjaImg = '/images/homoljska_narodna_nosnja_1789032467664.jpg';
const kosuljaImg = '/images/vezena_kosulja_1789021895745.jpg';
const zlatovezImg = '/images/srpski_zlatovez_srma_1789105485118.jpg';
const etnoUnikatnaTorbaImg = '/images/etno_unikatna_torba_1789105500674.jpg';
const heroImg = '/images/savremeni_hero_banner_1789021835867.jpg';
const nakitImg = '/images/heklani_nakit_1789021909183.jpg';
const predjaImg = '/images/makrame_predja_repromaterijal_1789032495554.jpg';
const muskiAksesoariImg = '/images/muski_etno_aksesoari_1789105515453.jpg';
const trobojniNakitImg = '/images/heklani_trobojni_set_1789106901909.jpg';
const opanciImg = '/images/opanci_folklor_koza_1789407239776.jpg';
const jelekImg = '/images/jelek_zlatovez_srma_1789407252546.jpg';
const tkanicaImg = '/images/tkanica_pojas_etno_1789407263798.jpg';
const vezeniNadstolnjakImg = '/images/vezeni_nadstolnjak_lan_1789407278498.jpg';
const homoljskiSuveniriImg = '/images/homoljski_suveniri_dar_1789407290576.jpg';
const heklanaKlacImg = '/images/heklana_krem_klac_1789106956492.jpg';
const heklanaCrvenaImg = '/images/heklana_crvena_skoljka_1789106887946.jpg';
const autenticniVezDetaljImg = '/custom_products/1789327918894_1000019847.webp';
const homoljeNaturImg = '/custom_products/1789327918037_1000019845.webp';

export interface SeoLandingPageData {
  slug: string;
  path: string;
  badgeSr: string;
  badgeEn: string;
  titleSr: string;
  titleEn: string;
  subtitleSr: string;
  subtitleEn: string;
  metaTitleSr: string;
  metaTitleEn: string;
  metaDescriptionSr: string;
  metaDescriptionEn: string;
  targetKeywords: string[];
  heroImage: string;
  secondaryImage: string;
  productCategoryFilter?: 'subare' | 'nosnje' | 'carape' | 'pokloni' | 'torbice' | 'nakit' | 'kosulje' | 'dom-pokloni';
  targetProductIds: string[];
  keyHighlights: {
    titleSr: string;
    titleEn: string;
    descSr: string;
    descEn: string;
  }[];
  contentSections: {
    headingSr: string;
    headingEn: string;
    paragraphsSr: string[];
    paragraphsEn: string[];
    quoteSr?: string;
    quoteEn?: string;
  }[];
  sizeGuide?: {
    titleSr: string;
    titleEn: string;
    instructionsSr: string;
    instructionsEn: string;
    table: { size: string; measurement: string; note: string }[];
  };
  faqs: {
    questionSr: string;
    questionEn: string;
    answerSr: string;
    answerEn: string;
  }[];
  relatedBlogSlugs: string[];
}

export const seoLandingPages: Record<string, SeoLandingPageData> = {
  'subare-homolje': {
    slug: 'subare-homolje',
    path: '/subare-homolje',
    badgeSr: '100% Prirodno Jagnjeće Krzno • Homoljska Tradicija',
    badgeEn: '100% Genuine Lamb Fur • Homolje Artisan Heritage',
    titleSr: 'Homoljske i Vlaške Šubare od Prirodnog Krzna',
    titleEn: 'Homolje & Vlach Natural Fur Hats (Šubare)',
    subtitleSr: 'Autentične zimske kape izrađene po vekovnoj tradiciji majstora istočne Srbije. Prirodna termoizolacija, ručno tkana vezena bordura i izrada po meri glave.',
    subtitleEn: 'Authentic winter folk fur hats crafted in Eastern Serbia. Natural warmth, hand-embroidered border trim, and custom tailoring to head circumference.',
    metaTitleSr: 'Homoljske Šubare od Prirodnog Krzna | Vlaška i Srpska Šubara | Savremeni Koreni',
    metaTitleEn: 'Authentic Homolje Lamb Fur Hats (Šubara) | Savremeni Koreni',
    metaDescriptionSr: 'Kupite autentične homoljske i vlaške šubare od 100% prirodnog jagnjećeg krzna. Muški i ženski modeli, ručno tkana traka, tople do -25°C. Brza isporuka i slanje u inostranstvo.',
    metaDescriptionEn: 'Buy authentic Serbian Homolje lamb fur hats. 100% natural sheared fur, hand-woven embroidered trim, tested down to -25°C. Global shipping.',
    targetKeywords: [
      'homoljska šubara',
      'vlaška šubara',
      'bela šubara',
      'srpska šubara prodaja',
      'kapa od jagnjećeg krzna',
      'zimska šubara muška',
      'ženska šubara bela',
      'šubara sa vezenom trakom'
    ],
    heroImage: subaraImg,
    secondaryImage: vlaskaSubaraImg,
    productCategoryFilter: 'subare',
    targetProductIds: ['sk-subara-01', 'sk-subara-02'],
    keyHighlights: [
      {
        titleSr: '100% Prirodno Krzno',
        titleEn: '100% Natural Lamb Fur',
        descSr: 'Pažljivo odabrano runo domaće ovce sa Homolja, obrađeno tradicionalnim metodama bez teških hemikalija.',
        descEn: 'Hand-selected natural wool fleece from Homolje sheep, traditionally cured without harsh industrial chemicals.'
      },
      {
        titleSr: 'Termoizolacija do -25°C',
        titleEn: 'Thermal Comfort to -25°C',
        descSr: 'Prirodna vlakna dišu, sprečavaju znojenje i pružaju neprikosnovenu toplotu na najoštrijim zimskim vetrovima.',
        descEn: 'Natural wool fibers breathe dynamically, prevent perspiration, and offer unmatched wind and frost protection.'
      },
      {
        titleSr: 'Ručno Tkani Etno Detalj',
        titleEn: 'Hand-Woven Folk Border',
        descSr: 'Svaka šubara ukrašena je unikatnom vezenom trakom sa autohtonim motivima homoljskog i moravskog kraja.',
        descEn: 'Each hat features a distinctive hand-embroidered tribal band featuring traditional folklore geometry.'
      },
      {
        titleSr: 'Izrada po Meri Obima Glave',
        titleEn: 'Tailored Head Circumference',
        descSr: 'Izrađujemo tačno u vašoj veličini od 54 cm do 63 cm kako bi šubara pristajala savršeno i udobno.',
        descEn: 'Custom tailored to your exact measurements from 54 cm to 63 cm for snug, windproof comfort.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Zašto je homoljska šubara vekovni simbol otpornosti i ponosa',
        headingEn: 'Why the Homolje fur hat is an enduring symbol of resilience and heritage',
        paragraphsSr: [
          'U surovim zimskim uslovima Homoljskih planina, gde mraz i severac vladaju mesecima, šubara nikada nije bila samo estetski detalj već životna potreba stočara, čobana i domaćina. Izrađena od najgušćeg jagnjećeg krzna, ona stvara mikroklimu oko glave koja zadržava prirodnu toplotu tela bez pregrevanja.',
          'U našoj radionici u selu Jošanica kod Žagubice, majstor Tanja Petrić kombinuje starinsko krojačko umeće sa savremenom elegancijom. Svaka kapa se ručno kroji, postavlja finim pamučnim platnom koje prija kosi, i opšiva vezenom bordurom koja nosi priču o korenima.'
        ],
        paragraphsEn: [
          'In the harsh winter climates of the Homolje mountains, the traditional fur hat was never merely decorative; it was a matter of survival for shepherds and homesteaders. Crafted from dense sheared lambskin, it creates a breathable thermal microclimate that insulates without overheating.',
          'In our workshop in Jošanica near Žagubica, master artisan Tanja Petrić blends ancestral tailoring with modern grace. Every hat is lined with breathable natural cotton to protect the hair and finished with hand-embroidered patterns.'
        ],
        quoteSr: '„Pravu šubaru čovek kupuje jednom u životu — ona se ne troši, već s godinama dobija plemeniti sjaj i mekoću.“',
        quoteEn: '"A genuine fur hat is an investment for a lifetime — it does not wear out, but gains character and suppleness over decades."'
      },
      {
        headingSr: 'Vlaška bela i srpska crna šubara: Razlike i primena',
        headingEn: 'Vlach white vs. Serbian black fur hats: Nuances and traditions',
        paragraphsSr: [
          'U Homolju se prepliću srpska i vlaška tradicija. Vlaške šubare tradicionalno se izrađuju od snežnobelog jagnjećeg krzna sa karakterističnim konusnim ili zaobljenim vrhom, često u kombinaciji sa heklanim detaljima za svečane prilike. Srpska šubara najčešće ima prepoznatljiv cilindrični oblik u crnoj, braon ili sivoj boji.',
          'Danas se naši modeli nose kako na folklornim nastupima i proslavama, tako i kao izuzetno moderan zimski aksesoar na planinama (Kopaonik, Zlatibor, Alpi) i gradskim šetnjama.'
        ],
        paragraphsEn: [
          'In Homolje, Serbian and Vlach cultural threads intertwine seamlessly. Vlach hats are traditionally made from pure snow-white lamb fur with slightly conical silhouettes. Serbian hats predominantly feature classic black, deep brown, or anthracite sheared fur.',
          'Today, our creations are worn with equal pride at folklore festivals, cultural galas, and as fashionable winter headwear in snowy mountain resorts across Europe.'
        ]
      }
    ],
    sizeGuide: {
      titleSr: 'Tabela veličina: Kako izmeriti obim glave',
      titleEn: 'Size Guide: How to measure your head circumference',
      instructionsSr: 'Uzmite krojački santimetar i obavijte ga oko glave, oko 1 cm iznad obrva i tačno preko najšireg dela potiljka. Ne zatežite previše. Ukoliko ste između dva broja, preporučujemo veću veličinu.',
      instructionsEn: 'Wrap a flexible tailor measuring tape around your head, approximately 1 cm above your eyebrows and around the fullest part of the back of your head. If in between sizes, choose the larger size.',
      table: [
        { size: 'S (54-55 cm)', measurement: '54 - 55 cm', note: 'Manji ženski obim / omladinski' },
        { size: 'M (56-57 cm)', measurement: '56 - 57 cm', note: 'Standardni ženski / manji muški' },
        { size: 'L (58-59 cm)', measurement: '58 - 59 cm', note: 'Standardni muški obim (najčešći)' },
        { size: 'XL (60-61 cm)', measurement: '60 - 61 cm', note: 'Veći muški obim glave' },
        { size: 'XXL (62-63 cm)', measurement: '62 - 63 cm', note: 'Krupnija građa / narudžbina po meri' }
      ]
    },
    faqs: [
      {
        questionSr: 'Da li je krzno pravo i kako se održava prirodna šubara?',
        questionEn: 'Is the fur genuine and how should a natural fur hat be maintained?',
        answerSr: 'Da, koristimo isključivo 100% prirodno jagnjeće krzno. Održavanje je jednostavno: ukoliko pokisne ili padne sneg, samo je protresite i ostavite da se prirodno osuši na sobnoj temperaturi (nikada na radijatoru). Nakon sušenja, krzno se nežno iščetka mekom četkom.',
        answerEn: 'Yes, we use strictly 100% authentic sheared lambskin. Maintenance is easy: if wet from snow, shake off moisture and air dry at room temperature away from direct heat, then brush gently.'
      },
      {
        questionSr: 'Mogu li naručiti šubaru tačno po mojoj meri glave?',
        questionEn: 'Can I order a fur hat customized to my exact measurements?',
        answerSr: 'Apsolutno. Prilikom poručivanja navedite tačan obim glave u santimetrima, i šubara će biti skrojena specijalno za vas u roku od 3 do 5 radnih dana.',
        answerEn: 'Absolutely. Mention your circumference in centimeters when placing the inquiry, and your hat will be custom tailored within 3 to 5 business days.'
      },
      {
        questionSr: 'Šaljete li šubare u inostranstvo (Nemačka, Austrija, Švajcarska, SAD)?',
        questionEn: 'Do you ship to international destinations (EU, Switzerland, USA)?',
        answerSr: 'Da, redovno šaljemo šubare našim ljudima u dijaspori i kupcima širom sveta putem PostPak-a i brze avio pošte sa brojem za praćenje pošiljke.',
        answerEn: 'Yes, we ship globally with tracked air parcel post. Delivery usually takes 5-10 business days within Europe and 10-14 days worldwide.'
      }
    ],
    relatedBlogSlugs: [
      'srpska-subara-prirodno-krzno-homolje-vodic',
      'vlaska-subara-bela-subara-izrada-heklanje-homolje',
      'narodna-nosnja-homoljski-kraj-srpska-vlaska-tradicija-vodic'
    ]
  },

  'nosnje-i-vez': {
    slug: 'nosnje-i-vez',
    path: '/nosnje-i-vez',
    badgeSr: 'Srpsko Platno • Zlatovez • Folklor & KUD',
    badgeEn: 'Woven Linen • Gold Embroidery • Folk Costumes',
    titleSr: 'Narodna Nošnja i Tradicionalni Ručni Vez',
    titleEn: 'Traditional Folk Costumes & Authentic Hand Embroidery',
    subtitleSr: 'Kompletne narodne nošnje i autorski komadi od prirodnog srpskog platna sa ručno vezenim floralnim i geometrijskim motivima. Izrada za folklorna društva, soliste i svečane prilike.',
    subtitleEn: 'Complete folk costumes and artisan garments woven from natural cotton-linen with hand-embroidered floral motifs. Tailored for folklore ensembles and galas.',
    metaTitleSr: 'Narodna Nošnja i Ručni Vez | Vlaška i Srpska Nošnja Homolja | Savremeni Koreni',
    metaTitleEn: 'Traditional Serbian Folk Costumes & Embroidery | Savremeni Koreni',
    metaDescriptionSr: 'Naručite autentične narodne nošnje sa ručnim vezom: vezene košulje od srpskog platna, jeleci, tkane tkanice, kecelje i prateći delovi. Ručni rad po muzejskim uzorcima.',
    metaDescriptionEn: 'Order authentic hand-embroidered Serbian folk costumes: linen shirts, velvet vests, woven belts, and aprons crafted according to museum artifacts.',
    targetKeywords: [
      'narodna nošnja prodaja',
      'srpska narodna nošnja',
      'vlaška nošnja Homolje',
      'vezena košulja srpsko platno',
      'nošnja za folklor',
      'nošnja za KUD',
      'jelek zlatovez cena',
      'ručni vez na platnu'
    ],
    heroImage: nosnjaImg,
    secondaryImage: jelekImg,
    productCategoryFilter: 'nosnje',
    targetProductIds: ['sk-kosulja-01', 'sk-subara-01', 'sk-carape-01'],
    keyHighlights: [
      {
        titleSr: 'Autentično Srpsko Platno',
        titleEn: 'Authentic Serbian Woven Linen',
        descSr: '100% prirodni pamuk i lan sa karakterističnom teksturom koja pruža vrhunsku udobnost i dugovečnost.',
        descEn: '100% natural breathable cotton-linen weave providing timeless durability and skin comfort.'
      },
      {
        titleSr: 'Ručni Vez po Muzejskim Predlošcima',
        titleEn: 'Museum-Heritage Hand Stitching',
        descSr: 'Bod po bod, iglom i pamučnim koncem u boji, prenosimo ornamente Homolja, Šumadije i Južne Srbije.',
        descEn: 'Stitch by stitch, we preserve historic ornaments of Homolje, Šumadija, and Southern Serbia.'
      },
      {
        titleSr: 'Oprema za Folklor i Soliste',
        titleEn: 'Folklore & Soloist Ensembles',
        descSr: 'Pravimo pojedinačne komade i kompletne garniture za kulturno-umetnička društva po važećim etnomuzikološkim standardima.',
        descEn: 'We craft individual soloist garments and complete team ensembles according to folklore standards.'
      },
      {
        titleSr: 'Svečana i Moderna Eko Moda',
        titleEn: 'Modern Ethno Couture',
        descSr: 'Naše vezene košulje idealne su i za venčanja, krštenja, diplomatske prijeme ili kao luksuzna savremena odeća.',
        descEn: 'Our embroidered shirts are sought-after for weddings, baptisms, and distinguished cultural galas.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Umetnost veza na srpskom platnu: Duh predaka u svakom bodu',
        headingEn: 'The art of embroidery on Serbian linen: Heritage woven into every stitch',
        paragraphsSr: [
          'Tradicionalna vezena košulja je temelj svake narodne nošnje. U selima Homolja nekada se po detaljima veza na rukavima i prsima prepoznavalo iz koje je porodice devojka, da li je spremna za udaju i kakvo joj je poreklo. Svaki cvet, lozica ili geometrijski romb nosili su simboliku plodnosti, zdravlja i zaštite od uroka.',
          'U radionici Savremeni Koreni negujemo tehnike pokrstice, belog veza i zlatoveza sa srmom. Naše košulje se ne paraju i ne blede pri pranju, jer koristimo postojane pamučne i svilene konce proverenog kvaliteta.'
        ],
        paragraphsEn: [
          'The traditional embroidered tunic or shirt is the heart of folk dress. In Homolje villages, family lineage, marital status, and regional origin could all be read in the sleeve and collar embroidery. Floral vines and geometric diamonds protected the wearer and celebrated natural vitality.',
          'At Savremeni Koreni, master artisan Tanja Petrić practices cross-stitch, white embroidery, and gilded srma cordwork, utilizing colorfast threads that retain brilliance over decades.'
        ],
        quoteSr: '„Nošnja nije kostim za predstavu — ona je identitet satkan od strpljenja i ljubavi prema precima.“',
        quoteEn: '"Folk dress is not a stage costume — it is an identity woven with patience and filial reverence."'
      }
    ],
    faqs: [
      {
        questionSr: 'Mogu li naručiti samo vezenu košulju bez kompletne nošnje?',
        questionEn: 'Can I order just an embroidered shirt without the full costume?',
        answerSr: 'Naravno! Mnogi kupci naručuju muške i ženske vezene košulje za venčanja, krsne slave ili kao autentičan komad odeće koji se kombinuje uz farmerke i pantalone.',
        answerEn: 'Of course! Many customers order individual shirts for celebrations, baptisms, or as statement slow-fashion pieces to wear with contemporary jeans or trousers.'
      },
      {
        questionSr: 'Kako odrediti veličinu košulje?',
        questionEn: 'How do I determine the right shirt size?',
        answerSr: 'Dovoljno je da nam pošaljete svoju visinu, težinu, obim grudi i dužinu rukava. Svaki komad prilagođavamo tačno vašoj telesnoj građi radi maksimalne udobnosti.',
        answerEn: 'Simply provide your height, chest circumference, and sleeve length. We tailor each garment to your individual proportions.'
      }
    ],
    relatedBlogSlugs: [
      'srpska-narodna-nosnja-kompletan-vodic-delovi-istorija',
      'vrste-veza-srpska-tradicija-tehnike-i-bodovi',
      'narodna-nosnja-homoljski-kraj-srpska-vlaska-tradicija-vodic'
    ]
  },

  'vunene-carape': {
    slug: 'vunene-carape',
    path: '/vunene-carape',
    badgeSr: '100% Prirodna Domaća Vuna • Pletenje na 5 Igala',
    badgeEn: '100% Native Pure Wool • 5-Needle Hand Knit',
    titleSr: 'Ručno Pletene Vunene Čarape sa Tradicionalnim Vezom',
    titleEn: 'Hand-Knitted Wool Socks with Folk Floral Embroidery',
    subtitleSr: 'Vrhunska toplotna izolacija i reljefni cvetni vez. Pletene starinskom tehnikom na pet igala od čiste runske vune bogate prirodnim lanolinom. Savršene za folklor, zimu i zdravlje stopala.',
    subtitleEn: 'Supreme thermal insulation and raised folk embroidery. Hand-knitted with five needles from pure fleece rich in soothing natural lanolin.',
    metaTitleSr: 'Ručno Pletene Vunene Čarape | Čarape za Folklor sa Vezom | Savremeni Koreni',
    metaTitleEn: 'Hand-Knitted Wool Socks with Folk Embroidery | Savremeni Koreni',
    metaDescriptionSr: 'Kupite ručno pletene vunene čarape od 100% domaće vune. Tradicionalni cvetni vez, pletenje na pet igala, tople i lekovite za cirkulaciju. Dečije, ženske i muške veličine.',
    metaDescriptionEn: 'Buy 100% pure wool hand-knitted socks. Traditional floral embroidery, five-needle knit, rich in lanolin for microcirculation. Child to adult sizes.',
    targetKeywords: [
      'vunene čarape prodaja',
      'ručno pletene čarape',
      'vunene čarape za folklor',
      'čarape sa cvetnim vezom',
      'pletene čarape od domaće vune',
      'nazuvice i priglavci',
      'čarape na pet igala',
      'lekovite vunene čarape'
    ],
    heroImage: carapeImg,
    secondaryImage: folklorCarapeImg,
    productCategoryFilter: 'carape',
    targetProductIds: ['sk-carape-01', 'sk-carape-02'],
    keyHighlights: [
      {
        titleSr: '100% Runska Vuna sa Lanolinom',
        titleEn: '100% Pure Fleece with Lanolin',
        descSr: 'Prirodni lanolin iz vune nežno neguje kožu stopala, pospešuje mikrocirkulaciju i sprečava stvaranje neprijatnih mirisa.',
        descEn: 'Natural wool lanolin nurtures foot skin, stimulates healthy circulation, and naturally inhibits bacterial odors.'
      },
      {
        titleSr: 'Pletenje na 5 Igala bez Šavova',
        titleEn: 'Seamless 5-Needle Knitting',
        descSr: 'Kružna tehnika pletenja obezbeđuje potpunu elastičnost, savršeno prianjanje uz petu i prste bez žuljanja u obući.',
        descEn: 'Tubular circular hand-knitting ensures elastic support, contouring the heel and toes without chafing seams.'
      },
      {
        titleSr: 'Bogat Reljefni Cvetni Vez',
        titleEn: 'Relief Floral Folk Embroidery',
        descSr: 'Svaki par je unikat — cvetovi božura, ruža i poljskog cveća vezu se ručno na gornjištu i risu čarape.',
        descEn: 'Each pair is a work of art — peony and wildflower motifs embroidered by hand onto the cuff and instep.'
      },
      {
        titleSr: 'Izdržljivost za Scenu i Zimu',
        titleEn: 'Stage & Winter Resilience',
        descSr: 'Dvoslojno ojačana peta i vrh omogućavaju decenijsku izdržljivost pri intenzivnim folklornim igrama i opancima.',
        descEn: 'Double-reinforced heels and toes ensure years of durability under demanding dance steps and leather opanci.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Lekovitost i tajna prave domaće runske vune',
        headingEn: 'Therapeutic virtues of unprocessed native sheep wool',
        paragraphsSr: [
          'Prava vuna sa homoljskih pašnjaka ne može se porediti sa sintetičkim akrilom. Prirodna vuna je "pametno" vlakno: ona apsorbuje do 30% vlage a da na dodir ostane potpuno suva, održavajući optimalnu temperaturu stopala.',
          'Stariji ljudi u našem kraju od davnina su znali da nošenje vunenih čarapa pomaže kod reumatskih bolova, prehlade, loše periferne cirkulacije i "hladnih nogu". Zbog prisustva prirodnog voska (lanolina), stopala ostaju meka i zdrava.'
        ],
        paragraphsEn: [
          'Genuine wool from Homolje pastures is incomparable to synthetic acrylic yarn. Pure wool is an intelligent natural fiber: it absorbs up to 30% of moisture vapor while feeling dry to the touch, maintaining ideal foot thermoregulation.',
          'Centuries of folk wisdom in our region confirm that untreated wool socks relieve joint aches, support circulation, and warm chronically cold feet through natural micro-massaging stimulation.'
        ]
      }
    ],
    sizeGuide: {
      titleSr: 'Tabela veličina za vunene čarape',
      titleEn: 'Wool Socks Size Chart',
      instructionsSr: 'Naše čarape su prirodno rastegljive zahvaljujući pletenju na pet igala. Izaberite broj obuće koji uobičajeno nosite.',
      instructionsEn: 'Hand-knitted socks feature natural elasticity. Simply choose your standard shoe size.',
      table: [
        { size: 'Dečije (28 - 34)', measurement: '17 - 21 cm', note: 'Za najmlađe folklorce i decu' },
        { size: 'Ženske S/M (36 - 38)', measurement: '22 - 24 cm', note: 'Standardna ženska veličina' },
        { size: 'Ženske/Muške M/L (39 - 41)', measurement: '25 - 26.5 cm', note: 'Univerzalna veličina za nošnju' },
        { size: 'Muške XL (42 - 44)', measurement: '27 - 28.5 cm', note: 'Standardna muška veličina' },
        { size: 'Muške XXL (45 - 47)', measurement: '29 - 31 cm', note: 'Izrada po posebnoj meri' }
      ]
    },
    faqs: [
      {
        questionSr: 'Da li se vunene čarape peru u mašini?',
        questionEn: 'Can wool socks be washed in a washing machine?',
        answerSr: 'Preporučujemo ručno pranje u mlakoj vodi (do 30°C) sa blagim šamponom za vunu, ili program za vunu na mašini bez centrifuge. Suše se položene na peškir, ne na radijatoru.',
        answerEn: 'We recommend gentle hand-washing in lukewarm water (up to 30°C) with a mild wool shampoo, or a dedicated wool machine cycle without spin-drying. Lay flat on a towel to dry.'
      },
      {
        questionSr: 'Da li čarape bockaju kožu?',
        questionEn: 'Do pure wool socks itch or scratch against the skin?',
        answerSr: 'Koristimo meku, finu vunu i tehniku višestrukog pranja i omekšavanja pre izrade, tako da su izuzetno prijatne na koži. Za najosetljiviju kožu mogu se nositi preko tanke pamučne sokne.',
        answerEn: 'We use premium soft fleece that is gently washed and conditioned, making it comfortable directly on skin. Highly sensitive wearers can also layer them over thin cotton socks.'
      }
    ],
    relatedBlogSlugs: [
      'vunene-carape-pletenje-na-pet-igala-lekovitost-vune',
      'prirodna-runska-vuna-za-pletenje-lekovitost-lanolin',
      'vezene-carape-za-folklor-vunene-cvetni-vez-pet-igala'
    ]
  },

  'etno-pokloni-za-inostranstvo': {
    slug: 'etno-pokloni-za-inostranstvo',
    path: '/etno-pokloni-za-inostranstvo',
    badgeSr: 'Autentičan Srpski Dar • Bezbedno Avio Pakovanje',
    badgeEn: 'Authentic Serbian Gift • Safe Travel Packaging',
    titleSr: 'Autentični Etno Pokloni iz Srbije za Inostranstvo i Dijasporu',
    titleEn: 'Authentic Serbian Ethno Gifts for International Travel & Diaspora',
    subtitleSr: 'Nosite komadić zavičaja sa sobom. Unikatne ručno rađene torbice, vezeni stolnjaci, šubare, čarape i nakit — upakovani sa stilom i sertifikatom autentičnog ručnog rada.',
    subtitleEn: 'Carry a piece of homeland heritage. Unique handcrafted bags, embroidered linens, fur hats, and wool socks — packaged with a certificate of authentic craftsmanship.',
    metaTitleSr: 'Autentični Etno Pokloni iz Srbije za Inostranstvo | Suveniri Ručni Rad | Savremeni Koreni',
    metaTitleEn: 'Authentic Serbian Handcrafted Ethno Gifts for Abroad | Savremeni Koreni',
    metaDescriptionSr: 'Tražite originalan poklon iz Srbije za prijatelje ili rodbinu u inostranstvu? Otkrijte autentične unikatne torbice, vez i vunu iz Homolja. Lagano za kofer i avion.',
    metaDescriptionEn: 'Looking for a memorable authentic gift from Serbia for friends or hosts abroad? Discover handcrafted bags, embroidered linen, and folk crafts from Homolje.',
    targetKeywords: [
      'etno pokloni srbija',
      'pokloni za inostranstvo',
      'srpski suveniri ručni rad',
      'autentičan poklon iz srbije',
      'šta poneti u dijasporu',
      'unikatne vezene torbe poklon',
      'etno darovi',
      'originalan poklon za strance'
    ],
    heroImage: homoljskiSuveniriImg,
    secondaryImage: vezeniNadstolnjakImg,
    productCategoryFilter: 'pokloni',
    targetProductIds: ['sk-dom-01', 'sk-nakit-01', 'sk-carape-01', 'sk-subara-01'],
    keyHighlights: [
      {
        titleSr: 'Idealan za Kofer i Avio Putovanja',
        titleEn: 'Lightweight & Safe for Air Travel',
        descSr: 'Svi naši predmeti su od tekstila, vune i kože — ne lome se, lagani su za prtljag i ne stvaraju probleme na carini.',
        descEn: 'Crafted from supple textile, wool, and leather — unbreakable, featherlight in luggage, and hassle-free through customs.'
      },
      {
        titleSr: 'Sertifikat Autentičnosti',
        titleEn: 'Artisan Certificate of Origin',
        descSr: 'Svaki poklon dolazi sa dvojezičnom karticom o poreklu i majstorskom ručnom radu iz Homolja.',
        descEn: 'Each gift includes a bilingual certificate detailing the artisan origin and traditional technique from Homolje.'
      },
      {
        titleSr: 'Emotivna Vrednost za Dijasporu',
        titleEn: 'Heartfelt Meaning for Diaspora',
        descSr: 'Za naše ljude u Kanadi, Americi, Nemačkoj ili Australiji, miris domaće vune i toplina veza bude najlepše uspomene.',
        descEn: 'For diaspora families worldwide, the scent of pure wool and the beauty of folk embroidery evoke cherished memories.'
      },
      {
        titleSr: 'Elegantno Etno Pakovanje',
        titleEn: 'Refined Eco-Friendly Presentation',
        descSr: 'Isporučujemo u ukusnom pakovanju spremnom za darivanje, sa svilenim papirom i prirodnim kanapom.',
        descEn: 'Delivered in tasteful craft packaging ready for gifting, tied with natural jute cord.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Šta pokloniti poslovnim partnerima i prijateljima u inostranstvu?',
        headingEn: 'What to gift international hosts and foreign business partners?',
        paragraphsSr: [
          'Kada putujemo u posetu prijateljima ili poslovnim partnerima van granica Srbije, želimo dar koji nije jeftini industrijski suvenir sa štanda, već nešto što odiše toplinom, kulturom i veštinom ljudskih ruku.',
          'Unikatna heklana ili makrame torbica sa drvenim ručkama, par vezenih vunenih čarapa ili ručno tkani nadstolnjak sa motivima Homolja ostavljaju dubok utisak jer svedoče o bogatoj evropskoj baštini koja živi i u 21. veku.'
        ],
        paragraphsEn: [
          'When visiting friends or business associates abroad, we seek a gift far elevated above cheap mass-manufactured tourist trinkets — something radiating soul, culture, and artisanal skill.',
          'A macramé handbag with polished wooden handles, a pair of floral wool socks, or a delicate embroidered linen runner leaves an unforgettable impression of genuine European craftsmanship.'
        ]
      }
    ],
    faqs: [
      {
        questionSr: 'Da li su ovi predmeti dozvoljeni u avionskom prtljagu?',
        questionEn: 'Are these items allowed in carry-on and checked luggage on flights?',
        answerSr: 'Da, 100%. U pitanju su ručno rađeni tekstilni, pleteni i krzneni odevni predmeti i ukrasi. Ne sadrže tečnosti, oštre metalne predmete niti kvarljivu hranu, te prolaze carinsku kontrolu bez ikakvih prepreka.',
        answerEn: 'Yes, 100%. These are textile, knitwear, and craft items with no restricted liquids or sharp components, ensuring seamless airport and customs transit.'
      },
      {
        questionSr: 'Mogu li naručiti da paket pošaljete direktno na adresu u inostranstvu kao iznenađenje?',
        questionEn: 'Can you ship directly to a recipient abroad as a surprise gift?',
        answerSr: 'Da, možemo pripremiti paket sa posvetom po vašoj želji i poslati ga direktno primaocu u bilo koju zemlju sveta.',
        answerEn: 'Yes, we can include your custom personalized message and send the gift parcel directly to the recipient worldwide.'
      }
    ],
    relatedBlogSlugs: [
      'etno-pokloni-srbija-autenticni-suveniri-rucni-rad-tradicija',
      'zenske-torbice-i-unikatne-torbe-autentican-rucni-rad-vs-brendovi',
      'ceger-torbe-sivenje-kroj-platno-vez-eko-moda'
    ]
  },
  'unikatne-makrame-torbe': {
    slug: 'unikatne-makrame-torbe',
    path: '/unikatne-makrame-torbe',
    badgeSr: '100% Prirodni Pamučni Kanap • Ručno Čvorovanje',
    badgeEn: '100% Natural Cotton Cord • Hand Knotting',
    titleSr: 'Unikatne Makrame Torbe i Heklane Torbice',
    titleEn: 'Unique Handcrafted Macramé & Crocheted Handbags',
    subtitleSr: 'Autentične ženske torbe izrađene drevnom veštinom makrame čvorovanja sa ručkama od bukovog drveta i unutrašnjom pamučnom postavom. Spoj prirodne estetike i modernog boho stila.',
    subtitleEn: 'Handcrafted artisan bags created using ancient knotting techniques, featuring natural beechwood handles and lined cotton interior. Timeless bohemian elegance.',
    metaTitleSr: 'Unikatne Makrame Torbe i Heklane Torbice Ručni Rad | Savremeni Koreni',
    metaTitleEn: 'Handcrafted Macrame & Crochet Handbags | Savremeni Koreni',
    metaDescriptionSr: 'Kupite unikatne ručno čvorovane makrame torbe i heklane torbice sa drvenim ručkama. 100% prirodni pamuk, dugotrajnost, izrada u radionici Jošanica.',
    metaDescriptionEn: 'Buy unique artisan hand-knotted macrame bags and crochet handbags with wooden handles. 100% natural cotton cord, handcrafted in Serbia.',
    targetKeywords: [
      'makrame torbe',
      'heklane torbice',
      'unikatne torbe ručni rad',
      'boho torba sa drvenim ručkama',
      'torbe od pamučnog kanapa',
      'etno torbice prodaja',
      'letnja makrame torba',
      'ručno rađene torbe srbija'
    ],
    heroImage: heklanaKlacImg,
    secondaryImage: heklanaCrvenaImg,
    productCategoryFilter: 'torbice',
    targetProductIds: ['sk-torba-01', 'sk-nakit-01'],
    keyHighlights: [
      {
        titleSr: '100% Prirodni Pamuk',
        titleEn: '100% Natural Cotton',
        descSr: 'Čvrsti ekološki pamučni kanap debljine 3-5 mm pruža postojanu formu koja ne gubi oblik godinama.',
        descEn: 'Durable 3-5mm eco cotton cord ensures a sturdy silhouette that retains its shape over years.'
      },
      {
        titleSr: 'Ergonomske Drvene Ručke',
        titleEn: 'Polished Hardwood Handles',
        descSr: 'Ručke od prirodnog parene bukve i oraha, ručno brušene i zaštićene organskim pčelinjim voskom.',
        descEn: 'Beech and walnut handles hand-sanded and finished with organic protective beeswax.'
      },
      {
        titleSr: 'Postavljena Unutrašnjost',
        titleEn: 'Fully Lined Interior',
        descSr: 'Svaka torba sadrži unutrašnju postavu od gustog pamučnog platna sa pregradom za telefon i sitnice.',
        descEn: 'Lined with dense breathable cotton fabric with dedicated phone and key compartments.'
      },
      {
        titleSr: 'Unikatan Ručni Rad',
        titleEn: 'Unique Artisan Craft',
        descSr: 'Hiljade čvorova vezanih rukom čine svaki primerak jedinstvenim umetničkim delom.',
        descEn: 'Thousands of hand-tied knots turn each handbag into a one-of-a-kind wearable art piece.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Umetnost čvorovanja: Zašto makrame torbe nikada ne izlaze iz mode',
        headingEn: 'The art of knotting: Why macramé handbags transcend fast fashion',
        paragraphsSr: [
          'Makrame je drevna tehnika stvaranja tekstila vezivanjem specifičnih čvorova bez upotrebe igala i razboja. U našoj radionici u Jošanici, ovu tehniku podigli smo na nivo savremenog luksuznog aksesoara. Za razliku od masovne industrijske proizvodnje od veštačkih materijala, svaka naša makrame torba ima dušu i toplinu prirodnih vlakana.',
          'Kombinacija čvrstog pamuka, prirodnog drveta i pažljivo izvedenih romboidnih i spiralnih šara čini ove torbe idealnim za prolećne i letnje šetnje, ali i za svečane prilike gde želite da se istaknete autentičnim stilom.'
        ],
        paragraphsEn: [
          'Macramé is an ancient textile craft relying purely on knot geometry without needles or looms. In our Jošanica studio, we elevate this heritage into contemporary sustainable luxury. Unlike mass-market synthetic bags, every piece radiates natural warmth.',
          'The union of dense cotton cords, polished beechwood, and geometric knot architecture makes these bags ideal for warm season strolls or distinguished evening events.'
        ],
        quoteSr: '„Jedna makrame torba zahteva preko osam sati neprekidnog čvorovanja i matematičke preciznosti majstorskih ruku.“',
        quoteEn: '"A single macramé bag demands over eight hours of continuous knotting and tactile spatial precision."'
      }
    ],
    faqs: [
      {
        questionSr: 'Kako se održavaju i peru makrame torbe?',
        questionEn: 'How should macramé handbags be cleaned and cared for?',
        answerSr: 'Makrame torbe se čiste blagim ručnim pranjem u mlakoj vodi sa malo tečnog sapuna. Nemojte ih uvijati niti prati u mašini. Nakon ispiranja, položite torbu ravno na peškir da se prirodno osuši.',
        answerEn: 'Hand wash gently in lukewarm water with mild liquid soap. Do not wring or machine wash. Lay flat on a clean towel to air dry naturally.'
      },
      {
        questionSr: 'Može li se torba poručiti u drugoj boji (npr. crna, bež, maslinasta)?',
        questionEn: 'Can the handbag be custom ordered in other colors (e.g. black, ecru, olive)?',
        answerSr: 'Da, imamo široku paletu pamučnih kanapa: prirodni ecru (bež), terakota, senf žuta, maslinasto zelena, crna i teget. Izrada traje 3 do 5 dana.',
        answerEn: 'Yes, we offer multiple cord shades: natural ecru, terracotta, mustard, olive green, black, and navy. Crafting takes 3 to 5 business days.'
      }
    ],
    relatedBlogSlugs: [
      'rucno-cvorovanje-makrame-torbe-kanap-i-drvo',
      'modern-makrame-i-rucno-cvorovanje-tehnike-hearts-dreamcatcher-macraweaving',
      'makrame-konac-craftcord-kanap-snur-twisted-vodic-kroz-debljine'
    ]
  },
  'zlatovez-i-srma': {
    slug: 'zlatovez-i-srma',
    path: '/zlatovez-i-srma',
    badgeSr: 'Kraljevska Tehnika • Zlatna i Srebrna Srma',
    badgeEn: 'Royal Technique • Gold & Silver Metallic Srma',
    titleSr: 'Tradicionalni Srpski Zlatovez i Vez Srmom',
    titleEn: 'Traditional Serbian Goldwork & Srma Embroidery',
    subtitleSr: 'Vrhunac narodnog vezenja na plišu i čoji. Raskošni svečani jeleci, slavski detalji i ukrasi izrađeni autentičnom tehnikom polaganja srme pod rukom majstora.',
    subtitleEn: 'The pinnacle of historical Serbian embroidery on velvet and wool broadcloth. Majestic vests (jeleci), ceremonial accents, and heirlooms crafted with authentic metallic srma.',
    metaTitleSr: 'Srpski Zlatovez i Vez Srmom | Svečani Jeleci i Motivi | Savremeni Koreni',
    metaTitleEn: 'Traditional Serbian Goldwork & Srma Embroidery | Savremeni Koreni',
    metaDescriptionSr: 'Saznajte sve o zlatovezu i vezu srmom u Srbiji. Naručite svečani jelek, crkvene i slavske detalje izrađene tehnikom polaganja srme na plišu.',
    metaDescriptionEn: 'Explore authentic Serbian goldwork and metallic srma embroidery. Bespoke ceremonial folk vests, religious accents, and heirloom hand embroidery.',
    targetKeywords: [
      'zlatovez srbija',
      'vez srmom',
      'zlatovez na plišu',
      'srpski zlatovez prodaja',
      'jelek sa zlatovezom',
      'zlatna srma tehnika',
      'vez sa zlatnom niti',
      'narodna nošnja zlatovez'
    ],
    heroImage: zlatovezImg,
    secondaryImage: jelekImg,
    productCategoryFilter: 'nosnje',
    targetProductIds: ['sk-nosnja-02', 'sk-kosulja-02'],
    keyHighlights: [
      {
        titleSr: 'Plemenita Zlatna i Srebrna Srma',
        titleEn: 'Precious Gold & Silver Srma',
        descSr: 'Koristimo tradicionalnu srmu visokog sjaja koja zadržava blistavost i postojanost decenijama.',
        descEn: 'We use high-luster metallic threads that retain their radiant sheen and integrity for generations.'
      },
      {
        titleSr: 'Vez na Podlozi (Reljef)',
        titleEn: 'Relief Raised Embroidery',
        descSr: 'Starinska tehnika u kojoj se srma ne provlači kroz platno već polaže i pričvršćuje nevidljivim bodom.',
        descEn: 'Historical couching method where metallic thread is sculpted over foundations with invisible stitches.'
      },
      {
        titleSr: 'Kvalitetni Pliš i Čoja',
        titleEn: 'Fine Velvet & Broadcloth',
        descSr: 'Baza od dubokog crnog ili bordo pliša omogućava maksimalan vizuelni kontrast zlatnih ornamenata.',
        descEn: 'Deep black and burgundy velvet foundations deliver striking contrast to illuminated golden motifs.'
      },
      {
        titleSr: 'Porodično Nasleđe',
        titleEn: 'Enduring Family Heirloom',
        descSr: 'Predmeti izrađeni zlatovezom se čuvaju i prenose s kolena na koleno kao dragoceno blago.',
        descEn: 'Goldwork creations are preserved as treasures, passed down proudly through generations.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Zlatovez — Carsko dostojanstvo u srpskoj narodnoj nošnji',
        headingEn: 'Goldwork: Imperial dignity embedded in Serbian national costumes',
        paragraphsSr: [
          'Zlatovez predstavlja krunu veza na balkanskim prostorima. Nastao pod uticajem vizantijske dvorske umetnosti i srednjovekovnih manastirskih radionica, zlatovez se tokom 19. veka preselio u varoške i svečane seoske nošnje, gde je postao znak statusa, svečanosti i najuzvišenijih trenutaka u životu.',
          'U našoj radionici, zlatovez se izrađuje s punim poštovanjem arhivskih pravila: srma se pažljivo polaže preko kartonskih ili pamučnih šablona kako bi se postigao prepoznatljivi trodimenzionalni reljef koji presijava pri svakom pokretu.'
        ],
        paragraphsEn: [
          'Goldwork represents the crown of textile arts in Serbian history. Evolving from Byzantine imperial courts and medieval monastic workshops, it became the hallmark of ceremonial wedding vests and Sunday finery.',
          'In our Jošanica studio, goldwork is stitched in strict accordance with archival principles, sculpting three-dimensional motifs that catch ambient light with dramatic depth.'
        ],
        quoteSr: '„Zlatovez nije samo zanat, to je strpljivo klesanje svetlosti zlatnom iglom na tamnom plišu.“',
        quoteEn: '"Goldwork is not just a craft; it is the patient sculpting of light with a needle on dark velvet."'
      }
    ],
    faqs: [
      {
        questionSr: 'Koliko traje izrada jednog jeleka sa zlatovezom?',
        questionEn: 'How long does it take to hand-embroider a folk vest with goldwork?',
        answerSr: 'U zavisnosti od gustine ornamenta, izrada svečanog jeleka traje od 10 do 20 radnih dana pažljivog ručnog rada.',
        answerEn: 'Depending on pattern complexity, crafting a full ceremonial goldwork vest requires 10 to 20 business days of meticulous labor.'
      },
      {
        questionSr: 'Mogu li naručiti zlatovez po sopstvenom crtežu ili porodičnom grbu?',
        questionEn: 'Can goldwork be customized with a specific monogram or family coat of arms?',
        answerSr: 'Da, radimo unikatne porudžbine po vašem motivu, inicijalima, grbu ili crkvenom ornamentu. Pošaljite nam skicu i prilagodićemo šablon.',
        answerEn: 'Yes, we accept bespoke commissions for monograms, family crests, or ecclesiastical motifs tailored to your specifications.'
      }
    ],
    relatedBlogSlugs: [
      'zlatovez-tehnika-vezenja-srma-plis-svila-istorija',
      'jelek-za-folklor-narodni-srpski-jelek-zlatovez-kroj',
      'vez-kroz-vekove-i-danas-rucni-vez'
    ]
  },
  'heklani-nakit-i-ogrlice': {
    slug: 'heklani-nakit-i-ogrlice',
    path: '/heklani-nakit-i-ogrlice',
    badgeSr: 'Mikro-Heklanje • Drvene Perle • Lagano za Nošenje',
    badgeEn: 'Micro-Crochet • Natural Wood Beads • Featherlight',
    titleSr: 'Unikatni Heklani Nakit i Etno Ogrlice',
    titleEn: 'Unique Hand-Crocheted Jewelry & Folk Necklaces',
    subtitleSr: 'Lagani, upečatljivi komadi nakita izrađeni tehnikama finog heklanja i makramea. Prirodni pamuk, bukovo drvo i tradicijski kolorit koji unosi toplinu u svaki moderan izgled.',
    subtitleEn: 'Weightless, distinctive artisan jewelry sets created with micro-crochet and macramé knotting. Pure cotton, beechwood, and folk color palettes.',
    metaTitleSr: 'Unikatni Heklani Nakit i Etno Ogrlice Ručni Rad | Savremeni Koreni',
    metaTitleEn: 'Unique Hand-Crocheted Jewelry & Folk Necklaces | Savremeni Koreni',
    metaDescriptionSr: 'Pogledajte kolekciju unikatnog heklanog nakita i etno ogrlica. Ručni rad od pamuka i drveta, lagano, antialergijsko, idealan autentičan poklon.',
    metaDescriptionEn: 'Discover handcrafted crochet necklaces and ethno jewelry sets from Serbia. Featherlight cotton and natural wooden beads, hypoallergenic clasps.',
    targetKeywords: [
      'heklani nakit',
      'unikatne heklane ogrlice',
      'etno nakit ručni rad',
      'heklane minđuše',
      'srpski tradicionalni nakit',
      'nakit od konca i drveta',
      'unikatne ogrlice srbija',
      'lagani nakit od pamuka'
    ],
    heroImage: nakitImg,
    secondaryImage: trobojniNakitImg,
    productCategoryFilter: 'nakit',
    targetProductIds: ['sk-nakit-01', 'sk-nakit-02'],
    keyHighlights: [
      {
        titleSr: 'Težina Manja od 30 Grama',
        titleEn: 'Weighs Under 30 Grams',
        descSr: 'Za razliku od teškog metalnog nakita, heklani nakit je perolak i prijatan za nošenje tokom celog dana.',
        descEn: 'Unlike heavy metal pieces, cotton crochet jewelry feels featherlight and comfortable from morning to night.'
      },
      {
        titleSr: 'Hipoalergijski Materijali',
        titleEn: 'Hypoallergenic Components',
        descSr: 'Ne izaziva iritacije na koži jer je u direktnom dodiru sa vratom meki prirodni mercerizovani pamuk.',
        descEn: 'Safe for sensitive skin as only soft mercerized cotton touches the neckline.'
      },
      {
        titleSr: 'Ručno Bojene i Brušene Perle',
        titleEn: 'Natural Wooden Beads',
        descSr: 'Elementi od domaćeg bukovog i lipovog drveta daju toplinu i organsku teksturu.',
        descEn: 'Domestic beech and linden wooden beads provide organic grounding and warmth.'
      },
      {
        titleSr: 'Poklon Pakovanje sa Posvetom',
        titleEn: 'Gift Box Packaging',
        descSr: 'Svaka ogrlica dolazi u elegantnoj kutijici sa pričom o tehnici izrade i poreklu iz Homolja.',
        descEn: 'Delivered in a refined presentation box with notes on the craft technique and origin.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Heklani nakit kao spoj balkanske ornamentike i savremene mode',
        headingEn: 'Crocheted jewelry: Merging Balkan folklore geometry with modern couture',
        paragraphsSr: [
          'Heklanje je vekovima bilo rezervisano za zavese, miljee i ukrasne trake na narodnoj nošnji. Međutim, primenom tehnike mikro-heklanja — heklanja izuzetno tankim pamučnim koncem i minijaturnom heklicom — stvorili smo nakit koji je istovremeno nežan, upečatljiv i dugovečan.',
          'Naše ogrlice i minđuše inspirisane su bojama homoljskog pejzaža: terakota crvenom, tamnoplavom bojom planinskih reka, zagasito zelenom i toplom bojom pšenice. One predstavljaju savršen detalj koji obogaćuje jednostavnu belu košulju, lanenu haljinu ili večernju toaletu.'
        ],
        paragraphsEn: [
          'Crochet was historically reserved for lace trimmings on shirts and linens. By mastering micro-crochet with fine mercerized thread and miniature hooks, we create jewelry that is structurally delicate yet remarkably robust.',
          'Inspired by the natural palette of Homolje: clay terracotta, mountain river navy, and golden rye. These pieces effortlessly elevate a crisp white linen shirt or formal evening dress.'
        ]
      }
    ],
    faqs: [
      {
        questionSr: 'Da li heklani nakit gubi formu ukoliko se pokvasi?',
        questionEn: 'Does crochet jewelry lose its shape if exposed to moisture?',
        answerSr: 'Ne. Koristimo čvrsto predeni mercerizovani pamuk koji je prirodno otporan. Ukoliko se nakit pokvasi na kiši, samo ga položite na ravnu podlogu da se osuši.',
        answerEn: 'No. We use mercerized high-twist cotton with structural resilience. If caught in rain, simply lay it flat to dry at room temperature.'
      },
      {
        questionSr: 'Mogu li se kupiti minđuše u paru sa ogrlicom?',
        questionEn: 'Can matching earrings be purchased as a complete set with the necklace?',
        answerSr: 'Da, svaki model ima odgovarajuće minđuše i narukvicu u istom stilu i koloritnoj šemi.',
        answerEn: 'Yes, matching earrings and bracelets are crafted to form a harmonious matching ensemble.'
      }
    ],
    relatedBlogSlugs: [
      'heklanje-vodic-kroz-heklani-nakit-tehnike-i-cipku',
      'heklanje-za-pocetnike-seme-osnovni-bodovi-tehnika',
      'vez-kroz-vekove-i-danas-rucni-vez'
    ]
  },
  'opanci-i-folklorna-obuca': {
    slug: 'opanci-i-folklorna-obuca',
    path: '/opanci-i-folklorna-obuca',
    badgeSr: '100% Prirodna Goveđa Koža • Opančarski Zanat',
    badgeEn: '100% Genuine Cattle Leather • Master Cobbler Craft',
    titleSr: 'Tradicionalni Opanci za Folklor i Nošnju',
    titleEn: 'Traditional Leather Folk Shoes (Opanci) for Dance',
    subtitleSr: 'Ručno pleteni srpski opanci sa kljunom (šiljkani) izrađeni od prave goveđe kože. Savitljiv i izdržljiv đon prilagođen za scensku igru u KUD-ovima, proslave i etno nošnju.',
    subtitleEn: 'Hand-woven Serbian leather folk shoes with the iconic upturned curved tip. Flexible, durable soles designed for folklore ensembles and cultural festivities.',
    metaTitleSr: 'Srpski Opanci za Folklor | Kožni Opanci sa Kljunom | Savremeni Koreni',
    metaTitleEn: 'Traditional Serbian Leather Folk Shoes (Opanci) | Savremeni Koreni',
    metaDescriptionSr: 'Kupite autentične kožne opanke sa kljunom za folklor i KUD. Ručno pletenje od prave kože, brojevi od 28 do 46, izuzetna savitljivost i udobnost.',
    metaDescriptionEn: 'Buy authentic hand-woven leather opanci for folk dancing and costumes. Genuine hide, sizes 28-46, dance-tested durability. Fast shipping.',
    targetKeywords: [
      'opanci za folklor',
      'srpski opanci prodaja',
      'kožni opanci sa kljunom',
      'opanci za kud',
      'šiljkani opanci',
      'dečiji opanci za folklor',
      'narodna obuća opanci',
      'opanci cena srbija'
    ],
    heroImage: opanciImg,
    secondaryImage: tkanicaImg,
    productCategoryFilter: 'carape',
    targetProductIds: ['sk-opanci-01', 'sk-carape-01', 'sk-carape-02'],
    keyHighlights: [
      {
        titleSr: '100% Prirodna Koža',
        titleEn: '100% Genuine Leather',
        descSr: 'Goveđi boks i teleća koža štavljena bez štetnih soli za maksimalnu mekoću i disanje stopala.',
        descEn: 'Premium cattle hide cured for maximum suppleness, breathability, and prolonged wear.'
      },
      {
        titleSr: 'Autentičan Srpski Kljun',
        titleEn: 'Iconic Upturned Toe',
        descSr: 'Tradicionalni šiljak pleten kožnom oputom koji definiše moravski i šumadijski tip opanaka.',
        descEn: 'Traditional curved tip woven with leather straps defining classical Serbian folklore footwear.'
      },
      {
        titleSr: 'Savitljiv Đon za Igru',
        titleEn: 'Dance-Optimized Flexible Sole',
        descSr: 'Posebno krojeni đon omogućava brzo savijanje stopala pri skokovima i brzim folklornim koracima.',
        descEn: 'Specially engineered sole allows fluid flex during swift stage footwork and jumps.'
      },
      {
        titleSr: 'Veličine od 28 do 46',
        titleEn: 'Sizes from 28 to 46',
        descSr: 'Pravimo dečije opanke za početne folklorne grupe, kao i standardne muške i ženske brojeve.',
        descEn: 'We craft sizes for children’s ensembles as well as standard adult men’s and women’s sizing.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Opančarski zanat — Simbol srpskog koraka kroz vekove',
        headingEn: 'The cobbler’s legacy: The shoe that carried Serbia through history',
        paragraphsSr: [
          'Opanci su vekovima bili osnovna obuća srpskog seljaka. Lagani, fleksibilni i savršeno prilagođeni kretanju po planinskim vrletima i livadama, opanci su omogućavali stopalu da diše i prirodno se kreće. Karakterističan vrh ili kljun služio je ne samo kao ukras, već je u davna vremena sprečavao prodiranje blata i vlage.',
          'Danas naši opanci krase nastupe vodećih kulturno-umetničkih društava u Srbiji, Evropi i rasejanju. Pleteni sa posebnom pažnjom, obezbeđuju izvođačima sigurnost na bini i autentičan izgled celokupnog ansambla.'
        ],
        paragraphsEn: [
          'For centuries, opanci were the quintessential footwear of the Serbian countryside. Pliable and breathable, they molded naturally to the wearer’s foot for effortless movement across mountainous terrain.',
          'Today, our handcrafted shoes equip folklore troupes across Europe and the diaspora, delivering reliable stage grip and pristine archival accuracy.'
        ]
      }
    ],
    sizeGuide: {
      titleSr: 'Tabela brojeva i dužina gazišta opanaka',
      titleEn: 'Shoe Size Chart & Foot Insole Measurements',
      instructionsSr: 'Izmerite dužinu bosog stopala (ili u vunenim čarapama) od pete do najdužeg prsta u centimetrima. Pošto se opanci najčešće nose preko vunenih čarapa, preporučujemo da merite u čarapama koje ćete nositi.',
      instructionsEn: 'Measure foot length in centimeters from heel to longest toe while wearing the socks you intend to use with the opanci.',
      table: [
        { size: 'Broj 36-37', measurement: '23.0 - 24.0 cm', note: 'Dečiji veći / manji ženski' },
        { size: 'Broj 38-39', measurement: '24.5 - 25.5 cm', note: 'Standardni ženski broj' },
        { size: 'Broj 40-41', measurement: '26.0 - 26.5 cm', note: 'Veći ženski / manji muški' },
        { size: 'Broj 42-43', measurement: '27.0 - 28.0 cm', note: 'Standardni muški broj' },
        { size: 'Broj 44-45', measurement: '28.5 - 29.5 cm', note: 'Krupniji muški broj' },
        { size: 'Broj 46+', measurement: '30.0+ cm', note: 'Ekstra veličina po meri' }
      ]
    },
    faqs: [
      {
        questionSr: 'Da li se opanci nose direktno na nogu ili uz vezene vunene čarape?',
        questionEn: 'Are opanci worn directly on the foot or paired with wool socks?',
        answerSr: 'Tradicionalno se uvek nose preko ručno pletenih vezenih vunenih čarapa ili nazuvica, koje pružaju udobnost i sprečavaju žuljeve.',
        answerEn: 'Traditionally they are always worn over hand-knitted woolen folk socks, ensuring comfort and authentic presentation.'
      },
      {
        questionSr: 'Kako sprečiti da se koža opanaka isuši?',
        questionEn: 'How can natural leather opanci be kept supple and conditioned?',
        answerSr: 'Kožu povremeno premažite tankim slojem glicerina, voska za kožu ili bezbojnog balzama, i čuvajte ih na suvom mestu.',
        answerEn: 'Periodically apply a light coat of natural leather balm or beeswax, and store in a ventilated dry place.'
      }
    ],
    relatedBlogSlugs: [
      'opanci-za-folklor-srpski-opanci-izrada-i-vrste',
      'vezene-carape-za-folklor-vunene-cvetni-vez-pet-igala',
      'vunene-carape-pletenje-na-pet-igala-lekovitost-vune'
    ]
  },
  'vezene-kosulje-za-svadbe-i-slave': {
    slug: 'vezene-kosulje-za-svadbe-i-slave',
    path: '/vezene-kosulje-za-svadbe-i-slave',
    badgeSr: 'Srpsko Domaće Platno • Za Venčanja i Krsne Slave',
    badgeEn: 'Serbian Domestic Woven Cotton • Weddings & Slava',
    titleSr: 'Svečane Vezene Košulje za Venčanja i Slave',
    titleEn: 'Ceremonial Embroidered Shirts for Weddings & Slava',
    subtitleSr: 'Autentične muške i ženske košulje od 100% prirodnog domaćeg platna sa prefinjenim ručnim vezom na ruskoj kragni, grudima i manžetnama. Spoj gospodskog stila i tradicije.',
    subtitleEn: 'Authentic heirloom shirts crafted from pure domestic woven cotton with intricate embroidery on the mandarin collar, chest, and cuffs.',
    metaTitleSr: 'Vezene Košulje za Venčanja, Svadbe i Slave | Savremeni Koreni',
    metaTitleEn: 'Ceremonial Embroidered Wedding & Slava Shirts | Savremeni Koreni',
    metaDescriptionSr: 'Naručite svečane vezene košulje od srpskog platna za venčanja, kumstvo i krsne slave. Kroj sa ruskom kragnom, prefinjen vez, izrada po meri tela.',
    metaDescriptionEn: 'Order authentic hand-embroidered Serbian shirts for weddings and patron saint feasts. 100% breathable cotton, custom tailored fits.',
    targetKeywords: [
      'vezena košulja za venčanje',
      'muška vezena košulja za slavu',
      'srpska košulja sa vezom',
      'košulja od domaćeg platna',
      'ruska kragna vez',
      'svečana etno košulja',
      'košulja za mladoženju tradicija',
      'srpska nošnja košulja'
    ],
    heroImage: kosuljaImg,
    secondaryImage: autenticniVezDetaljImg,
    productCategoryFilter: 'kosulje',
    targetProductIds: ['sk-kosulja-01', 'sk-kosulja-02'],
    keyHighlights: [
      {
        titleSr: '100% Domaće Pamučno Platno',
        titleEn: '100% Breathable Cotton',
        descSr: 'Prirodno tkana tkanina koja omogućava koži da slobodno diše tokom celodnevnih svadbenih i slavskih svečanosti.',
        descEn: 'Breathable domestic weave that guarantees all-day thermal comfort during long ceremonies.'
      },
      {
        titleSr: 'Prefinjena Ruska Kragna',
        titleEn: 'Refined Mandarin Collar',
        descSr: 'Elegantan uspravni ovratnik ukrašen gustim geometrijskim vezom u tradicionalnim bojama.',
        descEn: 'Sophisticated standing band collar adorned with dense geometric folk border embroidery.'
      },
      {
        titleSr: 'Krojenje po Tačnim Merama',
        titleEn: 'Tailored to Body Measurements',
        descSr: 'Šijemo po vašim merama (obim vrata, grudi, dužina rukava) kako bi košulja pristajala besprekorno.',
        descEn: 'Tailored to your exact neck, chest, and arm measurements for an impeccable flattering silhouette.'
      },
      {
        titleSr: 'Svečano i Moderno',
        titleEn: 'Heritage Meets Modern Elegance',
        descSr: 'Izvrsno se kombinuje uz sako, svečani prsluk ili jelek, kao i uz klasične tamne pantalone.',
        descEn: 'Pairs seamlessly with modern suit jackets, vests, or tailored trousers.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Povratak autentičnosti: Zašto sve više mladenaca bira vezenu košulju',
        headingEn: 'The return to roots: Why couples choose embroidered shirts for weddings',
        paragraphsSr: [
          'U vremenu uniformisanih fabričkih odela, mladoženje, kumovi i očevi sve češće biraju vezenu košulju od domaćeg platna kako bi venčanju i krsnoj slavi udahnuli duboki nacionalni i duhovni značaj. Vezena košulja nosi simboliku blagoslova, čistote i povezanosti sa precima.',
          'U našoj radionici, svaki šav i bod se izvode sa posebnom pažnjom. Koristimo najfiniji pamučni i svileni konac postojane boje koji ne bledi tokom pranja. Košulja poseduje diskretno skriveno kopčanje na grudima, dok vez u crveno-plavim ili zlatnim tonovima daje kraljevski utisak.'
        ],
        paragraphsEn: [
          'Amid mass-produced formal wear, grooms and hosts increasingly choose hand-embroidered shirts to imbue sacred weddings and patron saint feasts with cultural dignity and authenticity.',
          'Crafted with colorfast embroidery floss and concealed button plackets, our shirts combine archival nobility with everyday breathability.'
        ]
      }
    ],
    sizeGuide: {
      titleSr: 'Tabela mera za muške vezene košulje',
      titleEn: 'Men’s Shirt Sizing Guide',
      instructionsSr: 'Izmerite obim vrata i obim grudi na najširem delu. Takođe možete nam poslati dužinu rukava od ramena do ručnog zgloba za izradu po meri.',
      instructionsEn: 'Measure neck circumference and fullest chest width. You can also provide shoulder-to-wrist sleeve length for tailored sewing.',
      table: [
        { size: 'S (37-38)', measurement: 'Grudi: 96 - 100 cm | Vrat: 38 cm', note: 'Vitka građa' },
        { size: 'M (39-40)', measurement: 'Grudi: 102 - 106 cm | Vrat: 40 cm', note: 'Srednja građa' },
        { size: 'L (41-42)', measurement: 'Grudi: 108 - 114 cm | Vrat: 42 cm', note: 'Standardna građa' },
        { size: 'XL (43-44)', measurement: 'Grudi: 116 - 122 cm | Vrat: 44 cm', note: 'Krupnija građa' },
        { size: 'XXL (45-46)', measurement: 'Grudi: 124 - 130 cm | Vrat: 46 cm', note: 'Vrlo krupna građa' }
      ]
    },
    faqs: [
      {
        questionSr: 'Kako se održava i pegla vezena košulja od srpskog platna?',
        questionEn: 'How to wash and iron a hand-embroidered cotton shirt?',
        answerSr: 'Košulja se pere na temperaturi do 40°C sa blagim deterdžentom. Pegla se dok je blago vlažna, a deo sa vezom se pegla uvek sa naličja kako bi vez sačuvao reljefnost i sjaj.',
        answerEn: 'Wash at up to 40°C with gentle detergent. Iron while slightly damp, always pressing embroidered zones from the reverse side to preserve relief texture.'
      },
      {
        questionSr: 'Koliko unapred treba poručiti košulju za svadbu ili krštenje?',
        questionEn: 'How far in advance should a wedding or baptism shirt be ordered?',
        answerSr: 'Preporučujemo da naručite bar 10 do 14 dana pre svečanosti, kako bi imali dovoljno vremena za preciznu izradu po vašim merama i probu.',
        answerEn: 'We advise ordering 10 to 14 days prior to your celebration to allow for tailored sewing and fitting.'
      }
    ],
    relatedBlogSlugs: [
      'sve-za-vezenje-i-sivenje-platno-konac-igle-pribor-vodic',
      'vrste-veza-srpska-tradicija-tehnike-i-bodovi',
      'srpska-narodna-nosnja-kompletan-vodic-delovi-istorija'
    ]
  },
  'homoljski-suveniri-i-josanica': {
    slug: 'homoljski-suveniri-i-josanica',
    path: '/homoljski-suveniri-i-josanica',
    badgeSr: 'Ekološko Srce Srbije • Jošanica podno Homolja',
    badgeEn: 'Ecological Heart of Serbia • Jošanica at Mt. Homolje',
    titleSr: 'Autentični Suveniri iz Homolja i Radionice Jošanica',
    titleEn: 'Authentic Handcrafted Souvenirs from Homolje & Jošanica',
    subtitleSr: 'Jedinstveni darovi koji nose miris netaknute prirode, lekovitog bilja i vekovne tradicije istočne Srbije. Od domaće runske vune do ručno vezenih detalja sa sertifikatom geografskog porekla.',
    subtitleEn: 'Unique artisan souvenirs infused with the purity of pristine Homolje mountains. Woolen keepsakes, embroidered home decor, and certified origin.',
    metaTitleSr: 'Homoljski Suveniri i Ručni Rad Jošanica Žagubica | Savremeni Koreni',
    metaTitleEn: 'Authentic Homolje Handcrafted Souvenirs | Savremeni Koreni',
    metaDescriptionSr: 'Pronađite autentične suvenire i ručne radove iz Homolja i sela Jošanica. Tradicionalne rukotvorine od vune, lana i kože, sertifikat kvaliteta, dostava.',
    metaDescriptionEn: 'Discover authentic artisan souvenirs from Homolje mountains and Jošanica. Hand-woven wool crafts, folk embroidery, and heritage gifts from Serbia.',
    targetKeywords: [
      'suveniri homolje',
      'žagubica ručni rad',
      'jošanica suveniri',
      'homoljski etno motivi',
      'autentični suveniri istočna srbija',
      'suveniri sa sela',
      'radionica tanja petrić jošanica',
      'etno rukotvorine homolje'
    ],
    heroImage: homoljskiSuveniriImg,
    secondaryImage: homoljeNaturImg,
    productCategoryFilter: 'pokloni',
    targetProductIds: ['sk-poklon-02', 'sk-dom-01', 'sk-carape-01'],
    keyHighlights: [
      {
        titleSr: 'Geografsko Poreklo Homolje',
        titleEn: 'Geographic Origin Homolje',
        descSr: 'Svi predmeti nastaju u selu Jošanica (opština Žagubica), poznatom po čistoj prirodi i starim zanatima.',
        descEn: 'All items are born in Jošanica village (Žagubica municipality), celebrated for pure wilderness and crafts.'
      },
      {
        titleSr: 'Lokalni Prirodni Materijali',
        titleEn: 'Local Organic Materials',
        descSr: 'Koristimo vunu homoljske ovce, domaći lan i drvo iz lokalnih održivih šuma istočne Srbije.',
        descEn: 'We source local mountain fleece, domestic woven linen, and sustainably harvested hardwoods.'
      },
      {
        titleSr: 'Podrška Očuvanju Sela',
        titleEn: 'Preserving Rural Heritage',
        descSr: 'Kupovinom direktno podržavate ostanak mladih na selu i očuvanje nematerijalnog kulturnog nasleđa.',
        descEn: 'Your purchase directly empowers rural artisan families and safeguards endangered traditions.'
      },
      {
        titleSr: 'Zvanično Registrovan Subjekt',
        titleEn: 'Legally Registered Business',
        descSr: 'Radionica preduzetnika Tanje Petrić registrovana je u APR-u Republike Srbije (PIB: 115789396).',
        descEn: 'Officially certified craft business registered with the Serbian Business Registers Agency.'
      }
    ],
    contentSections: [
      {
        headingSr: 'Homolje — Mitska zemlja planina, bistrih reka i skrivenih zanata',
        headingEn: 'Homolje: A mythical land of karst mountains, pure springs, and living crafts',
        paragraphsSr: [
          'Smešteno u istočnoj Srbiji, u zagrljaju Homoljskih planina i reke Mlave, selo Jošanica čuva duh nekadašnje Srbije. Ovde vazduh miriše na planinski čaj, med i sveže runo, a vreme teče u ritmu prirode. U ovom ekološkom raju, radionica „Savremeni Koreni“ Tanje Petrić stvara predmete koji pričaju priču o životu u skladu sa zavičajem.',
          'Naši suveniri nisu serijski odštampani magneti, već opipljiva svedočanstva o veštini ruku: od ručno pletenih minijaturnih čarapica do vezenih podmetača i unikatnih etno poklon setova. Ponesite delić Homolja u svoj dom ili obradujte drage ljude poklonom koji ima dušu.'
        ],
        paragraphsEn: [
          'Tucked in Eastern Serbia where the Homolje mountains cradle the crystal springs of Mlava, Jošanica village preserves the living spirit of old Serbia. Time moves to the rhythm of mountain seasons.',
          'Our souvenirs are not mass-printed tourist trinkets, but tactile testaments to handcraft mastery. Bring home a piece of Homolje to warm your sanctuary.'
        ],
        quoteSr: '„U svakom čvoru i svakom bodu utkana je tišina homoljskih šuma i snaga naših predaka.“',
        quoteEn: '"Within every knot and stitch rests the quiet majesty of Homolje forests and ancestral fortitude."'
      }
    ],
    faqs: [
      {
        questionSr: 'Može li se posetiti radionica u Jošanici?',
        questionEn: 'Can the workshop in Jošanica be visited in person?',
        answerSr: 'Da, radujemo se gostima! Molimo vas da nas unapred najavite telefonom ili porukom kako bismo vas dočekali i pripremili prezentaciju ručnog rada.',
        answerEn: 'Yes, visitors are warmly welcomed! Please contact us ahead by phone or WhatsApp to arrange a visit and craft demonstration.'
      },
      {
        questionSr: 'Da li izdajete račun za pravna lica i firme koje žele poklone za partnere?',
        questionEn: 'Can you issue formal invoices for corporate client gift orders?',
        answerSr: 'Da, kao registrovani privredni subjekt (PR), izdajemo zvanične fakture i račune za domaće i strane kompanije i ustanove.',
        answerEn: 'Yes, as a registered business entity, we issue certified invoices for corporate and institutional partners.'
      }
    ],
    relatedBlogSlugs: [
      'homoljski-med-lekovito-bilje-tradicija-zanati-priroda-josanica',
      'etno-pokloni-srbija-autenticni-suveniri-rucni-rad-tradicija',
      'narodna-nosnja-homoljski-kraj-srpska-vlaska-tradicija-vodic'
    ]
  }
};
