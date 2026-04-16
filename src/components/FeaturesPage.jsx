import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Sparkles, Activity, FileCheck } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-white" />,
      title: "تشخيص دقيق وحيوي",
      description: "نستخدم نماذج ذكاء اصطناعي متطورة لتحديد أكثر من 1000 نوع من الأمراض والآفات التي تصيب النباتات بدقة متناهية."
    },
    {
      icon: <FileCheck className="w-8 h-8 text-white" />,
      title: "خطط علاج مخصصة",
      description: "لا نكتفي بالتشخيص، بل نقدم لك خطوات علاجية مفصلة وواضحة تناسب بيئة النبات المحلية وحالته."
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "دعم كامل للعربية",
      description: "المنصة مصممة خصيصاً للمستخدم العربي لضمان تجربة سلسة بدون عوائق لغوية."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "سرعة فائقة",
      description: "احصل على النتائج في ثوانٍ معدودة بمجرد رفع صورة النبات المعني، لتتمكن من التدخل السريع."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "آمن وموثوق",
      description: "نحافظ على خصوصيتك ولا نقوم بمشاركة صور نباتاتك أو بياناتك مع أي طرف ثالث."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: "واجهة فاخرة وسهلة",
      description: "تصميم أنيق وبسيط يتيح لك الوصول لجميع الميزات دون تعقيد."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-8 pt-32 pb-20 min-h-screen"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-cairo text-primary-dark dark:text-white mb-6">
          مميزات منصة <span className="text-accent-mustard">نبتة</span>
        </h1>
        <p className="text-lg text-primary-dark/60 dark:text-white/60 font-cairo max-w-2xl mx-auto leading-relaxed">
          تعرف على القوة التقنية والتصميمية التي تجعل نبتة الخيار الأول للعناية بنباتاتك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex flex-col items-center p-8 bg-white dark:bg-[#1A2C21] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 dark:border-white/5 hover:border-accent-mustard/30 transition-all group"
          >
            <div className="w-16 h-16 bg-primary-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-mustard transition-all duration-300 shadow-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-4 font-cairo text-center">
              {feature.title}
            </h3>
            <p className="text-center font-cairo text-primary-dark/60 dark:text-white/60 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturesPage;
