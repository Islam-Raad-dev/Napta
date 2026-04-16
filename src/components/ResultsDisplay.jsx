import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Activity, GraduationCap, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';

const ResultsDisplay = ({ result, error }) => {
  if (!result && !error) return null;

  return (
    <section className="py-24 bg-white/40 dark:bg-[#1A3021]/30 font-cairo transition-colors duration-300" id="results">
      <div className="container mx-auto px-8 max-w-4xl">
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 flex items-center gap-4 text-red-700 dark:text-red-400 mb-12 shadow-sm transition-colors"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-bold">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Main Badge */}
              <div className="flex justify-center mb-12">
                <div className={`px-8 py-3 rounded-full flex items-center gap-3 backdrop-blur-md shadow-luxury border transition-colors ${result.status === 'سليم' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400 dark:border-green-500/40' : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400 dark:border-red-500/40'}`}>
                  {result.status === 'سليم' ? (
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  ) : (
                    <AlertCircle className="w-6 h-6 animate-pulse" />
                  )}
                  <span className="text-xl font-bold">الحالة: {result.status}</span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Identity Card */}
                <ResultCard
                  icon={<Leaf className="w-6 h-6 text-primary-dark dark:text-accent-mustard" />}
                  title="هوية النبتة"
                  color="bg-primary-dark/[0.03] dark:bg-black/20"
                >
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-primary-dark dark:text-white transition-colors">{result.name}</h4>
                    <p className="text-primary-dark/40 dark:text-white/40 italic font-outfit transition-colors">{result.scientific_name}</p>
                  </div>
                </ResultCard>

                {/* Status/Diagnosis Card */}
                <ResultCard
                  icon={<Activity className="w-6 h-6 text-accent-mustard" />}
                  title="التشخيص الصحي"
                  color="bg-accent-mustard/[0.03] dark:bg-black/20"
                >
                  <p className="text-lg font-semibold text-primary-dark dark:text-white/90 leading-relaxed transition-colors">
                    {result.diagnosis === 'لا يوجد' ? 'نبتتك تتمتع بصحة جيدة جداً!' : result.diagnosis}
                  </p>
                </ResultCard>

              </div>

              {/* Recommendations Card - Full Width */}
              <ResultCard
                icon={<GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                title="توصيات العناية"
                color="bg-blue-50/30 dark:bg-black/20"
                fullWidth
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.recommendations.map((rec, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-[#0D1610] border border-primary-dark/5 dark:border-white/5 shadow-sm transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary-dark/5 dark:bg-white/5 flex-shrink-0 flex items-center justify-center text-primary-dark dark:text-white font-bold transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-primary-dark/80 dark:text-white/80 text-sm md:text-base leading-relaxed transition-colors">
                        {rec}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ResultCard>

              {/* Action Button */}
              <div className="text-center pt-8">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-12 py-4 bg-primary-dark text-white rounded-2xl font-bold btn-3d"
                >
                  فحص نبتة أخرى
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ResultCard = ({ icon, title, children, color, fullWidth }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-8 rounded-[2.5rem] ${color} border border-white/40 dark:border-white/5 shadow-luxury transition-all duration-300 ${fullWidth ? 'col-span-full' : ''}`}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1A3021] flex items-center justify-center shadow-sm transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary-dark/80 dark:text-white/80 transition-colors">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default ResultsDisplay;
