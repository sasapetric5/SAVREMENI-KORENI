import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Feather, 
  Check, 
  Filter,
  Flame,
  Heart,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  ShieldCheck
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../types';
import { blogPostsData } from '../data/blogData';
import { getLocalizedBlogPost } from '../data/blogEnglishTranslations';
import { getBlogPostImageAlt } from '../utils/imageSeo';
import { useLanguage } from '../context/LanguageContext';
import { BlogCardSkeleton } from './Skeletons';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
  onOrderProduct?: (productName: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectPost,
  onOrderProduct,
}) => {
  const { t, isEn } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('sve');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [expandedFaqKey, setExpandedFaqKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Localized post list
  const localizedBlogPosts = useMemo(() => {
    return blogPostsData.map(p => getLocalizedBlogPost(p, isEn));
  }, [isEn]);

  const categories = useMemo(() => [
    { id: 'sve', label: isEn ? 'All topics' : 'Sve teme' },
    { id: 'vez', label: isEn ? 'Embroidery & Goldwork' : 'Ručni Vez & Zlatovez', isPopular: true },
    { id: 'nosnja', label: isEn ? 'Folk Costume & Hats' : 'Narodna Nošnja, Opanci & Šubare', isPopular: true },
    { id: 'torbe', label: isEn ? 'Ethno Purses & Bags' : 'Etno Torbice & Ceger Torbe', isPopular: true },
    { id: 'vuna', label: isEn ? 'Fleece Wool & Knitting' : 'Runska Vuna & Pletenje', isPopular: true },
    { id: 'zanati', label: isEn ? 'Crochet & Macramé' : 'Heklanje, Makrame & Zanati', isPopular: true },
    { id: 'tradicija', label: isEn ? 'Heritage & Gifts' : 'Homolje & Etno Pokloni', isPopular: true },
    { id: 'materijali-pribor', label: isEn ? 'Sewing Supplies' : 'Pribor za Šivenje' }
  ], [isEn]);

  const filteredPosts = useMemo(() => {
    return localizedBlogPosts.filter((post) => {
      let matchesCategory = selectedCategory === 'sve';
      if (!matchesCategory) {
        if (selectedCategory === post.category) {
          matchesCategory = true;
        } else if (selectedCategory === 'vez' && (post.category === 'vez' || post.category === 'vrste-veza')) {
          matchesCategory = true;
        } else if (selectedCategory === 'nosnja' && (post.category === 'nosnja' || post.category === 'narodna-nosnja' || post.category === 'subare')) {
          matchesCategory = true;
        } else if (selectedCategory === 'torbe' && (post.category === 'torbe' || post.category === 'torbe-torbice')) {
          matchesCategory = true;
        } else if (selectedCategory === 'vuna' && (post.category === 'vuna' || post.category === 'pletenje' || post.category === 'pamucne-trake')) {
          matchesCategory = true;
        } else if (selectedCategory === 'zanati' && (post.category === 'zanati' || post.category === 'heklanje' || post.category === 'makrame-tehnike' || post.category === 'rucno-cvorovanje')) {
          matchesCategory = true;
        } else if (selectedCategory === 'tradicija' && post.category === 'tradicija') {
          matchesCategory = true;
        } else if (selectedCategory === 'materijali-pribor' && post.category === 'materijali-pribor') {
          matchesCategory = true;
        }
      }
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.targetKeywords.some(kw => kw.toLowerCase().includes(query)) ||
        post.sections.some(sec => 
          sec.heading?.toLowerCase().includes(query) ||
          sec.paragraphs?.some(p => p.toLowerCase().includes(query))
        ) ||
        post.faqs?.some(faq => 
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [localizedBlogPosts, selectedCategory, searchQuery]);

  // Aggregate all FAQs from all articles for the comprehensive search hub
  const allFaqs = useMemo(() => {
    const list: { post: BlogPost; question: string; answer: string; key: string }[] = [];
    localizedBlogPosts.forEach((post) => {
      post.faqs?.forEach((faq, idx) => {
        list.push({
          post,
          question: faq.question,
          answer: faq.answer,
          key: `${post.id}-faq-${idx}`
        });
      });
    });
    return list;
  }, [localizedBlogPosts]);

  const filteredFaqs = useMemo(() => {
    const q = faqSearchQuery.toLowerCase().trim();
    if (!q) return allFaqs;
    return allFaqs.filter(item => 
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.post.title.toLowerCase().includes(q) ||
      item.post.categoryLabel.toLowerCase().includes(q)
    );
  }, [allFaqs, faqSearchQuery]);

  // Featured flagship post is VEZ
  const featuredPost = useMemo(() => {
    return localizedBlogPosts.find(p => p.featured) || localizedBlogPosts[0];
  }, [localizedBlogPosts]);

  const shouldShowFeaturedBanner = selectedCategory === 'sve' && !searchQuery;

  return (
    <section id="blog" className="py-20 sm:py-24 bg-[#FAF7F2] text-[#241D19] border-t border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E0D5] pb-8"
        >
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4E8E3] text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-[#9E3E26]" />
              <span>{isEn ? 'Craft & Heritage Guides • 1000+ Words Each' : 'Autoritet za Vez i Stare Zanate • 1000+ Reči po Vodiču'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D19] tracking-tight">
              {isEn ? 'Heritage & Craft Knowledge: Guides Through Embroidery, Costumes & Fiber Arts' : 'Koreni & Znanje: Vodiči Kroz Vez, Nošnju, Heklanje i Čvorovanje'}
            </h2>
            <p className="text-base sm:text-lg text-[#241D19]/80 leading-relaxed font-normal">
              {isEn 
                ? 'Expert insights into traditional Serbian embroidery stitch techniques, folk costume symbolism, crochet crafts, macramé jewelry, and the properties of pure fleece wool.'
                : 'Domen savremenikoreni.com pruža najiscrpnije stručne odgovore na sva pitanja koja se pretražuju o srpskom tradicionalnom vezu, tehnikama bodova, elementima narodne nošnje, heklanom nakitu, makrameu i lekovitosti domaće vune.'}
            </p>
          </div>

          {/* Reading Philosophy Affirmation Badge */}
          <div className="bg-white p-4 rounded-xl border border-[#E8E0D5] shadow-xs max-w-xs shrink-0 hidden lg:block">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9E3E26] uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4 text-[#C2872A]" />
              <span>{isEn ? 'Expert in-depth articles' : 'Stručni članci 1000+ reči'}</span>
            </div>
            <p className="text-xs text-[#241D19]/75 leading-relaxed">
              {isEn 
                ? 'Each guide thoroughly covers historical origins, authentic stitch techniques, care advice, and answers common heritage questions.'
                : 'Svaki članak detaljno razlaže tehniku, istoriju, pripremu materijala, negu i najčešće nedoumice kupaca i ljubitelja tradicije.'}
            </p>
          </div>
        </motion.div>

        {/* Filter & Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#9E3E26] text-white shadow-sm'
                      : 'bg-white text-[#241D19] hover:bg-[#F4E8E3] border border-[#E8E0D5]'
                  }`}
                >
                  {cat.isPopular && (
                    <Flame className={`w-3.5 h-3.5 ${isActive ? 'text-[#E8D0A9]' : 'text-[#9E3E26]'}`} />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#241D19]/50" />
            <input
              type="text"
              placeholder={isEn ? 'Search (embroidery, costume, wool)...' : 'Pretraži (vez, nošnja, čvorovanje)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C9BA] bg-white focus:outline-none focus:border-[#9E3E26] text-[#241D19] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#241D19]/50 hover:text-[#241D19]"
              >
                {isEn ? 'Clear' : 'Obriši'}
              </button>
            )}
          </div>
        </motion.div>

        {/* Featured Showcase (Flagship VEZ Article - 1000+ words) */}
        {shouldShowFeaturedBanner && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#E8E0D5] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Banner */}
              <div className="lg:col-span-6 relative overflow-hidden h-72 sm:h-96 lg:h-auto min-h-[340px]">
                <img
                  src={featuredPost.coverImage}
                  alt={getBlogPostImageAlt(featuredPost, isEn)}
                  title={`${featuredPost.title} - Savremeni Koreni`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#9E3E26] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    {isEn ? 'Featured Guide' : 'Glavni Autoritet: VEZ'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-xs font-semibold shadow-xs">
                    {featuredPost.wordCount.toLocaleString(isEn ? 'en-US' : 'sr-RS')} {isEn ? 'words' : 'reči'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#241D19] text-xs font-semibold shadow-xs">
                    {featuredPost.readingTime}
                  </span>
                </div>
              </div>

              {/* Text Information */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#241D19]/70">
                    <span className="font-semibold text-[#9E3E26] uppercase tracking-wide">
                      {featuredPost.categoryLabel}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C2872A]" />
                      {featuredPost.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#9E3E26] font-semibold">
                      <HelpCircle className="w-3.5 h-3.5 text-[#9E3E26]" />
                      {featuredPost.faqs?.length || 4} {isEn ? 'FAQ answers' : 'Google FAQ odgovora'}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19] group-hover:text-[#9E3E26] transition-colors leading-snug">
                    {featuredPost.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#241D19]/80 leading-relaxed font-normal">
                    {featuredPost.excerpt}
                  </p>

                  {/* Target Keywords Badges */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-[#7F2F1C] block mb-2">
                      {isEn ? 'Key topics covered in this guide:' : 'Ključna pitanja i SEO pojmovi obrađeni u vodiču:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {featuredPost.targetKeywords.slice(0, 6).map((kw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md bg-[#F4E8E3] text-[#9E3E26] text-xs font-semibold"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#E8E0D5] flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#120F0D] text-[#E8D0A9] flex items-center justify-center font-serif text-sm font-bold border border-[#C2872A]">
                      TP
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#241D19]">{featuredPost.author}</div>
                      <div className="text-[11px] text-[#241D19]/60">{featuredPost.authorRole}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPost(featuredPost)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-xs sm:text-sm shadow-md transition-all group/btn cursor-pointer"
                  >
                    <span>{isEn ? `Read full guide (${featuredPost.wordCount} words)` : `Otvori ceo vodič (${featuredPost.wordCount.toLocaleString('sr-RS')} reči)`}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
              {selectedCategory === 'sve' 
                ? (isEn ? 'All Comprehensive Guides (1000+ words)' : 'Svi sveobuhvatni vodiči (1000+ reči)')
                : (isEn ? `Guides: ${categories.find(c => c.id === selectedCategory)?.label || selectedCategory}` : `Vodiči: ${categories.find(c => c.id === selectedCategory)?.label || selectedCategory}`)}
            </h3>
            <span className="text-xs text-[#241D19]/60">
              {isEn ? `Showing: ${filteredPosts.length} expert guides` : `Prikazano: ${filteredPosts.length} stručnih vodiča`}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((key) => (
                <BlogCardSkeleton key={key} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-[#E8E0D5] text-center space-y-3">
              <BookOpen className="w-10 h-10 text-[#C2872A] mx-auto opacity-60" />
              <h4 className="font-serif text-lg font-bold text-[#241D19]">
                {isEn ? `No articles found for "${searchQuery}"` : `Nema članaka za traženi pojam "${searchQuery}"`}
              </h4>
              <p className="text-sm text-[#241D19]/70">
                {isEn 
                  ? 'Try searching with another keyword (e.g. embroidery, wool, folk costume, crochet, macrame).'
                  : 'Pokušajte sa drugom ključnom rečju (npr. vez, šubara, nošnja, heklanje, čvorovanje).'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('sve');
                  setSearchQuery('');
                }}
                className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-[#9E3E26] text-white text-xs font-semibold hover:bg-[#7F2F1C] transition-colors"
              >
                {isEn ? 'Reset Search' : 'Poništi pretragu'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Thumbnail */}
                    <div 
                      onClick={() => onSelectPost(post)}
                      className="relative h-48 sm:h-52 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={post.coverImage}
                        alt={getBlogPostImageAlt(post, isEn)}
                        title={`${post.title} - Savremeni Koreni`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-xs text-[#9E3E26] text-xs font-bold uppercase tracking-wider border border-[#E8E0D5]">
                          {post.categoryLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-800 text-white text-[11px] font-semibold">
                          {post.wordCount.toLocaleString(isEn ? 'en-US' : 'sr-RS')} {isEn ? 'words' : 'reči'}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#E8D0A9]" />
                          {post.readingTime}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#241D19]/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C2872A]" />
                          {post.publishDate}
                        </span>
                        <span className="text-[#9E3E26] font-semibold flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" />
                          {post.faqs?.length || 3} {isEn ? 'answers' : 'odgovora'}
                        </span>
                      </div>

                      <h4 
                        onClick={() => onSelectPost(post)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#241D19] group-hover:text-[#9E3E26] transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {post.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#241D19]/75 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Keywords preview */}
                      <div className="pt-2 flex flex-wrap gap-1">
                        {post.targetKeywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[#241D19]/75 text-[11px] border border-[#E8E0D5]"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#E8E0D5]/70 flex items-center justify-between">
                    <div className="text-xs text-[#241D19]/70 font-medium">
                      {isEn ? 'Author:' : 'Autor:'} <strong className="text-[#241D19]">{post.author}</strong>
                    </div>

                    <button
                      onClick={() => onSelectPost(post)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E3E26] hover:text-[#7F2F1C] transition-colors group/link cursor-pointer"
                    >
                      <span>{isEn ? 'Read Guide' : 'Pročitaj vodič'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Global Google FAQ Search Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E0D5] shadow-sm space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E0D5] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E3E26] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-[#9E3E26]" />
                <span>{isEn ? 'Craft Knowledge: Quick Expert Answers' : 'Google Pretrage: Brzi Odgovori na Pitanja Ljudi'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19]">
                {isEn ? 'Frequently Asked Questions About Heritage & Craft' : 'Pitanja Koja Ljudi Najčešće Postavljaju na Internetu'}
              </h3>
              <p className="text-xs sm:text-sm text-[#241D19]/75 max-w-2xl">
                {isEn 
                  ? 'Common questions regarding authentic Serbian embroidery, national costume elements, crochet, macramé, and wool care. Click any question for an instant answer.'
                  : 'Ovo su najčešća pitanja koja korisnici unose u pretraživače u vezi sa vezom, narodnom nošnjom, heklanjem, makrameom i vunom. Kliknite na pitanje za trenutan stručni odgovor.'}
              </p>
            </div>

            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#241D19]/50" />
              <input
                type="text"
                placeholder={isEn ? 'Search Q&A...' : 'Pretraži pitanja i odgovore...'}
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#D5C9BA] bg-[#FAF7F2] focus:outline-none focus:border-[#9E3E26] text-[#241D19]"
              />
              {faqSearchQuery && (
                <button
                  onClick={() => setFaqSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#241D19]/50 hover:text-[#241D19]"
                >
                  {isEn ? 'Clear' : 'Obriši'}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaqs.slice(0, 10).map((item) => {
              const isExpanded = expandedFaqKey === item.key;
              return (
                <div 
                  key={item.key}
                  className="rounded-xl border border-[#E8E0D5] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-all overflow-hidden flex flex-col justify-between"
                >
                  <button
                    onClick={() => setExpandedFaqKey(isExpanded ? null : item.key)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#9E3E26] uppercase tracking-wider block">
                        {item.post.categoryLabel}
                      </span>
                      <span className="font-serif font-bold text-sm sm:text-base text-[#241D19] leading-snug">
                        {item.question}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#9E3E26] shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#241D19]/50 shrink-0 mt-1" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-[#E8E0D5]/50 text-xs sm:text-sm text-[#241D19]/85 leading-relaxed bg-white/80 space-y-3">
                      <p>{item.answer}</p>
                      <div className="pt-2 flex items-center justify-between border-t border-[#E8E0D5]/60">
                        <span className="text-[11px] text-[#241D19]/60 italic">
                          {isEn ? `Answer from article (${item.post.wordCount} words)` : `Odgovor iz članka (${item.post.wordCount} reči)`}
                        </span>
                        <button
                          onClick={() => onSelectPost(item.post)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E3E26] hover:text-[#7F2F1C] cursor-pointer"
                        >
                          <span>{isEn ? 'Open Full Guide' : 'Otvori ceo vodič'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-6 text-sm text-[#241D19]/70">
              {isEn ? `No questions found for "${faqSearchQuery}".` : `Nema pronađenih pitanja za traženi pojam "${faqSearchQuery}".`}
            </div>
          )}
        </motion.div>

        {/* SEO Reading Affirmation Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 bg-gradient-to-r from-[#241D19] to-[#382B24] text-[#FAF7F2] rounded-2xl sm:rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#E8D0A9] text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#C2872A]" />
              <span>savremenikoreni.com • {isEn ? 'Guardians of authentic identity' : 'Čuvari autentičnog identiteta'}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {isEn ? 'Looking for a custom piece crafted with traditional embroidery or folk motifs?' : 'Želite unikatan komad sa motivima tradicionalnog veza ili nošnje po vašoj želji?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
              {isEn 
                ? 'In our Jošanica workshop, we craft bespoke embroidered shirts, vests, traditional hats, crochet jewelry, macramé bags, and wool socks according to your exact measurements and family ornaments.'
                : 'U našoj radionici u Jošanici izrađujemo unikatne vezene košulje, prsluke, šubare, heklani nakit, makrame torbe i vunene čarape prema vašim specifičnim merama i porodičnim ornamentima.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {onOrderProduct && (
              <button
                onClick={() => onOrderProduct(isEn ? 'Custom piece with traditional motif' : 'Unikat sa vezenim motivom po mojoj želji')}
                className="px-6 py-3 rounded-xl bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                {isEn ? 'Request Custom Crafting' : 'Zatražite izradu po meri'}
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
