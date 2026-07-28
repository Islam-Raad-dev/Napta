import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

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
    <section dir="rtl" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-20 md:pb-28 overflow-hidden font-cairo">
      <div className="container mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 z-10 pointer-events-none">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 w-full text-right pointer-events-auto mt-4 md:mt-12 relative z-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary-dark/10 dark:border-white/10 bg-white/20 dark:bg-white/[0.03] text-primary-dark dark:text-white text-sm font-black">
              ذكاء بيئي مستدام
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="tracking-normal mb-10">
            <span className="block text-4xl sm:text-5xl lg:text-7xl font-black text-primary-dark dark:text-white leading-[1.3] mb-6">
              <span className="inline-block text-accent-mustard ml-4">طبيب</span>
              <span className="inline-block">نباتك</span>
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-7xl font-black text-primary-dark dark:text-white italic opacity-90 leading-[1.3]">
              الشخصي
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-primary-dark/70 dark:text-white/70 max-w-[45ch] leading-relaxed mb-10 font-semibold">
            نحوّل المرض الصامت إلى لغة مفهومة، لنمنح نباتك الرعاية التي تستحقها بدقة الذكاء الاصطناعي.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-3.5 bg-accent-mustard text-primary-dark font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-md rounded-xl"
            >
              ابدأ الفحص المباشر
            </button>
            <button 
              onClick={onDemoClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-primary-dark dark:text-white font-bold text-base sm:text-lg border-2 border-primary-dark/20 dark:border-white/20 hover:border-accent-mustard hover:text-accent-mustard active:scale-95 transition-all duration-300 rounded-xl"
            >
              شاهد عينة للتحليل
            </button>
          </motion.div>
        </motion.div>

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