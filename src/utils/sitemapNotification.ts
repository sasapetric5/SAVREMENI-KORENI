import { Product } from '../types';

/**
 * Triggers backend sitemap regeneration whenever a product is added, updated, or removed,
 * or when a new blog post is published.
 */
export async function triggerSitemapUpdate(options?: {
  customProducts?: Product[];
  extraBlogSlugs?: string[];
}): Promise<{ success: boolean; urlCount?: number; imageCount?: number }> {
  try {
    const res = await fetch('/api/sitemap/regenerate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options || {})
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Dynamic sitemap regenerated:', data);
      return data;
    }
  } catch (err) {
    console.warn('Could not trigger sitemap update via API:', err);
  }
  return { success: false };
}

/**
 * Persists a custom product to the server API and updates sitemap
 */
export async function syncProductToServer(product: Product): Promise<void> {
  try {
    await fetch('/api/products/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } catch (err) {
    console.warn('Could not sync product to server:', err);
  }
}
