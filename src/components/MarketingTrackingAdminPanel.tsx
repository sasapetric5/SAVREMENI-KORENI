import React, { useState, useEffect } from 'react';
import { 
  BarChart3, CheckCircle2, ExternalLink, RefreshCw, 
  Copy, Check, Activity, DollarSign, Sparkles
} from 'lucide-react';
import { TrackingConfig, getStoredTrackingConfig, saveTrackingConfig, trackMetaEvent } from '../utils/marketingTracking';

export interface MarketingTrackingAdminPanelProps {
  showToast: (message: string) => void;
}

export const MarketingTrackingAdminPanel: React.FC<MarketingTrackingAdminPanelProps> = ({ showToast }) => {
  const [config, setConfig] = useState<TrackingConfig>(getStoredTrackingConfig());
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const [testEventSent, setTestEventSent] = useState<string | null>(null);

  useEffect(() => {
    setConfig(getStoredTrackingConfig());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveTrackingConfig(config);
    showToast("Podešavanja za Google AdSense i Meta Pixel su uspešno sačuvana i aktivirana! 🎯");
  };

  const handleSendTestMetaEvent = (eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'Purchase' | 'Lead') => {
    trackMetaEvent(eventName, {
      content_name: 'Homoljska Šubara & Tradicionalni Jelek',
      currency: 'RSD',
      value: 14500,
      test_source: 'Admin Panel Live Tester'
    });
    setTestEventSent(eventName);
    showToast(`Poslat test Meta Pixel događaj: "${eventName}"!`);
    setTimeout(() => setTestEventSent(null), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(label);
    showToast(`Kod za ${label} je kopiran u clipboard!`);
    setTimeout(() => setCopiedScript(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Header */}
      <div className="bg-[#241D19] border border-[#C2872A]/40 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif text-[#E8D0A9] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C2872A]" />
              Marketing, Monetizacija & Praćenje (Google AdSense & Meta Pixel)
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Unesite vaše identifikatore za Google AdSense (zarada od reklama) i Meta Pixel (Facebook & Instagram konverzije i remarketing).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Sistem Aktivan
            </span>
          </div>
        </div>

        {/* Main Settings Form */}
        <form onSubmit={handleSave} className="space-y-8 pt-2">
          {/* 1. GOOGLE ADSENSE SECTION */}
          <div className="bg-[#181310] border border-stone-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Google AdSense Integracija</span>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 uppercase font-mono">
                      Monetizacija
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400">Automatski prikaz reklama na sajtu (Auto Ads) i zarada po prikazu/kliku</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.adsenseEnabled}
                  onChange={(e) => setConfig({ ...config, adsenseEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C2872A]"></div>
                <span className="ml-2 text-xs font-medium text-stone-300">
                  {config.adsenseEnabled ? 'Uključeno' : 'Isključeno'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                  Google AdSense Publisher ID (ca-pub-XXXXXXXX) *
                </label>
                <input
                  type="text"
                  required={config.adsenseEnabled}
                  value={config.adsensePublisherId}
                  onChange={(e) => setConfig({ ...config, adsensePublisherId: e.target.value })}
                  placeholder="ca-pub-9428518924153029"
                  className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-col justify-end">
                <a
                  href="https://www.google.com/adsense"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-stone-700"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C2872A]" />
                  <span>Otvori Google AdSense Kontrolnu Tablu</span>
                </a>
              </div>
            </div>

            {/* AdSense Snippet Preview */}
            <div className="bg-[#121212] p-4 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-mono text-[11px]">Generisana AdSense Script oznaka u zaglavlju:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsensePublisherId}" crossorigin="anonymous"></script>`, 'AdSense')}
                  className="text-[#E8D0A9] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedScript === 'AdSense' ? 'Kopirano!' : 'Kopiraj Tag'}</span>
                </button>
              </div>
              <code className="block text-[11px] font-mono text-amber-200/90 break-all bg-black/40 p-2.5 rounded-lg">
                &lt;script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={config.adsensePublisherId || 'ca-pub-XXXXXXXX'}" crossorigin="anonymous"&gt;&lt;/script&gt;
              </code>
            </div>
          </div>

          {/* 2. META (FACEBOOK & INSTAGRAM) PIXEL SECTION */}
          <div className="bg-[#181310] border border-stone-800 rounded-2xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/30">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Meta (Facebook & Instagram) Pixel</span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 uppercase font-mono">
                      Remarketing & Ads
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400">Praćenje poseta, dodavanja u korpu i narudžbina za Instagram i Facebook reklame</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.metaPixelEnabled}
                  onChange={(e) => setConfig({ ...config, metaPixelEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C2872A]"></div>
                <span className="ml-2 text-xs font-medium text-stone-300">
                  {config.metaPixelEnabled ? 'Uključeno' : 'Isključeno'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                  Meta Pixel ID (15-16 cifara) *
                </label>
                <input
                  type="text"
                  required={config.metaPixelEnabled}
                  value={config.metaPixelId}
                  onChange={(e) => setConfig({ ...config, metaPixelId: e.target.value })}
                  placeholder="1048295192847192"
                  className="w-full bg-[#121212] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:border-[#C2872A] focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-col justify-end">
                <a
                  href="https://business.facebook.com/events_manager2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-stone-700"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C2872A]" />
                  <span>Otvori Meta Events Manager</span>
                </a>
              </div>
            </div>

            {/* Live Pixel Event Tester */}
            <div className="bg-[#121212] p-4 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E8D0A9] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2872A]" />
                  Direktan Test Događaja (Meta Pixel Event Simulator):
                </span>
                {testEventSent && (
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Poslat: {testEventSent}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSendTestMetaEvent('PageView')}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-mono transition-colors cursor-pointer border border-stone-700"
                >
                  track('PageView')
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTestMetaEvent('ViewContent')}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-mono transition-colors cursor-pointer border border-stone-700"
                >
                  track('ViewContent')
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTestMetaEvent('AddToCart')}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-mono transition-colors cursor-pointer border border-stone-700"
                >
                  track('AddToCart')
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTestMetaEvent('Purchase')}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-emerald-300 rounded-lg text-xs font-mono transition-colors cursor-pointer border border-emerald-900/60"
                >
                  track('Purchase')
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTestMetaEvent('Lead')}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-lg text-xs font-mono transition-colors cursor-pointer border border-amber-900/60"
                >
                  track('Lead')
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-[#C2872A] hover:bg-[#a87422] text-stone-950 font-bold text-xs rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sačuvaj & Aktiviraj Google AdSense & Meta Pixel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
