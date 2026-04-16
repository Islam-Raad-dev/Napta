import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Users, Target, Leaf } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24 px-8 min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background elements */}
      <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-accent-mustard/5 dark:bg-accent-mustard/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-primary-dark/5 dark:bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full z-10 space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-sm font-bold text-primary-dark dark:text-accent-mustard mb-4">
            <Leaf className="w-4 h-4" />
            <span>عن المنصة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-cairo text-primary-dark dark:text-white leading-tight">
            ما هي <span className="text-accent-mustard">نبتة</span>؟
          </h1>
          <p className="text-lg md:text-xl text-primary-dark/70 dark:text-white/70 max-w-2xl mx-auto font-cairo">
            منصة ذكية متطورة تهدف إلى تغيير المفهوم التقليدي للعناية بالنباتات من خلال دمج الذكاء الاصطناعي مع الخبرة الزراعية.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Team Info Card */}
          <motion.div 
            id="team-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl glass-morphism border border-primary-dark/10 dark:border-white/10 shadow-luxury space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary-dark/10 dark:bg-white/10 flex items-center justify-center text-primary-dark dark:text-accent-mustard">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-cairo text-primary-dark dark:text-white">فريق التطوير</h2>
            </div>
            
            <p className="text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed relative z-10">
              هذا المشروع هو ثمرة جهود <strong>"فريق الحياة"</strong>، 
              وهو فريق طموح وصغير مكون من طلبة جامعة الموصل - كلية علوم الحاسوب والرياضيات، 
              وتحديداً قسم الذكاء الاصطناعي.
            </p>

            <div className="pt-6 mt-6 border-t border-primary-dark/10 dark:border-white/10 relative z-10">
              <h3 className="text-lg font-bold font-cairo text-primary-dark dark:text-white mb-4">
                رئيس الفريق: إسلام رعد فتحي
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://github.com/Islam-Raad-dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-primary-dark dark:text-white font-cairo text-sm font-bold w-full sm:w-auto">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/islam-raad/?locale=en-US" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5]/10 border border-[#0077b5]/20 hover:bg-[#0077b5]/20 transition-colors text-[#0077b5] dark:text-[#66b6e8] font-cairo text-sm font-bold w-full sm:w-auto">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a href="mailto:islamraad.dev@gmail.com" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors text-red-600 dark:text-red-400 font-cairo text-sm font-bold w-full sm:w-auto">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          </motion.div>

          {/* Goal Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl glass-morphism border border-primary-dark/10 dark:border-white/10 shadow-luxury space-y-6 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-accent-mustard/20 flex items-center justify-center text-accent-mustard">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-cairo text-primary-dark dark:text-white">هدف المشروع</h2>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-cairo text-primary-dark dark:text-accent-mustard mb-4 inline-block relative">
                "نباتات تخلو من الأمراض"
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent-mustard/30 rounded-full"></div>
              </h3>
              
              <div className="space-y-4 mt-6">
                <p className="text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed">
                  رؤيتنا تتجاوز مجرد التشخيص التقني للآفات الزراعية؛ نحن نسعى لخلق بيئة زراعية مستدامة، نقية، وصحية.
                </p>
                <p className="text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed">
                  نعتقد في <strong>نبتة</strong> أن كل ورقة خضراء هي روح وحياة تنبض بالعطاء، ومهمتنا الأساسية هي حمايتها. من خلال تبني أحدث ما توصلت إليه خوارزميات الذكاء الاصطناعي، نوفر حلولاً فورية ودقيقة تضمن نمواً سليماً وإنتاجية مزدهرة لكل مزارع وهاوٍ.
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 opacity-5 dark:opacity-10 dark:text-white pointer-events-none">
                <Leaf className="w-48 h-48" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
