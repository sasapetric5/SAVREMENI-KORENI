import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Scissors, PackageCheck, PhoneCall, Camera } from 'lucide-react';
import { companyDetails } from '../data/companyData';
import heroImg from '../assets/images/savremeni_hero_banner_1789021835867.jpg';
import { useLogo } from '../context/LogoContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
  onOpenOrderModal: () => void;
  onOpenGalleryUpload: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenOrderModal,
  onOpenGalleryUpload,
}) => {
  const { logoUrl, openUploadModal } = useLogo();
  const { t, isEn } = useLanguage();

  return (
    <section id="pocetna" className="relative overflow-hidden bg-[#241D19] text-[#FAF7F2] py-16 md:py-24 lg:py-28">
      {/* Background Image with warm gradient overlay - Ken Burns effect */}
      <motion.div 
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.3 }}
        transition={{ 
          opacity: { duration: 1.5, ease: 'easeOut' },
          scale: { duration: 30, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
        }}
        className="absolute inset-0 z-0 mix-blend-luminosity"
      >
        <img
          src={heroImg}
          alt="Radionica Savremeni Koreni Jošanica"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative gradient scrims */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#241D19] via-[#241D19]/90 to-transparent" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#241D19] via-transparent to-[#241D19]/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C2872A]/40 text-[#E8D0A9] text-xs font-medium tracking-wide shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
              <span>{t.heroBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.12]"
            >
              {t.heroTitle1}{' '}
              <span className="text-[#E8D0A9] italic font-normal">{t.heroTitleAccent}</span>{' '}
              {t.heroTitle2}
            </motion.h1>

            {/* Subtitle with authentic brand context */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-[#FAF7F2]/85 max-w-2xl leading-relaxed font-light"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Key Value Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2 text-xs text-[#FAF7F2]/90"
            >
              <span className="flex items-center gap-1.5 bg-[#FAF7F2]/10 px-3 py-1.5 rounded-md border border-white/10">
                <Scissors className="w-3.5 h-3.5 text-[#C2872A]" />
                {t.heroMetric1Title}
              </span>
              <span className="flex items-center gap-1.5 bg-[#FAF7F2]/10 px-3 py-1.5 rounded-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C2872A]" />
                {isEn ? `Registered Artisan Studio (PIB: ${companyDetails.pib})` : `Registrovana radionica (PIB: ${companyDetails.pib})`}
              </span>
              <span className="flex items-center gap-1.5 bg-[#FAF7F2]/10 px-3 py-1.5 rounded-md border border-white/10">
                <PackageCheck className="w-3.5 h-3.5 text-[#C2872A]" />
                {isEn ? 'Worldwide & PostExpress Delivery' : 'Isporuka PostExpress-om'}
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button
                onClick={onExploreClick}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-lg bg-[#9E3E26] hover:bg-[#B3452C] text-white font-semibold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.heroCtaCatalog}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenOrderModal}
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-lg bg-[#FAF7F2]/15 hover:bg-[#FAF7F2]/25 text-[#FAF7F2] border border-white/20 font-medium text-base transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#C2872A]" />
                <span>{t.heroCtaOrder}</span>
              </button>

              <button
                onClick={onOpenGalleryUpload}
                className="inline-flex justify-center items-center gap-1.5 px-4 py-3 rounded-lg text-xs text-[#E8D0A9] hover:text-white hover:underline transition-colors"
                title={t.heroCtaGallery}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.heroCtaGallery}</span>
              </button>
            </motion.div>

          </motion.div>

          {/* Right Hero Card / Workshop Spotlight */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <div className="bg-[#FAF7F2] text-[#241D19] rounded-2xl p-6 md:p-7 shadow-2xl border border-[#E8E0D5] relative">
              <div className="absolute -top-3 right-6 bg-[#9E3E26] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Homolje • Srbija
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center text-center pb-4 border-b border-[#E8E0D5]">
                  <button
                    onClick={openUploadModal}
                    title="Kliknite da zamenite ili postavite originalni logo (luxury_black_gold_emblem.jpg)"
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-[#C2872A] shadow-xl bg-[#120F0D] group transition-transform duration-300 hover:scale-105 cursor-pointer"
                  >
                    <img
                      src={logoUrl}
                      alt="Zvanični amblem brenda Savremeni Koreni"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-semibold gap-1">
                      <Camera className="w-5 h-5 text-[#E8D0A9]" />
                      <span>{isEn ? 'Change logo' : 'Promeni logo'}</span>
                    </div>
                  </button>
                  <h3 className="font-serif font-bold text-xl text-[#241D19] mt-3">
                    Tanja Petrić
                  </h3>
                  <p className="text-xs text-[#7F2F1C] font-semibold tracking-wide uppercase">
                    {isEn ? 'Artisan Studio "Savremeni Koreni"' : 'Radionica „Savremeni Koreni“'}
                  </p>
                  <p className="text-[12px] text-[#C2872A] font-serif italic mt-0.5">
                    „{t.brandTagline}“
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-[#241D19]/80 italic">
                  {isEn 
                    ? '“Every stitch on our bags and socks carries the heritage of our grandmothers, refined for the modern lifestyle.”' 
                    : '„Svaki bod na našim torbicama i čarapama nosi priču naših prabaka, ali sa linijom i praktičnošću za život moderne žene.“'}
                </p>

                <div className="space-y-2 pt-2 text-xs border-t border-[#E8E0D5]">
                  <div className="flex justify-between py-1 border-b border-[#E8E0D5]/60">
                    <span className="text-[#241D19]/70">{isEn ? 'Studio:' : 'Radionica:'}</span>
                    <span className="font-semibold text-[#241D19]">Peskuša 9, Jošanica</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E0D5]/60">
                    <span className="text-[#241D19]/70">{isEn ? 'Direct contact:' : 'Direktan kontakt:'}</span>
                    <a href="tel:+381603318319" className="font-semibold text-[#9E3E26] hover:underline">
                      060 331 8319
                    </a>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E0D5]/60">
                    <span className="text-[#241D19]/70">{isEn ? 'Crafts:' : 'Tehnike:'}</span>
                    <span className="font-semibold text-[#241D19]">{isEn ? 'Embroidery, crochet, macramé, sewing' : 'Vez, heklanje, makrame, šivenje'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#241D19]/70">{isEn ? 'Certification:' : 'Sertifikat:'}</span>
                    <span className="font-semibold text-[#4E6852]">Rukom iz Srbije</span>
                  </div>
                </div>

                <a
                  href="#podaci-firme"
                  className="block text-center text-xs font-semibold text-[#7F2F1C] hover:text-[#9E3E26] pt-2 underline"
                >
                  {isEn ? 'View official company registration (APR) →' : 'Pogledajte zvanične APR podatke firme →'}
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

