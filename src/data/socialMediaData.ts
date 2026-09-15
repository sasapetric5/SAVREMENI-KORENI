export interface SocialNetworkItem {
  id: string;
  name: string;
  accountName: string;
  handle: string;
  url: string;
  type: 'instagram' | 'facebook' | 'pinterest' | 'tiktok';
  description: string;
  badge: string;
  theme: {
    bgGradient: string;
    border: string;
    shadow: string;
    accentColor: string;
    textHover: string;
    iconBg: string;
  };
}

export const socialNetworksData: SocialNetworkItem[] = [
  {
    id: 'instagram-brand',
    name: 'Instagram (Kolekcija)',
    accountName: 'Savremeni Koreni',
    handle: '@savremenikoreni',
    url: 'https://www.instagram.com/savremenikoreni?utm_source=qr&stkn=YmJtcjd6a2xiOGc=',
    type: 'instagram',
    description: 'Zvanični profil brenda: unikatne torbice, šubare, nošnje i novi radovi.',
    badge: 'Zvanični Profil',
    theme: {
      bgGradient: 'from-[#FAF2EB] via-white to-[#FDF4EE]',
      border: 'border-[#F1D2C4] hover:border-[#E1306C]',
      shadow: 'shadow-[0_10px_25px_rgba(225,48,108,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_16px_35px_rgba(225,48,108,0.22)]',
      accentColor: 'text-[#E1306C]',
      textHover: 'group-hover:text-[#E1306C]',
      iconBg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white',
    },
  },
  {
    id: 'instagram-tanja',
    name: 'Instagram (Atelje)',
    accountName: 'Tanja Petrić',
    handle: '@tanja.petric_',
    url: 'https://www.instagram.com/tanja.petric_?utm_source=qr&stkn=M25iaXozbXAyMDVs',
    type: 'instagram',
    description: 'Lični profil majstora: proces izrade u Jošanici, Homolje i tradicija.',
    badge: 'Atelje & Radionica',
    theme: {
      bgGradient: 'from-[#FAF3F0] via-white to-[#F9EFEA]',
      border: 'border-[#E9C7BA] hover:border-[#C13584]',
      shadow: 'shadow-[0_10px_25px_rgba(193,53,132,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_16px_35px_rgba(193,53,132,0.22)]',
      accentColor: 'text-[#C13584]',
      textHover: 'group-hover:text-[#C13584]',
      iconBg: 'bg-gradient-to-tr from-[#FD1D1D] via-[#C13584] to-[#405DE6] text-white',
    },
  },
  {
    id: 'facebook',
    name: 'Facebook Zajednica',
    accountName: 'Savremeni Koreni',
    handle: 'Savremeni Koreni Jošanica',
    url: 'https://www.facebook.com/share/1CFPeuE1Zf/',
    type: 'facebook',
    description: 'Zajednica folklora, etno stvaralaštva, novosti i preporuke kupaca.',
    badge: 'Etno Zajednica',
    theme: {
      bgGradient: 'from-[#F0F4FA] via-white to-[#EDF2F9]',
      border: 'border-[#CAD7EA] hover:border-[#1877F2]',
      shadow: 'shadow-[0_10px_25px_rgba(24,119,242,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_16px_35px_rgba(24,119,242,0.22)]',
      accentColor: 'text-[#1877F2]',
      textHover: 'group-hover:text-[#1877F2]',
      iconBg: 'bg-[#1877F2] text-white',
    },
  },
  {
    id: 'pinterest',
    name: 'Pinterest Tabla',
    accountName: 'Savremeni Koreni',
    handle: 'savremenikoreni',
    url: 'https://pin.it/68KvVdZrn',
    type: 'pinterest',
    description: 'Inspirativne table: šabloni tradicionalnog veza, makrame čvorovi i stil.',
    badge: 'Ideje & Šabloni',
    theme: {
      bgGradient: 'from-[#FAF0F0] via-white to-[#F9EAEA]',
      border: 'border-[#F1CDCD] hover:border-[#E60023]',
      shadow: 'shadow-[0_10px_25px_rgba(230,0,35,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_16px_35px_rgba(230,0,35,0.22)]',
      accentColor: 'text-[#E60023]',
      textHover: 'group-hover:text-[#E60023]',
      iconBg: 'bg-[#E60023] text-white',
    },
  },
  {
    id: 'tiktok',
    name: 'TikTok Video Snimci',
    accountName: 'Tanja Petrić',
    handle: '@tanja53c',
    url: 'https://www.tiktok.com/@tanja53c?_r=1&_t=ZS-99c3mi02PNh',
    type: 'tiktok',
    description: 'Kratki video snimci zanata: kako heklamo šubaru, pletemo čarape i vezemo.',
    badge: 'Video Zanat ASMR',
    theme: {
      bgGradient: 'from-[#F5F5F7] via-white to-[#EFEFEF]',
      border: 'border-[#D4D4D8] hover:border-[#000000]',
      shadow: 'shadow-[0_10px_25px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.22)]',
      accentColor: 'text-[#18181B]',
      textHover: 'group-hover:text-black',
      iconBg: 'bg-[#000000] text-white shadow-inner',
    },
  },
];
