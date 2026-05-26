import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, User, Target, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 min-h-screen relative overflow-hidden flex flex-col items-center organic-mesh">
      
      <div className="max-w-5xl w-full z-10 space-y-16">
        {/* Header: Premium Philosophical Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-right space-y-4"
        >
          <span className="text-xs font-black font-cairo text-accent-mustard block">
            الرؤية والرسالة
          </span>
          <h1 className="text-fluid-h2 font-black font-cairo text-primary-dark dark:text-white leading-tight tracking-tight">
            نحن نبني <br /> <span className="text-accent-mustard italic">جسراً</span> بين التكنولوجيا والطبيعة.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-dark/60 dark:text-white/50 max-w-2xl mr-0 ml-auto font-cairo leading-relaxed font-semibold">
            نبتة هي محاولة لإعادة استخدام قوة الذكاء الاصطناعي لحماية كل ورقة خضراء على هذا الكوكب.
          </p>
        </motion.div>

        {/* Combined Content Area: Clean Vertical Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Developer Card: Solo Project Context */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 md:p-10 rounded-[2.5rem] bg-white dark:bg-dark-surface border border-primary-dark/5 dark:border-white/5 shadow-precise-luxury relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-mustard/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-accent-mustard/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-black font-cairo text-primary-dark dark:text-white">المطور المستقل</h2>
              <div className="w-12 h-12 rounded-xl bg-primary-dark dark:bg-white flex items-center justify-center text-white dark:text-primary-dark shadow-md transform rotate-3">
                <User className="w-6 h-6" />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed font-bold">
                مشروع نبتة هو مشروع <strong className="text-accent-mustard font-black">فردي طموح</strong>، تم تطويره بالكامل بواسطة شخص واحد.
              </p>
              
              <div className="pt-6 border-t border-primary-dark/10 dark:border-white/10">
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-accent-mustard font-black font-cairo text-xs">مطور البرمجيات</span>
                  <h3 className="text-lg md:text-xl font-black font-cairo text-primary-dark dark:text-white">إسلام رعد فتحي</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'GitHub', icon: <Github className="w-4 h-4" />, href: 'https://github.com/Islam-Raad-dev' },
                    { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/islam-raad/' },
                    { label: 'Email', icon: <Mail className="w-4 h-4" />, href: 'mailto:islamraad.dev@gmail.com' }
                  ].map((btn, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={btn.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-mustard/10 text-accent-mustard hover:bg-accent-mustard hover:text-primary-dark transition-all font-outfit shadow-sm font-black text-xs md:text-sm border border-accent-mustard/20"
                    >
                      <span className="order-2">{btn.label}</span>
                      <div className="order-1">{btn.icon}</div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Goals Card: Visual Accent */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 md:p-8 rounded-[2.5rem] bg-primary-dark dark:bg-dark-elevated text-white shadow-xl border border-white/5 relative overflow-hidden group">
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-mustard/10 rounded-full blur-3xl" />
               
               <div className="flex items-center gap-4 mb-6">
                 <h2 className="text-xl md:text-2xl font-black font-cairo">هدفنا الأسمى</h2>
                 <div className="w-11 h-11 rounded-xl bg-accent-mustard flex items-center justify-center text-primary-dark shadow-md">
                   <Target className="w-5 h-5" />
                 </div>
               </div>

               <div className="space-y-3">
                 <h3 className="text-lg md:text-xl font-black font-cairo text-accent-mustard tracking-tight leading-tight">
                   "نبات صحي، حياة مستدامة للجميع"
                 </h3>
                 <p className="text-xs sm:text-sm font-cairo leading-relaxed font-bold opacity-80">
                   نسعى لتمكين كل مزارع بأدوات احترافية وبكل سهولة وسرعة.
                 </p>
               </div>
            </div>

            <div className="p-6 rounded-[1.5rem] bg-accent-mustard/10 border border-accent-mustard/20 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-accent-mustard flex items-center justify-center text-primary-dark shadow-sm shrink-0">
                  <Sparkles className="w-5 h-5" />
               </div>
               <p className="text-primary-dark dark:text-accent-mustard font-black font-cairo text-sm sm:text-base italic">
                 نحن نؤمن بأن المستقبل أخضر، وبالذكاء نصنعه.
               </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-dark/5 dark:bg-white/5 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default AboutPage;
