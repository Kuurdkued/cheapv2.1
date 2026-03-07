
import { BadgeType, Product, Category } from './types';

export const ADMIN_CREDENTIALS = {
  email: 'marwanfon321@gmail.com',
  password: 'M%a1132ar99wa00n'
};

export const CONTACT_INFO = {
  phone: '07503213212',
  whatsapp: '07503213212',
  email: 'marwanfon321@gmail.com',
  location: 'Rovia – Duhok'
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'کارتەکانی یاری' },
  { id: '2', name: 'بەشدارییەکانی ئەپڵیکەیشن' },
  { id: '3', name: 'کارتەکانی دیاری' },
  { id: '4', name: 'خزمەتگوزارییەکانی مۆبایل' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    appName: 'پۆبجی مۆبایل',
    name: '600 UC',
    category: 'کارتەکانی یاری',
    price: 15000,
    instructions: 'کۆدی کارتەکە داخڵ بکە لە ماڵپەڕی فەرمی پۆبجی',
    logo_url: 'https://picsum.photos/seed/pubg/200',
    banner_url: 'https://picsum.photos/seed/pubgbanner/800/400',
    badge: BadgeType.POPULAR,
    isVisible: true,
    isFeatured: true,
    createdAt: Date.now()
  },
  {
    id: 'p2',
    appName: 'نێتفلیکس',
    name: 'Premium 1 Month',
    category: 'بەشدارییەکانی ئەپڵیکەیشن',
    price: 12000,
    instructions: 'ئیمەیڵ و پاسۆردت بۆ دەنێردرێت',
    logo_url: 'https://picsum.photos/seed/netflix/200',
    banner_url: 'https://picsum.photos/seed/netflixbanner/800/400',
    badge: BadgeType.BEST_VALUE,
    isVisible: true,
    isFeatured: true,
    createdAt: Date.now()
  }
];
