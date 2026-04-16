import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onStart, onDemoClick }) => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12 z-10 pointer-events-none">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-right pointer-events-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-mustard/10 text-accent-mustard text-sm font-bold mb-6 font-cairo">
            مستقبل العناية بالنباتات
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-primary-dark dark:text-white font-cairo leading-tight mb-6 transition-colors duration-300">
            منصة <span className="text-accent-mustard">نبتة</span> الذكية <br />
            <span className="text-3xl md:text-5xl font-light">طبيب نباتك الشخصي</span>
          </h2>
          <p className="text-lg text-primary-dark/60 dark:text-white/60 font-cairo max-w-xl ml-auto leading-relaxed mb-10 transition-colors duration-300">
            اكتشف أسرار نباتاتك بنقرة واحدة. نقوم بتحليل صور نباتك باستخدام أقوى تقنيات الذكاء الاصطناعي لتشخيص حالتها وتزويدك بخطة عناية متميزة.
          </p>
          
          <div className="flex items-center justify-end gap-4">
            <button 
              onClick={onStart}
              className="px-10 py-4 bg-primary-dark text-white rounded-2xl font-cairo font-bold btn-3d text-lg"
            >
              ابدأ الفحص المجاني
            </button>
            <button 
              onClick={onDemoClick}
              className="px-10 py-4 bg-white/50 text-primary-dark rounded-2xl font-cairo font-semibold border border-primary-dark/10 hover:bg-white transition-all"
            >
              شاهد العينة
            </button>
          </div>
        </motion.div>

        {/* Visual Content replacing 3D Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex-1 w-full max-w-lg mx-auto pointer-events-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent-mustard/20 blur-3xl rounded-full" />
            <motion.img 
              src="/hero_plant.png" 
              alt="Digital Smart Plant" 
              className="relative w-full h-auto drop-shadow-2xl float-animation z-10"
              initial={{ y: 20 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-dark/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent-mustard/5 rounded-full blur-3xl -z-0" />
    </section>
  );
};

export default Hero;
