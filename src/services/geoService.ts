export interface GeoLocationData {
  ip?: string;
  countryCode: string; // e.g. 'RS', 'US', 'DE', 'HR', 'BA', 'ME', 'SI', 'MK', 'XK'
  countryName: string; // e.g. 'Serbia', 'Germany'
  city?: string;
  currency?: 'RSD' | 'EUR' | 'USD' | 'CHF';
  isExYuRegion: boolean;
  isForeign: boolean;
}

// Region list where Serbian language remains default
const EX_YU_COUNTRY_CODES = new Set(['RS', 'HR', 'SI', 'MK', 'BA', 'ME', 'XK', 'XKX']);

// Eurozone country codes
const EUROZONE_CODES = new Set([
  'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'HR'
]);

export async function detectVisitorLocation(): Promise<GeoLocationData> {
  // Default fallback (Serbia)
  const defaultGeo: GeoLocationData = {
    countryCode: 'RS',
    countryName: 'Srbija',
    isExYuRegion: true,
    isForeign: false,
    currency: 'RSD',
  };

  try {
    // Attempt 1: Fetch from freeipapi.com or ipwho.is with short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch('https://freeipapi.com/api/json', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const code = (data.countryCode || 'RS').toUpperCase();
      const isExYu = EX_YU_COUNTRY_CODES.has(code);
      const isForeign = !isExYu;

      let suggestedCurrency: 'RSD' | 'EUR' | 'USD' | 'CHF' = 'RSD';
      if (code === 'CH') {
        suggestedCurrency = 'CHF';
      } else if (EUROZONE_CODES.has(code) || code === 'DE' || code === 'AT' || code === 'FR' || code === 'IT') {
        suggestedCurrency = 'EUR';
      } else if (isForeign) {
        suggestedCurrency = 'USD';
      } else {
        suggestedCurrency = 'RSD';
      }

      return {
        ip: data.ipAddress,
        countryCode: code,
        countryName: data.countryName || code,
        city: data.cityName,
        currency: suggestedCurrency,
        isExYuRegion: isExYu,
        isForeign,
      };
    }
  } catch (err) {
    // Fallback: Check Timezone / Browser locale
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const browserLang = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';

      if (timeZone.includes('Belgrade') || timeZone.includes('Zagreb') || timeZone.includes('Sarajevo') || timeZone.includes('Skopje') || timeZone.includes('Ljubljana') || timeZone.includes('Podgorica')) {
        return defaultGeo;
      }

      if (timeZone.includes('Europe')) {
        return {
          countryCode: 'EU',
          countryName: 'Europe',
          isExYuRegion: false,
          isForeign: true,
          currency: 'EUR',
        };
      }

      if (browserLang.startsWith('en') || timeZone.includes('America') || timeZone.includes('Asia') || timeZone.includes('Australia')) {
        return {
          countryCode: 'US',
          countryName: 'International',
          isExYuRegion: false,
          isForeign: true,
          currency: 'USD',
        };
      }
    } catch {
      // ignore
    }
  }

  return defaultGeo;
}
