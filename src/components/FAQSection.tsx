import React, { useState, useMemo, useEffect } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, HeartHandshake, ShieldCheck, Truck, Droplet, Scissors, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FAQItem {
  id: string;
  category: 'heritage' | 'care' | 'order' | 'shipping' | 'payment';
  questionSr: string;
  questionEn: string;
  answerSr: string;
  answerEn: string;
  badgeSr: string;
  badgeEn: string;
}

export const masterFaqList: FAQItem[] = [
  {
    id: 'faq-heritage-01',
    category: 'heritage',
    questionSr: 'Koja je kulturna i etnološka vrednost (heritage value) unikatnih rukotvorina iz Homolja?',
    questionEn: 'What is the cultural and ethnological heritage value of unique handicrafts from Homolje?',
    answerSr: 'Rukotvorine radionice Savremeni Koreni iz Homolja predstavljaju autentično nematerijalno kulturno nasleđe istočne Srbije. Svaki komad (vezene vunene čarape, narodna nošnja, vlaška šubara) izrađuje se tradicionalnim arhaičnim tehnikama: pletenjem na 5 igala, tradicionalnim punim vezom i pokrsticom. Kao unikati izrađeni bez industrijskih mašina, ovi predmeti nose energetski pečat majstora Tanje Petrić i predstavljaju trajnu porodičnu dragocenost (heirloom) čija vrednost raste kroz generacije.',
    answerEn: 'Handicrafts from the Savremeni Koreni atelier in Homolje embody authentic intangible cultural heritage of eastern Serbia. Each item (embroidered wool socks, folk costumes, Vlach sheepskin hats) is crafted using traditional archaic techniques: 5-needle knitting, full surface folk embroidery, and cross-stitch. As pure artisan pieces made without industrial machinery, they bear the artisan imprint of Tanja Petrić and serve as everlasting family heirlooms.',
    badgeSr: 'Kulturno Nasleđe',
    badgeEn: 'Cultural Heritage'
  },
  {
    id: 'faq-symbols-02',
    category: 'heritage',
    questionSr: 'Šta simbolizuju tradicionalni ornamenti i motivi na vezenim vunenim čarapama?',
    questionEn: 'What do the traditional ornaments and motifs on embroidered wool socks symbolize?',
    answerSr: 'Geometrijski i floralni motivi na homoljskim vezenim čarapama nose viševekovnu zaštitnu i obrednu simboliku: romboidni i prepleteni oblici simbolišu plodnost tla, snagu doma i zaštitu od uroka, dok floralni motivi (homoljski božur, ružice, stilizovane lozice) označavaju zdravlje, lepotu i radost življenja. U srpskoj i vlaškoj tradiciji, vezene čarape su bile statusni simbol i neizostavan deo devojačke spreme.',
    answerEn: 'Geometric and floral motifs on Homolje embroidered socks carry centuries-old protective and ceremonial symbolism: rhombus and interlaced shapes represent fertile soil, household strength, and protection against evil eyes, while floral motifs (Homolje peony, roses, stylized vines) represent health, beauty, and vitality.',
    badgeSr: 'Simbolika & Motivi',
    badgeEn: 'Symbolism & Motifs'
  },
  {
    id: 'faq-knitting-03',
    category: 'heritage',
    questionSr: 'Zašto je ručno pletenje vune na 5 igala kvalitetnije i dugovečnije od mašinske izrade?',
    questionEn: 'Why is 5-needle hand knitting superior and longer-lasting than machine manufacturing?',
    answerSr: 'Pletenje na 5 igala omogućava bešavno kružno formiranje čarape koje savršeno anatomski prianja uz stopalo i zglob bez zatezanja i usecanja. Ručna kontrola zategnutosti prediva čuva elastičnost vunenih vlakana, omogućava veću gustinu petlji i višestruko veću otpornost na habanje u poređenju sa fabrički sečenim i šivenim trikotažnim proizvodima.',
    answerEn: 'Five-needle knitting allows for seamless circular sock construction that contours anatomically around the foot and ankle without uncomfortable seams. Manual tension control preserves the natural elasticity of wool fibers, providing higher loop density and multiple times greater durability compared to factory-cut seams.',
    badgeSr: '5 Igala Tehnika',
    badgeEn: '5-Needle Technique'
  },
  {
    id: 'faq-wool-04',
    category: 'heritage',
    questionSr: 'Od koje se vune izrađuju proizvodi i koje su prirodne prednosti 100% domaće vune?',
    questionEn: 'What type of wool is used and what are the natural health benefits of 100% domestic sheep wool?',
    answerSr: 'U radionici Savremeni Koreni koristi se isključivo 100% prirodna domaća ovčija i jagnjeća vuna sa obronaka Homoljskih planina. Prirodna vuna je savršen termoregulator koji greje zimi i omogućava koži da diše bez znojenja, prirodno sadrži lanolin koji odbija prljavštinu i ima antibakterijska svojstva, hipoalergena je i potpuno ekološki biorazgradiva.',
    answerEn: 'At Savremeni Koreni, we exclusively use 100% natural domestic sheep and lamb wool sourced from the Homolje mountain slopes. Natural wool acts as a perfect thermoregulator that keeps you warm in sub-zero winter while breathing effortlessly, naturally contains dirt-repellent antibacterial lanolin, is hypoallergenic, and fully biodegradable.',
    badgeSr: '100% Homoljska Vuna',
    badgeEn: '100% Pure Wool'
  },
  {
    id: 'faq-care-wash-05',
    category: 'care',
    questionSr: 'Kako se pravilno peru proizvodi od 100% prirodne vune i ručni vez da se ne skupe?',
    questionEn: 'How do you properly wash 100% natural wool and handcrafted embroidery to prevent shrinkage?',
    answerSr: 'Vuneni ručni radovi peru se isključivo ručno u mlakoj vodi temperature do 30°C uz blagi tečni deterdžent za vunu sa lanolinom ili blagi dečiji šampon. Vuna se lagano potapa i gnječi bez agresivnog trljanja, uvrtanja ili mašinske centrifuge. Ispiranje se vrši vodom iste temperature kako bi se izbegao termički šok koji izaziva skupljanje, a višak vode se upija umotavanjem u suv pamučni peškir.',
    answerEn: 'Wool handcrafts must be washed strictly by hand in lukewarm water (up to 30°C / 86°F) using a delicate lanolin wool shampoo or gentle baby wash. Gently submerge and squeeze without twisting, rubbing, or machine centrifugation. Rinse in water of the same temperature to avoid thermal shock, and roll in a dry cotton towel to absorb moisture.',
    badgeSr: 'Pranje Vune',
    badgeEn: 'Wool Washing'
  },
  {
    id: 'faq-care-dry-06',
    category: 'care',
    questionSr: 'Kako se pravilno suše i oblikuju ručno pletene vunene čarape?',
    questionEn: 'How do you properly dry and shape hand-knitted wool socks?',
    answerSr: 'Ručno pletene čarape i vuneni odevni predmeti suše se isključivo položeni horizontalno na ravnoj podlozi preko suve pamučne krpe ili peškira, na sobnoj temperaturi i promaji. Strogo je zabranjeno sušenje na radijatoru, grejalici, u mašini za sušenje veša ili kačenje štipaljkama na žicu, jer težina vlage može trajno deformisati kroj.',
    answerEn: 'Hand-knitted socks and wool apparel must be dried flat horizontally on a dry cotton towel at ambient room temperature in good airflow. Never dry directly on radiators, heaters, in tumble dryers, or hanging with clothespins, as the weight of wet wool can permanently misshape the garment.',
    badgeSr: 'Sušenje & Kroj',
    badgeEn: 'Drying & Shaping'
  },
  {
    id: 'faq-care-moths-07',
    category: 'care',
    questionSr: 'Kako se čuva prirodna vuna i štiti od moljaca bez agresivne hemije?',
    questionEn: 'How to safely store natural wool and protect it from moths without harsh chemicals?',
    answerSr: 'Vuneni predmeti se pre odlaganja moraju potpuno osušiti i provetriti, a zatim čuvati u platnenim pamučnim vrećicama. Najbolja prirodna zaštita od moljaca su sušeni cvetovi prave lavande, pločice ili strugotina od kedrovog drveta, kora divljeg kestena i grančice ruzmarina, koji štite tkaninu i daju prijatan prirodan miris bez štetnog naftalina.',
    answerEn: 'Before seasonal storage, wool items should be clean and completely dry, then kept in breathable organic cotton pouches. The best natural moth repellents are dried French lavender blossoms, cedarwood blocks/chips, horse chestnut bark, and rosemary sprigs, providing reliable protection without toxic naphthalene.',
    badgeSr: 'Zaštita od Moljaca',
    badgeEn: 'Moth Protection'
  },
  {
    id: 'faq-care-fur-08',
    category: 'care',
    questionSr: 'Kako se održava i čisti bela vlaška šubara od prirodnog ovčijeg krzna?',
    questionEn: 'How do you clean and maintain a traditional white Vlach sheepskin fur hat?',
    answerSr: 'Vlaška šubara od prirodnog krzna se nikada ne pere u vodi niti nosi na hemijsko čišćenje. Održava se redovnim provetravanjem na svežem vazduhu i povremenim nežnim iščešljavanjem mekom četkom za krzno u pravcu prirodnog pada dlake. Ako se pokvasi na snegu ili kiši, dovoljno je otresti kapljice i ostaviti je da se prirodno osuši na okruglom kalupu koji čuva njenu formu.',
    answerEn: 'A natural fur Vlach šubara should never be submerged in water or dry-cleaned. Maintenance consists of periodic airing in crisp fresh air and gentle brushing with a soft fur brush in the direction of hair growth. If caught in snow or rain, simply shake off excess moisture and let it dry naturally over a round stand.',
    badgeSr: 'Nega Šubare',
    badgeEn: 'Fur Hat Care'
  },
  {
    id: 'faq-care-iron-09',
    category: 'care',
    questionSr: 'Kako se peglaju odevni predmeti sa reljefnim ručnim vezom?',
    questionEn: 'How do you properly iron garments featuring textured hand embroidery?',
    answerSr: 'Ručni vez se nikada ne pegla direktno sa lica jer bi vrela ploča pegle spljoštila reljefni bod i uništila sjaj pamučnog i svilenog konca. Peglanje se obavlja isključivo sa naličja (sa unutrašnje strane), preko vlažne pamučne gaze, na mekanoj podlozi (presavijeni peškir), uz umerenu temperaturu pegle i blagu paru.',
    answerEn: 'Hand embroidery should never be ironed directly on the front face, as heat and pressure would flatten the 3D relief texture and dull the embroidery sheen. Always iron from the reverse (inside-out) over a damp cotton pressing cloth on top of a soft folded towel with gentle steam.',
    badgeSr: 'Peglanje Veza',
    badgeEn: 'Ironing Embroidery'
  },
  {
    id: 'faq-order-custom-10',
    category: 'order',
    questionSr: 'Kako se naručuju unikatne vezene čarape za folklor i nošnja po meri?',
    questionEn: 'How do you order custom folklore socks and bespoke Serbian folk costumes made to measure?',
    answerSr: 'Čarape i nošnja se naručuju po tačnim merama vašeg stopala, dužine lista i sa specifičnim motivom vašeg folklornog ansambla (KUD-a) ili zavičajnog kraja. Porudžbina se vrši putem sajta, telefona (+381 60 331 8319) ili WhatsApp/Viber poruke, a rok izrade unikatnog para iznosi 5 do 14 radnih dana.',
    answerEn: 'Socks and costumes are bespoke tailored to your foot measurements, calf height, and the exact regional motifs of your folklore ensemble or family ancestry. Orders can be placed directly on our website, by phone (+381 60 331 8319), or via WhatsApp/Viber. Crafting time is typically 5 to 14 business days.',
    badgeSr: 'Izrada po Meri',
    badgeEn: 'Made to Measure'
  },
  {
    id: 'faq-shipping-diaspora-11',
    category: 'shipping',
    questionSr: 'Kako se vrši isporuka za dijasporu (Nemačka, Austrija, Švajcarska, SAD, Australija)?',
    questionEn: 'How does international shipping work for the diaspora (Germany, Austria, Switzerland, USA, Australia)?',
    answerSr: 'Za dijasporu i inostranstvo pakete šaljemo međunarodnom preporučenom avio-poštom (Post of Serbia International) ili DHL Express kurirskom službom, uz prateći broj za praćenje (tracking code) i bezbedno transportno pakovanje prilagođeno dugim relacijama. Isporuka u EU stiže za 5–10 radnih dana, dok za SAD/Kanadu/Australiju putuje 10–18 dana.',
    answerEn: 'For international orders and the diaspora, we ship via priority registered airmail (Post of Serbia International) or DHL Express, complete with an online tracking code and protective packaging. Delivery to EU countries takes 5-10 business days, and 10-18 business days for USA, Canada, and Australia.',
    badgeSr: 'Isporuka Dijaspora',
    badgeEn: 'Worldwide Shipping'
  },
  {
    id: 'faq-payment-methods-12',
    category: 'payment',
    questionSr: 'Koji su načini plaćanja dostupni za kupce iz Srbije i inostranstva?',
    questionEn: 'What payment methods are available for domestic and international buyers?',
    answerSr: 'Kupci iz Srbije mogu platiti pouzećem u gotovini pri preuzimanju, e-banking uplatom na račun ili IPS QR kodom. Kupci iz dijaspore i inostranstva mogu bezbedno platiti platnim karticama (Visa, Mastercard, Maestro, Dina, Amex) i putem PayPal servisa.',
    answerEn: 'Domestic Serbian buyers can pay cash on delivery (pouzećem), via direct bank transfer (e-banking), or instant IPS QR code. Diaspora and international clients can pay securely using credit/debit cards (Visa, Mastercard, Maestro, Amex) or via verified PayPal.',
    badgeSr: 'Sigurno Plaćanje',
    badgeEn: 'Secure Payment'
  },
  {
    id: 'faq-location-atelier-13',
    category: 'order',
    questionSr: 'Gde se nalazi radionica Savremeni Koreni i da li je moguća lična poseta?',
    questionEn: 'Where is the Savremeni Koreni atelier located and are in-person visits welcome?',
    answerSr: 'Radionica Savremeni Koreni nalazi se u selu Jošanica (Peskuša 9, 12318 Jošanica, Opština Žagubica, Homolje, istočna Srbija, GPS: 44.254722, 21.782500). Posete ateljeu i razgovor o narodnoj nošnji su dobrodošli uz prethodnu telefonsku najavu na +381 60 331 8319.',
    answerEn: 'The Savremeni Koreni workshop is located in Jošanica village (Peskuša 9, 12318 Jošanica, Žagubica Municipality, Homolje, Eastern Serbia, GPS: 44.254722, 21.782500). Visitors are welcome for personal consultations and custom fittings with prior appointment at +381 60 331 8319.',
    badgeSr: 'Atelje Jošanica',
    badgeEn: 'Atelier Location'
  }
];

interface FAQSectionProps {
  onOpenOrderModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenOrderModal }) => {
  const { isEn } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-heritage-01', 'faq-care-wash-05']));

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const categories = useMemo(() => [
    { id: 'all', labelSr: 'Sva Pitanja', labelEn: 'All Questions' },
    { id: 'heritage', labelSr: 'Kulturno Nasleđe & Tehnike', labelEn: 'Heritage & Techniques' },
    { id: 'care', labelSr: 'Nega & Održavanje Vune', labelEn: 'Wool Care & Maintenance' },
    { id: 'order', labelSr: 'Poručivanje & Izrada po Meri', labelEn: 'Custom Orders & Sizing' },
    { id: 'shipping', labelSr: 'Isporuka & Dijaspora', labelEn: 'Shipping & Diaspora' },
    { id: 'payment', labelSr: 'Plaćanje & Garancija', labelEn: 'Payment & Guarantees' },
  ], []);

  const filteredFaqs = useMemo(() => {
    return masterFaqList.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const qText = isEn ? item.questionEn.toLowerCase() : item.questionSr.toLowerCase();
      const aText = isEn ? item.answerEn.toLowerCase() : item.answerSr.toLowerCase();
      const search = searchQuery.trim().toLowerCase();
      const matchSearch = !search || qText.includes(search) || aText.includes(search);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery, isEn]);

  // Inject or update Schema.org FAQPage JSON-LD in DOM head
  useEffect(() => {
    const scriptId = 'jsonld-faq-dynamic';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://savremenikoreni.com/#faq-schema',
      'mainEntity': masterFaqList.map((faq) => ({
        '@type': 'Question',
        'name': isEn ? faq.questionEn : faq.questionSr,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': isEn ? faq.answerEn : faq.answerSr
        }
      }))
    };

    scriptTag.text = JSON.stringify(schemaData, null, 2);
  }, [isEn]);

  return (
    <section id="faq-sekcija" className="py-20 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-t border-[#E8E0D5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E3E26]/10 text-[#9E3E26] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#9E3E26]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isEn ? 'E-E-A-T Knowledge Base & Care Guide' : 'E-E-A-T Baza Znanja & Vodič za Negu'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#241D19] font-bold tracking-tight mb-4">
            {isEn ? 'Frequently Asked Questions' : 'Često Postavljana Pitanja'}
          </h2>

          <p className="text-base sm:text-lg text-[#5C4D43] leading-relaxed">
            {isEn
              ? 'Everything you need to know about authentic Homolje handcrafts, natural wool care, bespoke costume orders, and international shipping to the diaspora.'
              : 'Sve što vas zanima o autentičnim homoljskim rukotvorinama, pravilnom pranju i čuvanju prirodne vune, porudžbinama po meri i bezbednom slanju u inostranstvo.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-5 h-5 text-[#8C7A6B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search answers (e.g. washing, fur hat, diaspora, sizes)...' : 'Pretraži odgovore (npr. pranje vune, šubara, moljci, dijaspora, vez)...'}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E8E0D5] rounded-xl text-[#241D19] placeholder-[#8C7A6B] focus:outline-none focus:ring-2 focus:ring-[#9E3E26]/30 focus:border-[#9E3E26] shadow-sm text-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#241D19] bg-[#FAF7F2] px-2 py-1 rounded"
            >
              {isEn ? 'Clear' : 'Poništi'}
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#9E3E26] text-white shadow-md shadow-[#9E3E26]/20 scale-102'
                    : 'bg-white text-[#5C4D43] border border-[#E8E0D5] hover:border-[#9E3E26]/40 hover:bg-[#FAF7F2]'
                }`}
              >
                {isEn ? cat.labelEn : cat.labelSr}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E0D5] p-6">
              <HelpCircle className="w-10 h-10 text-[#8C7A6B] mx-auto mb-3 opacity-60" />
              <p className="text-[#5C4D43] font-medium">
                {isEn ? 'No questions matched your search.' : 'Nismo pronašli pitanje koje odgovara vašoj pretrazi.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-xs font-semibold text-[#9E3E26] hover:underline"
              >
                {isEn ? 'Reset filters' : 'Prikaži sva pitanja'}
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.has(faq.id);
              const question = isEn ? faq.questionEn : faq.questionSr;
              const answer = isEn ? faq.answerEn : faq.answerSr;
              const badge = isEn ? faq.badgeEn : faq.badgeSr;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#9E3E26]/30 shadow-md ring-1 ring-[#9E3E26]/10'
                      : 'border-[#E8E0D5] hover:border-[#9E3E26]/30 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#8C7A6B] text-[11px] font-semibold border border-[#E8E0D5]">
                        <Sparkles className="w-3 h-3 text-[#9E3E26]" />
                        <span>{badge}</span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#241D19] leading-snug">
                        {question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? 'bg-[#9E3E26] text-white rotate-180' : 'bg-[#FAF7F2] text-[#8C7A6B] border border-[#E8E0D5]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] text-[#4A3C32] leading-relaxed border-t border-[#FAF7F2]">
                      <p>{answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Help Banner / CTA */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#241D19] to-[#382C24] text-white rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#5C4D43]/30">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8D0A9] uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isEn ? 'Direct Artisan Support' : 'Direktan Razgovor sa Majstorom'}</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold">
              {isEn ? 'Have a custom question or specific request?' : 'Imate specifično pitanje ili želite vez po želji?'}
            </h4>
            <p className="text-sm text-stone-300 max-w-xl">
              {isEn
                ? 'Tanja Petrić is available daily to consult on folk costumes, measurements, sizing, and worldwide shipping.'
                : 'Tanja Petrić vam lično odgovara na sva pitanja u vezi mera, izbora vune, folklornih motiva i termina izrade.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+381603318319"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-[#241D19] font-bold text-xs sm:text-sm hover:bg-[#FAF7F2] transition-colors text-center shadow"
            >
              +381 60 331 8319
            </a>
            {onOpenOrderModal && (
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#9E3E26] text-white font-bold text-xs sm:text-sm hover:bg-[#853420] transition-colors text-center shadow cursor-pointer"
              >
                {isEn ? 'Inquire Online' : 'Pošalji Upit'}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
export default FAQSection;
