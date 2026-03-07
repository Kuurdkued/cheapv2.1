
import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
      {/* Floating Background Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/20"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 -left-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/20"
      />

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block rounded-2xl glass px-6 py-2 text-sm font-bold text-blue-600 dark:text-blue-400"
        >
          Made by Marwan Fon
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-black leading-tight tracking-tight sm:text-7xl lg:text-8xl"
        >
          Cheap <span className="text-blue-600 drop-shadow-sm">Cards</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-400 sm:text-xl"
        >
          باشترین و هەرزانترین جۆرەکانی کارتی دیاری و یاری و بەشدارییەکان لە یەک شوێندا.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
          >
            بینینی بەرهەمەکان
          </button>
          <a
            href="https://wa.me/07503213212"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl glass px-8 py-4 text-lg font-bold transition-all hover:bg-white/10 active:scale-95"
          >
            پەیوەندی بکە
          </a>
        </motion.div>
      </div>

      {/* Floating Card Visuals */}
      <div className="mt-16 flex justify-center gap-8 px-4 opacity-50 sm:opacity-100">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15 * i, 0],
              rotate: [i * 5, i * -5, i * 5]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-32 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl sm:h-48 sm:w-32"
          />
        ))}
      </div>
    </section>
  );
};
