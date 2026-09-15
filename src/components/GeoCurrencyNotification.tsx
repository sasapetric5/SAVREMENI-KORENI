import React, { useState, useEffect } from 'react';
import { Globe, X, Check, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, Currency } from '../context/CurrencyContext';

export const GeoCurrencyNotification: React.FC = () => {
  const { isEn, language, setLanguage, detectedGeo } = useLanguage();
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('savremeni_geo_banner_dismissed') === 'true';
      if (isDismissed) {
        setDismissed(true);
      }
    } catch {}
  }, []);

  if (dismissed || !detectedGeo) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('savremeni_geo_banner_dismissed', 'true');
    } catch {}
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#241D19] text-[#FAF7F2] p-4 rounded-2xl shadow-2xl border border-[#E8D0A9]/30 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#9E3E26]/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 text-[#E8D0A9]">
            <Globe className="w-4 h-4 shrink-0 text-[#C2872A]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {detectedGeo.isForeign
                ? (isEn ? `Welcome from ${detectedGeo.countryName}!` : `Dobrodošli iz ${detectedGeo.countryName}!`)
                : (isEn ? 'Automatic Region & Currency Setup' : 'Podešavanje regije i valute')}
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#FAF7F2]/90 leading-relaxed mb-3">
          {detectedGeo.isForeign ? (
            isEn ? (
              <>Prices are formatted in <strong>{currency}</strong> and site language switched to <strong>English</strong> for international visitors. You can adjust anytime.</>
            ) : (
              <>Cene su prilagođene u <strong>{currency}</strong>, a sajt je podešen na engleski za kupce iz inostranstva. Možete uvek promeniti podešavanja.</>
            )
          ) : (
            isEn ? (
              <>Regional visitor detected. Prices displayed in <strong>{currency}</strong> ({isEn ? 'Serbian / Regional' : 'Srpski / Regionalno'}).</>
            ) : (
              <>Prepoznata poseta iz regiona. Cene su prikazane u <strong>{currency}</strong> na srpskom jeziku.</>
            )
          )}
        </p>

        {/* Currency Quick Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-[#E8D0A9]/80 mr-1">
              {isEn ? 'Currency:' : 'Valuta:'}
            </span>
            {availableCurrencies.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  currency === c.code
                    ? 'bg-[#9E3E26] text-white shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {c.flag} {c.code}
              </button>
            ))}
          </div>

          <button
            onClick={handleDismiss}
            className="px-3 py-1 rounded-lg bg-[#E8D0A9] hover:bg-[#d6be96] text-[#241D19] font-bold text-xs transition-all cursor-pointer ml-auto"
          >
            {isEn ? 'OK, Got it' : 'U redu'}
          </button>
        </div>
      </div>
    </div>
  );
};
