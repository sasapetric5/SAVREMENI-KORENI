import { Product } from '../types';
import { openAppDB } from './db';
import { triggerSitemapUpdate } from './sitemapNotification';

const STORE_NAME = 'custom_products';
const LOCAL_STORAGE_KEY = 'savremeni_koreni_custom_products_v1';

export async function loadCustomProductsFromStorage(): Promise<Product[]> {
  let localProducts: Product[] = [];
  try {
    const db = await openAppDB();
    localProducts = await new Promise<Product[]>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
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

  // Also check backend server if available
  try {
    const res = await fetch('/api/products/custom');
    if (res.ok) {
      const serverProducts = await res.json();
      if (Array.isArray(serverProducts) && serverProducts.length > 0) {
        // Merge without duplicates
        const map = new Map<string, Product>();
        serverProducts.forEach((p: Product) => map.set(p.id, p));
        localProducts.forEach((p) => map.set(p.id, p));
        return Array.from(map.values());
      }
    }
  } catch {
    // server might be offline or client SPA fallback
  }

  return localProducts;
}

export async function saveCustomProductsToStorage(products: Product[]): Promise<void> {
  try {
    const db = await openAppDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
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
  const current = await loadCustomProductsFromStorage();
  const filtered = current.filter(p => p.id !== productId);
  await saveCustomProductsToStorage(filtered);
}

