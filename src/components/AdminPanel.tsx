import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, KeyRound, LogOut, PackagePlus, FileText, Globe, Sparkles, 
  Upload, Trash2, Edit3, CheckCircle2, ArrowRight, Eye, RefreshCw,
  Plus, AlertCircle, ExternalLink, Image as ImageIcon, Check, DollarSign, X, Mail, BarChart3
} from 'lucide-react';
import { Product, BlogPost, ProductCategory } from '../types';
import { blogPostsData } from '../data/blogData';
import { seoLandingPages, SeoLandingPageData } from '../data/seoLandingPagesData';
import { productsData, companyDetails } from '../data/companyData';
import { translateTextToEnglish } from '../utils/translator';
import { saveCustomProduct, deleteCustomProduct, getCustomProducts } from '../utils/customProductStorage';
import { BlogAdminPanel } from './BlogAdminPanel';
import { EmailCascadeAdminPanel } from './EmailCascadeAdminPanel';
import { MarketingTrackingAdminPanel } from './MarketingTrackingAdminPanel';
import { generateSeoSlug } from '../utils/slug';

const ADMIN_PIN = "Koreni2026";
const AUTH_STORAGE_KEY = "koreni_admin_authenticated";

interface AdminPanelProps {
  onClose: () => void;
  products?: Product[];
  onProductCreated?: () => void;
  lang?: 'sr' | 'en';
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onClose, 
  products = productsData, 
  onProductCreated,
  lang = 'sr' 
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tabs: 'products' | 'blogs' | 'landing' | 'emails' | 'tracking'
  const [activeTab, setActiveTab] = useState<'products' | 'blogs' | 'landing' | 'emails' | 'tracking'>('products');

  // Success notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-translate state
  const [isTranslating, setIsTranslating] = useState(false);

  // ---------------- PRODUCT FORM STATE ----------------
  const [prodNameSr, setProdNameSr] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('subare');
  const [prodPriceRsd, setProdPriceRsd] = useState('');
  const [prodPriceEur, setProdPriceEur] = useState('');
  const [prodDescSr, setProdDescSr] = useState('');
  const [prodDescEn, setProdDescEn] = useState('');
  const [prodAltSr, setProdAltSr] = useState('');
  const [prodAltEn, setProdAltEn] = useState('');
  const [prodImage, setProdImage] = useState<string>('');
  const [allCustomProducts, setAllCustomProducts] = useState<Product[]>([]);

  // ---------------- BLOG FORM STATE ----------------
  const [customBlogs, setCustomBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('koreni_custom_blog_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [blogTitleSr, setBlogTitleSr] = useState('');
  const [blogTitleEn, setBlogTitleEn] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogExcerptSr, setBlogExcerptSr] = useState('');
  const [blogExcerptEn, setBlogExcerptEn] = useState('');
  const [blogContentSr, setBlogContentSr] = useState('');
  const [blogContentEn, setBlogContentEn] = useState('');
  const [blogImage, setBlogImage] = useState('');

  // ---------------- LANDING PAGE STATE ----------------
  const [customLandingPages, setCustomLandingPages] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('koreni_custom_landing_pages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [landingSlug, setLandingSlug] = useState('');
  const [landingTitleSr, setLandingTitleSr] = useState('');
  const [landingTitleEn, setLandingTitleEn] = useState('');
  const [landingSubtitleSr, setLandingSubtitleSr] = useState('');
  const [landingSubtitleEn, setLandingSubtitleEn] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  // Load custom data
  const loadData = async () => {
    try {
      const p = await getCustomProducts();
      setAllCustomProducts(p);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setAuthError(false);
      showToast("Uspešna prijava! Dobrodošli u Admin Panel.");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setPinInput('');
  };

  // ---------------- IMAGE COMPRESSION & UPLOAD ----------------
  const handleImageFile = (file: File, callback: (base64Url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          callback(compressed);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // ---------------- AUTO TRANSLATE HELPERS ----------------
  const handleTranslateProduct = async () => {
    if (!prodNameSr && !prodDescSr) {
      alert("Prvo unesite naziv ili opis na srpskom jeziku.");
      return;
    }
    setIsTranslating(true);
    try {
      if (prodNameSr && !prodNameEn) {
        const trName = await translateTextToEnglish(prodNameSr);
        setProdNameEn(trName);
        if (!prodAltEn) setProdAltEn(`Handcrafted ${trName} - Serbian Heritage`);
      }
      if (prodDescSr && !prodDescEn) {
        const trDesc = await translateTextToEnglish(prodDescSr);
        setProdDescEn(trDesc);
      }
      if (prodNameSr && !prodAltSr) {
        setProdAltSr(`${prodNameSr} ručni rad tradicionalna izrada Srbija`);
      }
      showToast("✨ Prevod uspešno generisan!");
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateBlog = async () => {
    if (!blogTitleSr && !blogExcerptSr) {
      alert("Prvo unesite naslov ili kratak opis na srpskom jeziku.");
      return;
    }
    setIsTranslating(true);
    try {
      if (blogTitleSr && !blogTitleEn) {
        const trTitle = await translateTextToEnglish(blogTitleSr);
        setBlogTitleEn(trTitle);
      }
      if (blogExcerptSr && !blogExcerptEn) {
        const trExcerpt = await translateTextToEnglish(blogExcerptSr);
        setBlogExcerptEn(trExcerpt);
      }
      if (blogContentSr && !blogContentEn) {
        const trContent = await translateTextToEnglish(blogContentSr);
        setBlogContentEn(trContent);
      }
      showToast("✨ Prevod bloga generisan!");
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateLanding = async () => {
    if (!landingTitleSr && !landingSubtitleSr) {
      alert("Prvo unesite naslov na srpskom.");
      return;
    }
    setIsTranslating(true);
    try {
      if (landingTitleSr && !landingTitleEn) {
        const trTitle = await translateTextToEnglish(landingTitleSr);
        setLandingTitleEn(trTitle);
      }
      if (landingSubtitleSr && !landingSubtitleEn) {
        const trSub = await translateTextToEnglish(landingSubtitleSr);
        setLandingSubtitleEn(trSub);
      }
      showToast("✨ Prevod stranice generisan!");
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  // ---------------- SAVE PRODUCT ----------------
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodNameSr.trim() || !prodImage) {
      alert("Molimo unesite naziv na srpskom i postavite sliku proizvoda.");
      return;
    }

    const priceRsdNum = parseInt(prodPriceRsd.replace(/\D/g, ''), 10) || 4500;
    const priceEurNum = parseInt(prodPriceEur.replace(/\D/g, ''), 10) || Math.round(priceRsdNum / 117);

    const newProd: Product = {
      id: `custom-${Date.now()}`,
      name: prodNameSr.trim(),
      nameEn: prodNameEn.trim() || undefined,
      category: prodCategory,
      priceRsd: priceRsdNum,
      priceEur: priceEurNum,
      image: prodImage,
      description: prodDescSr.trim() || 'Ručno rađeni unikatni etno artikal vrhunskog kvaliteta.',
      descriptionEn: prodDescEn.trim() || undefined,
      craftTechniques: ['Ručni rad'],
      materials: ['Prirodni materijali'],
      inStock: true,
      leadTimeDays: 3
    };

    try {
      await saveCustomProduct(newProd);
      await loadData();
      if (onProductCreated) onProductCreated();
      showToast(`Proizvod "${newProd.name}" je uspešno sačuvan i vidljiv na sajtu!`);
      // Reset
      setProdNameSr('');
      setProdNameEn('');
      setProdPriceRsd('');
      setProdPriceEur('');
      setProdDescSr('');
      setProdDescEn('');
      setProdAltSr('');
      setProdAltEn('');
      setProdImage('');
    } catch (err) {
      console.error(err);
      alert("Greška prilikom čuvanja proizvoda.");
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?")) {
      await deleteCustomProduct(prodId);
      await loadData();
      if (onProductCreated) onProductCreated();
      showToast("Proizvod je uklonjen.");
    }
  };

  // ---------------- SAVE LANDING PAGE ----------------
  const handleSaveLandingPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!landingTitleSr.trim() || !landingSlug.trim()) {
      alert("Molimo unesite naslov i URL slug.");
      return;
    }

    const cleanSlug = generateSeoSlug(landingSlug.trim() || landingTitleSr.trim());

    const newPage = {
      slug: cleanSlug,
      titleSr: landingTitleSr.trim(),
      titleEn: landingTitleEn.trim() || landingTitleSr.trim(),
      subtitleSr: landingSubtitleSr.trim() || 'Tradicija i zanatska izvornost',
      subtitleEn: landingSubtitleEn.trim() || 'Artisan heritage and handmade craft',
      metaTitleSr: `${landingTitleSr} | Savremeni Koreni`,
      metaDescriptionSr: landingSubtitleSr || landingTitleSr,
      badgeSr: 'Zanatska Tradicija',
      badgeEn: 'Artisan Heritage'
    };

    const updated = [newPage, ...customLandingPages];
    setCustomLandingPages(updated);
    localStorage.setItem('koreni_custom_landing_pages', JSON.stringify(updated));
    showToast(`Landing stranica "/${cleanSlug}" je sačuvana!`);

    setLandingSlug('');
    setLandingTitleSr('');
    setLandingTitleEn('');
    setLandingSubtitleSr('');
    setLandingSubtitleEn('');
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
        <div className="bg-[#1A1512] border border-[#C2872A]/40 rounded-2xl max-w-md w-full p-8 text-[#FAF7F2] shadow-2xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#C2872A]/15 border border-[#C2872A]/40 flex items-center justify-center mx-auto mb-4 text-[#E8D0A9] shadow-[0_0_20px_rgba(194,135,42,0.2)]">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif tracking-wide text-[#E8D0A9]">Administratorski Panel</h2>
            <p className="text-xs text-stone-400 mt-1">Savremeni Koreni • Pristup za vlasnika (Tanja Petrić)</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E8D0A9]/90 mb-2 font-medium">
                Unesite Administratorski PIN / Lozinku
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-[#C2872A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Koreni2026"
                  autoFocus
                  className={`w-full bg-[#121212] border ${authError ? 'border-red-500 focus:ring-red-500' : 'border-stone-700 focus:border-[#C2872A] focus:ring-[#C2872A]'} rounded-xl pl-11 pr-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:ring-1 transition-all`}
                />
              </div>
              {authError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Netačna lozinka. Pokušajte ponovo.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9E3E26] to-[#C2872A] hover:opacity-90 text-white font-medium py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif tracking-wide"
            >
              <span>Otključaj Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
            PIN: <span className="font-mono text-[#E8D0A9]">Koreni2026</span>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- AUTHENTICATED ADMIN DASHBOARD ----------------
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md text-[#FAF7F2] p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="max-w-6xl mx-auto bg-[#181310] border border-[#C2872A]/30 rounded-2xl shadow-2xl overflow-hidden min-h-[90vh] flex flex-col">
        
        {/* Toast poruka */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-[#C2872A] text-stone-950 font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Gornji Header */}
        <div className="bg-[#241D19] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C2872A]/20 border border-[#C2872A]/40 flex items-center justify-center text-[#E8D0A9]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-serif text-[#E8D0A9]">Savremeni Koreni • Upravljanje Sajtom</h1>
              <p className="text-xs text-stone-400">Prijavljeni ste kao Tanja Petrić (PIN: Koreni2026)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Odjavi se</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-950 bg-[#E8D0A9] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Zatvori & Pogledaj Sajt</span>
            </button>
          </div>
        </div>

        {/* Tabovi navigacije */}
        <div className="bg-[#1C1613] border-b border-white/10 px-6 flex space-x-1 sm:space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#C2872A] text-[#E8D0A9]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Proizvodi & Fotografije ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'blogs'
                ? 'border-[#C2872A] text-[#E8D0A9]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>SEO Blog Članci ({blogPostsData.length + customBlogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('landing')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'landing'
                ? 'border-[#C2872A] text-[#E8D0A9]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Landing Stranice ({Object.keys(seoLandingPages).length + customLandingPages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'emails'
                ? 'border-[#C2872A] text-[#E8D0A9]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Mail className="w-4 h-4 text-[#C2872A]" />
            <span>E-mail & Welcome Sekvenca (4 Stuba)</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'tracking'
                ? 'border-[#C2872A] text-[#E8D0A9]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Google AdSense & Meta Pixel</span>
          </button>
        </div>

        {/* Glavni sadržaj tabova */}
        <div className="p-6 flex-1 overflow-y-auto">

          {/* ===================== TAB 1: PROIZVODI ===================== */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              {/* Forma za novi proizvod */}
              <div className="bg-[#241D19] border border-[#C2872A]/30 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-lg font-serif text-[#E8D0A9] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#C2872A]" />
                      Dodaj Novi Proizvod / Fotografiju
                    </h2>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Unesite detalje na srpskom, pa kliknite čarobno dugme za automatski engleski prevod!
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleTranslateProduct}
                    disabled={isTranslating}
                    className="px-4 py-2 bg-gradient-to-r from-[#9E3E26] to-[#C2872A] hover:opacity-95 text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                    <span>{isTranslating ? 'Prevođenje u toku...' : '✨ Prevedi na Engleski jednim klikom'}</span>
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-6">
                  {/* Fotografija proizvoda */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8D0A9] mb-2 font-medium">
                      Fotografija Proizvoda (Učitajte sa telefona ili računara) *
                    </label>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {prodImage ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-[#C2872A] flex-shrink-0 group">
                          <img src={prodImage} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setProdImage('')}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full sm:w-64 h-32 border-2 border-dashed border-white/20 hover:border-[#C2872A] rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors bg-black/20"
                        >
                          <Upload className="w-8 h-8 text-[#C2872A] mb-2" />
                          <span className="text-xs text-stone-300 font-medium">Izaberi sliku iz galerije</span>
                          <span className="text-[10px] text-stone-500 mt-1">Automatska optimizacija formata</span>
                        </div>
                      )}

                      <input 
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageFile(file, (compressedUrl) => {
                              setProdImage(compressedUrl);
                            });
                          }
                        }}
                      />

                      <div className="text-xs text-stone-400 space-y-1">
                        <p className="flex items-center gap-1.5 text-stone-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Slika se automatski optimizuje za najbrže učitavanje
                        </p>
                        <p>Kupci mogu odmah zumirati detalje preko ugrađene lupe na sajtu.</p>
                      </div>
                    </div>
                  </div>

                  {/* Dvojezični Naziv */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium flex items-center gap-1.5">
                        <span className="text-base">🇷🇸</span> Naziv Proizvoda (Srpski) *
                      </label>
                      <input
                        type="text"
                        required
                        value={prodNameSr}
                        onChange={(e) => setProdNameSr(e.target.value)}
                        placeholder="npr. Vunena Šubara Homolje"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium flex items-center gap-1.5">
                        <span className="text-base">🇬🇧</span> Product Name (English)
                      </label>
                      <input
                        type="text"
                        value={prodNameEn}
                        onChange={(e) => setProdNameEn(e.target.value)}
                        placeholder="npr. Handmade Wool Shepherd Hat"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Kategorija & Cene */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        Kategorija
                      </label>
                      <select
                        value={prodCategory}
                        onChange={(e: any) => setProdCategory(e.target.value)}
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#C2872A] focus:outline-none cursor-pointer"
                      >
                        <option value="subare">Šubare (Krzno & Vuna)</option>
                        <option value="tkanice">Tkanice i Pojasevi</option>
                        <option value="torbe">Etno Torbe</option>
                        <option value="nosnje">Narodne Nošnje & Jeleci</option>
                        <option value="obuca">Opanci & Obuća</option>
                        <option value="suveniri">Suveniri & Detalji</option>
                        <option value="ostalo">Ostali Ručni Radovi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        Cena u Dinarima (RSD) *
                      </label>
                      <input
                        type="text"
                        value={prodPriceRsd}
                        onChange={(e) => {
                          const val = e.target.value;
                          setProdPriceRsd(val);
                          const num = parseInt(val.replace(/\D/g, ''), 10);
                          if (num && !prodPriceEur) {
                            setProdPriceEur(Math.round(num / 117).toString());
                          }
                        }}
                        placeholder="npr. 4500"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        Cena u Evrima (€ EUR za inostranstvo)
                      </label>
                      <input
                        type="text"
                        value={prodPriceEur}
                        onChange={(e) => setProdPriceEur(e.target.value)}
                        placeholder="npr. 39"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Dvojezični Opis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium flex items-center gap-1.5">
                        <span className="text-base">🇷🇸</span> Opis Proizvoda (Srpski)
                      </label>
                      <textarea
                        rows={3}
                        value={prodDescSr}
                        onChange={(e) => setProdDescSr(e.target.value)}
                        placeholder="Opišite tradiciju, materijal (100% prirodna vuna, ručni rad)..."
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium flex items-center gap-1.5">
                        <span className="text-base">🇬🇧</span> Description (English)
                      </label>
                      <textarea
                        rows={3}
                        value={prodDescEn}
                        onChange={(e) => setProdDescEn(e.target.value)}
                        placeholder="Handcrafted authentic heritage piece made with 100% natural wool..."
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Google Image Alt oznake */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Google Alt Tag za sliku (🇷🇸)
                      </label>
                      <input
                        type="text"
                        value={prodAltSr}
                        onChange={(e) => setProdAltSr(e.target.value)}
                        placeholder="npr. vunena šubara srbija ručni rad cena"
                        className="w-full bg-[#121212] border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-300 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1 font-medium">
                        Google Alt Tag for Image (🇬🇧)
                      </label>
                      <input
                        type="text"
                        value={prodAltEn}
                        onChange={(e) => setProdAltEn(e.target.value)}
                        placeholder="e.g. authentic serbian handmade shepherd hat"
                        className="w-full bg-[#121212] border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-300 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Dugme za čuvanje */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif tracking-wide"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Objavi Proizvod na Sajtu</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista postojećih proizvoda */}
              <div>
                <h3 className="text-base font-serif text-[#E8D0A9] mb-4 flex items-center justify-between">
                  <span>Proizvodi u Prodavnici ({products.length})</span>
                  <span className="text-xs text-stone-400 font-sans">Aktivni artikli u online katalogu</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-[#241D19] border border-white/10 rounded-xl p-3 flex gap-3 items-center group hover:border-[#C2872A]/50 transition-all"
                    >
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-16 h-16 rounded-lg object-cover bg-black/40 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-stone-200 truncate">{p.name}</h4>
                        {p.nameEn && (
                          <p className="text-[11px] text-stone-400 truncate italic">{p.nameEn}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-serif text-[#E8D0A9] font-medium">{p.priceRsd} RSD</span>
                          {p.priceEur && (
                            <span className="text-[10px] text-stone-400">({p.priceEur} €)</span>
                          )}
                        </div>
                      </div>

                      {p.id.startsWith('custom-') && (
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Obriši proizvod"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 2: BLOG ČLANCI ===================== */}
          {activeTab === 'blogs' && (
            <BlogAdminPanel 
              customBlogs={customBlogs} 
              setCustomBlogs={setCustomBlogs} 
              showToast={showToast} 
              isTranslating={isTranslating} 
              onTranslateBlog={handleTranslateBlog} 
            />
          )}

          {/* ===================== TAB 3: LANDING STRANICE ===================== */}
          {activeTab === 'landing' && (
            <div className="space-y-8">
              <div className="bg-[#241D19] border border-[#C2872A]/30 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-lg font-serif text-[#E8D0A9] flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#C2872A]" />
                      Kreiraj Novu Ciljanu SEO Landing Stranicu
                    </h2>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Napravite novu namensku stranicu za Google pretragu (npr. „Pokloni za Slavu“, „Zlatovez Homolje“).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleTranslateLanding}
                    disabled={isTranslating}
                    className="px-4 py-2 bg-gradient-to-r from-[#9E3E26] to-[#C2872A] hover:opacity-95 text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                    <span>{isTranslating ? 'Prevođenje...' : '✨ Prevedi Stranicu na Engleski'}</span>
                  </button>
                </div>

                <form onSubmit={handleSaveLandingPage} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                      URL Adresa Stranice (Slug) *
                    </label>
                    <div className="flex items-center">
                      <span className="bg-stone-800 px-3 py-2.5 text-xs text-stone-400 rounded-l-xl border border-r-0 border-stone-700">
                        /
                      </span>
                      <input
                        type="text"
                        required
                        value={landingSlug}
                        onChange={(e) => setLandingSlug(e.target.value)}
                        placeholder="pokloni-za-slavu"
                        className="w-full bg-[#121212] border border-stone-700 rounded-r-xl px-3 py-2.5 text-xs text-[#E8D0A9] focus:border-[#C2872A] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Dvojezični Naslov */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        🇷🇸 Glavni Naslov (H1) *
                      </label>
                      <input
                        type="text"
                        required
                        value={landingTitleSr}
                        onChange={(e) => setLandingTitleSr(e.target.value)}
                        placeholder="npr. Autentični Slavski Pokloni i Etno Detalji"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        🇬🇧 Main Headline (English)
                      </label>
                      <input
                        type="text"
                        value={landingTitleEn}
                        onChange={(e) => setLandingTitleEn(e.target.value)}
                        placeholder="e.g. Authentic Heritage Slava Gifts & Folk Details"
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Podnaslov / Tekst */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        🇷🇸 Podnaslov & Opis
                      </label>
                      <textarea
                        rows={2}
                        value={landingSubtitleSr}
                        onChange={(e) => setLandingSubtitleSr(e.target.value)}
                        placeholder="Tradicionalni ručni rad, prirodna vuna i vez za posebne svečanosti..."
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                        🇬🇧 Subtitle & Description (English)
                      </label>
                      <textarea
                        rows={2}
                        value={landingSubtitleEn}
                        onChange={(e) => setLandingSubtitleEn(e.target.value)}
                        placeholder="Handcrafted authentic pieces made with traditional care..."
                        className="w-full bg-[#121212] border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif tracking-wide"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Sačuvaj Landing Stranicu</span>
                  </button>
                </form>
              </div>

              {/* Lista Landing stranica */}
              <div>
                <h3 className="text-base font-serif text-[#E8D0A9] mb-4">
                  Aktivne SEO Stranice ({Object.keys(seoLandingPages).length + customLandingPages.length})
                </h3>

                <div className="space-y-3">
                  {customLandingPages.map((l) => (
                    <div 
                      key={l.slug}
                      className="bg-[#241D19] border border-[#C2872A]/40 rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#E8D0A9] bg-[#C2872A]/20 px-2 py-0.5 rounded border border-[#C2872A]/40">
                          Prilagođena Stranica
                        </span>
                        <h4 className="text-sm font-medium text-stone-200 mt-1">{l.titleSr}</h4>
                        <p className="text-xs text-stone-500 font-mono">/{l.slug}</p>
                      </div>

                      <button
                        onClick={() => {
                          const f = customLandingPages.filter(x => x.slug !== l.slug);
                          setCustomLandingPages(f);
                          localStorage.setItem('koreni_custom_landing_pages', JSON.stringify(f));
                          showToast("Stranica obrisana.");
                        }}
                        className="p-2 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Obriši stranicu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {Object.values(seoLandingPages).slice(0, 4).map((l: any) => (
                    <div 
                      key={l.slug}
                      className="bg-[#241D19] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4 opacity-75"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 bg-white/5 px-2 py-0.5 rounded">
                          SEO Tematska Stranica
                        </span>
                        <h4 className="text-sm font-medium text-stone-300 mt-1">{l.titleSr}</h4>
                        <p className="text-xs text-stone-500 font-mono">/{l.slug}</p>
                      </div>
                      <span className="text-xs text-emerald-400/80">Google Rangirano</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 4: EMAIL KASKADA & WELCOME SEKVENCA ===================== */}
          {activeTab === 'emails' && (
            <EmailCascadeAdminPanel showToast={showToast} />
          )}

          {/* ===================== TAB 5: MARKETING, ADSENSE & META PIXEL ===================== */}
          {activeTab === 'tracking' && (
            <MarketingTrackingAdminPanel showToast={showToast} />
          )}

        </div>
      </div>
    </div>
  );
};
