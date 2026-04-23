import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Microscope, Sparkles, Activity, ShieldCheck, Zap, Leaf } from 'lucide-react';

const ResultsDisplay = ({ result, error }) => {
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 rounded-[3rem] bg-red-500/5 border border-red-500/20 text-red-700 dark:text-red-400 backdrop-blur-xl flex items-center justify-between gap-8 shadow-precise-luxury max-w-4xl mx-auto"
        role="alert"
      >
        <div className="text-right flex-1">
          <h2 className="text-2xl md:text-3xl font-black font-cairo mb-2">عذراً، حدث خطأ ما</h2>
          <p className="text-lg md:text-xl font-cairo opacity-80 font-medium">{error}</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
          <AlertCircle className="w-10 h-10" />
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-20 py-20"
      id="results"
    >
      {/* 1. Master Header: The Scientific Verdict */}
      <motion.div variants={itemVariants} className="text-center space-y-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-mustard/10 blur-[100px] rounded-full" />
        
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md text-xs font-black text-accent-mustard uppercase tracking-[0.4em]">
          <Microscope className="w-4 h-4" /> تقرير تشخيصي ذكي
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black font-cairo text-primary-dark dark:text-white tracking-tight leading-tight">
            {result.plant_name}
          </h1>
          <p className="text-xl md:text-2xl font-black font-outfit text-accent-mustard italic tracking-[0.2em] opacity-90">
            {result.scientific_name}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className={`px-10 py-5 rounded-[2.5rem] flex items-center gap-5 shadow-precise-luxury border-2 transition-all duration-700 ${
            result.status === 'سليم' 
              ? 'bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-400' 
              : 'bg-red-500/5 border-red-500/20 text-red-700 dark:text-red-400'
          }`}>
            <span className="text-2xl md:text-3xl font-black font-cairo uppercase tracking-wider">{result.status}</span>
            {result.status === 'سليم' ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
          </div>
          
          <div className="px-10 py-5 rounded-[2.5rem] bg-primary-dark dark:bg-white text-white dark:text-primary-dark border border-white/10 shadow-precise-luxury flex flex-col items-center">
            <span className="text-[10px] font-black font-outfit uppercase tracking-[0.3em] opacity-40 mb-1">دقة التحليل</span>
            <span className="text-2xl md:text-3xl font-black font-outfit">{result.confidence}</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Primary Diagnostic Card */}
      <motion.div variants={itemVariants} className="max-w-6xl mx-auto px-4 md:px-0">
        <div className="p-10 md:p-20 rounded-[4rem] bg-primary-dark dark:bg-dark-surface border border-white/5 shadow-precise-luxury relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 flex flex-col items-end gap-10 border-e-2 border-white/10 pe-10 ps-6">
              <div className="w-20 h-20 rounded-3xl bg-accent-mustard flex items-center justify-center text-primary-dark shadow-lg transform -rotate-6 shrink-0">
                <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-cairo text-white text-right leading-[1.2] tracking-tight">
                التشخيص <br /> <span className="text-accent-mustard italic">المفصل</span>
              </h2>
            </div>
            
            <div className="lg:col-span-8 pt-2 px-8 md:px-0 md:ps-12">
              <p className="text-xl md:text-2xl text-white/90 font-cairo leading-[2.2] text-right font-medium break-words dir-rtl">
                {result.diagnosis}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Care Plan: Tactical Steps */}
      <motion.div variants={itemVariants} className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 px-4 md:px-0">
        <div className="lg:col-span-7 space-y-10 text-right">
          <div className="flex items-center justify-end gap-6 mb-4">
            <h2 className="text-3xl md:text-5xl font-black font-cairo text-primary-dark dark:text-white leading-tight">خطة العناية</h2>
            <div className="w-16 h-16 rounded-2xl bg-primary-dark dark:bg-white flex items-center justify-center text-white dark:text-primary-dark shadow-md">
              <Leaf className="w-8 h-8" />
            </div>
          </div>
          
          <div className="p-10 md:p-14 rounded-[3.5rem] bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-primary-dark/5 dark:border-white/5 shadow-md group hover:border-accent-mustard/30 transition-colors">
            <div className="flex items-center justify-end gap-4 mb-10">
              <span className="text-xs font-black font-outfit text-accent-mustard uppercase tracking-[0.4em]">إرشادات تقنية</span>
              <ShieldCheck className="w-6 h-6 text-accent-mustard" />
            </div>
            <div className="space-y-6">
              {result.care_instructions && result.care_instructions.split(/[▪.]/).filter(s => s.trim()).map((step, idx) => (
                <div key={idx} className="flex flex-row items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-accent-mustard/20 flex items-center justify-center text-accent-mustard font-black font-outfit text-lg shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-xl md:text-2xl text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed font-bold flex-1 text-right">
                    {step.trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Recommendation Bar */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-8 print:hidden">
          <div className="p-10 rounded-[3rem] border-2 border-dashed border-primary-dark/10 dark:border-white/10 flex items-center justify-between gap-10 group hover:border-accent-mustard/40 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-accent-mustard/10 flex items-center justify-center text-accent-mustard shrink-0">
              <Zap className="w-8 h-8" />
            </div>
            <div className="text-right">
              <h4 className="text-xl font-black font-cairo text-primary-dark dark:text-white mb-2">استجابة سريعة</h4>
              <p className="text-base font-cairo text-primary-dark/40 dark:text-white/40 leading-relaxed font-medium">ابدأ تنفيذ الخطة العلاجية فوراً لضمان أفضل النتائج</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.print()}
            className="w-full py-6 rounded-[2.5rem] bg-accent-mustard text-primary-dark font-black font-cairo text-2xl shadow-precise-luxury hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-5"
          >
            <span>حفظ التقرير الطبي</span>
            <Activity className="w-8 h-8" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;
