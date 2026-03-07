
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Product, BadgeType } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const getBadgeColor = (badge: BadgeType) => {
    switch (badge) {
      case BadgeType.POPULAR: return 'bg-orange-500';
      case BadgeType.NEW: return 'bg-blue-500';
      case BadgeType.BEST_VALUE: return 'bg-green-500';
      default: return 'hidden';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/app/${encodeURIComponent(product.appName)}`)}
      className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] glass p-4 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-blue-900/10 border border-white/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900/50">
        <img
          src={product.logo_url}
          alt={product.appName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute top-4 right-4 rounded-xl px-4 py-1.5 text-xs font-black text-white shadow-xl z-10 ${getBadgeColor(product.badge)}`}>
          {product.badge}
        </div>
      </div>

      <div className="mt-6 px-2 pb-2 text-right">
        <p className="text-xs font-bold text-blue-500/80 mb-1">{product.category}</p>
        <h3 className="text-xl font-black text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">
          {product.appName}
        </h3>
        
        <div className="mt-4 flex items-center justify-between gap-2">
           <div className="bg-blue-600 p-2 rounded-xl text-white">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
             </svg>
           </div>
           <span className="text-sm font-bold text-slate-400">بینینی هەموو نرخەکان</span>
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute -inset-1 -z-10 rounded-[inherit] bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-blue-600/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:via-blue-600/10 group-hover:opacity-100" />
    </motion.div>
  );
};
