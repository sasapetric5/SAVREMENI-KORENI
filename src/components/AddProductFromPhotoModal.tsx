import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag, Check, Plus, Image as ImageIcon, Trash2, Edit2 } from 'lucide-react';
import { Product, GalleryPhoto, ProductCategory } from '../types';
import { loadPhotosFromStorage } from '../utils/photoStorage';
import { loadCustomProductsFromStorage, saveCustomProductsToStorage } from '../utils/customProductStorage';
import { useLanguage } from '../context/LanguageContext';
import { triggerSitemapUpdate, syncProductToServer } from '../utils/sitemapNotification';

interface AddProductFromPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPhoto?: GalleryPhoto | null;
  productToEdit?: Product | null;
  onProductSaved?: (product: Product) => void;
}

export const AddProductFromPhotoModal: React.FC<AddProductFromPhotoModalProps> = ({
  isOpen,
  onClose,
  preselectedPhoto,
  productToEdit,
  onProductSaved,
}) => {
  const { t, isEn } = useLanguage();
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState<ProductCategory>('torbice');
  const [priceRsd, setPriceRsd] = useState<number | ''>(4800);
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [craftTechniques, setCraftTechniques] = useState('Ručni rad, heklanje, vez');
  const [materials, setMaterials] = useState('100% pamuk, postava');
  const [badge, setBadge] = useState('Unikat');
  const [leadTimeDays, setLeadTimeDays] = useState(4);
  const [inStock, setInStock] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load photos from storage when modal opens
  useEffect(() => {
    if (isOpen) {
      loadPhotosFromStorage().then((photos) => {
        if (photos && photos.length > 0) {
          setGalleryPhotos(photos);
        }
      });
    }
  }, [isOpen]);

  // Set initial form state based on productToEdit or preselectedPhoto
  useEffect(() => {
    if (!isOpen) return;

    if (productToEdit) {
      setSelectedImages([productToEdit.image, ...(productToEdit.images || [])].filter((v, i, a) => a.indexOf(v) === i));
      setName(productToEdit.name);
      setNameEn(productToEdit.nameEn || '');
      setCategory(productToEdit.category);
      setPriceRsd(productToEdit.priceRsd);
      setDescription(productToEdit.description);
      setDescriptionEn(productToEdit.descriptionEn || '');
      setDimensions(productToEdit.dimensions || '');
      setCraftTechniques(productToEdit.craftTechniques.join(', '));
      setMaterials(productToEdit.materials.join(', '));
      setBadge(productToEdit.badge || (isEn ? 'Unique' : 'Unikat'));
      setLeadTimeDays(productToEdit.leadTimeDays || 4);
      setInStock(productToEdit.inStock ?? true);
    } else if (preselectedPhoto) {
      setSelectedImages([preselectedPhoto.imageUrl]);
      setName(preselectedPhoto.title || (isEn ? 'Handmade Unique Bag' : 'Ručno rađena unikatna torbica'));
      setNameEn('');
      
      const catMap: Record<string, ProductCategory> = {
        'Torbice': 'torbice',
        'Čarape': 'carape',
        'Šubare': 'subare',
        'Košulje': 'kosulje',
        'Nakit': 'nakit',
        'Radionica': 'torbice',
      };
      setCategory(catMap[preselectedPhoto.category] || 'torbice');
      setPriceRsd(4800);
      setDescription(preselectedPhoto.caption || (isEn ? 'Author handcrafted design from the Savremeni Koreni atelier.' : 'Autorski unikatni model izrađen u radionici Savremeni Koreni.'));
      setDescriptionEn('');
      setDimensions('25 cm x 18 cm x 7 cm');
      setCraftTechniques(isEn ? 'Handmade, precise crochet, silk lining' : 'Ručni rad, precizno heklanje, postava');
      setMaterials(isEn ? '100% cotton, satin lining, metal hardware' : '100% pamuk, satenska postava, metalna galanterija');
      setBadge(isEn ? 'Unique' : 'Unikat');
      setLeadTimeDays(4);
      setInStock(true);
    } else {
      setSelectedImages([]);
      setName('');
      setNameEn('');
      setCategory('torbice');
      setPriceRsd(4800);
      setDescription(isEn ? 'Unique handmade item with meticulous traditional details.' : 'Unikatna ručno rađena torbica sa pažljivo izrađenim detaljima.');
      setDescriptionEn('');
      setDimensions('25 cm x 18 cm x 7 cm');
      setCraftTechniques(isEn ? 'Hand crochet, embroidery' : 'Ručno heklanje, vez');
      setMaterials(isEn ? '100% natural cotton, lining' : '100% prirodni pamuk, postava');
      setBadge(isEn ? 'Unique' : 'Unikat');
      setLeadTimeDays(4);
      setInStock(true);
    }
  }, [isOpen, preselectedPhoto, productToEdit, isEn]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(isEn ? 'Please enter a product name.' : 'Molimo unesite naziv modela.');
      return;
    }
    if (selectedImages.length === 0) {
      alert(isEn ? 'Please choose at least one photo from the gallery.' : 'Molimo izaberite bar jednu sliku iz galerije za ovaj proizvod.');
      return;
    }
    if (!priceRsd || Number(priceRsd) <= 0) {
      alert(isEn ? 'Please enter a price in RSD.' : 'Molimo unesite cenu u dinarima.');
      return;
    }

    const currentCustom = await loadCustomProductsFromStorage();
    
    const newProduct: Product = {
      id: productToEdit ? productToEdit.id : `custom-prod-${Date.now()}`,
      name: name.trim(),
      nameEn: nameEn.trim() || undefined,
      category: category,
      priceRsd: Number(priceRsd),
      description: description.trim() || (isEn ? 'Handcrafted authentic model by Savremeni Koreni.' : 'Ručno rađen autorski model radionice Savremeni Koreni.'),
      descriptionEn: descriptionEn.trim() || undefined,
      longDescription: description.trim(),
      longDescriptionEn: descriptionEn.trim() || undefined,
      craftTechniques: craftTechniques.split(',').map((s) => s.trim()).filter(Boolean),
      materials: materials.split(',').map((s) => s.trim()).filter(Boolean),
      dimensions: dimensions.trim() || undefined,
      image: selectedImages[0],
      images: selectedImages.length > 1 ? selectedImages.slice(1) : [],
      priceEur: Math.round(Number(priceRsd) / 117.2),
      inStock: inStock,
      leadTimeDays: Number(leadTimeDays) || 4,
      featured: true,
      badge: badge.trim() || undefined,
    };

    let updatedList: Product[];
    if (productToEdit) {
      updatedList = currentCustom.map((p) => (p.id === productToEdit.id ? newProduct : p));
      if (!currentCustom.some((p) => p.id === productToEdit.id)) {
        updatedList.push(newProduct);
      }
    } else {
      updatedList = [newProduct, ...currentCustom.filter((p) => p.id !== newProduct.id)];
    }

    await saveCustomProductsToStorage(updatedList);

    // Sync to backend and automatically regenerate sitemap.xml
    try {
      syncProductToServer(newProduct);
      triggerSitemapUpdate({ customProducts: updatedList });
    } catch (e) {
      console.warn("Could not sync sitemap on product save:", e);
    }

    // Notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('custom-products-updated', { detail: updatedList }));
    }

    if (onProductSaved) {
      onProductSaved(newProduct);
    }

    setSuccessMsg(isEn ? 'Product successfully published to Catalog!' : 'Proizvod je uspešno postavljen u Katalog!');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-[#E8E0D5] max-h-[92vh] flex flex-col overflow-hidden text-[#241D19]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#FAF7F2] border-b border-[#E8E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#9E3E26] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#241D19]">
                {productToEdit ? (isEn ? 'Edit Catalog Product' : 'Uredi artikal u katalogu') : (isEn ? 'Publish Photo to Catalog with Price' : 'Postavi sliku u Katalog sa cenom')}
              </h3>
              <p className="text-[11px] text-[#241D19]/70">
                {isEn ? 'Pair your workshop photo with price in RSD, category, and model name' : 'Povežite vašu fotografiju sa cenom u dinarima i nazivom modela'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 bg-white hover:bg-[#9E3E26] text-[#241D19] hover:text-white rounded-full border border-[#E8E0D5] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center group shrink-0"
            aria-label={isEn ? 'Close modal' : 'Zatvori prozor'}
            title={isEn ? 'Close' : 'Zatvori (ESC)'}
          >
            <X className="w-5 h-5 stroke-[2.5] transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 bg-[#4E6852]/10 border-b border-[#4E6852]/30 text-[#4E6852] text-xs font-bold flex items-center gap-2 px-5">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          
          {/* Step 1: Select Image from Gallery */}
          <div className="space-y-2">
            <label className="block font-bold text-[#241D19] text-xs uppercase tracking-wider">
              {isEn ? '1. Select photos from your gallery (up to 4):' : '1. Izaberite do 4 fotografije iz vaše galerije:'}
            </label>

            {selectedImages.length > 0 ? (
              <div className="flex flex-col gap-3 p-3 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4">
                    {selectedImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Selected product preview"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-1 rounded-lg border border-[#E8E0D5] bg-white relative z-10 shadow-sm"
                        style={{ zIndex: 10 - i }}
                      />
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#4E6852] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {isEn ? `${selectedImages.length} photo(s) selected` : `${selectedImages.length} slika izabrano`}
                    </span>
                    <p className="text-[11px] text-[#241D19]/60 truncate mt-0.5">
                      {isEn ? 'Click photos below to toggle selection' : 'Kliknite na slike ispod da dodate ili uklonite'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                {isEn ? 'Select a photo by clicking one from the gallery below:' : 'Izaberite fotografiju klikom na neku od slika iz vaše galerije ispod:'}
              </div>
            )}

            {/* Gallery picker scroll */}
            {galleryPhotos.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto p-2 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl no-scrollbar">
                {galleryPhotos.map((photo) => {
                  const isSelected = selectedImages.includes(photo.imageUrl);
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedImages(prev => prev.filter(img => img !== photo.imageUrl));
                        } else {
                          if (selectedImages.length >= 4) {
                            alert(isEn ? "You can select up to 4 images maximum." : "Možete izabrati najviše 4 slike.");
                            return;
                          }
                          setSelectedImages(prev => [...prev, photo.imageUrl]);
                          if (!name && selectedImages.length === 0) setName(photo.title);
                        }
                      }}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#9E3E26] ring-2 ring-[#9E3E26]/30 scale-105'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-contain p-0.5 bg-white"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#9E3E26]/30 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 drop-shadow" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Step 2: Name and Category */}
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#241D19] mb-1">
                  {isEn ? 'Model name (Serbian):' : 'Naziv modela (na srpskom):'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isEn ? 'e.g. Ručno heklana crvena torbica' : 'npr. Ručno heklana crvena torbica'}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#241D19] mb-1">
                  {isEn ? 'Model name (English):' : 'Naziv modela (na engleskom):'}
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder={isEn ? 'e.g. Hand-crocheted Burgundy Bag' : 'npr. Hand-crocheted Burgundy Bag'}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#241D19] mb-1">
                {isEn ? 'Catalog Category:' : 'Kategorija u katalogu:'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
              >
                <option value="torbice">{isEn ? '👜 Unique Bags & Purses' : '👜 Unikatne Torbice'}</option>
                <option value="subare">{isEn ? '🎩 Traditional Hats & Caps' : '🎩 Tradicionalne Šubare'}</option>
                <option value="carape">{isEn ? '🧦 Woolen Socks & Knitwear' : '🧦 Vunene Čarape'}</option>
                <option value="kosulje">{isEn ? '👔 Embroidered Folk Costumes' : '👔 Vezene Košulje'}</option>
                <option value="nakit">{isEn ? '📿 Crocheted Ethno Jewelry' : '📿 Heklani Nakit'}</option>
                <option value="dom-pokloni">{isEn ? '✨ Ethno Home & Gifts' : '✨ Etno Dom & Pokloni'}</option>
              </select>
            </div>
          </div>

          {/* Step 3: Price in RSD */}
          <div className="p-4 bg-[#F4E8E3]/60 border border-[#9E3E26]/20 rounded-xl space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="font-bold text-[#9E3E26] text-xs uppercase tracking-wider">
                {isEn ? 'Price in Serbian Dinars (RSD):' : 'Cena u dinarima (RSD):'} <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-[#241D19]/70">
                {isEn ? <>Typical price range: <strong>3,500 – 8,000 RSD</strong></> : <>Uobičajene cene torbica: <strong>3.500 – 8.000 RSD</strong></>}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRsd}
                onChange={(e) => setPriceRsd(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="npr. 4800"
                min="500"
                max="50000"
                step="100"
                className="flex-1 px-4 py-2.5 text-base sm:text-lg font-bold bg-white border border-[#9E3E26]/40 rounded-xl focus:outline-hidden focus:border-[#9E3E26] text-[#9E3E26]"
                required
              />
              <span className="font-bold text-[#241D19] text-sm sm:text-base px-2">
                RSD
              </span>
            </div>

            {/* Quick Price Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-[#241D19]/60">{isEn ? 'Quick presets:' : 'Brzi izbor:'}</span>
              {[3800, 4200, 4800, 5400, 6200, 7800].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriceRsd(p)}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors cursor-pointer ${
                    priceRsd === p
                      ? 'bg-[#9E3E26] text-white border-[#9E3E26]'
                      : 'bg-white text-[#241D19]/80 border-[#E8E0D5] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {p.toLocaleString(isEn ? 'en-US' : 'sr-RS')} {isEn ? 'RSD' : 'din'}
                </button>
              ))}
            </div>

            {/* Live Currency Equivalents */}
            {priceRsd && Number(priceRsd) > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#241D19]/70 pt-1.5 border-t border-[#9E3E26]/10">
                <span className="font-medium">{isEn ? 'Automatic currency conversion:' : 'Automatski preračunato za dijasporu:'}</span>
                <span className="font-bold text-[#9E3E26]">≈ €{Math.round(Number(priceRsd) / 117.2)}</span>
                <span className="text-[#9E3E26]/30">•</span>
                <span className="font-bold text-[#241D19]">≈ ${Math.round(Number(priceRsd) / 108.5)}</span>
                <span className="text-[#9E3E26]/30">•</span>
                <span className="font-bold text-[#241D19]">≈ {Math.round(Number(priceRsd) / 125.0)} CHF</span>
              </div>
            )}
          </div>

          {/* Dimensions and Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#241D19] mb-1">
                {isEn ? 'Dimensions (optional):' : 'Dimenzije modela (opciono):'}
              </label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="npr. 25 cm x 18 cm x 7 cm"
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#241D19] mb-1">
                {isEn ? 'Badge / Tag (optional):' : 'Oznaka / Bedž (opciono):'}
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder={isEn ? 'e.g. Unique, Handmade, Popular' : 'npr. Unikat, Ručni rad, Popularno'}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#241D19] mb-1">
                {isEn ? 'Short description (Serbian):' : 'Kratak opis (na srpskom):'}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isEn ? 'Unikatna ručno heklana torbica od premium pamučnih niti...' : 'Unikatna ručno heklana torbica od premium pamučnih niti...'}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#241D19] mb-1">
                {isEn ? 'Short description (English):' : 'Kratak opis (na engleskom):'}
              </label>
              <textarea
                rows={3}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder={isEn ? 'Unique handmade bag crafted from premium natural cotton with silk lining...' : 'Unique handmade bag crafted from premium natural cotton with silk lining...'}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E0D5] rounded-xl focus:outline-hidden focus:border-[#9E3E26]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#E8E0D5] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#241D19] bg-[#FAF7F2] hover:bg-[#E8E0D5] border border-[#E8E0D5] rounded-xl cursor-pointer"
            >
              {isEn ? 'Cancel' : 'Otkaži'}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#9E3E26] hover:bg-[#7F2F1C] rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? (isEn ? 'Save Changes' : 'Sačuvaj izmene') : (isEn ? 'Publish to Catalog' : 'Objavi u Katalog')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
