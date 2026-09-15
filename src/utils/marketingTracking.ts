// Marketing & Analytics Tracking Engine (Google AdSense, Meta Pixel, Google Analytics)

export interface TrackingConfig {
  adsensePublisherId: string;
  adsenseEnabled: boolean;
  metaPixelId: string;
  metaPixelEnabled: boolean;
  googleAnalyticsId: string;
  googleAnalyticsEnabled: boolean;
}

export const DEFAULT_TRACKING_CONFIG: TrackingConfig = {
  adsensePublisherId: 'ca-pub-9428518924153029',
  adsenseEnabled: true,
  metaPixelId: '1048295192847192',
  metaPixelEnabled: true,
  googleAnalyticsId: 'G-SAVREMENIKORENI',
  googleAnalyticsEnabled: true,
};

export const getStoredTrackingConfig = (): TrackingConfig => {
  try {
    const saved = localStorage.getItem('koreni_marketing_tracking_config');
    if (saved) {
      return { ...DEFAULT_TRACKING_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Error reading tracking config", e);
  }
  return DEFAULT_TRACKING_CONFIG;
};

export const saveTrackingConfig = (config: TrackingConfig) => {
  try {
    localStorage.setItem('koreni_marketing_tracking_config', JSON.stringify(config));
    applyTrackingScripts(config);
  } catch (e) {
    console.error("Error saving tracking config", e);
  }
};

// Dynamically injects or updates Google AdSense and Meta Pixel into the DOM
export const applyTrackingScripts = (config: TrackingConfig = getStoredTrackingConfig()) => {
  if (typeof window === 'undefined') return;

  // 1. Google AdSense Injection
  const existingAdsense = document.getElementById('google-adsense-script');
  if (config.adsenseEnabled && config.adsensePublisherId) {
    const cleanPubId = config.adsensePublisherId.trim();
    if (!existingAdsense) {
      const script = document.createElement('script');
      script.id = 'google-adsense-script';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cleanPubId}`;
      document.head.appendChild(script);
    } else {
      existingAdsense.setAttribute('src', `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cleanPubId}`);
    }
  } else if (existingAdsense) {
    existingAdsense.remove();
  }

  // 2. Meta (Facebook) Pixel Injection
  const existingMeta = document.getElementById('meta-pixel-script');
  if (config.metaPixelEnabled && config.metaPixelId) {
    const pixelId = config.metaPixelId.trim();
    if (!existingMeta) {
      const script = document.createElement('script');
      script.id = 'meta-pixel-script';
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }
  } else if (existingMeta) {
    existingMeta.remove();
  }
};

// Meta Pixel Standard E-Commerce Events Helper
export const trackMetaEvent = (eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Lead', data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, data || {});
      console.log(`[Meta Pixel] Event tracked: ${eventName}`, data);
    } catch (e) {
      console.warn("Meta Pixel event error:", e);
    }
  }
};
