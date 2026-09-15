import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Instagram, Facebook, Sun, Moon, Lock } from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { useLogo } from '../context/LogoContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { CurrencySelector } from './CurrencySelector';
import { NewsletterSignup } from './NewsletterSignup';

interface FooterProps {
  onNavigateLandingPage?: (slug: string) => void;
  onOpenTrackOrder?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateLandingPage, onOpenTrackOrder, onOpenAdmin }) => {
  const { logoUrl } = useLogo();
  const { isDark, toggleTheme } = useTheme();
  const { t, isEn } = useLanguage();

  const handleLandingClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    if (onNavigateLandingPage) {
      onNavigateLandingPage(slug);
    } else {
      window.location.href = `/${slug}`;
    }
  };

  return (
    <footer className="bg-[#1A1512] text-[#FAF7F2] pt-16 pb-28 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Signup Banner */}
        <NewsletterSignup />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C2872A] shadow-md bg-black shrink-0">
                <img
                  src={logoUrl}
                  alt="Savremeni Koreni Logo"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-tight">
                  Savremeni Koreni
                </span>
                <span className="text-[11px] tracking-wider text-[#E8D0A9] font-serif italic block">
                  {t.brandTagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/70 leading-relaxed font-light">
              {t.footerAboutText}
            </p>

            <div className="pt-1 text-xs text-[#E8D0A9] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C2872A]" />
              <span>{isEn ? 'Officially registered workshop in APR RS' : 'Registrovan privredni subjekt u APR RS'}</span>
            </div>

            {/* Social Media 3D Pills in Brand Column */}
            <div className="pt-3 space-y-2">
              <div className="text-[11px] uppercase tracking-widest text-[#E8D0A9] font-semibold">
                {isEn ? 'Social Networks & Video:' : 'Društvene Mreže & Video:'}
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/savremenikoreni?utm_source=qr&stkn=YmJtcjd6a2xiOGc="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 border border-[#E1306C]/40 hover:border-[#E1306C] text-[#FAF7F2] text-xs hover:scale-105 transition-all shadow-xs"
                  title="Instagram brenda: @savremenikoreni"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>@savremenikoreni</span>
                </a>

                <a
                  href="https://www.instagram.com/tanja.petric_?utm_source=qr&stkn=M25iaXozbXAyMDVs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 border border-[#C13584]/40 hover:border-[#C13584] text-[#FAF7F2] text-xs hover:scale-105 transition-all shadow-xs"
                  title="Instagram Tanje Petrić: @tanja.petric_"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C13584]" />
                  <span>@tanja.petric_</span>
                </a>

                <a
                  href="https://www.facebook.com/share/1CFPeuE1Zf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1877F2]/20 border border-[#1877F2]/40 hover:border-[#1877F2] text-[#FAF7F2] text-xs hover:scale-105 transition-all shadow-xs"
                  title="Facebook stranica: Savremeni Koreni"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://pin.it/68KvVdZrn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E60023]/20 border border-[#E60023]/40 hover:border-[#E60023] text-[#FAF7F2] text-xs hover:scale-105 transition-all shadow-xs"
                  title="Pinterest tabla: Savremeni Koreni"
                >
                  <span className="font-bold text-[#E60023] text-xs">P</span>
                  <span>Pinterest</span>
                </a>

                <a
                  href="https://www.tiktok.com/@tanja53c?_r=1&_t=ZS-99c3mi02PNh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 hover:border-white text-[#FAF7F2] text-xs hover:scale-105 transition-all shadow-xs"
                  title="TikTok video snimci: @tanja53c"
                >
                  <span className="font-bold text-cyan-400 text-xs">TT</span>
                  <span>@tanja53c (TikTok)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8D0A9]">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenTrackOrder) {
                      onOpenTrackOrder();
                    } else {
                      const el = document.getElementById('pracenje');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-[#E8D0A9] text-[#E8D0A9] transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span className="text-[#C2872A]">📦</span>
                  <span>{isEn ? 'Track Order Status' : 'Praćenje Porudžbine'}</span>
                </button>
              </li>
              <li><a href="#pocetna" className="hover:text-white transition-colors">{t.navHome}</a></li>
              <li><a href="#o-nama" className="hover:text-white transition-colors">{t.navAbout}</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">{t.navCatalog}</a></li>
              <li><a href="#izrada" className="hover:text-white transition-colors">{t.navProcess}</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">{t.navBlog}</a></li>
              <li><a href="#galerija" className="hover:text-white transition-colors">{t.navGallery}</a></li>
              <li><a href="#podaci-firme" className="hover:text-white transition-colors">{t.navCompany}</a></li>
              <li><a href="#sertifikati-kvalitet" className="hover:text-white transition-colors">{isEn ? 'Certificates & Fairs (E-E-A-T)' : 'Sertifikati i Sajmovi'}</a></li>
              <li><a href="#atelje-lokacija" className="hover:text-white transition-colors">{isEn ? 'Atelier & Google Maps' : 'Atelje i Google Mapa'}</a></li>
              <li><a href="#faq-sekcija" className="hover:text-[#E8D0A9] transition-colors">{isEn ? 'FAQ & Care Guide' : 'Česta Pitanja & Nega (FAQ)'}</a></li>
              <li><a href="#kontakt" className="hover:text-white transition-colors">{t.navContact}</a></li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenAdmin) onOpenAdmin();
                    else window.location.href = '/admin';
                  }}
                  className="hover:text-[#FAF7F2] text-[#E8D0A9] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C2872A]" />
                  <span>Admin Panel (Koreni2026)</span>
                </button>
              </li>
              <li>
                <a href="#performanse-web-vitals" className="hover:text-[#E8D0A9] transition-colors flex items-center gap-1 text-[#E8D0A9]/90 font-medium">
                  <span className="text-emerald-400 text-xs">⚡</span>
                  <span>{isEn ? 'Speed & Web Vitals' : 'Performanse & Web Vitals'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories & SEO Targeted Guides (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8D0A9]">
              {isEn ? 'Thematic Heritage Guides' : 'Tematske Celine & Vodiči'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#FAF7F2]/80">
              <li>
                <a 
                  href="/subare-homolje" 
                  onClick={(e) => handleLandingClick(e, 'subare-homolje')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Traditional Fur Šubara Hats' : 'Tradicionalne Krznene Šubare'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/nosnje-i-vez" 
                  onClick={(e) => handleLandingClick(e, 'nosnje-i-vez')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Folk Costumes & Hand Embroidery' : 'Narodne Nošnje & Ručni Vez'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/vunene-carape" 
                  onClick={(e) => handleLandingClick(e, 'vunene-carape')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Pure Wool Folk Socks (5 Needles)' : 'Vunene Čarape Pletene na 5 Igala'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/etno-pokloni-za-inostranstvo" 
                  onClick={(e) => handleLandingClick(e, 'etno-pokloni-za-inostranstvo')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Ethno Gifts for Diaspora & Abroad' : 'Etno Pokloni za Inostranstvo'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/unikatne-makrame-torbe" 
                  onClick={(e) => handleLandingClick(e, 'unikatne-makrame-torbe')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Handmade Macramé Handbags' : 'Unikatne Makrame Torbe'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/zlatovez-i-srma" 
                  onClick={(e) => handleLandingClick(e, 'zlatovez-i-srma')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Goldwork & Metallic Srma' : 'Tradicionalni Srpski Zlatovez'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/heklani-nakit-i-ogrlice" 
                  onClick={(e) => handleLandingClick(e, 'heklani-nakit-i-ogrlice')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Crochet Folk Jewelry' : 'Heklani Nakit i Etno Ogrlice'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/opanci-i-folklorna-obuca" 
                  onClick={(e) => handleLandingClick(e, 'opanci-i-folklorna-obuca')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Leather Dance Opanci' : 'Kožni Opanci za Folklor'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/vezene-kosulje-za-svadbe-i-slave" 
                  onClick={(e) => handleLandingClick(e, 'vezene-kosulje-za-svadbe-i-slave')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Embroidered Wedding Shirts' : 'Svečane Vezene Košulje'}</span>
                </a>
              </li>
              <li>
                <a 
                  href="/homoljski-suveniri-i-josanica" 
                  onClick={(e) => handleLandingClick(e, 'homoljski-suveniri-i-josanica')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C2872A] text-[10px]">✦</span>
                  <span>{isEn ? 'Homolje & Jošanica Souvenirs' : 'Autentični Suveniri iz Homolja'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Official APR Data & Contact (col-span-3) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8D0A9]">
              {t.footerContactInfo}
            </h4>

            <div className="space-y-2 text-[#FAF7F2]/80 font-mono text-[11px]">
              <p>
                <strong className="text-white font-sans">TANjA PETRIĆ PR SAVREMENI KORENI</strong>
              </p>
              <p>{t.legalPib}: <span className="text-[#E8D0A9] font-bold">{companyDetails.pib}</span></p>
              <p>{t.legalMb}: <span className="text-white">{companyDetails.maticniBroj}</span></p>
              <p>{isEn ? 'Activity Code: 1399' : 'Šifra delatnosti: 1399'}</p>
              <p className="flex items-start gap-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#C2872A] shrink-0 mt-0.5" />
                <span>Peskuša 9, 12318 Jošanica (Žagubica)</span>
              </p>
              <p className="flex items-center gap-1 font-sans">
                <Phone className="w-3.5 h-3.5 text-[#C2872A] shrink-0" />
                <a href={`tel:${companyDetails.phone}`} className="text-white hover:underline">
                  {companyDetails.phoneFormatted}
                </a>
              </p>
              <p className="flex items-center gap-1 font-sans">
                <Mail className="w-3.5 h-3.5 text-[#C2872A] shrink-0" />
                <a href={`mailto:${companyDetails.email}`} className="text-white hover:underline">
                  {companyDetails.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Accepted Payment Methods & Security Strip */}
        <div className="mt-12 pt-6 border-t border-[#FAF7F2]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/80">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="text-[11px] font-semibold text-[#E8D0A9] uppercase tracking-wider mr-1">
              {isEn ? 'Accepted Payment Methods:' : 'Prihvatamo platne kartice i načine plaćanja:'}
            </span>
            <span className="px-2 py-1 bg-[#1A1F71] text-white font-serif font-bold text-[11px] rounded-xs shadow-xs tracking-wider">
              VISA
            </span>
            <span className="px-2 py-1 bg-[#EB001B] text-white font-bold text-[11px] rounded-xs shadow-xs tracking-tighter">
              Mastercard
            </span>
            <span className="px-2 py-1 bg-[#00A4E4] text-white font-bold text-[11px] rounded-xs shadow-xs tracking-tight">
              DinaCard
            </span>
            <span className="px-2 py-1 bg-[#002A54] text-white font-semibold text-[11px] rounded-xs shadow-xs">
              Maestro
            </span>
            <span className="px-2 py-1 bg-[#003087] text-white font-serif italic font-bold text-[11px] rounded-xs shadow-xs">
              PayPal
            </span>
            <span className="px-2 py-1 bg-[#4E6852] text-white font-mono font-bold text-[11px] rounded-xs shadow-xs">
              IPS QR / e-Banking
            </span>
            <span className="px-2 py-1 bg-[#241D19] border border-[#E8D0A9]/30 text-[#E8D0A9] font-medium text-[11px] rounded-xs shadow-xs">
              {isEn ? 'Cash on Delivery' : 'Pouzećem'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#FAF7F2]/70 font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8D0A9]" />
            <span>{isEn ? '256-bit SSL Encrypted • 3D Secure Protection' : 'Sigurna 256-bit SSL enkripcija • 3D Secure zaštita'}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <div>
            {t.footerCopyright}
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Currency selector in footer */}
            <CurrencySelector variant="topbar" />

            {/* Theme switch in footer */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] text-[11px] transition-colors cursor-pointer border border-white/10"
              title={isDark ? (isEn ? 'Switch to light theme' : 'Prebaci na svetlu temu') : (isEn ? 'Switch to dark theme' : 'Prebaci na tamnu temu')}
              aria-label="Theme selector"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#E8D0A9]" />
                  <span>{t.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#E8D0A9]" />
                  <span>{t.themeDark}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-[11px]">
              <span>{t.footerHandcraftedWith}</span>
              <button
                id="footer-admin-btn"
                onClick={() => {
                  if (onOpenAdmin) onOpenAdmin();
                  else window.location.href = '/admin';
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C2872A]/15 hover:bg-[#C2872A]/30 border border-[#C2872A]/50 hover:border-[#C2872A] text-[#E8D0A9] hover:text-[#FAF7F2] rounded-full text-xs font-serif font-medium transition-all shadow-sm cursor-pointer ml-2"
                title="Administratorski pristup (Koreni2026)"
              >
                <Lock className="w-3.5 h-3.5 text-[#C2872A]" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
