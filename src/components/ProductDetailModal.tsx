import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Clock, MessageCircle, Phone, ShoppingBag, Sparkles, Shield, Info, ChevronLeft, ChevronRight, Share2, Feather, HeartHandshake, Droplet, SunMedium, Layers, ShieldCheck, ZoomIn } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Product } from '../types';
import { companyDetails } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';
import { ProductReviews } from './ProductReviews';
import { getProductImageAlt, getProductImageTitle } from '../utils/imageSeo';
import { injectProductSocialMeta, toAbsoluteUrl } from '../utils/socialMeta';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderProduct: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOrderProduct,
}) => {
  const { t, isEn } = useLanguage();
  const { currency, formatProduct } = useCurrency();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Magnifying Glass Lens effect state
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, relX: 0, relY: 0 });
  const [magnifierEnabled, setMagnifierEnabled] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || isZoomed || !magnifierEnabled) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate relative percentage (0.0 to 1.0)
    const relX = Math.max(0, Math.min(1, x / rect.width));
    const relY = Math.max(0, Math.min(1, y / rect.height));

    setMagnifierPos({ x, y, relX, relY });
  };

  // Dynamically inject OpenGraph and Twitter card meta tags for high-quality social sharing
  useEffect(() => {
    if (!product) return;
    const cleanup = injectProductSocialMeta(product, isEn);
    return cleanup;
  }, [product, isEn]);

  useEffect(() => {
    setActiveImageIdx(0);
    setIsZoomed(false);
    setCopiedShare(false);
  }, [product]);

  // Reset zoom state when image changes
  useEffect(() => {
    setIsZoomed(false);
    setTouchStart(null);
    setTouchEnd(null);
  }, [activeImageIdx]);

  if (!product) return null;

  const handleShareProduct = async () => {
    const url = `https://savremenikoreni.com/katalog?product=${product.id}`;
    const title = isEn && product.nameEn ? product.nameEn : product.name;
    const text = isEn 
      ? `Check out this authentic handcrafted piece "${title}" by Savremeni Koreni:`
      : `Pogledajte ovaj unikatni ručni rad "${title}" iz radionice Savremeni Koreni:`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch (e) {
      // Ignore clipboard failure
    }
  };

  const allImages = product ? [product.image, ...(product.images || [])].filter(Boolean) : [];
  const priceInfo = formatProduct(product);
  const displayName = isEn && product.nameEn ? product.nameEn : product.name;
  const displayDesc = isEn 
    ? (product.longDescriptionEn || product.descriptionEn || product.longDescription || product.description)
    : (product.longDescription || product.description);
  const displayTechniques = isEn && product.craftTechniquesEn ? product.craftTechniquesEn : product.craftTechniques;
  const displayMaterials = isEn && product.materialsEn ? product.materialsEn : product.materials;

  const priceNotice = priceInfo.isConverted 
    ? `${priceInfo.formatted} (${priceInfo.rsdFormatted})`
    : `${priceInfo.rsdFormatted} ${product.priceEur ? `(~€${product.priceEur})` : ''}`;

  const whatsappMessage = encodeURIComponent(
    isEn
      ? `Hello Tanja! I am interested in your handcrafted piece from the Savremeni Koreni website: "${displayName}" (${priceNotice}). Is it available for ordering?`
      : `Dobar dan Tanja! Zainteresovan/a sam za vaš unikat sa sajta Savremeni Koreni: "${product.name}" (${priceNotice}). Da li je dostupan za poručivanje?`
  );
  const whatsappUrl = `https://wa.me/381603318319?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E0D5] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E0D5] bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#9E3E26] bg-[#F4E8E3] px-2.5 py-1 rounded">
              {product.category.toUpperCase()}
            </span>
            {product.badge && (
              <span className="text-xs uppercase font-bold tracking-wider text-[#C2872A] bg-[#FAF7F2] border border-[#C2872A]/30 px-2 py-0.5 rounded">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#F4E8E3] text-[#241D19] border border-[#E8E0D5] text-xs font-medium shadow-2xs hover:shadow-sm transition-all cursor-pointer"
                title={isEn ? 'Share & Pin options' : 'Opcije za deljenje i Pinterest'}
                aria-label={isEn ? 'Share product' : 'Podeli proizvod'}
              >
                <Share2 className="w-3.5 h-3.5 text-[#9E3E26]" />
                <span className="hidden sm:inline">{isEn ? 'Share' : 'Podeli'}</span>
              </button>

              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E8E0D5] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9E3E26]/60 border-b border-[#E8E0D5]/50 mb-1">
                    {isEn ? 'Share & Pin' : 'Podeli i zakači'}
                  </div>
                  
                  {/* Pinterest Pin */}
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://savremenikoreni.com/katalog?product=${product.id}`)}&media=${encodeURIComponent(toAbsoluteUrl(product.image))}&description=${encodeURIComponent(isEn ? `Discover authentic Serbian handcrafted "${displayName}" by Savremeni Koreni` : `Pogledajte prelepi unikatni ručni rad "${product.name}" iz radionice Savremeni Koreni. 100% autorska izrada.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#241D19] hover:bg-[#FAF7F2] transition-colors"
                    onClick={() => setShowShareMenu(false)}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#E60023] flex items-center justify-center text-white font-black text-[11px] leading-none shrink-0">
                      P
                    </span>
                    <span className="font-semibold">{isEn ? 'Pin on Pinterest' : 'Zakači na Pinterest'}</span>
                  </a>

                  {/* Facebook Share */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://savremenikoreni.com/katalog?product=${product.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#241D19] hover:bg-[#FAF7F2] transition-colors"
                    onClick={() => setShowShareMenu(false)}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-xs shrink-0">
                      f
                    </span>
                    <span>{isEn ? 'Share on Facebook' : 'Podeli na Facebook-u'}</span>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://savremenikoreni.com/katalog?product=${product.id}`)}&text=${encodeURIComponent(isEn ? `Check out this authentic handcrafted piece "${displayName}" by Savremeni Koreni:` : `Pogledajte prelepi unikatni ručni rad "${product.name}" iz radionice Savremeni Koreni:`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#241D19] hover:bg-[#FAF7F2] transition-colors"
                    onClick={() => setShowShareMenu(false)}
                  >
                    <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white font-bold text-[9px] shrink-0">
                      𝕏
                    </span>
                    <span>{isEn ? 'Share on X' : 'Podeli na X / Twitter'}</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent((isEn ? `Check out this handcrafted piece "${displayName}" on Savremeni Koreni: ` : `Pogledajte ovaj unikatni ručni rad "${product.name}" iz radionice Savremeni Koreni: `) + `https://savremenikoreni.com/katalog?product=${product.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#241D19] hover:bg-[#FAF7F2] transition-colors"
                    onClick={() => setShowShareMenu(false)}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                      W
                    </span>
                    <span>{isEn ? 'Send on WhatsApp' : 'Pošalji na WhatsApp'}</span>
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={async () => {
                      setShowShareMenu(false);
                      await handleShareProduct();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#241D19] hover:bg-[#FAF7F2] transition-colors text-left border-t border-[#E8E0D5]/40 mt-1 cursor-pointer font-medium"
                  >
                    {copiedShare ? (
                      <>
                        <Check className="w-5 h-5 p-1 rounded-full bg-emerald-50 text-emerald-700" />
                        <span className="text-[#4E6852] font-semibold">{isEn ? 'Copied!' : 'Kopirano!'}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-5 h-5 p-1 rounded-full bg-gray-100 text-[#9E3E26]" />
                        <span>{isEn ? 'Copy Direct Link' : 'Kopiraj direktan link'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            <CurrencySelector variant="topbar" />
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-[#FAF7F2] hover:bg-[#9E3E26] text-[#241D19] hover:text-white rounded-full border border-[#E8E0D5] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center group shrink-0"
              aria-label={isEn ? 'Close modal' : 'Zatvori prozor'}
              title={isEn ? 'Close (ESC)' : 'Zatvori (ESC)'}
            >
              <X className="w-5 h-5 stroke-[2.5] transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Image Column */}
            <div className="md:col-span-6 flex flex-col">
              {/* Action Buttons Container (Above Image) */}
              <div className="flex justify-between items-center mb-3">
                {/* Magnifier Mode Badge Toggle Hint */}
                <button
                  type="button"
                  onClick={() => setMagnifierEnabled(!magnifierEnabled)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border shadow-sm ${
                    magnifierEnabled
                      ? 'bg-[#9E3E26]/90 text-white border-[#9E3E26]'
                      : 'bg-[#FAF7F2] text-[#241D19] border-[#E8E0D5] hover:bg-[#F4E8E3]'
                  }`}
                  title={isEn ? 'Toggle Magnifying Lens' : 'Uključi/isključi lupu veza'}
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#E8D0A9]" />
                  <span className="text-[11px]">
                    {isEn ? (magnifierEnabled ? 'Magnifier Active' : 'Enable Lens') : (magnifierEnabled ? 'Lupa Veza Aktivna' : 'Uključi Lupu')}
                  </span>
                </button>

                {/* Pinterest Auto-Share Image Pin */}
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://savremenikoreni.com/katalog?product=${product.id}`)}&media=${encodeURIComponent(toAbsoluteUrl(allImages[activeImageIdx]))}&description=${encodeURIComponent(isEn ? `Discover authentic Serbian handcrafted "${displayName}" by Savremeni Koreni` : `Pogledajte prelepi unikatni ručni rad "${product.name}" iz radionice Savremeni Koreni. 100% autorska izrada.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#E60023] hover:bg-[#b8001c] text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border border-[#E60023]"
                  title={isEn ? 'Pin this image on Pinterest' : 'Zakači ovu sliku na Pinterest'}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-white text-[#E60023] flex items-center justify-center font-black text-[9px] leading-none shrink-0">
                    P
                  </span>
                  <span className="text-[11px] font-semibold">{isEn ? 'Pin it' : 'Zakači sliku'}</span>
                </a>
              </div>

              <div 
                ref={imageContainerRef}
                className="relative aspect-square sm:aspect-3/4 w-full rounded-2xl overflow-hidden border border-[#E8E0D5] bg-[#FAF7F2] shadow-lg group flex items-center justify-center cursor-crosshair"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
                onTouchStartCapture={(e) => {
                  setTouchEnd(null);
                  setTouchStart(e.targetTouches[0].clientX);
                }}
                onTouchMoveCapture={(e) => {
                  setTouchEnd(e.targetTouches[0].clientX);
                }}
                onTouchEndCapture={() => {
                  if (!touchStart || !touchEnd) return;
                  // Only swipe if the image is NOT zoomed in
                  if (isZoomed) return;
                  
                  const distance = touchStart - touchEnd;
                  const isLeftSwipe = distance > 50;
                  const isRightSwipe = distance < -50;
                  
                  if (allImages.length > 1) {
                    if (isLeftSwipe) {
                      setActiveImageIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
                    }
                    if (isRightSwipe) {
                      setActiveImageIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
                    }
                  }
                }}
              >
                {/* Blurred backdrop for a premium look and to cover empty space */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={allImages[activeImageIdx]}
                    alt=""
                    className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-white/20"></div>
                </div>

                {/* Floating Craftsman Magnifying Glass Lens */}
                {showMagnifier && magnifierEnabled && !isZoomed && (
                  <div
                    className="pointer-events-none absolute z-30 rounded-full border-2 border-[#C2872A] shadow-2xl overflow-hidden bg-white hidden sm:block transition-opacity duration-150"
                    style={{
                      width: '180px',
                      height: '180px',
                      left: `${magnifierPos.x - 90}px`,
                      top: `${magnifierPos.y - 90}px`,
                      backgroundImage: `url(${allImages[activeImageIdx]})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '360% 360%',
                      backgroundPosition: `${magnifierPos.relX * 100}% ${magnifierPos.relY * 100}%`,
                      boxShadow: '0 12px 30px rgba(0,0,0,0.35), inset 0 0 15px rgba(194,135,42,0.35)',
                    }}
                  >
                    {/* Metallic rim reflection & glare */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E3E26] bg-[#FAF7F2]/90 border border-[#C2872A]/40 px-2 py-0.5 rounded-full shadow-xs">
                        {isEn ? 'Craft Detail 3.5x' : 'Detalj Veza 3.5x'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 z-10">
                  <TransformWrapper
                    key={activeImageIdx}
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    doubleClick={{ mode: "toggle" }}
                    wheel={{ step: 0.1 }}
                    panning={{ disabled: !isZoomed }}
                    onTransform={(ref) => {
                      setIsZoomed(ref.state.scale > 1.05);
                    }}
                  >
                    {({ state }) => (
                      <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                        <img
                          src={allImages[activeImageIdx]}
                          alt={getProductImageAlt(product, isEn)}
                          title={getProductImageTitle(product, isEn)}
                          className="max-w-full max-h-full object-contain object-center transition-transform duration-300 drop-shadow-md p-2"
                          referrerPolicy="no-referrer"
                        />
                      </TransformComponent>
                    )}
                  </TransformWrapper>
                </div>
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/60 hover:bg-white text-[#241D19]/80 hover:text-[#241D19] shadow-sm backdrop-blur-xs opacity-70 sm:opacity-40 sm:group-hover:opacity-100 transition-all z-20 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-white/60 hover:bg-white text-[#241D19]/80 hover:text-[#241D19] shadow-sm backdrop-blur-xs opacity-70 sm:opacity-40 sm:group-hover:opacity-100 transition-all z-20 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {allImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx ? 'border-[#9E3E26] shadow-md opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:shadow'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${displayName} - ${isEn ? 'Handcraft detail view' : 'Detalj ručnog rada'} ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-5 p-4 bg-white rounded-xl border border-[#E8E0D5] text-xs space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-[#241D19]/75">
                  <span>{isEn ? 'Workshop:' : 'Radionica:'}</span>
                  <span className="font-semibold text-[#241D19]">Savremeni Koreni, Jošanica</span>
                </div>
                <div className="flex items-center justify-between text-[#241D19]/75">
                  <span>{isEn ? 'Artisan:' : 'Autor:'}</span>
                  <span className="font-semibold text-[#9E3E26]">{companyDetails.owner}</span>
                </div>
                {product.dimensions && (
                  <div className="flex items-center justify-between text-[#241D19]/75">
                    <span>{isEn ? 'Dimensions:' : 'Dimenzije:'}</span>
                    <span className="font-semibold text-[#241D19]">{product.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D19] leading-tight">
                  {displayName}
                </h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#9E3E26]">
                    {currency === 'USD' || currency === 'EUR' ? priceInfo.symbol : ''}
                    {priceInfo.amount.toLocaleString(isEn ? 'en-US' : 'sr-RS')}
                    {currency !== 'USD' && currency !== 'EUR' ? ` ${priceInfo.symbol}` : ''}
                  </span>
                  {priceInfo.isConverted ? (
                    <span className="text-xs font-bold text-[#241D19]/75 bg-[#F4E8E3] px-2.5 py-1 rounded-md border border-[#9E3E26]/20">
                      {priceInfo.rsdFormatted}
                    </span>
                  ) : (
                    product.priceEur && (
                      <span className="text-xs font-bold text-[#C2872A] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#C2872A]/30">
                        (~€{product.priceEur})
                      </span>
                    )
                  )}
                  <span className="text-xs text-[#241D19]/50 ml-1">
                    {isEn ? '(+ shipping)' : '(+ troškovi PostExpress-a)'}
                  </span>
                </div>
              </div>

              {/* Status & Timing */}
              <div className="flex items-center gap-3 text-xs bg-white p-3 rounded-lg border border-[#E8E0D5]">
                <Clock className="w-4 h-4 text-[#C2872A]" />
                <div>
                  <span className="font-semibold text-[#241D19]">
                    {product.inStock 
                      ? (isEn ? 'Available in stock' : 'Proizvod je dostupan na stanju') 
                      : (isEn ? 'Out of stock' : 'Nema na stanju')}
                  </span>
                  <p className="text-[#241D19]/70 text-[11px]">
                    {product.inStock 
                      ? (isEn ? 'Dispatch within 24-48 hours' : 'Slanje u roku od 24-48h') 
                      : (isEn ? 'Crafting time 7 to 15 days' : 'Rok za izradu 7 do 15 dana')}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#241D19]/80">
                  {isEn ? 'Description & Craft Details' : 'Opis i karakteristike'}
                </h4>
                <p className="text-xs sm:text-sm text-[#241D19]/85 leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              {/* Materials and Techniques */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3 rounded-lg border border-[#E8E0D5]">
                  <span className="text-[11px] font-bold text-[#7F2F1C] uppercase block mb-1">
                    {isEn ? 'Techniques' : 'Korišćene tehnike'}
                  </span>
                  <ul className="text-xs space-y-1 text-[#241D19]/80">
                    {displayTechniques.map((tech, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#4E6852]" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-lg border border-[#E8E0D5]">
                  <span className="text-[11px] font-bold text-[#7F2F1C] uppercase block mb-1">
                    {isEn ? 'Materials' : 'Materijali'}
                  </span>
                  <ul className="text-xs space-y-1 text-[#241D19]/80">
                    {displayMaterials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#4E6852]" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Heritage Value & Care Instructions Guide (SEO & Craftsmanship Info) */}
              <div className="space-y-2 pt-2">
                <details className="group bg-white rounded-xl border border-[#E8E0D5] p-3 open:pb-4 transition-all">
                  <summary className="flex items-center justify-between font-serif font-bold text-xs sm:text-sm text-[#241D19] cursor-pointer select-none list-none">
                    <span className="flex items-center gap-1.5 text-[#9E3E26]">
                      <Droplet className="w-4 h-4 text-[#9E3E26]" />
                      {isEn ? 'Care & Maintenance Guide' : 'Uputstvo za negu i pranje vune'}
                    </span>
                    <span className="text-xs text-[#241D19]/50 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-2.5 pt-2 border-t border-[#E8E0D5]/60 text-[11px] sm:text-xs text-[#241D19]/80 space-y-1.5 leading-relaxed">
                    <p className="flex items-start gap-1.5">
                      <span className="font-bold text-[#9E3E26]">•</span>
                      <span><strong>{isEn ? 'Hand Wash at 30°C:' : 'Ručno pranje na 30°C:'}</strong> {isEn ? 'Gently hand wash in lukewarm water with wool detergent or baby shampoo. Avoid machine spinning.' : 'Isključivo ručno pranje u mlakoj vodi sa blagim deterdžentom za vunu sa lanolinom ili dečijim šamponom.'}</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="font-bold text-[#9E3E26]">•</span>
                      <span><strong>{isEn ? 'Flat Horizontal Drying:' : 'Horizontalno sušenje:'}</strong> {isEn ? 'Dry flat on a dry towel away from radiators and direct sunlight. Do not hang.' : 'Sušiti položeno na suvom peškiru na sobnoj temperaturi. Ne kačiti štipaljkama i ne sušiti na radijatoru.'}</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="font-bold text-[#9E3E26]">•</span>
                      <span><strong>{isEn ? 'Moth Protection:' : 'Zaštita od moljaca:'}</strong> {isEn ? 'Store in breathable cotton bags with dried natural lavender or cedar wood blocks.' : 'Čuvati na suvom mestu u pamučnim vrećicama uz sušeni cvet prirodne lavande ili kedrovo drvo.'}</span>
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-xl border border-[#E8E0D5] p-3 open:pb-4 transition-all">
                  <summary className="flex items-center justify-between font-serif font-bold text-xs sm:text-sm text-[#241D19] cursor-pointer select-none list-none">
                    <span className="flex items-center gap-1.5 text-[#4E6852]">
                      <HeartHandshake className="w-4 h-4 text-[#4E6852]" />
                      {isEn ? 'Cultural & Heritage Value' : 'Etnološka vrednost i autentičnost'}
                    </span>
                    <span className="text-xs text-[#241D19]/50 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-2.5 pt-2 border-t border-[#E8E0D5]/60 text-[11px] sm:text-xs text-[#241D19]/80 space-y-1.5 leading-relaxed">
                    <p>
                      {isEn 
                        ? 'Crafted in Jošanica (Homolje, Eastern Serbia) using ancestral 5-needle knitting, cross-stitch, and satin embroidery. Each handmade piece carries living folklore symbolism, cultural continuity, and heirloom provenance.'
                        : 'Unikat izrađen u selu Jošanica (Homolje) arhaičnim tehnikama pletenja na 5 igala, pokrstice i punog veza. Svaki rad predstavlja nematerijalno kulturno nasleđe i trajnu porodičnu dragocenost.'
                      }
                    </p>
                  </div>
                </details>
              </div>

            </div>
          </div>

          {/* Product Reviews & Star Rating Section */}
          <ProductReviews
            productId={product.id}
            productName={displayName}
            productCategory={product.category}
          />
        </div>

        {/* Modal Footer / Direct Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E8E0D5] flex flex-col gap-3 sticky bottom-0 z-10">
          {/* Payment Card Security Badge Strip */}
          <div className="flex items-center justify-between text-[10px] text-[#241D19]/70 pb-1 border-b border-[#E8E0D5]/50 flex-wrap gap-1">
            <span className="font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E6852]"></span>
              {isEn ? 'Accepted Payments:' : 'Načini plaćanja:'}
            </span>
            <div className="flex items-center gap-1 font-bold">
              <span className="px-1.5 py-0.5 rounded-xs bg-[#1A1F71] text-white text-[9px] font-serif">VISA</span>
              <span className="px-1.5 py-0.5 rounded-xs bg-[#EB001B] text-white text-[9px]">MC</span>
              <span className="px-1.5 py-0.5 rounded-xs bg-[#00A4E4] text-white text-[9px]">DINA</span>
              <span className="px-1.5 py-0.5 rounded-xs bg-[#003087] text-white text-[9px] font-serif italic">PayPal</span>
              <span className="px-1.5 py-0.5 rounded-xs bg-[#241D19]/10 text-[#241D19] text-[9px]">Pouzeće</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`tel:${companyDetails.phone}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#E8E0D5] hover:bg-[#FAF7F2] text-xs font-semibold text-[#241D19] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#9E3E26]" />
                <span className="hidden sm:inline">{isEn ? 'Call' : 'Pozovi'}:</span> {companyDetails.phoneFormatted}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#E8E0D5] hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-semibold text-[#241D19]/70 transition-colors cursor-pointer"
                title={isEn ? 'Close modal' : 'Zatvori prozor'}
              >
                <X className="w-3.5 h-3.5" />
                <span>{isEn ? 'Close' : 'Zatvori'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onOrderProduct(displayName);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-sm font-semibold shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.orderPiece}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
