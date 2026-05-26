import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ArrowLeft, ShieldCheck, Camera, FileText } from 'lucide-react';
import CameraCapture from './CameraCapture';

const UploadArea = React.forwardRef(({ onAnalyze, loading }, ref) => {
  const [previews, setPreviews] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [warning, setWarning] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const fileInputRef = useRef(null);

  const addImages = (files) => {
    if (files.length === 0) return;
    setWarning('');

    if (previews.length >= 4) {
      setWarning('لقد وصلت بالفعل للحد الأقصى المسموح به وهو 4 صور.');
      return;
    }

    const remainingSlots = 4 - previews.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => {
          if (prev.length >= 4) return prev;
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });

    if (files.length > remainingSlots) {
      setWarning(`تم تجاهل الصور الزائدة. تم قبول ${remainingSlots} صور فقط (الحد الأقصى 4).`);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addImages(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    addImages(files);
  };

  const removeImage = (indexToRemove) => {
    setPreviews(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setWarning('');
  };

  const clearAllImages = () => {
    setPreviews([]);
    setWarning('');
    setAdditionalDetails('');
  };

  const editorialSteps = [
    { num: "01", text: "التقط صوراً واضحة للنبات" },
    { num: "02", text: "ارفع حتى 4 صور من زوايا مختلفة" },
    { num: "03", text: "احصل على تشخيص دقيق وخطة علاج" }
  ];

  return (
    <section ref={ref} className="w-full py-8 md:py-14 relative overflow-hidden" aria-label="منطقة رفع الصور">
      <AnimatePresence>
        {showCamera && (
          <CameraCapture 
            onCapture={(image) => {
              setPreviews(prev => {
                if (prev.length >= 4) {
                  setWarning('لقد وصلت للحد الأقصى (4 صور). يرجى إزالة صورة أولاً.');
                  return prev;
                }
                return [...prev, image];
              });
            }} 
            onClose={() => setShowCamera(false)} 
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-8 max-w-5xl relative z-10">
        
        <div className="mb-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-cairo text-primary-dark dark:text-white leading-tight tracking-tight"
          >
            حول جهازك إلى <span className="text-accent-mustard italic">طبيب</span> زراعي ذكي.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
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
              className={`relative rounded-[2rem] border-2 border-dashed transition-all duration-700 min-h-[350px] flex flex-col items-center justify-center p-6 md:p-8 overflow-hidden ${
                previews.length > 0 
                  ? 'border-accent-mustard bg-primary-light dark:bg-dark-surface' 
                  : 'border-primary-dark/20 dark:border-white/20 hover:border-accent-mustard/50 bg-white/50 dark:bg-white/[0.03]'
              }`}
            >
              {previews.length === 0 ? (
                <div 
                  className="text-center space-y-6 cursor-pointer relative z-10 w-full" 
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="relative inline-block group-hover:scale-105 transition-transform duration-700">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-primary-dark dark:bg-white flex items-center justify-center text-white dark:text-primary-dark shadow-luxury relative z-10 transform -rotate-3 group-hover:rotate-0 transition-transform">
                      <Upload className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-black text-primary-dark dark:text-white font-cairo">
                      أرفع حتى 4 صور <span className="text-accent-mustard italic">هنا</span>
                    </h2>
                    <p className="text-[10px] md:text-xs font-outfit text-primary-dark/30 dark:text-white/30 font-black uppercase tracking-[0.25em]">
                      نظام تشخيص متعدد اللقطات متطور
                    </p>
                  </div>

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
                <div className="w-full flex flex-col items-center z-10">
                  
                  {/* Grid layout for images */}
                  <AnimatePresence mode="popLayout">
                    <div className="w-full grid grid-cols-2 gap-4 md:gap-5">
                      {previews.map((img, index) => (
                        <motion.div 
                          key={img.slice(0, 80) + index}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className={`relative rounded-[1.5rem] overflow-hidden shadow-md border border-white/20 group aspect-[4/3] ${
                            previews.length === 1 ? 'col-span-2 aspect-[16/10] md:aspect-[16/9]' : ''
                          }`}
                        >
                          <img src={img} alt={`معاينة النبات ${index + 1}`} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          
                          {/* Number Badge */}
                          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white font-cairo text-[11px] font-bold flex items-center gap-1.5 border border-white/10 shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-mustard" />
                            <span>الصورة {index + 1}</span>
                          </div>

                          {/* Individual Delete Button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-3 left-3 p-2 bg-red-600/95 text-white rounded-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95 shadow-lg"
                            title="إزالة الصورة"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}

                      {/* Add another image glassmorphic card */}
                      {previews.length < 4 && (
                        <motion.div
                          layout
                          key="add-more-card"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={() => fileInputRef.current.click()}
                          className={`relative rounded-[1.5rem] border-2 border-dashed border-primary-dark/20 dark:border-white/20 hover:border-accent-mustard bg-white/40 dark:bg-white/[0.02] hover:bg-white/60 dark:hover:bg-white/[0.04] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer p-4 group aspect-[4/3] ${
                            previews.length === 1 ? 'col-span-2 md:col-span-1' : ''
                          }`}
                        >
                          <div className="w-11 h-11 rounded-xl bg-primary-dark/5 dark:bg-white/5 flex items-center justify-center text-primary-dark/40 dark:text-white/40 group-hover:bg-accent-mustard/20 group-hover:text-accent-mustard transition-all duration-300">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="mt-2.5 font-cairo text-xs font-bold text-primary-dark/60 dark:text-white/60 group-hover:text-accent-mustard transition-colors">إضافة لقطة أخرى ({4 - previews.length} متبقي)</span>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCamera(true);
                            }}
                            className="absolute bottom-2.5 left-2.5 p-2 rounded-xl bg-white dark:bg-white/5 border border-primary-dark/10 dark:border-white/10 hover:border-accent-mustard transition-all hover:scale-105 active:scale-95 shadow-sm"
                            title="التقاط بالكاميرا"
                          >
                            <Camera className="w-4 h-4 text-accent-mustard" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </AnimatePresence>

                  {/* حقل تفاصيل إضافية للمساعدة في دقة التشخيص */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 w-full text-right space-y-2.5"
                  >
                    <label 
                      htmlFor="plant-details" 
                      className="flex items-center justify-start gap-2 text-sm font-bold text-primary-dark/80 dark:text-white/80 font-cairo"
                    >
                      <FileText className="w-4 h-4 text-accent-mustard" />
                      <span>ملحوظات أو أعراض إضافية عن النبات (اختياري)</span>
                    </label>
                    
                    <div className="relative group/input">
                      <textarea
                        id="plant-details"
                        rows="3"
                        maxLength="400"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        placeholder="أدخل أي ملاحظات تساعد في زيادة دقة التحليل... (مثال: نرويها مرتين بالأسبوع، تنمو في تربة بيتموس، بدأت الأوراق تصفر منذ ٤ أيام)"
                        className="w-full p-4 pr-5 rounded-2xl bg-white/60 dark:bg-white/[0.02] border border-primary-dark/10 dark:border-white/10 focus:border-accent-mustard/60 dark:focus:border-accent-mustard/60 focus:bg-white dark:focus:bg-dark-base outline-none resize-none transition-all duration-300 text-sm font-cairo leading-relaxed text-primary-dark dark:text-white placeholder:text-primary-dark/30 dark:placeholder:text-white/30"
                      />
                      <div className="absolute bottom-3 left-4 text-[10px] font-bold text-primary-dark/30 dark:text-white/30 font-outfit">
                        {additionalDetails.length} / 400
                      </div>
                    </div>
                  </motion.div>

                  {/* Dynamic Alert Warning in UI */}
                  {warning && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 w-full p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 font-cairo text-sm text-center"
                    >
                      {warning}
                    </motion.div>
                  )}
                  
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-4 w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl bg-primary-dark/95 dark:bg-dark-surface/90 backdrop-blur-xl border border-white/10 shadow-precise-luxury"
                  >
                    <div className="text-right flex-1 flex flex-col gap-1">
                      <div className="flex items-center justify-start gap-2 flex-wrap">
                        <h3 className="text-lg md:text-xl font-extrabold text-white font-cairo">جاهز للتحليل</h3>
                        <span className="px-2 py-0.5 rounded-full bg-accent-mustard/20 text-accent-mustard text-[10px] font-black font-cairo" dir="rtl">
                          {previews.length} من أصل 4 صور مضافة
                        </span>
                      </div>
                      <p className="text-xs text-white/50 font-cairo font-semibold">الذكاء الاصطناعي سيقوم بمقارنة ودراسة الصور كافة لأعلى دقة تشخيصية</p>
                    </div>
                    
                    <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 w-full md:w-auto justify-center md:justify-end">
                      <button 
                        onClick={clearAllImages}
                        disabled={loading}
                        className="w-full sm:w-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold font-cairo text-xs rounded-lg transition-all border border-white/10 active:scale-95 disabled:opacity-50 text-center flex justify-center items-center"
                      >
                        مسح الكل
                      </button>
                      <button 
                        onClick={() => onAnalyze(previews, additionalDetails)}
                        disabled={loading}
                        className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-2.5 bg-accent-mustard text-primary-dark font-black font-cairo text-sm rounded-lg hover:scale-102 active:scale-98 transition-all shadow-lg disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>ابدأ تشخيص العينات</span>
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-6 flex items-center justify-center gap-3 text-primary-dark/30 dark:text-white/30 font-black font-outfit uppercase tracking-[0.2em] text-[10px] md:text-xs"
            >
              <div className="h-px w-12 bg-primary-dark/10 dark:bg-white/10" />
              <span> تحليل ذكي متعدد اللقطات متكامل </span>
              <ShieldCheck className="w-4 h-4 text-accent-mustard" />
              <div className="h-px w-12 bg-primary-dark/10 dark:bg-white/10" />
            </motion.div>
          </motion.div>
 
          <div className="lg:col-span-4 space-y-6 lg:space-y-10 py-6 lg:py-10 border-t-2 lg:border-t-0 lg:border-e-2 border-primary-dark/5 dark:border-white/5 pt-10 lg:pt-0 lg:pe-10 pe-0">
            {editorialSteps.map((step, i) => (
              <div key={i} className="text-right space-y-2 relative group">
                <span className="text-4xl md:text-6xl font-black font-outfit text-accent-mustard opacity-10 absolute -top-5 -left-3 group-hover:opacity-20 transition-opacity">
                  {step.num}
                </span>
                <h4 className="text-lg sm:text-xl md:text-2xl font-black font-cairo text-primary-dark dark:text-white leading-tight relative z-10">
                  {step.text}
                </h4>
                <div className="w-6 h-0.5 bg-accent-mustard/30 group-hover:w-12 transition-all" />
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
        multiple
        aria-label="اختر ملف صورة"
      />
    </section>
  );
});

UploadArea.displayName = 'UploadArea';
export default UploadArea;
