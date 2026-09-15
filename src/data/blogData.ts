import { BlogPost } from '../types';
import { bagsAndSewingArticles } from './seoArticlesBagsAndSewing';
import { macrameAndYarnArticles } from './seoArticlesMacrameAndYarn';
import { homoljeAndTraditionArticles } from './seoArticlesHomoljeAndTradition';
import { costumesAndHeritageArticles } from './seoArticlesCostumesAndHeritage';
import { craftsAndGiftsArticles } from './seoArticlesCraftsAndGifts';

const torbicaImg = '/src/assets/images/etno_torbica_vez_1789021849429.jpg';
const subaraImg = '/src/assets/images/srpska_subara_moderna_1789021862584.jpg';
const carapeImg = '/src/assets/images/vunene_carape_vez_1789021876638.jpg';
const kosuljaImg = '/src/assets/images/vezena_kosulja_1789021895745.jpg';
const nakitImg = '/src/assets/images/heklani_nakit_1789021909183.jpg';
const heroImg = '/src/assets/images/savremeni_hero_banner_1789021835867.jpg';
const nosnjaImg = '/src/assets/images/homoljska_narodna_nosnja_1789032467664.jpg';
const zlatovezImg = '/src/assets/images/srpski_zlatovez_srma_1789105485118.jpg';
const etnoUnikatnaTorbaImg = '/src/assets/images/etno_unikatna_torba_1789105500674.jpg';
const muskiAksesoariImg = '/src/assets/images/muski_etno_aksesoari_1789105515453.jpg';
const vezeniLanNadstolnjakImg = '/src/assets/images/vezeni_nadstolnjak_lan_1789407278498.jpg';
const autenticniVezDetaljImg = '/custom_products/1789327918894_1000019847.webp';

const initialBlogPosts: BlogPost[] = [
  {
    id: 'vez-kroz-vekove-savremeni-stil',
    slug: 'vez-kroz-vekove-i-danas-rucni-vez',
    title: 'VEZ Kroz Vekove i Danas: Sve o Ručnom Vezu, Istoriji, Materijalima i Savremenom Stilu',
    subtitle: 'Sveobuhvatni vodič o magiji svakog uboda igle, razlici između mašinskog i autentičnog ručnog veza, pripremi platna i očuvanju porodičnog nasleđa.',
    excerpt: 'U eri industrijske hiperprodukcije, ručni vez doživljava svetski preporod. Odgovorili smo na sva ključna pitanja o materijalima, đerđefu, bodovima i integraciji tradicionalnog veza u savremeni gradski stil.',
    author: 'Tanja Petrić',
    authorRole: 'Osnivač i majstor ručnog rada, Savremeni Koreni (Jošanica)',
    publishDate: '12. februar 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1380,
    category: 'vez',
    categoryLabel: 'Ručni Vez (Enciklopedija)',
    targetKeywords: [
      'VEZ',
      'ručni vez',
      'šta je ručni vez',
      'tradicionalni vez',
      'srpski vez',
      'vez na srpskom platnu',
      'vezene košulje',
      'mašinski vs ručni vez',
      'kako se pere ručni vez',
      'đerđef i muline konac'
    ],
    coverImage: kosuljaImg,
    featured: true,
    relatedProductId: 'sk-kosulja-01',
    sections: [
      {
        id: 'uvod-u-vez',
        heading: 'Šta je ručni vez i zašto ga nijedna mašina ne može zameniti?',
        paragraphs: [
          'Ručni vez je drevna umetnost ukrašavanja tkanine provlačenjem niti pomoću igle, stvarajući ornamentalne, floralne ili geometrijske motive. Dok mašinski vez podrazumeva hiljade uniformisanih, matematički proračunatih i krutih uboda kompjuterskog programa, ručni vez poseduje dušu, organsku teksturu i mikro-varijacije u zategnutosti konca koje mu daju neponovljiv reljef.',
          'U našoj radionici Savremeni Koreni u Jošanici, podno Homoljskih planina, vez doživljavamo kao neprekinuti razgovor sa našim prabakama. Svaki komad od pravog srpskog platna koji ukrašavamo ručno zahteva između 15 i 45 radnih sati strpljivog, meditativnog rada. Upravo ta posvećenost vremenu čini da vezeni odevni komad ili etno torbica ne budu prolazna potrošna roba, već umetnički unikat i buduće porodično nasleđe.',
          'Poslednjih godina primećujemo ogroman porast interesovanja mladih ljudi i naših ljudi u dijaspori za autentični vez. Razlog je jasan: ljudi su zasićeni sintetikom i generičkim modnim brendovima. Žele odeću koja nosi priču, koja miriše na tradiciju i koja slavi individualnost onoga ko je nosi.'
        ],
        quote: {
          text: 'Svaki čvorić na poleđini platna i svaka blaga nepravilnost ručnog boda nepobitan su dokaz da je iza tog predmeta kucalo živo ljudsko srce, a ne hladan fabrički motor.',
          caption: 'Tanja Petrić o filozofiji brenda Savremeni Koreni'
        }
      },
      {
        id: 'materijali-i-alati',
        heading: 'Materijali za vrhunski vez: Srpsko platno, muline konac i đerđef',
        paragraphs: [
          'Ukoliko želite da ručni vez traje generacijama bez bledila i pucanja niti, izbor materijala je presudan. Kroz godine prakse uvideli smo da se najlepši rezultati postižu upotrebom prirodnih, gusto tkanih pamučnih i lanenih vlakana.',
          'Srpsko platno (domaće tkano pamučno platno) predstavlja zlatni standard našeg podneblja. Ono ima idealnu prozračnost, prijatno je za nošenje uz kožu i poseduje vidljivu strukturu niti koja omogućava precizno brojanje. Za razliku od fabričkog poliestera koji se pod iglom deformiše, pravo srpsko platno sa svakim pranjem postaje sve mekše i lepše.',
          'Za konac koristimo vrhunski pamučni muline (mouliné) koji se sastoji od šest lako deljivih niti. To vezilji omogućava da prilagodi debljinu boda: za fine cvetne latice koristi se jedna do dve niti, dok se za reljefne obode i bordure uzimaju tri ili četiri niti. U svečanim komadima dodajemo srmu – metalizirani zlatni i srebrni konac koji daje aristokratski sjaj.',
          'Đerđef (okrugli drveni ram sa zatezačem) je nezamenjiv alat svakog majstora. On drži platno ravnomerno zategnutim poput bubnja, čime se sprečava nabiranje tkanine prilikom povlačenja konca i obezbeđuje besprekorna geometrija motiva.'
        ],
        bulletPoints: [
          'Srpsko pamučno platno: 100% prirodna struktura, izuzetno prijatna za kožu i postojana na pranje.',
          'Pamučni muline konac: Postojane boje otporne na svetlost i blago pranje, svileni finiš.',
          'Veziljske igle: Igle sa zaobljenim vrhom (tupim) za vez po brojanju niti, odnosno oštre igle za puni slikarski vez na gustom platnu.',
          'Drveni bukov đerđef: Ravnomerno zatezanje koje čuva osnovu platna od deformacije.'
        ]
      },
      {
        id: 'kako-nositi-vez',
        heading: 'Kako uklopiti tradicionalni vez u moderan gradski stil?',
        paragraphs: [
          'Jedna od najčešćih zabluda jeste da je vezenoj košulji ili torbici mesto samo na sceni folklornog ansambla ili u muzejskoj vitrini. Naprotiv! Suština brenda Savremeni Koreni jeste upravo savremena reinterpretacija starih motiva.',
          'Bela vežena košulja od srpskog platna sa diskretnim crvenim ili crnim motivom na mandžetnama i ruskoj kragni savršeno funkcioniše u poslovnom okruženju. Kada je obučete ispod strukiranog crnog ili teget sakoa, ona privlači pažnju suptilnom elegancijom i odaje osobu sa izgrađenim ukusom i poštovanjem sopstvenih korena.',
          'Tokom proleća i leta, vezena košulja u kombinaciji sa dobrim klasičnim džinsom i kožnim sandalama stvara nepogrešiv boho-šik izgled. Naše etno torbice sa drvenim ručkama i cvetnim vezom momentalno podižu monohromatsku malu crnu haljinu ili laneni jednobojni komplet, dajući celokupnom izgledu autentičnu toplinu.'
        ],
        keyTakeaway: 'Tajna je u kontrastu: jedan snažan, ručno vezen komad nosite uz minimalističku modernu garderobu, čime vez dolazi do svog punog izražaja.'
      },
      {
        id: 'nega-i-pranje',
        heading: 'Pravilna nega i pranje vezenih predmeta: Kako sačuvati vez decenijama',
        paragraphs: [
          'Mnogi kupci se plaše da operu ručno vezenu odeću iz straha da će konac pustiti boju ili da će se bodovi rasparati. Uz praćenje nekoliko osnovnih pravila, vaš komad će ostati besprekoran dugi niz godina.',
          'Prvo i osnovno pravilo jeste izbegavanje agresivnih mašinskih centrifuga i jakih izbeljivača na bazi hlora. Ručni vez se pere ručno, u mlakoj vodi (do 30-40°C), blagim tečnim sapunom ili deterdžentom za osetljive tkanine.',
          'Nikada nemojte agresivno uvrtati i cediti vezeni komad. Nakon ispiranja, umotajte ga u čist beli frotirski peškir koji će upiti višak vlage, a potom ga položite vodoravno da se osuši u hladovini, van direktnog sunčevog zračenja.',
          'Peglanje se uvek vrši sa naličja tkanine, preko vlažne pamučne krpe, dok je platno još blago vlažno. Pod vezeni deo postavite mekši peškir – na taj način reljefni bodovi neće biti spljošteni pod vrelom peglom, već će zadržati svoju raskošnu trodimenzionalnost.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Koja je glavna razlika između ručnog i mašinskog veza?',
        answer: 'Ručni vez se radi iglom i koncem gde vezilja ručno kontroliše zategnutost, raspored i dubinu svakog boda. Poleđina ručnog rada je čista i meka, a sam rad ima neponovljivu organsku punoću. Mašinski vez je industrijski kompjuterski proces sa krutom poleđinskom mrežicom i ravnim, sintetičkim izgledom bez duše.'
      },
      {
        question: 'Koliko vremena je potrebno za izradu jedne ručno vezene košulje?',
        answer: 'U zavisnosti od složenosti šare i gustine bodova, za izradu jedne tradicionalne košulje od srpskog platna u radionici Savremeni Koreni potrebno je između 25 i 45 sati neprekidnog ručnog rada majstora.'
      },
      {
        question: 'Da li se vezena odeća može prati u veš mašini?',
        answer: 'Preporučujemo isključivo ručno pranje u mlakoj vodi blagim deterdžentom bez hlora. Ukoliko baš morate koristiti mašinu, koristite program za svilu/vunu na 30°C, bez centrifuge, uz stavljanje košulje u zaštitnu vrećicu za osetljiv veš.'
      },
      {
        question: 'Može li se naručiti personalizovani vez sa mojim inicijalima ili porodičnim motivom?',
        answer: 'Da, radionica Savremeni Koreni radi unikatne komade po porudžbini. Možete odabrati specifičan motiv vašeg rodnog kraja, inicijale, cvetni ornament ili kroj prilagođen vašim merama.'
      }
    ],
    conclusion: 'Ručni vez nije relikt prošlosti, već najotmeniji most između onoga što smo bili i onoga što jesmo. Kada birate autentični vez, vi ne kupujete samo odevni predmet – podržavate opstanak našeg kulturnog identiteta i rad ženskih ruku koje s ljubavlju čuvaju tradiciju Srbije.'
  },
  {
    id: 'vrste-veza-srpska-tradicija-bodovi',
    slug: 'vrste-veza-srpska-tradicija-tehnike-i-bodovi',
    title: 'VRSTE VEZA: Velika Enciklopedija Tradicionalnih Bodova, Kosovskog Veza, Pokrstice i Zlatoveza',
    subtitle: 'Detaljan stručni vodič kroz sve tehnike srpskog narodnog veza: od krstića i punog boda do kraljevskog srmoveza i bele šupljike.',
    excerpt: 'Da li znate razliku između pokrstice, lančanca, punog reljefnog veza i kosovskog veza? Upoznajte bogatstvo bodova i simboliku srpskih ornamenata kroz detaljan prikaz tehnika i primene.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor umetničkog veza, Savremeni Koreni',
    publishDate: '08. februar 2026.',
    readingTime: '10 min čitanja',
    wordCount: 1420,
    category: 'vrste-veza',
    categoryLabel: 'Vrste Veza & Bodovi',
    targetKeywords: [
      'vrste veza',
      'bodovi za vez',
      'pokrstica',
      'krstasti bod',
      'kosovski vez',
      'puni vez',
      'lančanac',
      'zlatovez',
      'srmovez',
      'beli vez',
      'srpski narodni vez',
      'tehnike vezenja'
    ],
    coverImage: vezeniLanNadstolnjakImg,
    featured: false,
    relatedProductId: 'sk-kosulja-01',
    sections: [
      {
        id: 'pregled-vrsta-veza',
        heading: 'Bogatstvo tehnika: Kako se dele vrste veza u našoj tradiciji?',
        paragraphs: [
          'Srpski tradicionalni vez spada među najbogatije i najraznovrsnije u celoj Evropi. Vekovima se prenosio sa kolena na koleno, razvijajući se pod uticajem vizantijske dvorske estetike, lokalnih seoskih običaja i geometrijskih simbola prastare slovenske mitologije.',
          'U osnovi, sve vrste veza možemo podeliti prema načinu izvođenja na dve velike grupe: vez po brojanju niti (gde se bodovi izvode preciznim brojanjem uzdužnih i poprečnih niti tkanine) i vez po slobodnom crtežu (gde se motiv prethodno iscrtava na platnu, a potom ispunjava raznovrsnim reljefnim bodovima).',
          'Pored tehnike izvođenja, vrste veza delimo i po materijalu niti: pamučni i svileni vez u boji, zlatovez i srmovez (sa metalnim nitima), kao i beli vez (sa ton-na-ton belim koncem i šupljikama).'
        ]
      },
      {
        id: 'pokrstica-krstasti-bod',
        heading: '1. Pokrstica (Krstasti bod / Krstić) – Najstariji geometrijski bod',
        paragraphs: [
          'Pokrstica je verovatno najrasprostranjenija i najomiljenija tehnika narodnog veza na Balkanu. Izvodi se ukrštanjem dva kosa uboda koji formiraju savršen kvadratni krstić (X). Izuzetno je važno da svi gornji bodovi budu usmereni u istom pravcu, jer to gotovom vezu daje ujednačen sjaj i harmoniju.',
          'Pokrstica se radi isključivo po brojanju niti na tkaninama sa ravnomernim tkanjem, kao što je domaće srpsko platno ili panama platno. Ovom tehnikom vezu se čuveni geometrijski motivi: zvezde, rozete, rombovi i stilizovani cvetovi na rukavima i prsima košulja.'
        ],
        bulletPoints: [
          'Karakteristike: Izuzetna čvrstina i dugovečnost – bodovi se ne habaju lako tokom nošenja.',
          'Gde se koristi: Donji rubovi ženskih i muških košulja, peškiri, jastučnice i svečani pojasevi.',
          'Savet majstora: Nikada nemojte praviti prevelike skokove konca na naličju kako platno ne bi gubilo elastičnost.'
        ]
      },
      {
        id: 'puni-reljefni-vez',
        heading: '2. Puni vez (Pljosnati i kosi bod) – Slikanje iglom i koncem',
        paragraphs: [
          'Puni vez (u narodu često nazivan „slikanje iglom“) omogućava izradu raskošnih, reljefnih cvetova, listova i plodova sa mekim prelazima nijansi. Bodovi se slažu gusto jedan do drugog, tako da u potpunosti pokrivaju podlogu platna.',
          'Posebna lepota punog veza leži u njegovoj trodimenzionalnosti: vešti majstor može postići efekat senke i dubine kombinovanjem tamnijih i svetlijih tonova crvene, plave ili zelene boje. Ovaj vez zahteva vrhunski osećaj za zategnutost konca – ako se konac pretegne, platno će se naborati; ako ostane labav, bodovi će se pomerati pri dodiru.'
        ],
        image: autenticniVezDetaljImg,
        imageCaption: 'Tradicionalni reljefni cvetni vez na srpskom domaćem platnu u radionici Savremeni Koreni'
      },
      {
        id: 'kosovski-vez',
        heading: '3. Kosovski vez – Kruna srpske duhovnosti i simbol božura',
        paragraphs: [
          'Kosovski vez zauzima posebno, uzvišeno mesto u našem kulturnom identitetu. Karakteriše ga dominantna tamnocrvena, trula višnja i purpurna boja koja simbolizuje prolivenu krv kosovskih junaka, dok crni tonovi predstavljaju večnu žalost, a zlatne i plave nijanse nadu i vaskrsenje.',
          'Glavni motiv kosovskog veza je stilizovani kosovski božur, često uokviren složenom geometrijskom bordurom. Bodovi u kosovskom vezu su izuzetno gusti i reljefni, dajući utisak teškog, kraljevskog brokata. Košulje i zubuni ukrašeni kosovskim vezom smatrani su najsvečanijom odorom koja se nosila samo na najveće praznike i svadbe.'
        ],
        quote: {
          text: 'Kosovski vez nije samo likovni ukras na platnu; to je ispisana istorija, molitva i večni zavet našeg naroda utkan u svaku nit crvenog konca.',
          caption: 'O simbolici boja u kosovskom vezu'
        }
      },
      {
        id: 'zlatovez-i-srmovez',
        heading: '4. Zlatovez i Srmovez – Luksuz kraljevskih dvorova i crkvenih odora',
        paragraphs: [
          'Zlatovez podrazumeva vezenje pravom zlatnom, srebrnom ili pozlaćenom metalnom srmom. Zbog specifičnosti krute metalne niti, zlatovez se najčešće ne provlači kroz platno kao običan konac, već se polaže na površinu tkanine i pričvršćuje sitnim, nevidljivim ubodima svilenog konca (tehnika „zlatoveza po pismu“ ili privezivanja).',
          'Kako bi se postigao visok reljef, ispod zlatnih niti se prethodno podlaže deblji karton, kudelja ili pamučna traka. Zlatovezom su se ukrašavali svečani somotski jeleci, zubuni, anterije i crkveni barjaci. Danas u radionici Savremeni Koreni koristimo elemente zlatoveza za kreiranje ekskluzivnih detalja na modernim torbicama i svečanim košuljama.'
        ],
        image: zlatovezImg,
        imageCaption: 'Kraljevski reljefni zlatovez zlatnom i srebrnom srmom na tamnom somotu'
      },
      {
        id: 'beli-vez-i-lancanac',
        heading: '5. Lančanac, Bod za lozu i Beli vez (Šlinga)',
        paragraphs: [
          'Lančanac (lančani bod) se formira nizanjem petlji koje liče na karike lanca. Izuzetno je elastičan i koristi se za iscrtavanje tankih stabljika, vitica i kontura pre nego što se cvet ispuni punim vezom.',
          'Bod za lozu (stabljikasti bod) pruža neprekidnu, nežnu liniju koja verno imitira prirodne grančice vinove loze i poljskog cveća.',
          'Beli vez (šlinga, šupljika) predstavlja vrhunac elegancije u vojvođanskoj i gradskoj tradiciji. Izvodi se belim koncem na belom platnu, često uz prosecanje i opšivanje sitnih rupica, stvarajući efekat raskošne tekstilne čipke na posteljini, zavesama i kragnama svečanih bluza.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Koji bod je najbolji za početnike u vezu?',
        answer: 'Za apsolutne početnike najbolji izbor je pokrstica (krstasti bod) na panama platnu, jer je struktura platna jasno definisana i lako se broje niti. Nakon savladavanja krstića, preporučuje se učenje lančanca i stabljikastog boda.'
      },
      {
        question: 'Šta predstavlja crvena boja u srpskom tradicionalnom vezu?',
        answer: 'Crvena boja u srpskom vezu ima duboku zaštitnu i simboličku ulogu: simbolizuje radost, životnu snagu, zdravlje i plodnost, a verovalo se da crveni vez na otvorima odeće (kragna, rukavi) štiti nosioca od uroka i zlih uticaja.'
      },
      {
        question: 'Kakav konac se koristi za zlatovez?',
        answer: 'Za zlatovez se koristi srma – konac koji se sastoji od svilene ili pamučne jezgre oko koje je spiralno omotana tanka metalna traka zlatne ili srebrne boje. Zbog svoje krutosti najčešće se polaže na površinu i fiksira tankim pomoćnim koncem.'
      },
      {
        question: 'Kako se određuje cena ručnog veza?',
        answer: 'Cena autentičnog ručnog veza formira se prvenstveno na osnovu broja utrošenih sati rada majstora, gustine i složenosti bodova, kao i kvaliteta osnovnog platna i konca. Unikatni komadi sa gustim kosovskim vezom ili zlatovezom zahtevaju višestruko više vremena od jednostavnih bordura.'
      }
    ],
    conclusion: 'Poznavanje različitih vrsta veza omogućava nam da sa ponosom čitamo poruke naših predaka utisnute u tkaninu. U radionici Savremeni Koreni čuvamo sve ove tehnike od zaborava, unoseći u svaki bod ljubav i poštovanje prema srpskoj tradiciji.'
  },
  {
    id: 'srpska-narodna-nosnja-vodic-kroz-delove',
    slug: 'srpska-narodna-nosnja-kompletan-vodic-delovi-istorija',
    title: 'Srpska Narodna Nošnja: Veliki Vodič Kroz Delove, Istoriju, Zubun, Jelek i Autentičnost',
    subtitle: 'Sve o krojnim elementima, simbolici ornamenata, razlici između regija i načinima prepoznavanja originalne rukotvorine u odnosu na industrijske kopije.',
    excerpt: 'Od zubuna i vezenog jeleka do košulje od srpskog platna, tkanice i opanaka – saznajte kako je nastajala srpska narodna nošnja, šta označava svaki njen element i kako je nositi danas.',
    author: 'Tanja Petrić',
    authorRole: 'Istraživač i majstor etno rukotvorina, Savremeni Koreni',
    publishDate: '01. februar 2026.',
    readingTime: '9 min čitanja',
    wordCount: 1310,
    category: 'narodna-nosnja',
    categoryLabel: 'Narodna Nošnja',
    targetKeywords: [
      'srpska narodna nošnja',
      'delovi narodne nošnje',
      'jelek',
      'zubun',
      'tkanica pojas',
      'srpska košulja',
      'opanci',
      'šumadijska nošnja',
      'kosovska nošnja',
      'kako prepoznati pravu nošnju',
      'kombinovanje narodne nošnje'
    ],
    coverImage: nosnjaImg,
    featured: false,
    relatedProductId: 'sk-kosulja-01',
    sections: [
      {
        id: 'znacaj-narodne-nosnje',
        heading: 'Srpska narodna nošnja: Odevna lična karta naših predaka',
        paragraphs: [
          'Srpska narodna nošnja nikada nije bila samo odeća koja štiti od hladnoće ili vrućine. Ona je bila vizuelna lična karta pojedinca: na osnovu kroja, bogatstva veza, boje tkanine i načina vezivanja pojasa, posmatrač je odmah mogao znati iz kog kraja Srbije neko dolazi, kakvog je imovnog stanja, da li je devojka stasala za udaju, da li je žena udata ili je u žalosti.',
          'Formirana tokom vekova na raskršću balkanskih, mediteranskih i srednjoevropskih strujanja, nošnja u sebi čuva neverovatno znanje o obradi vune, lana, konoplje i svile. Svaki krojni deo izrađivan je ručno u okviru porodične zadruge, uz maksimalno iskorišćenje tkanine i poštovanje prirode.'
        ]
      },
      {
        id: 'osnovni-delovi-nosnje',
        heading: 'Ključni delovi tradicionalne nošnje: Zubun, Jelek, Košulja i Tkanica',
        paragraphs: [
          'Iako svaka geografska oblast Srbije (Šumadija, Homolje, Kosovo, Timočka krajina, zapadna Srbija, Vojvodina) ima svoje specifičnosti, postoje bazični odevni elementi koji čine srž srpske nošnje:',
          '1. Zubun: Dugačak prsluk bez rukava, izrađen od teškog valjanog sukna prirodne bele ili svetle boje. Zubun se s pravom smatra najraskošnijim odevnim predmetom ženske nošnje. Ukrašavan je bogatim vezom od crvene i plave vune, zlaćenom srmom i sitnim aplikacijama od čoje.',
          '2. Jelek: Kratak prsluk koji prati liniju tela, dopire do struka i oblači se preko košulje. Jeleci su izrađivani od finog somota, satena ili čoje, a ukrašavani su gustim gajtanima i zlatovezom.',
          '3. Košulja od domaćeg srpskog platna: Osnova svakog odevnog sklopa. Ženske košulje su bile dugačke (često do članaka), dok su muške padale preko čakšira. Odlikuju se bogatim vezom oko vrata, na prsima i na širokim rukavima.',
          '4. Tkanica (pojas): Ručno tkana traka od čiste vune na uskom tkalačkom razboju. Šarena tkanica ima višestruku ulogu: učvršćuje nošnju oko struka, greje bubrege pri teškom radu i svojim koloritom daje dinamiku celoj figuri.'
        ],
        bulletPoints: [
          'Muški delovi: Košulja sa vezom, čakšire/suknene pantalone, sukneni prsluk, tkanica, šubara i kožni opanci.',
          'Ženski delovi: Duga vezena košulja, jelek ili zubun, tkana pregača (kecelja), tkanica, marama (šamija ili povez) i pletene čarape.',
          'Obuća: Ručno pleteni opanci prešnjaci ili kapičari od goveđe kože, sa savijenim vrhom (kljunom).'
        ],
        image: muskiAksesoariImg,
        imageCaption: 'Tradicionalni muški etno aksesoari: sukneni jelek sa gajtanima, šubara i tkani pojas'
      },
      {
        id: 'kako-prepoznati-autenticnost',
        heading: 'Kako razlikovati autentičnu narodnu nošnju od jeftinih imitacija?',
        paragraphs: [
          'Danas se na tržištu često pojavljuju nošnje namenjene suvenirnicama koje su izrađene od čistog sintetičkog poliestera, sa fabrički štampanim ili mašinski izvezenim šarama. Evo nekoliko nepogrešivih načina kako prepoznati pravi ručni rad:',
          'Pod rukom pravo srpsko platno ima blagu prirodnu teksturu pamuka i težinu, dok je sintetika klizava i hladna. Pravi vez ima reljef i mekoću, a poleđina mu je bez lepljivih folija. Sukneni delovi (zubun, gunj) moraju biti od prave, teške valjane vune koja ima specifičan prirodan miris i pruža nezamenjivu toplotu.'
        ]
      },
      {
        id: 'nosnja-u-21-veku',
        heading: 'Kako elemente nošnje nositi danas sa ponosom?',
        paragraphs: [
          'Ne morate obući kompletnu nošnju od glave do pete da biste iskazali poštovanje prema tradiciji. Pravi šarm leži u kombinovanju jednog autentičnog elementa sa savremenom garderobom.',
          'Autentični somotski jelek sa zlatnim gajtanima izgleda spektakularno preko jednostavne bele moderne košulje i crnih pantalona na svečanim večerama. Pletene vunene čarape sa cvetnim vezom donose nezapamćenu udobnost tokom zimskih dana, dok ručno tkana tkanica može poslužiti kao upečatljiv kaiš na modernom kaputu.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Šta je to zubun i po čemu se razlikuje od jeleka?',
        answer: 'Zubun je dugačak sukneni prsluk (obično do kolena ili bokova) izrađen od valjane vune bez rukava, otvoren spreda i bogato ukrašen vezom i aplikacijama čoje. Jelek je kratak prsluk (do struka), najčešće izrađen od somota ili čoje sa gajtanima.'
      },
      {
        question: 'Koliko košta kompletna autentična srpska narodna nošnja?',
        answer: 'Kompletna ručno izrađena narodna nošnja vrhunskog kvaliteta (košulja od pravog platna, vezeni jelek, tkanica, sukneni delovi, opanci) košta od nekoliko stotina do preko hiljadu evra, jer zahteva stotine sati rada nekoliko različitih zanatlija (tkalje, vezilje, terzije, opančara).'
      },
      {
        question: 'Kako se narodna nošnja čuva od moljaca i vlage?',
        answer: 'Suknene i vunene delove nošnje treba čuvati u prozračnim pamučnim navlakama (nikako u hermetičkim najlon kesama) uz dodatak prirodne sušene lavande ili grančica kedra. Pre odlaganja, nošnju je potrebno dobro provetriti u hladu.'
      },
      {
        question: 'Gde se najčešće kupuje prava narodna nošnja?',
        answer: 'Prava nošnja se naručuje direktno od sertifikovanih zanatskih radionica i majstora starih zanata (kao što je Savremeni Koreni), koji poseduju znanje o autentičnim krojnim linijama i tradicionalnim materijalima.'
      }
    ],
    conclusion: 'Srpska narodna nošnja je dragulj koji svedoči o lepoti, dostojanstvu i radinosti našeg naroda. Njenim nošenjem i naručivanjem čuvamo vatru naših predaka i dajemo joj novi život u 21. veku.'
  },
  {
    id: 'heklanje-vodic-kroz-heklani-nakit-cipku',
    slug: 'heklanje-vodic-kroz-heklani-nakit-tehnike-i-cipku',
    title: 'Heklanje od A do Š: Sve o Heklanom Nakitu, Heklicama, Koncima i Uštirkavanju',
    subtitle: 'Kompletan vodič kroz magiju heklice (kukičanja): od izbora debljine konca do stvaranja unikatnog heklanog nakita koji osvaja modne piste.',
    excerpt: 'Kako se heklanje razlikuje od pletenja? Koja heklica je idealna za fini rad, kako nastaju heklane minđuše i ogrlice i kako pravilno uštirkati rad? Saznajte sve tajne ovog zanata.',
    author: 'Tanja Petrić',
    authorRole: 'Dizajner i majstor heklanja, Savremeni Koreni',
    publishDate: '24. januar 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1190,
    category: 'heklanje',
    categoryLabel: 'Heklanje & Čipka',
    targetKeywords: [
      'heklanje',
      'heklani nakit',
      'kukičanje',
      'kako se hekla',
      'heklica za početnike',
      'konac za heklanje',
      'heklana čipka',
      'uštirkavanje heklanog rada',
      'unikatne heklane minđuše',
      'sheme za heklanje'
    ],
    coverImage: nakitImg,
    featured: false,
    relatedProductId: 'sk-nakit-01',
    sections: [
      {
        id: 'sta-je-heklanje',
        heading: 'Šta je heklanje i po čemu se razlikuje od pletenja?',
        paragraphs: [
          'Heklanje (u nekim krajevima poznato i kao kukičanje) je tehnika preplitanja niti pomoću jedne igle koja na svom vrhu ima malu kukicu (heklice). Dok se pri pletenju koristi dve ili pet igala i istovremeno drži na stotine otvorenih petlji, kod heklanja je u svakom trenutku aktivna samo jedna jedina petlja.',
          'Ova specifičnost heklanja daje neverovatnu slobodu kreiranja trodimenzionalnih oblika: heklicom se mogu stvarati savršene kružnice, cvetne latice, reljefni talasi i najnežnija paučinasta čipka. Upravo zato je heklanje postalo osnovna tehnika za izradu našeg unikatnog nakita.'
        ]
      },
      {
        id: 'izbor-alata-i-konca',
        heading: 'Izbor heklica i konca: Brojevi koji znače razliku',
        paragraphs: [
          'Za uspeh u heklanju najvažnije je uskladiti debljinu heklice sa debljinom konca. Oznake na metalnim heklicama označavaju debljinu kukice u milimetrima (npr. 0.75 mm, 1.0 mm, 1.5 mm, 2.5 mm). Što je heklica tanja, to su petlje sitnije i zbijenije.',
          'Za fini heklani nakit i čipku koristimo mercerizovani 100% pamučni konac visokog sjaja (oznaka 10, 20 ili 40). Mercerizacija je proces koji pamučnom vlaknu daje svilenkast odsjaj, veću čvrstinu i otpornost na habanje, što je od ključnog značaja za minđuše i ogrlice koje moraju zadržati svoj besprekoran oblik.'
        ],
        bulletPoints: [
          'Za heklani nakit: Heklice od 1.0 mm do 1.5 mm uz fini pamučni konac br. 20 ili 30.',
          'Za zimske kape i šalove: Heklice od 3.5 mm do 5.0 mm uz mekanu vunicu.',
          'Za čvrste makrame torbe: Heklice od 6.0 mm do 8.0 mm uz pamučne kanap pređe.'
        ]
      },
      {
        id: 'izrada-heklanog-nakita',
        heading: 'Kako nastaje unikatni heklani nakit brenda Savremeni Koreni?',
        paragraphs: [
          'Izrada heklanog nakita je mikro-umetnost koja zahteva izuzetnu preciznost i mirnu ruku. Svaki cvetić, kapljica ili geometrijski motiv hekla se desetinama minuta pod jakim svetlom.',
          'Nakon heklanja, komad prolazi kroz proces učvršćivanja i montiranja na antialergijske metalne osnove bez nikla (hirurški čelik ili pozlata). Zbog svoje perolake težine, heklane minđuše ne opterećuju i ne rastežu uho, pa se mogu udobno nositi tokom celog dana, privlačeći brojne poglede i komplimente.'
        ]
      },
      {
        id: 'recept-za-ustirkavanje',
        heading: 'Tajna uštirkavanja: Kako heklani rad učiniti čvrstim i postojanim?',
        paragraphs: [
          'Da bi heklani nakit ili tradicionalni milje stajao ravno i čvrsto, koristi se proces štirkanja. Naše bake su koristile prirodne recepte koji su i danas najbolji:',
          '1. Štirak od gustina (kukuruznog skroba): U malo hladne vode razmutite kašičicu gustina, pa je sipajte u šolju ključale vode uz neprekidno mešanje dok ne postane prozirna. Prohlađenim rastvorom natopite heklani rad, ocedite ga i zategnite čiđiodama na ravnoj stiropor ploči dok se potpuno ne osuši.',
          '2. Šećerni rastvor (za ekstremnu čvrstinu korpica i nakita): U tri kašike tople vode rastvorite pet kašika šećera. Ovaj rastvor daje staklastu čvrstinu koja traje mesecima.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Da li je heklanje teže naučiti od pletenja?',
        answer: 'Većina početnika smatra da je heklanje lakše savladati jer se radi sa samo jednom heklicom i jednom aktivnom petljom. Greške se kod heklanja ispravljaju jednostavnim povlačenjem konca bez rizika od rasplitanja celog rada.'
      },
      {
        question: 'Može li heklani nakit da se pokvasi na kiši?',
        answer: 'Heklani nakit brenda Savremeni Koreni je tretiran specijalnim zaštitnim slojem koji podnosi vlagu i sitnu kišu. Ipak, preporučuje se skidanje pre kupanja ili plivanja kako bi se zadržala dugotrajna čvrstina.'
      },
      {
        question: 'Kako očistiti heklani nakit ako se zaprlja?',
        answer: 'Dovoljno je nežno prebrisati zaprljani deo mekanom četkicom umočenom u blagi sapunski rastvor, isprati čistom vlažnom krpicom i ostaviti da se osuši na ravnoj površini.'
      }
    ],
    conclusion: 'Heklanje pruža beskrajne mogućnosti za izražavanje kreativnosti. Naš heklani nakit nosi dah starinske čipke pretočen u modernu nosivu formu koja nikoga ne ostavlja ravnodušnim.'
  },
  {
    id: 'rucno-cvorovanje-makrame-torbe-drvo',
    slug: 'rucno-cvorovanje-makrame-torbe-kanap-i-drvo',
    title: 'Ručno Čvorovanje (Makrame): Kompletan Vodič Kroz Čvorove, Kanap i Izradu Unikatnih Torbi',
    subtitle: 'Arhitektura čvora bez igala i mašina: kako pamučna užad i prirodno hrastovo drvo stvaraju najtraženije eko-torbice današnjice.',
    excerpt: 'Zanima vas šta je ručno čvorovanje, koji su osnovni makrame čvorovi i kako nastaje torba sa drvenim ručkama? Pročitajte naš detaljan vodič kroz materijale, nosivost i održavanje.',
    author: 'Tanja Petrić',
    authorRole: 'Autor rukotvorina, Savremeni Koreni',
    publishDate: '15. januar 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1140,
    category: 'rucno-cvorovanje',
    categoryLabel: 'Ručno Čvorovanje (Makrame)',
    targetKeywords: [
      'ručno čvorovanje',
      'makrame',
      'makrame torbica',
      'kako se pravi makrame',
      'osnovni makrame čvorovi',
      'kanap za makrame',
      'torba sa drvenim ručkama',
      'ravni čvor',
      'spiralni čvor',
      'eko modni aksesoari'
    ],
    coverImage: etnoUnikatnaTorbaImg,
    featured: false,
    relatedProductId: 'sk-torba-01',
    sections: [
      {
        id: 'poreklo-makramea',
        heading: 'Šta je ručno čvorovanje i odakle potiče umetnost makramea?',
        paragraphs: [
          'Ručno čvorovanje (internacionalno poznato kao makrame, od arapske reči migramah – ukrasna resa) predstavlja drevnu veštinu stvaranja tekstilnih struktura isključivo vezivanjem različitih vrsta čvorova prstima, bez upotrebe igala, heklica ili razboja.',
          'Mornari su vekovima tokom dugih plovidbi koristili ovu tehniku za učvršćivanje brodske užadi i kraćenje vremena, stvarajući pojaseve i viseće ležaljke. Danas je ručno čvorovanje doživelo spektakularan povratak kao simbol održive, ekološke i spore mode (slow fashion).'
        ]
      },
      {
        id: 'osnovni-cvorovi',
        heading: 'Osnovni makrame čvorovi: Tri temelja svake torbe',
        paragraphs: [
          'Iako postoji na stotine složenih kombinacija, suština svakog makrame predmeta leži u savladavanju tri osnovna čvora:',
          '1. Kockasti (ravni) čvor (Square knot): Najvažniji strukturni čvor koji se formira od četiri niti (dve noseće u sredini i dve radne sa strana). Izuzetno je jak, ravan i stvara stabilnu mrežu torbice koja se ne rasteže pod teretom.',
          '2. Spiralni čvor (Spiral knot): Izvodi se ponavljanjem samo jedne polovine ravnog čvora. Zbog asimetrije, niti same počinju da se spiralno uvijaju, stvarajući prelepe uvijene kaiševe za rame.',
          '3. Rebrasti čvor (Clove hitch): Omogućava kreiranje dijagonalnih, horizontalnih i lučnih reljefnih linija koje uokviruju uzorke na prednjem delu torbe.'
        ]
      },
      {
        id: 'spoj-sa-drvenim-ruckama',
        heading: 'Zašto biramo prirodno drvo hrasta i bukve za ručke?',
        paragraphs: [
          'Plastične i metalne ručke mogu delovati hladno i sintetički. U našoj radionici u Jošanici koristimo isključivo ručno sečene i fino brušene ručke od punog hrastovog i bukovog drveta, zaštićene prirodnim pčelinjim voskom i lanenim uljem.',
          'Drvene ručke pružaju čvrstu osnovu za početni red čvorova, a tokom nošenja leže toplo i prijatno u dlanu. Kombinacija svetlog pamučnog kanapa, toplih tonova hrasta i vezenog cvetnog detalja na prednjoj strani stvara neprolaznu estetiku.'
        ],
        bulletPoints: [
          'Izdržljivost: Pravilno vezana makrame torbica bez problema podnosi teret od 4 do 6 kilograma.',
          'Eko materijali: 100% reciklirani pamuk bez veštačkih boja i masivno drvo.',
          'Univerzalnost: Podjednako prikladna za letnji odlazak na plažu, poslovni ručak ili večernji izlazak.'
        ],
        image: torbicaImg,
        imageCaption: 'Ručno izrađena etno torbica sa autentičnim vezom i drvenim ručkama'
      }
    ],
    faqs: [
      {
        question: 'Koji kanap je najbolji za početnike u ručnom čvorovanju?',
        answer: 'Za početnike se preporučuje pleteni pamučni kanap debljine 3 mm ili 4 mm sa jezgrom, jer se ne raspliće lako tokom rada i omogućava jednostavno rasplitanje u slučaju greške.'
      },
      {
        question: 'Kako se održava i pere makrame torba sa drvenim ručkama?',
        answer: 'Makrame torba se pere ručno, blagim pritiskom u mlakoj vodi sa sapunicom. Drvene ručke treba čuvati od potpunog potapanja u vodu; dovoljno ih je prebrisati vlažnom krpom i povremeno premazati kapljicom maslinovog ili lanenog ulja.'
      },
      {
        question: 'Koliko kanapa je potrebno za jednu torbu?',
        answer: 'Za torbicu srednje veličine sa drvenim ručkama obično je potrebno između 80 i 120 metara pamučnog kanapa, zavisno od gustine čvorova i dužine resa.'
      }
    ],
    conclusion: 'Ručno čvorovanje podseća nas na moć ljudskih prstiju da iz običnog konopca stvore umetničko delo. Naše makrame torbice su napravljene da traju, prateći vas u svakom koraku kroz svakodnevicu.'
  },
  {
    id: 'vunene-carape-pletene-na-pet-igala',
    slug: 'vunene-carape-pletenje-na-pet-igala-lekovitost-vune',
    title: 'Pletenje na Pet Igala i Lekovita Domaća Vuna: Vodič Kroz Vunene Čarape i Nazuvice',
    subtitle: 'Tajna kružnog pletenja bez šavova, prirodni lanolin i reljefni cvetni vez – zašto su domaće vunene čarape najtopliji dar zdravlja.',
    excerpt: 'Zašto su naše bake uvek plele čarape na tačno pet igala? Otkrijte lekovite tajne domaće neprerađene vune, kako nastaje bešavna peta i kako se pravilno održavaju pleteni komadi.',
    author: 'Tanja Petrić',
    authorRole: 'Majstor pletenja, Savremeni Koreni',
    publishDate: '04. januar 2026.',
    readingTime: '8 min čitanja',
    wordCount: 1160,
    category: 'pletenje',
    categoryLabel: 'Pletenje na Pet Igala',
    targetKeywords: [
      'vunene čarape',
      'pletenje na pet igala',
      'kako se pletu čarape',
      'domaća vuna',
      'lekovitost vune',
      'nazuvice',
      'cvetni vez na vuni',
      'termoregulacija vune',
      'kako oprati vunene čarape'
    ],
    coverImage: carapeImg,
    featured: false,
    relatedProductId: 'sk-carape-01',
    sections: [
      {
        id: 'tehnika-pet-igala',
        heading: 'Zašto baš pet igala? Tehnika kružnog pletenja bez grubih šavova',
        paragraphs: [
          'Kada posmatrate iskusnu pletilju dok radi na pet igala, to izgleda kao skladan ritmički ples metala i vune. Četiri igle drže raspoređene petlje u savršenom krugu, dok peta igla plete novi red. Ova tehnika ima jednu ključnu anatomsku prednost: čarapa se formira u obliku cevi i nema nijedan bočni šav!',
          'Industrijske jeftine čarape obično se šiju sa debelim šavom preko prstiju i sa strane koji žulja u obući i izaziva žuljeve. Čarapa pletena na pet igala savršeno prati liniju stopala, prilagođava se peti i risu, omogućavajući potpuno slobodno kretanje i vrhunsku udobnost.'
        ]
      },
      {
        id: 'lekovita-svojstva-vune',
        heading: 'Zdravstvena tajna prave domaće vune: Lanolin i mikromasaža',
        paragraphs: [
          'Domaća vuna sa homoljskih pašnjaka koju koristimo u radionici Savremeni Koreni nije izložena teškim industrijskim kiselinama koje uklanjaju prirodni lanolin (ovčiji vosak). Lanolin je poznat po svojim blagotvornim svojstvima za kožu, smiruje iritacije i deluje blago antiseptično.',
          'Pored toga, prirodna vlakna vune vrše neprekidnu, mikroskopsku masažu perifernih nervnih završetaka i kapilara u tabanima. To podstiče cirkulaciju krvi, zbog čega su prave vunene čarape nezamenjiv lek za ljude koji pate od hronično hladnih nogu, reume i slabe cirkulacije.',
          'Prirodna vuna je jedinstven termoregulator: ona može da apsorbuje vlagu do 33% svoje težine a da na dodir ostane topla i suva. Zato se u pravoj vuni noge nikada ne znoje neprijatno kao u sintetičkim akrilnim čarapama.'
        ],
        quote: {
          text: 'Obuti prave domaće vunene čarape isto je što i uneti blagu toplotu planinskog ognjišta pravo u svoje korake.',
          caption: 'O tradiciji i zdravlju domaće vune'
        }
      },
      {
        id: 'cvetni-vez-na-vuni',
        heading: 'Cvetni vez na pletenoj podlozi: Spoj dva zanata',
        paragraphs: [
          'Ono što vunene čarape brenda Savremeni Koreni izdvaja jeste završni cvetni vez. Na debeloj, toploj vunenoj podlozi, pomoću igle i raznobojnog konca vezemo reljefne cvetove u plamenim crvenim, roze i smaragdnim tonovima.',
          'Ovaj spoj grublje teksture vune i nežnih cvetnih latica pretvara jednostavne zimske čarape u umetnički predmet koji budi nostalgiju za detinjstvom i toplinom bakinog doma.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Zašto bockaju neke vunene čarape i kako to sprečiti?',
        answer: 'Blago bockanje potiče od debljih zaštitnih vlakana prirodne vune koja zapravo podstiču cirkulaciju. Ako imate izrazito osetljivu kožu, potopite čarape u mlaku vodu sa nekoliko kapi regeneratora za kosu – vlakna će omekšati i postati svilenkasta na dodir.'
      },
      {
        question: 'Kako se pravilno peru pletene vunene čarape da se ne skupe?',
        answer: 'Isključivo u mlakoj ili hladnoj vodi (nikada preko 30°C) uz blagi tečni deterdžent za vunu. Nikada ih nemojte prati u mašini sa vrelom vodom niti centrifugirati, jer će doći do ućebavanja (filcanja) i drastičnog smanjenja veličine.'
      },
      {
        question: 'Koliko vremena traje pletenje jednog para čarapa na 5 igala?',
        answer: 'Iskusnoj pletilji za jedan par čarapa sa oblikovanom petom, ojačanim prstima i ručnim cvetnim vezom potrebno je između 12 i 18 radnih sati.'
      }
    ],
    conclusion: 'Vunene čarape nisu samo zaštita od zime; one su čuvari zdravlja, topline i porodične ljubavi prenete kroz vešte prste i pet igala.'
  },
  {
    id: 'tajna-homoljskih-subara-prirodno-krzno',
    slug: 'srpska-subara-prirodno-krzno-homolje-vodic',
    title: 'Tradicionalna Šubara: Sve o Prirodnom Krznu, Veličinama, Održavanju i Homoljskom Zanatu',
    subtitle: 'Kruna srpskog muškog i ženskog zimskog stila: zašto autentična šubara od pravog krzna sa vezenom trakom nema konkurenciju.',
    excerpt: 'Koja je razlika između šubare od jagnjećeg krzna i industrijskih kapa? Kako odrediti savršenu veličinu, zašto je vezena traka zaštitni znak i kako održavati krzno decenijama.',
    author: 'Tanja Petrić',
    authorRole: 'Osnivač brenda Savremeni Koreni',
    publishDate: '18. januar 2026.',
    readingTime: '7 min čitanja',
    wordCount: 1080,
    category: 'subare',
    categoryLabel: 'Tradicionalne Šubare',
    targetKeywords: [
      'šubara',
      'srpska šubara',
      'zimska kapa krzno',
      'jagnjeće krzno',
      'šubara sa vezenom trakom',
      'kako izmeriti obim glave',
      'održavanje krznene šubare',
      'homoljska šubara',
      'etno kape Srbija'
    ],
    coverImage: subaraImg,
    featured: false,
    relatedProductId: 'sk-subara-01',
    sections: [
      {
        id: 'simbolika-subare',
        heading: 'Šubara: Simbol ponosa, dostojanstva i planinske zime',
        paragraphs: [
          'Šubara je vekovima bila najprepoznatljiviji deo zimske nošnje srpskog seljaka, ratnika, pesnika i gorštaka. U surovim zimskim uslovima Homolja i Beljanice, gde vetrovi nose sve pred sobom, šubara od pravog ovčijeg i jagnjećeg krzna bila je pouzdan štit koji je čuvao glavu i zdravlje.',
          'U radionici Savremeni Koreni zadržali smo tu bezvremensku krojnu formu, ali smo je prilagodili modernom dobu: koristimo najfinije, pažljivo selektovano krzno izuzetne mekoće i unutrašnju postavu od termo-satena koja garantuje maksimalnu udobnost bez bockanja ili pritiska.'
        ]
      },
      {
        id: 'vezena-traka-detalj',
        heading: 'Ručno vezena bordurna traka: Pečat Savremenih Korena',
        paragraphs: [
          'Ono što naše šubare čini unikatnim na tržištu jeste ručno izrađena i izvezena etno traka koja prati donji obod kape. Na njoj vezemo diskretne arhaične simbole u zlatastim, bronzanim i crvenim tonovima.',
          'Ovaj detalj transformiše tradicionalnu lovačku i planinsku kapu u luksuzan modni aksesoar koji jednako privlači poglede na beogradskim bulevarima, planinskim ski-centrima Kopaonika i Zlatibora ili na svečanim skupovima.'
        ]
      },
      {
        id: 'odredjivanje-velicine',
        heading: 'Kako pravilno izmeriti obim glave za savršenu šubaru?',
        paragraphs: [
          'Krojački santimetar postavite preko sredine čela, tačno 1 do 1.5 cm iznad obrva, i obavijte ga oko najisturenijeg dela potiljka. Dobijeni broj u centimetrima (najčešće između 56 cm i 61 cm) predstavlja vašu tačnu veličinu.',
          'Šubara mora stajati komotno, stabilno, bez stiskanja čela. Pošto je izrađena od prirodnih materijala, ona se nakon nekoliko nošenja nežno formira prema jedinstvenom obliku vaše glave.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Šta uraditi ako šubara od prirodnog krzna pokisne ili padne pod sneg?',
        answer: 'Nemojte paničiti! Samo nežno otresite kapi vode sa krzna i ostavite je da se prirodno osuši na sobnoj temperaturi, dalje od radijatora ili grejalica. Kada se potpuno osuši, lagano je pročešljajte mekom četkom u pravcu rasta dlake.'
      },
      {
        question: 'Zašto je prirodno krzno bolje od veštačkog (eko krzna)?',
        answer: 'Prirodno krzno poseduje mikropore kroz koje koža glave diše, sprečavajući pregrevanje i znojenje glave. Takođe, pravo krzno traje decenijama bez linjanja i stvaranja neprijatnih mirisa, za razliku od sintetičkih poliesterskih kapa.'
      },
      {
        question: 'Kako se šubara odlaže preko leta?',
        answer: 'Čuva se u suvoj, prozračnoj pamučnoj vreći, uz dodatak prirodne lavande ili kedrovog drveta protiv moljaca. Izbegavajte plastične kese kako krzno ne bi izgubilo vlažnost i elastičnost.'
      }
    ],
    conclusion: 'Prava srpska šubara nosi se uzdignute glave. Ona je dokaz da vrhunska funkcionalnost i tradicionalni stil mogu zajedno stvarati toplinu za ceo život.'
  }
];

export const blogPostsData: BlogPost[] = [
  ...initialBlogPosts,
  ...costumesAndHeritageArticles,
  ...craftsAndGiftsArticles,
  ...bagsAndSewingArticles,
  ...macrameAndYarnArticles,
  ...homoljeAndTraditionArticles
];

