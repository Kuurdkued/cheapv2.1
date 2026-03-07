
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category, BadgeType, AdminUser } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, ADMIN_CREDENTIALS, CONTACT_INFO } from './constants';
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { generateWhatsAppLink } from './utils/whatsapp';

// Helper for local storage
const storage = {
  getProducts: (): Product[] => JSON.parse(localStorage.getItem('cc_products') || JSON.stringify(INITIAL_PRODUCTS)),
  setProducts: (products: Product[]) => localStorage.setItem('cc_products', JSON.stringify(products)),
  getCategories: (): Category[] => JSON.parse(localStorage.getItem('cc_categories') || JSON.stringify(INITIAL_CATEGORIES)),
  setCategories: (categories: Category[]) => localStorage.setItem('cc_categories', JSON.stringify(categories)),
  getAdmin: (): AdminUser | null => JSON.parse(localStorage.getItem('cc_admin_session') || 'null'),
  setAdmin: (admin: AdminUser | null) => localStorage.setItem('cc_admin_session', JSON.stringify(admin)),
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(storage.getProducts());
  const [categories, setCategories] = useState<Category[]>(storage.getCategories());
  const [admin, setAdmin] = useState<AdminUser | null>(storage.getAdmin());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    storage.setProducts(newProducts);
  };

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    storage.setCategories(newCategories);
  };

  const login = (email: string) => {
    const session = { email, isLoggedIn: true };
    setAdmin(session);
    storage.setAdmin(session);
  };

  const logout = () => {
    setAdmin(null);
    storage.setAdmin(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600">Cheap Cards</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-bold hover:text-blue-500">سەرەتا</Link>
            <a href="#products" className="text-sm font-bold hover:text-blue-500">بەرهەمەکان</a>
            <a href="#contact" className="text-sm font-bold hover:text-blue-500">پەیوەندی</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {admin ? (
              <Link to="/admin" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700">ئەدمین</Link>
            ) : (
              <Link to="/login" className="rounded-full glass px-4 py-2 text-xs font-bold transition hover:bg-white/10">چوونەژوورەوە</Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} categories={categories} searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />} />
          <Route path="/app/:appName" element={<AppDetailsPage products={products} />} />
          <Route path="/login" element={<LoginPage onLogin={login} admin={admin} />} />
          <Route path="/admin/*" element={<AdminDashboard products={products} setProducts={updateProducts} categories={categories} setCategories={updateCategories} admin={admin} onLogout={logout} />} />
        </Routes>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-blue-600">Cheap Cards</h2>
          <p className="mt-2 text-slate-500">Made by Marwan Fon</p>
          
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h4 className="font-bold">پەیوەندی</h4>
              <p className="mt-2 text-sm text-slate-500">{CONTACT_INFO.phone}</p>
              <p className="text-sm text-slate-500">{CONTACT_INFO.email}</p>
            </div>
            <div>
              <h4 className="font-bold">شوێن</h4>
              <p className="mt-2 text-sm text-slate-500">{CONTACT_INFO.location}</p>
            </div>
            <div>
              <h4 className="font-bold">یاساکان</h4>
              <p className="mt-2 text-sm text-slate-500">تەمەنی رێگەپێدراو: +16</p>
              <p className="text-sm text-slate-500">مەرجەکانی بەکارهێنان</p>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-400">
              Made with ❤️ by Marwan Fon © 2026
            </p>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

// --- App Details Page (The "One Product" view with multiple packages) ---
const AppDetailsPage: React.FC<{ products: Product[] }> = ({ products }) => {
  const { appName } = useParams<{ appName: string }>();
  const navigate = useNavigate();
  
  const appPackages = useMemo(() => {
    return products.filter(p => p.appName === appName && p.isVisible);
  }, [products, appName]);

  const [selectedPackage, setSelectedPackage] = useState<Product | null>(appPackages[0] || null);

  if (appPackages.length === 0) {
    return <div className="p-20 text-center">ببوورە ئەم بەرهەمە بەردەست نییە</div>;
  }

  const currentApp = appPackages[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        گەڕانەوە
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left/Right Side depending on RTL: Image Display */}
        <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl glass order-2 lg:order-1">
          <img 
            src={currentApp.logo_url} 
            alt={currentApp.appName} 
            className="w-full h-full object-cover"
          />
          {selectedPackage?.badge !== BadgeType.NONE && (
            <div className="absolute top-8 right-8 bg-orange-500 text-white px-6 py-2 rounded-2xl font-black shadow-lg">
              {selectedPackage?.badge}
            </div>
          )}
        </div>

        {/* Info Side */}
        <div className="space-y-8 order-1 lg:order-2">
          <div>
            <p className="text-blue-500 font-bold mb-2">{currentApp.category}</p>
            <h1 className="text-5xl font-black mb-4">{currentApp.appName}</h1>
            <div className="text-4xl font-black text-blue-600">
              {selectedPackage?.price.toLocaleString()} <span className="text-xl font-normal opacity-70">IQD</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">جۆری پاکێج هەڵبژێرە:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {appPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-28 ${
                    selectedPackage?.id === pkg.id 
                      ? 'border-blue-600 bg-blue-600/5 ring-4 ring-blue-600/10' 
                      : 'border-white/10 glass hover:border-white/30'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-500 mb-1">{pkg.name}</span>
                  <span className="text-sm font-black">{pkg.price.toLocaleString()} IQD</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
             <h3 className="text-xl font-bold mb-3">ڕێنماییەکان:</h3>
             <p className="text-slate-500 dark:text-slate-400 bg-white/5 p-6 rounded-3xl border border-white/5 italic">
               {selectedPackage?.instructions || 'هیچ ڕێنماییەک نییە'}
             </p>
          </div>

          <div className="pt-8 flex gap-4">
            <a
              href={selectedPackage ? generateWhatsAppLink(selectedPackage) : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 text-white font-black py-5 rounded-[2rem] text-center text-xl shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition active:scale-95"
            >
              ئێستا بیکڕە
            </a>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-bold text-slate-400 px-4">
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> ئامادەیە</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> گەیاندنی خێرا</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Home Page Component ---
interface HomeProps {
  products: Product[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
}

const HomePage: React.FC<HomeProps> = ({ products, categories, searchQuery, setSearchQuery, activeCategory, setActiveCategory }) => {
  // Group by App Name for the main grid
  // Fix: Explicitly cast Object.values to Product[] to resolve 'unknown' type error on line 501
  const appSummaries = useMemo<Product[]>(() => {
    const appsMap: Record<string, Product> = {};
    products.forEach(p => {
      if (!p.isVisible) return;
      const matchesSearch = p.appName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      
      if (matchesSearch && matchesCategory) {
        // We pick the first one or a "main" one to represent the app
        if (!appsMap[p.appName]) {
          appsMap[p.appName] = p;
        }
      }
    });
    return Object.values(appsMap) as Product[];
  }, [products, searchQuery, activeCategory]);

  return (
    <div className="pb-20">
      <Hero />

      <section className="container mx-auto mt-20 px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'کڕیاری ڕازی', val: '+5000' },
            { label: 'بەرهەمی جیاواز', val: '+200' },
            { label: 'پشتیگیری ٢٤/٧', val: 'Online' },
            { label: 'ساڵانی ئەزموون', val: '5+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="rounded-3xl glass p-8 text-center"
            >
              <h3 className="text-3xl font-black text-blue-600">{stat.val}</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="products" className="container mx-auto mt-32 px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="text-4xl font-black">بەرهەمەکانمان</h2>
          
          <div className="flex w-full max-w-md items-center gap-2 overflow-hidden rounded-2xl glass px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="گەڕان بۆ بەرهەم..."
              className="w-full bg-transparent p-2 text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setActiveCategory('All')}
            className={`whitespace-nowrap rounded-2xl px-6 py-3 text-sm font-bold transition ${activeCategory === 'All' ? 'bg-blue-600 text-white' : 'glass hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            هەمووی
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`whitespace-nowrap rounded-2xl px-6 py-3 text-sm font-bold transition ${activeCategory === cat.name ? 'bg-blue-600 text-white' : 'glass hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {appSummaries.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </div>

        {appSummaries.length === 0 && (
          <div className="mt-20 text-center">
            <h3 className="text-xl font-bold text-slate-400">هیچ بەرهەمێک نەدۆزرایەوە</h3>
          </div>
        )}
      </section>

      <section className="container mx-auto mt-32 px-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-800 px-8 py-20 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl text-center md:text-right">
            <h2 className="text-4xl font-black">ئۆفەری تایبەت</h2>
            <p className="mt-4 text-xl opacity-90">هەموو ڕۆژانی هەینی داشکاندنی تایبەتمان هەیە لەسەر کارتی یارییەکان.</p>
            <button className="mt-8 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-xl transition hover:scale-105 active:scale-95">
              ئێستا سوودمەند بە
            </button>
          </div>
          <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 opacity-20">
            <div className="h-96 w-96 rounded-full border-[40px] border-white" />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Login Page Component ---
interface LoginProps {
  onLogin: (email: string) => void;
  admin: AdminUser | null;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin, admin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) navigate('/admin');
  }, [admin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLogin(email);
      navigate('/admin');
    } else {
      setError('ئیمەیڵ یان پاسۆرد هەڵەیە!');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-[2.5rem] glass p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-black text-center mb-8">چوونەژوورەوەی ئەدمین</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">ئیمەیڵ</label>
            <input
              type="email"
              className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">پاسۆرد</label>
            <input
              type="password"
              className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition"
          >
            بچۆ ژوورەوە
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Admin Dashboard Component ---
interface AdminProps {
  products: Product[];
  setProducts: (p: Product[]) => void;
  categories: Category[];
  setCategories: (c: Category[]) => void;
  admin: AdminUser | null;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminProps> = ({ products, setProducts, categories, setCategories, admin, onLogout }) => {
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!admin) navigate('/login');
  }, [admin, navigate]);

  const openNewProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      appName: '',
      name: '',
      category: categories[0]?.name || '',
      price: 0,
      instructions: '',
      logo_url: 'https://picsum.photos/200',
      banner_url: 'https://picsum.photos/800/400',
      badge: BadgeType.NONE,
      isVisible: true,
      isFeatured: false,
      createdAt: Date.now()
    };
    setEditingProduct(newProduct);
  };

  const saveProduct = (product: Product) => {
    const exists = products.find(p => p.id === product.id);
    if (exists) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([product, ...products]);
    }
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('ئایا دڵنیایت لە سڕینەوەی ئەم بەرهەمە؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const groupedProducts = useMemo<Record<string, Product[]>>(() => {
    const groups: Record<string, Product[]> = {};
    products.forEach(p => {
      if (!groups[p.appName]) groups[p.appName] = [];
      groups[p.appName].push(p);
    });
    return groups;
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black">داشبۆردی ئەدمین</h1>
        <button onClick={onLogout} className="rounded-2xl glass px-6 py-3 text-red-500 font-bold hover:bg-red-500/10">چوونەدەرەوە</button>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <button onClick={openNewProduct} className="rounded-2xl bg-blue-600 px-6 py-3 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">زیادکردنی بەرهەمی نوێ +</button>
      </div>

      <div className="space-y-10">
        {/* Fix: Added explicit type cast to Object.entries to ensure stability in mapping */}
        {(Object.entries(groupedProducts) as [string, Product[]][]).map(([appName, items]) => (
          <div key={appName} className="space-y-4">
            <h2 className="text-2xl font-black border-r-4 border-blue-600 pr-4">{appName || 'بەرهەمە بێ ناوەکان'}</h2>
            <div className="grid gap-3">
              {items.map(product => (
                <motion.div 
                  layout
                  key={product.id} 
                  className="rounded-3xl glass p-4 flex flex-col md:flex-row gap-4 items-center border border-white/5"
                >
                  <img src={product.logo_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                  <div className="flex-1 space-y-0.5 text-center md:text-right">
                    <h3 className="text-base font-bold">{product.name || 'بێ ناوی پاکێج'}</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs text-slate-500">
                      <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-lg">{product.category}</span>
                      <span className="bg-slate-500/10 px-2 py-0.5 rounded-lg">{product.price.toLocaleString()} دینار</span>
                      {!product.isVisible && <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded-lg">شاراوە</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="px-4 py-2 rounded-xl bg-blue-600/10 text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white transition"
                    >
                      دەستکاری
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)} 
                      className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editingProduct && (
          <ProductEditor 
            product={editingProduct} 
            products={products}
            categories={categories} 
            onSave={saveProduct} 
            onCancel={() => setEditingProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Product Editor Modal Component ---
interface EditorProps {
  product: Product;
  products: Product[];
  categories: Category[];
  onSave: (p: Product) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<EditorProps> = ({ product, products, categories, onSave, onCancel }) => {
  const [form, setForm] = useState<Product>(product);

  const appNameSuggestions = useMemo<string[]>(() => {
    const apps = products
      .filter(p => p.category === form.category && p.appName)
      .map(p => p.appName);
    return Array.from(new Set(apps));
  }, [products, form.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const selectSuggestedApp = (name: string) => {
    const existing = products.find(p => p.appName === name);
    setForm(prev => ({
      ...prev,
      appName: name,
      logo_url: existing ? existing.logo_url : prev.logo_url
    }));
  };

  const toggleVisibility = () => {
    setForm(prev => ({ ...prev, isVisible: !prev.isVisible }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 shadow-2xl no-scrollbar"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black">دەستکاری بەرهەم</h2>
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 text-right">
          <div className="space-y-2">
            <label className="text-sm font-bold">١. جۆرەکە هەڵبژێرە (Category)</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setForm(prev => ({ ...prev, category: c.name }))}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition ${form.category === c.name ? 'bg-blue-600 text-white' : 'glass'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold">٢. ناوی بەرنامە یان یاری (بۆ نموونە: پۆبجی)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {appNameSuggestions.map(app => (
                <button
                  key={app}
                  onClick={() => selectSuggestedApp(app)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500/30 transition ${form.appName === app ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500/10'}`}
                >
                  {app}
                </button>
              ))}
            </div>
            <input 
              name="appName"
              value={form.appName}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-blue-500"
              placeholder="ناوی بەرنامەکە بنووسە..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">٣. پاکێج (بۆ نموونە: 660 UC)</label>
              <input 
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-blue-500"
                placeholder="ناوی پاکێجەکە بنووسە..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">٤. نرخ (دینار)</label>
              <input 
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">نیشانە (Badge)</label>
              <select 
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-blue-500 appearance-none"
              >
                {/* Fix: Explicitly cast Object.values(BadgeType) to BadgeType[] to avoid 'unknown' mapping issues */}
                {(Object.values(BadgeType) as BadgeType[]).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">لینکی وێنە (Logo URL)</label>
              <input 
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">ڕێنماییەکان</label>
            <textarea 
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows={2}
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-blue-500 resize-none text-sm"
              placeholder="چۆن بەرهەمەکە بەکاربهێنرێت..."
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <button 
              onClick={toggleVisibility}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition ${form.isVisible ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
            >
              <div className={`w-3 h-3 rounded-full ${form.isVisible ? 'bg-green-500' : 'bg-red-500'}`} />
              {form.isVisible ? 'دیارە لە ماڵپەڕ' : 'شاراوەیە'}
            </button>
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              onClick={() => onSave(form)}
              className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition"
            >
              پاشەکەوتکردن
            </button>
            <button 
              onClick={onCancel}
              className="flex-1 glass font-bold py-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition"
            >
              پاشگەزبوونەوە
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
