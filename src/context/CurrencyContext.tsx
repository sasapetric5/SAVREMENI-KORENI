import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export type Currency = 'RSD' | 'EUR' | 'USD' | 'CHF';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  nameSr: string;
  nameEn: string;
  flag: string;
  rateToRsd: number; // 1 unit in RSD
  rateNotice: string;
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  RSD: {
    code: 'RSD',
    symbol: 'RSD',
    nameSr: 'Srpski dinar',
    nameEn: 'Serbian Dinar',
    flag: '🇷🇸',
    rateToRsd: 1,
    rateNotice: 'Osnovna domaća valuta',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    nameSr: 'Evro',
    nameEn: 'Euro',
    flag: '🇪🇺',
    rateToRsd: 117.2,
    rateNotice: '1 € ≈ 117.2 RSD',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    nameSr: 'Američki dolar',
    nameEn: 'US Dollar',
    flag: '🇺🇸',
    rateToRsd: 108.5,
    rateNotice: '1 $ ≈ 108.5 RSD',
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF',
    nameSr: 'Švajcarski franak',
    nameEn: 'Swiss Franc',
    flag: '🇨🇭',
    rateToRsd: 124.5,
    rateNotice: '1 CHF ≈ 124.5 RSD',
  },
};

export interface FormattedPriceResult {
  formatted: string;
  amount: number;
  currency: Currency;
  symbol: string;
  rsdAmount: number;
  rsdFormatted: string;
  isConverted: boolean;
  secondaryLabel: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  currencyInfo: CurrencyInfo;
  availableCurrencies: CurrencyInfo[];
  formatPrice: (priceRsd: number, priceEur?: number, targetCurrency?: Currency) => FormattedPriceResult;
  formatProduct: (product: { priceRsd: number; priceEur?: number }, targetCurrency?: Currency) => FormattedPriceResult;
  convertAmount: (priceRsd: number, targetCurrency?: Currency, priceEur?: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'savremeni_koreni_currency_v1';
const MANUAL_FLAG_KEY = 'savremeni_koreni_currency_manual_selection';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isEn, detectedGeo } = useLanguage();

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && (saved === 'RSD' || saved === 'EUR' || saved === 'USD' || saved === 'CHF')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return isEn ? 'EUR' : 'RSD';
  });

  // Automatically adapt currency if detectedGeo changes and user hasn't set currency manually
  useEffect(() => {
    try {
      const manualPicked = localStorage.getItem(MANUAL_FLAG_KEY);
      if (!manualPicked && detectedGeo?.currency) {
        setCurrencyState(detectedGeo.currency);
      }
    } catch {
      // ignore
    }
  }, [detectedGeo]);

  const setCurrency = (newCurr: Currency) => {
    setCurrencyState(newCurr);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, newCurr);
      localStorage.setItem(MANUAL_FLAG_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const convertAmount = (priceRsd: number, targetCurrency?: Currency, priceEur?: number): number => {
    const target = targetCurrency || currency;
    if (target === 'RSD') {
      return priceRsd;
    }
    if (target === 'EUR') {
      if (typeof priceEur === 'number' && priceEur > 0) {
        return priceEur;
      }
      return Math.round(priceRsd / CURRENCIES.EUR.rateToRsd);
    }
    if (target === 'USD') {
      if (typeof priceEur === 'number' && priceEur > 0) {
        return Math.round(priceEur * 1.08);
      }
      return Math.round(priceRsd / CURRENCIES.USD.rateToRsd);
    }
    if (target === 'CHF') {
      if (typeof priceEur === 'number' && priceEur > 0) {
        return Math.round(priceEur * 0.95);
      }
      return Math.round(priceRsd / CURRENCIES.CHF.rateToRsd);
    }
    return priceRsd;
  };

  const formatPrice = (
    priceRsd: number,
    priceEur?: number,
    targetCurrency?: Currency
  ): FormattedPriceResult => {
    const target = targetCurrency || currency;
    const amount = convertAmount(priceRsd, target, priceEur);
    const info = CURRENCIES[target];

    const rsdFormatted = `${priceRsd.toLocaleString(isEn ? 'en-US' : 'sr-RS')} RSD`;

    let formatted = '';
    let secondaryLabel = '';

    if (target === 'RSD') {
      formatted = `${priceRsd.toLocaleString(isEn ? 'en-US' : 'sr-RS')} RSD`;
      if (priceEur) {
        secondaryLabel = `(~€${priceEur})`;
      } else {
        const eur = Math.round(priceRsd / 117.2);
        secondaryLabel = `(~€${eur})`;
      }
    } else if (target === 'EUR') {
      formatted = `€${amount}`;
      secondaryLabel = `(${rsdFormatted})`;
    } else if (target === 'USD') {
      formatted = `$${amount}`;
      secondaryLabel = `(${rsdFormatted})`;
    } else if (target === 'CHF') {
      formatted = `${amount} CHF`;
      secondaryLabel = `(${rsdFormatted})`;
    }

    return {
      formatted,
      amount,
      currency: target,
      symbol: info.symbol,
      rsdAmount: priceRsd,
      rsdFormatted,
      isConverted: target !== 'RSD',
      secondaryLabel,
    };
  };

  const formatProduct = (
    product: { priceRsd: number; priceEur?: number },
    targetCurrency?: Currency
  ): FormattedPriceResult => {
    return formatPrice(product.priceRsd, product.priceEur, targetCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyInfo: CURRENCIES[currency],
        availableCurrencies: Object.values(CURRENCIES),
        formatPrice,
        formatProduct,
        convertAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
