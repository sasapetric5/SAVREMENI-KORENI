import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles, ShoppingBag, Eye, Clock, Check, Scissors, Plus, Trash2, Edit2, Image as ImageIcon, Package } from 'lucide-react';
import { Product, ProductCategory, GalleryPhoto } from '../types';
import { productsData } from '../data/companyData';
import { loadCustomProductsFromStorage, saveCustomProductsToStorage } from '../utils/customProductStorage';
import { AddProductFromPhotoModal } from './AddProductFromPhotoModal';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';
import { ProductCardSkeleton } from './Skeletons';
import { parseProductImageAttributes } from '../utils/imageSeo';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onOrderProduct: (productName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onOrderProduct,
}) => {
  const { t, isEn } = useLanguage();
  const { currency, formatProduct, convertAmount } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('torbice');
  const [searchQuery, setSearchQuery] = useState('');
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>([]);
  const [inStockOverrides, setInStockOverrides] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('savremeni_koreni_stock_overrides');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Brief loading shimmer transition on category or search change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Load custom products from storage
  const reloadCustomProducts = () => {
    loadCustomProductsFromStorage().then((list) => {
      setCustomProducts(list);
    });
  };

  useEffect(() => {
    reloadCustomProducts();
    const storedDeleted = localStorage.getItem('savremeni_koreni_deleted_products');
    if (storedDeleted) {
      try {
        setDeletedProductIds(JSON.parse(storedDeleted));
      } catch (e) {}
    }

    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Product[]>;
      if (customEvent.detail) {
        setCustomProducts(customEvent.detail);
      } else {
        reloadCustomProducts();
      }
    };

    window.addEventListener('custom-products-updated', handleCustomUpdate);
    return () => window.removeEventListener('custom-products-updated', handleCustomUpdate);
  }, []);

  const allProducts = useMemo(() => {
    // Combine custom products (top priority) + default products
    const customIds = new Set(customProducts.map(p => p.id));
    const defaults = productsData.filter(p => !customIds.has(p.id));
    const combined = [...customProducts, ...defaults];
    
    // Apply stock overrides
    const withOverrides = combined.map(p => {
      if (inStockOverrides[p.id] !== undefined) {
        return { ...p, inStock: inStockOverrides[p.id] };
      }
      return p;
    });

    return withOverrides.filter(p => !deletedProductIds.includes(p.id));
  }, [customProducts, deletedProductIds, inStockOverrides]);

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'sve', label: isEn ? 'All Works' : 'Svi radovi', count: allProducts.length },
    { id: 'torbice', label: t.catTorbice, count: allProducts.filter(p => p.category === 'torbice').length },
    { id: 'subare', label: t.catSubare, count: allProducts.filter(p => p.category === 'subare').length },
    { id: 'carape', label: t.catCarape, count: allProducts.filter(p => p.category === 'carape').length },
    { id: 'kosulje', label: t.catKosulje, count: allProducts.filter(p => p.category === 'kosulje').length },
    { id: 'nakit', label: t.catNakit, count: allProducts.filter(p => p.category === 'nakit').length },
    { id: 'dom-pokloni', label: t.catDomPokloni, count: allProducts.filter(p => p.category === 'dom-pokloni').length },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      const matchesCategory = selectedCategory === 'sve' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(query)) ||
        item.materials.some((m) => m.toLowerCase().includes(query)) ||
        (item.materialsEn && item.materialsEn.some((m) => m.toLowerCase().includes(query))) ||
        item.craftTechniques.some((t) => t.toLowerCase().includes(query)) ||
        (item.craftTechniquesEn && item.craftTechniquesEn.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const handleToggleStock = (id: string, currentStock: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOverrides = { ...inStockOverrides, [id]: !currentStock };
    setInStockOverrides(newOverrides);
    localStorage.setItem('savremeni_koreni_stock_overrides', JSON.stringify(newOverrides));
  };

  const handleDeleteCustomProduct = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (customProducts.some(p => p.id === id)) {
      const updated = customProducts.filter(p => p.id !== id);
      setCustomProducts(updated);
      await saveCustomProductsToStorage(updated);
      window.dispatchEvent(new CustomEvent('custom-products-updated', { detail: updated }));
    } else {
      const updatedDeleted = [...deletedProductIds, id];
      setDeletedProductIds(updatedDeleted);
      localStorage.setItem('savremeni_koreni_deleted_products', JSON.stringify(updatedDeleted));
    }
  };

  const handleEditCustomProduct = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToEdit(prod);
    setIsAddModalOpen(true);
  };

  const torbiceCount = allProducts.filter(p => p.category === 'torbice').length;

  return (
    <section id="katalog" className="py-20 bg-[#FAF7F2] text-[#241D19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
        >
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4E8E3] text-[#9E3E26] text-xs font-semibold uppercase tracking-widest">
              <Scissors className="w-3.5 h-3.5" />
              <span>{isEn ? 'Author Collection of Handcrafts' : 'Autorska Kolekcija Ručnih Radova'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D19] tracking-tight">
              {t.catalogTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
              {t.catalogSubtitle}
            </p>
          </div>

          {/* Action Buttons: Add Product + Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => {
                setProductToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer hover:shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{isEn ? 'Add item with photo and price' : 'Dodaj artikal sa slikom i cenom'}</span>
            </button>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#241D19]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? 'Search catalog...' : 'Pretraži katalog...'}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26] focus:ring-1 focus:ring-[#9E3E26] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#241D19]/50 hover:text-[#241D19]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Currency Switcher Bar in Catalog */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/80 dark:bg-[#1A1512]/70 p-3 sm:p-4 rounded-2xl border border-[#E8E0D5] dark:border-[#382C24] shadow-xs">
          <CurrencySelector variant="catalog" />
          <div className="text-[11px] text-[#241D19]/70 dark:text-[#FAF7F2]/70 font-medium">
            {isEn ? 'Handcrafted slow fashion • Worldwide diaspora delivery' : 'Ručni rad • Isporuka širom Srbije i dijaspore'}
          </div>
        </div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#9E3E26] text-white shadow-sm font-semibold'
                  : 'bg-white text-[#241D19]/80 border border-[#E8E0D5] hover:border-[#9E3E26]/40 hover:text-[#9E3E26]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#FAF7F2] text-[#241D19]/60'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Sub-header info for selected category */}
        {selectedCategory === 'torbice' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-4 bg-[#F4E8E3]/70 border border-[#9E3E26]/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-[#9E3E26] bg-white px-2.5 py-1 rounded-md border border-[#9E3E26]/20 shrink-0">
                {currency === 'RSD'
                  ? (isEn ? 'Bag Collection: 3,500 – 8,000 RSD' : 'Kolekcija Torbica: 3.500 – 8.000 RSD')
                  : currency === 'EUR'
                  ? (isEn ? `Bag Collection: €${convertAmount(3500)} – €${convertAmount(8000)}` : `Kolekcija Torbica: €${convertAmount(3500)} – €${convertAmount(8000)}`)
                  : currency === 'USD'
                  ? (isEn ? `Bag Collection: $${convertAmount(3500)} – $${convertAmount(8000)}` : `Kolekcija Torbica: $${convertAmount(3500)} – $${convertAmount(8000)}`)
                  : (isEn ? `Bag Collection: ${convertAmount(3500)} – ${convertAmount(8000)} CHF` : `Kolekcija Torbica: ${convertAmount(3500)} – ${convertAmount(8000)} CHF`)}
              </span>
              <span className="text-[#241D19]/80">
                {isEn ? '100% original handcrafted work by Savremeni Koreni studio.' : '100% autorski ručni rad radionice Savremeni Koreni.'}
              </span>
            </div>

            <button
              onClick={() => {
                setProductToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9E3E26] text-white rounded-lg text-xs font-bold hover:bg-[#7F2F1C] transition-colors cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isEn ? 'Add my bag to collection' : 'Postavi moju torbicu u ponudu'}</span>
            </button>
          </motion.div>
        )}

        {/* If Torbice is selected and no torbice exist yet, show a clear action helper card */}
        {selectedCategory === 'torbice' && torbiceCount === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 p-8 bg-white rounded-2xl border-2 border-dashed border-[#9E3E26]/30 text-center space-y-4"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4E8E3] text-[#9E3E26] flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#241D19]">
                {isEn ? 'List your handcrafted bags' : 'Postavite vaše torbice u ponudu'}
              </h3>
              <p className="text-xs sm:text-sm text-[#241D19]/70 leading-relaxed">
                {isEn 
                  ? 'Add photos of your bags directly into this catalog with exact pricing in RSD (e.g. 3,500 – 8,000 RSD).'
                  : 'Fotografije vaših torbica iz galerije možete jednim klikom postaviti u ovaj katalog uz tačnu cenu u dinarima (npr. 3.500 – 8.000 RSD).'}
              </p>
            </div>
            <button
              onClick={() => {
                setProductToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{isEn ? 'Add bag from my photos to Catalog' : 'Dodaj torbicu sa moje slike u Katalog'}</span>
            </button>
          </motion.div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <ProductCardSkeleton key={key} />
            ))}
          </div>
        ) : filteredProducts.length === 0 && (selectedCategory !== 'torbice' || torbiceCount > 0) ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E0D5] p-8 space-y-3">
            <p className="font-serif text-lg font-bold text-[#241D19]">
              {isEn ? 'No products found matching your search.' : 'Nema pronađenih proizvoda za zadatu pretragu.'}
            </p>
            <p className="text-xs text-[#241D19]/70">
              {isEn ? 'Try another search term or change the category filter.' : 'Pokušajte sa drugom ključnom rečju ili promenite izabranu kategoriju.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('sve');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-semibold text-[#9E3E26] hover:underline cursor-pointer"
            >
              {isEn ? 'Show all products' : 'Prikaži sve proizvode'}
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => {
                const isCustom = customProducts.some(p => p.id === product.id);
                const priceInfo = formatProduct(product);

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E8E0D5] shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col group"
                  >
                  {/* Product Image Container */}
                  <div 
                    className="relative aspect-[4/5] overflow-hidden bg-[#FAF7F2] cursor-pointer border-b border-[#E8E0D5]/60 flex items-center justify-center group"
                    onClick={() => onSelectProduct(product)}
                  >
                    {/* Blurred backdrop for a premium look and to cover empty space */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-[#E8E0D5]/30 animate-pulse">
                      <img
                        src={product.image}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                    </div>

                    {(() => {
                      const imgAttrs = parseProductImageAttributes(product, isEn);
                      return (
                        <img
                          src={product.image}
                          alt={imgAttrs.alt}
                          title={imgAttrs.title}
                          aria-label={imgAttrs['aria-label']}
                          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03] relative z-10 drop-shadow-sm p-4"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      );
                    })()}
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-20 bg-[#9E3E26] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {product.badge}
                      </div>
                    )}

                    {/* Stock tag */}
                    <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-xs text-[#241D19] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#E8E0D5] shadow-xs">
                      {product.inStock ? (
                        <span className="flex items-center gap-1 text-[#4E6852]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4E6852]"></span>
                          {t.inStock}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#C2872A]">
                          <Clock className="w-2.5 h-2.5" />
                          {isEn ? 'Out of stock' : 'Nema na stanju'}
                        </span>
                      )}
                    </div>

                    {/* Pinterest Quick Pin Button */}
                    <div className="absolute bottom-3 left-3 z-40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                      <a
                        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://savremenikoreni.com/katalog?product=${product.id}`)}&media=${encodeURIComponent(product.image.startsWith('http') ? product.image : `https://savremenikoreni.com${product.image.startsWith('/') ? '' : '/'}${product.image}`)}&description=${encodeURIComponent(isEn ? `Discover authentic Serbian handcrafted "${product.nameEn || product.name}" by Savremeni Koreni` : `Pogledajte prelepi unikatni ručni rad "${product.name}" iz radionice Savremeni Koreni. 100% autorska izrada.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-[#E60023] text-[#241D19] hover:text-white shadow-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 border border-[#E8E0D5]/60 hover:border-[#E60023]"
                        title={isEn ? 'Pin this product on Pinterest' : 'Zakači ovaj proizvod na Pinterest'}
                      >
                        <span className="w-4 h-4 rounded-full bg-[#E60023] text-white flex items-center justify-center font-black text-[9px] leading-none shrink-0">
                          P
                        </span>
                        <span className="text-[10px] font-bold">
                          {isEn ? 'Pin' : 'Zakači'}
                        </span>
                      </a>
                    </div>

                    {/* Admin Actions (Now for all products) */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-wrap justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleStock(product.id, product.inStock || false, e);
                        }}
                        className="p-2 rounded-lg bg-white/90 hover:bg-white text-[#241D19] shadow-sm text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors relative z-50"
                        title={isEn ? 'Toggle stock status' : 'Promeni stanje na zalihama'}
                      >
                        <Package className={`w-4 h-4 pointer-events-none ${product.inStock ? 'text-[#C2872A]' : 'text-[#4E6852]'}`} />
                        <span className="text-[10px] pointer-events-none hidden sm:inline-block">
                          {product.inStock ? (isEn ? 'Out of stock' : 'Nema na stanju') : (isEn ? 'In stock' : 'Ima na stanju')}
                        </span>
                      </button>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditCustomProduct(product, e);
                          }}
                          className="p-2 rounded-lg bg-white/90 hover:bg-white text-[#241D19] shadow-sm text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors relative z-50"
                          title={isEn ? 'Edit price or title of this item' : 'Izmeni cenu ili naziv ovog artikla'}
                        >
                          <Edit2 className="w-4 h-4 text-[#9E3E26] pointer-events-none" />
                          <span className="text-[10px] pointer-events-none">{isEn ? 'Edit' : 'Uredi'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteCustomProduct(product.id, e);
                        }}
                        className="p-2 rounded-lg bg-white/90 hover:bg-red-50 text-red-700 shadow-sm text-xs cursor-pointer transition-colors relative z-50"
                        title={isEn ? 'Remove this item from catalog' : 'Ukloni ovaj artikal iz ponude'}
                      >
                        <Trash2 className="w-4 h-4 pointer-events-none" />
                      </button>
                    </div>

                    {/* Quick View overlay hint */}
                    <div className="absolute inset-0 z-30 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 text-[#241D19] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#9E3E26]" />
                        {t.viewDetails}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Craft techniques tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {(isEn && product.craftTechniquesEn ? product.craftTechniquesEn : product.craftTechniques).slice(0, 2).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider font-semibold text-[#7F2F1C] bg-[#F4E8E3] px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-lg font-bold text-[#241D19] hover:text-[#9E3E26] transition-colors cursor-pointer leading-snug"
                      >
                        {isEn && product.nameEn ? product.nameEn : product.name}
                      </h3>

                      <p className="text-xs text-[#241D19]/75 line-clamp-2 leading-relaxed">
                        {isEn ? (product.descriptionEn || product.description) : product.description}
                      </p>
                    </div>

                    {/* Price & Action Section - Clearly visible price & Order button */}
                    <div className="pt-3.5 border-t border-[#E8E0D5] flex items-center justify-between gap-3 bg-[#FAF7F2]/50 -mx-5 -mb-5 px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#241D19]/60 font-semibold">
                          {t.priceTag}:
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif text-2xl font-black text-[#9E3E26] tracking-tight">
                            {currency === 'USD' || currency === 'EUR' ? priceInfo.symbol : ''}
                            {priceInfo.amount.toLocaleString(isEn ? 'en-US' : 'sr-RS')}
                          </span>
                          <span className="text-xs font-bold text-[#241D19]/80">
                            {currency !== 'USD' && currency !== 'EUR' ? priceInfo.symbol : ''}
                          </span>
                        </div>
                        {priceInfo.isConverted ? (
                          <span className="text-[10px] text-[#241D19]/60 font-medium">
                            {priceInfo.rsdFormatted}
                          </span>
                        ) : (
                          product.priceEur && (
                            <span className="text-[10px] text-[#C2872A] font-semibold">
                              (~€{product.priceEur})
                            </span>
                          )
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="px-2.5 py-2 text-xs font-semibold text-[#241D19] bg-white hover:bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl transition-colors cursor-pointer"
                          title={t.viewDetails}
                        >
                          {t.viewDetails}
                        </button>

                        <button
                          onClick={() => onOrderProduct(isEn && product.nameEn ? product.nameEn : product.name)}
                          className="px-4 py-2 text-xs font-bold text-white bg-[#9E3E26] hover:bg-[#7F2F1C] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                          title={t.orderNow}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{t.orderNow}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Custom Order Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-[#F4E8E3]/60 border border-[#E8E0D5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-[#241D19]">
              {isEn ? 'Want a custom crocheted bag or bespoke embroidery?' : 'Želite heklanu torbicu ili vez po vašoj želji?'}
            </h4>
            <p className="text-xs sm:text-sm text-[#241D19]/80">
              {isEn 
                ? 'Tanja Petrić crafts bespoke creations customized with your measurements, desired motifs, clasps, and chains for special occasions.'
                : 'Tanja Petrić izrađuje i unikatne modele po vašim dimenzijama, sa željenim detaljima, bravicama i lancima za posebne prilike.'}
            </p>
          </div>

          <button
            onClick={() => onOrderProduct(isEn ? 'Custom bag or embroidery order' : 'Izrada torbice ili veza po meri')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#9E3E26] hover:bg-[#7F2F1C] rounded-xl whitespace-nowrap shadow-xs transition-all hover:shadow-md cursor-pointer"
          >
            {isEn ? 'Request custom crafting' : 'Zatražite izradu po želji'}
          </button>
        </motion.div>

      </div>

      {/* Add / Edit Product Modal */}
      <AddProductFromPhotoModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
        onProductSaved={() => reloadCustomProducts()}
      />
    </section>
  );
};
