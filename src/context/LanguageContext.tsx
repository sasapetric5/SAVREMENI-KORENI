import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../translations/translations';
import { detectVisitorLocation, GeoLocationData } from '../services/geoService';

interface LanguageContextType {
  language: Language;
  isEn: boolean;
  isSr: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  detectedGeo: GeoLocationData | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'savremeni_koreni_language';
const MANUAL_LANG_SELECTION_KEY = 'savremeni_koreni_lang_manual_selection';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedGeo, setDetectedGeo] = useState<GeoLocationData | null>(null);

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'sr' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'sr';
  });

  // Run location detection on load if user hasn't explicitly overridden manually
  useEffect(() => {
    let isMounted = true;
    const runGeoDetection = async () => {
      const geo = await detectVisitorLocation();
      if (!isMounted) return;

      setDetectedGeo(geo);

      const hasManualChoice = localStorage.getItem(MANUAL_LANG_SELECTION_KEY) === 'true';

      // Auto-switch to English IF visitor is foreign AND NOT from EX-YU (Srbija, Hrvatska, Slovenija, Makedonija, Bosna, CG, Kosovo)
      if (!hasManualChoice) {
        if (geo.isForeign) {
          setLanguageState('en');
        } else {
          setLanguageState('sr');
        }
      }
    };

    runGeoDetection();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      document.documentElement.lang = language;

      if (language === 'en') {
        document.title = "Savremeni Koreni | Traditional Serbian Embroidery, Folk Costumes & Handmade Wool Products";
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Savremeni Koreni (savremenikoreni.com) – Handcrafted Vlach sheepskin fur hats, hand-embroidered folklore socks, custom folk costumes, macrame bags, and artisan wool items by Tanja Petrić.'
          );
        }

        const metaKw = document.querySelector('meta[name="keywords"]');
        if (metaKw) {
          metaKw.setAttribute(
            'content',
            'Vlach fur hat, white sheepskin subara, hand embroidered folklore socks, Serbian folk costume, Vlach costume, embroidered wool socks, hand embroidery, opanci, jelek, wool craft, macrame bags, ethno gifts, Savremeni Koreni, Tanja Petrić, Josanica'
          );
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute('content', 'Savremeni Koreni | Authentic Handcrafted Folk Costumes & Embroidery');
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
          ogDesc.setAttribute('content', 'Explore traditional Vlach fur hats, hand-embroidered folklore socks, macrame bags, and custom artisan clothing.');
        }

        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.setAttribute('href', 'https://savremenikoreni.com/?lang=en');
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
          ogUrl.setAttribute('content', 'https://savremenikoreni.com/?lang=en');
        }

        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) {
          ogLocale.setAttribute('content', 'en_US');
        }

        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) {
          twTitle.setAttribute('content', 'Savremeni Koreni | Traditional Serbian & Vlach Heritage Crafts');
        }

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) {
          twDesc.setAttribute('content', 'Handcrafted Vlach sheepskin fur hats, hand-embroidered folklore socks, custom Serbian folk costumes, and unique macrame bags by Tanja Petrić.');
        }
      } else {
        document.title = "Savremeni Koreni | Spoj tradicije i modernog dizajna";

        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.setAttribute('href', 'https://savremenikoreni.com/');
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
          ogUrl.setAttribute('content', 'https://savremenikoreni.com/');
        }

        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) {
          ogLocale.setAttribute('content', 'sr_RS');
        }

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Savremeni Koreni (savremenikoreni.com) – vodeći autoritet za tradiciju i ručni rad: vlaška šubara (bela šubara), vezene čarape za folklor, narodna nošnja iz Homoljskog kraja (srpska i vlaška), ručni vez, vrste veza, unikatne torbice, modern makrame i heklanje. Autorski radovi Tanje Petrić iz Jošanice.'
          );
        }

        const metaKw = document.querySelector('meta[name="keywords"]');
        if (metaKw) {
          metaKw.setAttribute(
            'content',
            'vlaška šubara, bela šubara, vezene čarape za folklor, narodna nošnja iz homoljskog kraja, homoljska narodna nošnja, vlaška nošnja, srpska nošnja homolja, vezene vunene čarape, čarape za kud, vez, ručni vez, vezenje, opanci, jelek, tkanice, zlatovez, runska vuna, heklanje za pocetnike, pletenje bez igala, ceger torbe, etno pokloni, homoljski med, platno za vez, konac za vez, materijali za šivenje, pribor za sivenje, torbice, unikatne torbe, makrame, craftcord, snur macrame, pamucne trake za heklanje, vrste veza, pletenje na pet igala, Savremeni Koreni, Tanja Petrić, Jošanica, savremenikoreni.com'
          );
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute('content', 'Savremeni Koreni | Autoritet za Vez, Narodnu Nošnju, Heklanje i Čvorovanje');
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
          ogDesc.setAttribute('content', 'Sveobuhvatni vodiči i unikatne rukotvorine: ručni vez, vrste tradicionalnih bodova, narodna nošnja, heklani nakit, makrame i lekovita vuna.');
        }

        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) {
          twTitle.setAttribute('content', 'Savremeni Koreni | Spoj tradicije i modernog dizajna');
        }

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) {
          twDesc.setAttribute('content', 'Ručno rađene unikatne torbe, narodna nošnja, vlaške šubare i tradicija Homolja. Autorski radovi Tanje Petrić.');
        }
      }
    } catch {
      // ignore
    }
  }, [language]);

  const toggleLanguage = () => {
    try {
      localStorage.setItem(MANUAL_LANG_SELECTION_KEY, 'true');
    } catch {}
    setLanguageState((prev) => (prev === 'sr' ? 'en' : 'sr'));
  };

  const setLanguage = (newLang: Language) => {
    try {
      localStorage.setItem(MANUAL_LANG_SELECTION_KEY, 'true');
    } catch {}
    setLanguageState(newLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        isEn: language === 'en',
        isSr: language === 'sr',
        setLanguage,
        toggleLanguage,
        t,
        detectedGeo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
