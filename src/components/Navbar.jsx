import React from 'react';
import { Leaf, Cpu, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onStart, isDarkMode, toggleDarkMode, currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass-morphism transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary-dark shadow-luxury">
          <Leaf className="text-white w-6 h-6" />
          <Cpu className="absolute -bottom-1 -right-1 text-accent-mustard w-4 h-4 bg-primary-dark rounded-full p-0.5 border border-white/20" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-primary-dark dark:text-white font-cairo">
          نبتة <span className="text-accent-mustard">الذكية</span>
        </h1>
      </motion.div>

      <div className="hidden md:flex items-center gap-8 font-cairo text-sm font-semibold text-primary-dark/70 dark:text-white/70">
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className={`${currentPage === 'home' ? 'text-primary-dark dark:text-white font-bold' : 'hover:text-primary-dark dark:hover:text-white'} transition-colors`}>الرئيسية</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('features'); }} className={`${currentPage === 'features' ? 'text-primary-dark dark:text-white font-bold' : 'hover:text-primary-dark dark:hover:text-white'} transition-colors`}>مميزات المنصة</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className={`${currentPage === 'about' ? 'text-primary-dark dark:text-white font-bold' : 'hover:text-primary-dark dark:hover:text-white'} transition-colors`}>عن نبتة</a>
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('faq'); }} className={`${currentPage === 'faq' ? 'text-primary-dark dark:text-white font-bold' : 'hover:text-primary-dark dark:hover:text-white'} transition-colors`}>الأسئلة الشائعة</a>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-primary-dark dark:text-white transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="px-6 py-2.5 bg-primary-dark text-white rounded-full font-cairo text-sm font-bold btn-3d"
      >
        ابدأ الآن
      </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
