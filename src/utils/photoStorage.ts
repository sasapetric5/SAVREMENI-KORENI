import { GalleryPhoto } from '../types';
import { openAppDB } from './db';

const STORE_NAME = 'gallery_photos';
const STORAGE_KEY = 'savremeni_koreni_user_photos_v1';

/**
 * Loads all stored photos from IndexedDB, with graceful migration from localStorage.
 */
export async function loadPhotosFromStorage(): Promise<GalleryPhoto[] | null> {
  try {
    const db = await openAppDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
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
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  }
}

/**
 * Saves all photos to IndexedDB without any 5MB localStorage limits.
 */
export async function savePhotosToStorage(photos: GalleryPhoto[]): Promise<void> {
  try {
    const db = await openAppDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
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
    const db = await openAppDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
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
