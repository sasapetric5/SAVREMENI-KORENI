import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Pin, 
  Video, 
  ExternalLink, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { socialNetworksData, SocialNetworkItem } from '../data/socialMediaData';
import { useLanguage } from '../context/LanguageContext';

const getSocialIcon = (type: SocialNetworkItem['type'], className: string = 'w-5 h-5') => {
  switch (type) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'pinterest':
      return <Pin className={className} />;
    case 'tiktok':
      return <Video className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

interface SocialLinksSectionProps {
  title?: string;
  subtitle?: string;
}

export const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  title,
  subtitle,
}) => {
  const { t, isEn } = useLanguage();
  const displayTitle = title || t.socialTitle;
  const displaySubtitle = subtitle || t.socialSubtitle;

  return (
    <section id="drustvene-mreze" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F4ECE3] to-[#FAF7F2] border-y border-[#E8E0D5]/80 relative overflow-hidden">
      {/* Background Subtle Heritage Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C2872A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#9E3E26]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E8E0D5] text-[#9E3E26] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
            <span>{isEn ? 'Official Channels • Savremeni Koreni Studio' : 'Zvanični kanali • Atelje Savremeni Koreni'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#241D19] tracking-tight">
            {displayTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* 3D Tablet Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {socialNetworksData.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br ${item.theme.bgGradient} border ${item.theme.border} ${item.theme.shadow} transition-all duration-200 transform hover:-translate-y-1.5 active:translate-y-0.5 active:shadow-md cursor-pointer`}
              title={`${isEn ? 'Visit' : 'Posetite'} ${item.name}`}
            >
              {/* Top Row: Icon Badge & Badge Pill */}
              <div className="flex items-start justify-between gap-3 mb-4">
                {/* Tactile 3D Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.theme.iconBg} shadow-md group-hover:scale-110 transition-transform duration-200 shrink-0`}>
                  {getSocialIcon(item.type, 'w-6 h-6')}
                </div>

                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-white/90 text-[#241D19]/80 border border-black/5 shadow-2xs">
                    {item.badge}
                  </span>
                  <div className="p-1 rounded-full text-[#241D19]/40 group-hover:text-[#241D19] transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Middle Row: Name & Handle */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[11px] font-semibold text-[#241D19]/60 uppercase tracking-wider">
                  {item.name}
                </div>
                <div className={`font-serif text-base font-bold text-[#241D19] ${item.theme.textHover} transition-colors line-clamp-1`}>
                  {item.accountName}
                </div>
                <div className="text-xs font-mono font-medium text-[#7F2F1C]">
                  {item.handle}
                </div>
                <p className="text-xs text-[#241D19]/70 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              {/* Bottom 3D Button Strip */}
              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#241D19]/90 group-hover:text-black">
                <span className="flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  {isEn ? 'Open Profile' : 'Otvori nalog'}
                </span>
                <span className="text-[10px] tracking-wider uppercase opacity-50 font-sans">
                  {isEn ? 'New Tab' : 'Novo tab'}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Note on Instagram dual accounts */}
        <div className="mt-8 text-center text-xs text-[#241D19]/70 italic flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
          <span>
            {isEn 
              ? 'Note: In addition to the official brand account (@savremenikoreni), follow Tanja Petrić’s personal workshop account (@tanja.petric_) for live updates on crocheting and weaving.'
              : 'Napomena: Pored zvaničnog brenda (@savremenikoreni), zapratite i lični radionički nalog Tanje Petrić (@tanja.petric_) za direktan uvid u proces heklanja i tkanja.'
            }
          </span>
        </div>
      </div>
    </section>
  );
};

export const SocialPillsCompact: React.FC<{ lightTheme?: boolean }> = ({ lightTheme = false }) => {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {socialNetworksData.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md cursor-pointer ${
            lightTheme
              ? 'bg-white text-[#241D19] border border-[#E8E0D5] hover:border-[#9E3E26]'
              : 'bg-[#2E2520] text-[#FAF7F2] border border-white/10 hover:border-[#E8D0A9]'
          }`}
          title={`${item.name} (${item.handle})`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 ${item.theme.iconBg} text-[10px]`}>
            {getSocialIcon(item.type, 'w-3 h-3')}
          </span>
          <span className="tracking-tight">{item.handle}</span>
        </a>
      ))}
    </div>
  );
};
