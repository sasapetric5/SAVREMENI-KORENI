import React, { useState } from 'react';
import { Phone, MessageCircle, Instagram, ShoppingBag, X, ExternalLink } from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { socialNetworksData } from '../data/socialMediaData';
import { useLanguage } from '../context/LanguageContext';

interface MobileQuickBarProps {
  onOpenOrderModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenOrderModal }) => {
  const [showSocialModal, setShowSocialModal] = useState(false);
  const { t, isEn } = useLanguage();

  const instagramBrand = socialNetworksData.find((s) => s.id === 'instagram-brand');
  const instagramTanja = socialNetworksData.find((s) => s.id === 'instagram-tanja');

  return (
    <>
      {/* Social Choice Drawer / Modal when clicked */}
      {showSocialModal && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-3 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#FAF7F2] rounded-2xl p-5 border border-[#E8E0D5] shadow-2xl space-y-4 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#241D19]">
                    {isEn ? 'Our Instagram Accounts' : 'Naši Instagram Nalozi'}
                  </h4>
                  <p className="text-[11px] text-[#241D19]/70">
                    {isEn ? 'Choose an account to open' : 'Izaberite nalog koji želite da otvorite'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSocialModal(false)}
                className="p-1 rounded-full text-[#241D19]/60 hover:bg-[#E8E0D5]"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 pt-1">
              {instagramBrand && (
                <a
                  href={instagramBrand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowSocialModal(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#F1D2C4] shadow-xs hover:border-[#E1306C] transition-all"
                >
                  <div>
                    <div className="text-xs font-bold text-[#241D19]">{isEn ? 'Savremeni Koreni (Brand)' : 'Savremeni Koreni (Brend)'}</div>
                    <div className="text-[11px] font-mono text-[#E1306C]">{instagramBrand.handle}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#E1306C]" />
                </a>
              )}

              {instagramTanja && (
                <a
                  href={instagramTanja.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowSocialModal(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E9C7BA] shadow-xs hover:border-[#C13584] transition-all"
                >
                  <div>
                    <div className="text-xs font-bold text-[#241D19]">{isEn ? 'Tanja Petrić (Jošanica Studio)' : 'Tanja Petrić (Atelje Jošanica)'}</div>
                    <div className="text-[11px] font-mono text-[#C13584]">{instagramTanja.handle}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#C13584]" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Dock on Mobile */}
      <nav 
        aria-label="Brzi mobilni kontakti"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8E0D5] px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-[calc(0.375rem+env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5">
          {/* 1. Poziv */}
          <a
            href={`tel:${companyDetails.phone}`}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#241D19] active:bg-[#F4ECE3] transition-colors"
            title={isEn ? 'Call workshop' : 'Pozovite radionicu'}
          >
            <div className="w-8 h-8 rounded-full bg-[#FAF0E6] text-[#9E3E26] flex items-center justify-center shadow-2xs">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold mt-1">{t.quickCall}</span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href={`https://wa.me/381603318319?text=${encodeURIComponent(isEn ? 'Hello Tanja! I am contacting you from the Savremeni Koreni website.' : 'Dobar dan Tanja! Javljam se sa sajta Savremeni Koreni.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#241D19] active:bg-[#F4ECE3] transition-colors"
            title="WhatsApp"
          >
            <div className="w-8 h-8 rounded-full bg-[#E7F9EE] text-[#25D366] flex items-center justify-center shadow-2xs">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
          </a>

          {/* 3. Instagram (2 Accounts Selector) */}
          <button
            onClick={() => setShowSocialModal(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#241D19] active:bg-[#F4ECE3] transition-colors cursor-pointer"
            title="Instagram"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-2xs">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold mt-1">Instagram</span>
          </button>

          {/* 4. Naručite Unikat */}
          <button
            onClick={onOpenOrderModal}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#9E3E26] active:bg-[#F4ECE3] transition-colors cursor-pointer font-bold"
            title={t.quickOrder}
          >
            <div className="w-8 h-8 rounded-full bg-[#9E3E26] text-white flex items-center justify-center shadow-2xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold mt-1 text-[#9E3E26]">{t.quickOrder}</span>
          </button>
        </div>
      </nav>
    </>
  );
};
