export interface CompanyInfo {
  legalName: string;
  shortName: string;
  brandName: string;
  owner: string;
  pib: string;
  maticniBroj: string;
  activityCode: string;
  activityName: string;
  address: {
    street: string;
    number: string;
    postalCode: string;
    city: string;
    municipality: string;
    country: string;
  };
  phone: string;
  phoneFormatted: string;
  email: string;
  establishedDate: string;
  workingHours: string;
  shippingPartner: string;
  status: string;
  associations: string[];
}

export type ProductCategory = 
  | 'sve'
  | 'torbice'
  | 'subare'
  | 'carape'
  | 'kosulje'
  | 'nakit'
  | 'dom-pokloni';

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  category: ProductCategory;
  priceRsd: number;
  priceEur?: number;
  description: string;
  descriptionEn?: string;
  longDescription?: string;
  longDescriptionEn?: string;
  craftTechniques: string[];
  craftTechniquesEn?: string[];
  materials: string[];
  materialsEn?: string[];
  dimensions?: string;
  image: string;
  images?: string[];
  inStock: boolean;
  leadTimeDays: number;
  featured?: boolean;
  badge?: string;
  badgeEn?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  imageUrl: string;
  caption?: string;
  captionEn?: string;
  isCustomUploaded?: boolean;
  dateAdded?: string;
}

export interface OrderInquiry {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  productName: string;
  customRequirements?: string;
  preferredContactMethod: 'telefon' | 'whatsapp' | 'viber' | 'email';
  paymentMethod?: 'kartica' | 'pouzece' | 'racun' | 'paypal';
  cardDetails?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    cardBrand?: string;
  };
}

export type BlogCategory = 
  | 'vez' 
  | 'vrste-veza' 
  | 'narodna-nosnja' 
  | 'nosnja'
  | 'heklanje' 
  | 'rucno-cvorovanje' 
  | 'pletenje' 
  | 'vuna'
  | 'subare' 
  | 'torbe-torbice'
  | 'torbe'
  | 'zanati'
  | 'tradicija'
  | 'materijali-pribor'
  | 'makrame-tehnike'
  | 'pamucne-trake'
  | 'etno-vodic';

export interface BlogFAQ {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
}

export interface BlogPostSection {
  id?: string;
  heading?: string;
  headingEn?: string;
  paragraphs?: string[];
  paragraphsEn?: string[];
  quote?: {
    text: string;
    textEn?: string;
    caption?: string;
    captionEn?: string;
  };
  keyTakeaway?: string;
  keyTakeawayEn?: string;
  bulletPoints?: string[];
  bulletPointsEn?: string[];
  image?: string;
  imageCaption?: string;
  imageCaptionEn?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  excerpt: string;
  excerptEn?: string;
  author: string;
  authorRole: string;
  authorRoleEn?: string;
  publishDate: string;
  publishDateEn?: string;
  readingTime: string;
  readingTimeEn?: string;
  wordCount: number;
  category: BlogCategory;
  categoryLabel: string;
  categoryLabelEn?: string;
  targetKeywords: string[];
  targetKeywordsEn?: string[];
  coverImage: string;
  sections: BlogPostSection[];
  faqs: BlogFAQ[];
  conclusion: string;
  conclusionEn?: string;
  relatedProductId?: string;
  featured?: boolean;
}
