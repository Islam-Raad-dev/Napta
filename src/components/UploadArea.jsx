import React, { useState, useRef } from 'react';
import { Upload, X, ShieldCheck, Zap, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadArea = React.forwardRef(({ onAnalyze, loading }, ref) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (preview) {
      onAnalyze(preview);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <section ref={ref} className="py-24 bg-primary-light dark:bg-[#1A3021]/50 relative overflow-hidden font-cairo transition-colors duration-300">
      <div className="container mx-auto px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark dark:text-white mb-4 transition-colors">اختبر صحة نبتتك الآن</h2>
          <p className="text-lg text-primary-dark/60 dark:text-white/60 transition-colors">ارفع صورة واضحة لنبتتك وسيقوم الطبيب الذكي بتحليلها فوراً</p>
        </div>

        <div className="relative group">
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div 
                key="dropzone"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => fileInputRef.current.click()}
                className="w-full h-80 border-2 border-dashed border-primary-dark/20 dark:border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-accent-mustard/40 hover:bg-accent-mustard/[0.02] transition-colors duration-500 bg-white dark:bg-[#0D1610] shadow-luxury"
              >
                <div className="w-16 h-16 rounded-3xl bg-primary-dark/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent-mustard/10 transition-colors">
                  <Upload className="text-primary-dark dark:text-white w-8 h-8 group-hover:text-accent-mustard dark:group-hover:text-accent-mustard transition-colors" />
                </div>
                <p className="text-xl font-bold text-primary-dark dark:text-white mb-2 transition-colors">اسحب الصورة هنا أو اضغط للرفع</p>
                <p className="text-primary-dark/40 dark:text-white/40 text-sm transition-colors">ندعم JPEG, PNG وبحد أقصى 5 ميجابايت</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </motion.div>
            ) : (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full relative rounded-[2.5rem] overflow-hidden shadow-luxury bg-white dark:bg-[#0D1610] p-4 transition-colors duration-300"
              >
                <div className="relative h-96 group/img">
                  <img src={preview} alt="Plant Preview" className="w-full h-full object-cover rounded-3xl" />
                  <button 
                    onClick={clearImage}
                    className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center">
                  <button 
                    onClick={handleUpload}
                    disabled={loading}
                    className="px-16 py-4 bg-primary-dark text-white rounded-2xl font-bold text-lg btn-3d disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>جاري التحليل...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 text-accent-mustard fill-accent-mustard" />
                        <span>تحليل النبتة بالذكاء الاصطناعي</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <BenefitCard 
            icon={<ShieldCheck className="w-6 h-6 text-accent-mustard" />} 
            title="تحليل دقيق" 
            desc="نستخدم أحدث موديلات Gemini Flash المخصصة للرؤية الحاسوبية." 
          />
          <BenefitCard 
            icon={<HeartPulse className="w-6 h-6 text-accent-mustard" />} 
            title="صحة مستدامة" 
            desc="توصيات علمية للعناية بنباتاتك وضمان نموها بشكل سليم." 
          />
          <BenefitCard 
            icon={<Zap className="w-6 h-6 text-accent-mustard" />} 
            title="نتائج فورية" 
            desc="احصل على التشخيص كاملاً في ثوانٍ معدودة دون عناء." 
          />
        </div>
      </div>
    </section>
  );
});

const BenefitCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl bg-white/50 dark:bg-black/20 border border-primary-dark/5 dark:border-white/5 hover:border-accent-mustard/20 dark:hover:border-accent-mustard/20 hover:bg-white dark:hover:bg-black/40 transition-all duration-300">
    <div className="w-12 h-12 rounded-2xl bg-accent-mustard/10 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-2 transition-colors">{title}</h3>
    <p className="text-primary-dark/60 dark:text-white/60 text-sm leading-relaxed transition-colors">{desc}</p>
  </div>
);

export default UploadArea;
