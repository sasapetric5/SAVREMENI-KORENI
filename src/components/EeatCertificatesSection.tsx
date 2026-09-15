import React, { useState } from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2, MapPin, Users, HeartHandshake, Scroll, Feather, ExternalLink, ChevronRight, Star, BookmarkCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { companyDetails } from '../data/companyData';

interface FairItem {
  name: string;
  nameEn: string;
  location: string;
  role: string;
  roleEn: string;
  year: string;
  badge: string;
  badgeEn: string;
}

const fairsList: FairItem[] = [
  {
    name: 'Međunarodni sajam turizma u Beogradu',
    nameEn: 'Belgrade International Tourism Fair',
    location: 'Beogradski sajam, Hala tradicije i starih zanata',
    role: 'Izlagač i demonstrator arhaičnog homoljskog veza i nošnje',
    roleEn: 'Exhibitor & Demonstrator of archaic Homolje embroidery & folk costume',
    year: 'Redovan učesnik',
    badge: 'Zvanični izlagač',
    badgeEn: 'Official Exhibitor'
  },
  {
    name: 'Smotra narodnog stvaralaštva "Homoljski motivi"',
    nameEn: '"Homoljski Motivi" Folk Heritage Assembly',
    location: 'Kučevo (najstarija smotra izvornog stvaralaštva u Srbiji)',
    role: 'Prikaz autentične bele vlaške šubare i vezenih čarapa',
    roleEn: 'Presentation of authentic white Vlach fur hats and folklore socks',
    year: 'Višegodišnji laureat',
    badge: 'Čuvar tradicije',
    badgeEn: 'Tradition Keeper'
  },
  {
    name: 'Sabor "Vrela Homolja"',
    nameEn: '"Vrela Homolja" Ethno Assembly',
    location: 'Žagubica, srce Homoljskog okruga',
    role: 'Glavni izlagač autorskih radova i unikatne narodne nošnje',
    roleEn: 'Lead Exhibitor of artisan folk costumes and wool crafts',
    year: 'Domaćin i učesnik',
    badge: 'Homoljski pečat',
    badgeEn: 'Homolje Heritage'
  },
  {
    name: 'Sajam etno hrane, pića i tradicijskih rukotvorina',
    nameEn: 'Ethno Crafts & Cultural Heritage Fair',
    location: 'Šumadija sajam & regionalne etno manifestacije',
    role: 'Promocija 100% prirodne homoljske vune i ručnog pletenja na 5 igala',
    roleEn: 'Promotion of 100% pure local wool and 5-needle hand knitting',
    year: 'Godišnja smotra',
    badge: '100% Prirodno',
    badgeEn: '100% Natural'
  }
];

export const EeatCertificatesSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState<'certificates' | 'fairs' | 'craftsmanship'>('certificates');

  return (
    <section id="sertifikati-kvalitet" className="py-20 bg-[#FAF7F2] text-[#241D19] border-b border-[#E8E0D5] relative overflow-hidden">
      {/* Background Subtle Heritage Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#9E3E26_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3E26]/10 text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#9E3E26]" />
            <span>{isEn ? 'E-E-A-T Authority & Provenance' : 'E-E-A-T Garancija & Znak Kvaliteta'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#241D19]">
            {isEn ? 'Certificates, Fairs & Handcrafted Heritage' : 'Sertifikati, Sajmovi i Znak Autentičnosti'}
          </h2>

          <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
            {isEn
              ? 'Every piece from the Savremeni Koreni atelier represents verified master craftsmanship, certified old traditional handicraft methods, and living ethnological legacy from Eastern Serbia.'
              : 'Svaki rad iz ateljea Savremeni Koreni nosi uverenje o statusu tradicionalnog zanata, višedecenijsko majstorsko iskustvo Tanje Petrić i priznanja sa najvažnijih smotri tradicije u Srbiji.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white border border-[#E8E0D5] rounded-2xl shadow-2xs">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-[#9E3E26] text-white shadow-xs'
                  : 'text-[#241D19]/70 hover:text-[#241D19] hover:bg-[#FAF7F2]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isEn ? 'Quality Marks & Badges' : 'Znak kvaliteta & Sertifikati'}</span>
            </button>

            <button
              onClick={() => setActiveTab('fairs')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'fairs'
                  ? 'bg-[#9E3E26] text-white shadow-xs'
                  : 'text-[#241D19]/70 hover:text-[#241D19] hover:bg-[#FAF7F2]'
              }`}
            >
              <Scroll className="w-4 h-4" />
              <span>{isEn ? 'Fairs & Exhibitions' : 'Sajmovi & Smotre'}</span>
            </button>

            <button
              onClick={() => setActiveTab('craftsmanship')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'craftsmanship'
                  ? 'bg-[#9E3E26] text-white shadow-xs'
                  : 'text-[#241D19]/70 hover:text-[#241D19] hover:bg-[#FAF7F2]'
              }`}
            >
              <Feather className="w-4 h-4" />
              <span>{isEn ? 'Folklore & Master Expertise' : 'KUD Saradnja & Majstorstvo'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Certificates & Quality Badges */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {/* Card 1: Traditional Craft Status */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E0D5] shadow-xs flex flex-col justify-between space-y-5 hover:border-[#9E3E26]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#9E3E26]/10 text-[#9E3E26] flex items-center justify-center font-serif text-xl font-bold shadow-2xs">
                  <BookmarkCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E3E26] block">
                    {isEn ? 'Certified Traditional Craft' : 'Status tradicionalnog zanata'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#241D19]">
                    {isEn ? 'Open Hand Quality Mark' : 'Znak autentičnog ručnog rada'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#241D19]/75 leading-relaxed">
                  {isEn
                    ? 'Handicraft certification for ancient textile techniques, acknowledging archaic 5-needle knitting, flat & relief embroidery, and authentic fur shaping without industrial automation.'
                    : 'Priznati status ručne zanatske proizvodnje tekstilnih predmeta i narodne nošnje po kriterijumima očuvanja starih i umetničkih zanata.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5]/70 space-y-2 text-xs text-[#241D19]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6852] shrink-0" />
                  <span>{isEn ? '100% Handmade without machinery' : '100% ručni rad bez fabričkih mašina'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6852] shrink-0" />
                  <span>{isEn ? 'Archival patterns of Eastern Serbia' : 'Arhaični motivi i krojevi istočne Srbije'}</span>
                </div>
              </div>
            </div>

            {/* Card 2: 100% Natural Provenance */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E0D5] shadow-xs flex flex-col justify-between space-y-5 hover:border-[#9E3E26]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#4E6852]/10 text-[#4E6852] flex items-center justify-center font-serif text-xl font-bold shadow-2xs">
                  <Star className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#4E6852] block">
                    {isEn ? 'Material Origin & Ecology' : 'Ekološko poreklo materijala'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#241D19]">
                    {isEn ? 'Homolje Mountain Fleece' : '100% Prirodna domaća vuna'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#241D19]/75 leading-relaxed">
                  {isEn
                    ? 'Directly sourced virgin sheep wool and natural shearling fur from the Homolje highlands. Unbleached, naturally insulating, and rich in natural protective lanolin.'
                    : 'Čista ovčija i jagnjeća vuna sa homoljskih pašnjaka i prirodno krzno. Hipoalergijska svojstva, prirodna toplotna regulacija i dugovečnost kroz decenije.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5]/70 space-y-2 text-xs text-[#241D19]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6852] shrink-0" />
                  <span>{isEn ? 'Eco-friendly & biodegradable' : 'Biorazgradivo i ekološki čisto'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6852] shrink-0" />
                  <span>{isEn ? 'Thermal balance in all seasons' : 'Prirodna termoregulacija i udobnost'}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Legal & Consumer Trust */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E0D5] shadow-xs flex flex-col justify-between space-y-5 hover:border-[#9E3E26]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#C2872A]/15 text-[#C2872A] flex items-center justify-center font-serif text-xl font-bold shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C2872A] block">
                    {isEn ? 'Legal Guarantee & Compliance' : 'Pravna sigurnost & APR'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#241D19]">
                    {isEn ? 'Registered Master Artisan' : 'Zvanično registrovana radnja'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#241D19]/75 leading-relaxed">
                  {isEn
                    ? `Officially registered with the Serbian Business Registers Agency (PIB: ${companyDetails.pib}, MB: ${companyDetails.maticniBroj}). Fully compliant with consumer rights and international exports.`
                    : `Zvanično registrovana zanatska radnja kod APR Srbije (PIB: ${companyDetails.pib}, MB: ${companyDetails.maticniBroj}). Izdavanje fiskalnih računa, faktura i legalno slanje za inostranstvo.`}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5]/70 space-y-2 text-xs text-[#241D19]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6852] shrink-0" />
                  <span>{isEn ? '3D Secure card & bank payments' : 'Kartično i žiralno plaćanje'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E6852] shrink-0" />
                  <span>{isEn ? 'Worldwide tracked postal delivery' : 'Preporučene pošiljke sa kodom za praćenje'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Fairs & Cultural Assemblies */}
        {activeTab === 'fairs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {fairsList.map((fair, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#E8E0D5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#9E3E26]/10 text-[#9E3E26] text-[11px] font-bold">
                      <Award className="w-3.5 h-3.5" />
                      {isEn ? fair.badgeEn : fair.badge}
                    </span>
                    <span className="text-xs font-mono text-[#241D19]/50 font-semibold">{fair.year}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#241D19] pt-1">
                    {isEn ? fair.nameEn : fair.name}
                  </h3>

                  <p className="text-xs font-medium text-[#9E3E26] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{fair.location}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-[#241D19]/75 pt-1 leading-relaxed">
                    {isEn ? fair.roleEn : fair.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E0D5]/70 flex items-center justify-between text-xs text-[#241D19]/60">
                  <span>{isEn ? 'Cultural Continuity' : 'Očuvanje etnološkog nasleđa'}</span>
                  <span className="font-bold text-[#4E6852]">Homolje • Srbija</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Master Craftsmanship & KUD Folklore Collaboration */}
        {activeTab === 'craftsmanship' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D5] shadow-xs space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3E26]/10 text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Master Artisan Biography' : 'Majstorsko zaveštanje i biografija'}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19]">
                  {isEn ? 'Tanja Petrić — 25+ Years of Handcrafting Mastery' : 'Tanja Petrić — Preko 25 godina očuvanja tradicije'}
                </h3>

                <p className="text-sm text-[#241D19]/80 leading-relaxed">
                  {isEn
                    ? 'Born and living in Jošanica at the foot of the Homolje mountains, Tanja Petrić learned the sacred discipline of 5-needle knitting and archaic embroidery stitches from village grandmothers. Today, her atelier supplies cultural clubs, folk ensembles, collectors, and diaspora families worldwide.'
                    : 'Rođena i stvara u selu Jošanica u srcu Homolja, Tanja Petrić je nasledila tajne arhaičnog veza, pokrstice, zlatoveza i pletenja na 5 igala od seoskih tkalja i pletilja. Danas njeni unikati krase folklorne ansamble, muzejske izložbe i domove naših ljudi širom sveta.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
                    <span className="text-2xl font-serif font-bold text-[#9E3E26] block">25+</span>
                    <span className="text-xs text-[#241D19]/70">{isEn ? 'Years of Experience' : 'Godina majstorskog rada'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
                    <span className="text-2xl font-serif font-bold text-[#4E6852] block">500+</span>
                    <span className="text-xs text-[#241D19]/70">{isEn ? 'Folk Socks Handcrafted' : 'Izrađenih vezenih čarapa'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]">
                    <span className="text-2xl font-serif font-bold text-[#C2872A] block">15+</span>
                    <span className="text-xs text-[#241D19]/70">{isEn ? 'Countries Delivered' : 'Zemalja u koje šaljemo'}</span>
                  </div>
                </div>
              </div>

              {/* KUD Collaboration Callout */}
              <div className="lg:col-span-4 bg-[#FAF7F2] rounded-xl p-5 border border-[#E8E0D5] space-y-3">
                <div className="flex items-center gap-2 text-[#9E3E26] font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>{isEn ? 'Folklore Ensembles (KUD)' : 'Izrada za KUD i Folklor'}</span>
                </div>
                <p className="text-xs text-[#241D19]/80 leading-relaxed">
                  {isEn
                    ? 'We design matching sets of embroidered wool socks and stage-authentic costume parts for folklore groups in Serbia, Republika Srpska, Switzerland, Germany, Austria, and USA according to specific regional motifs.'
                    : 'Izrađujemo unikatne serije vezenih čarapa, pojaseva i delova narodne nošnje po specifičnim motivima vašeg kraja ili koreografije za KUD-ove u Srbiji i dijaspori.'}
                </p>
                <div className="pt-2 text-xs font-semibold text-[#9E3E26]">
                  ✓ {isEn ? 'Bespoke bulk orders & custom sizing' : 'Mogućnost grupnih porudžbina po meri'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
