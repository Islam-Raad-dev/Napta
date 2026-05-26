import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle2, 
  Microscope, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Leaf, 
  Cpu, 
  Printer, 
  ClipboardCheck,
  Droplet,
  Scissors,
  Sun,
  Sprout,
  Check,
  Calendar,
  Award
} from 'lucide-react';

const ResultsDisplay = ({ result, error, analyzedImages }) => {
  const [completedSteps, setCompletedSteps] = useState({});

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 md:p-8 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-700 dark:text-rose-400 backdrop-blur-md flex flex-col-reverse sm:flex-row items-center justify-between gap-4 shadow-sm max-w-2xl mx-auto"
        role="alert"
      >
        <div className="text-right flex-1">
          <h2 className="text-lg font-bold font-cairo mb-1">عذراً، حدث خطأ ما</h2>
          <p className="text-sm font-cairo opacity-80 font-semibold">{error}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const todayDate = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  // Dynamically categorize instruction steps based on keyword matches
  const parseAndCategorizeInstructions = (instructionsText) => {
    if (!instructionsText) return [];
    
    // Split by bullet symbols or dots followed by space
    const rawSteps = instructionsText
      .split(/[•▪.]/)
      .map(s => s.trim())
      .filter(s => s.length > 3);

    return rawSteps.map((stepText, idx) => {
      const lower = stepText.toLowerCase();
      let categoryInfo = {
        key: 'general',
        title: 'رعاية زراعية عامة',
        icon: <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        bg: 'bg-emerald-500/5 border-emerald-500/20 dark:bg-emerald-500/[0.02]',
        textClass: 'text-emerald-800 dark:text-emerald-300',
        printClass: 'print:bg-emerald-500/10 print:border-emerald-500/30 print:text-emerald-300'
      };

      if (/ري|سقي|ماء|مائي|تربة|جفاف|سقيا/.test(lower)) {
        categoryInfo = {
          key: 'soil',
          title: 'الري والتربة',
          icon: <Droplet className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
          bg: 'bg-sky-500/5 border-sky-500/20 dark:bg-sky-500/[0.02]',
          textClass: 'text-sky-800 dark:text-sky-300',
          printClass: 'print:bg-sky-500/10 print:border-sky-500/30 print:text-sky-300'
        };
      } else if (/تقليم|إزالة|قص|فطر|مبيد|نيم|نحاس|مرض|حشرة|بسيلا|ضرر|عدوى|عفن/.test(lower)) {
        categoryInfo = {
          key: 'protection',
          title: 'الحماية والتقليم',
          icon: <Scissors className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          bg: 'bg-rose-500/5 border-rose-500/20 dark:bg-rose-500/[0.02]',
          textClass: 'text-rose-800 dark:text-rose-300',
          printClass: 'print:bg-rose-500/10 print:border-rose-500/30 print:text-rose-300'
        };
      } else if (/سماد|تسميد|عضوي|شمس|حرارة|ضوء|رطوبة|الهواء|تهوية/.test(lower)) {
        categoryInfo = {
          key: 'environment',
          title: 'التسميد والبيئة',
          icon: <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          bg: 'bg-amber-500/5 border-amber-500/20 dark:bg-amber-500/[0.02]',
          textClass: 'text-amber-800 dark:text-amber-300',
          printClass: 'print:bg-amber-500/10 print:border-amber-500/30 print:text-amber-300'
        };
      }

      return {
        id: `step-${idx}`,
        text: stepText,
        ...categoryInfo
      };
    });
  };

  const categorizedSteps = parseAndCategorizeInstructions(result.care_instructions);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(2px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="w-full">
      {/* ================= PRINT ONLY CERTIFICATE HEADER ================= */}
      <div className="hidden print:block text-right font-cairo border-b-2 border-accent-mustard/30 pb-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-primary-dark print:text-white mb-1">منصة نبتة الزراعية الذكية</h1>
            <p className="text-xs text-primary-dark/60 print:text-white/60 font-cairo font-bold">منصة نبتة الذكية — التشخيص المخبري الرقمي</p>
          </div>
          <div className="text-left">
            <span className="text-3xl">🌿</span>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm bg-slate-50 print:bg-white/[0.03] p-4 rounded-lg border border-slate-200 print:border-white/10">
          <div>
            <p className="font-semibold text-slate-500 print:text-white/50">اسم الفحص:</p>
            <p className="font-bold text-lg text-primary-dark print:text-white">{result.plant_name}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500 print:text-white/50">التصنيف العلمي:</p>
            <p className="font-bold text-base text-primary-dark print:text-accent-mustard italic font-outfit">{result.scientific_name}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500 print:text-white/50">تاريخ إصدار التقرير:</p>
            <p className="font-bold text-primary-dark print:text-white">{todayDate}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500 print:text-white/50">الحالة الطبية:</p>
            <p className={`font-bold ${result.status === 'سليم' ? 'text-emerald-600 print:text-emerald-400' : 'text-rose-600 print:text-rose-400'}`}>
              {result.status}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-500 print:text-white/50">دقة التحليل الذكي:</p>
            <p className="font-bold text-primary-dark print:text-white">{result.confidence}</p>
          </div>
          {result.used_model && (
            <div>
              <p className="font-semibold text-slate-500 print:text-white/50">النموذج الحوسبي:</p>
              <p className="font-bold text-primary-dark print:text-white font-outfit">{result.used_model}</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= SCREEN RESULTS CONTAINER ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 py-6 md:py-10 max-w-4xl mx-auto px-1 print:p-0 print:space-y-6"
        id="results"
      >
        {/* 1. Header Card */}
        <motion.div variants={itemVariants} className="text-center space-y-4 relative print:hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-mustard/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md text-[10px] font-bold text-accent-mustard uppercase tracking-widest">
            <Microscope className="w-3.5 h-3.5 text-accent-mustard animate-pulse" />
            <span>تقرير التشخيص الزراعي الذكي</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-primary-dark dark:text-white tracking-tight leading-tight">
              {result.plant_name}
            </h1>
            <p className="text-xs sm:text-sm font-bold font-outfit text-accent-mustard/90 italic tracking-wider">
              {result.scientific_name}
            </p>
          </div>

          {/* Badges dashboard */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
            {/* Status Badge */}
            <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 text-xs font-bold font-cairo shadow-sm backdrop-blur-md ${
              result.status === 'سليم'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : result.status === 'ليس نبات' || result.status === 'نباتات مختلفة'
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  result.status === 'سليم' ? 'bg-emerald-500' : result.status === 'ليس نبات' || result.status === 'نباتات مختلفة' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  result.status === 'سليم' ? 'bg-emerald-500' : result.status === 'ليس نبات' || result.status === 'نباتات مختلفة' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
              </span>
              <span>الحالة: {result.status === 'سليم' ? 'سليم ومعافى' : result.status === 'ليس نبات' || result.status === 'نباتات مختلفة' ? result.status : 'يحتاج رعاية فورية'}</span>
            </div>

            {/* Confidence Badge */}
            <div className="px-3 py-1.5 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md flex items-center gap-1.5 text-xs font-bold font-cairo text-primary-dark/80 dark:text-white/80 shadow-sm">
              <Activity className="w-3.5 h-3.5 text-accent-mustard" />
              <span>الدقة: {result.confidence}</span>
            </div>

            {/* AI Model Badge */}
            {result.used_model && (
              <div className="px-3 py-1.5 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md flex items-center gap-1.5 text-xs font-bold font-cairo text-primary-dark/80 dark:text-white/80 shadow-sm" dir="ltr">
                <Cpu className="w-3.5 h-3.5 text-accent-mustard" />
                <span>{result.used_model}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* 2. Show examined images (print: hidden) */}
        {analyzedImages && analyzedImages.length > 0 && (
          <motion.div variants={itemVariants} className="w-full print:hidden">
            <div className="p-4 md:p-6 rounded-2xl bg-white/50 dark:bg-black/25 backdrop-blur-md border border-primary-dark/5 dark:border-white/5 shadow-sm text-right">
              <div className="flex items-center justify-start gap-2 mb-4 border-b border-primary-dark/5 dark:border-white/5 pb-3">
                <Leaf className="w-4 h-4 text-accent-mustard" />
                <h2 className="text-sm md:text-base font-bold font-cairo text-primary-dark dark:text-white">اللقطات المفحوصة </h2>
              </div>

              <div className={`grid gap-3 ${
                analyzedImages.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                  analyzedImages.length === 2 ? 'grid-cols-2 max-w-lg mx-auto' :
                    analyzedImages.length === 3 ? 'grid-cols-3' :
                      'grid-cols-2 md:grid-cols-4'
              }`}>
                {analyzedImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden aspect-[4/3] border border-primary-dark/5 dark:border-white/10 shadow-sm group">
                    <img src={img} alt={`تفاصيل الصورة ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-sm text-white font-cairo text-[9px] font-bold flex items-center gap-1 border border-white/5">
                      <span className="w-1 h-1 rounded-full bg-accent-mustard" />
                      <span>لقطة فحص {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Medical Diagnosis Card */}
        <motion.div variants={itemVariants} className="w-full print:block print:w-full">
          <div className="p-5 md:p-6 rounded-2xl bg-white/60 dark:bg-[#121212]/40 backdrop-blur-md border border-primary-dark/5 dark:border-white/10 shadow-sm text-right space-y-3 print-card">
            <div className="flex items-center justify-start gap-2 border-b border-primary-dark/5 dark:border-white/5 pb-2.5 print:pb-1">
              <Microscope className="w-4 h-4 text-accent-mustard print:hidden" />
              <h3 className="text-sm sm:text-base font-bold font-cairo text-primary-dark dark:text-white">نتائج الفحص والتشخيص </h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-primary-dark/95 dark:text-white/95 print:text-white/95 font-cairo leading-relaxed font-semibold break-words">
              {result.diagnosis}
            </p>
          </div>
        </motion.div>

        {/* 4. Categorized Treatment steps and save actions */}
        {result.status !== 'ليس نبات' && result.status !== 'نباتات مختلفة' && (
          <motion.div variants={itemVariants} className="grid lg:grid-cols-12 gap-5 w-full items-start print:block print:w-full print:space-y-6">
            
            {/* Categorized Treatment Checkboxes */}
            <div className="lg:col-span-8 p-5 md:p-6 rounded-2xl bg-white/60 dark:bg-[#121212]/40 backdrop-blur-md border border-primary-dark/5 dark:border-white/10 shadow-sm text-right space-y-4 w-full print-card print:mt-6">
              <div className="flex items-center justify-start gap-2 border-b border-primary-dark/5 dark:border-white/5 pb-3 print:pb-1">
                <ClipboardCheck className="w-4 h-4 text-accent-mustard print:hidden" />
                <h3 className="text-sm sm:text-base font-bold font-cairo text-primary-dark dark:text-white">توصيات الخطة العلاجية والوقائية</h3>
              </div>

              {categorizedSteps.length > 0 ? (
                <div className="space-y-3.5">
                  {categorizedSteps.map((step) => {
                    const isCompleted = !!completedSteps[step.id];
                    return (
                      <div 
                        key={step.id} 
                        onClick={() => toggleStep(step.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer select-none group/step ${
                          isCompleted 
                            ? 'bg-slate-100/50 dark:bg-white/[0.01] border-slate-200/50 dark:border-white/5 opacity-60' 
                            : 'bg-white dark:bg-black/15 border-primary-dark/5 dark:border-white/5 hover:border-accent-mustard/30'
                        } print:border-none print:bg-transparent print:p-0 print:opacity-100`}
                      >
                        {/* Interactive Checkbox in screen, hidden in print */}
                        <div className="flex-shrink-0 mt-0.5 print:hidden">
                          <button
                            type="button"
                            aria-label={`تحديد الخطوة ${step.text}`}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              isCompleted 
                                ? 'bg-accent-mustard border-accent-mustard text-primary-dark scale-100' 
                                : 'border-primary-dark/20 dark:border-white/20 group-hover/step:border-accent-mustard/60'
                            }`}
                          >
                            <AnimatePresence>
                              {isCompleted && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>

                        {/* Text and Category indicator */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-start gap-1.5 flex-wrap">
                            <span className="print:hidden">{step.icon}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black font-cairo border ${step.bg} ${step.textClass} ${step.printClass}`}>
                              {step.title}
                            </span>
                          </div>
                          
                          <p className={`text-xs sm:text-sm text-primary-dark/85 dark:text-white/85 font-cairo leading-relaxed font-medium transition-all ${
                            isCompleted ? 'line-through text-primary-dark/40 dark:text-white/40' : ''
                          } print:text-white print:no-underline`}>
                            {step.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-primary-dark/60 dark:text-white/40 font-cairo text-center py-4">لا توجد توصيات علاجية مفصلة متوفرة.</p>
              )}
            </div>

            {/* Quick Actions & Print CTA (hidden in print) */}
            <div className="lg:col-span-4 space-y-3.5 w-full print:hidden">
              {/* Warning/Urgency Card */}
              <div className="p-4 rounded-xl bg-white/60 dark:bg-[#121212]/40 backdrop-blur-md border border-primary-dark/5 dark:border-white/10 flex items-center justify-between gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-accent-mustard/15 flex items-center justify-center text-accent-mustard shrink-0">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div className="text-right flex-1">
                  <h4 className="text-xs sm:text-sm font-bold font-cairo text-primary-dark dark:text-white mb-0.5">سرعة الاستجابة</h4>
                  <p className="text-[10px] sm:text-xs font-cairo text-primary-dark/50 dark:text-white/40 leading-relaxed font-semibold">باشر بالعلاج الآن للحد من تفشي الضرر بالنبات.</p>
                </div>
              </div>

              {/* Action Button: Print */}
              <button
                onClick={() => window.print()}
                className="w-full py-3 rounded-xl bg-accent-mustard hover:bg-accent-mustard/90 text-primary-dark font-bold font-cairo text-xs sm:text-sm shadow-sm hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 border border-accent-mustard/20"
              >
                <Printer className="w-4 h-4" />
                <span>حفظ أو تصدير التقرير الطبي</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ================= PRINT ONLY SIGNATURE STAMP ================= */}
      <div className="hidden print:block mt-12 text-center font-cairo">
        <div className="flex justify-between items-end border-t border-slate-200 print:border-white/10 pt-6">
          <div className="text-right">
            <p className="text-xs text-slate-400 print:text-white/40">توقيع خبير نبتة الذكي</p>
            <p className="font-bold text-primary-dark print:text-white mt-2 font-cairo text-sm">خبير نبتة بالذكاء الاصطناعي</p>
          </div>
          <div className="text-center p-3 border-2 border-dashed border-accent-mustard/50 rounded-full inline-block">
            <span className="text-[10px] font-black text-accent-mustard uppercase tracking-widest font-cairo">
              تقرير معتمد
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-400 print:text-white/40">وثيقة إلكترونية معتمدة</p>
            <p className="font-bold text-slate-700 print:text-white/70 mt-2 text-xs">رقم الفحص: #{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
