import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Feather, Compass, CheckCircle2, Camera } from 'lucide-react';
import { craftSteps, companyDetails } from '../data/companyData';
const heroImg = '/images/savremeni_hero_banner_1789021835867.jpg';
import { useLogo } from '../context/LogoContext';
import { useLanguage } from '../context/LanguageContext';

export const BrandStory: React.FC = () => {
  const { logoUrl, openUploadModal } = useLogo();
  const { t, isEn } = useLanguage();

  const craftStepsEn = [
    {
      step: '01',
      title: 'Inspiration & Archival Motifs',
      description: 'Studying historic patterns of Balkan folk costumes, tapestries, and traditional embroidery to create fresh modern designs.',
    },
    {
      step: '02',
      title: 'Natural Material Selection',
      description: 'Selecting pure domestic linen, 100% virgin wool, cotton embroidery threads, and genuine soft lambskin fur.',
    },
    {
      step: '03',
      title: 'Patient Master Needlework',
      description: 'Hours of devoted stitch-by-stitch embroidery, crochet loops, five-needle knitting, and macramé braiding in Jošanica.',
    },
    {
      step: '04',
      title: 'Heirloom with a Story & Soul',
      description: 'Each piece receives a certificate of authentic handcraft, carefully packaged in gift boxing and delivered to your doorstep.',
    },
  ];

  const stepsToRender = isEn ? craftStepsEn : craftSteps;

  return (
    <section id="o-nama" className="py-20 bg-[#FAF7F2] text-[#241D19] border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4E8E3] text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.storyBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D19] tracking-tight">
            {t.storyTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#241D19]/75 leading-relaxed font-normal">
            {t.storySubtitle}
          </p>
        </motion.div>

        {/* Two-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19]">
              {isEn ? 'The Journey of Tanja Petrić and the Jošanica Studio' : 'Priča Tanje Petrić i radionice u Jošanici'}
            </h3>
            
            <p className="text-sm sm:text-base text-[#241D19]/85 leading-relaxed">
              {t.storyP1}
            </p>

            <p className="text-sm sm:text-base text-[#241D19]/85 leading-relaxed">
              {t.storyP2}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E8E0D5] shadow-2xs">
                <h4 className="font-serif font-bold text-base text-[#9E3E26] flex items-center gap-2 mb-1">
                  <Feather className="w-4 h-4" />
                  {t.storyCard3Title}
                </h4>
                <p className="text-xs text-[#241D19]/75">
                  {t.storyCard3Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E0D5] shadow-2xs">
                <h4 className="font-serif font-bold text-base text-[#4E6852] flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4" />
                  {t.storyCard1Title}
                </h4>
                <p className="text-xs text-[#241D19]/75">
                  {t.storyCard1Desc}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-[#241D19]/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4E6852]" />
                {isEn ? 'Needle-by-needle handwork' : 'Ručni vez igla po igla'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4E6852]" />
                {isEn ? 'Bespoke design' : 'Unikatan dizajn'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4E6852]" />
                {isEn ? 'Custom tailoring' : 'Izrada po merama'}
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src={heroImg}
                alt="Detalji ručnog rada Savremeni Koreni"
                className="w-full h-[420px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              
              {/* Luxury Brand Emblem Badge */}
              <div className="absolute top-4 right-4 bg-[#1A1512]/90 backdrop-blur-md rounded-full py-1.5 px-3 border border-[#C2872A]/70 shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C2872A] shrink-0">
                  <img
                    src={logoUrl}
                    alt="Emblem"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[11px] font-serif text-[#E8D0A9] font-medium tracking-wide">
                  „{t.brandTagline}“
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <span className="text-xs font-semibold tracking-widest text-[#E8D0A9] uppercase block mb-1">
                  {isEn ? 'Author Craftsmanship' : 'Autorsko stvaralaštvo'}
                </span>
                <p className="font-serif text-lg font-bold">
                  {t.storyQuote}
                </p>
                <p className="text-xs text-white/80 mt-1">
                  — {t.storyOwnerTitle}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Steps of Craftsmanship */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E8E0D5] shadow-sm"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19]">
              {isEn ? 'How Is Your Unique Piece Born?' : 'Kako nastaje vaš unikat?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#241D19]/70 mt-1">
              {isEn ? 'From traditional concept to finished piece ready for wearing' : 'Od tradicionalne zamisli do gotovog predmeta spremnog za nošenje'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsToRender.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]/70 relative group hover:border-[#9E3E26]/40 transition-all hover:shadow-xs"
              >
                <span className="text-3xl font-serif font-extrabold text-[#9E3E26]/30 group-hover:text-[#9E3E26] transition-colors block mb-2">
                  {step.step}
                </span>
                <h4 className="font-serif font-bold text-base text-[#241D19] mb-2">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-[#241D19]/75">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Official Brand Seal & Symbolism Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-[#1A1512] text-[#FAF7F2] rounded-2xl p-8 sm:p-12 border-2 border-[#C2872A]/60 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2872A]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Logo Emblem Spotlight */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <button
                onClick={openUploadModal}
                title="Kliknite da zamenite ili postavite originalni logo (luxury_black_gold_emblem.jpg)"
                className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#C2872A] shadow-2xl bg-black group transition-transform duration-500 hover:scale-105 cursor-pointer"
              >
                <img
                  src={logoUrl}
                  alt="Zvanični amblem brenda Savremeni Koreni"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1.5">
                  <Camera className="w-6 h-6 text-[#E8D0A9]" />
                  <span>{isEn ? 'Change emblem' : 'Zamenite amblem'}</span>
                </div>
              </button>
              <span className="text-xs uppercase tracking-widest text-[#E8D0A9] font-bold mt-4 block">
                {isEn ? 'Official Trademark Emblem' : 'Zvanični zaštitni znak radionice'}
              </span>
              <p className="font-serif text-lg text-white font-semibold mt-1">
                Savremeni Koreni • Tanja Petrić
              </p>
              <button
                onClick={openUploadModal}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#E8D0A9]/80 hover:text-white underline cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{isEn ? 'Upload custom logo image' : 'Učitaj originalni luxury_black_gold_emblem.jpg'}</span>
              </button>
            </div>

            {/* Symbolism Breakdown */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#C2872A] font-semibold">
                  {isEn ? 'Symbolism and Visual Identity' : 'Simbolika i vizuelni identitet'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  „{t.brandTagline}“
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
                  {isEn 
                    ? 'Our emblem is a visual manifesto and heartfelt dedication to the cultural heritage of Homolje and Serbia:'
                    : 'Naš amblem nije samo grafički znak, već vizuelni manifest i posveta nasleđu Homolja i Srbije:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <h4 className="font-serif text-sm font-bold text-[#E8D0A9]">
                    📖 {isEn ? 'The Open Book of Roots' : 'Otvorena knjiga korena'}
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                    {isEn 
                      ? 'Represents folklore, wisdom of our ancestors, and recorded local history from which we draw our design inspiration.'
                      : 'Predstavlja predanje, mudrost predaka i zabeleženu istoriju naših krajeva iz koje crpimo inspiraciju.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <h4 className="font-serif text-sm font-bold text-[#E8D0A9]">
                    🌳 {isEn ? 'Macramé Tree of Life' : 'Drvo Života od makramea'}
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                    {isEn 
                      ? 'Crown woven from yarn and intricate knots symbolizes continuous growth and contemporary reinterpretation of old crafts.'
                      : 'Krošnja istkana od niti i čvorova simbolizuje večni rast i savremenu interpretaciju starih zanata.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <h4 className="font-serif text-sm font-bold text-[#E8D0A9]">
                    ✨ {isEn ? 'Fringes and Golden Beads' : 'Rese i zlatne perle'}
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                    {isEn 
                      ? 'A mark of painstaking needlework, patient embroidery, and refined finishing touches for every single piece.'
                      : 'Simbol unikatnog ručnog rada, strpljivog veza i pažljive završne obrade svakog pojedinačnog predmeta.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <h4 className="font-serif text-sm font-bold text-[#E8D0A9]">
                    ⭕ {isEn ? 'Golden Circle of Eternity' : 'Zlatni krug večnosti'}
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                    {isEn 
                      ? 'Encompasses the unbreakable bridge between past and future — nurturing the soul of our nation for generations to come.'
                      : 'Zaokružuje neraskidivu vezu prošlosti i budućnosti — čuvajući dušu naroda za nova pokolenja.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
