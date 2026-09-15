export type Language = 'sr' | 'en';

export interface Translations {
  // Top bar & Header
  topBarBadge: string;
  topBarCall: string;
  topBarEmail: string;
  brandTagline: string;

  // Nav links
  navHome: string;
  navAbout: string;
  navCatalog: string;
  navProcess: string;
  navBlog: string;
  navSocial: string;
  navGallery: string;
  navCompany: string;
  navContact: string;

  // Nav buttons
  navMyPhotos: string;
  navOrderCustom: string;
  themeLight: string;
  themeDark: string;
  langSwitchAria: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitleAccent: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCtaCatalog: string;
  heroCtaOrder: string;
  heroCtaGallery: string;
  heroMetric1Title: string;
  heroMetric1Desc: string;
  heroMetric2Title: string;
  heroMetric2Desc: string;
  heroMetric3Title: string;
  heroMetric3Desc: string;
  heroMetric4Title: string;
  heroMetric4Desc: string;

  // Brand Story
  storyBadge: string;
  storyTitle: string;
  storySubtitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  storyQuote: string;
  storyOwnerTitle: string;
  storyCard1Title: string;
  storyCard1Desc: string;
  storyCard2Title: string;
  storyCard2Desc: string;
  storyCard3Title: string;
  storyCard3Desc: string;

  // Product Catalog
  catalogBadge: string;
  catalogTitle: string;
  catalogSubtitle: string;
  catalogSearchPlaceholder: string;
  catAll: string;
  catTorbice: string;
  catSubare: string;
  catCarape: string;
  catKosulje: string;
  catNakit: string;
  catDom: string;
  catDomPokloni: string;
  priceTag: string;
  priceRsd: string;
  orderProductBtn: string;
  orderNow: string;
  orderPiece: string;
  viewDetailsBtn: string;
  viewDetails: string;
  inStock: string;
  inStockBadge: string;
  madeToOrderBadge: string;
  leadTimePrefix: string;
  leadTimeDays: string;
  materialsLabel: string;
  techniquesLabel: string;

  // Custom Order Process
  processBadge: string;
  processTitle: string;
  processSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  processCtaBtn: string;
  processBannerTitle: string;
  processBannerDesc: string;

  // Blog
  blogBadge: string;
  blogTitle: string;
  blogSubtitle: string;
  blogReadArticle: string;
  blogReadTime: string;
  blogOrderFromArticle: string;
  blogBackBtn: string;

  // Gallery
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryTabAll: string;
  galleryTabMaster: string;
  galleryTabUser: string;
  galleryUploadBtn: string;
  galleryUploadModalTitle: string;
  galleryUploadPrompt: string;
  galleryUploadName: string;
  galleryUploadCaption: string;
  galleryUploadCategory: string;
  gallerySubmitBtn: string;

  // Social Links
  socialBadge: string;
  socialTitle: string;
  socialSubtitle: string;
  socialFollowBtn: string;

  // Legal / APR
  legalBadge: string;
  legalTitle: string;
  legalSubtitle: string;
  legalPib: string;
  legalMb: string;
  legalActivity: string;
  legalAddress: string;
  legalStatus: string;
  legalCopySuccess: string;
  legalCopyAll: string;

  // Contact & Order Modal
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  orderModalTitle: string;
  orderModalSubtitle: string;
  formName: string;
  formNamePlaceholder: string;
  formPhone: string;
  formPhonePlaceholder: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formAddress: string;
  formAddressPlaceholder: string;
  formCity: string;
  formCityPlaceholder: string;
  formProduct: string;
  formDetails: string;
  formDetailsPlaceholder: string;
  formContactPref: string;
  prefPhone: string;
  prefViber: string;
  prefEmail: string;
  formSubmitOrder: string;
  formWhatsAppDirect: string;
  orderSuccessTitle: string;
  orderSuccessMessage: string;
  orderRefLabel: string;
  orderCloseBtn: string;

  // Footer
  footerAboutText: string;
  footerQuickLinks: string;
  footerCraftsmanship: string;
  footerContactInfo: string;
  footerCopyright: string;
  footerHandcraftedWith: string;

  // Quick action floating bar
  quickCall: string;
  quickWhatsApp: string;
  quickOrder: string;
  quickGallery: string;
  backToTop: string;
}

export const translations: Record<Language, Translations> = {
  sr: {
    topBarBadge: 'Zvanično registrovana radionica • PIB: 115789396 • MB: 68635870',
    topBarCall: '060 331 8319',
    topBarEmail: 'savremenikoreni@gmail.com',
    brandTagline: 'Da li znaš odakle potiče ...?',

    navHome: 'Početna',
    navAbout: 'O Nama',
    navCatalog: 'Kolekcije',
    navProcess: 'Izrada po Meri',
    navBlog: 'Blog & Vodiči',
    navSocial: 'Mreže',
    navGallery: 'Galerija',
    navCompany: 'Firma (APR)',
    navContact: 'Kontakt',

    navMyPhotos: 'Moje Slike',
    navOrderCustom: 'Naručite Unikat',
    themeLight: 'Svetla',
    themeDark: 'Tamna',
    langSwitchAria: 'Promenite jezik na engleski',

    heroBadge: 'Autentične Srpske & Homoljske Rukotvorine',
    heroTitle1: 'Tradicija koja živi kroz',
    heroTitleAccent: 'savremeni unikatni vez',
    heroTitle2: 'i ručni rad',
    heroSubtitle: 'Vlaška bela šubara, vezene vunene čarape za folklor, košulje od srpskog platna, heklani i makrame unikatni komadi iz radionice Tanje Petrić u Jošanici (Homolje).',
    heroCtaCatalog: 'Pogledajte Katalog',
    heroCtaOrder: 'Porudžbina po Meri',
    heroCtaGallery: 'Pogledajte Galeriju',
    heroMetric1Title: '100% Ručni rad',
    heroMetric1Desc: 'Tradicionalni vez, pletenje i krojenje',
    heroMetric2Title: 'Prirodni materijali',
    heroMetric2Desc: 'Domaća vuna, srpsko platno i prirodno krzno',
    heroMetric3Title: 'Homoljsko nasleđe',
    heroMetric3Desc: 'Radionica Jošanica, opština Žagubica',
    heroMetric4Title: 'Sertifikovan majstor',
    heroMetric4Desc: 'Legalno registrovana zanatska radnja (APR)',

    storyBadge: 'Priča o Ateljeu i Čuvanju Korena',
    storyTitle: 'Gde svaki ubod igle čuva vekove homoljskog duha',
    storySubtitle: 'U srcu Homolja, u selu Jošanica podno mističnih planina, Tanja Petrić udahnjuje nov život starinskim srpskim i vlaškim motivima.',
    storyP1: 'Savremeni Koreni nastali su iz duboke ljubavi prema zaboravljenim veštinama naših baka — ručnom vezu pokrsticom, reljefnom kosovskom vezu, pletenju vunenih čarapa na pet igala i oblikovanju vlaške bele šubare od mekog runa.',
    storyP2: 'Svaki naš predmet nije industrijski proizvod, već unikatno umetničko delo sa sopstvenom pričom. Koristimo isključivo domaće pamučno platno, prirodno krzno, ručno predanu vunu i postojane konce, stvarajući komade koji traju decenijama i prenose se sa kolena na koleno.',
    storyP3: 'Bilo da tražite autentičnu opremu za folklorna društva, topao i elegantan odevni predmet za zimu, ili upečatljiv poklon sa dušom za dragu osobu u zemlji ili dijaspori — u svaki unikat utkamo posebnu pažnju i blagoslov tradicije.',
    storyQuote: '„Kada vezem, ne pravim samo ukras na platnu — vezem sećanje na pretke, miris homoljskih livada i toplinu ognjišta.”',
    storyOwnerTitle: 'Tanja Petrić, osnivač i majstor rukotvorina',
    storyCard1Title: 'Čuvanje Autentičnosti',
    storyCard1Desc: 'Verni starinskim mustrama, krojnim linijama i ornamentici homoljskog i šumadijskog kraja.',
    storyCard2Title: 'Bespoke Izrada po Meri',
    storyCard2Desc: 'Mogućnost personalizacije dimenzija, izbora boja pređe, motiva i monograma za posebne prilike.',
    storyCard3Title: 'Domaći & Prirodni Resursi',
    storyCard3Desc: 'Isključivo čista vuna, srpsko pamučno platno, prirodno krzno i ekološki materijali bez sintetike.',

    catalogBadge: 'Katalog Autorskih Radova',
    catalogTitle: 'Odabrane Rukotvorine & Unikatne Kolekcije',
    catalogSubtitle: 'Svaki proizvod je dostupan za trenutnu kupovinu ili se izrađuje po vašim tačnim dimenzijama i željama.',
    catalogSearchPlaceholder: 'Pretražite šubare, čarape, košulje, nakit...',
    catAll: 'Sve Kategorije',
    catTorbice: 'Torbice',
    catSubare: 'Šubare',
    catCarape: 'Čarape i Nazuvice',
    catKosulje: 'Košulje i Nošnja',
    catNakit: 'Nakit i Aksesoari',
    catDom: 'Za Dom i Poklone',
    catDomPokloni: 'Za Dom i Poklone',
    priceTag: 'Cena:',
    priceRsd: 'RSD',
    orderProductBtn: 'Naruči ovaj komad',
    orderNow: 'Naruči',
    orderPiece: 'Naruči ovaj komad',
    viewDetailsBtn: 'Detalji i specifikacija',
    viewDetails: 'Detalji',
    inStock: 'Na stanju',
    inStockBadge: 'Na stanju',
    madeToOrderBadge: 'Izrada po narudžbini',
    leadTimePrefix: 'Rok izrade:',
    leadTimeDays: 'dana',
    materialsLabel: 'Materijali:',
    techniquesLabel: 'Tehnike rada:',

    processBadge: 'Proces Naručivanja',
    processTitle: 'Kako Nastaje Vaš Personalizovani Unikat',
    processSubtitle: 'Jednostavan proces od prve ideje do isporuke na vaš kućni prag bilo gde u Srbiji i svetu.',
    step1Title: '1. Odabir Motiva i Dogovor',
    step1Desc: 'Izaberite model iz kataloga ili nam pošaljite vašu zamisao, dimenzije i željene boje.',
    step2Title: '2. Priprema i Odabir Materijala',
    step2Desc: 'Biramo odgovarajuće srpsko platno, domaću vunu, prirodno krzno ili pamučni konac za vez.',
    step3Title: '3. Posvećena Ručna Izrada',
    step3Desc: 'Tanja Petrić lično u radionici u Jošanici veze, plete ili kroji vaš unikat uz maksimalnu preciznost.',
    step4Title: '4. Isporuka na Vašu Adresu',
    step4Desc: 'Pakujemo u svečanu ambalažu i šaljemo Post Express-om širom Srbije ili međunarodnom poštom.',
    processCtaBtn: 'Započnite Narudžbinu po Meri',
    processBannerTitle: 'Imate li posebnu ideju ili tradicionalni motiv iz vašeg kraja?',
    processBannerDesc: 'Tanja Petrić izrađuje nošnje, šubare i vezene detalje po arhivskim fotografijama i porodičnim uspomenama.',

    blogBadge: 'Riznica Znanja o Tradiciji',
    blogTitle: 'Blog & Vodiči Kroz Srpski i Vlaški Vez',
    blogSubtitle: 'Edukativni tekstovi o tehnikama veza, simbolici boja i šara, održavanju vune i očuvanju nošnji.',
    blogReadArticle: 'Pročitaj ceo vodič',
    blogReadTime: 'min čitanja',
    blogOrderFromArticle: 'Naručite komad inspirisan ovim vodičem',
    blogBackBtn: 'Nazad na sve članke',

    galleryBadge: 'Vizuelna Galerija',
    galleryTitle: 'Radionica, Majstorski Radovi & Slike Kupaca',
    gallerySubtitle: 'Pogledajte detalje procesa stvaranja u Jošanici i fotografije koje su nam poslali zadovoljni kupci.',
    galleryTabAll: 'Sve Fotografije',
    galleryTabMaster: 'Iz Ateljea Tanje Petrić',
    galleryTabUser: 'Slike Naših Kupaca',
    galleryUploadBtn: 'Dodaj Svoju Sliku',
    galleryUploadModalTitle: 'Dodajte Vašu Fotografiju u Galeriju',
    galleryUploadPrompt: 'Prevucite sliku ovde ili kliknite da odaberete fajl sa uređaja',
    galleryUploadName: 'Vaše Ime ili Naslov',
    galleryUploadCaption: 'Opis slike ili utisak o unikatnom radu',
    galleryUploadCategory: 'Kategorija rada',
    gallerySubmitBtn: 'Sačuvaj i Prikaži u Galeriji',

    socialBadge: 'Povežite se sa Nama',
    socialTitle: 'Pratite Naš Rad na Društvenim Mrežama',
    socialSubtitle: 'Svakodnevno delimo video zapise vezenja, krojenja šubara i pripreme novih kolekcija.',
    socialFollowBtn: 'Posetite Profil',

    legalBadge: 'Zvanični Podaci Preduzeća',
    legalTitle: 'Pravni Podaci i APR Verifikacija',
    legalSubtitle: 'Kupujte sigurno od zvanično registrovanog zanatskog preduzetnika u Republici Srbiji.',
    legalPib: 'Poreski Identifikacioni Broj (PIB)',
    legalMb: 'Matični Broj (MB)',
    legalActivity: 'Pretežna delatnost',
    legalAddress: 'Sedište radionice',
    legalStatus: 'Status registracije',
    legalCopySuccess: 'Kopirano u privremenu memoriju!',
    legalCopyAll: 'Kopiraj sve pravne podatke',

    contactBadge: 'Stupite u Kontakt',
    contactTitle: 'Radujemo se Vašem Pozivu i Poseti',
    contactSubtitle: 'Bilo da naručujete za sebe, KUD ili kao dar za inostranstvo — tu smo za sva pitanja.',
    orderModalTitle: 'Porudžbina i Upit za Izradu',
    orderModalSubtitle: 'Unesite vaše podatke, a Tanja Petrić će vas lično kontaktirati u najkraćem roku radi potvrde.',
    formName: 'Ime i prezime',
    formNamePlaceholder: 'npr. Marko Petrović',
    formPhone: 'Broj telefona (Viber / WhatsApp)',
    formPhonePlaceholder: 'npr. 060 123 4567',
    formEmail: 'Elektronska pošta (opciono)',
    formEmailPlaceholder: 'npr. marko@example.com',
    formAddress: 'Ulica i broj za isporuku',
    formAddressPlaceholder: 'npr. Knez Mihailova 10',
    formCity: 'Mesto i poštanski broj',
    formCityPlaceholder: 'npr. 11000 Beograd',
    formProduct: 'Naziv željenog artikla ili opis izrade',
    formDetails: 'Posebne želje, dimenzije ili napomene',
    formDetailsPlaceholder: 'npr. Obim glave 58 cm, crveno-zlatni vez, isporuka do petka...',
    formContactPref: 'Željeni način kontakta',
    prefPhone: 'Telefonski poziv',
    prefViber: 'Viber / WhatsApp poruka',
    prefEmail: 'Email poruka',
    formSubmitOrder: 'Pošalji Narudžbinu',
    formWhatsAppDirect: 'Direktna WhatsApp Poruka',
    orderSuccessTitle: 'Vaša porudžbina je uspešno zabeležena!',
    orderSuccessMessage: 'Hvala vam na poverenju! Majstor Tanja Petrić će vas uskoro kontaktirati radi potvrde detalja i dogovora oko isporuke.',
    orderRefLabel: 'Broj Vaše Narudžbine:',
    orderCloseBtn: 'U redu, zatvori',

    footerAboutText: 'Radionica za očuvanje kulturnog nasleđa Srbije i Homolja kroz ručni vez, tradicionalne šubare, pletene čarape za folklor i unikatne tekstilne rukotvorine majstora Tanje Petrić.',
    footerQuickLinks: 'Brzi Linkovi',
    footerCraftsmanship: 'Tradicionalne Tehnike',
    footerContactInfo: 'Kontakt i Radionica',
    footerCopyright: 'Sva prava zadržana. Radionica Savremeni Koreni Jošanica.',
    footerHandcraftedWith: 'Ručno rađeno sa ljubavlju u srcu Homolja, Republika Srbija.',

    quickCall: 'Pozovi',
    quickWhatsApp: 'WhatsApp',
    quickOrder: 'Poruči',
    quickGallery: 'Galerija',
    backToTop: 'Povratak na vrh',
  },

  en: {
    topBarBadge: 'Officially Registered Artisan Studio • Tax ID: 115789396 • Reg: 68635870',
    topBarCall: '+381 60 331 8319',
    topBarEmail: 'savremenikoreni@gmail.com',
    brandTagline: 'Do you know where it comes from ...?',

    navHome: 'Home',
    navAbout: 'About Us',
    navCatalog: 'Collections',
    navProcess: 'Custom Bespoke',
    navBlog: 'Blog & Guides',
    navSocial: 'Social',
    navGallery: 'Gallery',
    navCompany: 'Business (APR)',
    navContact: 'Contact',

    navMyPhotos: 'My Photos',
    navOrderCustom: 'Order Bespoke',
    themeLight: 'Light',
    themeDark: 'Dark',
    langSwitchAria: 'Switch language to Serbian',

    heroBadge: 'Authentic Serbian & Homolje Handcrafts',
    heroTitle1: 'Heritage brought to life through',
    heroTitleAccent: 'contemporary bespoke embroidery',
    heroTitle2: '& master artisanry',
    heroSubtitle: 'Vlach white fur hats (šubara), folk dance embroidered socks, Serbian woven linen shirts, crocheted and macramé one-of-a-kind treasures crafted by Tanja Petrić in Jošanica (Homolje, Serbia).',
    heroCtaCatalog: 'Explore Catalog',
    heroCtaOrder: 'Bespoke Custom Order',
    heroCtaGallery: 'View Craft Gallery',
    heroMetric1Title: '100% Handcrafted',
    heroMetric1Desc: 'Authentic needlework, knitting, and fur crafting',
    heroMetric2Title: 'Natural Materials',
    heroMetric2Desc: 'Pure virgin wool, domestic woven linen & genuine fur',
    heroMetric3Title: 'Homolje Heritage',
    heroMetric3Desc: 'Studio in Jošanica, Žagubica Municipality, Serbia',
    heroMetric4Title: 'Certified Artisan',
    heroMetric4Desc: 'Legally registered handicraft business enterprise',

    storyBadge: 'The Story of Our Studio & Heritage',
    storyTitle: 'Where every needle stitch preserves centuries of Balkan soul',
    storySubtitle: 'In the scenic heart of Homolje, in the peaceful village of Jošanica beneath misty mountains, Tanja Petrić revives ancient Serbian and Vlach cultural motifs.',
    storyP1: 'Savremeni Koreni ("Contemporary Roots") was born from a deep devotion to the forgotten crafts of our ancestors — traditional cross-stitch and raised relief embroidery, five-needle virgin wool knitting, and the sculpting of the iconic Vlach white sheepskin hat.',
    storyP2: 'None of our items are mass-produced; each piece is an individual work of art endowed with history and soul. We work exclusively with domestically loomed cotton linen, genuine soft fleece, naturally spun wool, and colorfast embroidery threads built to last for generations.',
    storyP3: 'Whether you are seeking museum-quality folk dance costume pieces for cultural ensembles, an elegant winter accessory of unmatched warmth, or an heirloom gift for family across the diaspora — every piece is crafted with patient precision and blessed by tradition.',
    storyQuote: '“When I embroider, I am not merely decorating fabric — I am weaving the memory of our ancestors, the scent of Homolje meadows, and the warmth of the home hearth.”',
    storyOwnerTitle: 'Tanja Petrić, Founder & Master Craftswoman',
    storyCard1Title: 'Preserving Authenticity',
    storyCard1Desc: 'True to archival patterns, traditional silhouettes, and regional Balkan ornamentation.',
    storyCard2Title: 'Bespoke Custom Tailoring',
    storyCard2Desc: 'Custom dimensions, bespoke color palette selection, personal monograms, and custom sizes.',
    storyCard3Title: 'Domestic & Pure Materials',
    storyCard3Desc: '100% virgin natural wool, domestic cotton canvas, genuine soft fur, zero synthetic fibers.',

    catalogBadge: 'Artisan Catalog',
    catalogTitle: 'Curated Handcrafts & Bespoke Collections',
    catalogSubtitle: 'Every item is available for immediate purchase or custom-tailored to your exact measurements and wishes.',
    catalogSearchPlaceholder: 'Search fur hats, wool socks, embroidered shirts, jewelry...',
    catAll: 'All Categories',
    catTorbice: 'Bags & Purses',
    catSubare: 'Fur Hats (Šubare)',
    catCarape: 'Wool Socks & Slippers',
    catKosulje: 'Embroidered Shirts & Folk Costumes',
    catNakit: 'Jewelry & Accessories',
    catDom: 'Home & Heritage Gifts',
    catDomPokloni: 'Home & Heritage Gifts',
    priceTag: 'Price:',
    priceRsd: 'RSD',
    orderProductBtn: 'Order This Piece',
    orderNow: 'Order',
    orderPiece: 'Order this piece',
    viewDetailsBtn: 'Details & Specifications',
    viewDetails: 'Details',
    inStock: 'In Stock',
    inStockBadge: 'In Stock',
    madeToOrderBadge: 'Made to Order',
    leadTimePrefix: 'Production time:',
    leadTimeDays: 'days',
    materialsLabel: 'Materials:',
    techniquesLabel: 'Craft Techniques:',

    processBadge: 'Custom Ordering Process',
    processTitle: 'How Your Personalized Heirloom is Born',
    processSubtitle: 'A smooth and transparent 4-step journey from initial inspiration to doorstep delivery worldwide.',
    step1Title: '1. Motif Selection & Consultation',
    step1Desc: 'Select an existing model or share your custom motif, measurements, and preferred colors.',
    step2Title: '2. Preparation of Natural Materials',
    step2Desc: 'We curate premium domestic linen, pure wool, soft fleece, and rich embroidery threads.',
    step3Title: '3. Patient Master Craftsmanship',
    step3Desc: 'Tanja Petrić personally embroiders, knits, or cuts your garment in our Jošanica studio.',
    step4Title: '4. Secure Packaging & Worldwide Delivery',
    step4Desc: 'Packed in elegant gift packaging and dispatched via express courier across Serbia and internationally.',
    processCtaBtn: 'Start Your Custom Order',
    processBannerTitle: 'Do you have a specific family motif or heirloom design in mind?',
    processBannerDesc: 'Tanja Petrić creates custom folk costumes, hats, and embroideries based on vintage photographs and family archives.',

    blogBadge: 'Heritage Knowledge Repository',
    blogTitle: 'Blog & Comprehensive Heritage Guides',
    blogSubtitle: 'Educational articles on Balkan embroidery styles, color symbolism, wool care, and folk costume history.',
    blogReadArticle: 'Read Full Guide',
    blogReadTime: 'min read',
    blogOrderFromArticle: 'Order a custom piece inspired by this guide',
    blogBackBtn: 'Back to all articles',

    galleryBadge: 'Visual Craft Gallery',
    galleryTitle: 'Studio Moments, Master Works & Customer Photos',
    gallerySubtitle: 'Explore the handcrafting journey in Jošanica and photos shared by our happy clients across the world.',
    galleryTabAll: 'All Photos',
    galleryTabMaster: 'From Tanja Petrić Studio',
    galleryTabUser: 'Customer Creations',
    galleryUploadBtn: 'Add Your Photo',
    galleryUploadModalTitle: 'Upload Your Photo to Our Community Gallery',
    galleryUploadPrompt: 'Drag and drop your photo here or click to select from your device',
    galleryUploadName: 'Your Name or Title',
    galleryUploadCaption: 'Photo description or feedback on your custom piece',
    galleryUploadCategory: 'Item Category',
    gallerySubmitBtn: 'Save & Publish to Gallery',

    socialBadge: 'Connect With Us',
    socialTitle: 'Follow Our Journey on Social Media',
    socialSubtitle: 'Watch daily handcrafting videos, behind-the-scenes embroidery loops, and preview upcoming collections.',
    socialFollowBtn: 'Visit Official Page',

    legalBadge: 'Official Business Credentials',
    legalTitle: 'Legal Enterprise & APR Verification',
    legalSubtitle: 'Shop with full confidence from a legally registered, verified artisan enterprise in the Republic of Serbia.',
    legalPib: 'Tax Identification Number (PIB)',
    legalMb: 'Company Registration Number (MB)',
    legalActivity: 'Principal Activity Code',
    legalAddress: 'Studio Headquarters',
    legalStatus: 'Registration Status',
    legalCopySuccess: 'Copied to clipboard!',
    legalCopyAll: 'Copy all company credentials',

    contactBadge: 'Get in Touch',
    contactTitle: 'We Look Forward to Your Message or Visit',
    contactSubtitle: 'Whether ordering for personal wear, a folk ensemble, or an overseas gift — we are here to assist.',
    orderModalTitle: 'Inquiry & Custom Bespoke Order',
    orderModalSubtitle: 'Provide your contact details, and artisan Tanja Petrić will personally contact you promptly to finalize details.',
    formName: 'Full Name',
    formNamePlaceholder: 'e.g., Alexander Smith',
    formPhone: 'Phone Number (Viber / WhatsApp)',
    formPhonePlaceholder: 'e.g., +381 60 123 4567',
    formEmail: 'Email Address (Optional)',
    formEmailPlaceholder: 'e.g., alexander@example.com',
    formAddress: 'Delivery Street & House Number',
    formAddressPlaceholder: 'e.g., 12 Heritage Way',
    formCity: 'City & Postal Code',
    formCityPlaceholder: 'e.g., Belgrade 11000',
    formProduct: 'Item Name or Custom Request Description',
    formDetails: 'Specific dimensions, color choices or special notes',
    formDetailsPlaceholder: 'e.g., Head circumference 58 cm, gold embroidery, needed by next Friday...',
    formContactPref: 'Preferred Contact Channel',
    prefPhone: 'Direct Phone Call',
    prefViber: 'Viber / WhatsApp Message',
    prefEmail: 'Email Message',
    formSubmitOrder: 'Submit Order Inquiry',
    formWhatsAppDirect: 'Direct WhatsApp Chat',
    orderSuccessTitle: 'Your order inquiry has been received!',
    orderSuccessMessage: 'Thank you for your trust! Master craftswoman Tanja Petrić will contact you shortly to confirm all specifications and delivery timeline.',
    orderRefLabel: 'Your Order Reference:',
    orderCloseBtn: 'Close Window',

    footerAboutText: 'Artisan workshop dedicated to the preservation of Serbian and Homolje cultural heritage through bespoke hand embroidery, traditional fur hats (šubare), folk dance socks, and one-of-a-kind textile art by Tanja Petrić.',
    footerQuickLinks: 'Quick Links',
    footerCraftsmanship: 'Heritage Crafts',
    footerContactInfo: 'Contact & Location',
    footerCopyright: 'All rights reserved. Savremeni Koreni Studio Jošanica.',
    footerHandcraftedWith: 'Handcrafted with love in the heart of Homolje, Republic of Serbia.',

    quickCall: 'Call',
    quickWhatsApp: 'WhatsApp',
    quickOrder: 'Order',
    quickGallery: 'Gallery',
    backToTop: 'Back to Top',
  },
};
