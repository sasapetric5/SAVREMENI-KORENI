import { BlogPost } from '../types';

const vlaskaSubaraImg = '/images/vlaska_bela_subara_1789032431671.jpg';
const vlaskaIzradaImg = '/images/vlaska_subara_izrada_1789032512168.jpg';
const vezeneCarapeImg = '/images/vezene_carape_folklor_1789032450227.jpg';
const homoljskaNosnjaImg = '/images/homoljska_narodna_nosnja_1789032467664.jpg';

export const homoljeAndTraditionArticles: BlogPost[] = [
  // 1. VLAŠKA ŠUBARA - BELA ŠUBARA
  {
    id: 'vlaska-subara-bela-subara-vodic',
    slug: 'vlaska-subara-bela-subara-izrada-heklanje-homolje',
    title: 'Vlaška Šubara (Bela Šubara): Sve o Izradi, Heklanoj Mrežastoj Osnovi, Runskoj Vuni i Vlaškoj Tradiciji Homolja',
    subtitle: 'Etnografski i zanatski vodič kroz čuvenu belu vlašku šubaru: kako se hekla mrežasta kalota, uvlače i čvoruju pramenovi prirodne runske vune heklicom, tajne vune iz Jošanice i razlika u odnosu na crnu šubaru.',
    excerpt: 'Bela vlaška šubara je najprepoznatljiviji krunski simbol muške narodne nošnje Homolja i istočne Srbije. Otkrijte autentičnu tehniku heklanja i čvorovanja prirodne runske vune na mrežastu osnovu, kao i pravila nošenja i nege.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor tradicionalnih rukotvorina i vlaške nošnje, Savremeni Koreni (Jošanica)',
    publishDate: '1. mart 2026.',
    readingTime: '10 min čitanja',
    wordCount: 1280,
    category: 'subare',
    categoryLabel: 'Tradicionalne Šubare & Homolje',
    targetKeywords: [
      'vlaška šubara',
      'bela šubara',
      'vlaške šubare',
      'šubara od prirodne vune',
      'heklana šubara',
      'narodna nošnja homolje',
      'bela šubara vlaška',
      'šubara za folklor',
      'izrada šubare heklanjem',
      'prirodna runska vuna',
      'homolje tradicija',
      'kako se pere bela šubara'
    ],
    coverImage: vlaskaSubaraImg,
    featured: true,
    relatedProductId: 'sk-subara-01',
    sections: [
      {
        id: 'simbol-homolja-i-tradicija',
        heading: 'Simbol ponosa i vetrovitih planina: Šta je autentična bela vlaška šubara?',
        paragraphs: [
          'Kada zakoračite u Homoljski kraj, među valovite krečnjačke masive, bistre izvore Mlave i stoletna bukova prostranstva Jošanice i Žagubice, jedan odevni predmet odmah privlači pogled svojom monumentalnošću i nestvarnom belinom – to je tradicionalna bela vlaška šubara. Dok se u većem delu centralne Srbije i Šumadije nosila pretežno crna ili mrka šubara cilindričnog ili zaravnjenog oblika, u vlaškim selima Homolja i Timočke Krajine bela šubara konusnog (kupastog) vrha oduvek je predstavljala vrhunac muškog ponosa, mladalačke snage i svečanog statusa.',
          'Bela boja u tradicionalnoj vlaškoj kulturi Homolja ima duboku zaštitnu i solarnu simboliku. Ona je simbol čistote, svetlosti i pastirskog dostojanstva. Mladići su belu šubaru ponosno stavljali na glavu o saborima, seoskim slavama (zavetinama), svadbama i svetkovinama, blago nakrivljenu na stranu ili zabačenu unatrag, tako da lice ostane otvoreno a gusta kruna od bele vune dominira stasom.',
          'Danas, u radionici Savremeni Koreni u selu Jošanica, podno Homolja, sa posebnom strašću čuvamo ovu drevnu tehniku izrade. Kroz svaki primerak bele šubare koji stvorimo, nastojimo da sačuvamo živu nit naših predaka i omogućimo kulturno-umetničkim društvima i ljubiteljima etno stila da poseduju stoprocentno autentičan komad koji se ne može naći u fabričkoj masovnoj proizvodnji.'
        ],
        quote: {
          text: 'Prava bela vlaška šubara nije samo kapa od vune – ona je planinska kruna. Kada je stavite na glavu, vi nosite dah Homoljskih planina i vekovnu mudrost naših baka koje su pramen po pramen utkivale toplinu u svaku petlju.',
          caption: 'Tanja Petrić, osnivač ateljea Savremeni Koreni'
        }
      },
      {
        id: 'jedinstvena-tehnika-izrade-heklanje-i-cvorovanje',
        heading: 'Kako se zapravo pravi bela vlaška šubara? Zanat heklanja mrežaste osnove i uvezivanja pramenova',
        paragraphs: [
          'Jedna od najčešćih zabluda jeste pretpostavka da je bela šubara napravljena od štavljenog jagnjećeg ili ovčijeg krzna sa kožnom podlogom, poput klasičnih krznarskih kapa. Istina je daleko zanimljivija i zahteva neuporedivo više ručnog umeća: autentična homoljska bela šubara nastaje kombinacijom heklanja i ručnog čvorovanja (uplitanja) vunenih niti!',
          'Proces izrade započinje kreiranjem mrežaste kalote (osnove). Majstorica koristi čvršću, gusto upredenu domaću vunenu ili pamučnu pređu i metalnu heklicu kako bi u krug heklala anatomsku mrežu u obliku kupe. Ova mrežica ima pravilne kvadratne ili romboidne otvore koji služe kao potka. Ona pruža šubari prozračnost, omogućava koži glave da diše i obezbeđuje elastičnost tako da kapa savršeno prianja uz obim glave bez stezanja.',
          'Nakon što je mrežasta baza završena, sledi najzahtevniji deo – uplitanje vunenih čupaka (resa). Majstor uzima pramenove najfinije neupredene ili blago češljane runske vune određene dužine (obično 7 do 12 centimetara). Pomoću heklice, svaki pramen se provlači kroz petlju mrežaste potke i vezuje čvrstim čvorom. Postupak se ponavlja stotinama puta, red po red, od vrha kupe ka obodu, sve dok se ne dobije gusta, bujna i ujednačena kruna bele vune koja u potpunosti prekriva unutrašnju mrežicu.'
        ],
        bulletPoints: [
          'Heklana mrežasta osnova: Sprečava znojenje glave jer vazduh slobodno cirkuliše između uvezanih pramenova vune.',
          'Ručno uvezivanje heklicom: Svaki pramen je pojedinačno osiguran, što garantuje da se vuna neće linjati ili ispadati tokom žustrog igranja na sceni.',
          'Konusni homoljski vrh: Karakterističan špicasti oblik koji daje visinu i impozantnu siluetu igraču u narodnoj nošnji.',
          'Težina i fleksibilnost: Zbog odsustva teške štavljene kože, heklana šubara je izuzetno lagana na glavi i prijatna za višesatno nošenje.'
        ],
        image: vlaskaIzradaImg,
        imageCaption: 'Proces uvezivanja pramenova prirodne runske vune heklicom kroz heklanu mrežastu potku u ateljeu Savremeni Koreni (Jošanica)'
      },
      {
        id: 'runska-vuna-homoljske-pramenke',
        heading: 'Prirodna runska vuna iz Homolja: Tajna topline, elastičnosti i lanolina',
        paragraphs: [
          'Materijal od koga se šubara pravi presudan je za njen izgled i dugovečnost. U ateljeu Savremeni Koreni koristimo isključivo domaću runska vunu autohtone ovce pramenke, koja se vekovima uzgaja na homoljskim pašnjacima bogatim lekovitim biljem.',
          'Ova vuna poseduje specifičnu elastičnost, prirodnu kovrdžavost i optimalan sadržaj lanolina – prirodnog voska koji odbija kapljice vode i vlagu. Zbog toga se bela vlaška šubara ne lepi pod kišom ili snegom, već kapi prirodno skliznu sa površinskih vlasi.',
          'Pre uvezivanja, sirova vuna prolazi kroz temeljno ručno pranje u čistoj planinskoj vodi bez agresivnih industrijskih kiselina i izbeljivača, kako bi zadržala svoju prirodnu mlečno-belu do blago kremastu boju. Zatim se suši na blagom vetru i pažljivo raščešljava drvenim grebenima (grebenašima) kako bi se dobili paperjasti pramenovi spremni za heklicu.'
        ]
      },
      {
        id: 'bela-vs-crna-subara-folklor-i-obicaji',
        heading: 'Bela naspram crne šubare: Ko, kada i kako nosi belu vlašku šubaru?',
        paragraphs: [
          'U etnografiji Srbije postoji jasna diferencijacija u nošenju šubara. Dok je crna šubara bila standardni deo svakodnevne i svečane odeće širom Šumadije, Morave i zapadne Srbije, bela šubara je bila prepoznatljivo obeležje vlaškog i pastirskog stanovništva istočne Srbije, naročito mlađih neoženjenih momaka.',
          'U vlaškim igrama Homolja, tempo kola je brz, eksplozivan i prepun sinkopiranih koraka, pocupkivanja i sitnog veza nogama. Bela šubara pri svakom pokretu tela stvara upečatljiv vizuelni kontrast u odnosu na tamniji sukneni prsluk i tkani pojas. Njena bela vuna talasa se u ritmu frule i drombulje, privlačeći poglede publike.',
          'Danas je bela vlaška šubara obavezan rekvizit za kulturno-umetnička društva koja na svom repertoaru imaju "Igre iz Homolja", "Vlaške igre", "Igre iz Crnorečja" i običaje poput kraljica ili rusalja. Pored folkloraca, sve češće je naručuju i naši ljudi iz dijaspore kao ekskluzivni suvenir i porodičnu dragocenost koja krasi dom.'
        ]
      },
      {
        id: 'odrzavanje-i-cuvanje-bele-subare',
        heading: 'Pravilno održavanje, pranje i čuvanje: Kako da vaša bela šubara ostane snežnobela decenijama?',
        paragraphs: [
          'S obzirom na to da je bela šubara izrađena od 100% prirodne vune na heklanoj bazi, nega zahteva malo pažnje, ali je jednostavna kada znate osnovna pravila:',
          '1. Provetravanje nakon nastupa: Posle svakog nastupa ili nošenja, šubaru nikada nemojte odmah zatvarati u kesu ili ormar. Ostavite je na suvom, provetrenom mestu da otpusti vlagu. Vuna ima prirodno antibakterijsko svojstvo i većinu mirisa neutrališe samim kontaktom sa svežim vazduhom.',
          '2. Otresanje i četkanje: Ako na šubaru padne prašina ili pahulje snega, dovoljno je snažno je protresti u vazduhu, a zatim mekom četkom za odeću lagano proći od vrha ka dnu prateći smer uvezanih pramenova.',
          '3. Pranje: Ukoliko je potrebno temeljno pranje, šubara se pere isključivo ručno, u mlakoj vodi (do 30°C) sa par kapi blagog šampona za kosu ili tečnog deterdženta za vunu sa lanolinom. Nemojte je trljati niti uvijati. Vodu nežno istisnite dlanovima, položite je na čist beli peškir i oblikujte konus rukama dok se suši na sobnoj temperaturi.',
          '4. Zaštita preko leta: Čuvajte je u prozračnoj pamučnoj vreći, uz dodatak sušene lavande ili grančice kedrovine koja prirodno tera moljce.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Da li je bela vlaška šubara teška na glavi?',
        answer: 'Naprotiv, izuzetno je lagana! Zahvaljujući ručno heklanoj mrežastoj osnovi umesto teške štavljene kože, cela šubara teži svega oko 200 do 300 grama, što igračima omogućava nesmetane i brze okrete tokom celovečernjih folklornih nastupa.'
      },
      {
        question: 'Kako odrediti pravu veličinu šubare pri naručivanju?',
        answer: 'Veličina se određuje merenjem obima glave u centimetrima (krojačkim santimetrom preko čela i potiljka, tik iznad ušiju). Standardne veličine kreću se od 54 do 61 cm. Zbog heklane mrežice, šubara ima blagu elastičnost i idealno se prilagođava obliku glave.'
      },
      {
        question: 'Koliko traje izrada jedne heklane bele vlaške šubare u ateljeu Savremeni Koreni?',
        answer: 'Za kompletnu izradu jedne šubare – od pripreme i pranja runske vune, heklanja mrežaste kalote do ručnog čvorovanja svakog pojedinačnog pramena – potrebno je između 3 i 5 dana pažljivog majstorskog rada.'
      },
      {
        question: 'Može li se bela šubara nositi i zimi u svakodnevnom gradu?',
        answer: 'Apsolutno! Sve više mladih kombinuje tradicionalnu belu vlašku šubaru uz moderne zimske kapute, kožne jakne ili planinsku odeću, stvarajući prepoznatljiv etno-moderni izgled koji privlači divljenje gde god se pojave.'
      }
    ],
    conclusion: 'Bela vlaška šubara je živo svedočanstvo bogatstva Homoljskog kraja. U ateljeu Savremeni Koreni ponosni smo što ovu drevnu tehniku heklanja i čvorovanja čuvamo od zaborava, unoseći u svaki primerak duh slobodnih homoljskih visova.'
  },

  // 2. VEZENE ČARAPE ZA FOLKLOR
  {
    id: 'vezene-carape-za-folklor-vodic',
    slug: 'vezene-carape-za-folklor-vunene-cvetni-vez-pet-igala',
    title: 'Vezene Čarape za Folklor: Pletenje na 5 Igala, Cvetni Vez na Crnoj Vuni i Izdržljivost u Opancima',
    subtitle: 'Kompletan priručnik za folklorne ansamble i ljubitelje narodne nošnje: kako se pletu bešavne vunene čarape na 5 igala, tajne postojanog cvetnog veza, pravilan izbor konca i nega za dugovečnost na sceni.',
    excerpt: 'Vezene vunene čarape su temelj svakog folklornog koraka. Saznajte kako majstori spajaju precizno pletenje na pet igala sa raskošnim floralnim vezom na crnoj podlozi, kako se postiže maksimalna udobnost u kožnim opancima i kako čarape pravilno održavati.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor ručnog pletenja i tradicionalnog veza, Savremeni Koreni (Jošanica)',
    publishDate: '2. mart 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1210,
    category: 'pletenje',
    categoryLabel: 'Narodno Pletenje & Vez za Folklor',
    targetKeywords: [
      'vezene čarape za folklor',
      'folklorne čarape',
      'vezene vunene čarape',
      'čarape za kud',
      'narodne čarape',
      'vlaške vezene čarape',
      'srpske vezene čarape',
      'cvetni vez na čarapama',
      'pletenje čarapa na 5 igala',
      'čarape za opanke',
      'kako se vezu čarape',
      'održavanje vunenih čarapa'
    ],
    coverImage: vezeneCarapeImg,
    featured: true,
    relatedProductId: 'sk-carape-01',
    sections: [
      {
        id: 'folklorne-carape-vizuelni-i-funkcionalni-temelj',
        heading: 'Folklorne vezene čarape: Zašto su one vizuelni i anatomski temelj svakog koraka?',
        paragraphs: [
          'U folklornom plesu pogled publike i stručnih žirija neizostavno pada na noge igrača. Brzi prepleti, sitni koraci, potkivanja i skokovi u vlaškim, šumadijskim ili južnosrpskim kolima zahtevaju obuću i odeću koja je istovremeno estetski besprekorna i maksimalno izdržljiva. Tu na scenu stupaju vezene vunene čarape – remek-delo narodnog tekstilnog umeća koje spaja umetnost pletenja i veza.',
          'Kada posmatrate fotografije naših čarapa iz radionice Savremeni Koreni, odmah uočavate kontrast duboke, noćno crne pletene vune i blistavih cvetnih venaca u nijansama jarke narandžaste, rubin crvene, ciklame, safirno plave i smaragdno zelene. Ovaj floralni pojas, pozicioniran tik ispod kolena ili duž gornje trećine lista, stvara hipnotišući efekat prilikom kretanja u kolu.',
          'Ali folkorne čarape nisu samo ukras: one su primarni zaštitni sloj između stopala i kožnih opanaka. Tradicionalni opanci napravljeni od goveđe ili svinjske kože sa oputom mogu biti kruti, a prirodna vuna ima funkciju amortizera – ona upija znoj, sprečava žuljeve i obezbeđuje optimalnu termoregulaciju stopala čak i tokom najzahtevnijih koreografija.'
        ],
        quote: {
          text: 'Dobra vezena čarape za folklor mora da stoji uz nogu kao salivena – ne sme da spada dok igrate, ne sme da vas žulja na peti, a cvetovi moraju da sijaju kao da su jutros ubrani na livadi.',
          caption: 'Tanja Petrić o izradi folklornih čarapa u Savremenim Korenima'
        }
      },
      {
        id: 'pletenje-na-pet-igala-besavna-konstrukcija',
        heading: 'Konstrukcija bez šava: Kako se pletu tradicionalne čarape na 5 igala?',
        paragraphs: [
          'Prava narodna čarape nikada se ne kroji niti šije na mašini. Ona se plete tehnikom kružnog pletenja na pet kratkih igala sa dvostrukim vrhom (iglama za čarape). Četiri igle drže raspoređene petlje dok peta igla služi kao radna.',
          'Ova bešavna tehnika je ključna: odsustvo bilo kakvog unutrašnjeg šava garantuje da nigde neće postojati zadebljanje koje bi pod pritiskom kaiševa opanka stvorilo bolne plikove na nozi. Pletenje započinje rebrastim bodom (renderom, 1x1 ili 2x2) na vrhu, koji pruža neophodnu elastičnost kako se čarape ne bi spuštala niz list.',
          'Nakon cevastog dela lista sledi pletenje pete – najkritičnijeg dela svake čarape. U našoj radionici petu pletemo posebnim pojačanim bodom (često sa duplom niti ili dodatkom tanke pamučne armature) koji višestruko povećava otpornost na trenje. Nakon pete prelazi se na stopalo, a završava se trouglastim ili polukružnim sužavanjem na prstima.'
        ],
        bulletPoints: [
          'Pletenje na 5 igala: Potpuno kružno i bešavno, anatomski prilagođeno liniji lista i zgloba.',
          'Ojačana peta i prsti: Sprečava habanje o oputu i tabanicu kožnog opanka.',
          'Prirodna vuna: Zadržava toplotu zimi, a omogućava disanje kože tokom letnjih festivala na otvorenom.',
          'Elastični gornji rub: Drži čarapu stabilno pod kolenom bez potrebe za neprirodnim gumama koje prekidaju cirkulaciju.'
        ]
      },
      {
        id: 'umetnost-cvetnog-veza-na-crnoj-vuni',
        heading: 'Cvetni vez na vunenoj podlozi: Koji se bodovi i konci koriste?',
        paragraphs: [
          'Vez na već ispletenoj vunenoj čarapi predstavlja poseban zanatski izazov. Za razliku od ravnog lanenog ili pamučnog platna zategnutog na đerđef, pletena površina je elastična i reljefna. Ukoliko vezilja prejako zategne konac, čarapa će se suziti i igrač neće moći da provuče stopalo; ako zategne prelabavo, cvetovi će visiti i gubiti oblik.',
          'Za vez na crnim folklornim čarapama najčešće se koriste puni vez (satenski bod / pljosnati bod), bod pokrstice (krstići) i lančanac (ombodi). Puni vez daje laticama ruža, poljskog cveća i karanfila divan, reljefni sjaj i punoću.',
          'Konci koji se koriste moraju biti vrhunskog kvaliteta: koristi se postojani pamučni muline ili specijalna fina vunica za goblene i vez. Presudno je da konci imaju garantovanu postojanost boje (reaktivno bojenje) kako crveni ili ciklama cvetovi pri prvom pranju ne bi pustili boju i uništili bele detalje ili obojili kožu.'
        ]
      },
      {
        id: 'motivi-istocne-srbije-i-homolja',
        heading: 'Specifičnosti vlaških i homoljskih motiva: Simbolika flore i geometrijskih venaca',
        paragraphs: [
          'Dok su u šumadijskim čarapama cvetovi često sitniji i raspoređeni u vertikalnim linijama duž lista, vlaške i homoljske vezene čarape karakteriše bujan, gust floralni venac pri samom vrhu, neposredno ispod kolena. Na našim čarapama prepoznajete motive stilizovanih ruža, zumbula i poljskog cveća, obrubljene zrakastim žutim i narandžastim listićima.',
          'Ovakav raspored ima i scensku funkciju: kada devojke obuku vlašku narodnu nošnju – čija je suknja ili pregača često kraća kako bi oslobodila noge za izuzetno brze i temperamentne korake – vezene čarape postaju centralni koloristički akcenat celog ansambla.',
          'Svaki par koji izađe iz ateljea Savremeni Koreni je ručni unikat. Iako se cvetni motivi ponavljaju u harmoniji, svaka latica nosi individualni pečat ruke koja ju je izvezla.'
        ]
      },
      {
        id: 'odrzavanje-folklornih-carapa',
        heading: 'Kako prati i čuvati vezene vunene čarape za folklor?',
        paragraphs: [
          'Folklorne čarape trpe ogroman napor na sceni – znoj, prašinu sa drvenog poda i pritisak opanaka. Zato je pravilna nega ključna:',
          '1. Ručno pranje u mlakoj vodi: Nikada nemojte prati vezene vunene čarape u mašini za veš na standardnim programima, jer će vuna usled centrifuge i tople vode "ufelcovati" (smanjiti se i stvrdnuti). Potopite ih u mlaku vodu temperature do 30°C sa blagim tečnim deterdžentom za vunu.',
          '2. Bez jakog ceđenja: Vodu lagano istisnite stiskanjem dlanova. Nikada nemojte uvrtati čarapu kao krpu, jer to može oštetiti fine vezene bodove.',
          '3. Sušenje na ravnom: Raširite ih na suv peškir na ravnoj površini. Ne sušite ih na direktnom vrelom radijatoru niti na jakom suncu kako vuna ne bi izgubila elastičnost.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Koliko pari čarapa je potrebno članu KUD-a tokom sezone nastupa?',
        answer: 'Preporučuje se da svaki aktivan igrač ima najmanje dva para vezenih čarapa. Na taj način jedan par može da se odmori, provetri ili opere između uzastopnih festivalskih večeri, čime se značajno produžava vek trajanja vunenih vlakana.'
      },
      {
        question: 'Da li se vezene čarape prave po meri?',
        answer: 'Da, u radionici Savremeni Koreni čarape radimo prema broju obuće (od dečijih brojeva 32-35, pa sve do 46 za odrasle), uz mogućnost prilagođavanja obima lista kako bi čarapa stajala udobno i bez usecanja.'
      },
      {
        question: 'Zašto je vuna bolja od sintetike za folklorne nastupe?',
        answer: 'Vuna je prirodni termo-regulator: ona upija do 30% vlage a da ne deluje vlažno na dodir, održavajući stopalo suvim. Za razliku od sintetike koja pospešuje klizanje stopala u opanku i stvara neprijatne mirise, prirodna runska vuna obezbeđuje stabilnost i higijenu.'
      }
    ],
    conclusion: 'Ručno vezene vunene čarape iz Jošanice nose u sebi ritam kola i dušu Homolja. One su neizostavan deo opreme svakog pravog folklorca koji drži do scenske estetike i očuvanja srpskog i vlaškog nasleđa.'
  },

  // 3. NARODNA NOŠNJA IZ HOMOLJSKOG KRAJA: SRPSKA I VLAŠKA
  {
    id: 'narodna-nosnja-homoljski-kraj-vodic',
    slug: 'narodna-nosnja-homoljski-kraj-srpska-vlaska-tradicija-vodic',
    title: 'Narodna Nošnja iz Homoljskog Kraja: Vodič Kroz Srpsku i Vlašku Tradiciju, Delove Nošnje i Vezene Ornamente',
    subtitle: 'Sveobuhvatni etnografski i scenski vodič kroz neprocenjivo blago Homolja (Žagubica, Jošanica, Krepoljin): analiza muške i ženske nošnje, bele šubare, vezenih košulja na srpskom platnu, tkanica, jeleka, pregača i opanaka.',
    excerpt: 'Homoljski kraj u istočnoj Srbiji krije jedan od najfascinantnijih spojeva srpske i vlaške narodne nošnje. Saznajte sve o elementima muške i ženske nošnje, tajnama arhaičnog veza, nošenju tkanica i istorijskom značaju očuvanja ovog blaga u ateljeu Savremeni Koreni.',
    author: 'Tanja Petrić',
    authorRole: 'Istraživač i rekonstruktor narodnih nošnji, Savremeni Koreni (Jošanica)',
    publishDate: '3. mart 2026.',
    readingTime: '11 min čitanja',
    wordCount: 1350,
    category: 'narodna-nosnja',
    categoryLabel: 'Narodna Nošnja & Homoljski Kraj',
    targetKeywords: [
      'narodna nošnja iz homoljskog kraja',
      'homoljska narodna nošnja',
      'srpska nošnja homolja',
      'vlaška nošnja homolje',
      'delovi homoljske nošnje',
      'narodna nošnja istočna srbija',
      'vezena košulja homolje',
      'bela vlaška šubara',
      'tkanica homoljska',
      'pregača homolje',
      'žagubica folklor nošnja',
      'nošnja za kud homolje'
    ],
    coverImage: homoljskaNosnjaImg,
    featured: true,
    relatedProductId: 'sk-kosulja-01',
    sections: [
      {
        id: 'kolevka-homolja-istorijski-kontekst',
        heading: 'Kolevka Homolja: Zašto je narodna nošnja ovog kraja jedinstvena u Evropi?',
        paragraphs: [
          'Homolje predstavlja čarobnu geografsku i kulturnu oazu istočne Srbije, oivičenu Homoljskim planinama, Beljanicom i Gornjačkom klisurom. Upravo ta prirodna zaštićenost i planinska izolovanost omogućile su selima opštine Žagubica – među kojima je i naše selo Jošanica – da sačuvaju izuzetno arhaične forme tekstilnog stvaralaštva koje su u drugim krajevima modernizacijom nepovratno nestale.',
          'Ono što Homolje čini posebno dragocenim na etnografskoj mapi Srbije jeste harmoničan suživot i vekovno prožimanje srpske i vlaške tradicije. Dok srpska nošnja nosi elemente dinarskih i moravskih uticaja sa naglaskom na finoći tkanja i geometrijskim ornamentima, vlaška nošnja pleni eksplozijom floralnih motiva, specifičnim kraćim krojevima, čipkastim završecima i čuvenom belom šubarom.',
          'U radionici Savremeni Koreni, smeštenoj u samom srcu ovog kraja, svakodnevno rekonstruišemo i izrađujemo komade homoljske nošnje za kulturno-umetnička društva, etno muzeje, pozorišne predstave i ljubitelje autentične baštine. Naš cilj je da svaki šav, svaki bod i svaka pređa odgovaraju originalnim muzejskim primercima iz 19. i ranog 20. veka.'
        ],
        quote: {
          text: 'Homoljska nošnja nije muzejski eksponat pod staklom – ona je živi organizam. U njenim bojama upisana je snaga naših planinskih reka, a u vezovima mudrost žena koje su pod svetlošću petrolejke tkale budućnost svoje porodice.',
          caption: 'Tanja Petrić o misiji ateljea Savremeni Koreni'
        }
      },
      {
        id: 'delovi-muske-homoljske-nosnje',
        heading: 'Delovi muške nošnje Homolja: Od bele šubare do tkanice i vunenih čarapa',
        paragraphs: [
          'Muška nošnja Homolja odlikuje se monumentalnim, dostojanstvenim izgledom koji je kroz vekove pružao zaštitu od oštre planinske klime, a istovremeno isticao stas i držanje domaćina:',
          '1. Bela vlaška šubara (ili crna srpska šubara): Konusnog oblika, izrađena od prirodne runske vune na heklanoj podlozi. Dok su stariji ljudi u srpskim selima češće nosili tamnije šubare, bela šubara sa bogatim vunenim resama zaštitni je znak vlaških mladića i folklornih koreografija.',
          '2. Košulja od domaćeg srpskog platna: Tkana od čistog pamuka ili mešavine pamuka i konoplje. Kroj je ravan, dužine do kolena ili sredine butina, sa vezenim detaljima na kragni (stajaća ruska kragna), narukvicama i prednjem razrezu.',
          '3. Sukneni jelek / zubun: Prsluk od debelog valjanog vunenog sukna u prirodnoj beloj, braon ili crnoj boji, ukrašen vunenim gajtanima (crnim ili plavim) duž ivica i džepova.',
          '4. Tkanica (kanica / pojas): Široki tkani vuneni pojas, dugačak i do 3 metra, koji se višestruko obmotava oko struka. Pojas čuva bubrege i kičmu pri teškom radu i plesu, a ujedno fiksira košulju.',
          '5. Pantalone (čakšire / benvreke): Od belog ili tamnog sukna, uskih nogavica pri dnu kako bi lako ušle u čarape, i komotnijeg gornjeg dela.',
          '6. Vezene vunene čarape i kožni opanci: Crne pletene čarape sa cvetnim vezom, preko kojih se obuvaju opanci prešnjaci ili šiljkani sa finim kožnim prepletom opute.'
        ]
      },
      {
        id: 'delovi-zenske-homoljske-nosnje',
        heading: 'Ženska homoljska nošnja: Raskoš vezenih košulja, pregača i zubuna',
        paragraphs: [
          'Ženska nošnja iz Homoljskog kraja jedna je od najraskošnijih u čitavoj jugoistočnoj Evropi. Karakteriše je slojevitost i izuzetna vizuelna dinamika:',
          '1. Dugačka vezena košulja (rubina): Centralni odevni predmet, sečena u jednom komadu od ramena do članaka od gustog srpskog platna. Rukavi su izuzetno bogato izvezeni geometrijskim i cvetnim šarama u tehnici punog veza ili pokrstice. Na dnu košulje često se nalazi ručno heklana čipka.',
          '2. Pregače (prednja i zadnja): U vlaškoj nošnji karakteristične su dve pregače (pregaca i bobicarka / zubača) tkane na razboju od fine vunene pređe u prelepim prugastim i romboidnim šarama, ukrašene resama pri donjoj ivici.',
          '3. Jelek i zubun: Kratki prsluci od pliša, čoje ili sukna, bogato izvezeni srmom (zlatnim i srebrnim nitima) ili svilenim koncem. U svečanim prilikama preko jeleka se nosio duži sukneni zubun bez rukava.',
          '4. Tkani pojas: Ženska tkanica je uža od muške, živopisnih pastelnih ili jarkih boja, kojom se pregače čvrsto fiksiraju preko vezene košulje.',
          '5. Marama i nakit: Na glavi se nosila bela vezena marama ili cvetna šamija, dok su grudi ukrašavali nizovi srebrnih dukata (talira) i perlani nakit od sitnih staklenih perlica koji je zveckao pri svakom pokretu kola.'
        ]
      },
      {
        id: 'ornamentika-boje-i-simbolika',
        heading: 'Ornamentika i kolorit: Kako razlikovati srpske i vlaške motive na tkaninama?',
        paragraphs: [
          'Pažljivo posmatranje ornamenata otkriva čitav jezik simbola utkan u homoljsku nošnju:',
          'U srpskim motivima dominiraju geometrijske forme nasleđene iz srednjovekovne tradicije: krstasti oblici, rombovi (simbol plodnosti zemlje), cik-cak linije (voda i reke) i stilizovane lozice. Osnovni kolorit čine duboka crvena, tamnoplava, crna i zlatno-žuta.',
          'U vlaškim motivima, nasuprot tome, preovladava bujna flora: rascvetale ruže, karanfili, poljsko cveće, listovi bršljana i vinove loze. Kolorit vlaškog veza je izrazito živahan – jarke nijanse ciklame, svetlonarandžaste, tirkizne i svetlozelene stvaraju neverovatan kontrast na tamnim podlogama. Ovaj floralni stil svedoči o dubokoj povezanosti vlaškog naroda sa prirodom i šumama Homolja.'
        ]
      },
      {
        id: 'rekonstrukcija-za-kudove-i-savremeni-koreni',
        heading: 'Izrada i rekonstrukcija nošnji u ateljeu Savremeni Koreni za KUD-ove i etno ansamble',
        paragraphs: [
          'Jedan od najvećih izazova sa kojima se suočavaju današnja kulturno-umetnička društva jeste pronalazak proizvođača koji umeju da izrade nošnju po strogim etnografskim pravilima, a ne jeftine poliesterske imitacije koje gube formu i cepaju se nakon nekoliko nastupa.',
          'U ateljeu Savremeni Koreni (Jošanica) svaki komad izrađujemo od pravih prirodnih materijala: domaćeg srpskog pamučnog platna, prirodnog vunenog sukna, runske vune i postojanih pamučnih konaca. Krojimo nošnje prema individualnim merama igrača, osiguravajući da nošnja savršeno prati liniju tela, omogućava pun opseg pokreta i traje decenijama.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Koliko delova čini kompletnu mušku narodnu nošnju Homolja?',
        answer: 'Kompletnu mušku nošnju čini 6 do 7 osnovnih elemenata: bela šubara (ili crna šubara), vezena košulja, jelek (sukneni ili plišani), široka tkani pojas (tkanica), suknene čakšire, vezene vunene čarape i kožni opanci sa oputom.'
      },
      {
        question: 'Koja je razlika između letnje i zimske homoljske nošnje?',
        answer: 'Letnja nošnja bazirana je na lakšem srpskom platnu (košulja i platnene gaće) uz lakši jelek i opanke. Zimska nošnja obavezno uključuje tople suknene čakšire od valjanog sukna, dugački sukneni gunj ili zubun, teške vezene vunene čarape i bogatu belu šubaru od runske vune.'
      },
      {
        question: 'Kako se pravilno pere i održava vezena košulja od srpskog platna?',
        answer: 'Košulje od srpskog platna sa ručnim vezom peru se na temperaturi do 40°C sa blagim praškom bez izbeljivača (hlora). Peglaju se sa naličja dok je platno još uvek blago vlažno, čime se postiže savršena glatkoća i reljefnost izvezenih motiva.'
      },
      {
        question: 'Da li radite pojedinačne delove nošnje ili samo cele komplete?',
        answer: 'U ateljeu Savremeni Koreni možete naručiti kako pojedinačne delove (npr. samo belu šubaru, par vezenih čarapa, vezenu košulju ili jelek), tako i kompletne uniforme za celokupne postave folklornih društava.'
      }
    ],
    conclusion: 'Narodna nošnja Homoljskog kraja je biser naše kulturne baštine. Njenim nošenjem i vernošću originalnim krojevima svedočimo o tome da tradicija nije pepeo prošlosti, već živi plamen koji obasjava naš savremeni identitet.'
  }
];
