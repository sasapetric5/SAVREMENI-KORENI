import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Upload, 
  RefreshCw, 
  Link as LinkIcon, 
  AlertCircle, 
  Globe, 
  Check, 
  Copy 
} from 'lucide-react';
import { generateSeoSlug } from '../utils/slug';
import { blogPostsData } from '../data/blogData';

export interface BlogAdminPanelProps {
  customBlogs: any[];
  setCustomBlogs: (blogs: any[]) => void;
  showToast: (message: string) => void;
  isTranslating?: boolean;
  onTranslateBlog?: () => void;
}

export const BlogAdminPanel: React.FC<BlogAdminPanelProps> = ({
  customBlogs,
  setCustomBlogs,
  showToast,
  isTranslating = false,
  onTranslateBlog
}) => {
  const [blogTitleSr, setBlogTitleSr] = useState('');
  const [blogTitleEn, setBlogTitleEn] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [slugSource, setSlugSource] = useState<'sr' | 'en' | 'manual'>('sr');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  
  const [blogExcerptSr, setBlogExcerptSr] = useState('');
  const [blogExcerptEn, setBlogExcerptEn] = useState('');
  const [blogContentSr, setBlogContentSr] = useState('');
  const [blogContentEn, setBlogContentEn] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert image file to Base64
  const handleImageFile = (file: File, callback: (base64: string) => void) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast("Slika je prevelika! Maksimalna dozvoljena veličina je 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Serbian Title change with auto slug generation
  const handleTitleSrChange = (value: string) => {
    setBlogTitleSr(value);
    if (!isSlugManuallyEdited && slugSource === 'sr') {
      const generated = generateSeoSlug(value);
      setBlogSlug(generated);
    }
  };

  // Handle English Title change with auto slug generation
  const handleTitleEnChange = (value: string) => {
    setBlogTitleEn(value);
    if (!isSlugManuallyEdited && slugSource === 'en') {
      const generated = generateSeoSlug(value);
      setBlogSlug(generated);
    }
  };

  // Handle manual Slug edit
  const handleSlugInputChange = (value: string) => {
    setIsSlugManuallyEdited(true);
    setSlugSource('manual');
    // Sanitize in real-time while keeping user typing clean
    setBlogSlug(generateSeoSlug(value));
  };

  // Force recalculate slug from Serbian title
  const handleRegenerateFromSr = () => {
    const generated = generateSeoSlug(blogTitleSr);
    setBlogSlug(generated);
    setSlugSource('sr');
    setIsSlugManuallyEdited(false);
    showToast("SEO Slug je automatski generisan iz srpskog naslova! 🇷🇸");
  };

  // Force recalculate slug from English title
  const handleRegenerateFromEn = () => {
    if (!blogTitleEn.trim()) {
      showToast("Prvo unesite naslov na engleskom jeziku.");
      return;
    }
    const generated = generateSeoSlug(blogTitleEn);
    setBlogSlug(generated);
    setSlugSource('en');
    setIsSlugManuallyEdited(false);
    showToast("SEO Slug is automatically generated from English title! 🇬🇧");
  };

  // Save new blog post
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitleSr.trim()) {
      showToast("Molimo unesite naslov blog članka.");
      return;
    }

    const cleanSlug = blogSlug.trim() 
      ? generateSeoSlug(blogSlug)
      : generateSeoSlug(blogTitleSr);

    if (!cleanSlug) {
      showToast("Greška pri kreiranju URL slug-a.");
      return;
    }

    const newPost = {
      id: `custom-blog-${Date.now()}`,
      slug: cleanSlug,
      title: blogTitleSr.trim(),
      title_en: blogTitleEn.trim() || undefined,
      excerpt: blogExcerptSr.trim() || blogTitleSr.trim(),
      excerpt_en: blogExcerptEn.trim() || undefined,
      heroImage: blogImage || '/luxury_black_gold_emblem.jpg',
      author: 'Tanja Petrić',
      authorRole: 'Osnivač i majstor ručnog rada, Savremeni Koreni',
      publishDate: new Date().toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' }),
      readingTime: '4 min čitanja',
      wordCount: (blogContentSr || '').split(/\s+/).length || 300,
      category: 'tradicija',
      categoryLabel: 'Ručni Rad & Tradicija',
      metaTitle: `${blogTitleSr} | Savremeni Koreni Blog`,
      metaDescription: blogExcerptSr || blogTitleSr,
      targetKeywords: [blogTitleSr, cleanSlug.replace(/-/g, ' ')],
      contentSections: [
        {
          heading: blogTitleSr,
          paragraphs: [blogContentSr || blogExcerptSr]
        }
      ]
    };

    const updated = [newPost, ...customBlogs];
    setCustomBlogs(updated);
    localStorage.setItem('koreni_custom_blog_posts', JSON.stringify(updated));
    showToast(`Članak "${newPost.title}" je sačuvan sa SEO linkom: /blog/${cleanSlug}`);

    // Reset form
    setBlogTitleSr('');
    setBlogTitleEn('');
    setBlogSlug('');
    setBlogExcerptSr('');
    setBlogExcerptEn('');
    setBlogContentSr('');
    setBlogContentEn('');
    setBlogImage('');
    setIsSlugManuallyEdited(false);
    setSlugSource('sr');
  };

  const handleCopyLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    showToast("URL link kopiran u clipboard!");
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Blog Input Card */}
      <div className="bg-[#241D19] border border-[#C2872A]/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif text-[#E8D0A9] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C2872A]" />
              Napiši Novi SEO Blog Članak & Generiši URL Slug
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Automatsko kreiranje SEO-optimizovanih URL adresa sa podrškom za srpska slova (š, đ, č, ć, ž / ш, ђ, ч, ћ, ж) i engleski.
            </p>
          </div>

          {onTranslateBlog && (
            <button
              type="button"
              onClick={onTranslateBlog}
              disabled={isTranslating}
              className="px-4 py-2 bg-gradient-to-r from-[#9E3E26] to-[#C2872A] hover:opacity-95 text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
              <span>{isTranslating ? 'Prevođenje...' : '✨ Prevedi Članak na Engleski'}</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSaveBlog} className="space-y-6">
          {/* Naslovi (SR & EN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span>🇷🇸</span> Naslov Članka (Srpski) *
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {blogTitleSr.length} karaktera
                </span>
              </label>
              <input
                type="text"
                required
                value={blogTitleSr}
                onChange={(e) => handleTitleSrChange(e.target.value)}
                placeholder="npr. 5 Razloga Zašto Izabrati Homoljsku Šubaru Sa Đulom"
                className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span>🇬🇧</span> Article Title (English)
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {blogTitleEn.length} characters
                </span>
              </label>
              <input
                type="text"
                value={blogTitleEn}
                onChange={(e) => handleTitleEnChange(e.target.value)}
                placeholder="e.g. 5 Reasons to Choose Authentic Wool Shepherd Hat"
                className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
              />
            </div>
          </div>

          {/* SEO Slug Generator Box */}
          <div className="bg-[#181310] border border-[#C2872A]/40 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs uppercase tracking-wider text-[#E8D0A9] font-medium flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#C2872A]" />
                SEO Optimizovani URL Slug (Google Link)
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRegenerateFromSr}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-[#E8D0A9] text-[11px] rounded-lg border border-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Generiši slug iz srpskog naslova"
                >
                  <RefreshCw className="w-3 h-3 text-[#C2872A]" />
                  <span>Generiši iz SR 🇷🇸</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateFromEn}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-[#E8D0A9] text-[11px] rounded-lg border border-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Generiši slug iz engleskog naslova"
                >
                  <RefreshCw className="w-3 h-3 text-[#C2872A]" />
                  <span>Generate from EN 🇬🇧</span>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <span className="bg-stone-900 px-3 py-2.5 text-xs text-stone-400 rounded-l-xl border border-r-0 border-stone-700 font-mono shrink-0">
                https://savremenikoreni.rs/blog/
              </span>
              <input
                type="text"
                value={blogSlug}
                onChange={(e) => handleSlugInputChange(e.target.value)}
                placeholder="npr. 5-razloga-zasto-izabrati-homoljsku-subaru-sa-djulom"
                className="w-full bg-[#121212] border border-stone-700 rounded-r-xl px-3 py-2.5 text-xs text-[#E8D0A9] focus:border-[#C2872A] focus:outline-none font-mono tracking-wide"
              />
            </div>

            {/* Live SEO Slug Status & Character Transliteration Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400 pt-1">
              <div className="flex items-center gap-2">
                {blogSlug ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Čist SEO URL ({blogSlug.length} karaktera)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400/80">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Unesite naslov za automatsko kreiranje linka
                  </span>
                )}
                {isSlugManuallyEdited && (
                  <span className="bg-stone-800 px-2 py-0.5 rounded text-[10px] text-stone-300">
                    Ručno izmenjeno
                  </span>
                )}
              </div>

              <div className="text-[10px] text-stone-500 italic">
                Sva slova (Š, Đ, Č, Ć, Ž / Ш, Ђ, Ч, Ћ, Ж) se automatski pretvaraju u s, dj, c, z
              </div>
            </div>
          </div>

          {/* Glavna Slika Upload */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
              Glavna Slika Članka (Upload)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => blogFileInputRef.current?.click()}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-stone-300 text-xs rounded-xl flex items-center gap-2 border border-white/10 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#C2872A]" />
                <span>Izaberi Sliku za Blog</span>
              </button>

              <input
                ref={blogFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageFile(file, (base64) => setBlogImage(base64));
                  }
                }}
              />

              {blogImage && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#C2872A]">
                  <img src={blogImage} alt="Blog thumb" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Excerpt / Sažetak (SR & EN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                🇷🇸 Uvodni Pasus / Sažetak (Srpski)
              </label>
              <textarea
                rows={2}
                value={blogExcerptSr}
                onChange={(e) => setBlogExcerptSr(e.target.value)}
                placeholder="Kratak uvod od 2-3 rečenice o tradiciji i ručnom radu..."
                className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                🇬🇧 Short Excerpt (English)
              </label>
              <textarea
                rows={2}
                value={blogExcerptEn}
                onChange={(e) => setBlogExcerptEn(e.target.value)}
                placeholder="Short summary for English readers..."
                className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
              />
            </div>
          </div>

          {/* Full Content (SR & EN) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                🇷🇸 Pun Tekst Članka (Srpski)
              </label>
              <textarea
                rows={5}
                value={blogContentSr}
                onChange={(e) => setBlogContentSr(e.target.value)}
                placeholder="Tekst članka o tradiciji, materijalima, savetima za kupce..."
                className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                🇬🇧 Full Article Content (English)
              </label>
              <textarea
                rows={5}
                value={blogContentEn}
                onChange={(e) => setBlogContentEn(e.target.value)}
                placeholder="English translation of the full story..."
                className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif tracking-wide"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Objavi Blog Članak sa SEO Linkom</span>
          </button>
        </form>
      </div>

      {/* List of Published Articles */}
      <div>
        <h3 className="text-base font-serif text-[#E8D0A9] mb-4">
          Objavljeni Članci na Sajtu ({blogPostsData.length + customBlogs.length})
        </h3>

        <div className="space-y-3">
          {customBlogs.map((b) => (
            <div 
              key={b.id}
              className="bg-[#241D19] border border-[#C2872A]/40 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#E8D0A9] bg-[#C2872A]/20 px-2 py-0.5 rounded border border-[#C2872A]/40">
                  Vaš Članak
                </span>
                <h4 className="text-sm font-medium text-stone-200 mt-1">{b.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-[#E8D0A9] font-mono bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
                    /blog/{b.slug}
                  </p>
                  <button
                    onClick={() => handleCopyLink(b.slug)}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
                    title="Kopiraj pun SEO link"
                  >
                    {copiedSlug === b.slug ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  const f = customBlogs.filter(x => x.id !== b.id);
                  setCustomBlogs(f);
                  localStorage.setItem('koreni_custom_blog_posts', JSON.stringify(f));
                  showToast("Članak obrisan.");
                }}
                className="p-2 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                title="Obriši članak"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {blogPostsData.slice(0, 4).map((b) => (
            <div 
              key={b.id}
              className="bg-[#241D19] border border-white/5 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 opacity-85"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 bg-white/5 px-2 py-0.5 rounded">
                  Sistemski SEO Vodič
                </span>
                <h4 className="text-sm font-medium text-stone-300 mt-1">{b.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-stone-500 font-mono">/blog/{b.slug}</p>
                  <button
                    onClick={() => handleCopyLink(b.slug)}
                    className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer p-1"
                    title="Kopiraj link"
                  >
                    {copiedSlug === b.slug ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <span className="text-xs text-emerald-400/80">Google Aktivan</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
