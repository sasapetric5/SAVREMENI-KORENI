import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Phone, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Sparkles, 
  Heart, 
  Truck, 
  Award, 
  BookOpen, 
  ArrowRight,
  HelpCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seoLandingPages, SeoLandingPageData } from '../data/seoLandingPagesData';
import { productsData, companyDetails } from '../data/companyData';
import { Product } from '../types';
import { getProductImageAlt, getProductImageTitle } from '../utils/imageSeo';
import { injectLandingPageSocialMeta } from '../utils/socialMeta';

interface SeoLandingPageProps {
  slug: string;
  onBack: () => void;
  onOpenOrder: (product?: Product) => void;
  onSelectBlog: (slug: string) => void;
  onNavigateLandingPage: (slug: string) => void;
}

export const SeoLandingPage: React.FC<SeoLandingPageProps> = ({
  slug,
  onBack,
  onOpenOrder,
  onSelectBlog,
  onNavigateLandingPage
}) => {
  const { isEn } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pageData: SeoLandingPageData | undefined = seoLandingPages[slug];

  // Dynamic SEO meta tags, title and schema injection
  useEffect(() => {
    if (!pageData) return;

    // Update document title and description
    const title = isEn ? pageData.metaTitleEn : pageData.metaTitleSr;
    const desc = isEn ? pageData.metaDescriptionEn : pageData.metaDescriptionSr;
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('content', `https://savremenikoreni.com${pageData.path}${isEn ? '?lang=en' : ''}`);

    // Inject JSON-LD Schema (FAQPage + BreadcrumbList)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': pageData.faqs.map((faq) => ({
        '@type': 'Question',
        'name': isEn ? faq.questionEn : faq.questionSr,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': isEn ? faq.answerEn : faq.answerSr
        }
      }))
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': isEn ? 'Home' : 'Početna',
          'item': 'https://savremenikoreni.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': isEn ? pageData.titleEn : pageData.titleSr,
          'item': `https://savremenikoreni.com${pageData.path}`
        }
      ]
    };

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'landing-faq-schema';
    scriptFaq.text = JSON.stringify(faqSchema);

    const scriptBc = document.createElement('script');
    scriptBc.type = 'application/ld+json';
    scriptBc.id = 'landing-bc-schema';
    scriptBc.text = JSON.stringify(breadcrumbSchema);

    document.head.appendChild(scriptFaq);
    document.head.appendChild(scriptBc);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const cleanupSocial = injectLandingPageSocialMeta(slug, isEn);

    return () => {
      cleanupSocial();
      document.getElementById('landing-faq-schema')?.remove();
      document.getElementById('landing-bc-schema')?.remove();
    };
  }, [pageData, isEn, slug]);

  if (!pageData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#241D19] mb-3">
          {isEn ? 'Topic page not found' : 'Stranica teme nije pronađena'}
        </h2>
        <p className="text-sm text-[#241D19]/70 mb-6">
          {isEn ? 'The requested landing page does not exist.' : 'Tražena tematska stranica ne postoji.'}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-[#9E3E26] text-white rounded-xl text-sm font-semibold hover:bg-[#83321D] transition-colors"
        >
          {isEn ? '← Back to Home' : '← Nazad na početnu'}
        </button>
      </div>
    );
  }

  // Filter relevant products
  const matchingProducts = productsData.filter((p) => pageData.targetProductIds.includes(p.id));

  // Other landing pages for internal linking
  const otherLandingPages = Object.values(seoLandingPages).filter((lp) => lp.slug !== slug);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#241D19] pb-20">
      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-white border-b border-[#E8E0D5] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#9E3E26] hover:text-[#83321D] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{isEn ? 'Back to Home' : 'Nazad na početnu'}</span>
          </button>

          <div className="text-xs text-[#241D19]/60 hidden sm:flex items-center gap-2">
            <span>{isEn ? 'Home' : 'Početna'}</span>
            <span>/</span>
            <span className="text-[#9E3E26] font-medium">{isEn ? pageData.titleEn : pageData.titleSr}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAF7F2] border-b border-[#E8E0D5] py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E3E26]/10 border border-[#9E3E26]/20 text-[#9E3E26] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEn ? pageData.badgeEn : pageData.badgeSr}</span>
              </div>

              {/* Main H1 */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241D19] leading-tight">
                {isEn ? pageData.titleEn : pageData.titleSr}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#241D19]/80 leading-relaxed max-w-2xl font-sans">
                {isEn ? pageData.subtitleEn : pageData.subtitleSr}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#241D19]/70 pt-1">
                <span className="flex items-center gap-1.5 bg-[#F2EDE4] px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-4 h-4 text-[#4E6852]" />
                  {isEn ? 'Certified Authentic Craft' : 'Sertifikovan ručni rad'}
                </span>
                <span className="flex items-center gap-1.5 bg-[#F2EDE4] px-2.5 py-1 rounded-md">
                  <Truck className="w-4 h-4 text-[#9E3E26]" />
                  {isEn ? 'Worldwide Air Shipping' : 'Domaća & avio isporuka'}
                </span>
                <span className="flex items-center gap-1.5 bg-[#F2EDE4] px-2.5 py-1 rounded-md">
                  <Heart className="w-4 h-4 text-[#9E3E26]" />
                  {isEn ? '100% Homolje, Serbia' : '100% Homolje, Jošanica'}
                </span>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenOrder()}
                  className="px-6 py-3 bg-[#9E3E26] hover:bg-[#83321D] text-white text-sm sm:text-base font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isEn ? 'Inquire & Order Now' : 'Poručite ili se raspitajte'}</span>
                </button>

                <a
                  href={`tel:${companyDetails.phone}`}
                  className="px-5 py-3 bg-white hover:bg-[#F2EDE4] text-[#241D19] border border-[#E8E0D5] text-sm sm:text-base font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#4E6852]" />
                  <span>{companyDetails.phoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Right Images Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Main Hero Photo */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 sm:aspect-square bg-[#E8E0D5]">
                  <img
                    src={pageData.heroImage}
                    alt={isEn ? pageData.titleEn : pageData.titleSr}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs uppercase tracking-wider font-bold bg-[#9E3E26] px-2 py-0.5 rounded-sm">
                      {isEn ? 'Artisan Workshop' : 'Radionica Jošanica'}
                    </span>
                    <p className="text-sm font-serif mt-1 font-medium drop-shadow-xs">
                      {isEn ? 'Master Tanja Petrić craftsmanship' : 'Rad majstora Tanje Petrić'}
                    </p>
                  </div>
                </div>

                {/* Secondary Inset Photo */}
                <div className="absolute -bottom-6 -right-4 w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF7F2] hidden sm:block">
                  <img
                    src={pageData.secondaryImage}
                    alt="Detail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Key Pillars / Highlights Grid */}
      <section className="py-12 bg-white border-b border-[#E8E0D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19]">
              {isEn ? 'Authentic Quality Pillars' : 'Odlike autentičnog kvaliteta'}
            </h2>
            <p className="text-xs sm:text-sm text-[#241D19]/70 mt-1">
              {isEn ? 'Why our handmade items stand out across Serbia and worldwide' : 'Zašto su naši proizvodi prepoznatljivi u zemlji i rasejanju'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.keyHighlights.map((hl, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] hover:border-[#9E3E26]/40 transition-all shadow-2xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#9E3E26]/10 text-[#9E3E26] flex items-center justify-center font-bold mb-4">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#241D19] mb-2">
                  {isEn ? hl.titleEn : hl.titleSr}
                </h3>
                <p className="text-xs sm:text-sm text-[#241D19]/75 leading-relaxed font-sans">
                  {isEn ? hl.descEn : hl.descSr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative & Craftsmanship Story */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-12">
          {pageData.contentSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19] leading-snug">
                {isEn ? sec.headingEn : sec.headingSr}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#241D19]/85 leading-relaxed font-sans">
                {(isEn ? sec.paragraphsEn : sec.paragraphsSr).map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {sec.quoteSr && (
                <div className="my-6 p-6 rounded-2xl bg-white border-l-4 border-[#9E3E26] shadow-2xs italic font-serif text-base sm:text-lg text-[#241D19]/90">
                  {isEn ? sec.quoteEn : sec.quoteSr}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sizing Guide (If available) */}
      {pageData.sizeGuide && (
        <section className="py-12 bg-white border-y border-[#E8E0D5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#4E6852]/15 text-[#4E6852] flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
                {isEn ? pageData.sizeGuide.titleEn : pageData.sizeGuide.titleSr}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#241D19]/80 mb-6 leading-relaxed font-sans">
              {isEn ? pageData.sizeGuide.instructionsEn : pageData.sizeGuide.instructionsSr}
            </p>

            <div className="overflow-x-auto rounded-xl border border-[#E8E0D5] shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-[#FAF7F2]">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8E0D5] text-[#241D19] font-serif font-bold">
                    <th className="p-3 sm:p-4">{isEn ? 'Size Label' : 'Oznaka veličine'}</th>
                    <th className="p-3 sm:p-4">{isEn ? 'Measurement' : 'Mera (obim / dužina)'}</th>
                    <th className="p-3 sm:p-4">{isEn ? 'Recommendation' : 'Preporuka / Namena'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D5] bg-white">
                  {pageData.sizeGuide.table.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-3 sm:p-4 font-bold text-[#9E3E26]">{row.size}</td>
                      <td className="p-3 sm:p-4 text-[#241D19] font-medium">{row.measurement}</td>
                      <td className="p-3 sm:p-4 text-[#241D19]/70">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Showcase */}
      {matchingProducts.length > 0 && (
        <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E3E26]">
                {isEn ? 'Selected Models' : 'Izabrani modeli iz radionice'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19] mt-1">
                {isEn ? 'Direct Order Catalog' : 'Katalog sa cenama i poručivanjem'}
              </h2>
            </div>
            <button
              onClick={() => onBack()}
              className="text-xs sm:text-sm font-bold text-[#9E3E26] hover:text-[#83321D] flex items-center gap-1 cursor-pointer"
            >
              <span>{isEn ? 'View all products' : 'Pogledajte ceo katalog'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-4/3 bg-[#FAF7F2] overflow-hidden">
                  <img
                    src={prod.image}
                    alt={getProductImageAlt(prod, isEn)}
                    title={getProductImageTitle(prod, isEn)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-[#9E3E26] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {isEn && prod.badgeEn ? prod.badgeEn : prod.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#241D19]">
                      {isEn && prod.nameEn ? prod.nameEn : prod.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#241D19]/75 mt-1.5 line-clamp-2">
                      {isEn && prod.descriptionEn ? prod.descriptionEn : prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E0D5] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#241D19]/60 block">{isEn ? 'Price' : 'Cena'}</span>
                      <span className="text-lg font-serif font-bold text-[#9E3E26]">
                        {prod.priceRsd.toLocaleString('sr-RS')} RSD
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenOrder(prod)}
                      className="px-4 py-2 bg-[#9E3E26] hover:bg-[#83321D] text-white rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Order' : 'Poruči'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Frequently Asked Questions (Accordion) */}
      <section className="py-14 bg-white border-y border-[#E8E0D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E3E26]">FAQ</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19] mt-1">
              {isEn ? 'Frequently Asked Questions' : 'Česta pitanja kupaca'}
            </h2>
            <p className="text-xs sm:text-sm text-[#241D19]/70 mt-1">
              {isEn ? 'Answers regarding sizes, orders, materials, and international delivery' : 'Sve o poručivanju, veličinama, materijalima i slanju'}
            </p>
          </div>

          <div className="space-y-3">
            {pageData.faqs.map((faq, fIdx) => {
              const isOpen = activeFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-xl border border-[#E8E0D5] overflow-hidden bg-[#FAF7F2]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#241D19] hover:text-[#9E3E26] transition-colors cursor-pointer"
                  >
                    <span>{isEn ? faq.questionEn : faq.questionSr}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#9E3E26] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#241D19]/50 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#241D19]/80 leading-relaxed font-sans border-t border-[#E8E0D5]/50 bg-white">
                      {isEn ? faq.answerEn : faq.answerSr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Other Targeted Topics */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19] mb-6">
          {isEn ? 'Other Heritage Collections' : 'Druge tematske celine i tradicije'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherLandingPages.map((other) => (
            <div
              key={other.slug}
              onClick={() => onNavigateLandingPage(other.slug)}
              className="p-5 rounded-2xl bg-white border border-[#E8E0D5] hover:border-[#9E3E26] shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-[#9E3E26] uppercase tracking-wider block mb-1">
                  {isEn ? 'Target Guide' : 'Tematski vodič'}
                </span>
                <h4 className="font-serif font-bold text-base text-[#241D19] group-hover:text-[#9E3E26] transition-colors">
                  {isEn ? other.titleEn : other.titleSr}
                </h4>
                <p className="text-xs text-[#241D19]/70 mt-2 line-clamp-2">
                  {isEn ? other.subtitleEn : other.subtitleSr}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E0D5] flex items-center gap-1 text-xs font-bold text-[#9E3E26]">
                <span>{isEn ? 'Explore topic' : 'Pogledajte stranicu'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Sticky Action Banner on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E8E0D5] z-40 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <p className="text-xs font-serif font-bold text-[#241D19] truncate">
            {isEn ? pageData.titleEn : pageData.titleSr}
          </p>
          <span className="text-[11px] text-[#4E6852] font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" /> {isEn ? 'Handmade on order' : 'Ručna izrada po meri'}
          </span>
        </div>
        <button
          onClick={() => onOpenOrder()}
          className="px-4 py-2 bg-[#9E3E26] text-white text-xs font-bold rounded-xl shrink-0 shadow-sm"
        >
          {isEn ? 'Order Now' : 'Poruči'}
        </button>
      </div>

    </div>
  );
};
