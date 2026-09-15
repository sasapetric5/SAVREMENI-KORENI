import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Menu, X, ShoppingBag, MapPin, Sparkles, ShieldCheck, Heart, Camera, Sun, Moon, Globe, ChevronDown, Compass, Package } from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { useLogo } from '../context/LogoContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { CurrencySelector } from './CurrencySelector';

interface NavbarProps {
  onOpenOrderModal: (productName?: string) => void;
  onOpenGalleryUpload: () => void;
  onOpenTrackOrder?: () => void;
  userPhotoCount: number;
  onNavigateLandingPage?: (slug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  onOpenGalleryUpload,
  onOpenTrackOrder,
  userPhotoCount,
  onNavigateLandingPage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLandingDropdownOpen, setIsLandingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logoUrl, openUploadModal } = useLogo();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, toggleLanguage, t, isEn } = useLanguage();

  const landingItems = [
    { slug: 'subare-homolje', labelSr: 'Homoljske & Vlaške Šubare', labelEn: 'Homolje Fur Hats (Šubare)', descSr: '100% prirodno jagnjeće krzno', descEn: '100% natural lamb fur' },
    { slug: 'nosnje-i-vez', labelSr: 'Narodna Nošnja i Ručni Vez', labelEn: 'Folk Costumes & Embroidery', descSr: 'Košulje od srpskog platna, jeleci', descEn: 'Woven linen shirts & vests' },
    { slug: 'vunene-carape', labelSr: 'Ručno Pletene Vunene Čarape', labelEn: 'Hand-Knitted Wool Socks', descSr: 'Pletenje na 5 igala, reljefni vez', descEn: '5-needle circular folk knit' },
    { slug: 'etno-pokloni-za-inostranstvo', labelSr: 'Etno Pokloni za Inostranstvo', labelEn: 'Serbian Ethno Gifts for Abroad', descSr: 'Autentični darovi za dijasporu', descEn: 'Handcrafted gifts for diaspora' },
    { slug: 'unikatne-makrame-torbe', labelSr: 'Unikatne Makrame Torbe', labelEn: 'Unique Macramé Handbags', descSr: 'Pamučni kanap, bukovo drvo', descEn: 'Natural cotton cord & wood' },
    { slug: 'zlatovez-i-srma', labelSr: 'Tradicionalni Srpski Zlatovez', labelEn: 'Traditional Serbian Goldwork', descSr: 'Zlatna i srebrna srma na plišu', descEn: 'Gold & silver srma on velvet' },
    { slug: 'heklani-nakit-i-ogrlice', labelSr: 'Heklani Nakit i Etno Ogrlice', labelEn: 'Crocheted Ethno Jewelry', descSr: 'Perolaki nakit, drvene perle', descEn: 'Featherlight micro-crochet' },
    { slug: 'opanci-i-folklorna-obuca', labelSr: 'Opanci za Folklor sa Kljunom', labelEn: 'Traditional Leather Opanci', descSr: 'Ručno pleteni, goveđa koža', descEn: 'Hand-woven cattle leather' },
    { slug: 'vezene-kosulje-za-svadbe-i-slave', labelSr: 'Svečane Košulje za Venčanja i Slave', labelEn: 'Ceremonial Wedding & Slava Shirts', descSr: 'Domaće platno, ruska kragna', descEn: 'Domestic cotton, mandarin collar' },
    { slug: 'homoljski-suveniri-i-josanica', labelSr: 'Autentični Suveniri iz Homolja', labelEn: 'Homolje & Jošanica Souvenirs', descSr: 'Ekološki darovi sa sela', descEn: 'Artisan souvenirs from Jošanica' }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLandingDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLandingClick = (slug: string) => {
    setIsLandingDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigateLandingPage) {
      onNavigateLandingPage(slug);
    } else {
      window.location.href = `/${slug}`;
    }
  };

  const navLinks = [
    { label: t.navHome, href: '#pocetna' },
    { label: t.navAbout, href: '#o-nama' },
    { label: t.navCatalog, href: '#katalog' },
    { label: t.navProcess, href: '#izrada' },
    { label: t.navBlog, href: '#blog' },
    { label: isEn ? 'FAQ' : 'FAQ', href: '#faq-sekcija' },
    { label: t.navGallery, href: '#galerija' },
    { label: t.navCompany, href: '#podaci-firme' },
    { label: t.navContact, href: '#kontakt' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#1A1512]/95 backdrop-blur-md border-b border-[#E8E0D5] dark:border-[#382C24] shadow-xs">
      {/* Top Bar with real contact & APR verified badge & Language switch */}
      <div className="bg-[#241D19] text-[#FAF7F2] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-[#E8D0A9]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C2872A]" />
              {t.topBarBadge}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#FAF7F2]/80">
              <MapPin className="w-3 h-3 text-[#C2872A]" />
              {companyDetails.address.street} {companyDetails.address.number}, {companyDetails.address.city}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Top Bar Language Selector Pill */}
            <div className="flex items-center bg-[#15110E] p-0.5 rounded-full border border-[#4A3B32]">
              <button
                onClick={() => setLanguage('sr')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'sr'
                    ? 'bg-[#9E3E26] text-white shadow-xs'
                    : 'text-[#FAF7F2]/70 hover:text-white'
                }`}
                title="Prikaz na srpskom jeziku"
              >
                <span>🇷🇸</span>
                <span>SR</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-[#9E3E26] text-white shadow-xs'
                    : 'text-[#FAF7F2]/70 hover:text-white'
                }`}
                title="Display in English"
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Top Bar Currency Selector Pill */}
            <CurrencySelector variant="topbar" className="hidden sm:flex" />

            <a 
              href={`tel:${companyDetails.phone}`} 
              className="flex items-center gap-1 hover:text-[#E8D0A9] transition-colors font-medium"
              title="Pozovite / Call"
            >
              <Phone className="w-3 h-3 text-[#C2872A]" />
              <span>{companyDetails.phoneFormatted}</span>
            </a>
            <a 
              href={`mailto:${companyDetails.email}`} 
              className="hidden sm:flex items-center gap-1 hover:text-[#E8D0A9] transition-colors"
              title="Email"
            >
              <Mail className="w-3 h-3 text-[#C2872A]" />
              <span>{companyDetails.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={openUploadModal}
              title="Originalni logo (luxury_black_gold_emblem.jpg)"
              className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C2872A] shadow-md bg-[#120F0D] shrink-0 hover:border-[#E8D0A9] transition-all hover:scale-105 group cursor-pointer"
            >
              <img
                src={logoUrl}
                alt="Savremeni Koreni Logo"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-semibold">
                <Camera className="w-4 h-4 text-[#E8D0A9]" />
              </div>
            </button>
            <a href="#pocetna" className="group">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#241D19] dark:text-[#FAF7F2] group-hover:text-[#9E3E26] transition-colors block leading-tight">
                Savremeni Koreni
              </span>
              <span className="text-[11px] tracking-wider text-[#7F2F1C] dark:text-[#E8D0A9] font-serif italic block">
                {t.brandTagline}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-[#241D19] dark:text-[#FAF7F2] hover:text-[#9E3E26] hover:bg-[#F4E8E3]/60 dark:hover:bg-[#261F1A] rounded-md transition-all duration-150 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* Targeted Landing Pages Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLandingDropdownOpen(!isLandingDropdownOpen)}
                className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isLandingDropdownOpen 
                    ? 'bg-[#9E3E26] text-white shadow-xs' 
                    : 'text-[#9E3E26] dark:text-[#E8D0A9] hover:bg-[#F4E8E3]/60 dark:hover:bg-[#261F1A]'
                }`}
                title={isEn ? 'Targeted Heritage Collections & SEO Guides' : 'Ciljane tematske celine i vodiči'}
              >
                <Compass className="w-3.5 h-3.5 text-[#C2872A]" />
                <span>{isEn ? 'Collections' : 'Kolekcije'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLandingDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              {isLandingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 max-h-[72vh] overflow-y-auto bg-white dark:bg-[#1E1713] rounded-2xl shadow-xl border border-[#E8E0D5] dark:border-[#4A3B32] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 scrollbar-thin">
                  <div className="px-3 py-2 border-b border-[#E8E0D5]/60 dark:border-[#382C24]">
                    <span className="text-[10px] uppercase font-bold text-[#9E3E26] dark:text-[#E8D0A9] tracking-wider block">
                      {isEn ? 'Featured Heritage Guides' : 'Tematske celine i vodiči'}
                    </span>
                    <span className="text-[11px] text-[#241D19]/60 dark:text-[#FAF7F2]/60 block">
                      {isEn ? 'Direct catalog & sizing info' : 'Autentičan ručni rad iz Homolja'}
                    </span>
                  </div>

                  <div className="py-1 space-y-1">
                    {landingItems.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleLandingClick(item.slug)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#FAF7F2] dark:hover:bg-[#2A211B] transition-colors group cursor-pointer"
                      >
                        <span className="font-serif font-bold text-xs sm:text-sm text-[#241D19] dark:text-[#FAF7F2] group-hover:text-[#9E3E26] dark:group-hover:text-[#E8D0A9] transition-colors block">
                          {isEn ? item.labelEn : item.labelSr}
                        </span>
                        <span className="text-[11px] text-[#241D19]/60 dark:text-[#FAF7F2]/60 block">
                          {isEn ? item.descEn : item.descSr}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium text-[#241D19] dark:text-[#FAF7F2] hover:text-[#9E3E26] hover:bg-[#F4E8E3]/60 dark:hover:bg-[#261F1A] rounded-md transition-all duration-150 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Prominent Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-2xs ${
                isDark
                  ? 'border-[#4A3B32] bg-[#261F1A] hover:bg-[#342922] text-[#FAF7F2]'
                  : 'border-[#E8E0D5] bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#241D19]'
              }`}
              title={isEn ? 'Prebaci na srpski jezik' : 'Switch to English'}
              aria-label={t.langSwitchAria}
            >
              <Globe className="w-3.5 h-3.5 text-[#C2872A]" />
              <span className="font-bold">{isEn ? '🇬🇧 EN' : '🇷🇸 SR'}</span>
            </button>

            {/* Currency Switcher */}
            <CurrencySelector variant="navbar" />

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-2xs ${
                isDark
                  ? 'border-[#4A3B32] bg-[#261F1A] hover:bg-[#342922] text-[#FAF7F2]'
                  : 'border-[#E8E0D5] bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#241D19]'
              }`}
              title={isDark ? 'Prebaci na svetlu temu' : 'Prebaci na tamnu temu'}
              aria-label={isDark ? 'Prebaci na svetlu temu' : 'Prebaci na tamnu temu'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#C2872A]" />
                  <span className="hidden xl:inline text-xs">{t.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#7F2F1C]" />
                  <span className="hidden xl:inline text-xs">{t.themeDark}</span>
                </>
              )}
            </button>

            {/* Track Order Button */}
            <button
              onClick={() => {
                if (onOpenTrackOrder) {
                  onOpenTrackOrder();
                } else {
                  const el = document.getElementById('pracenje');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all shadow-2xs border ${
                isDark
                  ? 'bg-[#261F1A] hover:bg-[#342922] text-[#E8D0A9] border-[#4A3B32]'
                  : 'bg-[#F3ECE0] hover:bg-[#E8E0D5] text-[#9E3E26] border-[#D5C9BA]'
              }`}
              title={isEn ? 'Track Order Status' : 'Praćenje porudžbine'}
            >
              <Package className="w-3.5 h-3.5 text-[#C2872A]" />
              <span className="hidden xl:inline">{isEn ? 'Track Order' : 'Praćenje'}</span>
            </button>

            <button
              onClick={onOpenGalleryUpload}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all shadow-2xs border ${
                isDark
                  ? 'bg-[#261F1A] hover:bg-[#342922] text-[#FAF7F2] border-[#4A3B32]'
                  : 'bg-[#E8E0D5]/70 hover:bg-[#E8E0D5] text-[#241D19] border-[#D5C9BA]'
              }`}
              title={t.navMyPhotos}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#C2872A]' : 'text-[#9E3E26]'}`} />
              <span>{t.navMyPhotos}</span>
              {userPhotoCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[#9E3E26] text-white rounded-full font-bold">
                  {userPhotoCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onOpenOrderModal()}
              className="inline-flex items-center gap-2 px-3.5 xl:px-4 py-2.5 text-xs xl:text-sm font-semibold text-white bg-[#9E3E26] hover:bg-[#7F2F1C] rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.navOrderCustom}</span>
            </button>
          </div>

          {/* Mobile Right Action Controls & Prominent Hamburger Menu Trigger */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            {/* Quick Mobile Theme Switch (Sun/Moon) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center shadow-2xs ${
                isDark
                  ? 'border-[#4A3B32] bg-[#261F1A] text-[#FAF7F2] hover:bg-[#342922]'
                  : 'border-[#E8E0D5] bg-white text-[#241D19] hover:bg-[#F4E8E3]'
              }`}
              title={isDark ? 'Prebaci na svetlu temu' : 'Prebaci na tamnu temu'}
              aria-label={isDark ? 'Svetla tema' : 'Tamna tema'}
            >
              {isDark ? (
                <Sun className="w-4.5 h-4.5 text-[#C2872A]" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-[#7F2F1C]" />
              )}
            </button>

            {/* Quick Mobile Language Switch */}
            <button
              onClick={toggleLanguage}
              className={`px-2 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                isDark
                  ? 'border-[#4A3B32] bg-[#261F1A] text-[#FAF7F2]'
                  : 'border-[#E8E0D5] bg-white text-[#241D19]'
              }`}
              title={isEn ? 'Switch to Serbian' : 'Prebaci na engleski'}
            >
              <span>{isEn ? '🇬🇧 EN' : '🇷🇸 SR'}</span>
            </button>

            {/* PROMINENT HAMBURGER MENU BUTTON (ALWAYS FULLY VISIBLE) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-white bg-[#9E3E26] hover:bg-[#7F2F1C] border border-[#7F2F1C] shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1 z-50 shrink-0"
              aria-label={isMobileMenuOpen ? (isEn ? 'Close menu' : 'Zatvori meni') : (isEn ? 'Open menu' : 'Otvori meni')}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <>
                  <Menu className="w-5 h-5 stroke-[2.5]" />
                  <span className="text-xs font-bold uppercase tracking-wider hidden xs:inline">
                    {isEn ? 'Meni' : 'Meni'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Fully Scrollable Overlay with All Links & Theme Controls) */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 pt-3 pb-32 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[82vh] overflow-y-auto ${
          isDark ? 'bg-[#15110E] border-[#382C24] text-[#FAF7F2]' : 'bg-[#FAF7F2] border-[#E8E0D5] text-[#241D19]'
        }`}>
          {/* Theme Switcher Banner at Top of Mobile Menu */}
          <div className="pb-2 border-b border-[#E8E0D5] dark:border-[#382C24]">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-[#261F1A] border-[#4A3B32] text-[#FAF7F2] hover:bg-[#342922]'
                  : 'bg-white border-[#E8E0D5] text-[#241D19] hover:bg-[#F4E8E3]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                {isDark ? <Sun className="w-4.5 h-4.5 text-[#C2872A]" /> : <Moon className="w-4.5 h-4.5 text-[#7F2F1C]" />}
                <span>{isEn ? 'App Visual Theme:' : 'Tema i izgled sajta:'}</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                isDark ? 'bg-[#1A1512] border-[#C2872A]/40 text-[#E8D0A9]' : 'bg-[#FAF7F2] border-[#9E3E26]/30 text-[#9E3E26]'
              }`}>
                {isDark ? (isEn ? '🌙 Dark Mode' : '🌙 Tamna tema') : (isEn ? '☀️ Light Mode' : '☀️ Svetla tema')}
              </span>
            </button>
          </div>

          {/* Language Switch Segmented on Mobile Drawer */}
          <div className="pb-2 border-b border-[#E8E0D5] dark:border-[#382C24]">
            <div className="flex items-center justify-between text-xs font-semibold mb-2 text-[#241D19] dark:text-[#FAF7F2]">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C2872A]" />
                <span>{isEn ? 'Language / Jezik:' : 'Jezik sajta:'}</span>
              </span>
              <span className="text-[#9E3E26] font-bold">{isEn ? 'English (Active)' : 'Srpski (Aktivno)'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLanguage('sr')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  language === 'sr'
                    ? 'bg-[#9E3E26] text-white border-[#9E3E26] shadow-xs'
                    : 'bg-white dark:bg-[#261F1A] border-[#E8E0D5] dark:border-[#4A3B32] text-[#241D19] dark:text-[#FAF7F2]'
                }`}
              >
                <span>🇷🇸</span>
                <span>Srpski jezik</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#9E3E26] text-white border-[#9E3E26] shadow-xs'
                    : 'bg-white dark:bg-[#261F1A] border-[#E8E0D5] dark:border-[#4A3B32] text-[#241D19] dark:text-[#FAF7F2]'
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
          </div>

          {/* Currency Switch Segmented on Mobile Drawer */}
          <div className="pb-3 border-b border-[#E8E0D5] dark:border-[#382C24]">
            <CurrencySelector variant="mobile" />
          </div>

          {/* Targeted Heritage Guides & SEO Landing Pages on Mobile Drawer */}
          <div className="space-y-1.5 py-1">
            <span className="text-[10px] uppercase font-bold text-[#9E3E26] dark:text-[#E8D0A9] tracking-wider px-2 flex items-center gap-1.5 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>{isEn ? 'Featured Heritage Guides (Landing Pages):' : 'Tematske celine i vodiči:'}</span>
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {landingItems.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleLandingClick(item.slug)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#261F1A] border-[#382C24] hover:border-[#C2872A]'
                      : 'bg-[#FAF7F2] border-[#E8E0D5] hover:border-[#9E3E26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#241D19] dark:text-[#FAF7F2]">
                      {isEn ? item.labelEn : item.labelSr}
                    </span>
                    <span className="text-[#9E3E26] dark:text-[#E8D0A9] text-xs font-mono">→</span>
                  </div>
                  <span className="text-[11px] text-[#241D19]/60 dark:text-[#FAF7F2]/60 block mt-0.5">
                    {isEn ? item.descEn : item.descSr}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Complete Navigation Links List */}
          <div className="space-y-1 py-1">
            <span className="text-[10px] uppercase font-bold text-[#7F2F1C] dark:text-[#E8D0A9] tracking-wider px-2 block mb-1">
              {isEn ? 'Navigation Sections:' : 'Navigacija kroz sajt:'}
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all border ${
                  isDark
                    ? 'text-[#FAF7F2] bg-[#261F1A]/60 border-[#382C24] hover:bg-[#342922] hover:text-[#C2872A]'
                    : 'text-[#241D19] bg-white border-[#E8E0D5] hover:bg-[#F4E8E3] hover:text-[#9E3E26]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-[#9E3E26] dark:text-[#E8D0A9] text-xs font-mono">→</span>
              </a>
            ))}
          </div>

          {/* Custom Order & Gallery & Track Buttons */}
          <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-[#382C24]' : 'border-[#E8E0D5]'}`}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenTrackOrder) {
                  onOpenTrackOrder();
                } else {
                  const el = document.getElementById('pracenje');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl cursor-pointer border shadow-2xs ${
                isDark
                  ? 'bg-[#261F1A] border-[#4A3B32] text-[#E8D0A9] hover:bg-[#342922]'
                  : 'bg-[#F3ECE0] border-[#D5C9BA] text-[#9E3E26] hover:bg-[#E8E0D5]'
              }`}
            >
              <Package className="w-4 h-4 text-[#C2872A]" />
              <span>{isEn ? 'Track Bespoke Order Status' : 'Praćenje Statusa Porudžbine'}</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGalleryUpload();
              }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl cursor-pointer border shadow-2xs ${
                isDark
                  ? 'bg-[#261F1A] border-[#4A3B32] text-[#FAF7F2] hover:bg-[#342922]'
                  : 'bg-[#E8E0D5] border-[#D5C9BA] text-[#241D19] hover:bg-[#D5C9BA]'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#C2872A]' : 'text-[#9E3E26]'}`} />
              <span>{t.navMyPhotos} ({userPhotoCount})</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-white bg-[#9E3E26] hover:bg-[#7F2F1C] rounded-xl shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.navOrderCustom}</span>
            </button>
          </div>

          {/* Social Media Quick Links on Mobile Drawer */}
          <div className="pt-3 border-t border-[#E8E0D5] dark:border-[#382C24]">
            <div className="text-[11px] font-semibold text-[#7F2F1C] dark:text-[#E8D0A9] uppercase tracking-wider mb-2">
              {isEn ? 'Follow our official channels:' : 'Pratite nas na mrežama:'}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="https://www.instagram.com/savremenikoreni?utm_source=qr&stkn=YmJtcjd6a2xiOGc="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-[#261F1A] border border-[#F1D2C4] dark:border-[#4A3B32] text-[#E1306C] font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <span>IG: @savremenikoreni</span>
              </a>
              <a
                href="https://www.instagram.com/tanja.petric_?utm_source=qr&stkn=M25iaXozbXAyMDVs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-[#261F1A] border border-[#E9C7BA] dark:border-[#4A3B32] text-[#C13584] font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <span>IG: @tanja.petric_</span>
              </a>
              <a
                href="https://www.facebook.com/share/1CFPeuE1Zf/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-[#261F1A] border border-[#CAD7EA] dark:border-[#4A3B32] text-[#1877F2] font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@tanja53c?_r=1&_t=ZS-99c3mi02PNh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-[#261F1A] border border-gray-300 dark:border-[#4A3B32] text-[#241D19] dark:text-white font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <span>TikTok @tanja53c</span>
              </a>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-[#241D19]/80 dark:text-[#FAF7F2]/80">
            <p>{isEn ? 'Owner & Artisan:' : 'Vlasnik:'} <strong>{companyDetails.owner}</strong> • {companyDetails.phoneFormatted}</p>
          </div>
        </div>
      )}
    </header>
  );
};
