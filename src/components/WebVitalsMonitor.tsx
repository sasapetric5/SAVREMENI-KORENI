import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Gauge, 
  Wifi, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Copy, 
  Check, 
  Zap, 
  Info,
  Clock,
  Layers,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';
import { 
  subscribeToWebVitals, 
  refreshVitalsBenchmark, 
  PerformanceDiagnostics,
  MetricRating
} from '../utils/webVitals';
import { useLanguage } from '../context/LanguageContext';

export const WebVitalsMonitor: React.FC = () => {
  const { isEn } = useLanguage();
  const [metrics, setMetrics] = useState<PerformanceDiagnostics | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'vitals' | 'waterfall' | 'resources'>('vitals');

  useEffect(() => {
    const unsubscribe = subscribeToWebVitals((data) => {
      setMetrics(data);
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshVitalsBenchmark();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const handleCopyReport = () => {
    if (!metrics) return;
    const reportText = `=== SAVREMENI KORENI - WEB VITALS & PERFORMANSE IZVEŠTAJ ===
Vreme: ${metrics.timestamp}
Status: ${metrics.healthStatus.toUpperCase()}

1. CORE WEB VITALS:
- TTFB (Odziv servera): ${metrics.ttfb.formatted}${metrics.ttfb.unit} [${metrics.ttfb.rating}]
- FCP (Prvi vizuelni sadržaj): ${metrics.fcp.formatted}${metrics.fcp.unit} [${metrics.fcp.rating}]
- LCP (Glavni sadržaj): ${metrics.lcp.formatted}${metrics.lcp.unit} [${metrics.lcp.rating}]
- CLS (Pomak rasporeda): ${metrics.cls.formatted} [${metrics.cls.rating}]
- INP / FID (Odziv interakcije): ${metrics.inp.formatted}${metrics.inp.unit} [${metrics.inp.rating}]

2. MREŽNA STATISTIKA & WATERFALL:
- DNS Lookup: ${metrics.navigation.dnsLookup} ms
- TCP Handshake: ${metrics.navigation.tcpHandshake} ms
- SSL/TLS: ${metrics.navigation.tlsNegotiation} ms
- TTFB Server: ${metrics.navigation.ttfb} ms
- DOM Parsing: ${metrics.navigation.domParsing} ms
- DOM Content Loaded: ${metrics.navigation.domContentLoaded} ms
- Window Load: ${metrics.navigation.windowLoad} ms

3. RESURSI:
- Ukupno preneto: ${metrics.resourceSummary.totalSizeKb} KB
- Skripte: ${metrics.resourceSummary.scriptCount}
- Slike: ${metrics.resourceSummary.imageCount}
- Stilovi (CSS): ${metrics.resourceSummary.cssCount}

Generisano u aplikaciji Savremeni Koreni.`;

    navigator.clipboard.writeText(reportText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!metrics) return null;

  const getRatingBadge = (rating: MetricRating['rating']) => {
    switch (rating) {
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            {isEn ? 'Good' : 'Optimalno'}
          </span>
        );
      case 'needs-improvement':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            {isEn ? 'Needs Work' : 'Prihvatljivo'}
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
            {isEn ? 'Poor' : 'Usporeno'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300">
            <Clock className="w-3 h-3 animate-spin text-gray-500" />
            {isEn ? 'Measuring...' : 'Merenje...'}
          </span>
        );
    }
  };

  const getMetricProgressWidth = (val: number, good: number, poor: number) => {
    const max = poor * 1.3;
    const pct = Math.min(100, Math.max(5, (val / max) * 100));
    return `${pct}%`;
  };

  const getMetricBarColor = (rating: MetricRating['rating']) => {
    switch (rating) {
      case 'good':
        return 'bg-emerald-500';
      case 'needs-improvement':
        return 'bg-amber-500';
      case 'poor':
        return 'bg-rose-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <section 
      id="performanse-web-vitals" 
      className="py-16 bg-[#F4EFE6] dark:bg-[#161210] border-t border-b border-[#E8E0D5] dark:border-zinc-800 transition-colors"
      aria-label="Web Vitals Performance Monitor"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8E0D5] dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#9E3E26]/10 text-[#9E3E26] dark:bg-[#9E3E26]/25 dark:text-[#E88A75] mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>W3C Web Vitals &amp; Navigation Timing Level 2 API</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#241D19] dark:text-white tracking-tight">
              {isEn ? 'Real-Time Web Performance & Speed Diagnostics' : 'Praćenje Performansi & Dijagnostika Učitavanja Sajta'}
            </h2>
            <p className="mt-2 text-sm text-[#66584F] dark:text-zinc-400 max-w-3xl leading-relaxed">
              {isEn
                ? 'Directly measures browser rendering latency, server response time (TTFB), Largest Contentful Paint (LCP), and layout stability in real time.'
                : 'Direktno merenje odziva servera (TTFB), brzine prikaza prvih i glavnih elemenata (FCP/LCP) i stabilnosti rasporeda (CLS) u Vašem pretraživaču.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-zinc-800 text-[#241D19] dark:text-white border border-[#E8E0D5] dark:border-zinc-700 shadow-sm hover:bg-[#FAF7F2] dark:hover:bg-zinc-700/80 transition-all cursor-pointer active:scale-95"
              title={isEn ? 'Refresh benchmarks' : 'Ponovo izmeri parametre'}
            >
              <RefreshCw className={`w-4 h-4 text-[#9E3E26] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isEn ? 'Re-Measure' : 'Osveži Merenja'}</span>
            </button>

            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#9E3E26] text-white shadow hover:bg-[#85321E] transition-all cursor-pointer active:scale-95"
              title={isEn ? 'Copy full diagnostic log' : 'Kopiraj kompletan dijagnostički izveštaj'}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (isEn ? 'Copied!' : 'Kopirano!') : (isEn ? 'Copy Report' : 'Kopiraj Izveštaj')}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Banner */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${metrics.healthStatus === 'optimal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400'}`}>
                  {metrics.healthStatus === 'optimal' ? <Zap className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#241D19] dark:text-white">
                    {isEn ? 'Diagnostic Status Analysis' : 'Automatska Dijagnostička Analiza'}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">
                    {isEn ? `Updated at ${metrics.timestamp}` : `Ažurirano u ${metrics.timestamp}`}
                  </span>
                </div>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${metrics.healthStatus === 'optimal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'}`}>
                {metrics.healthStatus === 'optimal' ? (isEn ? 'Optimal Speed' : 'Optimalna Brzina') : (isEn ? 'Warning Detected' : 'Uočeno Kašnjenje')}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {metrics.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-zinc-800/60 border border-[#E8E0D5]/70 dark:border-zinc-800">
                  <Info className="w-4 h-4 text-[#9E3E26] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#241D19] dark:text-white">
                      {isEn ? rec.titleEn : rec.titleSr}
                    </h4>
                    <p className="mt-0.5 text-xs text-[#66584F] dark:text-zinc-300 leading-relaxed">
                      {isEn ? rec.detailEn : rec.detailSr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network & Transfer Summary Box */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <Server className="w-4 h-4 text-[#9E3E26]" />
                <h3 className="text-sm sm:text-base font-bold text-[#241D19] dark:text-white">
                  {isEn ? 'Transfer & Network Info' : 'Mreža & Prenos Podataka'}
                </h3>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500 dark:text-zinc-400">{isEn ? 'Protocol' : 'Mrežni Protokol'}</span>
                  <span className="font-semibold text-[#241D19] dark:text-white font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {metrics.navigation.protocol.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500 dark:text-zinc-400">{isEn ? 'Total Transferred' : 'Ukupna Veličina'}</span>
                  <span className="font-semibold text-[#241D19] dark:text-white font-mono">
                    {metrics.resourceSummary.totalSizeKb > 0 ? `${metrics.resourceSummary.totalSizeKb} KB` : '< 500 KB (Cached)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500 dark:text-zinc-400">{isEn ? 'Loaded Assets' : 'Učitano Fajlova'}</span>
                  <span className="font-semibold text-[#241D19] dark:text-white font-mono">
                    {metrics.resourceSummary.totalResources} {isEn ? 'items' : 'resursa'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-gray-500 dark:text-zinc-400">{isEn ? 'Full Window Load' : 'Kompletno Učitano'}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                    {metrics.navigation.windowLoad > 0 ? `${metrics.navigation.windowLoad} ms` : `${metrics.navigation.domContentLoaded} ms`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-[#FAF7F2] dark:bg-zinc-800/50 text-[11px] text-gray-500 dark:text-zinc-400">
              {isEn 
                ? 'Tip: If Google AI Studio shows "Rate exceeded", Cloud Run is queueing initial container bursts. Wait 2-3 minutes to clear the rate cooldown.'
                : 'Savet: Ukoliko se pri deljenju pojavi "Rate exceeded", Cloud Run privremeno pauzira burst zahteve. Dovoljno je sačekati 2-3 minuta bez kliktanja.'}
            </div>
          </div>
        </div>

        {/* Tabs: Vitals vs Waterfall vs Resources */}
        <div className="mt-8">
          <div className="flex items-center gap-2 border-b border-[#E8E0D5] dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('vitals')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${activeTab === 'vitals' ? 'border-[#9E3E26] text-[#9E3E26] dark:text-[#E88A75]' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
            >
              <Gauge className="w-4 h-4" />
              <span>{isEn ? 'Core Web Vitals' : 'Osnovne Web Vitals Metrike'}</span>
            </button>
            <button
              onClick={() => setActiveTab('waterfall')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${activeTab === 'waterfall' ? 'border-[#9E3E26] text-[#9E3E26] dark:text-[#E88A75]' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
            >
              <Clock className="w-4 h-4" />
              <span>{isEn ? 'Navigation Timing Waterfall' : 'Vremenski Tok (Waterfall)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${activeTab === 'resources' ? 'border-[#9E3E26] text-[#9E3E26] dark:text-[#E88A75]' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
            >
              <Layers className="w-4 h-4" />
              <span>{isEn ? 'Resource Composition' : 'Struktura Resursa'}</span>
            </button>
          </div>

          {/* Tab 1: Core Web Vitals Cards */}
          {activeTab === 'vitals' && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* TTFB */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">TTFB</span>
                    {getRatingBadge(metrics.ttfb.rating)}
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold text-[#241D19] dark:text-white font-mono">
                      {metrics.ttfb.formatted} <span className="text-sm font-normal text-gray-500">{metrics.ttfb.unit}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#66584F] dark:text-zinc-400">
                      {isEn ? metrics.ttfb.descriptionEn : metrics.ttfb.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBarColor(metrics.ttfb.rating)}`} 
                      style={{ width: getMetricProgressWidth(metrics.ttfb.value, metrics.ttfb.thresholds.good, metrics.ttfb.thresholds.poor) }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>≤ 800ms</span>
                    <span>&gt; 1800ms</span>
                  </div>
                </div>
              </div>

              {/* FCP */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">FCP</span>
                    {getRatingBadge(metrics.fcp.rating)}
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold text-[#241D19] dark:text-white font-mono">
                      {metrics.fcp.formatted} <span className="text-sm font-normal text-gray-500">{metrics.fcp.unit}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#66584F] dark:text-zinc-400">
                      {isEn ? metrics.fcp.descriptionEn : metrics.fcp.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBarColor(metrics.fcp.rating)}`} 
                      style={{ width: getMetricProgressWidth(metrics.fcp.value, metrics.fcp.thresholds.good, metrics.fcp.thresholds.poor) }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>≤ 1.8s</span>
                    <span>&gt; 3.0s</span>
                  </div>
                </div>
              </div>

              {/* LCP */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">LCP</span>
                    {getRatingBadge(metrics.lcp.rating)}
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold text-[#241D19] dark:text-white font-mono">
                      {metrics.lcp.formatted} <span className="text-sm font-normal text-gray-500">{metrics.lcp.unit}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#66584F] dark:text-zinc-400">
                      {isEn ? metrics.lcp.descriptionEn : metrics.lcp.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBarColor(metrics.lcp.rating)}`} 
                      style={{ width: getMetricProgressWidth(metrics.lcp.value, metrics.lcp.thresholds.good, metrics.lcp.thresholds.poor) }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>≤ 2.5s</span>
                    <span>&gt; 4.0s</span>
                  </div>
                </div>
              </div>

              {/* CLS */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">CLS</span>
                    {getRatingBadge(metrics.cls.rating)}
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold text-[#241D19] dark:text-white font-mono">
                      {metrics.cls.formatted}
                    </div>
                    <p className="mt-1 text-xs text-[#66584F] dark:text-zinc-400">
                      {isEn ? metrics.cls.descriptionEn : metrics.cls.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBarColor(metrics.cls.rating)}`} 
                      style={{ width: `${Math.min(100, (metrics.cls.value / 0.3) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>≤ 0.10</span>
                    <span>&gt; 0.25</span>
                  </div>
                </div>
              </div>

              {/* INP / FID */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">INP / FID</span>
                    {getRatingBadge(metrics.inp.rating)}
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold text-[#241D19] dark:text-white font-mono">
                      {metrics.inp.formatted !== '--' ? metrics.inp.formatted : '< 50'} <span className="text-sm font-normal text-gray-500">ms</span>
                    </div>
                    <p className="mt-1 text-xs text-[#66584F] dark:text-zinc-400">
                      {isEn ? metrics.inp.descriptionEn : metrics.inp.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getMetricBarColor(metrics.inp.rating)}`} 
                      style={{ width: `${Math.min(100, Math.max(10, (metrics.inp.value / 500) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>≤ 200ms</span>
                    <span>&gt; 500ms</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Navigation Waterfall */}
          {activeTab === 'waterfall' && (
            <div className="mt-6 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm">
              <h3 className="text-base font-bold text-[#241D19] dark:text-white mb-4">
                {isEn ? 'Browser Request & Navigation Lifecycle' : 'Vremenski Tok Učitavanja Zahteva (Lifecycle)'}
              </h3>

              <div className="space-y-4">
                {/* DNS */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-zinc-300">1. DNS Lookup</span>
                    <span className="font-mono text-[#241D19] dark:text-white">{metrics.navigation.dnsLookup} ms</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(4, metrics.navigation.dnsLookup / 5))}%` }} />
                  </div>
                </div>

                {/* TCP + TLS */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-zinc-300">2. TCP Handshake + SSL/TLS</span>
                    <span className="font-mono text-[#241D19] dark:text-white">{metrics.navigation.tcpHandshake + metrics.navigation.tlsNegotiation} ms</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(4, (metrics.navigation.tcpHandshake + metrics.navigation.tlsNegotiation) / 5))}%` }} />
                  </div>
                </div>

                {/* TTFB */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-zinc-300">3. TTFB (Server Waiting Time)</span>
                    <span className="font-mono text-[#241D19] dark:text-white">{metrics.navigation.ttfb} ms</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(4, metrics.navigation.ttfb / 15))}%` }} />
                  </div>
                </div>

                {/* Response Download */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-zinc-300">4. HTML Content Download</span>
                    <span className="font-mono text-[#241D19] dark:text-white">{metrics.navigation.responseDownload} ms</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(4, metrics.navigation.responseDownload / 3))}%` }} />
                  </div>
                </div>

                {/* DOM Processing */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-zinc-300">5. DOM Interactive &amp; Parse</span>
                    <span className="font-mono text-[#241D19] dark:text-white">{metrics.navigation.domParsing} ms</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(4, metrics.navigation.domParsing / 15))}%` }} />
                  </div>
                </div>

                {/* Complete Page Load */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-zinc-300">6. Window Complete Load</span>
                    <span className="font-mono text-[#9E3E26] dark:text-[#E88A75] font-bold">{metrics.navigation.windowLoad} ms</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#9E3E26] h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Resource Breakdown */}
          {activeTab === 'resources' && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-zinc-400 uppercase font-semibold">JavaScript Skripte</span>
                  <div className="text-xl font-bold text-[#241D19] dark:text-white font-mono">
                    {metrics.resourceSummary.scriptCount} fajlova
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Tree-shaken &amp; Minified</span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-zinc-400 uppercase font-semibold">Slike &amp; Fotografije</span>
                  <div className="text-xl font-bold text-[#241D19] dark:text-white font-mono">
                    {metrics.resourceSummary.imageCount} slika
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Native Lazy Loading</span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-[#E8E0D5] dark:border-zinc-800 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-zinc-400 uppercase font-semibold">Stilovi &amp; Fontovi</span>
                  <div className="text-xl font-bold text-[#241D19] dark:text-white font-mono">
                    {metrics.resourceSummary.cssCount} CSS moduli
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Tailwind JIT Optimized</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
