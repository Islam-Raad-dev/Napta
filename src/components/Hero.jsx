import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Hero = ({ onStart, onDemoClick }) => {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 500);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isTouchDevice);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);
    
    if (isTouchDevice) return () => motionQuery.removeEventListener("change", handleMotionChange);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [mouseX, mouseY]);

  const rotateXTransform = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [8, -8]);
  const rotateYTransform = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-8, 8]);

  const springConfig = { damping: 40, stiffness: 120 };
  const rotateX = useSpring(rotateXTransform, springConfig);
  const rotateY = useSpring(rotateYTransform, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const shouldAnimate = !isTouch && !prefersReducedMotion;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 md:pb-40 overflow-hidden" aria-label="القسم الرئيسي">
      


      <div className="container mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 z-10 pointer-events-none">
        
        {/* Text Content: Premium Mathematical Drama */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 w-full text-right pointer-events-auto mt-8 md:mt-24 relative z-20"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 mb-8 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/20 dark:bg-white/[0.03] text-primary-dark dark:text-white text-xs md:text-sm font-black font-outfit tracking-[0.3em] uppercase">
                ذكاء بيئي مستدام
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="font-cairo tracking-tight mb-10 text-right flex flex-col items-start lg:items-end group">
            <span className="text-4xl md:text-6xl lg:text-8xl font-black text-primary-dark dark:text-white leading-[1.3]">
              <span className="text-accent-mustard ml-2">طبيب</span> نباتك
            </span>
            <span className="text-4xl md:text-6xl lg:text-8xl font-black text-primary-dark dark:text-white italic mt-2 md:mt-4 opacity-90 leading-tight">الشخصي</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-primary-dark/60 dark:text-white/60 font-cairo max-w-[42ch] ms-auto leading-[1.8] mb-12 font-medium">
            نحوّل المرض الصامت إلى لغة مفهومة، لنمنح نباتك الرعاية التي تستحقها بدقة الذكاء الاصطناعي.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-start gap-6">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-12 py-5 bg-accent-mustard text-primary-dark font-cairo font-black text-xl hover:scale-105 active:scale-[0.97] transition-all duration-500 shadow-precise-luxury rounded-2xl"
            >
              ابدأ الفحص
            </button>
            <button 
              onClick={onDemoClick}
              className="w-full sm:w-auto px-12 py-5 bg-transparent text-primary-dark dark:text-white font-cairo font-bold text-xl border border-primary-dark/20 dark:border-white/20 hover:border-accent-mustard hover:text-accent-mustard active:scale-[0.97] transition-all duration-500 rounded-2xl"
            >
              مشاهدة عرض
            </button>
          </motion.div>
        </motion.div>

        {/* Visual Content: Architectural Scale */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex-1 w-full relative pointer-events-auto"
          style={{ perspective: "2000px" }}
        >
          <motion.div 
            style={{ 
              rotateX: shouldAnimate ? rotateX : 0, 
              rotateY: shouldAnimate ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-[50vh] md:h-[70vh] flex justify-center items-center mt-6 md:mt-0"
          >
            <motion.img 
              src="/hero_robot.png" 
              alt="روبوت نبتة الذكي" 
              className="absolute w-full max-w-[130%] h-auto z-10 object-contain scale-[1.1] lg:scale-[1.2]"
              style={{ 
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
              }}
              initial={{ y: 0 }}
              animate={prefersReducedMotion ? { y: 0 } : { y: [-10, 10, -10] }}
              transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
