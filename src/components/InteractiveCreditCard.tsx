import React, { useState } from 'react';
import { Wifi, ShieldCheck, Lock, Check } from 'lucide-react';

export type CardBrandId = 'visa' | 'mastercard' | 'dinacard' | 'amex' | 'maestro' | 'discover' | 'unionpay' | 'paypal';

export interface CardBrandInfo {
  id: CardBrandId;
  name: string;
  shortName: string;
  colorBg: string;
  badgeBg: string;
  logo: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  prefix: string;
}

export const CARD_BRANDS: CardBrandInfo[] = [
  {
    id: 'visa',
    name: 'Visa',
    shortName: 'VISA',
    colorBg: 'from-[#1A1F71] via-[#0D2561] to-[#0A122A]',
    badgeBg: 'bg-[#1A1F71]',
    bgGradient: 'bg-gradient-to-br from-[#1A1F71] via-[#102B66] to-[#091533]',
    borderColor: 'border-[#3B82F6]/40',
    textColor: 'text-white',
    accentColor: '#F7B600',
    prefix: '4',
    logo: (
      <span className="font-serif font-black italic tracking-wider text-white text-lg drop-shadow-sm">
        VISA
      </span>
    ),
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    shortName: 'MC',
    colorBg: 'from-[#1E1E24] via-[#2A2B36] to-[#12131C]',
    badgeBg: 'bg-[#EB001B]',
    bgGradient: 'bg-gradient-to-br from-[#24252D] via-[#1B1C22] to-[#0F1015]',
    borderColor: 'border-[#FF5F00]/40',
    textColor: 'text-white',
    accentColor: '#EB001B',
    prefix: '5',
    logo: (
      <div className="flex items-center -space-x-2">
        <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90"></div>
        <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90"></div>
      </div>
    ),
  },
  {
    id: 'dinacard',
    name: 'DinaCard',
    shortName: 'DINA',
    colorBg: 'from-[#003B73] via-[#002855] to-[#001736]',
    badgeBg: 'bg-[#00A4E4]',
    bgGradient: 'bg-gradient-to-br from-[#003B73] via-[#002855] to-[#C8102E]/40',
    borderColor: 'border-[#00A4E4]/40',
    textColor: 'text-white',
    accentColor: '#C8102E',
    prefix: '9840',
    logo: (
      <div className="flex items-center gap-1 font-sans font-black text-xs tracking-tight">
        <span className="text-[#00A4E4]">DINA</span>
        <span className="text-[#C8102E]">CARD</span>
      </div>
    ),
  },
  {
    id: 'amex',
    name: 'American Express',
    shortName: 'AMEX',
    colorBg: 'from-[#4B5563] via-[#374151] to-[#1F2937]',
    badgeBg: 'bg-[#2E77BB]',
    bgGradient: 'bg-gradient-to-br from-[#475569] via-[#334155] to-[#0F172A]',
    borderColor: 'border-[#94A3B8]/40',
    textColor: 'text-white',
    accentColor: '#60A5FA',
    prefix: '34',
    logo: (
      <div className="bg-[#0070CD] px-1.5 py-0.5 rounded-xs text-[10px] font-black text-white tracking-tighter">
        AMEX
      </div>
    ),
  },
  {
    id: 'maestro',
    name: 'Maestro',
    shortName: 'Maestro',
    colorBg: 'from-[#002A54] via-[#001F3F] to-[#001226]',
    badgeBg: 'bg-[#002A54]',
    bgGradient: 'bg-gradient-to-br from-[#002A54] via-[#011B38] to-[#000E1F]',
    borderColor: 'border-[#00A4E4]/40',
    textColor: 'text-white',
    accentColor: '#00A4E4',
    prefix: '50',
    logo: (
      <div className="flex items-center -space-x-1.5">
        <div className="w-4 h-4 rounded-full bg-[#00A4E4]"></div>
        <div className="w-4 h-4 rounded-full bg-[#EB001B]"></div>
      </div>
    ),
  },
  {
    id: 'discover',
    name: 'Discover',
    shortName: 'DISCOVER',
    colorBg: 'from-[#231F20] via-[#863C00] to-[#231F20]',
    badgeBg: 'bg-[#FF6000]',
    bgGradient: 'bg-gradient-to-br from-[#2D2A2A] via-[#9A4500] to-[#1A1818]',
    borderColor: 'border-[#FF6000]/40',
    textColor: 'text-white',
    accentColor: '#FF6000',
    prefix: '6011',
    logo: (
      <div className="flex items-center gap-0.5 font-bold text-[11px] tracking-tight text-white">
        DISC<span className="w-2.5 h-2.5 rounded-full bg-[#FF6000] inline-block"></span>VER
      </div>
    ),
  },
  {
    id: 'unionpay',
    name: 'UnionPay',
    shortName: 'UnionPay',
    colorBg: 'from-[#007B88] via-[#00515A] to-[#1A2E35]',
    badgeBg: 'bg-[#007B88]',
    bgGradient: 'bg-gradient-to-br from-[#007B88] via-[#004B54] to-[#C4161C]/50',
    borderColor: 'border-[#007B88]/40',
    textColor: 'text-white',
    accentColor: '#007B88',
    prefix: '62',
    logo: (
      <div className="flex items-center -space-x-1 font-black text-[10px] italic">
        <span className="bg-[#C4161C] px-1 py-0.2 rounded-l-xs text-white">Union</span>
        <span className="bg-[#007B88] px-1 py-0.2 rounded-r-xs text-white">Pay</span>
      </div>
    ),
  },
  {
    id: 'paypal',
    name: 'PayPal Card',
    shortName: 'PayPal',
    colorBg: 'from-[#003087] via-[#001C55] to-[#000F33]',
    badgeBg: 'bg-[#003087]',
    bgGradient: 'bg-gradient-to-br from-[#003087] via-[#001C55] to-[#0079C1]/40',
    borderColor: 'border-[#0079C1]/40',
    textColor: 'text-white',
    accentColor: '#0079C1',
    prefix: '37',
    logo: (
      <div className="font-serif italic font-bold text-sm tracking-wider text-[#0079C1]">
        Pay<span className="text-white">Pal</span>
      </div>
    ),
  },
];

interface InteractiveCreditCardProps {
  selectedBrand: CardBrandId;
  onSelectBrand: (brand: CardBrandId) => void;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isFlipped?: boolean;
  isEn?: boolean;
}

export const InteractiveCreditCard: React.FC<InteractiveCreditCardProps> = ({
  selectedBrand,
  onSelectBrand,
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  isFlipped = false,
  isEn = false,
}) => {
  const brand = CARD_BRANDS.find((b) => b.id === selectedBrand) || CARD_BRANDS[0];

  // Formatting card number for preview
  const formattedNumber = (() => {
    const clean = cardNumber.replace(/\D/g, '');
    let padded = clean.padEnd(16, '•');
    if (padded.length > 16) padded = padded.substring(0, 16);
    return `${padded.substring(0, 4)} ${padded.substring(4, 8)} ${padded.substring(8, 12)} ${padded.substring(12, 16)}`;
  })();

  const displayName = cardHolder.trim().toUpperCase() || (isEn ? 'MILICA JOVANOVIĆ' : 'MILICA JOVANOVIĆ');
  const displayExpiry = expiryDate.trim() || '12/28';
  const displayCvv = cvv.trim() || '•••';

  return (
    <div className="space-y-4">
      {/* 1. Clickable Mini Card Buttons (Selector) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#241D19] uppercase tracking-wider">
            {isEn ? 'Select Card Provider:' : 'Izaberite provajdera kartice:'}
          </label>
          <span className="text-[11px] text-[#9E3E26] font-semibold">
            {brand.name}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {CARD_BRANDS.map((b) => {
            const isSelected = b.id === selectedBrand;
            return (
              <button
                type="button"
                key={b.id}
                onClick={() => onSelectBrand(b.id)}
                className={`relative group p-1.5 rounded-xl transition-all cursor-pointer flex flex-col items-center justify-between h-16 border overflow-hidden ${
                  b.bgGradient
                } ${
                  isSelected
                    ? 'ring-2 ring-[#9E3E26] border-white shadow-md scale-105 z-10'
                    : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100 hover:scale-102'
                }`}
                title={b.name}
              >
                {/* Mini metallic chip */}
                <div className="w-full flex items-center justify-between mb-1">
                  <div className="w-2.5 h-2 rounded-xs bg-gradient-to-r from-[#FFE082] to-[#B78103] opacity-80"></div>
                  {isSelected && (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#4E6852] text-white flex items-center justify-center text-[9px] shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Brand Logo in mini card */}
                <div className="my-auto scale-85 origin-center transform">
                  {b.logo}
                </div>

                {/* Brand Name label */}
                <span className="text-[9px] font-bold text-white/90 truncate w-full text-center tracking-tighter mt-0.5">
                  {b.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Large Realistic Credit Card Preview */}
      <div className="relative w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl p-5 shadow-2xl overflow-hidden transition-all duration-300 transform border border-white/20 select-none">
        {/* Card Background Gradient & Holographic Texture */}
        <div className={`absolute inset-0 ${brand.bgGradient} transition-colors duration-500`}></div>
        
        {/* Holographic light reflection overlay */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#E8D0A9]/10 rounded-full blur-xl pointer-events-none"></div>

        {/* Card Front Content */}
        {!isFlipped ? (
          <div className="relative h-full flex flex-col justify-between text-white z-10">
            {/* Top Row: Bank / Brand name & Contactless Signal */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D0A9]/90">
                  SAVREMENI KORENI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-white/70 rotate-90" />
                <div className="scale-110">{brand.logo}</div>
              </div>
            </div>

            {/* Middle Row: EMV Metallic Chip */}
            <div className="flex items-center gap-3 my-1">
              <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-[#E6C687] via-[#FFF3D1] to-[#99722B] border border-[#B88E3E] p-1 flex flex-col justify-between shadow-inner">
                <div className="w-full h-full border border-black/20 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="bg-black/10 rounded-xs"></div>
                  <div className="bg-black/10 rounded-xs"></div>
                  <div className="bg-black/10 rounded-xs"></div>
                  <div className="bg-black/10 rounded-xs"></div>
                </div>
              </div>
              <span className="text-[9px] text-white/50 tracking-widest font-mono uppercase">
                DEBIT / SECURE
              </span>
            </div>

            {/* Card Number */}
            <div>
              <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-white drop-shadow-md">
                {formattedNumber}
              </div>
            </div>

            {/* Bottom Row: Holder & Expiry */}
            <div className="flex items-end justify-between pt-1">
              <div className="max-w-[70%]">
                <span className="block text-[8px] uppercase tracking-wider text-white/60 font-medium">
                  {isEn ? 'CARD HOLDER' : 'VLASNIK KARTICE'}
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white truncate block drop-shadow-xs">
                  {displayName}
                </span>
              </div>

              <div>
                <span className="block text-[8px] uppercase tracking-wider text-white/60 font-medium text-right">
                  {isEn ? 'EXPIRES' : 'ISTIČE'}
                </span>
                <span className="font-mono text-xs font-bold tracking-widest text-white drop-shadow-xs">
                  {displayExpiry}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Card Back Content (when typing CVV) */
          <div className="relative h-full flex flex-col justify-between text-white z-10 py-1">
            {/* Magnetic Stripe */}
            <div className="-mx-5 bg-[#121212] h-10 w-[calc(100%+2.5rem)] my-2 shadow-inner"></div>

            {/* Signature & CVV box */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-white/70 font-semibold block text-right">
                AUTHORIZED SIGNATURE / CVV CODE
              </span>
              <div className="flex items-center justify-end gap-2 bg-white/90 rounded-md p-2 text-black font-mono">
                <div className="h-4 flex-1 bg-[repeating-linear-gradient(45deg,#E0E0E0,#E0E0E0_5px,#F5F5F5_5px,#F5F5F5_10px)] rounded-xs"></div>
                <div className="font-bold text-sm text-[#9E3E26] px-2 bg-white rounded-xs border border-[#9E3E26]/30">
                  {displayCvv}
                </div>
              </div>
            </div>

            {/* Bottom info & security badge */}
            <div className="flex items-center justify-between text-[9px] text-white/60 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1 text-[#E8D0A9]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>3D Secure Protected</span>
              </div>
              <span className="font-mono">{brand.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
