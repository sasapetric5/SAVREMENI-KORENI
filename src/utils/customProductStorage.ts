import { Product } from '../types';
import { openAppDB } from './db';
import { triggerSitemapUpdate } from './sitemapNotification';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const STORE_NAME = 'custom_products';
const LOCAL_STORAGE_KEY = 'savremeni_koreni_custom_products_v1';

let isSynced = false;

export async function loadCustomProductsFromStorage(): Promise<Product[]> {
  try {
    const productsRef = collection(db, 'custom_products');
    const snapshot = await getDocs(productsRef);
    if (!snapshot.empty) {
      const firestoreProducts: Product[] = [];
      snapshot.forEach(doc => {
        firestoreProducts.push(doc.data() as Product);
      });
      isSynced = true;
      return firestoreProducts;
    }
  } catch (err) {
    console.error('Failed to load products from Firestore:', err);
  }

  // Fallback to local storage (and migrate to Firestore if this is the first load)
  let localProducts: Product[] = [];
  try {
    const appDb = await openAppDB();
    localProducts = await new Promise<Product[]>((resolve) => {
      const transaction = appDb.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = request.result as Product[];
        resolve(Array.isArray(result) ? result : []);
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  } catch (err) {
    console.warn('Failed to load custom products from IndexedDB:', err);
  }

  if (localProducts.length === 0) {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localProducts = parsed;
        }
      }
    } catch {
      // ignore
    }
  }

  if (localProducts.length > 0 && !isSynced) {
    // Migrate local products to Firestore
    try {
      await Promise.all(localProducts.map(p => setDoc(doc(db, 'custom_products', p.id), p)));
      isSynced = true;
    } catch (err) {
      console.error('Failed to migrate local products to Firestore:', err);
    }
  }

  return localProducts;
}

export async function saveCustomProductsToStorage(products: Product[]): Promise<void> {
  // We'll rely on saveCustomProduct and deleteCustomProduct to sync individual changes to Firestore.
  // This is used to replace everything, so we sync all to local DB, and in Firestore we might need to batch, but for now let's just write to local IDB as backup.
  try {
    const appDb = await openAppDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = appDb.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const clearReq = store.clear();

      clearReq.onsuccess = () => {
        if (products.length === 0) {
          resolve();
          return;
        }

        let count = 0;
        let hasError = false;

        products.forEach((prod) => {
          const putReq = store.put(prod);
          putReq.onsuccess = () => {
            count++;
            if (count === products.length && !hasError) {
              resolve();
            }
          };
          putReq.onerror = () => {
            hasError = true;
            reject(putReq.error);
          };
        });
      };

      clearReq.onerror = () => {
        reject(clearReq.error);
      };
    });
  } catch (err) {
    console.error('Failed to save custom products in IDB:', err);
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore
  }

  // Trigger backend sitemap regeneration with the updated products
  try {
    triggerSitemapUpdate({ customProducts: products });
  } catch (err) {
    console.warn('Could not trigger sitemap update:', err);
  }
}

export async function getCustomProducts(): Promise<Product[]> {
  return loadCustomProductsFromStorage();
}

export async function saveCustomProduct(product: Product): Promise<void> {
  // Save to Firestore
  try {
    await setDoc(doc(db, 'custom_products', product.id), product);
  } catch (err) {
    console.error('Failed to save to Firestore:', err);
  }

  const current = await loadCustomProductsFromStorage();
  const existingIndex = current.findIndex(p => p.id === product.id);
  let updated: Product[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = product;
  } else {
    updated = [product, ...current];
  }
  await saveCustomProductsToStorage(updated);
}

export async function deleteCustomProduct(productId: string): Promise<void> {
  // Delete from Firestore
  try {
    await deleteDoc(doc(db, 'custom_products', productId));
  } catch (err) {
    console.error('Failed to delete from Firestore:', err);
  }

  const current = await loadCustomProductsFromStorage();
  const filtered = current.filter(p => p.id !== productId);
  await saveCustomProductsToStorage(filtered);
}


