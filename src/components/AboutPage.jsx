import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, User, Target, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-48 pb-32 px-8 min-h-screen relative overflow-hidden flex flex-col items-center organic-mesh">
      
      <div className="max-w-6xl w-full z-10 space-y-32">
        {/* Header: Premium Philosophical Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-right space-y-8"
        >
          <span className="text-sm font-black font-outfit text-accent-mustard tracking-[0.4em] uppercase block">
            الرؤية والرسالة
          </span>
          <h1 className="text-fluid-h2 font-black font-cairo text-primary-dark dark:text-white leading-[1.1] tracking-tight">
            نحن نبني <br /> <span className="text-accent-mustard italic">جسراً</span> بين التكنولوجيا والطبيعة.
          </h1>
          <p className="text-xl md:text-2xl text-primary-dark/50 dark:text-white/50 max-w-2xl mr-0 ml-auto font-cairo leading-relaxed font-medium">
            نبتة هي محاولة لإعادة صياغة علاقتنا بالبيئة، باستخدام قوة الذكاء الاصطناعي لحماية كل ورقة خضراء على هذا الكوكب.
          </p>
        </motion.div>

        {/* Combined Content Area: Clean Vertical Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Developer Card: Solo Project Context */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-10 md:p-16 rounded-[3.5rem] bg-white dark:bg-dark-surface border border-primary-dark/5 dark:border-white/5 shadow-precise-luxury relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-mustard/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent-mustard/10 transition-colors" />
            
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-black font-cairo text-primary-dark dark:text-white">المطور المستقل</h2>
              <div className="w-16 h-16 rounded-2xl bg-primary-dark dark:bg-white flex items-center justify-center text-white dark:text-primary-dark shadow-md transform rotate-3">
                <User className="w-8 h-8" />
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed font-bold">
                مشروع نبتة هو مشروع <strong className="text-accent-mustard font-black">فردي طموح</strong>، تم تطويره بالكامل بواسطة شخص واحد.
              </p>
              
              <div className="pt-12 border-t border-primary-dark/10 dark:border-white/10">
                <div className="flex flex-col gap-2 mb-8">
                  <span className="text-accent-mustard font-black font-outfit text-sm uppercase tracking-widest">مطور البرمجيات</span>
                  <h3 className="text-2xl md:text-3xl font-black font-cairo text-primary-dark dark:text-white">إسلام رعد فتحي</h3>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com/Islam-Raad-dev' },
                    { label: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/islam-raad/' },
                    { label: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:islamraad.dev@gmail.com' }
                  ].map((btn, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={btn.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-accent-mustard/10 text-accent-mustard hover:bg-accent-mustard hover:text-primary-dark transition-all font-outfit shadow-sm font-black text-sm md:text-base border border-accent-mustard/20"
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
            className="lg:col-span-5 space-y-8"
          >
            <div className="p-10 md:p-14 rounded-[3.5rem] bg-primary-dark dark:bg-dark-elevated text-white shadow-xl border border-white/5 relative overflow-hidden group">
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-mustard/10 rounded-full blur-3xl" />
               
               <div className="flex items-center gap-6 mb-10">
                 <h2 className="text-3xl md:text-4xl font-black font-cairo">هدفنا الأسمى</h2>
                 <div className="w-14 h-14 rounded-2xl bg-accent-mustard flex items-center justify-center text-primary-dark shadow-md">
                   <Target className="w-7 h-7" />
                 </div>
               </div>

               <div className="space-y-6">
                 <h3 className="text-3xl md:text-4xl font-black font-cairo text-accent-mustard tracking-tight leading-tight">
                   "نبات صحي، حياة مستدامة للجميع"
                 </h3>
                 <p className="text-lg md:text-xl font-cairo leading-relaxed font-bold opacity-80">
                   نسعى لتمكين كل مزارع وهواة الزراعة بأدوات احترافية كانت في السابق حكراً على المختبرات الكبرى.
                 </p>
               </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-accent-mustard/10 border border-accent-mustard/20 flex items-center gap-6">
               <div className="w-12 h-12 rounded-full bg-accent-mustard flex items-center justify-center text-primary-dark shadow-sm">
                  <Sparkles className="w-6 h-6" />
               </div>
               <p className="text-primary-dark dark:text-accent-mustard font-black font-cairo text-lg italic">
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
