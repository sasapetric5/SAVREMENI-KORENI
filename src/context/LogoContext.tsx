import React, { createContext, useContext, useState, useEffect } from 'react';
const defaultLogo = '/images/luxury_brand_emblem_1789026455362.jpg';

interface LogoContextType {
  logoUrl: string;
  isCustom: boolean;
  uploadCustomLogo: (file: File) => Promise<boolean>;
  resetToDefault: () => void;
  openUploadModal: () => void;
  isUploadModalOpen: boolean;
  closeUploadModal: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

const STORAGE_KEY = 'savremeni_koreni_custom_logo_data';

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string>(defaultLogo);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if user uploaded a custom logo in browser
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.startsWith('data:image/')) {
        setLogoUrl(saved);
        setIsCustom(true);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const uploadCustomLogo = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          try {
            localStorage.setItem(STORAGE_KEY, result);
            setLogoUrl(result);
            setIsCustom(true);
            resolve(true);
          } catch {
            // In case of quota exceeded, at least update state for this session
            setLogoUrl(result);
            setIsCustom(true);
            resolve(true);
          }
        } else {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  };

  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setLogoUrl(defaultLogo);
    setIsCustom(false);
  };

  return (
    <LogoContext.Provider
      value={{
        logoUrl,
        isCustom,
        uploadCustomLogo,
        resetToDefault,
        openUploadModal: () => setIsUploadModalOpen(true),
        isUploadModalOpen,
        closeUploadModal: () => setIsUploadModalOpen(false),
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};
