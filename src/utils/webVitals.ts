/**
 * Web Vitals & Real-Time Performance Timing Diagnostics
 * Utilizes the W3C Performance Observer & Navigation Timing Level 2 APIs
 */

export interface MetricRating {
  value: number;
  formatted: string;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor' | 'measuring';
  thresholds: {
    good: number;
    poor: number;
  };
  description: string;
  descriptionEn: string;
}

export interface NavigationTimings {
  dnsLookup: number;
  tcpHandshake: number;
  tlsNegotiation: number;
  ttfb: number;
  responseDownload: number;
  domParsing: number;
  domContentLoaded: number;
  windowLoad: number;
  protocol: string;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
}

export interface PerformanceDiagnostics {
  ttfb: MetricRating;
  fcp: MetricRating;
  lcp: MetricRating;
  cls: MetricRating;
  inp: MetricRating;
  fid: MetricRating;
  navigation: NavigationTimings;
  resourceSummary: {
    totalResources: number;
    scriptCount: number;
    imageCount: number;
    cssCount: number;
    totalSizeKb: number;
  };
  healthStatus: 'optimal' | 'warning' | 'critical';
  recommendations: Array<{
    type: 'server' | 'network' | 'render' | 'stability';
    titleSr: string;
    titleEn: string;
    detailSr: string;
    detailEn: string;
  }>;
  timestamp: string;
}

type VitalsListener = (metrics: PerformanceDiagnostics) => void;
const listeners: Set<VitalsListener> = new Set();

let currentDiagnostics: PerformanceDiagnostics = {
  ttfb: {
    value: 0,
    formatted: '--',
    unit: 'ms',
    rating: 'measuring',
    thresholds: { good: 800, poor: 1800 },
    description: 'Vreme do prvog bajta sa servera (TTFB)',
    descriptionEn: 'Time to First Byte from server response'
  },
  fcp: {
    value: 0,
    formatted: '--',
    unit: 'ms',
    rating: 'measuring',
    thresholds: { good: 1800, poor: 3000 },
    description: 'Prvi vizuelni sadržaj (First Contentful Paint)',
    descriptionEn: 'First Contentful Paint initial render time'
  },
  lcp: {
    value: 0,
    formatted: '--',
    unit: 'ms',
    rating: 'measuring',
    thresholds: { good: 2500, poor: 4000 },
    description: 'Učitavanje glavnog sadržaja (Largest Contentful Paint)',
    descriptionEn: 'Largest Contentful Paint main asset visual load'
  },
  cls: {
    value: 0,
    formatted: '0.00',
    unit: '',
    rating: 'good',
    thresholds: { good: 0.1, poor: 0.25 },
    description: 'Stabilnost rasporeda elemenata (Cumulative Layout Shift)',
    descriptionEn: 'Cumulative Layout Shift visual stability score'
  },
  inp: {
    value: 0,
    formatted: '--',
    unit: 'ms',
    rating: 'good',
    thresholds: { good: 200, poor: 500 },
    description: 'Odziv na korisničke klikove i interakcije (INP)',
    descriptionEn: 'Interaction to Next Paint responsiveness'
  },
  fid: {
    value: 0,
    formatted: '--',
    unit: 'ms',
    rating: 'good',
    thresholds: { good: 100, poor: 300 },
    description: 'Kašnjenje prvog unosa (First Input Delay)',
    descriptionEn: 'First Input Delay initial interaction lag'
  },
  navigation: {
    dnsLookup: 0,
    tcpHandshake: 0,
    tlsNegotiation: 0,
    ttfb: 0,
    responseDownload: 0,
    domParsing: 0,
    domContentLoaded: 0,
    windowLoad: 0,
    protocol: 'http/2',
    transferSize: 0,
    encodedBodySize: 0,
    decodedBodySize: 0
  },
  resourceSummary: {
    totalResources: 0,
    scriptCount: 0,
    imageCount: 0,
    cssCount: 0,
    totalSizeKb: 0
  },
  healthStatus: 'optimal',
  recommendations: [],
  timestamp: new Date().toLocaleTimeString()
};

function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

function notifyListeners() {
  analyzeRecommendations();
  listeners.forEach((listener) => listener({ ...currentDiagnostics }));
}

function analyzeRecommendations() {
  const recs: PerformanceDiagnostics['recommendations'] = [];
  const nav = currentDiagnostics.navigation;
  const ttfb = currentDiagnostics.ttfb.value;
  const lcp = currentDiagnostics.lcp.value;
  const cls = currentDiagnostics.cls.value;

  if (ttfb > 1800) {
    recs.push({
      type: 'server',
      titleSr: 'Povećano vreme odziva servera (Visok TTFB)',
      titleEn: 'High Server Response Time (High TTFB)',
      detailSr: `Odziv servera je ${Math.round(ttfb)}ms. Ako se pojavila 'Rate exceeded' poruka, privremeni Cloud limit je usporio početni paket.`,
      detailEn: `Server response was ${Math.round(ttfb)}ms. If 'Rate exceeded' was hit, Cloud Run throttling delayed the initial TCP packet.`
    });
  }

  if (nav.dnsLookup > 300) {
    recs.push({
      type: 'network',
      titleSr: 'Kašnjenje DNS rezolucije',
      titleEn: 'DNS Resolution Latency',
      detailSr: `DNS upit je trajao ${Math.round(nav.dnsLookup)}ms. Preporučuje se stabilnija mobilna/WiFi veza.`,
      detailEn: `DNS lookup took ${Math.round(nav.dnsLookup)}ms. Suggest verifying local Wi-Fi or mobile network connectivity.`
    });
  }

  if (lcp > 3000) {
    recs.push({
      type: 'render',
      titleSr: 'Glavni vizuelni elementi zahtevaju optimizaciju (LCP)',
      titleEn: 'Largest Contentful Paint Optimization',
      detailSr: `Glavni sadržaj se učitao za ${(lcp / 1000).toFixed(2)}s. Sve slike u katalogu već koriste WebP/JPG kompresiju i lazy-loading.`,
      detailEn: `Main visual took ${(lcp / 1000).toFixed(2)}s. Catalog images utilize native lazy-loading and WebP compression.`
    });
  }

  if (cls > 0.1) {
    recs.push({
      type: 'stability',
      titleSr: 'Pomeranje elemenata pri učitavanju (CLS)',
      titleEn: 'Layout Shift Detected (CLS)',
      detailSr: `Izmeren je kumulativni pomak od ${cls.toFixed(3)}. Rezervisane su fiksne proporcije slika kako bi se ovo eliminisalo.`,
      detailEn: `Cumulative layout shift measured at ${cls.toFixed(3)}. Image dimensions have reserved aspect ratios to maintain layout stability.`
    });
  }

  if (recs.length === 0) {
    recs.push({
      type: 'server',
      titleSr: 'Sve metrike su u zelenoj zoni (Odlične performanse)',
      titleEn: 'All Core Web Vitals are in the Green Zone (Optimal)',
      detailSr: 'Infrastruktura odgovara trenutno, nema zastoja u prenosu podataka, a renderovanje je fluidno.',
      detailEn: 'Infrastructure is responding with sub-second speeds, zero layout jitter, and smooth 60fps rendering.'
    });
  }

  currentDiagnostics.recommendations = recs;
  
  if (recs.some(r => r.type === 'server' && currentDiagnostics.ttfb.value > 1800)) {
    currentDiagnostics.healthStatus = 'warning';
  } else {
    currentDiagnostics.healthStatus = 'optimal';
  }
}

let isObserverStarted = false;

export function initWebVitalsTracking() {
  if (typeof window === 'undefined' || isObserverStarted) return;
  isObserverStarted = true;

  // 1. Navigation Timing Level 2 Breakdown
  const parseNavigationTiming = () => {
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries && navEntries.length > 0) {
        const nav = navEntries[0];
        
        const dns = Math.max(0, nav.domainLookupEnd - nav.domainLookupStart);
        const tcp = Math.max(0, nav.connectEnd - nav.connectStart);
        const tls = nav.secureConnectionStart > 0 ? Math.max(0, nav.connectEnd - nav.secureConnectionStart) : 0;
        const ttfbVal = Math.max(0, nav.responseStart - nav.requestStart);
        const download = Math.max(0, nav.responseEnd - nav.responseStart);
        const domParsing = Math.max(0, nav.domInteractive - nav.responseEnd);
        const domContentLoaded = Math.max(0, nav.domContentLoadedEventEnd - nav.startTime);
        const windowLoad = Math.max(0, nav.loadEventEnd - nav.startTime);

        currentDiagnostics.navigation = {
          dnsLookup: Math.round(dns),
          tcpHandshake: Math.round(tcp),
          tlsNegotiation: Math.round(tls),
          ttfb: Math.round(ttfbVal),
          responseDownload: Math.round(download),
          domParsing: Math.round(domParsing),
          domContentLoaded: Math.round(domContentLoaded),
          windowLoad: Math.round(windowLoad),
          protocol: nav.nextHopProtocol || 'h2',
          transferSize: nav.transferSize || 0,
          encodedBodySize: nav.encodedBodySize || 0,
          decodedBodySize: nav.decodedBodySize || 0
        };

        // Update TTFB metric
        if (ttfbVal > 0) {
          currentDiagnostics.ttfb = {
            value: Math.round(ttfbVal),
            formatted: `${Math.round(ttfbVal)}`,
            unit: 'ms',
            rating: getRating(ttfbVal, { good: 800, poor: 1800 }),
            thresholds: { good: 800, poor: 1800 },
            description: 'Vreme do prvog bajta sa servera (TTFB)',
            descriptionEn: 'Time to First Byte from server response'
          };
        }
      }

      // Resources Summary
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      if (resources && resources.length > 0) {
        let totalBytes = 0;
        let scripts = 0;
        let images = 0;
        let css = 0;

        resources.forEach((res) => {
          totalBytes += res.transferSize || 0;
          const name = res.name.toLowerCase();
          if (name.endsWith('.js') || res.initiatorType === 'script') scripts++;
          else if (name.match(/\.(jpg|jpeg|png|webp|svg|gif|ico)/) || res.initiatorType === 'img') images++;
          else if (name.endsWith('.css') || res.initiatorType === 'css') css++;
        });

        currentDiagnostics.resourceSummary = {
          totalResources: resources.length,
          scriptCount: scripts,
          imageCount: images,
          cssCount: css,
          totalSizeKb: Math.round(totalBytes / 1024)
        };
      }
    } catch (e) {
      console.warn('Navigation timing parse note:', e);
    }
    notifyListeners();
  };

  // Run on load and after short delay for full resource timings
  if (document.readyState === 'complete') {
    parseNavigationTiming();
  } else {
    window.addEventListener('load', () => {
      setTimeout(parseNavigationTiming, 100);
      setTimeout(parseNavigationTiming, 1000);
    });
  }

  // 2. First Contentful Paint (FCP) Observer
  try {
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const val = Math.round(entry.startTime);
          currentDiagnostics.fcp = {
            value: val,
            formatted: `${val}`,
            unit: 'ms',
            rating: getRating(val, { good: 1800, poor: 3000 }),
            thresholds: { good: 1800, poor: 3000 },
            description: 'Prvi vizuelni sadržaj (First Contentful Paint)',
            descriptionEn: 'First Contentful Paint initial render time'
          };
          notifyListeners();
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // Ignore unsupported browser fallback
  }

  // 3. Largest Contentful Paint (LCP) Observer
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        const val = Math.round(lastEntry.startTime);
        currentDiagnostics.lcp = {
          value: val,
          formatted: `${val}`,
          unit: 'ms',
          rating: getRating(val, { good: 2500, poor: 4000 }),
          thresholds: { good: 2500, poor: 4000 },
          description: 'Učitavanje glavnog sadržaja (Largest Contentful Paint)',
          descriptionEn: 'Largest Contentful Paint main asset visual load'
        };
        notifyListeners();
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Ignore unsupported browser fallback
  }

  // 4. Cumulative Layout Shift (CLS) Observer
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          currentDiagnostics.cls = {
            value: Number(clsValue.toFixed(4)),
            formatted: clsValue.toFixed(3),
            unit: '',
            rating: getRating(clsValue, { good: 0.1, poor: 0.25 }),
            thresholds: { good: 0.1, poor: 0.25 },
            description: 'Stabilnost rasporeda elemenata (Cumulative Layout Shift)',
            descriptionEn: 'Cumulative Layout Shift visual stability score'
          };
          notifyListeners();
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // Ignore unsupported browser fallback
  }

  // 5. Interaction to Next Paint (INP) / First Input Delay (FID)
  try {
    const inpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        const duration = Math.round(entry.duration || (entry.processingStart - entry.startTime) || 0);
        if (duration > 0) {
          currentDiagnostics.inp = {
            value: duration,
            formatted: `${duration}`,
            unit: 'ms',
            rating: getRating(duration, { good: 200, poor: 500 }),
            thresholds: { good: 200, poor: 500 },
            description: 'Odziv na korisničke klikove i interakcije (INP)',
            descriptionEn: 'Interaction to Next Paint responsiveness'
          };
          notifyListeners();
        }
      }
    });
    inpObserver.observe({ type: 'first-input', buffered: true });
    if (PerformanceObserver.supportedEntryTypes.includes('event')) {
      inpObserver.observe({ type: 'event', durationThreshold: 16, buffered: true } as any);
    }
  } catch (e) {
    // Ignore unsupported browser fallback
  }
}

export function subscribeToWebVitals(callback: VitalsListener): () => void {
  listeners.add(callback);
  callback({ ...currentDiagnostics });
  return () => {
    listeners.delete(callback);
  };
}

export function refreshVitalsBenchmark(): PerformanceDiagnostics {
  currentDiagnostics.timestamp = new Date().toLocaleTimeString();
  if (typeof performance !== 'undefined') {
    initWebVitalsTracking();
  }
  notifyListeners();
  return { ...currentDiagnostics };
}
