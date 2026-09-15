import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomOrderProcess } from './components/CustomOrderProcess';
import { UserPhotoManager } from './components/UserPhotoManager';
import { CompanyVerification } from './components/CompanyVerification';
import { EeatCertificatesSection } from './components/EeatCertificatesSection';
import { AtelierMapSection } from './components/AtelierMapSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection, ContactAndOrderModal } from './components/ContactAndOrderModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BlogSection } from './components/BlogSection';
import { BlogPostModal } from './components/BlogPostModal';
import { SocialLinksSection } from './components/SocialLinks3D';
import { MobileQuickBar } from './components/MobileQuickBar';
import { Footer } from './components/Footer';
import { GeoCurrencyNotification } from './components/GeoCurrencyNotification';
import { SeoLandingPage } from './components/SeoLandingPage';
import { seoLandingPages } from './data/seoLandingPagesData';
import { blogPostsData } from './data/blogData';
import { TrackOrderModal } from './components/TrackOrderModal';
import { TrackOrderSection } from './components/TrackOrderSection';
import { Product, GalleryPhoto, BlogPost } from './types';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { companyDetails, productsData } from './data/companyData';
import { LogoProvider } from './context/LogoContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LogoUploadModal } from './components/LogoUploadModal';
import { WebVitalsMonitor } from './components/WebVitalsMonitor';
import { AdminPanel } from './components/AdminPanel';
import { GoogleAdSenseBanner } from './components/GoogleAdSenseBanner';
import { initAnalytics, trackProductView, trackBlogPostView, trackConversion } from './utils/analytics';
import { initWebVitalsTracking } from './utils/webVitals';
import { useSectionObserver } from './hooks/useSectionObserver';
import { resetSocialMeta } from './utils/socialMeta';

function AppContent() {
  const { t, isEn } = useLanguage();

  // Detect landing page from pathname or URL search params
  const getLandingSlugFromLocation = (): string | null => {
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (pathname && seoLandingPages[pathname]) {
      return pathname;
    }
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') || params.get('landing');
    if (pageParam && seoLandingPages[pageParam]) {
      return pageParam;
    }
    return null;
  };

  // Helper to get combined system & custom blog posts
  const getAllBlogPosts = (): BlogPost[] => {
    try {
      const saved = localStorage.getItem('koreni_custom_blog_posts');
      const custom: BlogPost[] = saved ? JSON.parse(saved) : [];
      return [...blogPostsData, ...custom];
    } catch {
      return blogPostsData;
    }
  };

  // Detect blog post from pathname or query params
  const getBlogPostFromLocation = (): BlogPost | null => {
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const allPosts = getAllBlogPosts();
    if (pathname.startsWith('blog/')) {
      const slug = pathname.replace(/^blog\//, '');
      return allPosts.find((p) => p.slug === slug || p.id === slug) || null;
    }
    const params = new URLSearchParams(window.location.search);
    const blogParam = params.get('blog') || params.get('article');
    if (blogParam) {
      return allPosts.find((p) => p.slug === blogParam || p.id === blogParam) || null;
    }
    return null;
  };

  // Detect product from query params or hash
  const getProductFromLocation = (): Product | null => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product') || params.get('item') || params.get('p');
    if (productParam) {
      return productsData.find((p) => p.id === productParam || p.name.toLowerCase().includes(productParam.toLowerCase())) || null;
    }
    return null;
  };

  const [currentLandingSlug, setCurrentLandingSlug] = useState<string | null>(getLandingSlugFromLocation);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(getBlogPostFromLocation);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(getProductFromLocation);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
  const [orderProductName, setOrderProductName] = useState('');
  const [userPhotosCount, setUserPhotosCount] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return window.location.pathname === '/admin' || window.location.search.includes('admin=true');
  });

  // Listen to popstate
  useEffect(() => {
    initAnalytics();
    initWebVitalsTracking();
    const handlePopState = () => {
      setCurrentLandingSlug(getLandingSlugFromLocation());
      setSelectedBlogPost(getBlogPostFromLocation());
      setSelectedProduct(getProductFromLocation());
      if (window.location.pathname === '/admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateLanding = (slug: string) => {
    setCurrentLandingSlug(slug);
    window.history.pushState(null, '', `/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentLandingSlug(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogBySlug = (slug: string) => {
    const post = getAllBlogPosts().find((p) => p.slug === slug || p.id === slug);
    if (post) {
      handleSelectBlogPost(post);
    }
  };

  // Initialize GA4 / GTM
  useEffect(() => {
    initAnalytics();
  }, []);

  // Automatic Section Scroll Visibility Tracking in GA4
  useSectionObserver();

  // Monitor scroll for back-to-top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenOrder = (productName?: string) => {
    setOrderProductName(productName || (isEn ? 'General Inquiry / Custom Made-to-Order' : 'Opšti upit / Izrada po meri'));
    setIsOrderModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    trackProductView(product.id, product.name, product.priceRsd, product.category);
    window.history.pushState({ productId: product.id }, '', `/?product=${product.id}`);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    window.history.pushState(null, '', currentLandingSlug ? `/${currentLandingSlug}` : '/');
    resetSocialMeta(isEn);
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    trackBlogPostView(post.id, post.title, post.category);
    window.history.pushState({ blogSlug: post.slug }, '', `/blog/${post.slug}`);
  };

  const handleCloseBlogPost = () => {
    setSelectedBlogPost(null);
    window.history.pushState(null, '', currentLandingSlug ? `/${currentLandingSlug}` : '/');
    resetSocialMeta(isEn);
  };

  const handlePhotosUpdated = (photos: GalleryPhoto[]) => {
    const customCount = photos.filter((p) => p.isCustomUploaded).length;
    setUserPhotosCount(customCount);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241D19]">
      {/* Navigation */}
      <Navbar
        onOpenOrderModal={handleOpenOrder}
        onOpenGalleryUpload={() => {
          if (currentLandingSlug) handleBackToHome();
          setTimeout(() => scrollToSection('galerija'), 100);
        }}
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
        userPhotoCount={userPhotosCount}
        onNavigateLandingPage={handleNavigateLanding}
      />

      <main className="flex-1">
        {currentLandingSlug ? (
          <SeoLandingPage
            slug={currentLandingSlug}
            onBack={handleBackToHome}
            onOpenOrder={(product) => handleOpenOrder(product ? product.name : undefined)}
            onSelectBlog={handleSelectBlogBySlug}
            onNavigateLandingPage={handleNavigateLanding}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onExploreClick={() => scrollToSection('katalog')}
              onOpenOrderModal={() => handleOpenOrder()}
              onOpenGalleryUpload={() => scrollToSection('galerija')}
            />

            {/* Brand Story & Craft Heritage */}
            <BrandStory />

            {/* Product Catalog */}
            <ProductCatalog
              onSelectProduct={handleSelectProduct}
              onOrderProduct={(name) => handleOpenOrder(name)}
            />

            {/* Custom Bespoke Order Process */}
            <CustomOrderProcess onOpenOrderModal={() => handleOpenOrder(isEn ? 'Custom Bespoke Piece' : 'Unikat po mojoj meri i želji')} />

            {/* Bespoke Order Status Tracker Component & Section */}
            <TrackOrderSection onOpenOrderModal={(name) => handleOpenOrder(name)} />

            {/* Authentic SEO Blog Section (Focusing on VEZ and Traditional Craft) */}
            <BlogSection
              onSelectPost={handleSelectBlogPost}
              onOrderProduct={(name) => handleOpenOrder(name)}
            />

            {/* Google AdSense Banner Integration */}
            <GoogleAdSenseBanner />

            {/* Gallery with "Moje Slike" User Photo Management */}
            <UserPhotoManager onPhotosUpdated={handlePhotosUpdated} />

            {/* 3D Social Media Interactive Section (Instagram x2, Facebook, Pinterest, TikTok) */}
            <SocialLinksSection />

            {/* Real Legal Business Verification (APR, PIB, MB) */}
            <CompanyVerification />

            {/* E-E-A-T Authority: Certificates, Fairs & Handcrafted Provenance */}
            <EeatCertificatesSection />

            {/* Local SEO & Atelier Location with Google Maps in Homolje */}
            <AtelierMapSection />

            {/* E-E-A-T FAQ & Care Guide Knowledge Base with Dynamic FAQ Schema */}
            <FAQSection onOpenOrderModal={() => handleOpenOrder()} />

            {/* Contact Section */}
            <ContactSection onOpenModal={() => handleOpenOrder()} />

            {/* W3C Web Vitals & Loading Diagnostics Section */}
            <WebVitalsMonitor />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateLandingPage={handleNavigateLanding}
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Quick Action Bar (Call, WhatsApp, Instagram x2, Order) */}
      <MobileQuickBar onOpenOrderModal={() => handleOpenOrder()} />

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.pathname === '/admin' || window.location.search.includes('admin=true')) {
              window.history.pushState(null, '', '/');
            }
          }}
          onProductCreated={() => {
            // Force re-render of products if needed
            setUserPhotosCount(prev => prev + 1);
          }}
        />
      )}

      {/* Modals */}
      <TrackOrderModal
        isOpen={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
        onOpenOrderModal={handleOpenOrder}
      />
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
        onOrderProduct={(name) => handleOpenOrder(name)}
      />

      <ContactAndOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        prefilledProduct={orderProductName}
      />

      <BlogPostModal
        post={selectedBlogPost}
        onClose={handleCloseBlogPost}
        onOrderProduct={(name) => handleOpenOrder(name)}
        onSelectProduct={(product) => {
          handleCloseBlogPost();
          handleSelectProduct(product);
        }}
        onNavigateLanding={(slug) => {
          handleCloseBlogPost();
          handleNavigateLanding(slug);
        }}
      />

      <LogoUploadModal />
      <GeoCurrencyNotification />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 p-3 rounded-full bg-white text-[#241D19] hover:bg-[#F4E8E3] border border-[#E8E0D5] shadow-lg transition-all cursor-pointer hover:scale-105"
          title={isEn ? 'Back to top' : 'Povratak na vrh'}
          aria-label={isEn ? 'Back to top' : 'Povratak na vrh'}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Desktop Quick Action Widget (WhatsApp & Call) */}
      <div className="hidden md:flex fixed bottom-6 right-20 z-40 flex-col items-end gap-3">
        <a
          href={`https://wa.me/381603318319?text=${encodeURIComponent(isEn ? 'Hello Tanja! I am contacting you from the Savremeni Koreni website.' : 'Dobar dan Tanja! Javijam se sa sajta Savremeni Koreni.')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion('whatsapp_click', { source: 'floating_widget' })}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title={isEn ? 'Direct WhatsApp message to Tanja Petrić' : 'Direktna WhatsApp poruka Tanji Petrić'}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{isEn ? 'WhatsApp Message' : 'WhatsApp poruka'}</span>
        </a>

        <a
          href={`tel:${companyDetails.phone}`}
          onClick={() => trackConversion('phone_call', { source: 'floating_widget' })}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title={isEn ? 'Call the workshop directly' : 'Pozovite radionicu direktno'}
        >
          <Phone className="w-5 h-5" />
          <span>{companyDetails.phoneFormatted}</span>
        </a>
      </div>


    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <LogoProvider>
            <AppContent />
          </LogoProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
