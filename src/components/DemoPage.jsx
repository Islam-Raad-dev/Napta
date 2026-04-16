import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ImageIcon, ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import ResultsDisplay from './ResultsDisplay';

const DemoPage = () => {
  const [demoStep, setDemoStep] = useState(0); // 0: Select, 1: Scanning, 2: Result
  
  // Dummy result for healthy plant
  const dummyResultHealthy = {
    isPlant: true,
    diagnosis: "نبات سليم وصحي",
    confidence: "99%",
    details: "لا توجد أي علامات للأمراض الجسدية أو الفطرية في هذا النبات. الأوراق تبدو خضراء ولها بنية سليمة.",
    treatments: [
      "الاستمرار في الري المنتظم حسب نوع النبات.",
      "توفير الإضاءة المناسبة للنمو المثالي.",
      "مسح الأوراق بلطف لإزالة الغبار للسماح بتنفس أفضل."
    ],
    recommendations: "يفضل إضافة سماد سائل مخفف مرة واحدة كل أسبوعين خلال فصل الربيع."
  };

  // Dummy result for sick plant
  const dummyResultSick = {
    isPlant: true,
    diagnosis: "إصابة بمرض البياض الدقيقي (Powdery Mildew)",
    confidence: "94%",
    details: "تظهر على الأوراق بقع بيضاء تشبه المسحوق، وهو مؤشر واضح على وجود فطر البياض الدقيقي الناتجة عن رطوبة عالية مع ضعف التهوية.",
    treatments: [
      "إزالة الأوراق المصابة بشدة والتخلص منها بعيداً لمنع انتشار الفطر.",
      "رش النبات بمبيد فطري مناسب أو خليط من الماء وصودا الخبز.",
      "تقليل الرطوبة حول النبات وتحسين التهوية."
    ],
    recommendations: "الري من الأسفل لتجنب بلل الأوراق، ووضع النبات في مكان جيد التهوية بعيداً عن النباتات السليمة مؤقتاً."
  };

  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const startDemo = (type) => {
    setDemoStep(1);
    setSelectedImage(type === 'healthy' ? '/hero_plant.png' : 'https://images.unsplash.com/photo-1616462711718-47a3e7dbad2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'); // Mock image for sick plant
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
        <div className="flex justify-center items-center gap-4 mb-12">
          {['اختر العينة', 'جاري التحليل', 'النتيجة'].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg 
                ${demoStep >= idx 
                  ? 'bg-accent-mustard text-primary-dark shadow-lg ring-4 ring-accent-mustard/20' 
                  : 'bg-white dark:bg-[#1A2C21] text-primary-dark/40 dark:text-white/40 border-2 border-dashed border-primary-dark/20 dark:border-white/20'
                } transition-all duration-300`}
              >
                {demoStep > idx ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
              </div>
              {idx < 2 && (
                <div className={`h-1 w-16 md:w-24 rounded-full ${demoStep > idx ? 'bg-accent-mustard' : 'bg-primary-dark/10 dark:bg-white/10'} transition-all duration-300`} />
              )}
            </div>
          ))}
        </div>

        {demoStep === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Healthy Sample */}
            <div 
              onClick={() => startDemo('healthy')}
              className="bg-white dark:bg-[#1A2C21] p-6 rounded-3xl cursor-pointer hover:ring-2 hover:ring-accent-mustard transition-all group shadow-xl"
            >
              <div className="h-48 rounded-2xl bg-[#E8F3EE] dark:bg-[#122318] mb-6 flex items-center justify-center overflow-hidden relative">
                <img src="/hero_plant.png" alt="Healthy" className="w-32 h-auto object-contain group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="bg-white/90 text-primary-dark px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4" /> اختر العينة
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-primary-dark dark:text-white mb-2">
                <CheckCircle2 className="text-green-500 w-5 h-5" /> نبات سليم
              </h3>
              <p className="text-sm text-primary-dark/60 dark:text-white/60">اختر هذه العينة لترى كيف تتعرف المنصة على النباتات السليمة وتقدم نصائح للعناية العامة.</p>
            </div>

            {/* Sick Sample */}
            <div 
              onClick={() => startDemo('sick')}
              className="bg-white dark:bg-[#1A2C21] p-6 rounded-3xl cursor-pointer hover:ring-2 hover:ring-red-500 transition-all group shadow-xl"
            >
              <div className="h-48 rounded-2xl bg-red-50 dark:bg-red-900/10 mb-6 flex items-center justify-center overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1616462711718-47a3e7dbad2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Sick" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="bg-white/90 text-red-600 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4" /> اختر العينة
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-primary-dark dark:text-white mb-2">
                <AlertTriangle className="text-red-500 w-5 h-5" /> نبات مصاب
              </h3>
              <p className="text-sm text-primary-dark/60 dark:text-white/60">اختر هذه العينة لترى كيف يتم تشخيص الأمراض النباتية وتوفير خطط علاج مفصلة.</p>
            </div>
          </motion.div>
        )}

        {demoStep === 1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1A2C21] rounded-3xl shadow-xl"
          >
            <div className="relative w-48 h-48 mb-8">
              <img src={selectedImage} alt="Scanning" className="w-full h-full object-cover rounded-2xl opacity-50" />
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-mustard shadow-[0_0_15px_rgba(225,173,1,1)] scan-line-animation rounded-full" />
            </div>
            <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-accent-mustard animate-pulse" />
              جاري فحص النبات...
            </h3>
            <p className="text-primary-dark/60 dark:text-white/60">الذكاء الاصطناعي يقوم الآن بتحليل أدق تفاصيل الصورة...</p>
          </motion.div>
        )}

        {demoStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-end mb-6">
              <button onClick={resetDemo} className="flex items-center gap-2 px-6 py-2 bg-primary-dark/5 dark:bg-white/5 hover:bg-primary-dark/10 dark:hover:bg-white/10 rounded-full text-primary-dark dark:text-white font-bold transition-colors">
                <ArrowLeft className="w-4 h-4" /> تجربة عينة أخرى
              </button>
            </div>
            <div className="pointer-events-none">
                <ResultsDisplay result={selectedResult} error={null} />
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .scan-line-animation {
          animation: scan 2s linear infinite;
        }
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </motion.div>
  );
};

export default DemoPage;
