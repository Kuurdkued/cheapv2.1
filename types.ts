
export enum BadgeType {
  POPULAR = 'بەناوبانگ',
  NEW = 'نوێ',
  BEST_VALUE = 'باشترین نرخ',
  NONE = 'هیچ'
}

export interface Product {
  id: string;
  appName: string; // The parent app/service name (e.g., "PUBG")
  name: string;    // The specific package (e.g., "60 UC")
  category: string;
  price: number;
  instructions: string;
  logo_url: string;
  banner_url: string;
  badge: BadgeType;
  isVisible: boolean;
  isFeatured: boolean;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface AdminUser {
  email: string;
  isLoggedIn: boolean;
}
