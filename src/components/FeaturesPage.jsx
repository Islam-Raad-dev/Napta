import React from 'react';
import { motion } from 'framer-motion';
import { Activity, FileCheck, Globe, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: <Activity className="w-10 h-10" />,
      title: "دقة في الرؤية",
      description: "نعتمد على ذكاء اصطناعي فائق يدرك أدق التفاصيل في نباتاتك، ليوفر لك تشخيصاً موثوقاً يعكس تطور التكنولوجيا الحديثة.",
      side: 'right'
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: "رعاية مخصصة",
      description: "نحن لا نكتفي بالتشخيص؛ بل نصمم لك خطة رعاية فريدة تناسب بيئة نباتك واحتياجاته الخاصة.",
      side: 'left'
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "هوية عربية أصيلة",
      description: "صُممت نبتة بروح عربية تحترم لغتنا وجماليتها، مما يمنحك تجربة استخدام فصيحة، واضحة، وراقية في كل تفصيل.",
      side: 'right'
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "استجابة لحظية",
      description: "نحن نقدّر قيمة الوقت في حياة الطبيعة. احصل على أعمق التحليلات في لحظات معدودة، لتبقى دائماً في طليعة الاهتمام بمحاصيلك.",
      side: 'left'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-28 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-8 max-w-6xl relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="text-fluid-h1 font-black font-cairo text-primary-dark dark:text-white mb-6 tracking-tight leading-[1.1]"
          >
            مميزات <span className="text-accent-mustard italic">نبتة</span>.
          </motion.h1>
          <p className="text-base md:text-lg text-primary-dark/50 dark:text-white/50 font-cairo leading-relaxed font-semibold">
            نجمع بين الابتكار و الجمال، لنقدم لك تجربة زراعية لا تُنسى.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: feature.side === 'right' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${feature.side === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-16 relative group`}
            >


              {/* Feature Text */}
              <div className="flex-1 space-y-4 text-right relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-dark dark:bg-white text-white dark:text-primary-dark shadow-precise-luxury transform group-hover:rotate-6 transition-transform duration-500">
                  {React.cloneElement(feature.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-primary-dark dark:text-white font-cairo leading-[1.2]">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-primary-dark/60 dark:text-white/60 font-cairo leading-relaxed max-w-xl ml-auto font-semibold">
                  {feature.description}
                </p>
              </div>

              {/* Feature Graphic Detail */}
              <div className="flex-1 flex justify-center items-center relative z-10 w-full">
                 <div className="w-full h-64 rounded-[2.5rem] border border-primary-dark/10 dark:border-white/10 bg-primary-light dark:bg-dark-surface shadow-md flex items-center justify-center relative overflow-hidden group-hover:border-accent-mustard/50 transition-colors">
                    <Sparkles className="w-16 h-16 text-accent-mustard/30 transition-colors" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesPage;
