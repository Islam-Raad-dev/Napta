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
      className="relative min-h-screen pt-40 pb-32 overflow-hidden"
    >
      <div className="container mx-auto px-8 max-w-6xl relative z-10">
        <div className="text-center mb-32 max-w-3xl mx-auto">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="text-fluid-h1 font-black font-cairo text-primary-dark dark:text-white mb-8 tracking-tight leading-[1.1]"
          >
            مميزات <span className="text-accent-mustard italic">نبتة</span>.
          </motion.h1>
          <p className="text-xl md:text-2xl text-primary-dark/50 dark:text-white/50 font-cairo leading-[1.8] font-medium">
            نجمع بين الابتكار و الجمال، لنقدم لك تجربة زراعية لا تُنسى.
          </p>
        </div>

        <div className="space-y-48">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: feature.side === 'right' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${feature.side === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 md:gap-24 relative group`}
            >


              {/* Feature Text */}
              <div className="flex-1 space-y-6 text-right relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-dark dark:bg-white text-white dark:text-primary-dark shadow-precise-luxury transform group-hover:rotate-6 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-primary-dark dark:text-white font-cairo leading-[1.2]">
                  {feature.title}
                </h3>
                <p className="text-xl md:text-2xl text-primary-dark/60 dark:text-white/60 font-cairo leading-[1.8] max-w-xl ml-auto font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Feature Graphic Detail */}
              <div className="flex-1 flex justify-center items-center relative z-10">
                 <div className="w-full h-80 rounded-[3rem] border border-primary-dark/10 dark:border-white/10 bg-primary-light dark:bg-dark-surface shadow-md flex items-center justify-center relative overflow-hidden group-hover:border-accent-mustard/50 transition-colors">
                    <Sparkles className="w-24 h-24 text-accent-mustard/30 transition-colors" />
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
