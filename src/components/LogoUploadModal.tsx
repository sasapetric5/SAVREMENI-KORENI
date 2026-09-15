import React, { useState, useRef } from 'react';
import { X, Upload, Check, AlertCircle, Sparkles, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { useLogo } from '../context/LogoContext';
import { useLanguage } from '../context/LanguageContext';

export const LogoUploadModal: React.FC = () => {
  const { isUploadModalOpen, closeUploadModal, logoUrl, uploadCustomLogo, resetToDefault, isCustom } = useLogo();
  const { isEn } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleFile = async (file: File) => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!file.type.startsWith('image/')) {
      setErrorMsg(isEn ? 'Please select a valid image format (JPG, PNG, WEBP).' : 'Molimo izaberite važeći format slike (JPG, PNG, WEBP).');
      return;
    }
    const success = await uploadCustomLogo(file);
    if (success) {
      setSuccessMsg(isEn ? `Successfully uploaded new logo: "${file.name}"!` : `Uspešno postavljen novi logo: "${file.name}"!`);
      setTimeout(() => {
        closeUploadModal();
        setSuccessMsg('');
      }, 1500);
    } else {
      setErrorMsg(isEn ? 'An error occurred while uploading. Please try again.' : 'Došlo je do greške pri učitavanju slike. Pokušajte ponovo.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#1A1512] text-[#FAF7F2] border-2 border-[#C2872A] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C2872A]/20 flex items-center justify-center text-[#E8D0A9]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                {isEn ? 'Official Brand Emblem' : 'Zvanični Amblem Brenda'}
              </h3>
              <p className="text-xs text-[#E8D0A9]">
                {isEn ? 'Upload your custom high-res logo artwork' : 'Postavite Vaš originalni grafički fajl logotipa'}
              </p>
            </div>
          </div>
          <button
            onClick={closeUploadModal}
            className="p-2 bg-white/10 hover:bg-[#9E3E26] text-white rounded-full border border-white/20 transition-all cursor-pointer flex items-center justify-center group shrink-0"
            aria-label={isEn ? 'Close' : 'Zatvori'}
          >
            <X className="w-5 h-5 stroke-[2.5] transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Current Logo Preview */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-3 border-[#C2872A] shadow-xl bg-black">
              <img
                src={logoUrl}
                alt={isEn ? 'Current logo emblem' : 'Trenutni logotip'}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs text-[#E8D0A9] font-serif italic mt-3">
              {isCustom ? (isEn ? '✓ Custom uploaded logo active' : '✓ Aktivan Vaš učitani fajl logotipa') : (isEn ? 'Official workshop emblem' : 'Zvanični amblem radionice')}
            </span>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
              dragActive
                ? 'border-[#C2872A] bg-[#C2872A]/10'
                : 'border-white/20 hover:border-[#C2872A]/60 bg-white/5 hover:bg-white/10'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="w-12 h-12 rounded-full bg-[#C2872A]/20 flex items-center justify-center text-[#E8D0A9]">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {isEn ? <>Click here or drop <span className="text-[#E8D0A9]">luxury_black_gold_emblem.jpg</span></> : <>Kliknite ovde ili prevucite <span className="text-[#E8D0A9]">luxury_black_gold_emblem.jpg</span></>}
              </p>
              <p className="text-xs text-white/60 mt-1">
                {isEn ? 'Supported formats: JPG, PNG, WEBP (instantly updates across entire site)' : 'Podržani formati: JPG, PNG, WEBP (odmah se primenjuje na celom sajtu)'}
              </p>
            </div>
          </div>

          {/* Success / Error Messages */}
          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Reset button if custom */}
          {isCustom && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  resetToDefault();
                  setSuccessMsg(isEn ? 'Reset to default emblem.' : 'Vraćeno na standardni amblem.');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white underline cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isEn ? 'Reset to default emblem' : 'Vrati na podrazumevani amblem'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
          <span>{isEn ? 'Savremeni Koreni Workshop Jošanica' : 'Radionica „Savremeni Koreni“ Jošanica'}</span>
          <button
            onClick={closeUploadModal}
            className="px-4 py-1.5 rounded-lg bg-[#C2872A] hover:bg-[#D49A3D] text-[#1A1512] font-semibold transition-colors cursor-pointer"
          >
            {isEn ? 'Close' : 'Zatvori'}
          </button>
        </div>

      </div>
    </div>
  );
};
