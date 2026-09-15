const DB_NAME = 'savremeni_koreni_db';
const DB_VERSION = 2;

export function openAppDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('gallery_photos')) {
        db.createObjectStore('gallery_photos', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('custom_products')) {
        db.createObjectStore('custom_products', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
