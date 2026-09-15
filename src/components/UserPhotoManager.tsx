import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { UploadCloud, Image as ImageIcon, Trash2, Plus, Check, Sparkles, ZoomIn, X, Info, Layers, Tag, Filter, SlidersHorizontal, ArrowRight, ShoppingBag, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { initialGalleryPhotos } from '../data/companyData';
import { loadPhotosFromStorage, savePhotosToStorage, clearAllStoredPhotos } from '../utils/photoStorage';
import { AddProductFromPhotoModal } from './AddProductFromPhotoModal';
import { useLanguage } from '../context/LanguageContext';
import { getGalleryPhotoAlt } from '../utils/imageSeo';

export interface CategoryGroupDef {
  key: string;
  title: string;
  badge: string;
  description: string;
  icon: string;
  match: (p: GalleryPhoto) => boolean;
}

export const CATEGORY_GROUPS_BASE = [
  {
    key: 'Torbice',
    titleSr: 'Torbice i Tašne',
    titleEn: 'Bags & Purses',
    badgeSr: 'Torbice',
    badgeEn: 'Bags',
    icon: '👜',
    descSr: 'Ručno tkane, vezene i heklane etno torbice i tašne',
    descEn: 'Hand-woven, embroidered, and crocheted ethno bags and purses',
    match: (p: GalleryPhoto) => {
      if (p.category === 'Torbice') return true;
      if (p.category && AVAILABLE_CATEGORIES.includes(p.category)) return false;
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      return text.includes('torb') || text.includes('tasn') || text.includes('tašn') || text.includes('torba');
    }
  },
  {
    key: 'Čarape',
    titleSr: 'Vunene Čarape i Pletivo',
    titleEn: 'Wool Socks & Knitwear',
    badgeSr: 'Čarape',
    badgeEn: 'Socks',
    icon: '🧦',
    descSr: 'Tradicionalne pletene i vezene vunene čarape od domaće vune',
    descEn: 'Traditional hand-knitted and embroidered socks from natural wool',
    match: (p: GalleryPhoto) => {
      if (p.category === 'Čarape') return true;
      if (p.category && AVAILABLE_CATEGORIES.includes(p.category)) return false;
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      return text.includes('čar') || text.includes('car') || text.includes('vun') || text.includes('plet');
    }
  },
  {
    key: 'Šubare',
    titleSr: 'Šubare i Kape',
    titleEn: 'Folk Hats & Fur Caps',
    badgeSr: 'Šubare',
    badgeEn: 'Hats',
    icon: '🎩',
    descSr: 'Autentične šubare od jagnjećeg krzna i tradicionalne kape',
    descEn: 'Authentic lambskin šubara hats and traditional caps',
    match: (p: GalleryPhoto) => {
      if (p.category === 'Šubare') return true;
      if (p.category && AVAILABLE_CATEGORIES.includes(p.category)) return false;
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      return text.includes('šub') || text.includes('sub') || text.includes('kap') || text.includes('krz');
    }
  },
  {
    key: 'Košulje',
    titleSr: 'Košulje i Narodna Nošnja',
    titleEn: 'Folk Costumes & Shirts',
    badgeSr: 'Košulje',
    badgeEn: 'Costumes',
    icon: '👔',
    descSr: 'Vezene košulje, narodna nošnja, jeleci i tkani pojasevi',
    descEn: 'Hand-embroidered shirts, traditional folk vests, and woven sashes',
    match: (p: GalleryPhoto) => {
      if (p.category === 'Košulje') return true;
      if (p.category && AVAILABLE_CATEGORIES.includes(p.category)) return false;
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      return text.includes('koš') || text.includes('kos') || text.includes('platn') || text.includes('bluz') || text.includes('nošnj') || text.includes('nosnj') || text.includes('jelek');
    }
  },
  {
    key: 'Nakit',
    titleSr: 'Etno Nakit i Detalji',
    titleEn: 'Ethno Jewelry & Accents',
    badgeSr: 'Nakit',
    badgeEn: 'Jewelry',
    icon: '📿',
    descSr: 'Unikatne ogrlice, minđuše i tradicijski detalji',
    descEn: 'Unique crochet necklaces, earrings, and heritage accessories',
    match: (p: GalleryPhoto) => {
      if (p.category === 'Nakit') return true;
      if (p.category && AVAILABLE_CATEGORIES.includes(p.category)) return false;
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      return text.includes('nakit') || text.includes('ogrlic') || text.includes('mindjus') || text.includes('minđuš') || text.includes('heklan');
    }
  },
  {
    key: 'Radionica',
    titleSr: 'Radionica i Proces Izrade',
    titleEn: 'Workshop & Crafting Process',
    badgeSr: 'Radionica',
    badgeEn: 'Workshop',
    icon: '🪡',
    descSr: 'Procesi tkanja, veza i atmosfera iz naše radionice',
    descEn: 'Traditional weaving, embroidery, and atelier atmosphere',
    match: (p: GalleryPhoto) => {
      if (p.category === 'Radionica') return true;
      if (p.category && AVAILABLE_CATEGORIES.includes(p.category)) return false;
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      return text.includes('radionic') || text.includes('josanic') || text.includes('jošanic') || text.includes('proces') || text.includes('razboj');
    }
  }
];

export const CATEGORY_GROUPS: CategoryGroupDef[] = CATEGORY_GROUPS_BASE.map(g => ({
  key: g.key,
  title: g.titleSr,
  badge: g.badgeSr,
  description: g.descSr,
  icon: g.icon,
  match: g.match
}));

const AVAILABLE_CATEGORIES = ['Torbice', 'Čarape', 'Šubare', 'Košulje', 'Nakit', 'Radionica'];

const cleanAndDeduplicate = (list: GalleryPhoto[]): GalleryPhoto[] => {
  const seenUrls = new Set<string>();
  const seenIds = new Set<string>();
  return list.filter((p) => {
    if (!p || !p.imageUrl || typeof p.imageUrl !== 'string' || p.imageUrl.trim().length === 0) return false;
    if (seenUrls.has(p.imageUrl) || seenIds.has(p.id)) return false;
    seenUrls.add(p.imageUrl);
    seenIds.add(p.id);
    return true;
  });
};

interface UserPhotoManagerProps {
  onPhotosUpdated?: (photos: GalleryPhoto[]) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

const STORAGE_KEY = 'savremeni_koreni_user_photos_v1';

export const UserPhotoManager: React.FC<UserPhotoManagerProps> = ({
  onPhotosUpdated,
  isOpenModal = false,
  onCloseModal,
}) => {
  const { t, isEn } = useLanguage();
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => cleanAndDeduplicate(initialGalleryPhotos));
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<string[]>([]);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('sve');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTargetCategory, setUploadTargetCategory] = useState<string>('Torbice');
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [organizerSearch, setOrganizerSearch] = useState('');
  const [organizerFilterCategory, setOrganizerFilterCategory] = useState<string>('all');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isAddToCatalogOpen, setIsAddToCatalogOpen] = useState(false);
  const [photoForCatalog, setPhotoForCatalog] = useState<GalleryPhoto | null>(null);
  const [loadedImageIds, setLoadedImageIds] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [categoryPageSize, setCategoryPageSize] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photos asynchronously from IndexedDB on startup and purge any legacy dummy records
  useEffect(() => {
    let isMounted = true;
    
    // Load deleted photo IDs
    let initialDeletedIds: string[] = [];
    try {
      const stored = localStorage.getItem('savremeni_koreni_deleted_photos_gallery');
      if (stored) {
        initialDeletedIds = JSON.parse(stored);
        setDeletedPhotoIds(initialDeletedIds);
      }
    } catch (e) {}

    loadPhotosFromStorage().then(async (savedPhotos) => {
      if (isMounted) {
        let baseList: GalleryPhoto[] = [];
        if (savedPhotos && savedPhotos.length > 0) {
          const customPhotos = savedPhotos.filter(p => p.isCustomUploaded);
          const factoryPhotos = initialGalleryPhotos.filter(fp => !initialDeletedIds.includes(fp.id));
          baseList = [...customPhotos, ...factoryPhotos];
        } else {
          baseList = [...initialGalleryPhotos.filter(p => !initialDeletedIds.includes(p.id))];
        }

        // Check if server has custom uploaded photos
        try {
          const resp = await fetch('/api/custom-photos');
          if (resp.ok) {
            const serverPhotos: Array<{ id: string; fileName: string; url: string }> = await resp.json();
            if (Array.isArray(serverPhotos) && serverPhotos.length > 0) {
              const existingUrls = new Set(baseList.map(p => p.imageUrl));
              serverPhotos.forEach((sp) => {
                if (!existingUrls.has(sp.url) && !initialDeletedIds.includes(sp.id)) {
                  baseList.push({
                    id: sp.id,
                    title: `Unikatni rad radionice`,
                    titleEn: `Artisan Workshop Work`,
                    category: 'Radionica',
                    categoryEn: 'Workshop',
                    imageUrl: sp.url,
                    caption: 'Autentični ručni rad majstora Tanje Petrić, radionica Savremeni Koreni.',
                    captionEn: 'Authentic handmade craft by Tanja Petrić, Savremeni Koreni.',
                    isCustomUploaded: true,
                    dateAdded: new Date().toLocaleDateString(isEn ? 'en-US' : 'sr-RS'),
                  });
                }
              });
            }
          }
        } catch (e) {
          // ignore network error
        }

        const cleaned = cleanAndDeduplicate(baseList.filter(p => !initialDeletedIds.includes(p.id)));
        setPhotos(cleaned);
        savePhotosToStorage(cleaned).catch(console.error);
        setIsStorageLoaded(true);
      }
    }).catch((err) => {
      console.warn('Failed to load photos from storage:', err);
      if (isMounted) setIsStorageLoaded(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleResetToFactoryGallery = () => {
    try {
      localStorage.removeItem('savremeni_koreni_deleted_photos_gallery');
    } catch (e) {}
    setDeletedPhotoIds([]);
    const fresh = cleanAndDeduplicate(initialGalleryPhotos);
    setPhotos(fresh);
    savePhotosToStorage(fresh).catch(console.error);
    setUploadSuccessMessage(isEn ? 'Restored original workshop gallery (all 20 authentic masterworks).' : 'Vraćena originalna galerija radionice (svih 20 unikatnih radova bez ponavljanja).');
    setTimeout(() => setUploadSuccessMessage(null), 4000);
  };

  const handleRemoveDuplicatesAndBlackImages = () => {
    setPhotos((prev) => {
      const cleaned = cleanAndDeduplicate(prev);
      savePhotosToStorage(cleaned).catch(console.error);
      return cleaned;
    });
    setUploadSuccessMessage(isEn ? 'Gallery successfully organized.' : 'Uspešno organizovana galerija.');
    setTimeout(() => setUploadSuccessMessage(null), 3000);
  };

  // Sync photos to IndexedDB only AFTER initial load completes (prevents overwriting)
  useEffect(() => {
    if (!isStorageLoaded) return;
    savePhotosToStorage(photos).catch((err) => {
      console.error('Error auto-saving photos to IndexedDB:', err);
    });
    if (onPhotosUpdated) {
      onPhotosUpdated(photos);
    }
  }, [photos, isStorageLoaded, onPhotosUpdated]);

  const handleUpdatePhotoCategory = (photoId: string, newCategory: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === photoId) {
          return {
            ...p,
            category: newCategory,
            caption: `Autentični rad u kategoriji ${newCategory} - Savremeni Koreni.`
          };
        }
        return p;
      })
    );
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto((prev) => prev ? { ...prev, category: newCategory } : null);
    }
    setUploadSuccessMessage(isEn ? `Photo moved to category: ${newCategory}` : `Slika je prebačena u kategoriju: ${newCategory}`);
    setTimeout(() => setUploadSuccessMessage(null), 2500);
  };

  // Smart auto-distribution for images
  const handleAutoDistributeBalanced = () => {
    const customPhotos = photos.filter(p => p.isCustomUploaded);
    if (customPhotos.length === 0) return;

    const categories = ['Torbice', 'Čarape', 'Šubare', 'Košulje', 'Nakit'];
    const updatedPhotos = photos.map((p, index) => {
      if (!p.isCustomUploaded) return p;
      
      const text = `${p.title} ${p.caption || ''}`.toLowerCase();
      if (text.includes('čar') || text.includes('car') || text.includes('vun')) return { ...p, category: 'Čarape' };
      if (text.includes('šub') || text.includes('sub') || text.includes('krz') || text.includes('kap')) return { ...p, category: 'Šubare' };
      if (text.includes('koš') || text.includes('kos') || text.includes('nošnj') || text.includes('jelek')) return { ...p, category: 'Košulje' };
      if (text.includes('nakit') || text.includes('ogrlic') || text.includes('minđuš')) return { ...p, category: 'Nakit' };
      if (text.includes('torb') || text.includes('tasn') || text.includes('tašn')) return { ...p, category: 'Torbice' };

      const assignedCategory = categories[index % categories.length];
      return {
        ...p,
        category: assignedCategory,
        caption: `Autentični rad u kategoriji ${assignedCategory} - Savremeni Koreni.`
      };
    });

    setPhotos(updatedPhotos);
    setUploadSuccessMessage(isEn ? 'Photos distributed across all categories!' : 'Slike su raspodeljene po svim kategorijama!');
    setTimeout(() => setUploadSuccessMessage(null), 4000);
  };

  // Handle batch file uploads reliably
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    const files = Array.from(fileList);

    const processFile = (file: File): Promise<GalleryPhoto | null> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (!result) return resolve(null);

          const img = new Image();
          img.src = result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round(height * (MAX_WIDTH / width));
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round(width * (MAX_HEIGHT / height));
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            const chosenCategory = uploadTargetCategory || 'Torbice';

            const newPhoto: GalleryPhoto = {
              id: 'custom-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8),
              title: file.name.replace(/\.[^/.]+$/, '').replace(/10000/, 'Slika '),
              category: chosenCategory,
              imageUrl: compressedDataUrl,
              caption: `Autentični rad u kategoriji ${chosenCategory} - Savremeni Koreni.`,
              isCustomUploaded: true,
              dateAdded: new Date().toLocaleDateString(isEn ? 'en-US' : 'sr-RS'),
            };

            resolve(newPhoto);
          };
          img.onerror = () => resolve(null);
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    };

    try {
      const results = await Promise.all(files.map(processFile));
      const validNewPhotos = results.filter((p): p is GalleryPhoto => p !== null);

      if (validNewPhotos.length > 0) {
        setPhotos((prev) => {
          const existingUrls = new Set(prev.map(p => p.imageUrl));
          const nonDuplicateNew = validNewPhotos.filter(p => !existingUrls.has(p.imageUrl));
          const updated = [...nonDuplicateNew, ...prev];
          savePhotosToStorage(updated).catch(console.error);
          return updated;
        });

        setUploadSuccessMessage(isEn ? `Successfully added ${validNewPhotos.length} photos to "${uploadTargetCategory}"!` : `Uspešno dodato ${validNewPhotos.length} fotografija u kategoriju "${uploadTargetCategory}"!`);
        setTimeout(() => setUploadSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error('Upload processing error:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearAllCustomPhotos = () => {
    if (window.confirm(isEn ? 'Are you sure you want to delete all your uploaded photos?' : 'Da li ste sigurni da želite da obrišete sve vaše ubačene slike?')) {
      setPhotos((prev) => {
        const remaining = prev.filter(p => !p.isCustomUploaded);
        savePhotosToStorage(remaining).catch(console.error);
        return remaining;
      });
      setUploadSuccessMessage(isEn ? 'All custom photos have been deleted.' : 'Sve vaše ubačene slike su obrisane.');
      setTimeout(() => setUploadSuccessMessage(null), 3000);
    }
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCustom = photos.find(p => p.id === id)?.isCustomUploaded;
    
    if (!isCustom) {
      const updatedDeleted = [...deletedPhotoIds, id];
      setDeletedPhotoIds(updatedDeleted);
      localStorage.setItem('savremeni_koreni_deleted_photos_gallery', JSON.stringify(updatedDeleted));
    }
    
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      savePhotosToStorage(updated).catch(console.error);
      return updated;
    });
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  const handleResetToDefault = () => {
    clearAllStoredPhotos().then(() => {
      setDeletedPhotoIds([]);
      localStorage.removeItem('savremeni_koreni_deleted_photos_gallery');
      setPhotos(cleanAndDeduplicate(initialGalleryPhotos));
      savePhotosToStorage(initialGalleryPhotos).catch(console.error);
    });
    setUploadSuccessMessage(isEn ? 'Gallery reset to default.' : 'Galerija je vraćena na podrazumevane fotografije.');
    setTimeout(() => setUploadSuccessMessage(null), 3000);
  };

  const customUploadedCount = photos.filter((p) => p.isCustomUploaded).length;

  const cleanedList = useMemo(() => cleanAndDeduplicate(photos), [photos]);

  const localizedCategoryGroups = useMemo(() => {
    return CATEGORY_GROUPS_BASE.map(g => ({
      key: g.key,
      title: isEn ? g.titleEn : g.titleSr,
      badge: isEn ? g.badgeEn : g.badgeSr,
      description: isEn ? g.descEn : g.descSr,
      icon: g.icon,
      match: g.match
    }));
  }, [isEn]);

  // Group photos into categorized arrays in chronological order
  const groupedCategories = useMemo(() => {
    const assignedIds = new Set<string>();

    const groups = localizedCategoryGroups.map((group) => {
      const items = cleanedList.filter((p) => {
        if (assignedIds.has(p.id)) return false;
        if (group.match(p)) {
          assignedIds.add(p.id);
          return true;
        }
        return false;
      }).sort((a, b) => {
        if (a.isCustomUploaded && !b.isCustomUploaded) return -1;
        if (!a.isCustomUploaded && b.isCustomUploaded) return 1;
        return a.title.localeCompare(b.title);
      });

      return {
        ...group,
        items,
      };
    });

    const remaining = cleanedList.filter((p) => !assignedIds.has(p.id)).sort((a, b) => a.title.localeCompare(b.title));
    if (remaining.length > 0) {
      groups.push({
        key: 'Ostalo',
        title: isEn ? 'Other Creations' : 'Ostali Radovi',
        badge: isEn ? 'Other' : 'Ostalo',
        icon: '✨',
        description: isEn ? 'Authentic handmade crafts and heritage details' : 'Autentični detalji i rukotvorine iz naše zbirke',
        match: () => true,
        items: remaining,
      });
    }

    return groups;
  }, [cleanedList, localizedCategoryGroups, isEn]);

  const renderPhotoCard = (photo: GalleryPhoto) => (
    <div
      key={photo.id}
      onClick={() => setSelectedPhoto(photo)}
      className="group relative aspect-3/4 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E8E0D5] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full h-full bg-[#FAF7F2] overflow-hidden">
        {!loadedImageIds[photo.id] && (
          <div className="absolute inset-0 bg-[#E8E0D5]/35 animate-pulse flex flex-col items-center justify-center p-3 text-center pointer-events-none z-0">
            <span className="text-[11px] font-serif tracking-widest text-[#9E3E26]/50 uppercase font-semibold">
              Savremeni Koreni
            </span>
            <span className="text-[10px] text-[#241D19]/40 mt-1 font-sans">
              {photo.category}
            </span>
          </div>
        )}
        <img
          src={photo.imageUrl}
          alt={getGalleryPhotoAlt(photo, isEn)}
          title={isEn ? `${photo.titleEn || photo.title} — Artisan craft by Savremeni Koreni (Homolje, Serbia)` : `${photo.title} — Autentični ručni rad Savremeni Koreni (Jošanica)`}
          aria-label={getGalleryPhotoAlt(photo, isEn)}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoadedImageIds((prev) => (prev[photo.id] ? prev : { ...prev, [photo.id]: true }))}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.opacity = '0';
          }}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ${
            loadedImageIds[photo.id] ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Top category pill */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className={`backdrop-blur-xs text-[#FAF7F2] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded shadow-xs ${
          photo.isCustomUploaded ? 'bg-[#9E3E26]/90 border border-white/20' : 'bg-black/70'
        }`}>
          {photo.isCustomUploaded ? (isEn ? 'Your Photo' : 'Vaša slika') : photo.category}
        </span>

        <span className="text-[10px] bg-black/60 backdrop-blur-xs text-[#E8D0A9] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
          <ZoomIn className="w-3 h-3" />
          <span>{isEn ? 'Preview' : 'Pregled'}</span>
        </span>
      </div>

      {/* Bottom title and information */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3.5 pt-8 flex flex-col justify-end text-white opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-sm font-bold truncate pr-2">
            {photo.title}
          </h4>
          <span className="text-[11px] font-semibold text-[#E8D0A9] shrink-0 flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5" />
            {isEn ? 'Unikat' : 'Unikat'}
          </span>
        </div>
        {photo.caption && (
          <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 font-light">
            {photo.caption}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section id="galerija" className="py-20 bg-white text-[#241D19] border-b border-[#E8E0D5]">
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Handmade Masterworks & Portfolio' : 'Portfolio & Autentični Radovi'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#241D19] tracking-tight">
              {isEn ? 'Workshop Portfolio & Lookbook' : 'Galerija i portfolio radova'}
            </h2>
            <p className="text-sm sm:text-base text-[#241D19]/75 leading-relaxed">
              {isEn 
                ? <>Explore our catalog of handcrafted creations: <strong>Bags</strong>, <strong>Socks</strong>, <strong>Folk Hats</strong>, <strong>Costumes</strong>, and <strong>Jewelry</strong> created with ancient techniques in Homolje.</>
                : <>Pregledajte zbirku unikatnih rukotvorina podeljenih po tematskim celinama: <strong>Torbice</strong>, <strong>Čarape</strong>, <strong>Šubare</strong>, <strong>Košulje</strong> i <strong>Nakit</strong>.</>
              }
            </p>
          </div>
        </motion.div>

        {/* Upload Success Alert */}
        {uploadSuccessMessage && (
          <div className="mb-6 p-4 rounded-xl bg-[#4E6852]/10 border border-[#4E6852]/30 text-[#4E6852] text-xs sm:text-sm font-medium flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4E6852]" />
              <span>{uploadSuccessMessage}</span>
            </div>
            <span className="text-[11px] text-[#241D19]/60">{isEn ? 'Saved' : 'Sačuvano'}</span>
          </div>
        )}

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E8E0D5] pb-3 mb-8 gap-3"
        >
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('sve')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'sve'
                  ? 'bg-[#241D19] text-white'
                  : 'text-[#241D19]/70 hover:bg-[#FAF7F2]'
              }`}
            >
              {isEn ? `All Grouped (${cleanedList.length})` : `Sve grupisano (${cleanedList.length})`}
            </button>

            {localizedCategoryGroups.map((group) => {
              const count = groupedCategories.find(g => g.key === group.key)?.items.length || 0;
              return (
                <button
                  key={group.key}
                  onClick={() => {
                    setActiveTab(group.key);
                    setUploadTargetCategory(group.key);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === group.key
                      ? 'bg-[#9E3E26] text-white shadow-xs'
                      : 'text-[#241D19]/70 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>{group.icon}</span>
                  <span>{group.badge} ({count})</span>
                </button>
              );
            })}

            {customUploadedCount > 0 && (
              <button
                onClick={() => setActiveTab('moje')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'moje'
                    ? 'bg-[#9E3E26] text-white'
                    : 'text-[#9E3E26] bg-[#F4E8E3]/60 hover:bg-[#F4E8E3]'
                }`}
              >
                {isEn ? `My Uploads (${customUploadedCount})` : `Moje ubačene (${customUploadedCount})`}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetToFactoryGallery}
              title={isEn ? "Reset gallery to authentic workshop collection" : "Vrati originalnu fabričku kolekciju"}
              className="text-xs text-[#241D19]/60 hover:text-[#9E3E26] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reset original gallery' : 'Vrati fabričku kolekciju'}</span>
            </button>

            <button
              onClick={() => setIsOrganizerOpen(true)}
              className="text-xs text-[#9E3E26] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isEn ? 'Organize / Reorder all photos' : 'Organizuj / Rasporedi sve slike'}</span>
            </button>
          </div>
        </motion.div>

        {/* Gallery Content */}
        {activeTab === 'sve' ? (
          /* Grouped chronological display with clear section headings */
          <div className="space-y-14">
            {groupedCategories
              .filter((group) => group.items.length > 0)
              .map((group) => (
                <div key={group.key} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#E8E0D5]/70 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-[#9E3E26] bg-[#F4E8E3] px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <span>{group.icon}</span>
                          <span>{group.badge}</span>
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
                          {group.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#241D19]/60 mt-0.5">
                        {group.description}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#241D19]/60 bg-[#FAF7F2] border border-[#E8E0D5] px-3 py-1 rounded-full">
                      {group.items.length} {isEn ? (group.items.length === 1 ? 'photo' : 'photos') : 'slika'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {(expandedCategories[group.key] ? group.items : group.items.slice(0, 8)).map((photo) => renderPhotoCard(photo))}
                  </div>

                  {group.items.length > 8 && (
                    <div className="pt-2 text-center">
                      <button
                        onClick={() => setExpandedCategories((prev) => ({ ...prev, [group.key]: !prev[group.key] }))}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4E8E3] border border-[#E8E0D5] text-[#9E3E26] font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
                      >
                        <span>
                          {expandedCategories[group.key]
                            ? (isEn ? 'Show fewer items' : 'Prikaži manje')
                            : (isEn ? `Show all ${group.items.length} works in ${group.badge}` : `Prikaži svih ${group.items.length} radova u ${group.badge}`)}
                        </span>
                        {expandedCategories[group.key] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : activeTab === 'moje' ? (
          /* Filtered to user uploaded only */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E0D5]/70 pb-2">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
                  {isEn ? `Your uploaded photos (${customUploadedCount})` : `Vaše ubačene fotografije (${customUploadedCount})`}
                </h3>
                <p className="text-xs sm:text-sm text-[#241D19]/60">
                  {isEn ? 'You can change the category of any photo using the buttons below each image' : 'Možete promeniti kategoriju bilo koje slike klikom na dugmad ispod svake slike'}
                </p>
              </div>
              <button
                onClick={() => setIsOrganizerOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#9E3E26] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {isEn ? 'Organize' : 'Rasporedi'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(() => {
                const myPhotos = cleanedList.filter((p) => p.isCustomUploaded);
                const limit = categoryPageSize['moje'] || 24;
                return myPhotos.slice(0, limit).map((photo) => renderPhotoCard(photo));
              })()}
            </div>
            {cleanedList.filter((p) => p.isCustomUploaded).length > (categoryPageSize['moje'] || 24) && (
              <div className="pt-4 text-center">
                <button
                  onClick={() => setCategoryPageSize((prev) => ({ ...prev, moje: (prev['moje'] || 24) + 24 }))}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4E8E3] border border-[#E8E0D5] text-[#9E3E26] font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
                >
                  <span>{isEn ? 'Load more photos' : 'Učitaj još fotografija'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Filtered to specific category */
          <div className="space-y-6">
            {(() => {
              const selectedGroup = groupedCategories.find((g) => g.key === activeTab);
              if (!selectedGroup || selectedGroup.items.length === 0) {
                return (
                  <div className="py-16 text-center text-[#241D19]/60 space-y-3">
                    <p className="text-sm">{isEn ? `No photos in category "${activeTab}".` : `Nema fotografija u kategoriji "${activeTab}".`}</p>
                    <button
                      onClick={() => {
                        setUploadTargetCategory(activeTab);
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 rounded-xl bg-[#9E3E26] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      {isEn ? `Upload photos into "${activeTab}"` : `Ubacite slike direktno u "${activeTab}"`}
                    </button>
                  </div>
                );
              }
              return (
                <>
                  <div className="flex items-center justify-between border-b border-[#E8E0D5]/70 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{selectedGroup.icon}</span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
                          {selectedGroup.title} ({selectedGroup.items.length})
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#241D19]/60 mt-0.5">
                        {selectedGroup.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setUploadTargetCategory(selectedGroup.key);
                        fileInputRef.current?.click();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#9E3E26] hover:bg-[#7F2F1C] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Add to this group' : 'Dodaj u ovu grupu'}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {selectedGroup.items.slice(0, categoryPageSize[selectedGroup.key] || 24).map((photo) => renderPhotoCard(photo))}
                  </div>
                  {selectedGroup.items.length > (categoryPageSize[selectedGroup.key] || 24) && (
                    <div className="pt-4 text-center">
                      <button
                        onClick={() => setCategoryPageSize((prev) => ({ ...prev, [selectedGroup.key]: (prev[selectedGroup.key] || 24) + 24 }))}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4E8E3] border border-[#E8E0D5] text-[#9E3E26] font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
                      >
                        <span>{isEn ? `Show more (${selectedGroup.items.length - (categoryPageSize[selectedGroup.key] || 24)} remaining)` : `Prikaži još radova (preostalo ${selectedGroup.items.length - (categoryPageSize[selectedGroup.key] || 24)})`}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: ORGANIZATOR SLIKA (BRZO PREMEŠTANJE JEDNIM KLIKOM) */}
        {/* ========================================================================= */}
        {isOrganizerOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in"
            onClick={() => setIsOrganizerOpen(false)}
          >
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#E8E0D5] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#9E3E26]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D19]">
                      {isEn ? 'Photo Category Organizer' : 'Organizator slika po kategorijama'}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#241D19]/70 mt-1">
                    {isEn ? 'Click any category button under a photo to instantly re-assign it' : 'Kliknite na naziv kategorije ispod svake slike da je odmah premestite (Torbice, Čarape, Šubare, Košulje, Nakit)'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAutoDistributeBalanced}
                    className="px-3 py-2 rounded-xl bg-white border border-[#E8E0D5] hover:border-[#9E3E26] text-xs font-bold text-[#241D19] flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title={isEn ? 'Automatically balance photos across categories' : 'Automatski ravnomerno rasporedi po svim kategorijama'}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#9E3E26]" />
                    <span>{isEn ? 'Auto-organize' : 'Auto-raspored'}</span>
                  </button>

                  <button
                    onClick={() => setIsOrganizerOpen(false)}
                    className="p-2 rounded-xl bg-white border border-[#E8E0D5] hover:bg-[#E8E0D5] text-[#241D19] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filter Sub-bar inside Organizer */}
              <div className="px-5 py-3 bg-white border-b border-[#E8E0D5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#241D19]/60 mr-1">Filter:</span>
                  <button
                    onClick={() => setOrganizerFilterCategory('all')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                      organizerFilterCategory === 'all'
                        ? 'bg-[#241D19] text-white'
                        : 'bg-[#FAF7F2] text-[#241D19]/70'
                    }`}
                  >
                    {isEn ? `All (${cleanedList.length})` : `Sve (${cleanedList.length})`}
                  </button>
                  {AVAILABLE_CATEGORIES.map((cat) => {
                    const count = cleanedList.filter(p => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setOrganizerFilterCategory(cat)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                          organizerFilterCategory === cat
                            ? 'bg-[#9E3E26] text-white'
                            : 'bg-[#FAF7F2] text-[#241D19]/70'
                        }`}
                      >
                        {cat} ({count})
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs text-[#4E6852] font-semibold">
                  {isEn ? 'Changes are saved in real-time' : 'Promene se čuvaju odmah u hodu'}
                </span>
              </div>

              {/* Organizer Images Grid */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#FAF7F2]/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cleanedList
                    .filter((p) => organizerFilterCategory === 'all' || p.category === organizerFilterCategory)
                    .map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-white rounded-xl border border-[#E8E0D5] p-3 shadow-2xs flex flex-col space-y-2.5"
                      >
                        <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#E8E0D5]/50">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover rounded"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {photo.category}
                          </span>
                          <button
                            onClick={(e) => handleDeletePhoto(photo.id, e)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-red-600/80 hover:bg-red-700 text-white cursor-pointer"
                            title={isEn ? 'Delete' : 'Obriši'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <h5 className="font-medium text-xs text-[#241D19] truncate" title={photo.title}>
                            {photo.title}
                          </h5>

                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-[#241D19]/50 block">
                              {isEn ? 'Reassign category:' : 'Promeni u kategoriju:'}
                            </span>
                            <div className="grid grid-cols-3 gap-1">
                              {AVAILABLE_CATEGORIES.slice(0, 6).map((cat) => (
                                <button
                                  key={cat}
                                  onClick={(e) => handleUpdatePhotoCategory(photo.id, cat, e)}
                                  className={`py-1 text-[10px] font-bold rounded transition-colors cursor-pointer text-center truncate px-1 ${
                                    photo.category === cat
                                      ? 'bg-[#9E3E26] text-white shadow-xs'
                                      : 'bg-[#FAF7F2] hover:bg-[#E8E0D5] text-[#241D19]/80 border border-[#E8E0D5]'
                                  }`}
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white border-t border-[#E8E0D5] flex items-center justify-between">
                <span className="text-xs text-[#241D19]/60">
                  {isEn ? `Total: ${cleanedList.length} photos ready for display` : `Ukupno: ${cleanedList.length} fotografija spremnih za prikaz`}
                </span>
                <button
                  onClick={() => setIsOrganizerOpen(false)}
                  className="px-6 py-2 rounded-xl bg-[#241D19] hover:bg-[#3D322B] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  {isEn ? 'Done & Close' : 'Završi i zatvori'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LIGHTBOX ZOOM MODAL (WITH DIRECT CATEGORY SWITCHER) */}
        {/* ========================================================================= */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-white/20 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={getGalleryPhotoAlt(selectedPhoto, isEn)}
                  title={isEn ? `${selectedPhoto.titleEn || selectedPhoto.title} — Savremeni Koreni` : `${selectedPhoto.title} — Savremeni Koreni`}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-[#9E3E26] text-white transition-colors cursor-pointer"
                  aria-label={isEn ? 'Close' : 'Zatvori'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-white space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase font-bold text-[#9E3E26] bg-[#F4E8E3] px-2.5 py-0.5 rounded">
                        {selectedPhoto.category}
                      </span>
                      {selectedPhoto.isCustomUploaded && (
                        <span className="text-xs text-[#4E6852] font-semibold">
                          {isEn ? '• Your uploaded photo' : '• Vaša ubačena slika'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#241D19]">
                      {selectedPhoto.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPhotoForCatalog(selectedPhoto);
                        setIsAddToCatalogOpen(true);
                      }}
                      className="px-3.5 py-2 text-xs font-bold text-white bg-[#9E3E26] hover:bg-[#7F2F1C] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      title={isEn ? 'Set this photo as a purchasable catalog product' : 'Postavi ovu sliku u katalog sa cenom'}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Add to Catalog with Price' : 'Postavi u Katalog sa cenom'}</span>
                    </button>

                    <button
                      onClick={(e) => handleDeletePhoto(selectedPhoto.id, e)}
                      className="px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Remove' : 'Ukloni'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="px-4 py-2 text-xs font-semibold text-[#241D19] bg-[#FAF7F2] hover:bg-[#E8E0D5] border border-[#E8E0D5] rounded-lg cursor-pointer"
                    >
                      {isEn ? 'Close' : 'Zatvori'}
                    </button>
                  </div>
                </div>

                {/* Direct Category Reassignment in Lightbox */}
                <div className="pt-3 border-t border-[#E8E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[#241D19]/70">
                    {isEn ? 'Move this photo to category:' : 'Premesti ovu sliku u kategoriju:'}
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {AVAILABLE_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={(e) => handleUpdatePhotoCategory(selectedPhoto.id, cat, e)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          selectedPhoto.category === cat
                            ? 'bg-[#9E3E26] text-white shadow-xs'
                            : 'bg-[#FAF7F2] hover:bg-[#E8E0D5] text-[#241D19]/80 border border-[#E8E0D5]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Product from Photo Modal */}
        <AddProductFromPhotoModal
          isOpen={isAddToCatalogOpen}
          onClose={() => {
            setIsAddToCatalogOpen(false);
            setPhotoForCatalog(null);
          }}
          preselectedPhoto={photoForCatalog}
        />

      </div>
    </section>
  );
};
