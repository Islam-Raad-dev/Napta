import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Background elements */}
      <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-primary-dark/5 dark:bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-accent-mustard/5 dark:bg-accent-mustard/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full z-10 space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-sm font-bold text-primary-dark dark:text-accent-mustard mb-4">
            <Shield className="w-4 h-4" />
            <span>الحماية والأمان</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-cairo text-primary-dark dark:text-white leading-tight">
            سياسة <span className="text-accent-mustard">الخصوصية</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-dark/70 dark:text-white/70 max-w-2xl mx-auto font-cairo">
            نحن في منصة نبتة نولي اهتماماً كبيراً بخصوصية مستخدمينا وحماية بياناتهم في جميع الأوقات.
          </p>
        </motion.div>

        {/* Content Cards */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl glass-morphism border border-primary-dark/10 dark:border-white/10 shadow-luxury flex flex-col md:flex-row gap-6 relative overflow-hidden group"
          >
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary-dark/5 dark:bg-white/5 border border-primary-dark/10 dark:border-white/10 flex items-center justify-center text-primary-dark dark:text-accent-mustard group-hover:scale-110 transition-transform duration-500">
              <Eye className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-cairo text-primary-dark dark:text-white mb-3">جمع المعلومات والبيانات</h2>
              <p className="text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed">
                تقوم المنصة بجمع الصور التي تقوم برفعها بغرض وحيد وهو تحليلها بواسطة نماذج الذكاء الاصطناعي لتقديم التشخيص الدقيق لحالة النبات. نحن لا نطلب أو نجمع أي بيانات شخصية تخص هويتك لعملية التشخيص، وتصفحك للمنصة يبقى مجهول الهوية بالكامل.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl glass-morphism border border-primary-dark/10 dark:border-white/10 shadow-luxury flex flex-col md:flex-row gap-6 relative overflow-hidden group"
          >
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent-mustard/20 border border-accent-mustard/30 flex items-center justify-center text-accent-mustard group-hover:scale-110 transition-transform duration-500">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-cairo text-primary-dark dark:text-white mb-3">حماية وسلامة المعطيات</h2>
              <p className="text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed">
                نحن نستخدم بروتوكولات آمنة ومتقدمة لنقل المعلومات. جميع الصور المرفوعة يتم معالجتها لحظياً من خلال واجهات التطبيقات الآمنة ولا يتم تخزينها على خوادمنا بشكل دائم على الإطلاق، مما يضمن سريتك وحماية ملفاتك من أي وصول غير مصرح به.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl glass-morphism border border-primary-dark/10 dark:border-white/10 shadow-luxury flex flex-col md:flex-row gap-6 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent relative overflow-hidden group"
          >
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary-dark/5 dark:bg-white/5 border border-primary-dark/10 dark:border-white/10 flex items-center justify-center text-primary-dark dark:text-white group-hover:scale-110 transition-transform duration-500">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-cairo text-primary-dark dark:text-white mb-3">استخدام المعلومات ومشاركتها</h2>
              <p className="text-primary-dark/80 dark:text-white/80 font-cairo leading-relaxed">
                المعلومات المستخرجة أو النتائج التشخيصية المقدمة تستخدم حصرياً لتحسين تجربتك ومساعدتك في رعاية نباتاتك بشكل أفضل. لا نقوم أبداً ببيع أية بيانات، أو مشاركتها لأغراض تسويقية تجارية مع جهات خارجية. خصوصيتك هي أولوية "فريق الحياة".
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
