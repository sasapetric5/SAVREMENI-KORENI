import { BlogPost } from '../types';
const carapeImg = '/src/assets/images/vunene_carape_vez_1789021876638.jpg';
const subaraImg = '/src/assets/images/srpska_subara_moderna_1789021862584.jpg';
const kosuljaImg = '/src/assets/images/vezena_kosulja_1789021895745.jpg';
const heroImg = '/src/assets/images/savremeni_hero_banner_1789021835867.jpg';
const opanciImg = '/src/assets/images/opanci_folklor_koza_1789407239776.jpg';
const jelekImg = '/src/assets/images/jelek_zlatovez_srma_1789407252546.jpg';
const tkanicaImg = '/src/assets/images/tkanica_pojas_etno_1789407263798.jpg';
const srmaZlatovezImg = '/src/assets/images/srpski_zlatovez_srma_1789105485118.jpg';
const runskaVunaImg = '/custom_products/1789326189203_1000020308.webp';

export const costumesAndHeritageArticles: BlogPost[] = [
  // 1. OPANCI ZA FOLKLOR I SRPSKI OPANCI (Google Keyword Planner: 1.200 - 1.900/mo)
  {
    id: 'opanci-za-folklor-srpski-izrada-koza',
    slug: 'opanci-za-folklor-srpski-opanci-izrada-i-vrste',
    title: 'Opanci za Folklor i Srpski Opanci: Sve o Vrstama, Izradi od Prirodne Kože, Oputi i Održavanju',
    subtitle: 'Vodič o tradicionalnoj obući srpskog i vlaškog naroda: razlika između prešnjaka, šilkanih i vlaških opanaka, kako odabrati veličinu za folklor i čuvati goveđu kožu.',
    excerpt: 'Opanci nisu samo muzejski eksponat već živa obuća koja svakodnevno izdržava dinamične skokove na scenama KUD-ova širom sveta. Saznajte kako prepoznati pravu goveđu oputu i sačuvati kožu od pucanja.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '2. mart 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1140,
    category: 'nosnja',
    categoryLabel: 'Narodna Nošnja & Obuća',
    targetKeywords: [
      'opanci za folklor',
      'srpski opanci',
      'vlaški opanci',
      'opanci sa kljunom',
      'šilkani opanci',
      'oputa za opanke',
      'kožni opanci cena',
      'narodna nošnja obuća'
    ],
    coverImage: opanciImg,
    featured: true,
    relatedProductId: 'sk-carape-01',
    sections: [
      {
        id: 'istorija-opanaka',
        heading: 'Istorijat i duša srpskog opanka: Od sirove kože do scenskog savršenstva',
        paragraphs: [
          'Srpski opanak predstavlja jedan od najprepoznatljivijih simbola nacionalnog identiteta. Vekovima je opanak bio osnovna obuća seljaka, ratnika, stočara i đaka na celom Balkanu. Nastao iz preke potrebe da se stopalo zaštiti od oštrog kamenja i planinskog rastinja, opanak je prošao put od najjednostavnijeg komada sirove neuštavljene svinjske ili goveđe kože (poznatog kao "prešnjak") do pravih remek-dela zanatstva sa filigranski pletenom oputom.',
          'U folkloru danas, opanak je temelj svakog koraka. Bez kvalitetnog opanka igrač ne može postići karakterističan sitan i lagan vez na sceni, niti bezbedno izvesti brze vlaške i šumadijske preplete. Pravi opanak mora da obuhvata stopalo poput druge kože – ne sme biti ni previše krut da stvara žuljeve, niti previše labav da spadne tokom energičnog kola.',
          'U Homolju i istočnoj Srbiji, vlaški i srpski opanci imaju svoje specifičnosti. Vlaški opanak često odlikuje ravniji kroj, dublje preplitanje opute i posebna mekoća kože koja omogućava dugotrajno kretanje po krečnjačkim vrletima Homoljskih planina i Beljanice.'
        ],
        quote: {
          text: 'Dobar opanak se ne kupuje po broju patika, već po merenju stopala u vunenoj čarapi. Tek kada vuna i koža legnu jedno uz drugo, plesač dobija krila.',
          caption: 'Tanja Petrić o obuvanju folklornih ansambala'
        }
      },
      {
        id: 'vrste-opanaka',
        heading: 'Vrste opanaka: Šilkani (sa vrhom), prešnjaci i vlaški opanci',
        paragraphs: [
          'U zavisnosti od regije i namene, u Srbiji razlikujemo nekoliko osnovnih tipova opanaka koje svaki ljubitelj nošnje treba da poznaje:',
          '1. Šilkani opanci (Šumadijski sa kljunom): Karakteriše ih savijen vrh na prednjem delu (šiljak ili kljun). Pleteni su od izuzetno tanke goveđe ili jagnjeće opute, često u kombinaciji svetle i tamnije nijanse kože. Ovi opanci su simbol svečane nošnje centralne Srbije i najčešći su izbor za scenske nastupe.',
          '2. Prešnjaci (Sirovari): Najstariji oblik obuće pravljen od neuštavljene sirove kože koja se savijala oko stopala i pričvršćivala kožnim kaiševima. Danas se koriste u arhaičnim folklornim koreografijama koje prikazuju običaje iz ranog 19. veka.',
          '3. Vlaški opanci istočne Srbije: Karakteriše ih plitak đon, gusta i elastična oputa i izuzetna prilagodljivost brzim i sitnim koracima tipičnim za homoljska kola. Za razliku od šumadijskog opanka, vlaški opanak retko ima predimenzioniran kljun jer bi on smetao pri specifičnom ukrštanju nogu u igri.',
          '4. Kapičari: Opanci koji umesto pletene opute preko risa imaju celovitu kožnu kapu. Češće su se nosili u planinskim krajevima tokom kišnih i hladnih jesenjih meseci.'
        ]
      },
      {
        id: 'izrada-i-oputa',
        heading: 'Kako se izrađuju opanci: Značaj goveđe kože i ručne opute',
        paragraphs: [
          'Izrada tradicionalnog opanka zahteva izuzetno majstorsko umeće. Đon se seče od najdebljeg dela goveđeg boksa (najčešće đonska koža debljine 3 do 4 mm), koja se prethodno potapa u vodu kako bi postala podatna za oblikovanje na drvenom kalupu.',
          'Oputa predstavlja dušu opanka. To su dugačke, tanko i precizno sečene trake meke teleće ili jagnjeće kože. Opančar iglom provlači oputu kroz sitne otvore na rubu đona, stvarajući gustu zaštitnu mrežu preko risa i prstiju. Broj prepleta opute svedoči o majstorstvu: što je oputa tanja i gušće prepletena, opanak je elegantniji, lakši i skuplji.',
          'Kaiš za vezivanje oko članka (remenik) mora biti izrađen od elastične kože koja se ne tegli previše pod znojem. Pravilno zategnut remenik obezbeđuje zglob i sprečava povrede igrača pri naglim promenama ritma.'
        ]
      },
      {
        id: 'odrzavanje-opanaka',
        heading: 'Pravilno održavanje i čuvanje: Da koža nikada ne ispuca',
        paragraphs: [
          'Koža je prirodan materijal koji diše, ali i gubi svoja prirodna ulja pod uticajem prašine, znoja i suvog vazduha. Evo zlatnih pravila za dugovečnost vaših opanaka:',
          'Nikada ih ne sušite na radijatoru: Nakon napornog nastupa ili probe, opanci su vlažni od znoja. Ostavite ih na sobnoj temperaturi, napunjene novinskom hartijom koja će izvući vlagu i sačuvati formu đona.',
          'Mazanje prirodnim mastima: Povremeno premažite opanke namenskim balzamom za kožu na bazi pčelinjeg voska ili ricinusovim uljem. To sprečava da oputa postane krhka i da pukne pod naprezanjem.',
          'Čuvanje u platnenoj vrećici: Nemojte ih držati u plastičnim kesama u kojima se stvara kondenzacija. Koristite pamučne cegere koji omogućavaju koži da diše.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Kako se bira tačna veličina opanaka za folklor?',
        answer: 'Opanak se uvek proba sa debljom vunenom ili pamučnom folklornom čarapom. Prsti treba da dodiruju prednji rub opute, ali bez savijanja. Kako se koža tokom nekoliko proba blago rasteže i prilagođava anatomiji stopala, opanak ne sme biti prevelik pri kupovini.'
      },
      {
        question: 'Šta raditi ako oputa na opanku pukne?',
        answer: 'Puknuta oputa se može sanirati kod iskusnog opančara ili krznara uplitanjem nove kožne trake. Nemojte koristiti sintetički kanap jer on može iseći susednu kožu pod pritiskom.'
      },
      {
        question: 'Koliko dugo traju kvalitetni kožni opanci?',
        answer: 'Uz redovno podmazivanje i pravilno sušenje, opanci od prave goveđe kože mogu izdržati između 3 i 7 godina intenzivnog igranja u KUD-u, dok za povremene svečanosti traju i decenijama.'
      }
    ],
    conclusion: 'Srpski opanak spaja zemlju i ritam naših predaka. Kada obujete pravi ručno pleteni opanak sa vunenom čarapom iz Jošanice, osetićete stabilnost i ponos koji traju generacijama.'
  },

  // 2. JELEK ZA FOLKLOR I NARODNI JELEK (Google Keyword Planner: 800 - 1.400/mo)
  {
    id: 'jelek-za-folklor-srpski-zlatovez-kroj',
    slug: 'jelek-za-folklor-narodni-srpski-jelek-zlatovez-kroj',
    title: 'Jelek za Folklor i Tradicionalni Srpski Jelek: Zlatovez, Pliš, Vrste Prsluka i Krojevi Kroz Regije',
    subtitle: 'Kompletan vodič o najraskošnijem delu srpske narodne nošnje: ženski i muški jeleci, vez zlatnom srmom, izbor čoje i pliša i čuvanje autentičnih vezova.',
    excerpt: 'Jelek je kruna narodne nošnje – prsluk na kome se sretala umetnost veza, status porodice i regionalna pripadnost. Otkrijte tajne izrade šumadijskog, vlaškog i kosovskog jeleka.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '4. mart 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1180,
    category: 'nosnja',
    categoryLabel: 'Narodna Nošnja & Zlatovez',
    targetKeywords: [
      'jelek za folklor',
      'narodni jelek',
      'srpski jelek',
      'plišani jelek sa srmom',
      'ženski jelek za nošnju',
      'muški jelek sukno',
      'zlatovez na jeleku'
    ],
    coverImage: jelekImg,
    featured: true,
    relatedProductId: 'sk-kosulja-01',
    sections: [
      {
        id: 'znacaj-jeleka',
        heading: 'Šta je jelek i zašto nosi status najotmenijeg dela narodne nošnje?',
        paragraphs: [
          'Jelek (od turske reči yelek – prsluk) jeste tradicionalni gornji odevni predmet bez rukava koji se nosio preko košulje u muškoj i ženskoj narodnoj nošnji na čitavom Balkanskom poluostrvu. Iako je naziv orijentalnog porekla, srpski jelek je kroz vekove poprimio potpuno autohtone stilske i ornamentalne odlike, postavši pravo vizuelno obeležje dostojanstva, bogatstva i estetskog duha srpskog sela i varoši.',
          'Ženski jelek je bio centralni komad devojačke spreme. Krojen tako da naglasi struk i poprsje, ukrašavan je stotinama metara zlatne ili srebrne srme, gajtanima, šljokicama i plišanim trakama. Devojka u bogato vezenom jeleku privlačila je sve poglede na seoskim saborima i slavama, a vrednost jeleka se često merila u dukatima.',
          'Muški jelek je imao svedeniju, ali izuzetno moćnu liniju. Krojen od tamnog valjanog sukna ili čoje (tamnoplave, crne ili tamnocrvene boje), muški jelek je štitio grudi od hladnoće, dok su ga crni gajtani i suptilni vez činili izuzetno stasitim i ponosnim.'
        ],
        quote: {
          text: 'Svaki motiv na jeleku ima svoj smisao: lozice označavaju plodnost, zvezdice svetlost duha, a gustina srme svedočila je o neumornim rukama vezilje.',
          caption: 'Tanja Petrić o simbolici narodnih ornamenata'
        }
      },
      {
        id: 'materijali-za-jelek',
        heading: 'Materijali: Duboki pliš, vuna, čoja i metalna srma',
        paragraphs: [
          'Za izradu autentičnog jeleka koriste se isključivo vrhunski tekstilni materijali:',
          '1. Pliš (somot): Najčešće se koristi za svečane ženske jeleke. Boje variraju od kraljevski bordo i crvene, preko tamnoljubičaste, do teške teget i crne. Pliš daje duboku senku na kojoj zlatna srma dolazi do maksimalnog izražaja.',
          '2. Čoja i valjano sukno: Prirodna zbijena vunena tkanina koja pruža čvrstinu i termoizolaciju. Idealna je za muške jeleke i planinske prsluke (zobune).',
          '3. Zlatna i srebrna srma: Metalne niti obmotane oko svilenog jezgra. Kvalitetna srma ne oksidira, ne tamni na vlagi i decenijama zadržava blistav sjaj.',
          '4. Pamučna postava: Unutrašnjost svakog jeleka mora biti postavljena mekim, prirodnim pamučnim platnom kako bi prianjala uz košulju i upijala telesnu toplotu bez oštećenja pliša.'
        ]
      },
      {
        id: 'regionalne-razlike',
        heading: 'Regionalne razlike: Šumadija, Homolje, Kosovo i Vojvodina',
        paragraphs: [
          'Svaki kraj Srbije ima svoj prepoznatljiv rukopis na jeleku:',
          'Šumadijski jelek: Poznat po kratkom kroju do ispod grudi ili do struka, dubokom izrezu i gustim floralnim ornamentima zlatoveza. Često se završava sitnim ukrasnim zubcima na donjem rubu.',
          'Vlaški i homoljski jelek: U istočnoj Srbiji jeleci su često izrađivani od tamnog sukna ili crnog pliša, sa upečatljivim aplikacijama crvenih i zlatnih vunenih traka, diskretnim srmenim vezom i karakterističnim kopčanjem metalnim kopčama (paftama).',
          'Kosovski jelek: Izuzetno raskošan, dugog kroja koji prelazi kukove, potpuno prekriven srmenim pletenicama i gajtanima u tehnici terzijskog zanata.',
          'Vojvođanski prsluci (pršnjaci): Često izrađivani od finog jagnjećeg krzna sa kožnim vezom u boji, sa bogatim motivima cveća i ogledalcima.'
        ]
      },
      {
        id: 'cuvanje-jeleka',
        heading: 'Kako čuvati jelek od moljaca i oštećenja srme',
        paragraphs: [
          'Jelek se nikada ne pere u veš mašini! Zlatovez i pliš zahtevaju hemijsko čišćenje kod proverenih stručnjaka za nošnje ili provetravanje na suvom vazduhu u hladovini.',
          'Čuva se položen na ravnoj površini ili okačen na tapaciranom širokom ofingeru unutar pamučne navlake za odela. Obavezno dodajte vrećicu lavande ili kedrovog drveta kako biste zaštitili vunenu osnovu od moljaca.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Da li se jelek može nositi uz savremenu garderobu?',
        answer: 'Apsolutno! Savremeni dizajneri i ljubitelji etno stila sve češće kombinuju ručno vezeni jelek sa belom lanenom košuljom, modernim farmerkama ili elegantnim crnim pantalonama, stvarajući upečatljiv statement komad.'
      },
      {
        question: 'Koliko vremena je potrebno za ručni zlatovez na jednom jeleku?',
        answer: 'Za kompletan ručni vez zlatnom srmom na plišanom ženskom jeleku potrebno je između 40 i 80 radnih sati pedantnog i strpljivog rada.'
      },
      {
        question: 'Kako prepoznati pravu srmu u odnosu na jeftin lureks?',
        answer: 'Prava srma ima metalnu težinu, hladna je na dodir i ima mekan svilenkasti odsjaj, dok je jeftini sintetički lureks lagan, plastičan i ima neprirodno oštar sjaj koji bledi na suncu.'
      }
    ],
    conclusion: 'Jelek je ponos srpske narodne baštine. U ateljeu Savremeni Koreni čuvamo tehnike zlatoveza i krojenja kako bi svaki novi jelek nosio dostojanstvo naših predaka.'
  },

  // 3. TKANICE I TKANI POJASEVI (Google Keyword Planner: 400 - 800/mo)
  {
    id: 'tkanice-i-tkani-pojasevi-razboj-vezivanje',
    slug: 'tkanice-tkani-pojasevi-narodna-nosnja-razboj',
    title: 'Tkanice i Tkani Pojasevi za Narodnu Nošnju: Tehnika Tkanja na Razboju, Šare, Dimenzije i Pravilno Vezivanje',
    subtitle: 'Vodič kroz geometriju i magiju vunenog pojasa: razlika između muških i ženskih tkanica, dužina, gustina potke i kako se tkanica pravilno obmotava i vezuje.',
    excerpt: 'Tkanica nije samo držač suknje i čakšira, već magijska zaštita stomaka i kičme i estetski most koji povezuje gornji i donji deo narodne nošnje. Saznajte kako nastaje na drvenom razboju.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '5. mart 2026.',
    readingTime: '7 min čitanja',
    wordCount: 1060,
    category: 'nosnja',
    categoryLabel: 'Tkanje & Nošnja',
    targetKeywords: [
      'tkanice pojasevi',
      'tkani pojas za nošnju',
      'tkanica cena',
      'kako se vezuje tkanica',
      'muška i ženska tkanica',
      'tkani pojas od vune',
      'šare na tkanici'
    ],
    coverImage: tkanicaImg,
    featured: false,
    relatedProductId: 'sk-carape-01',
    sections: [
      {
        id: 'znacaj-tkanice',
        heading: 'Simbolika i uloga tkanice u tradicionalnom odevanju',
        paragraphs: [
          'Tkanica (tkani pojas) jeste dugačak, relativno uzak pojas istkan od domaće pređene vune na ručnom razboju. U narodnom verovanju pojas je imao snažno apotropejsko (zaštitno) značenje: verovalo se da opasivanjem čovek zatvara krug oko svog tela i štiti se od zlih uticaja i bolesti stomaka i krsta.',
          'Sa praktične strane, pojas je bio neophodan potporni element. Teške suknene čakšire kod muškaraca i teške vunene pregače i suknje kod žena nisu imale elastične lastiše; sav teret je nosila čvrsto zategnuta tkanica. Štaviše, tkanica je grejala krsta tokom napornih poljskih radova i pružala ergonomsku podršku kičmi.',
          'Estetski, tkanica je eksplozija boja. Pruge u crvenoj, beloj, plavoj, zelenoj i žutoj boji simbolizovale su radost, plodnost njiva i zdravlje porodice.'
        ]
      },
      {
        id: 'muska-vs-zenska-tkanica',
        heading: 'Razlika između muške i ženske tkanice: Dužina, širina i boje',
        paragraphs: [
          'Iako se na prvi pogled čine sličnim, muški i ženski tkani pojasevi imaju stroga pravila:',
          'Muška tkanica: Šira je (između 10 i 15 cm) i kraća (oko 2 do 2.5 metra). Obično ima mirnije tonove sa dominacijom teget, crne, tamnocrvene i bele boje. Obmotava se nekoliko puta oko struka preko košulje, a krajevi se podvijaju ispod pojasa tako da ne vise.',
          'Ženska tkanica: Uža je (obično 5 do 8 cm), ali znatno duža (često od 3 do čak 4.5 metara). Žene su pojas obmotavale više puta čvrsto oko struka, ističući vitkost stasa. Krajevi ženske tkanice se često završavaju bogatim resama (kićankama) koje se ostavljaju da ležerno padaju niz bok ili preko pregače.'
        ]
      },
      {
        id: 'tkanje-na-razboju',
        heading: 'Tehnika tkanja: Osnova, potka i geometrijske šare',
        paragraphs: [
          'Tkanica se izrađuje tehnikom prebornog tkanja na uskom razboju. Osnova mora biti od izuzetno jakog, višestruko uvrtenog pamučnog ili vunenog konca, jer trpi ogroman pritisak zatezanja brda.',
          'Potka se polaže od fine, meke bojene vune. Zbijanjem niti pomoću drvenog brda postiže se izuzetna gustina materijala – prava tkanica je toliko gusta da je gotovo neprobojna za vetar i vlagu.',
          'Šare su najčešće podužne ili poprečne pruge, geometrijski rombovi, cik-cak linije ("zmijolike šare") i motivi kola. U Homolju se često sreću tkanice sa naglašenim kontrastom bordo, bele i prirodno sive runske vune.'
        ]
      },
      {
        id: 'kako-se-vezuje-tkanica',
        heading: 'Kako se pravilno vezuje tkanica: Korak po korak',
        paragraphs: [
          '1. Počnite od prednjeg ili bočnog dela struka, ostavljajući kratak početni kraj.',
          '2. Obmotavajte pojas ravnomerno i čvrsto oko struka, pazeći da se svaki novi krug tačno preklapa ili blago stepenasto slaže preko prethodnog.',
          '3. Zategnutost treba da pruža čvrst oslonac kičmi, ali bez otežavanja disanja.',
          '4. Kada dođete do kraja, preostali deo provucite odozdo nagore ispod svih namotaja i zataknite ga čvrsto, ili zavežite u tradicionalni plitki čvor na boku ukoliko tkanica ima ukrasne rese.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Da li se tkani pojas može prati u vodi?',
        answer: 'Pere se isključivo ručno u mlakoj vodi sa blagim šamponom za vunu, bez grubog uvrtanja i ceđenja. Suši se položen na peškiru u vodoravnom položaju kako se ne bi istegao.'
      },
      {
        question: 'Mogu li se tkanice koristiti kao moderni modni kaiš?',
        answer: 'Da! Tkanice su postale izuzetno popularne kao unikatni kaiševi uz jednobojne lanene haljine, bele tunike i duge kapute, dajući savremenom izgledu prefinjen etno akcenat.'
      }
    ],
    conclusion: 'Tkanica spaja snagu vune i lepotu geometrije. Svaki metar istkan na razboju nosi toplinu i postojanost tradicije.'
  },

  // 4. ZLATOVEZ TEHNIKA (Google Keyword Planner: 350 - 700/mo)
  {
    id: 'zlatovez-tehnika-srma-plis-svila',
    slug: 'zlatovez-tehnika-vezenja-srma-plis-svila-istorija',
    title: 'Zlatovez Kroz Istoriju i Zanat: Carska Tehnika Vezenja Zlatnom i Srebrnom Srmom na Plišu i Čoji',
    subtitle: 'Sve o najzahtevnijoj i najcenjenijoj tehnici veza: istorijat od srednjovekovnih vladarskih odora do narodnih jeleka, priprema kartonske podloge i tehnika polaganja niti.',
    excerpt: 'Zlatovez je vrhunac tekstilne umetnosti gde se zlato pretvara u nit. Otkrijte kako majstori kroz srmu i podlaganje postižu trodimenzionalni reljef koji sija na svetlosti vekovima.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '6. mart 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1120,
    category: 'vez',
    categoryLabel: 'Zlatovez & Tehnika',
    targetKeywords: [
      'zlatovez tehnika',
      'zlatovez na plišu',
      'srma za vezenje',
      'manastirski zlatovez',
      'zlatovez bodovi',
      'kako se radi zlatovez',
      'svečana narodna nošnja'
    ],
    coverImage: srmaZlatovezImg,
    featured: false,
    relatedProductId: 'sk-kosulja-01',
    sections: [
      {
        id: 'istorija-zlatoveza',
        heading: 'Od nemanjićkih dvorova do seoskih svečanosti',
        paragraphs: [
          'Zlatovez zauzima posebno mesto u srpskoj kulturnoj baštini. U srednjovekovnoj Srbiji, na dvorovima Nemanjića, Hrebeljanovića i Brankovića, zlatovez je bio umetnost kojom su se bavile vladarke i plemkinje, kao i monasi u carskim lavrama. Čuvena Pohvala knezu Lazaru koju je zlatnom žicom na svili izvezla monahinja Jefimija 1402. godine predstavlja remek-delo ne samo srpske književnosti, već i svetskog zlatoveza.',
          'Tokom vekova, ova elitna vladarska veština prelazi u gradsku i seosku kulturu. U 19. veku, gradske gospođe u Beogradu, Kragujevcu i Novom Sadu nosile su libade i jeleke optočene zlatovezom, dok su seoske neveste čuvale zlatom vezene prsluke kao najveće porodično blago koje se nasleđivalo sa majke na ćerku.'
        ],
        quote: {
          text: 'Zlatovez ne trpi žurbu. Zlatna srma se ne probada kroz platno kao običan konac, već se polaže po površini i pričvršćuje nevidljivim ubodima svile.',
          caption: 'Tanja Petrić o strpljenju potrebnom za rad sa srmom'
        }
      },
      {
        id: 'tehnika-polaganja-i-podlaganja',
        heading: 'Tajne zanata: Tehnika polaganja na kartonu (visoki reljef)',
        paragraphs: [
          'Zlatovez se suštinski razlikuje od običnog veza muline koncem. Pošto je metalna srma previše kruta i skupa da bi se provlačila na naličje tkanine, majstori koriste specifične tehnike:',
          '1. Zlatovez "na podlogu" (Reljefni zlatovez): Da bi vez bio trodimenzionalan, motiv se prvo precizno iseca od debelog kartona, kože ili se podlaže debelim pamučnim nitima. Zlatna srma se zatim polaže preko tog reljefa s lica, a sitnim ubodima tankog svilenog konca u boji srme fiksira uz same ivice motiva. Rezultat je skulpturalni sjaj koji hvata svetlost iz svakog ugla.',
          '2. Zlatovez "kroz iglu" (Ravan zlatovez): Koristi se finija i mekša srma koja se može provlačiti kroz ređe tkanine, stvarajući ravne i nežne cvetne motive.',
          '3. Zlatovez sa šljokicama (trepetljikama): Između srmenih linija uvezuju se sitne metalne pločice (šljokice) koje pri pokretu tela trepere i proizvode suptilan zvuk i odsjaj.'
        ]
      },
      {
        id: 'alati-za-zlatovez',
        heading: 'Alati i materijali: Đerđef, vosak i svileni konac',
        paragraphs: [
          'Za rad je neophodan čvrst drveni đerđef na stalku kako bi obe ruke vezilje bile slobodne: jedna ruka vodi zlatnu srmu, dok druga sa naličja i lica vodi iglu sa svilenim pričvrsnim koncem.',
          'Tkanina (pliš ili čoja) mora biti savršeno zategnuta poput doboša. Svileni konac se često provlači kroz prirodni pčelinji vosak kako se ne bi mrsio i kako bi dobio dodatnu čvrstinu.',
          'Majstorski rad sa srmom zahteva mirnu ruku, odlično osvetljenje i duboku koncentraciju. Svaki ubod mora biti simetričan, jer se na sjajnoj metalnoj niti svaka greška odmah primećuje.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Da li zlatovez vremenom potamni?',
        answer: 'Prava visokokvalitetna srma sa procentom pozlate ili srebra sporije oksidira, ali nakon više decenija može dobiti plemenitu patinu. Čuvanje u suvim uslovima, bez duvanskog dima i vlage, sprečava tamnjenje.'
      },
      {
        question: 'Kako se čisti garderoba sa zlatovezom?',
        answer: 'Predmeti sa zlatovezom se nikada ne peru u vodi. Čiste se nežnim otprašivanjem mekom slikarskom četkicom i isključivo specijalizovanim suvim hemijskim čišćenjem.'
      }
    ],
    conclusion: 'Zlatovez je svedočanstvo večnog traganja za lepotom i svetlošću. U svakom srmenom motivu odjekuje sjaj nemanjićke istorije.'
  },

  // 5. PRIRODNA RUNSKA VUNA ZA PLETENJE (Google Keyword Planner: 700 - 1.300/mo)
  {
    id: 'prirodna-runska-vuna-za-pletenje-svojstva',
    slug: 'prirodna-runska-vuna-za-pletenje-lekovitost-lanolin',
    title: 'Prirodna Runska Vuna za Pletenje: Lekovita Svojstva Lanolina, Debljine Pređe, Predenje i Održavanje',
    subtitle: 'Zašto je prava domaća vuna nezamenljiva: prirodna termoregulacija, uloga lanolina za zglobove i kožu, predenje na preslici i nega bez skupljanja.',
    excerpt: 'U svetu punom plastičnog akrila, prirodna runska vuna sa Homolja predstavlja lekoviti eliksir prirode. Otkrijte zašto prirodna vuna greje zimi a hladi leti i kako prepoznati 100% čisto vlakno.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor narodne nošnje i tradicionalnih zanata, Jošanica',
    publishDate: '7. mart 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1100,
    category: 'vuna',
    categoryLabel: 'Prirodna Vuna & Zdravlje',
    targetKeywords: [
      'prirodna vuna za pletenje',
      'runska vuna',
      'domaća vuna za čarape',
      'pranje sirove vune',
      'lekovita svojstva vune lanolin',
      'predenje vune na vretenu i preslici'
    ],
    coverImage: runskaVunaImg,
    featured: true,
    relatedProductId: 'sk-carape-01',
    sections: [
      {
        id: 'sta-je-runska-vuna',
        heading: 'Šta je runska vuna i kako nastaje u planinskim selima Homolja?',
        paragraphs: [
          'Runska vuna je vuna dobijena šišanjem živih, zdravih ovaca u proleće, kada se celo runo skida u jednom komadu. U selu Jošanica i na padinama Homoljskih planina, ovce se hrane čistom planinskom travom i lekovitim biljem na nadmorskim visinama preko 600 metara. Njihova vuna je gusta, elastična i bogata prirodnim voskom.',
          'Nakon šišanja, vuna prolazi kroz dugotrajan proces: ručno prebiranje (odvajanje nečistoća), pranje u planinskoj vodi bez agresivnih hemikalija kako bi se sačuvao prirodni lanolin, sušenje na vetru i suncu, a zatim grebenanje (češljanje na grebenima).',
          'Tako pripremljena vuna prelazi na preslicu i vreteno ili kućni kolovrat. Ručno predena pređa ima predivnu organsku strukturu – nikada nije matematički ravna kao industrijski konac, već poseduje mikroskopske vazdušne komore koje pružaju vrhunsku toplotnu izolaciju.'
        ],
        quote: {
          text: 'Vuna nije mrtva materija; ona pamti sunce sa homoljskih livada i toplinu tela životinje. Kada obujete čarape od runske vune, vi u dom unosite zdravlje prirode.',
          caption: 'Tanja Petrić o lekovitoj snazi domaće vune'
        }
      },
      {
        id: 'lekovita-svojstva-lanolina',
        heading: 'Lekovita svojstva vune: Lanolin, bolovi u zglobovima i cirkulacija',
        paragraphs: [
          'Naši stari nisu slučajno govorili: "Čuvaj noge na toplom, a glavu na hladnom". Vuna poseduje dokazana terapeutska svojstva:',
          '1. Prirodni lanolin: Lanolin je vosak koji luči koža ovce i koji oblaže svaku vlas vune. On deluje umirujuće na ljudsku kožu, ima antibakterijska svojstva i blagotvorno deluje kod reumatskih bolova, artritisa i slabe periferne cirkulacije.',
          '2. Mikromasaža kapilara: Fina elastična vlakna prave vune stvaraju neosetnu mikromasažu kože stopala i nogu, čime se pospešuje cirkulacija krvi i sprečava osećaj "ledenih nogu".',
          '3. Termoregulacija i upijanje vlage: Za razliku od sintetičkog poliestera i akrila u kojima se noga znoji i hladi, vuna može upiti do 33% sopstvene težine u vlazi a da na dodir ostane potpuno suva! Vlaga se postepeno isparava, održavajući idealnu mikroklimu.'
        ]
      },
      {
        id: 'kako-odrzavati-vunu',
        heading: 'Kako se pere i čuva prava runska vuna: Zaboravite na vrelu vodu',
        paragraphs: [
          'Vunena vlakna na svojoj površini imaju sitne ljuspice. Pod uticajem vrele vode i naglog trljanja, te ljuspice se zaključavaju jedna za drugu – i vuna se ućeba i skupi (filcuje).',
          'Pravila za bezbedno pranje:',
          '• Voda mora biti mlaka (do 30°C).',
          '• Koristite blagi tečni deterdžent za vunu ili običan dečiji šampon sa par kapi maslinovog ulja.',
          '• Ne trljajte i ne cedite uvrtanjem; samo nežno potapajte i istisnite vodu u peškir.',
          '• Sušite uvek položeno na suvom peškiru, nikada okačeno štipaljkama na žicu jer bi težina vlage izobličila odevni predmet.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Zašto prava domaća vuna ponekad "bocka"?',
        answer: 'Blago bockanje potiče od debljih zaštitnih vlakana runske vune koja podstiču cirkulaciju. Ukoliko imate osetljivu kožu, potopite oprani vuneni predmet u vodu sa nekoliko kapi prirodnog balzama za kosu ili glicerina – to će omekšati vlakna bez gubitka toplote.'
      },
      {
        question: 'Kako razlikovati pravu vunu od akrila bez laboratorije?',
        answer: 'Odsecite par centimetara niti i zapalite je: prava vuna gori sporo, miriše na spaljenu kosu/perje i ostavlja drobljiv tamni pepeo. Akril se brzo topi u tvrdu plastičnu kuglicu sa hemijskim mirisom.'
      }
    ],
    conclusion: 'Čista runska vuna je dar prirode koji čuva zdravlje porodice. U ateljeu Savremeni Koreni svako klupko nosi miris homoljskih pašnjaka.'
  }
];
