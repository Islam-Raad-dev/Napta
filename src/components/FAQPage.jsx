import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Code, Cloud, Cpu, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon, delay }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right p-6 rounded-2xl glass-morphism border border-primary-dark/10 dark:border-white/10 hover:border-accent-mustard/30 transition-all duration-300 flex items-start gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-accent-mustard/10 flex items-center justify-center text-accent-mustard group-hover:scale-110 transition-transform flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-cairo text-primary-dark dark:text-white">{question}</h3>
            <ChevronDown className={`w-5 h-5 text-primary-dark/30 dark:text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <p className="text-primary-dark/70 dark:text-white/70 font-cairo leading-relaxed border-t border-primary-dark/5 dark:border-white/5 pt-4">
              {answer}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

const FAQPage = ({ setCurrentPage }) => {
  const faqs = [
    {
      question: "كيف تم بناء الموقع؟",
      answer: "منصة نبتة بُنيت بتوجه هندسي يركز على السرعة والجمالية. تم تصميم الواجهات بدقة لتوفير تجربة مستخدم مريحة (UX) مع لمسات بصرية فاخرة تعكس الحداثة والاحترافية في القطاع الزراعي التقني.",
      icon: HelpCircle
    },
    {
      question: "التقنيات المستخدمة في البناء؟",
      answer: "نعتمد على حزمة برمجية حديثة تشمل React لإدارة الواجهات بمرونة، Vite كأداة بناء فائقة السرعة، Tailwind CSS للتصميم المتجاوب والأنيق، و Framer Motion لإضافة روح وحيوية للمنصة عبر الرسوم المتحركة.",
      icon: Code
    },
    {
      question: "كيفية رفع واستخدام المنصة؟",
      answer: "العملية في غاية السهولة: يمكنك رفع صورة ورقة النبات من معرض الصور أو التقاطها مباشرة. المنصة مهيأة للعمل على كافة المتصفحات الحديثة، ويمكن استضافتها على منصات السحاب مثل Netlify و Vercel لضمان توفرها الدائم.",
      icon: Cloud
    },
    {
      question: "ما هو الذكاء الاصطناعي المستخدم في الخلفية؟",
      answer: "محرك الذكاء الاصطناعي في 'نبتة' هو Gemini 1.5 Pro من Google. يتميز بقدرة هائلة على تحليل الصور وفحص أدق التفاصيل في أوراق النبات لتحديد نوع المرض وتقديم نصائح علاجية دقيقة بناءً على قاعدة بيانات زراعية ضخمة.",
      icon: Cpu
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background decorations */}
      <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-accent-mustard/5 dark:bg-accent-mustard/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-primary-dark/5 dark:bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full z-10 space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-sm font-bold text-primary-dark dark:text-accent-mustard mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>مركز المساعدة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-cairo text-primary-dark dark:text-white leading-tight">
            الأسئلة <span className="text-accent-mustard">الشائعة</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-dark/70 dark:text-white/70 max-w-2xl mx-auto font-cairo">
            كل ما تحتاج لمعرفته حول منصة نبتة وكيفية عمل تقنياتنا الذكية في خدمتك.
          </p>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              {...faq}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 border-t border-primary-dark/5 dark:border-white/5"
        >
          <p className="text-primary-dark/50 dark:text-white/50 font-cairo mb-4">لديك سؤال آخر؟</p>
          <button 
            onClick={() => {
              setCurrentPage('about');
              setTimeout(() => {
                const el = document.getElementById('team-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
            }}
            className="text-accent-mustard font-bold font-cairo hover:underline underline-offset-8"
          >
            التواصل مع مدير الفريق
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
