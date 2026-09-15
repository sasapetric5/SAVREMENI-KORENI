export interface OrderStep {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  completed: boolean;
  current?: boolean;
  timestamp?: string;
}

export interface BespokeOrder {
  orderId: string;
  customerName: string;
  phone: string;
  productName: string;
  productNameEn: string;
  image: string;
  category: string;
  status: 'received' | 'in_progress' | 'quality_check' | 'shipped' | 'delivered';
  statusLabel: string;
  statusLabelEn: string;
  orderDate: string;
  estimatedDelivery: string;
  estimatedDeliveryEn: string;
  trackingNumber?: string;
  courier?: string;
  atelierNote?: string;
  atelierNoteEn?: string;
  craftTechniques: string[];
  steps: OrderStep[];
}

export const mockOrdersData: Record<string, BespokeOrder> = {
  'SK-2026-0891': {
    orderId: 'SK-2026-0891',
    customerName: 'Marija Petrović',
    phone: '+381 64 123 ****',
    productName: 'Vlaška Bela Šubara sa Srebrnim Detaljima',
    productNameEn: 'Vlach White Fur Hat (Šubare) with Silver Accents',
    image: '/images/vlaska_bela_subara_1789032431671.jpg',
    category: 'Šubare & Krzno',
    status: 'in_progress',
    statusLabel: 'Ručna izrada i šivenje krzna u toku',
    statusLabelEn: 'Handcrafting & Fur Tailoring in Progress',
    orderDate: '09. septembar 2026.',
    estimatedDelivery: '18. septembar 2026.',
    estimatedDeliveryEn: 'September 18, 2026',
    atelierNote: 'Prvoklasno prirodno jagnjeće krzno je priređeno i obrađeno. Tanja trenutno ručno ušiuje unutrašnju svilenu postavu i oblikuje tradicionalnu krunu šubare.',
    atelierNoteEn: 'First-class natural lamb fur prepared and conditioned. Tanja is currently hand-stitching the inner silk lining and shaping the traditional crown.',
    craftTechniques: ['Tradicionalno krznarstvo', 'Svilena postava', 'Ručno ušivanje'],
    steps: [
      {
        id: 'received',
        title: 'Porudžbina zaprimljena',
        titleEn: 'Order Received',
        description: 'Potvrđene dimenzije obima glave i izabran materijal sa kupcem.',
        descriptionEn: 'Head circumference measurements confirmed with customer.',
        completed: true,
        timestamp: '09.09.2026. 10:15'
      },
      {
        id: 'materials',
        title: 'Priprema i štavljenje krzna',
        titleEn: 'Fur Conditioning & Cutting',
        description: 'Prirodno domaće krzno iz Homolja prošlo kontrolu mekoće i gustine.',
        descriptionEn: 'Natural lamb fur from Homolje passed density and softness quality checks.',
        completed: true,
        timestamp: '11.09.2026. 14:30'
      },
      {
        id: 'crafting',
        title: 'Ručna izrada u ateljeu Jošanica',
        titleEn: 'Handcrafting in Atelier',
        description: 'Ukrajanje i ušivanje šubare po tačnim merama kupca.',
        descriptionEn: 'Tailoring and sewing according to exact client dimensions.',
        completed: false,
        current: true,
        timestamp: 'U toku...'
      },
      {
        id: 'quality',
        title: 'Kontrola kvaliteta & Sertifikat',
        titleEn: 'Quality Check & APR Certificate',
        description: 'Provera čvrstine šavova i pakovanje u etno zaštitnu kutiju.',
        descriptionEn: 'Stitching durability inspection & eco-friendly gift box packaging.',
        completed: false
      },
      {
        id: 'shipping',
        title: 'Slanje PostExpress / Kurirskom službom',
        titleEn: 'Handed to Courier',
        description: 'Predaja kuriru sa brojem za praćenje pošiljke.',
        descriptionEn: 'Dispatch with courier tracking number.',
        completed: false
      }
    ]
  },
  'SK-2026-0412': {
    orderId: 'SK-2026-0412',
    customerName: 'Nikola Jovanović',
    phone: '+381 60 987 ****',
    productName: 'Vezeno Svečano Muško Odelo & Košulja sa Ruskom Kragnom',
    productNameEn: 'Embroidered Ceremonial Folk Shirt with Mandarin Collar',
    image: '/images/vezena_kosulja_1789021895745.jpg',
    category: 'Nošnja & Vez',
    status: 'quality_check',
    statusLabel: 'Završna kontrola i pečaćenje sertifikata',
    statusLabelEn: 'Final Quality Inspection & Certification',
    orderDate: '02. septembar 2026.',
    estimatedDelivery: '15. septembar 2026.',
    estimatedDeliveryEn: 'September 15, 2026',
    atelierNote: 'Vez sa tradicijskim motivima je kompletiran zlatnom i teget niti. Košulja je opeglana na pari i spremna za sertifikaciju.',
    atelierNoteEn: 'Folk embroidery pattern completed using gold and navy threads. Steamed and prepared for final APR certificate stamp.',
    craftTechniques: ['Srpsko domaće platno', 'Ručni kosovski vez', 'Zlatni konac'],
    steps: [
      {
        id: 'received',
        title: 'Porudžbina zaprimljena',
        titleEn: 'Order Received',
        description: 'Usaglašeni detalji veza za svadbeno veselje.',
        descriptionEn: 'Embroidery details and wedding custom dimensions agreed.',
        completed: true,
        timestamp: '02.09.2026. 09:00'
      },
      {
        id: 'materials',
        title: 'Tkanje i krojenje platna',
        titleEn: 'Linen Weaving & Pattern Cutting',
        description: 'Priprema prirodnog 100% pamučnog srpskog platna.',
        descriptionEn: 'Natural 100% Serbian cotton fabric prepared and cut.',
        completed: true,
        timestamp: '05.09.2026. 12:00'
      },
      {
        id: 'crafting',
        title: 'Ručni vez kragne i manžetni',
        titleEn: 'Hand Embroidery',
        description: 'Precizno izvezeni motivi na grudima, kragni i rukavima.',
        descriptionEn: 'Ornate hand embroidery on chest panel, collar, and cuffs.',
        completed: true,
        timestamp: '11.09.2026. 17:45'
      },
      {
        id: 'quality',
        title: 'Kontrola kvaliteta & Sertifikat',
        titleEn: 'Quality Check & APR Certificate',
        description: 'Verifikacija rukotvorine sa pečatom radionice Tanja Petrić.',
        descriptionEn: 'Authentic handcrafted verification with workshop stamp.',
        completed: false,
        current: true,
        timestamp: 'U toku...'
      },
      {
        id: 'shipping',
        title: 'Slanje kurirskom službom',
        titleEn: 'Handed to Courier',
        description: 'Slanje ekspresnom poštom na vašu adresu.',
        descriptionEn: 'Express delivery dispatch.',
        completed: false
      }
    ]
  },
  'SK-2026-0155': {
    orderId: 'SK-2026-0155',
    customerName: 'Olivera Marković (Zurich, Švajcarska)',
    phone: '+41 78 456 ****',
    productName: 'Ženska Etno Unikatna Torba od Pamučnog Kanapa',
    productNameEn: 'Bespoke Macramé Handbag with Wooden Handles',
    image: '/images/etno_unikatna_torba_1789105500674.jpg',
    category: 'Torbe & Makrame',
    status: 'shipped',
    statusLabel: 'Poslato na vašu adresu (PostExpress / DHL Export)',
    statusLabelEn: 'Shipped via DHL International Export',
    orderDate: '28. avgust 2026.',
    estimatedDelivery: '16. septembar 2026.',
    estimatedDeliveryEn: 'September 16, 2026',
    trackingNumber: 'PE381940285RS',
    courier: 'PostExpress / DHL Express',
    atelierNote: 'Torba je uspešno predata kurirskoj službi. U paketu se nalazi poklon ručno vezeni obeleživač i garancija autentičnosti.',
    atelierNoteEn: 'Handbag successfully dispatched with DHL Export. Package includes a bonus hand-embroidered bookmark & authenticity card.',
    craftTechniques: ['Makrame čvorovanje', 'Bukovo drvo ručke', 'Pamučna postava'],
    steps: [
      {
        id: 'received',
        title: 'Porudžbina zaprimljena',
        titleEn: 'Order Received',
        description: 'Potvrđena porudžbina za dijasporu sa uplatom.',
        descriptionEn: 'International order confirmed for diaspora delivery.',
        completed: true,
        timestamp: '28.08.2026. 15:20'
      },
      {
        id: 'materials',
        title: 'Priprema pređe i bukovih drški',
        titleEn: 'Cord & Wooden Handle Prep',
        description: 'Pamučni kanap 4mm prirodne krem nijanse.',
        descriptionEn: 'Natural cream 4mm cotton cord & polished beechwood handles.',
        completed: true,
        timestamp: '01.09.2026. 11:10'
      },
      {
        id: 'crafting',
        title: 'Ručno čvorovanje torbe',
        titleEn: 'Hand Macramé Knotting',
        description: 'Izrada unikatnog mrežastog reljefa sa resama.',
        descriptionEn: 'Crafting unique textured knotwork and fringe detail.',
        completed: true,
        timestamp: '08.09.2026. 18:00'
      },
      {
        id: 'quality',
        title: 'Kontrola kvaliteta i pakovanje',
        titleEn: 'Quality Check & Packaging',
        description: 'Zaštitno pakovanje za međunarodni transport.',
        descriptionEn: 'International protective parcel packaging.',
        completed: true,
        timestamp: '12.09.2026. 09:30'
      },
      {
        id: 'shipping',
        title: 'Preuzeto od strane kurira',
        titleEn: 'Shipped to Customer',
        description: 'Pošiljka na putu za Švajcarsku pod brojem PE381940285RS.',
        descriptionEn: 'Package in transit with tracking ID PE381940285RS.',
        completed: true,
        current: true,
        timestamp: '13.09.2026. 08:15'
      }
    ]
  },
  'SK-2026-0920': {
    orderId: 'SK-2026-0920',
    customerName: 'Dragana Ilić',
    phone: '+381 63 555 ****',
    productName: 'Vunene Čarape sa Etno Vezom na 5 Igala',
    productNameEn: 'Hand-Knitted Wool Socks with Folk Embroidery',
    image: '/images/vunene_carape_vez_1789021876638.jpg',
    category: 'Čarape & Pletivo',
    status: 'received',
    statusLabel: 'Porudžbina zaprimljena – priprema prirodne vune',
    statusLabelEn: 'Order Received – Pure Wool Preparation',
    orderDate: '13. septembar 2026.',
    estimatedDelivery: '22. septembar 2026.',
    estimatedDeliveryEn: 'September 22, 2026',
    atelierNote: 'Hvala na porudžbini! Izabrali smo najfiniju mašinsku i ručno predenu vunenu nit iz Homolja za pletenje po vašoj veličini obuce (39).',
    atelierNoteEn: 'Thank you for your order! We selected the finest hand-spun Homolje wool for knitting to your shoe size (EU 39).',
    craftTechniques: ['Ručno pletenje na 5 igala', 'Prirodna ovčija vuna', 'Etno cvetni vez'],
    steps: [
      {
        id: 'received',
        title: 'Porudžbina zaprimljena',
        titleEn: 'Order Received',
        description: 'Zaprimljene specifikacije veličine i motiva.',
        descriptionEn: 'Sizing specifications and embroidery pattern logged.',
        completed: true,
        current: true,
        timestamp: '13.09.2026. 14:00'
      },
      {
        id: 'materials',
        title: 'Izbor vunene pređe',
        titleEn: 'Wool Yarn Selection',
        description: 'Selekcija mekanog prediva koje ne grebe kožu.',
        descriptionEn: 'Selection of soft non-scratchy pure wool yarn.',
        completed: false
      },
      {
        id: 'crafting',
        title: 'Pletenje na 5 igala',
        titleEn: '5-Needle Circular Knitting',
        description: 'Pletenje pete i izrada ukrasnog veza na listu.',
        descriptionEn: 'Heel shaping and folk embroidery stitching.',
        completed: false
      },
      {
        id: 'quality',
        title: 'Kontrola i pranje na pari',
        titleEn: 'Quality Check & Steam Finish',
        description: 'Fiksiranje elastičnosti i forme.',
        descriptionEn: 'Elasticity check and gentle steam shaping.',
        completed: false
      },
      {
        id: 'shipping',
        title: 'Slanje kurirskom službom',
        titleEn: 'Dispatch',
        description: 'Predaja PostExpress kuriru.',
        descriptionEn: 'Handover to PostExpress courier.',
        completed: false
      }
    ]
  }
};

/**
 * Custom order state lookup function.
 * Allows searching by order ID or phone number.
 */
export function lookupOrder(query: string): BespokeOrder | null {
  if (!query) return null;
  const cleanQuery = query.trim().toUpperCase();

  // Direct ID match
  if (mockOrdersData[cleanQuery]) {
    return mockOrdersData[cleanQuery];
  }

  // Partial ID match or phone match
  const foundKey = Object.keys(mockOrdersData).find((key) => {
    const item = mockOrdersData[key];
    return (
      key.includes(cleanQuery) ||
      item.customerName.toUpperCase().includes(cleanQuery) ||
      item.phone.includes(cleanQuery) ||
      (item.trackingNumber && item.trackingNumber.toUpperCase().includes(cleanQuery))
    );
  });

  return foundKey ? mockOrdersData[foundKey] : null;
}
