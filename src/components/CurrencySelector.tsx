import React, { useState, useRef, useEffect } from 'react';
import { Coins, ChevronDown, Check, ArrowRightLeft } from 'lucide-react';
import { useCurrency, Currency, CURRENCIES } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface CurrencySelectorProps {
  variant?: 'topbar' | 'navbar' | 'catalog' | 'mobile';
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { currency, setCurrency, availableCurrencies, currencyInfo } = useCurrency();
  const { isEn } = useLanguage();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Variant 1: TOPBAR - compact pill list
  if (variant === 'topbar') {
    return (
      <div className={`flex items-center bg-[#15110E] p-0.5 rounded-full border border-[#4A3B32] ${className}`}>
        {availableCurrencies.map((c) => {
          const isActive = currency === c.code;
          return (
            <button
              key={c.code}
              onClick={() => setCurrency(c.code)}
              className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-[#C2872A] text-[#120F0D] font-bold shadow-xs'
                  : 'text-[#FAF7F2]/75 hover:text-white'
              }`}
              title={`${isEn ? c.nameEn : c.nameSr} (${c.rateNotice})`}
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Variant 2: CATALOG - prominent pill bar in product catalog
  if (variant === 'catalog') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#241D19] dark:text-[#FAF7F2]/90 shrink-0">
          <Coins className="w-3.5 h-3.5 text-[#C2872A]" />
          <span>{isEn ? 'Display currency:' : 'Prikaz cena u:'}</span>
        </div>

        <div className="inline-flex items-center p-1 rounded-xl bg-[#FAF7F2] dark:bg-[#1F1915] border border-[#E8E0D5] dark:border-[#382C24] shadow-2xs">
          {availableCurrencies.map((c) => {
            const isActive = currency === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#9E3E26] text-white shadow-xs'
                    : 'text-[#241D19] dark:text-[#FAF7F2]/80 hover:bg-[#F4E8E3] dark:hover:bg-[#2C231D]'
                }`}
                title={`${isEn ? c.nameEn : c.nameSr} (${c.rateNotice})`}
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
                <span className="text-[10px] opacity-75 font-normal">({c.symbol})</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic conversion notice */}
        {currency !== 'RSD' && (
          <span className="text-[11px] text-[#241D19]/60 dark:text-[#FAF7F2]/60 italic flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-[#C2872A]" />
            <span>
              {isEn
                ? `Auto-converted from RSD base (${currencyInfo.rateNotice})`
                : `Automatski preračunato iz dinara (${currencyInfo.rateNotice})`}
            </span>
          </span>
        )}
      </div>
    );
  }

  // Variant 3: MOBILE - 4-item grid in mobile drawer
  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold text-[#241D19] dark:text-[#FAF7F2]">
          <span className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-[#C2872A]" />
            <span>{isEn ? 'Currency / Valuta:' : 'Valuta prikaza:'}</span>
          </span>
          <span className="text-[#C2872A] font-bold">
            {currencyInfo.flag} {currencyInfo.code} ({currencyInfo.symbol})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {availableCurrencies.map((c) => {
            const isActive = currency === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#9E3E26] text-white border-[#9E3E26] shadow-xs'
                    : 'bg-white dark:bg-[#261F1A] border-[#E8E0D5] dark:border-[#4A3B32] text-[#241D19] dark:text-[#FAF7F2]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{c.flag}</span>
                  <span>{c.code}</span>
                </span>
                <span className="text-[10px] opacity-80">{c.symbol}</span>
              </button>
            );
          })}
        </div>
        {currency !== 'RSD' && (
          <p className="text-[10px] text-[#241D19]/65 dark:text-[#FAF7F2]/65 italic">
            ℹ️ {currencyInfo.rateNotice} • {isEn ? 'Priced at fixed transparent conversion.' : 'Obračun po fiksnom kursu.'}
          </p>
        )}
      </div>
    );
  }

  // Variant 4: NAVBAR - desktop dropdown or toggle
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-2xs ${
          isDark
            ? 'border-[#4A3B32] bg-[#261F1A] hover:bg-[#342922] text-[#FAF7F2]'
            : 'border-[#E8E0D5] bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#241D19]'
        }`}
        title={isEn ? `Currency: ${currencyInfo.nameEn}` : `Valuta: ${currencyInfo.nameSr}`}
        aria-label="Promena valute"
      >
        <span className="text-sm leading-none">{currencyInfo.flag}</span>
        <span className="font-bold">{currencyInfo.code}</span>
        <span className="text-[#C2872A] font-bold text-xs">{currencyInfo.symbol}</span>
        <ChevronDown className="w-3 h-3 text-[#C2872A] opacity-80" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-1.5 w-48 rounded-xl shadow-xl border p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
          isDark ? 'bg-[#1F1915] border-[#4A3B32]' : 'bg-white border-[#E8E0D5]'
        }`}>
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#241D19]/60 dark:text-[#FAF7F2]/60 border-b border-[#E8E0D5] dark:border-[#382C24] mb-1">
            {isEn ? 'Select Currency' : 'Izbor Valute'}
          </div>
          {availableCurrencies.map((c) => {
            const isActive = currency === c.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  setCurrency(c.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#9E3E26] text-white font-bold'
                    : isDark
                    ? 'text-[#FAF7F2] hover:bg-[#2C231D]'
                    : 'text-[#241D19] hover:bg-[#F4E8E3]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{c.flag}</span>
                  <span>{isEn ? c.nameEn : c.nameSr}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-bold ${isActive ? 'text-white' : 'text-[#C2872A]'}`}>
                    {c.code}
                  </span>
                  {isActive && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
          <div className="mt-1 pt-1.5 px-2 border-t border-[#E8E0D5] dark:border-[#382C24] text-[10px] text-[#241D19]/60 dark:text-[#FAF7F2]/60 italic">
            {currencyInfo.rateNotice}
          </div>
        </div>
      )}
    </div>
  );
};
