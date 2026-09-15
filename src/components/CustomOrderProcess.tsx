import React from 'react';
import { motion } from 'motion/react';
import { Palette, Ruler, Hammer, Truck, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface CustomOrderProcessProps {
  onOpenOrderModal: () => void;
}

export const CustomOrderProcess: React.FC<CustomOrderProcessProps> = ({ onOpenOrderModal }) => {
  const { t, isEn } = useLanguage();

  const steps = [
    {
      icon: <Palette className="w-6 h-6 text-[#9E3E26]" />,
      title: t.step1Title,
      desc: t.step1Desc,
    },
    {
      icon: <Ruler className="w-6 h-6 text-[#C2872A]" />,
      title: t.step2Title,
      desc: t.step2Desc,
    },
    {
      icon: <Hammer className="w-6 h-6 text-[#4E6852]" />,
      title: t.step3Title,
      desc: t.step3Desc,
    },
    {
      icon: <Truck className="w-6 h-6 text-[#9E3E26]" />,
      title: t.step4Title,
      desc: t.step4Desc,
    },
  ];

  return (
    <section id="izrada" className="py-20 bg-white text-[#241D19] border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4E8E3] text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.processBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D19] tracking-tight">
            {t.processTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
            {t.processSubtitle}
          </p>
        </motion.div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {steps.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] flex flex-col justify-between space-y-4 hover:border-[#9E3E26]/40 transition-all hover:shadow-xs group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-2xs border border-[#E8E0D5] group-hover:scale-105 transition-transform">
                  {st.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#241D19]">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#241D19]/75 leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
              <div className="pt-2">
                <div className="h-1 w-8 bg-[#9E3E26]/30 group-hover:w-full group-hover:bg-[#9E3E26] rounded-full transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#241D19] text-[#FAF7F2] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {t.processBannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80">
              {t.processBannerDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${companyDetails.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#241D19] hover:bg-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#9E3E26]" />
              <span>{companyDetails.phone}</span>
            </a>

            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9E3E26] hover:bg-[#B3452C] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.processCtaBtn}</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
