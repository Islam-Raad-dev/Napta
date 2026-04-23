import React, { useState } from 'react';
import { Leaf, Cpu, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onStart, isDarkMode, toggleDarkMode, currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'features', label: 'مميزات المنصة' },
    { id: 'about', label: 'عن نبتة' },
    { id: 'faq', label: 'الأسئلة الشائعة' }
  ];

  return (
    <>
      <nav style={{ direction: 'rtl' }} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 md:py-8 transition-colors duration-500 bg-primary-light dark:bg-dark-base border-b border-primary-dark/5 dark:border-white/5" role="navigation" aria-label="التنقل الرئيسي">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 md:gap-6"
        >
          <button 
            onClick={toggleDarkMode}
            className="p-3 w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-primary-dark dark:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent-mustard"
            aria-label={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          {/* Desktop CTA */}
          <button 
            onClick={onStart}
            className="hidden md:block px-8 py-3.5 bg-primary-dark dark:bg-white text-white dark:text-primary-dark hover:bg-accent-mustard dark:hover:bg-accent-mustard hover:text-primary-dark dark:hover:text-primary-dark rounded-full font-cairo text-base font-black transition-all duration-300 shadow-precise-luxury focus-visible:ring-2 focus-visible:ring-accent-mustard focus-visible:ring-offset-2"
          >
            ابدأ الآن
          </button>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-primary-dark dark:text-white transition-colors z-[60] focus-visible:ring-2 focus-visible:ring-accent-mustard"
            aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 font-cairo text-base font-bold text-primary-dark/60 dark:text-white/60">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNavClick(link.id)} 
              aria-current={currentPage === link.id ? 'page' : undefined}
              className={`${currentPage === link.id ? 'text-primary-dark dark:text-white' : 'hover:text-primary-dark dark:hover:text-white'} transition-colors relative group py-2 bg-transparent border-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-mustard focus-visible:ring-offset-2 rounded-lg`}
            >
              <span className="relative z-10">{link.label}</span>
              {currentPage === link.id && (
                <motion.span 
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute bottom-0 left-0 w-full h-1 bg-accent-mustard rounded-full" 
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 md:gap-4"
        >
          <h1 className="text-xl md:text-3xl font-black tracking-tight text-primary-dark dark:text-white font-cairo">
            نبتة <span className="text-accent-mustard">الذكية</span>
          </h1>
          <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary-dark dark:bg-white text-white dark:text-primary-dark shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <Leaf className="w-6 h-6 md:w-7 md:h-7" />
            <Cpu className="absolute -bottom-1 -left-1 md:-bottom-1.5 md:-left-1.5 text-accent-mustard w-4 h-4 md:w-5 md:h-5 bg-primary-dark dark:bg-white rounded-full p-0.5 border-[1.5px] md:border-2 border-primary-light dark:border-dark-base" />
          </div>
        </motion.div>
      </nav>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[45] bg-primary-light dark:bg-dark-base pt-28 px-6 pb-8 flex flex-col md:hidden font-cairo"
            role="dialog"
            aria-label="قائمة التنقل"
          >
            <div className="flex flex-col gap-6 text-right mt-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  aria-current={currentPage === link.id ? 'page' : undefined}
                  className={`text-3xl font-black text-right w-full py-2 ${currentPage === link.id ? 'text-accent-mustard' : 'text-primary-dark dark:text-white'} transition-colors bg-transparent border-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-mustard rounded-lg`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-10 border-t border-primary-dark/10 dark:border-white/10">
              <button 
                onClick={() => { onStart(); setIsMobileMenuOpen(false); }}
                className="w-full py-5 bg-primary-dark dark:bg-white text-white dark:text-primary-dark rounded-2xl font-black text-xl active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-accent-mustard focus-visible:ring-offset-2"
              >
                ابدأ التقييم الآن
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
