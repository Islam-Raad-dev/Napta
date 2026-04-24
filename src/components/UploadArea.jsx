import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ArrowLeft, ShieldCheck, Camera } from 'lucide-react';
import CameraCapture from './CameraCapture';

const UploadArea = React.forwardRef(({ onAnalyze, loading }, ref) => {
  const [preview, setPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
  };

  const editorialSteps = [
    { num: "01", text: "التقط صورة واضحة للنبات" },
    { num: "02", text: "ارفعها على منصة نبتة" },
    { num: "03", text: "احصل على التشخيص والخطة العلاجية" }
  ];

  return (
    <section ref={ref} className="w-full py-20 relative overflow-hidden" aria-label="منطقة رفع الصور">
      <AnimatePresence>
        {showCamera && (
          <CameraCapture 
            onCapture={(image) => setPreview(image)} 
            onClose={() => setShowCamera(false)} 
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-8 max-w-5xl relative z-10">
        
        {/* Mixed Pass: Centered Bold Header */}
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-black font-cairo text-primary-dark dark:text-white leading-tight tracking-tight"
          >
            حول جهازك الى <span className="text-accent-mustard italic">طبيب</span> زراعي ذكي.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Main Dropzone: Architectural Precision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 group"
          >
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`relative rounded-[2rem] border-2 border-dashed transition-all duration-700 min-h-[350px] flex flex-col items-center justify-center p-8 md:p-10 overflow-hidden ${
                preview 
                  ? 'border-accent-mustard bg-primary-light dark:bg-dark-surface' 
                  : 'border-primary-dark/20 dark:border-white/20 hover:border-accent-mustard/50 bg-white/50 dark:bg-white/[0.03]'
              }`}
            >
              {!preview ? (
                <div 
                  className="text-center space-y-6 cursor-pointer relative z-10" 
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="relative inline-block group-hover:scale-105 transition-transform duration-700">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-primary-dark dark:bg-white flex items-center justify-center text-white dark:text-primary-dark shadow-luxury relative z-10 transform -rotate-3 group-hover:rotate-0 transition-transform">
                      <Upload className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-primary-dark dark:text-white font-cairo">
                      أرفع الصورة <span className="text-accent-mustard italic">هنا</span>
                    </h2>
                    <p className="text-xs md:text-sm font-outfit text-primary-dark/30 dark:text-white/30 font-black uppercase tracking-[0.25em]">
                      نظام تشخيص متطور
                    </p>
                  </div>

                  {/* Camera Toggle Button */}
                  <div className="pt-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 w-full max-w-xs">
                      <div className="h-px flex-1 bg-primary-dark/10 dark:bg-white/10" />
                      <span className="text-[10px] font-bold text-primary-dark/20 dark:text-white/20 uppercase tracking-widest">أو</span>
                      <div className="h-px flex-1 bg-primary-dark/10 dark:bg-white/10" />
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCamera(true);
                      }}
                      className="group/btn flex items-center gap-3 px-8 py-3 bg-white dark:bg-white/5 border border-primary-dark/10 dark:border-white/10 rounded-2xl hover:border-accent-mustard transition-all shadow-sm active:scale-95"
                    >
                      <Camera className="w-5 h-5 text-accent-mustard" />
                      <span className="font-cairo font-bold text-primary-dark dark:text-white">افتح الكاميرا للتصوير</span>
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex flex-col items-center z-10"
                >
                  <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-md border border-white/20">
                    <img src={preview} alt="معاينة" className="w-full h-full object-cover" />
                    <button 
                      onClick={clearImage}
                      className="absolute top-4 left-4 p-3 bg-red-600/90 text-white rounded-xl hover:bg-red-700 transition-all shadow-xl active:scale-95 backdrop-blur-md"
                      title="إزالة الصورة"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-6 w-full flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-[2rem] bg-primary-dark/95 dark:bg-dark-surface/90 backdrop-blur-xl border border-white/10 shadow-precise-luxury"
                  >
                    <div className="text-right flex-1">
                      <h3 className="text-xl md:text-2xl font-black text-white dark:text-white font-cairo mb-1">جاهز للتحليل</h3>
                      <p className="text-base text-white/50 dark:text-white/40 font-cairo font-medium">نظام التشخيص الذكي بانتظار إشارتك</p>
                    </div>
                    <button 
                      onClick={() => onAnalyze(preview)}
                      disabled={loading}
                      className="group flex items-center justify-center gap-4 px-10 py-4 bg-accent-mustard text-primary-dark font-black font-outfit text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-4 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>ابدأ التحليل</span>
                          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            {/* Moved Protection Badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-8 flex items-center justify-center gap-3 text-primary-dark/30 dark:text-white/30 font-black font-outfit uppercase tracking-[0.3em] text-xs md:text-sm"
            >
              <div className="h-px w-12 bg-primary-dark/10 dark:bg-white/10" />
              <span> تحليل ذكي متكامل </span>
              <ShieldCheck className="w-5 h-5 text-accent-mustard" />
              <div className="h-px w-12 bg-primary-dark/10 dark:bg-white/10" />
            </motion.div>
          </motion.div>

          {/* Mixed Pass: Editorial Steps with Tactical Scaled Numbers */}
          <div className="lg:col-span-4 space-y-14 py-10 border-e-2 border-primary-dark/5 dark:border-white/5 pe-10">
            {editorialSteps.map((step, i) => (
              <div key={i} className="text-right space-y-3 relative group">
                <span className="text-6xl md:text-8xl font-black font-outfit text-accent-mustard opacity-10 absolute -top-8 -left-4 group-hover:opacity-20 transition-opacity">
                  {step.num}
                </span>
                <h4 className="text-2xl md:text-3xl font-black font-cairo text-primary-dark dark:text-white leading-tight relative z-10">
                  {step.text}
                </h4>
                <div className="w-8 h-1 bg-accent-mustard/30 group-hover:w-16 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" 
        accept="image/*" 
        aria-label="اختر ملف صورة"
      />
    </section>
  );
});

UploadArea.displayName = 'UploadArea';
export default UploadArea;
