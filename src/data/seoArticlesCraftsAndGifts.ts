import { BlogPost } from '../types';
const torbicaImg = '/images/etno_torbica_vez_1789021849429.jpg';
const subaraImg = '/images/srpska_subara_moderna_1789021862584.jpg';
const carapeImg = '/images/vunene_carape_vez_1789021876638.jpg';
const nakitImg = '/images/heklani_nakit_1789021909183.jpg';
const heroImg = '/images/savremeni_hero_banner_1789021835867.jpg';
const heklaniSetImg = '/images/heklani_trobojni_set_1789106901909.jpg';
const debelaVunaImg = '/images/heklana_kraljevsko_plava_1789106930062.jpg';
const cegerRadionicaImg = '/custom_products/1789326187913_1000020290.webp';
const homoljskiSuveniriImg = '/images/homoljski_suveniri_dar_1789407290576.jpg';
const homoljeTradicijaImg = '/custom_products/1789327918037_1000019845.webp';

export const craftsAndGiftsArticles: BlogPost[] = [
  // 6. HEKLANJE ZA POČETNIKE I ŠEME (Google Keyword Planner: 1.600 - 2.800/mo)
  {
    id: 'heklanje-za-pocetnike-seme-i-osnovni-bodovi',
    slug: 'heklanje-za-pocetnike-seme-osnovni-bodovi-tehnika',
    title: 'Heklanje za Početnike i Tumačenje Šema: Osnovni Bodovi, Lančić, Niski i Visoki Stubić sa Praktičnim Projektima',
    subtitle: 'Vodič od prvog čvora do gotovog rada: kako držati heklicu i pređu, kako čitati grafičke šeme i napraviti prve podmetače, torbice i čipku.',
    excerpt: 'Heklanje je jedna od najlepših i najumirujućih veština na svetu. Saznajte sve o odabiru debljine heklice, pravilnom držanju pređe i savladavanju osnovnih bodova koji otvaraju vrata beskrajne kreativnosti.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '8. mart 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1150,
    category: 'zanati',
    categoryLabel: 'Heklanje & Tehnika',
    targetKeywords: [
      'heklanje za početnike',
      'šeme za heklanje',
      'kako heklati lančić',
      'niski stubić heklanje',
      'heklanje zavesa i čipke',
      'oznake na šemama za heklanje'
    ],
    coverImage: heklaniSetImg,
    featured: true,
    relatedProductId: 'sk-nakit-01',
    sections: [
      {
        id: 'uvod-u-heklanje',
        heading: 'Zašto je heklanje savršen hobi za moderan život i oslobađanje od stresa?',
        paragraphs: [
          'Heklanje (kvačkanje) jeste tehnika stvaranja tkanine prepletanjem petlji pomoću samo jedne igle sa kukicom na vrhu (heklice). Za razliku od pletenja sa dve ili pet igala, heklanje ima ogromnu prednost za početnike: u svakom trenutku na igli je aktivna samo jedna petlja, pa nema straha od rasplitanja celog reda ako ispustite iglu!',
          'Pored toga što možete sami izraditi unikatan šešir, letnju mrežastu torbu, dekorativni milje ili topao šal, savremena neuronauka potvrđuje da ritmični pokreti heklice stimulišu lučenje dopamina i serotonina, smanjuju nivo kortizola (hormona stresa) i deluju poput aktivne meditacije. U našem ateljeu u Jošanici, heklanje je svakodnevni izvor unutrašnjeg mira.',
          'Sve što vam je potrebno za početak jesu jedna heklica, jedno klupko mekog pamučnog konca i malo strpljenja.'
        ],
        quote: {
          text: 'U heklanju ne postoji greška koju jedan potez povlačenja konca ne može popraviti. To je zanat koji vas uči da je svaki novi početak jednako lep kao i gotov rad.',
          caption: 'Tanja Petrić o čarima heklanja'
        }
      },
      {
        id: 'osnovni-alati-i-materijali',
        heading: 'Izbor heklice i konca za početnike: Zlatna pravila',
        paragraphs: [
          'Najčešća greška početnika jeste izbor pretankog konca i sitne heklice (npr. konac broj 10 i heklica 1 mm za zavese), što dovodi do zamora očiju i gubitka motivacije.',
          'Za prve korake preporučujemo:',
          '• Heklica debljine 3.5 mm ili 4.0 mm sa ergonomskom silikonskom drškom koja lepo leži u dlanu.',
          '• Srednje debeli pamučni konac (100% pamuk) svetle boje (krem, svetlosiva, bež) – na svetlom koncu se petlje jasno vide, pa je lako prebrojati bodove.',
          '• Pomoćni alati: makazice sa oštrim vrhom, tupa igla za uvođenje konca na kraju rada i markeri za petlje.'
        ]
      },
      {
        id: 'cetiri-osnovna-boda',
        heading: 'Četiri osnovna boda koja morate znati',
        paragraphs: [
          '1. Početni čvor i lančić (ch / chain): Osnova svakog heklanog rada. Konac se prebaci preko kukice i provuče kroz petlju, stvarajući ujednačen niz nalik na pletenicu.',
          '2. Mrtva petlja (slip stitch / sl st): Služi za spajanje krajeva lančića u krug ili za nevidljivi prelazak na sledeću poziciju.',
          '3. Niski stubić (single crochet / sc): Gust, čvrst i kompaktan bod. Idealan je za izradu amigurumi igračaka, čvrstih korpica i etno torbi koje ne zahtevaju postavu.',
          '4. Visoki stubić (double crochet / dc): Dva puta viši od niskog stubića, daje mekšu i elastičniju strukturu. Koristi se za šalove, kardigane, ćebad i čipkaste uzorke.'
        ]
      },
      {
        id: 'kako-citati-seme',
        heading: 'Kako čitati šeme za heklanje: Simboli i krugovi',
        paragraphs: [
          'Grafičke šeme su univerzalni jezik heklanja – kada naučite simbole, možete heklati po japanskim, francuskim ili srpskim šemama bez poznavanja jezika!',
          'Oznake na šemama:',
          '• Kružić ili tačka = petlja lančića.',
          '• Krstić ili znak plus = niski stubić.',
          '• Vertikalna crtica sa jednom poprečnom crtom = visoki stubić.',
          '• Rad u krugu čita se od centra prema spolja u smeru suprotnom od kazaljke na satu, dok se rad u redovima čita cik-cak (s leva nadesno, pa s desna nalevo).'
        ]
      }
    ],
    faqs: [
      {
        question: 'Koliko je vremena potrebno da početnik nauči heklanje?',
        answer: 'Osnovni lančić i niski stubić savladavaju se za jedno popodne (oko 2 do 3 sata vežbe). Za izradu prvog jednostavnog predmeta poput podmetača za šolju potrebno je samo nekoliko dana.'
      },
      {
        question: 'Kako sprečiti da se heklani rad krivi na ivicama?',
        answer: 'Krivljenje ivica nastaje kada se na kraju reda zaboravi prelazna petlja lančića ili se greškom doda/oduzme bod na rubu. Brojite bodove na kraju svakog reda dok ne steknete rutinu.'
      }
    ],
    conclusion: 'Heklica u ruci i klupko konca dovoljni su da stvorite čaroliju. Učite strpljivo i uživajte u svakoj novoj petlji.'
  },

  // 7. PLETENJE BEZ IGALA (Google Keyword Planner: 450 - 900/mo)
  {
    id: 'pletenje-bez-igala-rukama-prstima-chunky-vuna',
    slug: 'pletenje-bez-igala-rukama-prstima-chunky-debela-vuna',
    title: 'Pletenje Bez Igala (Pletenje Prstima i Rukama): Tehnika Izrade Debelih Ćebadi i Šalova od Chunky Vune',
    subtitle: 'Sve o arm knitting tehnici: kako vaše podlaktice postaju igle, odabir gigantske pređe, izrada mekanog ćebeta za samo dva sata i nega merino vune.',
    excerpt: 'Pletenje rukama i prstima je svetski hit u uređenju enterijera i brzoj modi. Naučite kako bez ijedne igle, koristeći samo sopstvene ruke i debelu runska vunu, možete stvoriti najmekše ćebe za vaš dom.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '9. mart 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1080,
    category: 'vuna',
    categoryLabel: 'Pletenje Rukama & Dizajn',
    targetKeywords: [
      'pletenje bez igala',
      'pletenje prstima',
      'pletenje rukama debela vuna',
      'chunky vuna za pletenje rukama',
      'kako isplesti ćebe rukama',
      'arm knitting tehnika'
    ],
    coverImage: debelaVunaImg,
    featured: false,
    relatedProductId: 'sk-carape-01',
    sections: [
      {
        id: 'sta-je-arm-knitting',
        heading: 'Šta je pletenje rukama i zašto je osvojilo svet?',
        paragraphs: [
          'Pletenje rukama (eng. arm knitting) i pletenje prstima jeste tehnika gde umesto tradicionalnih tankih drvenih ili metalnih igala koristite sopstvene podlaktice i prste kao vođice za gigantske petlje. Koristeći debelu pređu (često debljine palca ili deblju), petlje su široke nekoliko centimetara, što rad čini neverovatno vizuelnim, dinamičnim i brzim!',
          'Dok je za pletenje klasičnog vunenog prekrivača na iglama potrebno i po mesec dana svakodnevnog rada, ćebe pleteno rukama dimenzija 120x150 cm možete završiti za manje od tri sata! To pruža instant osećaj uspeha i radosti, posebno za ljude koji nemaju strpljenja za sitan rad.',
          'Estetika ovih predmeta je moderna i luksuzna: debeli reljefni čvorovi savršeno se uklapaju u skandinavski, planinski i rustični etno stil enterijera.'
        ],
        quote: {
          text: 'Dodir sirove meke vune direktno na koži ruku budi drevni instinkt stvaranja. To je terapija dodirom i tekstilni dizajn u najčistijem obliku.',
          caption: 'Tanja Petrić o radu sa prirodnom debelom pređom'
        }
      },
      {
        id: 'izbor-prede-za-ruke',
        heading: 'Izbor pređe: Merino češljana traka vs tubasta pamučna pređa',
        paragraphs: [
          'Za pletenje bez igala koriste se dva osnovna tipa pređe:',
          '1. Češljana runska ili merino traka (unspun roving): To su nepredena, samo iščešljana dugačka vunena vlakna. Neverovatno su mekana i topla poput oblaka. Ipak, zahtevaju nežno rukovanje jer se prekomernim trljanjem mogu ućebati ili raslojiti.',
          '2. Tubasta pletena pređa (velvet ili pamučna cev punjena vlaknima): Savremeni materijal koji se ne linja, može se prati u mašini i idealan je za domove sa malom decom i kućnim ljubimcima.',
          'Za standardno ćebe za krevet potrebno je između 2 i 3.5 kilograma debele pređe.'
        ]
      },
      {
        id: 'koraci-za-izradu-cebeta',
        heading: 'Kako isplesti ćebe rukama: Korak po korak',
        paragraphs: [
          '1. Nameštanje početnih petlji: Navucite prvu kliznu petlju na desnu ruku oko ručnog zgloba. Zatim desnom rukom zahvatite radnu nit i navucite novu petlju na podlakticu, ponavljajući dok ne dobijete željenu širinu (npr. 18 do 22 petlje za širinu od 120 cm).',
          '2. Prebacivanje na drugu ruku: Držeći radnu nit u šaci, levom rukom prevucite petlju preko šake i navucite novu petlju na levu podlakticu. Nastavite redom dok sve petlje ne pređu na levu ruku.',
          '3. Održavanje ujednačenosti: Pazite da ne stežete petlje previše čvrsto oko ruke kako bi krv mogla normalno da cirkuliše i kako biste ih lako prevlačili.',
          '4. Završni red: Kada potrošite pređu do poslednja 2 metra, pletite po dve petlje zajedno i provlačite nit kroz preostalu petlju kako biste bezbedno zaključali rad.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Šta ako moram da prekinem pletenje rukama usred rada?',
        answer: 'Jednostavno pažljivo svucite petlje sa podlaktice na dugačku drvenu olovku, varjaču, motku ili komad debljeg kanapa kako se ne bi rasplele, i nastavite kada budete slobodni.'
      },
      {
        question: 'Kako se održava debelo ćebe od runske vune?',
        answer: 'Preporučuje se redovno provetravanje na svežem vazduhu i suvo hemijsko čišćenje. Vuna prirodno odbija prašinu i prljavštinu zahvaljujući lanolinu, pa je retko potrebno pranje.'
      }
    ],
    conclusion: 'Pletenje rukama je most između tradicionalne vune i modernog dizajna. Jedno popodne i par klupka vune unose u vaš dom nezamenljivu toplinu.'
  },

  // 8. CEGER TORBE ŠIVENJE I KROJ SA VEZOM (Google Keyword Planner: 600 - 1.100/mo)
  {
    id: 'ceger-torbe-sivenje-kroj-i-vezeni-motivi',
    slug: 'ceger-torbe-sivenje-kroj-platno-vez-eko-moda',
    title: 'Kako Sašiti Platnenu Ceger Torbu sa Vezom: Kroj, Ojačane Ručke, Unutrašnji Džep i Ekološka Moda',
    subtitle: 'Praktičan vodič za izradu trajne, višekratne pamučne torbe za kupovinu i grad: francuski šav, ojačanje uglova i uklapanje autentičnog etno veza.',
    excerpt: 'Zamenite plastične kese unikatnom platnenom ceger torbom koju ste sami skrojili ili poručili sa ručnim vezom. Naučite kako se šiju ručke koje nose 10 kilograma i kako torba dobija čvrsto dno.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '10. mart 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1100,
    category: 'torbe',
    categoryLabel: 'Torbe & Eko Šivenje',
    targetKeywords: [
      'ceger torbe šivenje',
      'kako sašiti platnenu torbu',
      'kroj za ceger torbu',
      'pamučne torbe ručni rad',
      'vezeni ceger od lana',
      'šivenje torbe sa postavom'
    ],
    coverImage: cegerRadionicaImg,
    featured: true,
    relatedProductId: 'sk-torbica-01',
    sections: [
      {
        id: 'zasto-platneni-ceger',
        heading: 'Ekološki i stilski preporod platnenih ceger torbi',
        paragraphs: [
          'Platneni ceger (tote bag) odavno je prestao da bude samo skromna torba za pijacu. Danas je on snažna izjava ekološke svesti, urbanog stila i ljubavi prema održivoj modi. Jedan kvalitetan pamučni ili laneni ceger tokom svog veka trajanja može zameniti više od 1.500 jednokratnih plastičnih kesa koje decenijama zagađuju prirodu!',
          'Kada se na jednostavan geometrijski oblik cegera doda tradicionalni ručni vez – bilo da je to geometrijski motiv sa homoljskog pojasa, stilizovani cvet božura ili diskretna monogram inicijala – obična torba postaje unikatni modni detalj koji privlači pažnju na ulicama svetskih metropola.',
          'U radionici Savremeni Koreni izrađujemo cegere od čvrstog pamučnog kelpera i srpskog platna, vodeći računa o svakom šavu i funkcionalnosti.'
        ],
        quote: {
          text: 'Platnena torba je platno za poruku. Kada nosite ceger sa vezenom šarom svojih baka, vi pokazujete da se lepo i odgovorno mogu savršeno spojiti.',
          caption: 'Tanja Petrić o održivoj estetici'
        }
      },
      {
        id: 'materijali-i-dimenzije-kroja',
        heading: 'Materijali, gustina i dimenzije idealnog kroja',
        paragraphs: [
          'Da bi ceger bio dugovečan, debljina tkanine je ključna:',
          '• Tkanina: Koristite sirovo pamučno platno (žoržet/kelper) gustine minimum 240 do 320 g/m² ili čisti debeli lan. Tanka platna se gužvaju i brzo cepaju pod težinom knjiga ili namirnica.',
          '• Standardne dimenzije tela torbe: Dva pravougaonika dimenzija 42x38 cm daju optimalan prostor u koji lako staje i laptop od 15 inča.',
          '• Ručke: Dve trake dimenzija 70x8 cm (koje se presavijaju na širinu od 3.5 do 4 cm) omogućavaju udobno nošenje i preko ramena i u ruci.',
          '• Francuski šav (skriveni šav): Tehnika dvostrukog štepanja gde su sve sirove ivice zatvorene unutar šava, tako da se unutrašnjost ne kruni i ne zahteva endlanje.'
        ]
      },
      {
        id: 'ojačavanje-i-dno',
        heading: 'Tajna nosivosti: Ukršteni šav (X-box) na ručkama i 3D dno',
        paragraphs: [
          'Najčešće mesto pucanja kod jeftinih fabričkih cegera jeste spoj ručke i tela torbe. Kod majstorske ručne izrade ručke se nikada ne prišivaju samo jednim ravnim štepom!',
          'Ručka se ušiva u kvadrat sa unutrašnjim dijagonalnim krstom (tzv. "X-box" štep). Ovaj geometrijski raspored šavova ravnomerno raspoređuje naprezanje na površinu od 16 cm², omogućavajući torbi da bez problema ponese težinu od 10 do 12 kilograma.',
          'Da torba ne bi bila ravna kao koverta, isecanjem i spajanjem donjih uglova formira se dubina dna (od 6 do 10 cm). Tako dobijate stabilnu torbu u koju stvari ležu uredno i stabilno.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Kada se na ceger stavlja ručni vez – pre ili posle šivenja?',
        answer: 'Vez se UVEK radi pre spajanja stranica torbe, dok je tkanina još u ravnom komadu na đerđefu. Na taj način se poleđina veza može sakriti unutrašnjom postavom ili zaštititi finim lepljivim platnom.'
      },
      {
        question: 'Kako se pere pamučni ceger sa vezom?',
        answer: 'Pere se na 30-40°C sa blagim deterdžentom, izvrnut na naličje. Pegla se dok je još blago vlažan, sa naličja preko tanke pamučne krpe kako bi reljef veza ostao ispupčen.'
      }
    ],
    conclusion: 'Ručno sašiven ceger sa etno vezom je trajna investicija u zdravlje planete i vaš lični stil. To je komad koji nosi priču gde god da krenete.'
  },

  // 9. AUTENTIČNI ETNO POKLONI I SUVENIRI IZ SRBIJE (Google Keyword Planner: 800 - 1.500/mo)
  {
    id: 'etno-pokloni-srbija-autenticni-suveniri-rucni-rad',
    slug: 'etno-pokloni-srbija-autenticni-suveniri-rucni-rad-tradicija',
    title: 'Autentični Etno Pokloni i Suveniri iz Srbije: Šta Pokloniti Strancima, za Svadbe, Slave i Poslovne Partnere',
    subtitle: 'Vodič za odabir nezaboravnog poklona sa dušom: vlaške šubare, vezene čarape, unikatne etno torbice i luksuzni poslovni suveniri sa Homolja.',
    excerpt: 'Zaboravite plastične magnete i fabrički kič. Kada nekome želite da poklonite pravo srce Srbije, birajte ručni rad koji miriše na tradiciju, vunu i čistu prirodu. Evo ideja za sve prilike.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '11. mart 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1160,
    category: 'tradicija',
    categoryLabel: 'Etno Pokloni & Suveniri',
    targetKeywords: [
      'etno pokloni srbija',
      'autentični srpski suveniri',
      'unikatni pokloni ručni rad',
      'šta kupiti strancu iz srbije',
      'poklon za slavu ručni rad',
      'pokloni tradicija homolje'
    ],
    coverImage: homoljskiSuveniriImg,
    featured: true,
    relatedProductId: 'sk-subara-01',
    sections: [
      {
        id: 'filozofija-autenticnog-poklona',
        heading: 'Zašto je pravi zanatski ručni rad najlepši poklon koji možete darivati?',
        paragraphs: [
          'U svetu serijske proizvodnje gde se u svakom tržnom centru od Tokija do Njujorka prodaju identične stvari, istinska vrednost se vratila unikatima. Kada nekome poklonite predmet izrađen rukama – u koji su uloženi dani posvećenosti, prirodni materijali i viševekovna kulturna priča – vi ne darujete samo stvar; vi darujete poštovanje, emociju i trajnu uspomenu.',
          'Srbija ima neprocenjivo bogatstvo starih zanata. Od Homoljskih planina do Šumadije, svaki komad narodnog stvaralaštva nosi toplinu našeg podneblja. Bilo da dočekujete prijatelje i poslovne partnere iz inostranstva, putujete u posetu rodbini u dijaspori, ili tražite dragocen dar za slavu, krštenje ili svadbu, autentični etno poklon govori više od hiljadu reči.'
        ],
        quote: {
          text: 'Pravi poklon iz Srbije ne nosi etiketu "made in PRC". On nosi miris čiste runske vune, šum homoljskih šuma i potpis majstora koji ga je s ljubavlju stvorio.',
          caption: 'Tanja Petrić o suštini autentičnog darivanja'
        }
      },
      {
        id: 'sta-pokloniti-strancima',
        heading: 'Šta pokloniti strancu: Od vlaške šubare do vezenih čarapa',
        paragraphs: [
          'Kada stranci posete Srbiju, najviše ih fascinira naša iskrena gostoljubivost i toplina. Zato poklon treba da materijalizuje upravo te vrednosti:',
          '1. Bela vlaška šubara od prirodnog krzna: Veličanstven poklon koji izaziva divljenje. Stranci, naročito oni iz hladnijih krajeva (Skandinavija, Kanada, Nemačka), oduševljeni su njenom prirodnom toplotom i upečatljivim dostojanstvenim izgledom.',
          '2. Ručno pletene vunene čarape sa vezom: Simbol domaće topline. Zbog lekovitog svojstva lanolina i prelepih cvetnih ornamenata, vezene čarape su omiljeni poklon koji se odmah obuva tokom zimskih večeri.',
          '3. Ručno tkana ili vezena etno torbica: Savršen poklon za dame. Spaja autentični srpski vez sa modernom nosivošću, pa se može nositi u pozorište, na prijem ili u svakodnevnu šetnju.'
        ]
      },
      {
        id: 'pokloni-za-slave-i-porodicu',
        heading: 'Pokloni za krsne slave, svadbe i jubileje',
        paragraphs: [
          'Za krsnu slavu idealan dar domaćinu i domaćici jesu vezeni stolnjaci ili setovi podmetača od pravog srpskog platna, ukrašeni tradicionalnim geometrijskim šarama. To su komadi koji se iznose na slavski sto i prenose deci kao porodična dragocenost.',
          'Za mladence na svadbi unikatni vezeni jastuci ili ručno tkana tkanica sa upisanim monogramom mladenaca predstavljaju simbol neraskidive veze i blagoslov za dugovečan i plodan brak.',
          'Za poslovne partnere iz inostranstva reprezentativni set koji objedinjuje ručni rad iz ateljea Savremeni Koreni (npr. diskretna vezena futrola ili etno komad) uz teglu čuvenog homoljskog meda predstavlja vrhunac diplomatskog i korporativnog bontona.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Da li se unikatni etno pokloni mogu poručiti sa personalizacijom?',
        answer: 'Da! U našoj radionici u Jošanici možemo izvesti inicijale, poseban datum ili posvetu na unutrašnjosti torbice, na platnu ili pojasu, čineći poklon potpuno ličnim.'
      },
      {
        question: 'Kako se pakuju ručni radovi za putovanje avionom?',
        answer: 'Svi naši proizvodi pakuju se u prozračne pamučne vrećice i elegantne kartonske kutije sa sertifikatom o ručnom radu, tako da se ne gužvaju i bezbedno putuju u koferu.'
      }
    ],
    conclusion: 'Poklonite deo naše duše i tradicije. Autentični ručni rad sa Homolja donosi osmeh koji ne bledi kroz godine.'
  },

  // 10. HOMOLJSKI MED I LEKOVITO BILJE (Google Keyword Planner: 500 - 1.000/mo)
  {
    id: 'homoljski-med-i-lekovito-bilje-tradicija',
    slug: 'homoljski-med-lekovito-bilje-tradicija-zanati-priroda-josanica',
    title: 'Homoljski Med, Lekovito Bilje i Tradicija: Netaknuta Priroda Jošanice Kao Večita Inspiracija za Stare Zanate',
    subtitle: 'Priča iz srca Homolja: zašto je homoljski med zaštićenog geografskog porekla, koje trave daju miris vuni i kako seoski mir podstiče stvaralaštvo Tanje Petrić.',
    excerpt: 'Homolje je jedna od poslednjih ekoloških oaza Evrope. Otkrijte kako lekovito bilje sa planinskih livada hrani pčele, kako se koristi za prirodno bojenje vune i zašto se u Jošanici vreme meri lepotom stvaranja.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '12. mart 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1090,
    category: 'tradicija',
    categoryLabel: 'Homolje & Priroda',
    targetKeywords: [
      'homoljski med tradicija',
      'lekovito bilje homolja',
      'čajevi sa homolja',
      'selo jošanica žagubica priroda',
      'ekološki turizam homolje',
      'travarstvo i prirodni život'
    ],
    coverImage: homoljeTradicijaImg,
    featured: false,
    relatedProductId: 'sk-subara-01',
    sections: [
      {
        id: 'homolje-ekoloska-oaza',
        heading: 'Selo Jošanica u srcu Homolja: Gde priroda još uvek govori tišinom',
        paragraphs: [
          'Homoljski kraj, smešten u istočnoj Srbiji između reke Mlave i krečnjačkih venaca Homoljskih planina i Beljanice, predstavlja magično područje gde je priroda sačuvala svoju iskonsku čistotu. Ovde nema teške industrije, zagađenih reka niti bučnih saobraćajnica. Voda sa planinskih izvora pije se direktno rukama, a vazduh miriše na majčinu dušicu, hajdučku travu i borove šume.',
          'U ovom blagoslovenom okruženju, u selu Jošanica (opština Žagubica), nalazi se atelje Savremeni Koreni. Za nas koji ovde živimo i stvaramo, priroda nije kulisa – ona je nerazdvojni deo našeg svakodnevnog zanata. Svaka boja koju vidite na našim tkanicama i vezovima potiče sa ovih livada, a svako klupko vune nosi miris planinske rose.',
          'Život u skladu sa ritmom godišnjih doba uči čoveka strpljenju koje je neophodno za vrhunski ručni rad. Zimi, kada sneg zaveje homoljske prevoje, u toplim sobama predu se niti i vezu šubare, dok u proleće i leto livade bujaju životom.'
        ],
        quote: {
          text: 'U Homolju se ne žuri. Kada slušate zujanje pčela i žubor Jošaničke reke, shvatite da se sve najvrednije stvari na svetu stvaraju polako i s ljubavlju.',
          caption: 'Tanja Petrić o životu u Jošanici'
        }
      },
      {
        id: 'homoljski-med-i-lekovito-bilje',
        heading: 'Tajna homoljskog meda i autohtonih planinskih trava',
        paragraphs: [
          'Homoljski med je s pravom ovenčan oznakom zaštićenog geografskog porekla i svetskim priznanjima. Njegov jedinstven ukus i lekovitost potiču od neverovatne florističke raznolikosti: na homoljskim pašnjacima raste preko 150 vrsta medonosnog i lekovitog bilja, od kojih su mnoge endemske vrste.',
          'Među najvažnijim travama Homolja ističu se:',
          '• Majčina dušica (Thymus serpyllum): Kraljica homoljskih proplanaka, izuzetno aromatična, čisti disajne puteve i daje medu prepoznatljivu cvetnu notu.',
          '• Kantarion (Gospina trava): Žuti cvet sunca, leči rane i smiruje upale, a vekovima se koristi i za dobijanje tople crvenkasto-smeđe boje za prirodno bojenje vune.',
          '• Rtanjski čaj (Satureja montana): Snažan prirodni antiseptik koji raste na kamenjarima i daje organizmu vitalnost i snagu.',
          '• Kopriva i divlji origano: Izvor gvožđa i prirodnog zdravlja koji lokalno stanovništvo bere u rano proleće.'
        ]
      },
      {
        id: 'harmonija-zanata-i-prirode',
        heading: 'Kako lekovito bilje i čista priroda oplemenjuju naš ručni rad',
        paragraphs: [
          'U radionici Savremeni Koreni čuvamo starinsko znanje o upotrebi lokalnog bilja. Vuna se pere bez deterdženata u mekoj izvorskoj vodi, a čuva se sa suvim buketima lavande, nane i pelina koji prirodno teraju insekte bez upotrebe naftalina i hemikalija.',
          'Kada otvorite paket sa vlaškom šubarom ili vunenim čarapama iz Jošanice, osetićete autentičan, umirujući miris čistog seoskog doma. To je dodir prirode koji savremenom čoveku vraća ravnotežu i mir.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Po čemu je homoljski med drugačiji od običnog livadskog meda?',
        answer: 'Homoljski med se sakuplja u ekološki potpuno čistoj zoni bez pesticida i veštačkog đubriva, sa preko 150 vrsta divljeg lekovitog bilja, što mu daje izuzetnu gustinu, visok nivo polenovih zrnaca i lekovitost.'
      },
      {
        question: 'Može li se posetiti Jošanica i atelje Savremeni Koreni?',
        answer: 'Dobrodošli ste u Homolje! Posetioci mogu uživati u prelepoj prirodi, posetiti obližnje banje i vrela, i lično videti kako Tanja Petrić stvara narodne nošnje i unikatne rukotvorine.'
      }
    ],
    conclusion: 'Homolje je riznica zdravlja, meda i vekovne tradicije. Brend Savremeni Koreni ponosno prenosi tu čistu energiju prirode u svaki svoj rad.'
  }
];
