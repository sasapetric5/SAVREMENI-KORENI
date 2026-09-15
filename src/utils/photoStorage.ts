import { GalleryPhoto } from '../types';
import { openAppDB } from './db';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, writeBatch } from 'firebase/firestore';

const STORE_NAME = 'gallery_photos';
const STORAGE_KEY = 'savremeni_koreni_user_photos_v1';

let isSynced = false;

// Helper to strip undefined values for Firestore
const sanitize = (obj: any) => {
  const cleaned: any = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) cleaned[k] = v;
  });
  return cleaned;
};

/**
 * Loads all stored photos from IndexedDB, with graceful migration from localStorage.
 */
export async function loadPhotosFromStorage(): Promise<GalleryPhoto[] | null> {
  try {
    const photosRef = collection(db, 'gallery_photos');
    const snapshot = await getDocs(photosRef);
    if (!snapshot.empty) {
      const firestorePhotos: GalleryPhoto[] = [];
      snapshot.forEach(doc => {
        firestorePhotos.push(doc.data() as GalleryPhoto);
      });
      isSynced = true;
      return firestorePhotos;
    }
  } catch (err) {
    console.error('Failed to load photos from Firestore:', err);
  }

  let localPhotos: GalleryPhoto[] | null = null;
  try {
    const appDb = await openAppDB();
    localPhotos = await new Promise((resolve) => {
      const transaction = appDb.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = request.result as GalleryPhoto[];
        if (Array.isArray(result) && result.length > 0) {
          // Clean up old bulky localStorage item to avoid any storage quota errors
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {
            // ignore
          }
          resolve(result);
        } else {
          // Check for legacy localStorage data to migrate
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed) && parsed.length > 0) {
                // Save to IndexedDB and clear localStorage
                savePhotosToStorage(parsed).catch(console.error);
                try {
                  localStorage.removeItem(STORAGE_KEY);
                } catch {
                  // ignore
                }
                resolve(parsed);
                return;
              }
            }
          } catch {
            // ignore
          }
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (err) {
    console.warn('Failed to load from IndexedDB, checking localStorage:', err);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localPhotos = parsed;
        }
      }
    } catch {
      // ignore
    }
  }

  if (localPhotos && localPhotos.length > 0 && !isSynced) {
    // Sync to Firestore in batches
    try {
      const CHUNK_SIZE = 200;
      for (let i = 0; i < localPhotos.length; i += CHUNK_SIZE) {
        const chunk = localPhotos.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);
        chunk.forEach(p => {
          batch.set(doc(db, 'gallery_photos', p.id), sanitize(p));
        });
        await batch.commit();
      }
      isSynced = true;
    } catch (err) {
      console.error('Failed to migrate local photos to Firestore:', err);
    }
  }

  return localPhotos;
}

/**
 * Saves all photos to IndexedDB without any 5MB localStorage limits.
 */
export async function savePhotosToStorage(photos: GalleryPhoto[]): Promise<void> {
  // Save all photos to Firestore
  try {
    const CHUNK_SIZE = 200;
    for (let i = 0; i < photos.length; i += CHUNK_SIZE) {
      const chunk = photos.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      chunk.forEach(p => {
        batch.set(doc(db, 'gallery_photos', p.id), sanitize(p));
      });
      await batch.commit();
    }
  } catch (err) {
    console.error('Failed to save to Firestore:', err);
  }

  try {
    const appDb = await openAppDB();
    return new Promise((resolve, reject) => {
      const transaction = appDb.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Clear existing records first to mirror current array state
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        if (photos.length === 0) {
          resolve();
          return;
        }

        let addedCount = 0;
        let hasError = false;

        photos.forEach((photo) => {
          const putRequest = store.put(photo);

          putRequest.onsuccess = () => {
            addedCount++;
            if (addedCount === photos.length && !hasError) {
              resolve();
            }
          };

          putRequest.onerror = (e) => {
            hasError = true;
            console.error('Error storing photo in IndexedDB:', e);
            reject(putRequest.error);
          };
        });
      };

      clearRequest.onerror = () => {
        reject(clearRequest.error);
      };
    });
  } catch (err) {
    console.error('IndexedDB save failed:', err);
    // As a safe fallback without crashing, try storing just metadata without huge base64 in localStorage if IDB completely fails
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

/**
 * Clears all stored photos from IndexedDB and localStorage.
 */
export async function clearAllStoredPhotos(): Promise<void> {
  try {
    const appDb = await openAppDB();
    const transaction = appDb.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
  } catch (e) {
    console.error('Failed to clear IndexedDB:', e);
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

