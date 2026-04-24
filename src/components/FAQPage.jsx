import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, Zap, Shield, Search } from 'lucide-react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      icon: <Zap className="w-5 h-5" />,
      question: "كيف يتم بناء الموقع؟",
      answer: "تم تصميم المنصة باستخدام أحدث مكتبات البرمجة لضمان تجربة مستخدم سلسلة وراقية، باستخدام تقنيات متطورة مثل React و JavaScript و Tailwind CSS."
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      question: "التقنيات المستخدمة في البناء؟",
      answer: "نعتمد على تقنيات معالجة الصور المتقدمة وتكامل عميق مع أقوى محركات الذكاء الاصطناعي من Google، Anthropic, OpenAI"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      question: "كيفية رفع واستخدام المنصة؟",
      answer: " كل ما عليك هو التوجه للصفحة الرئيسية، رفع صورة واضحة لنباتك، وسيتولى النظام الذكي تحليلها وتقديم النتائج والخطط العلاجية في غضون ثوانٍ."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      question: "هل بياناتي وصوري آمنة؟",
      answer: "نعم تماماً. نحن في نبتة نضع أمان البيانات في المقام الأول. لا يتم حفظ صورك الشخصية لأي أغراض تجارية."
    }
  ];

  return (
    <div className="pt-40 pb-32 px-8 min-h-screen relative overflow-hidden organic-mesh bg-grid">
      {/* Mixed Pass: Architectural Monogram Background */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] dark:opacity-[0.01] pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[30vw] font-black font-cairo absolute -right-[5%] top-[15%] -rotate-90 leading-none">مساعدة</span>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md text-xs font-black text-accent-mustard mb-8 uppercase tracking-[0.4em]"
          >
            <Search className="w-4 h-4" /> دعم وإرشاد ذكي
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-cairo text-primary-dark dark:text-white mb-6 tracking-tight leading-[1.1]">
            الأسئلة <span className="text-accent-mustard italic">الشائعة</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-dark/50 dark:text-white/50 font-cairo leading-relaxed max-w-2xl mx-auto font-medium">
            كل ما تحتاج لمعرفته حول منصة نبتة وكيفية عمل تقنياتنا الذكية في خدمتك.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className={`w-full text-right p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 border-2 flex items-center justify-between gap-8 group ${
                    isOpen 
                      ? 'bg-primary-dark dark:bg-dark-surface border-primary-dark dark:border-white/10 shadow-precise-luxury' 
                      : 'bg-white/40 dark:bg-black/20 border-primary-dark/5 dark:border-white/5 hover:border-accent-mustard/30'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6">
                    <h3 className={`text-xl md:text-2xl font-black font-cairo transition-colors duration-500 ${
                      isOpen ? 'text-white dark:text-white' : 'text-primary-dark dark:text-white opacity-90'
                    }`}>
                      {faq.question}
                    </h3>
                    <div className={`p-3 rounded-xl transition-colors duration-500 ${
                      isOpen ? 'bg-accent-mustard text-primary-dark' : 'bg-primary-dark dark:bg-white text-white dark:text-primary-dark shadow-sm'
                    }`}>
                      {faq.icon}
                    </div>
                  </div>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-500 ${
                    isOpen ? 'rotate-180 text-accent-mustard' : 'text-primary-dark/20 dark:text-white/20'
                  }`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`p-10 pt-4 font-cairo text-xl md:text-2xl leading-[1.8] font-semibold transition-colors duration-500 ${
                        isOpen ? 'text-white dark:text-white' : 'text-primary-dark/60 dark:text-white/60'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
