import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Tag, 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Send,
  BookOpen,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  List,
  ShieldCheck,
  Instagram,
  Facebook,
  Pin,
  Video,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { BlogPost, Product } from '../types';
import { productsData } from '../data/companyData';
import { socialNetworksData } from '../data/socialMediaData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { getLocalizedBlogPost } from '../data/blogEnglishTranslations';
import { getRelatedProductsForBlogPost } from '../utils/relatedProductsMatcher';
import { getProductImageAlt, getProductImageTitle, getBlogPostImageAlt } from '../utils/imageSeo';
import { injectBlogPostSocialMeta } from '../utils/socialMeta';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOrderProduct?: (productName: string) => void;
  onSelectProduct?: (product: Product) => void;
  onNavigateLanding?: (slug: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onOrderProduct,
  onSelectProduct,
  onNavigateLanding,
}) => {
  const { t, isEn } = useLanguage();
  const { formatProduct } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentSent, setCommentSent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { isDark, toggleTheme } = useTheme();

  const activePost = post ? getLocalizedBlogPost(post, isEn) : null;

  // Dynamic OpenGraph and Twitter card meta tags for high-quality social sharing
  useEffect(() => {
    if (!activePost) return;
    const cleanup = injectBlogPostSocialMeta(activePost, isEn);
    return cleanup;
  }, [activePost, isEn]);

  // Dynamic Schema.org JSON-LD for Google SEO & Article / FAQ Rich Snippets
  useEffect(() => {
    if (!activePost) return;
    const schemaId = 'dynamic-blog-post-schema';
    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": activePost.title,
          "description": activePost.subtitle,
          "image": activePost.coverImage,
          "author": {
            "@type": "Person",
            "name": activePost.author,
            "jobTitle": activePost.authorRole
          },
          "publisher": {
            "@type": "Organization",
            "name": "Savremeni Koreni",
            "url": "https://savremenikoreni.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://savremenikoreni.com/logo.jpg"
            }
          },
          "datePublished": activePost.publishDate,
          "inLanguage": isEn ? "en-US" : "sr-RS"
        },
        ...(activePost.faqs && activePost.faqs.length > 0 ? [{
          "@type": "FAQPage",
          "mainEntity": activePost.faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        }] : [])
      ]
    };
    script.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [activePost, isEn]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    setCommentSent(true);
    setTimeout(() => {
      setUserComment('');
      setCommentName('');
    }, 1500);
  };

  const scrollToSection = (id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!post || !activePost) return null;

  const relatedContent = activePost 
    ? getRelatedProductsForBlogPost(activePost, isEn)
    : { products: [], landingPage: undefined };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#120F0D]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF7F2] text-[#241D19] rounded-2xl shadow-2xl border border-[#E8E0D5] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Reading Progress Bar */}
        <div className="w-full bg-[#E8E0D5] h-1.5 shrink-0 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#9E3E26] via-[#C2872A] to-[#9E3E26] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E8E0D5] bg-[#FAF7F2]/95 backdrop-blur-xs shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7F2F1C] hover:text-[#9E3E26] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? 'Back to all guides & stories' : 'Nazad na sve vodiče i članke'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#241D19] hover:bg-[#F4E8E3] transition-colors border border-[#E8E0D5] cursor-pointer"
              title={isDark ? (isEn ? 'Switch to Light Theme' : 'Prebaci na dnevni režim (Svetla tema)') : (isEn ? 'Switch to Dark Theme' : 'Prebaci na noćni režim čitanja (Tamna tema)')}
              aria-label="Theme toggle"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C2872A]" />
                  <span className="hidden sm:inline">{isEn ? 'Light' : 'Dnevni režim'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#7F2F1C]" />
                  <span className="hidden sm:inline">{isEn ? 'Dark' : 'Noćni režim'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#241D19] hover:bg-[#F4E8E3] transition-colors border border-[#E8E0D5] cursor-pointer"
              title={isEn ? 'Copy article link' : 'Kopirajte link ovog članka'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{isEn ? 'Link copied!' : 'Link kopiran!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#9E3E26]" />
                  <span>{isEn ? 'Share guide' : 'Podeli vodič'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-white hover:bg-[#9E3E26] text-[#241D19] hover:text-white rounded-full border border-[#E8E0D5] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center group shrink-0"
              aria-label={isEn ? 'Close guide' : 'Zatvori prozor'}
              title={isEn ? 'Close (ESC)' : 'Zatvori (ESC)'}
            >
              <X className="w-5 h-5 stroke-[2.5] transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div 
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 sm:py-8 space-y-8"
        >
          {/* Article Header Meta */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* SEO Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs text-[#241D19]/60 pb-1">
              <button onClick={onClose} className="hover:text-[#9E3E26] hover:underline transition-colors cursor-pointer">
                {isEn ? 'Home' : 'Početna'}
              </button>
              <span>/</span>
              <button onClick={onClose} className="hover:text-[#9E3E26] hover:underline transition-colors cursor-pointer">
                {isEn ? 'Heritage Encyclopedia & Blog' : 'Enciklopedija Tradicije & Blog'}
              </button>
              <span>/</span>
              <span className="text-[#9E3E26] font-semibold">{activePost.categoryLabel}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#9E3E26] text-white font-semibold tracking-wide uppercase text-[11px]">
                {activePost.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                <FileText className="w-3 h-3 text-emerald-600" />
                {activePost.wordCount.toLocaleString(isEn ? 'en-US' : 'sr-RS')} {isEn ? 'words • Comprehensive guide' : 'reči • Detaljan vodič'}
              </span>
              <span className="flex items-center gap-1 text-[#241D19]/70">
                <Calendar className="w-3.5 h-3.5 text-[#C2872A]" />
                {activePost.publishDate}
              </span>
              <span className="flex items-center gap-1 text-[#241D19]/70">
                <Clock className="w-3.5 h-3.5 text-[#C2872A]" />
                {activePost.readingTime}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-[#241D19] leading-tight tracking-tight">
              {activePost.title}
            </h1>

            <p className="text-base sm:text-lg text-[#241D19]/85 font-normal leading-relaxed italic border-l-3 border-[#C2872A] pl-4">
              {activePost.subtitle}
            </p>

            {/* Author Box Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3 py-3 border-y border-[#E8E0D5]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#120F0D] text-[#E8D0A9] flex items-center justify-center font-serif text-base font-bold border border-[#C2872A] shrink-0">
                  TP
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#241D19]">
                    {activePost.author}
                  </div>
                  <div className="text-xs text-[#241D19]/70">
                    {activePost.authorRole}
                  </div>
                </div>
              </div>

              {/* Target SEO Keywords Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#7F2F1C] flex items-center gap-1 mr-1">
                  <Tag className="w-3 h-3 text-[#9E3E26]" />
                  {isEn ? 'Keywords:' : 'Pretrage:'}
                </span>
                {activePost.targetKeywords.slice(0, 4).map((kw, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 rounded-md bg-[#F4E8E3] text-[#9E3E26] text-[11px] font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-md border border-[#E8E0D5]">
            <img
              src={activePost.coverImage}
              alt={getBlogPostImageAlt(activePost, isEn)}
              title={`${activePost.title} - Savremeni Koreni Blog`}
              className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="bg-[#FAF7F2] p-2.5 text-center text-xs text-[#241D19]/70 border-t border-[#E8E0D5] italic flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E3E26]" />
              <span>{isEn ? 'Authentic archival craft showcase from Savremeni Koreni studio (Jošanica, Serbia)' : 'Autentični arhivski prikaz rukotvorine radionice Savremeni Koreni (Jošanica, Srbija)'}</span>
            </div>
          </div>

          {/* Table of Contents Box */}
          <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-xl bg-white border border-[#E8E0D5] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E3E26]">
              <List className="w-4 h-4 text-[#9E3E26]" />
              <span>{isEn ? 'Guide Contents (Quick Jump):' : 'Sadržaj ovog vodiča (Brzi skok na poglavlje):'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activePost.sections.map((sec, sIdx) => sec.heading && (
                <button
                  key={sIdx}
                  onClick={() => scrollToSection(sec.id)}
                  className="text-left text-xs sm:text-sm text-[#241D19]/80 hover:text-[#9E3E26] hover:bg-[#FAF7F2] p-2 rounded-lg transition-colors flex items-start gap-2 cursor-pointer"
                >
                  <span className="font-bold text-[#C2872A]">{sIdx + 1}.</span>
                  <span className="line-clamp-2">{sec.heading}</span>
                </button>
              ))}
              {activePost.faqs && activePost.faqs.length > 0 && (
                <button
                  onClick={() => scrollToSection('faq-sekcija')}
                  className="text-left text-xs sm:text-sm text-[#9E3E26] font-semibold hover:bg-[#F4E8E3] p-2 rounded-lg transition-colors flex items-start gap-2 cursor-pointer"
                >
                  <span className="font-bold text-[#9E3E26]">FAQ:</span>
                  <span>{isEn ? `Frequently Asked Questions (${activePost.faqs.length})` : `Najčešća pitanja po Google pretragama (${activePost.faqs.length})`}</span>
                </button>
              )}
            </div>
          </div>

          {/* Core Article Content Sections */}
          <div className="max-w-3xl mx-auto space-y-10 text-[#241D19] leading-relaxed">
            {activePost.sections.map((section, idx) => (
              <div key={idx} id={section.id} className="space-y-4 scroll-mt-6">
                {section.heading && (
                  <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] font-bold text-[#241D19] pt-2 tracking-tight border-b border-[#E8E0D5]/60 pb-2">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-[17px] text-[#241D19]/90 leading-relaxed font-normal">
                    {p}
                  </p>
                ))}

                {/* Pull Quote */}
                {section.quote && (
                  <div className="my-6 p-5 sm:p-6 bg-[#F4E8E3]/60 rounded-xl border-l-4 border-[#9E3E26] space-y-2">
                    <Quote className="w-6 h-6 text-[#9E3E26]/50" />
                    <p className="font-serif text-lg sm:text-xl font-semibold italic text-[#241D19]">
                      "{section.quote.text}"
                    </p>
                    {section.quote.caption && (
                      <p className="text-xs text-[#7F2F1C] font-medium tracking-wide">
                        — {section.quote.caption}
                      </p>
                    )}
                  </div>
                )}

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="my-4 p-4 sm:p-5 bg-white rounded-xl border border-[#E8E0D5] shadow-xs space-y-2.5">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#241D19]/85">
                        <CheckCircle2 className="w-5 h-5 text-[#C2872A] shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Takeaway Box */}
                {section.keyTakeaway && (
                  <div className="my-4 p-4 rounded-xl bg-[#E8E0D5]/50 border border-[#D5C9BA] text-sm sm:text-base flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#9E3E26] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#9E3E26] block text-xs uppercase tracking-wider mb-1">
                        {isEn ? "Artisan's Key Takeaway & Advice:" : "Ključna misao i savet majstora:"}
                      </strong>
                      <span className="text-[#241D19]/90 font-medium">{section.keyTakeaway}</span>
                    </div>
                  </div>
                )}

                {/* Section Embedded Image */}
                {section.image && (
                  <div className="my-6 rounded-xl overflow-hidden border border-[#E8E0D5]">
                    <img 
                      src={section.image} 
                      alt={section.imageCaption || (isEn ? 'Handcraft detail' : 'Detalj ručnog rada')}
                      className="w-full max-h-80 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {section.imageCaption && (
                      <p className="p-2 text-center text-xs text-[#241D19]/70 bg-[#F4E8E3]/50 italic">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Google Search FAQ Section */}
            {activePost.faqs && activePost.faqs.length > 0 && (
              <div id="faq-sekcija" className="pt-8 border-t-2 border-[#E8E0D5] space-y-5 scroll-mt-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#9E3E26] text-white">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
                      {isEn ? 'Frequently Asked Questions (FAQ)' : 'Najčešća pitanja po Google pretragama (FAQ)'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#241D19]/75">
                      {isEn ? 'Artisan Tanja Petrić answers the most common queries about heritage crafts' : 'Odgovori majstora Tanje Petrić na pitanja koja ljudi najčešće postavljaju na internetu'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activePost.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div 
                        key={fIdx} 
                        className="rounded-xl border border-[#E8E0D5] bg-white overflow-hidden shadow-2xs transition-all"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                        >
                          <span className="font-semibold text-sm sm:text-base text-[#241D19] flex items-center gap-2.5">
                            <span className="text-[#9E3E26] font-bold text-xs">Q{fIdx + 1}:</span>
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#9E3E26] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#241D19]/60 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 pt-1 text-sm sm:text-[15px] text-[#241D19]/85 leading-relaxed bg-[#FAF7F2]/50 border-t border-[#E8E0D5]/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Conclusion & Reflection */}
            <div className="pt-6 border-t border-[#E8E0D5] space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#9E3E26]">
                {isEn ? 'Concluding Words' : 'Završna reč'}
              </h3>
              <p className="text-base sm:text-lg text-[#241D19]/90 leading-relaxed italic bg-white p-5 rounded-xl border border-[#E8E0D5]">
                {activePost.conclusion}
              </p>
            </div>

            {/* All Targeted Keywords Tag Cloud */}
            <div className="pt-4 border-t border-[#E8E0D5]">
              <span className="text-xs font-semibold text-[#241D19]/70 uppercase tracking-wider block mb-2">
                {isEn ? 'Key Craft & Heritage Topics in this article:' : 'Ključni SEO pojmovi obrađeni u ovom autoritativnom tekstu:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {activePost.targetKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E8E0D5] text-[#241D19] text-xs font-medium hover:border-[#9E3E26] transition-colors"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Automatically Generated Related Products & Link Equity Showcase */}
            {relatedContent.products.length > 0 && (
              <div className="my-8 p-5 sm:p-6 bg-gradient-to-br from-[#FAF2EC] via-[#FAF7F2] to-[#F5ECE4] rounded-2xl border border-[#DECFC0] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DECFC0]/70 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#9E3E26]/10 text-[#9E3E26] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#241D19]">
                        {isEn ? 'Handcrafted Pieces Related to this Article' : 'Rukotvorine iz radionice povezane sa ovom temom'}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#241D19]/70">
                        {isEn ? 'Authentic pieces handcrafted by artisan Tanja Petrić featured in this guide' : 'Autentični unikatni radovi majstora Tanje Petrić nastali tehnikama opisanim u tekstu'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E3E26] bg-[#9E3E26]/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                    {isEn ? 'Direct from Studio' : 'Direktno iz radionice'}
                  </span>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedContent.products.map((prod) => {
                    const priceInfo = formatProduct(prod);
                    const displayName = isEn && prod.nameEn ? prod.nameEn : prod.name;
                    const displayDesc = isEn && prod.descriptionEn ? prod.descriptionEn : prod.description;
                    const displayBadge = isEn && prod.badgeEn ? prod.badgeEn : prod.badge;

                    return (
                      <div 
                        key={prod.id}
                        className="bg-white rounded-xl border border-[#E8E0D5] p-3.5 flex flex-col justify-between hover:border-[#9E3E26]/60 hover:shadow-md transition-all group"
                      >
                        <div className="space-y-2.5">
                          <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8E0D5]/60">
                            <img 
                              src={prod.image} 
                              alt={getProductImageAlt(prod, isEn)}
                              title={getProductImageTitle(prod, isEn)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            {displayBadge && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#241D19]/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                                {displayBadge}
                              </span>
                            )}
                            {prod.inStock ? (
                              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-emerald-600/90 text-white text-[9px] font-medium">
                                {isEn ? 'In Stock' : 'Na stanju'}
                              </span>
                            ) : (
                              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#C2872A]/90 text-white text-[9px] font-medium">
                                {isEn ? 'Made to Order' : 'Po meri'}
                              </span>
                            )}
                          </div>

                          <div>
                            <h5 className="font-serif font-bold text-sm text-[#241D19] group-hover:text-[#9E3E26] transition-colors line-clamp-1">
                              {displayName}
                            </h5>
                            <p className="text-xs text-[#241D19]/70 line-clamp-2 mt-1 leading-snug">
                              {displayDesc}
                            </p>
                          </div>

                          {/* Tech chips */}
                          {prod.craftTechniques && prod.craftTechniques.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {(isEn && prod.craftTechniquesEn ? prod.craftTechniquesEn : prod.craftTechniques).slice(0, 2).map((tech, tIdx) => (
                                <span 
                                  key={tIdx}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-[#E8E0D5] text-[#241D19]/80 font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#E8E0D5]/70 space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs font-semibold text-[#241D19]/60">
                              {isEn ? 'Price:' : 'Cena:'}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-[#9E3E26]">
                                {priceInfo.formatted}
                              </span>
                              {priceInfo.isConverted ? (
                                <span className="text-[10px] text-[#241D19]/50 block">
                                  ({priceInfo.rsdFormatted})
                                </span>
                              ) : (
                                isEn && prod.priceEur && (
                                  <span className="text-[10px] text-[#C2872A] block font-medium">
                                    (~€{prod.priceEur})
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            {onSelectProduct ? (
                              <button
                                onClick={() => {
                                  onClose();
                                  onSelectProduct(prod);
                                }}
                                className="px-2 py-1.5 rounded-lg border border-[#D5C9BA] hover:bg-[#FAF7F2] hover:border-[#9E3E26] text-[#241D19] text-[11px] font-semibold text-center transition-colors cursor-pointer"
                              >
                                {isEn ? 'Details' : 'Detalji'}
                              </button>
                            ) : (
                              <a
                                href="#katalog"
                                onClick={onClose}
                                className="px-2 py-1.5 rounded-lg border border-[#D5C9BA] hover:bg-[#FAF7F2] hover:border-[#9E3E26] text-[#241D19] text-[11px] font-semibold text-center transition-colors block"
                              >
                                {isEn ? 'Catalog' : 'Katalog'}
                              </a>
                            )}

                            {onOrderProduct ? (
                              <button
                                onClick={() => {
                                  onClose();
                                  onOrderProduct(displayName);
                                }}
                                className="px-2 py-1.5 rounded-lg bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-[11px] font-semibold text-center transition-colors cursor-pointer flex items-center justify-center gap-1"
                              >
                                <ShoppingBag className="w-3 h-3 shrink-0" />
                                <span>{isEn ? 'Order' : 'Naruči'}</span>
                              </button>
                            ) : (
                              <a
                                href="#kontakt"
                                onClick={onClose}
                                className="px-2 py-1.5 rounded-lg bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-[11px] font-semibold text-center transition-colors block"
                              >
                                {isEn ? 'Order' : 'Naruči'}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Linked Thematic SEO Guide Callout */}
                {relatedContent.landingPage && (
                  <div className="pt-2">
                    <a
                      href={relatedContent.landingPage.path}
                      onClick={(e) => {
                        if (onNavigateLanding) {
                          e.preventDefault();
                          onClose();
                          onNavigateLanding(relatedContent.landingPage!.slug);
                        }
                      }}
                      className="p-3.5 rounded-xl bg-white border border-[#D5C9BA] hover:border-[#9E3E26] flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#C2872A]/15 text-[#C2872A] flex items-center justify-center shrink-0">
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#C2872A] tracking-wider block">
                            {isEn ? 'Specialized Collection & Guide' : 'Specijalizovani vodič & kolekcija'}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-[#241D19] group-hover:text-[#9E3E26] transition-colors">
                            {relatedContent.landingPage.title}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E3E26] shrink-0 group-hover:translate-x-1 transition-transform">
                        <span>{isEn ? 'View Guide' : 'Otvori vodič'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Author Bio Card */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8E0D5] flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#120F0D] text-[#E8D0A9] flex items-center justify-center font-serif text-xl font-bold border-2 border-[#C2872A] shrink-0 shadow-md">
                TP
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h4 className="font-serif text-base font-bold text-[#241D19]">
                  {isEn ? `About the artisan: ${activePost.author}` : `O autorki: ${activePost.author}`}
                </h4>
                <p className="text-xs sm:text-sm text-[#241D19]/80 leading-relaxed">
                  {isEn 
                    ? `Tanja Petrić creates in Jošanica (Homolje region), devoted to safeguarding traditional Serbian embroidery, national costume tailoring, crocheting, five-needle knitting, and traditional fur crafting. Through Savremeni Koreni, she bridges ancestral heritage with contemporary living.`
                    : `Tanja Petrić stvara u Jošanici (Homolje), posvećena očuvanju zaboravljenih tehnika srpskog veza, narodne nošnje, heklanja, pletenja na pet igala i tradicionalnog krznarstva. Kroz brend Savremeni Koreni, spaja nasleđe svojih predaka sa savremenim životnim stilom.`}
                </p>

                {/* Author Social Media Channels */}
                <div className="pt-2 border-t border-[#E8E0D5]">
                  <div className="text-[11px] font-semibold text-[#7F2F1C] uppercase tracking-wider mb-2">
                    {isEn ? 'Connect with Tanja on social channels:' : 'Povežite se sa Tanjom na društvenim mrežama:'}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <a
                      href="https://www.instagram.com/savremenikoreni?utm_source=qr&stkn=YmJtcjd6a2xiOGc="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF2EB] text-[#E1306C] border border-[#F1D2C4] hover:border-[#E1306C] text-xs font-semibold shadow-2xs hover:scale-105 transition-all"
                      title="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>@savremenikoreni</span>
                    </a>

                    <a
                      href="https://www.instagram.com/tanja.petric_?utm_source=qr&stkn=M25iaXozbXAyMDVs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF3F0] text-[#C13584] border border-[#E9C7BA] hover:border-[#C13584] text-xs font-semibold shadow-2xs hover:scale-105 transition-all"
                      title="Instagram Studio"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>@tanja.petric_ (Atelje)</span>
                    </a>

                    <a
                      href="https://www.facebook.com/share/1CFPeuE1Zf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F0F4FA] text-[#1877F2] border border-[#CAD7EA] hover:border-[#1877F2] text-xs font-semibold shadow-2xs hover:scale-105 transition-all"
                      title="Facebook"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>

                    <a
                      href="https://pin.it/68KvVdZrn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF0F0] text-[#E60023] border border-[#F1CDCD] hover:border-[#E60023] text-xs font-semibold shadow-2xs hover:scale-105 transition-all"
                      title="Pinterest"
                    >
                      <Pin className="w-3.5 h-3.5" />
                      <span>Pinterest</span>
                    </a>

                    <a
                      href="https://www.tiktok.com/@tanja53c?_r=1&_t=ZS-99c3mi02PNh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-black border border-gray-300 hover:border-black text-xs font-semibold shadow-2xs hover:scale-105 transition-all"
                      title="TikTok"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>TikTok (@tanja53c)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reader Question / Comment Form */}
            <div className="p-5 sm:p-6 bg-[#FAF7F2] rounded-2xl border border-[#E8E0D5] space-y-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#9E3E26]" />
                <h4 className="font-serif text-base font-bold text-[#241D19]">
                  {isEn ? 'Have a question regarding this article or craft technique?' : 'Imate pitanje u vezi ovog teksta ili tehnike izrade?'}
                </h4>
              </div>
              <p className="text-xs text-[#241D19]/75">
                {isEn ? 'We are happy to answer all questions about heritage traditions, motif symbolism, or custom handmade orders.' : 'Rado odgovaramo na sva pitanja o tradiciji, poreklu motiva ili izradi unikatnog komada po vašoj meri.'}
              </p>

              {commentSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {isEn ? 'Thank you for reaching out! Tanja will get back to you shortly.' : 'Hvala na poruci! Tanja će vam odgovoriti u najkraćem roku.'}
                </div>
              ) : (
                <form onSubmit={handleSendComment} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder={isEn ? 'Your Name' : 'Vaše ime'}
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg border border-[#D5C9BA] bg-white focus:outline-none focus:border-[#9E3E26]"
                    />
                    <input
                      type="text"
                      placeholder={isEn ? 'Phone or Email for response' : 'Vaš telefon ili email za odgovor'}
                      className="px-3 py-2 text-xs rounded-lg border border-[#D5C9BA] bg-white focus:outline-none focus:border-[#9E3E26]"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder={isEn ? 'Write your question or thoughts here...' : 'Napišite vaše pitanje ili utisak...'}
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5C9BA] bg-white focus:outline-none focus:border-[#9E3E26] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Send Question' : 'Pošalji pitanje Tanji'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#E8E0D5] bg-[#FAF7F2] flex items-center justify-between shrink-0 text-xs">
          <span className="text-[#241D19]/70 hidden sm:inline">
            savremenikoreni.com • {isEn ? 'Authority in traditional embroidery, folk costume, crochet, and macrame' : 'Autoritet iz oblasti tradicionalnog veza, narodne nošnje, heklanja i čvorovanja'}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            {onOrderProduct && (
              <button
                onClick={() => {
                  onClose();
                  onOrderProduct((isEn ? 'Inquiry inspired by guide: ' : 'Upit inspirisan vodičem: ') + activePost.title);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9E3E26] text-white font-semibold hover:bg-[#7F2F1C] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isEn ? 'Request Custom Piece' : 'Zatražite izradu unikata'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg border border-[#E8E0D5] text-[#241D19] font-medium hover:bg-[#E8E0D5]/50 transition-colors cursor-pointer"
            >
              {isEn ? 'Close' : 'Zatvori'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
