/**
 * Google Analytics 4 (GA4) & Google Tag Manager (GTM) Safe Integration Module
 * Supports runtime injection via VITE_GA_MEASUREMENT_ID and VITE_GTM_ID environment variables,
 * as well as window-level overrides.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    GA_MEASUREMENT_ID?: string;
    GTM_ID?: string;
  }
}

// Get configured IDs with fallbacks
export const getGaMeasurementId = (): string => {
  return (
    import.meta.env.VITE_GA_MEASUREMENT_ID ||
    (typeof window !== 'undefined' ? window.GA_MEASUREMENT_ID : '') ||
    ''
  ).trim();
};

export const getGtmId = (): string => {
  return (
    import.meta.env.VITE_GTM_ID ||
    (typeof window !== 'undefined' ? window.GTM_ID : '') ||
    ''
  ).trim();
};

let isInitialized = false;

/**
 * Initialize Google Analytics (GA4) & Google Tag Manager safely.
 * Only injects scripts if valid IDs are present, preventing console errors and tracking issues.
 */
export const initAnalytics = (): void => {
  if (typeof window === 'undefined' || isInitialized) return;

  const gaId = getGaMeasurementId();
  const gtmId = getGtmId();

  // Initialize dataLayer regardless to queue any tracking events safely
  window.dataLayer = window.dataLayer || [];
  
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
  }

  // 1. Initialize Google Tag Manager if GTM_ID is provided
  if (gtmId && !document.getElementById('gtm-script')) {
    try {
      const gtmScript = document.createElement('script');
      gtmScript.id = 'gtm-script';
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      document.head.appendChild(gtmScript);
      
      // Push initial gtm.start event
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      console.info(`[Analytics] Google Tag Manager initialized with ID: ${gtmId}`);
    } catch (e) {
      console.warn('[Analytics] Failed to initialize GTM script:', e);
    }
  }

  // 2. Initialize Google Analytics 4 if GA_MEASUREMENT_ID is provided
  if (gaId && !document.getElementById('ga4-script')) {
    try {
      const gaScript = document.createElement('script');
      gaScript.id = 'ga4-script';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(gaScript);

      window.gtag('config', gaId, {
        send_page_view: true,
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
      console.info(`[Analytics] Google Analytics 4 (GA4) initialized with ID: ${gaId}`);
    } catch (e) {
      console.warn('[Analytics] Failed to initialize GA4 script:', e);
    }
  }

  isInitialized = true;
};

/**
 * Track custom event in GA4 and dataLayer
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}): void => {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    ...params,
    timestamp: new Date().toISOString(),
    page_location: window.location.href,
  };

  // Push to dataLayer (for GTM)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }

  // Send via gtag (for GA4 directly)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventPayload);
  }

  if (import.meta.env.DEV) {
    console.debug(`[Analytics Event] ${eventName}:`, eventPayload);
  }
};

/**
 * Track user viewing a main website section
 */
export const trackSectionView = (sectionId: string, sectionTitle?: string): void => {
  trackEvent('section_view', {
    section_id: sectionId,
    section_title: sectionTitle || sectionId,
  });
};

/**
 * Track product interaction / modal view
 */
export const trackProductView = (productId: string, productName: string, price?: number, category?: string): void => {
  trackEvent('view_item', {
    item_id: productId,
    item_name: productName,
    price: price,
    item_category: category,
  });
};

/**
 * Track blog post guide reading
 */
export const trackBlogPostView = (postId: string, postTitle: string, category?: string): void => {
  trackEvent('blog_article_view', {
    article_id: postId,
    article_title: postTitle,
    article_category: category,
  });
};

/**
 * Track conversion events (Inquiry form, Phone call, WhatsApp click)
 */
export const trackConversion = (
  type: 'order_inquiry_open' | 'order_inquiry_sent' | 'whatsapp_click' | 'phone_call' | 'social_link_click' | 'order_tracking_search',
  details?: Record<string, any>
): void => {
  trackEvent('conversion_action', {
    conversion_type: type,
    ...details,
  });
};
