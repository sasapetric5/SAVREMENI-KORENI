import React, { useEffect, useState } from 'react';
import { getStoredTrackingConfig, TrackingConfig } from '../utils/marketingTracking';
import { DollarSign, Sparkles } from 'lucide-react';

export const GoogleAdSenseBanner: React.FC = () => {
  const [config, setConfig] = useState<TrackingConfig>(getStoredTrackingConfig());
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    setConfig(getStoredTrackingConfig());
  }, []);

  useEffect(() => {
    if (!config.adsenseEnabled) return;

    try {
      // Push to Google AdSense adsbygoogle array
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.error("AdSense banner load error:", e);
    }
  }, [config.adsenseEnabled]);

  if (!config.adsenseEnabled || !config.adsensePublisherId) {
    return null; // Don't render if disabled or missing publisher ID
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 sm:p-6 text-center space-y-3 shadow-sm relative overflow-hidden group">
        <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] text-stone-400 uppercase tracking-wider bg-stone-200/60 px-2 py-0.5 rounded font-mono">
          <span>Oglas / Advertisement</span>
        </div>

        {/* AdSense Responsive Banner Slot */}
        <div className="min-h-[100px] flex items-center justify-center py-2">
          <ins 
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={config.adsensePublisherId}
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        {/* Fallback visual indicator if AdSense script is in sandbox / placeholder mode */}
        {!adLoaded && (
          <div className="py-6 border border-dashed border-stone-300 rounded-xl bg-stone-50/50 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <DollarSign className="w-4 h-4 text-[#C2872A]" />
              <span>Google AdSense oglasni prostor (Publisher: {config.adsensePublisherId})</span>
            </div>
            <p className="text-[11px] text-stone-400 max-w-md">
              Ovaj prostor je rezervisan za automatske Google reklame. U produkciji se oglas automatski učitava sa vašeg AdSense naloga.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
