import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ArrowRight, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import ResultsDisplay from './ResultsDisplay';

const DemoPage = () => {
  const [demoStep, setDemoStep] = useState(0); // 0: Select, 1: Scanning, 2: Result
  
  // Dummy result for healthy plant (Mediterranean Olive)
  const dummyResultHealthy = {
    plant_name: "شجرة الزيتون المباركة",
    scientific_name: "Olea europaea",
    status: "سليم",
    confidence: "98%",
    diagnosis: "النبات يظهر حيوية ممتازة، الأوراق خضراء داكنة ومنتظمة، ولا توجد أي علامات لإجهاد مائي أو إصابات حشرية. نظام التمثيل الضوئي يعمل بكفاءة عالية.",
    care_instructions: "▪ الحفاظ على تعرض النبات لأشعة الشمس المباشرة لمدة 6 ساعات يومياً. ▪ الري المعتدل عند جفاف أول 3 سم من التربة. ▪ إضافة سماد عضوي متوازن في بداية فصل الربيع لتعزيز النمو. ▪ مراقبة الأوراق دورياً للتأكد من خلوها من حشرة بسيلا الزيتون."
  };

  // Dummy result for sick plant (Lemon Tree with Black Spot)
  const dummyResultSick = {
    plant_name: "شجرة الليمون",
    scientific_name: "Citrus sinensis",
    status: "مصاب",
    confidence: "90%",
    diagnosis: "تظهر أعراض عدوى فطرية تُعرف بـ 'بقع سوداء' أو 'بقع نخرية' على الأوراق، وهي مرض فطري شائع في الحمضيات مثل Phyllosticta citricola أو Guignardia citricarpa.",
    care_instructions: "▪ إزالة الأوراق المصابة وتقليمها فوراً لمنع انتشار الفطر. ▪ رش النبات بمبيد فطري عضوي مثل زيت نيم أو كبريتات النحاس حسب تعليمات الشركة المصنعة. ▪ تحسين تدفق الهواء حول النبات عن طريق تقليم الفروع الكثيفة وتقسيمها بشكل منظم. ▪ تجنب الري من فوق الأوراق لتقليل الرطوبة التي تساعد على نمو الفطر."
  };

  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const startDemo = (type) => {
    setDemoStep(1);
    setSelectedImage(type === 'healthy' ? '/healthy_olive_leaf.png' : '/sick_lemon_leaf.png');
    setTimeout(() => {
      setSelectedResult(type === 'healthy' ? dummyResultHealthy : dummyResultSick);
      setDemoStep(2);
    }, 2500);
  };

  const resetDemo = () => {
    setDemoStep(0);
    setSelectedResult(null);
    setSelectedImage(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-8 pt-32 pb-20 min-h-screen font-cairo"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-6">
          شاهد عينة حية
        </h1>
        <p className="text-lg text-primary-dark/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
          تعرف على كيفية عمل المنصة عن طريق اختيار أحد الأمثلة أدناه. سنقوم بمحاكاة عملية رفع الصورة وتحليلها.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-4 mb-12" role="list" aria-label="خطوات التجربة">
          {['اختر العينة', 'جاري التحليل', 'النتيجة'].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4" role="listitem">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg 
                ${demoStep >= idx 
                  ? 'bg-accent-mustard text-primary-dark shadow-lg ring-4 ring-accent-mustard/20' 
                  : 'bg-white dark:bg-dark-surface text-primary-dark/40 dark:text-white/40 border-2 border-dashed border-primary-dark/20 dark:border-white/20'
                } transition-all duration-300`}
                aria-current={demoStep === idx ? 'step' : undefined}
              >
                {demoStep > idx ? <CheckCircle2 className="w-6 h-6" aria-hidden="true" /> : idx + 1}
              </div>
              {idx < 2 && (
                <div className={`h-1 w-16 md:w-24 rounded-full ${demoStep > idx ? 'bg-accent-mustard' : 'bg-primary-dark/10 dark:bg-white/10'} transition-all duration-300`} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {demoStep === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {/* Healthy Sample */}
              <motion.button 
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startDemo('healthy')}
                className="bg-white dark:bg-dark-surface p-8 md:p-10 rounded-[3.5rem] cursor-pointer border border-primary-dark/5 dark:border-white/5 hover:border-accent-mustard/40 transition-all group shadow-precise-luxury text-right w-full flex flex-col h-full"
              >
                <div className="h-64 md:h-72 rounded-[2.5rem] bg-primary-light dark:bg-dark-base mb-10 flex items-center justify-center overflow-hidden relative border border-primary-dark/5 dark:border-white/5 shadow-inner">
                  <img src="/healthy_olive_leaf.png" alt="شجرة زيتون سليمة — عينة اختبار" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-accent-mustard/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                    <span className="bg-white text-primary-dark px-8 py-4 rounded-[1.5rem] font-black text-base flex items-center gap-3 shadow-2xl">
                      <Zap className="w-6 h-6 text-accent-mustard" /> ابدأ العرض
                    </span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-end gap-3 text-green-600 dark:text-green-400">
                    <span className="text-xs font-black font-outfit uppercase tracking-[0.3em]">حالة ممتازة</span>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black font-cairo text-primary-dark dark:text-white leading-tight">
                    شجرة الزيتون <span className="text-accent-mustard italic">السليمة</span>
                  </h3>
                  <p className="text-lg md:text-xl text-primary-dark/40 dark:text-white/40 font-medium leading-relaxed">اكتشف كيف يتعرف النظام على النباتات المعافاة ويقدم نصائح وقائية.</p>
                </div>
              </motion.button>

              {/* Sick Sample */}
              <motion.button 
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startDemo('sick')}
                className="bg-white dark:bg-dark-surface p-8 md:p-10 rounded-[3.5rem] cursor-pointer border border-primary-dark/5 dark:border-white/5 hover:border-red-500/40 transition-all group shadow-precise-luxury text-right w-full flex flex-col h-full"
              >
                <div className="h-64 md:h-72 rounded-[2.5rem] bg-primary-light dark:bg-dark-base mb-10 flex items-center justify-center overflow-hidden relative border border-primary-dark/5 dark:border-white/5 shadow-inner">
                  <img src="/sick_lemon_leaf.png" alt="شجرة ليمون مصابة — عينة اختبار" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                    <span className="bg-white text-red-600 px-8 py-4 rounded-[1.5rem] font-black text-base flex items-center gap-3 shadow-2xl">
                      <Zap className="w-6 h-6" /> ابدأ العرض
                    </span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-end gap-3 text-red-600 dark:text-red-400">
                    <span className="text-xs font-black font-outfit uppercase tracking-[0.3em]">تتطلب تدخل فوري</span>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black font-cairo text-primary-dark dark:text-white leading-tight">
                    شجرة الليمون <span className="text-red-500 italic">المصابة</span>
                  </h3>
                  <p className="text-lg md:text-xl text-primary-dark/40 dark:text-white/40 font-medium leading-relaxed">شاهد دقة التشخيص في كشف الأمراض الفطرية المعقدة وخطط العلاج.</p>
                </div>
              </motion.button>
            </motion.div>
          )}

          {demoStep === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-24 bg-white dark:bg-dark-surface rounded-[4rem] shadow-precise-luxury relative overflow-hidden"
              role="status"
            >
              <div className="absolute inset-0 bg-grid opacity-[0.05]" />
              <div className="relative w-64 h-64 mb-10 overflow-hidden rounded-[2.5rem] bg-black shadow-2xl">
                <img src={selectedImage} alt="صورة النبات قيد التحليل" className="w-full h-full object-cover opacity-100 brightness-75 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-accent-mustard/10" />
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-mustard shadow-[0_0_25px_rgba(225,173,1,1)] animate-scan z-20" />
              </div>
              <h3 className="text-3xl font-black text-primary-dark dark:text-white mb-4 flex items-center gap-4 font-cairo">
                <Zap className="w-8 h-8 text-accent-mustard animate-bounce" />
                جاري تشخيص العينة...
              </h3>
              <p className="text-xl text-primary-dark/40 dark:text-white/40 font-cairo font-medium">الذكاء الاصطناعي يحلل البيانات البيولوجية للصورة</p>
            </motion.div>
          )}

          {demoStep === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-end mb-6">
                <motion.button whileTap={{ scale: 0.95 }} onClick={resetDemo} className="flex items-center gap-2 px-6 py-2 bg-primary-dark/5 dark:bg-white/5 hover:bg-primary-dark/10 dark:hover:bg-white/10 rounded-full text-primary-dark dark:text-white font-bold transition-colors focus-visible:ring-2 focus-visible:ring-accent-mustard">
                  <ArrowRight className="w-4 h-4" /> تجربة عينة أخرى
                </motion.button>
              </div>
              <div className="relative z-10">
                  <ResultsDisplay result={selectedResult} error={null} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DemoPage;
