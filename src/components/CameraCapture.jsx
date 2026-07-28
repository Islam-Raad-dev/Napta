import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, RotateCcw, Check, Sparkles, 
  Activity, CheckCircle2, AlertTriangle, Gauge, Zap
} from 'lucide-react';    

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const analysisCanvasRef = useRef(null);
  
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  // --- ميزات الذكاء الاصطناعي والمستشعرات في الوقت الحقيقي ---
  const [isSmartScan, setIsSmartScan] = useState(true); // تشغيل المسح والتحليل الذكي حياً
  const [isAutoCapture, setIsAutoCapture] = useState(true); // تشغيل الالتقاط التلقائي عند جودة الصورة الممتازة
  const [showTelemetry, setShowTelemetry] = useState(false); // إظهار لوحة البيانات المجهرية الفنية
  const [isTriggeringCapture, setIsTriggeringCapture] = useState(false); // لمحاكاة فلاش الغالق البصري
  
  // قيم المستشعرات المباشرة
  const [brightnessValue, setBrightnessValue] = useState(120);
  const [greenPercentage, setGreenPercentage] = useState(0);
  const [sharpnessValue, setSharpnessValue] = useState(8);
  const [countdown, setCountdown] = useState(0); // التقدم للالتقاط التلقائي (0-100)

  // حالات الجودة والإرشاد
  const [status, setStatus] = useState({
    isPlantDetected: false,
    isLightPerfect: true,
    isSharp: true
  });
  
  const [guidanceText, setGuidanceText] = useState("جاري بدء المستشعر البصري الذكي...");
  const [guidanceType, setGuidanceType] = useState("info"); // 'info' | 'warning' | 'success'

  // مراجع مرنة لتجنب إغلاق المتغيرات المستمرة في requestAnimationFrame (Stale Closures)
  const autoCaptureRef = useRef(isAutoCapture);
  const smartScanRef = useRef(isSmartScan);
  const capturedImageRef = useRef(capturedImage);
  const streamRef = useRef(stream);
  const isCapturingRef = useRef(false); // حماية من الالتقاط المزدوج

  useEffect(() => {
    autoCaptureRef.current = isAutoCapture;
  }, [isAutoCapture]);

  useEffect(() => {
    smartScanRef.current = isSmartScan;
  }, [isSmartScan]);

  useEffect(() => {
    capturedImageRef.current = capturedImage;
  }, [capturedImage]);

  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  // تشغيل الكاميرا
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: isFrontCamera ? 'user' : 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("تعذر الوصول إلى الكاميرا. يرجى التحقق من أذونات المتصفح.");
    }
  };

  const stopCamera = useCallback(() => {
    const currentStream = streamRef.current;
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [isFrontCamera]);

  // التقاط الصورة يدوياً أو تلقائياً
  const capturePhoto = useCallback(() => {
    if (isCapturingRef.current) return; // حماية من الاستدعاء المزدوج
    if (videoRef.current && canvasRef.current) {
      isCapturingRef.current = true;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      stopCamera();
      // إعادة تعيين الحماية بعد تأخير بسيط
      setTimeout(() => { isCapturingRef.current = false; }, 300);
    }
  }, [stopCamera]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(0);
    isCapturingRef.current = false;
    startCamera();
  };

  const confirmPhoto = () => {
    onCapture(capturedImage);
    onClose();
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  // --- محرك تحليل الإطارات حياً بالخلفية (Digital Image Processing Engine) ---
  useEffect(() => {
    if (!stream || capturedImage) return;

    const video = videoRef.current;
    const analysisCanvas = analysisCanvasRef.current;
    if (!video || !analysisCanvas) return;

    let animationFrameId;
    let lastAnalyzed = 0;
    let currentProgress = 0;

    const ctx = analysisCanvas.getContext('2d', { willReadFrequently: true });
    analysisCanvas.width = 120; // دقة منخفضة لحسابات فائقة السرعة
    analysisCanvas.height = 90;

    const tick = () => {
      // التأكد من استقرار تدفق الفيديو
      if (video.readyState === video.HAVE_ENOUGH_DATA && !capturedImageRef.current) {
        const now = Date.now();
        
        // التحليل بتردد 8 إطارات بالثانية لمنع استهلاك المعالج وتوفير الطاقة
        if (now - lastAnalyzed > 120) {
          lastAnalyzed = now;

          if (smartScanRef.current) {
            try {
              ctx.drawImage(video, 0, 0, analysisCanvas.width, analysisCanvas.height);
              const imgData = ctx.getImageData(0, 0, analysisCanvas.width, analysisCanvas.height);
              const data = imgData.data;
              const width = analysisCanvas.width;
              const height = analysisCanvas.height;

              // 1. حساب شدة السطوع المتوسطة (Brightness)
              let brightnessSum = 0;
              for (let i = 0; i < data.length; i += 4) {
                brightnessSum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
              }
              const avgBrightness = brightnessSum / (width * height);

              // 2. حساب نسبة خضار النبات بالمركز (Plant Presence Check)
              let greenPixels = 0;
              let centerPixels = 0;
              
              // التركيز على المنطقة الوسطى 60% لتجنب تشتيت الخلفية
              const startX = Math.floor(width * 0.2);
              const endX = Math.floor(width * 0.8);
              const startY = Math.floor(height * 0.2);
              const endY = Math.floor(height * 0.8);

              for (let y = startY; y < endY; y++) {
                for (let x = startX; x < endX; x++) {
                  const idx = (y * width + x) * 4;
                  const r = data[idx];
                  const g = data[idx + 1];
                  const b = data[idx + 2];

                  // مؤشر الخضار المعتمد على تباين القنوات
                  const exg = 2 * g - r - b;
                  if (exg > 15 && g > r * 1.05 && g > b * 1.05 && g > 45) {
                    greenPixels++;
                  }
                  centerPixels++;
                }
              }
              const greenRatio = (greenPixels / centerPixels) * 100;

              // 3. حساب حدة الحواف والاهتزاز (Sharpness / High-Frequency Edge Check)
              let diffSum = 0;
              let count = 0;
              for (let y = 2; y < height - 2; y += 2) {
                for (let x = 2; x < width - 2; x += 2) {
                  const idx = (y * width + x) * 4;
                  const idxRight = (y * width + (x + 1)) * 4;
                  const idxDown = ((y + 1) * width + x) * 4;

                  const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
                  const valRight = 0.299 * data[idxRight] + 0.587 * data[idxRight + 1] + 0.114 * data[idxRight + 2];
                  const valDown = 0.299 * data[idxDown] + 0.587 * data[idxDown + 1] + 0.114 * data[idxDown + 2];

                  diffSum += Math.abs(val - valRight) + Math.abs(val - valDown);
                  count += 2;
                }
              }
              const sharpness = diffSum / count;

              // تحديث الواجهة بالقيم المحسوبة
              setBrightnessValue(Math.round(avgBrightness));
              setGreenPercentage(Math.round(greenRatio));
              setSharpnessValue(Math.round(sharpness));

              // تقييم معايير الجودة للتشخيص
              const isLightIdeal = avgBrightness >= 50 && avgBrightness <= 235;
              const isTooDark = avgBrightness < 50;
              const isTooBright = avgBrightness > 235;
              const isPlantDetected = greenRatio >= 18;
              const isPlantNear = greenRatio >= 2;
              const isSharp = sharpness >= 5.5;

              setStatus({ isPlantDetected, isLightPerfect: isLightIdeal, isSharp });

              // خوارزمية التوجيه الذكي للمزارع
              if (!isPlantNear) {
                setGuidanceText("وجّه عدسة الكاميرا نحو أوراق النبات أو الجزء المصاب 🌿");
                setGuidanceType("info");
                resetCountdown();
              } else if (!isPlantDetected) {
                setGuidanceText("اقترب أكثر من أوراق النبات أو ثبّتها في منتصف الإطار 🌿");
                setGuidanceType("info");
                resetCountdown();
              } else if (isTooDark) {
                setGuidanceText("الإضاءة خافتة جداً! حاول الاقتراب من الضوء أو تفعيل الفلاش 💡");
                setGuidanceType("warning");
                resetCountdown();
              } else if (isTooBright) {
                setGuidanceText("الإضاءة شديدة السطوع! تجنب أشعة الشمس المباشرة الحارقة ☀️");
                setGuidanceType("warning");
                resetCountdown();
              } else if (!isSharp) {
                setGuidanceText("الصورة مهتزة أو الكاميرا تتحرك. ثبّت يدك من فضلك ⏳");
                setGuidanceType("warning");
                resetCountdown();
              } else {
                setGuidanceText("الوضوح ممتاز والإضاءة مثالية! ثبت يدك للالتقاط التلقائي... 📸");
                setGuidanceType("success");

                // تشغيل العد التنازلي التلقائي عند استقرار وجودة المعايير
                if (autoCaptureRef.current) {
                  currentProgress += 10; // يكتمل العداد في حوالي 1.2 ثانية
                  if (currentProgress >= 100) {
                    currentProgress = 100;
                    setCountdown(100);
                    triggerAutoShutter();
                  } else {
                    setCountdown(currentProgress);
                  }
                }
              }
            } catch (err) {
              console.warn("DIP Engine frame error:", err);
            }
          } else {
            // في حال إغلاق وضع التحليل الذكي
            setGuidanceText("وضع الالتقاط اليدوي مفعل. انقر على زر الكاميرا للتصوير.");
            setGuidanceType("info");
            resetCountdown();
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    const resetCountdown = () => {
      currentProgress = 0;
      setCountdown(0);
    };

    const triggerAutoShutter = () => {
      setIsTriggeringCapture(true);
      // تشغيل فلاش محاكي والتقاط
      setTimeout(() => {
        capturePhoto();
        setIsTriggeringCapture(false);
      }, 150);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stream, isSmartScan, capturedImage]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 font-cairo select-none"
    >
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden bg-dark-base shadow-2xl border border-white/10 flex items-center justify-center">
        
        {/* تأثير الفلاش عند الالتقاط التلقائي أو اليدوي */}
        <AnimatePresence>
          {isTriggeringCapture && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[120] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* الكاميرا المباشرة */}
        {!capturedImage ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover"
            />

            {error && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-10 text-center z-50">
                <AlertTriangle className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
                <p className="text-white text-lg font-bold">{error}</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-bold"
                >
                  الرجوع للخلف
                </button>
              </div>
            )}

            {/* 1. ماسح الليزر البصري المستمر (AI Scanner Beam Effect) */}
            {isSmartScan && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
                {/* خط ليزر متحرك */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-accent-mustard to-transparent opacity-80 shadow-[0_0_15px_#e1ad01] absolute animate-scan-beam" />
                
                {/* شبكة تركيز دائرية في المنتصف */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center ${
                    status.isPlantDetected && status.isLightPerfect && status.isSharp
                      ? 'border-emerald-500 scale-102 bg-emerald-500/5 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                      : status.isPlantDetected
                      ? 'border-amber-500 bg-amber-500/5'
                      : 'border-white/20'
                  }`}>
                    {/* زوايا استشعار مجهرية */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accent-mustard rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accent-mustard rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accent-mustard rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accent-mustard rounded-br-lg" />
                    
                    {/* النقطة المركزية */}
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      status.isPlantDetected ? 'bg-emerald-500 animate-ping' : 'bg-white/40'
                    }`} />
                  </div>
                </div>
              </div>
            )}

            {/* 2. شريط الحالة الإرشادي التفاعلي العلوي (Smart Floating Status) */}
            <div className="absolute top-6 left-6 right-6 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none z-30">
              <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-md border shadow-lg max-w-full transition-all duration-300 ${
                guidanceType === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
                  : guidanceType === 'warning'
                  ? 'bg-amber-950/80 border-amber-500/30 text-amber-300'
                  : 'bg-black/70 border-white/10 text-white/90'
              }`}>
                {guidanceType === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 animate-pulse shrink-0" />
                ) : guidanceType === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 animate-bounce shrink-0" />
                ) : (
                  <Sparkles className="w-5 h-5 text-accent-mustard shrink-0 animate-spin-slow" />
                )}
                <span className="text-xs md:text-sm font-bold leading-tight">{guidanceText}</span>
              </div>

              {/* أزرار التبديل للميزات الذكية */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsSmartScan(!isSmartScan)}
                  className={`p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 shadow-md ${
                    isSmartScan 
                      ? 'bg-accent-mustard/20 border-accent-mustard text-accent-mustard' 
                      : 'bg-black/60 border-white/10 text-white/50 hover:text-white'
                  }`}
                  title="تفعيل/تعطيل تحليل الكاميرا الحي"
                >
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">مسح حي ذكي</span>
                </button>

                {isSmartScan && (
                  <button
                    onClick={() => setIsAutoCapture(!isAutoCapture)}
                    className={`p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 shadow-md ${
                      isAutoCapture 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                        : 'bg-black/60 border-white/10 text-white/50 hover:text-white'
                    }`}
                    title="التقاط تلقائي فوري بمجرد وضوح الصورة"
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold hidden sm:inline">التقاط تلقائي</span>
                  </button>
                )}

                <button
                  onClick={() => setShowTelemetry(!showTelemetry)}
                  className={`p-2.5 rounded-xl border backdrop-blur-md transition-all text-white/70 hover:text-white shadow-md ${
                    showTelemetry ? 'bg-white/15 border-white/30' : 'bg-black/60 border-white/10'
                  }`}
                  title="عرض بيانات المستشعر الفنية"
                >
                  <Gauge className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. لوحة البيانات المجهرية الفنية للتحليل (Smart Telemetry Overlay) */}
            <AnimatePresence>
              {isSmartScan && showTelemetry && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute left-6 top-24 bottom-24 w-60 bg-black/85 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-2xl z-30"
                >
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent-mustard" />
                    <span>مجسات نبتة المباشرة</span>
                  </h4>

                  <div className="space-y-4 my-auto">
                    {/* الإضاءة */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-white/60">
                        <span>مستوى الإضاءة</span>
                        <span className={status.isLightPerfect ? 'text-emerald-400' : 'text-amber-400'}>
                          {brightnessValue} / 255
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${status.isLightPerfect ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${(brightnessValue / 255) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* خضار النبات */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-white/60">
                        <span>مكتشف الأوراق الخضراء</span>
                        <span className={status.isPlantDetected ? 'text-emerald-400' : 'text-white/40'}>
                          {greenPercentage}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${status.isPlantDetected ? 'bg-emerald-500' : 'bg-white/30'}`} 
                          style={{ width: `${Math.min(greenPercentage * 3, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* الاستقرار والوضوح */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-white/60">
                        <span>مقياس تباين الحواف (الوضوح)</span>
                        <span className={status.isSharp ? 'text-emerald-400' : 'text-amber-400'}>
                          {sharpnessValue} / 12
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${status.isSharp ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${Math.min((sharpnessValue / 12) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-white/40 leading-relaxed pt-2 border-t border-white/5">
                    التحليل يتم محلياً وبسرعة فائقة لحساب معايير الضوء ومطابقة اللون الأخضر.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. أزرار التحكم السفلية (Camera Smart Overlays Controls) */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 z-30">
              
              {/* تبديل الكاميرا */}
              <button 
                onClick={toggleCamera}
                className="p-4 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95"
                title="تبديل الكاميرا"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              
              {/* زر التصوير الرئيسي التفاعلي */}
              <div className="relative flex items-center justify-center">
                {/* عداد دائري متحرك للالتقاط التلقائي الذكي */}
                {isSmartScan && isAutoCapture && countdown > 0 && (
                  <svg className="absolute w-24 h-24 transform -rotate-90 pointer-events-none z-10">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="#e1ad01"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - countdown / 100)}
                      className="transition-all duration-100 ease-out"
                    />
                  </svg>
                )}

                <button 
                  onClick={capturePhoto}
                  className={`w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary-dark shadow-luxury hover:scale-105 active:scale-95 transition-all relative z-20 ${
                    isSmartScan && isAutoCapture && countdown > 0 ? 'bg-accent-mustard text-white animate-pulse' : ''
                  }`}
                  title="التقط صورة"
                >
                  <Camera className="w-10 h-10" />
                </button>
              </div>

              {/* إغلاق الكاميرا */}
              <button 
                onClick={onClose}
                className="p-4 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          /* شاشة المعاينة بعد الالتقاط (Image Preview) */
          <>
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 z-30">
              <button 
                onClick={retakePhoto}
                className="flex items-center gap-3 px-8 py-4 bg-black/60 hover:bg-black/80 text-white rounded-2xl transition-all backdrop-blur-md border border-white/10 font-bold hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                <span>إعادة التصوير</span>
              </button>
              
              <button 
                onClick={confirmPhoto}
                className="flex items-center gap-3 px-10 py-4 bg-accent-mustard text-primary-dark rounded-2xl transition-all shadow-lg font-bold hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,173,1,0.3)]"
              >
                <Check className="w-6 h-6" />
                <span>استخدام هذه الصورة</span>
              </button>
            </div>
          </>
        )}

        {/* زر إغلاق علوي سريع (Top Right Close) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-md border border-white/5 z-40"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* الكانفاس المخفي للتحليل الرقمي السريع */}
      <canvas ref={analysisCanvasRef} className="hidden" />
      
      {/* الكانفاس المخفي لالتقاط الصورة عالية الجودة */}
      <canvas ref={canvasRef} className="hidden" />
      
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-6 text-white/50 text-center max-w-lg leading-relaxed text-xs md:text-sm px-6"
      >
        {isSmartScan ? (
          <span className="flex items-center justify-center gap-1.5 text-accent-mustard/80 font-bold">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>نظام نبتة الذكي يقوم بالتحقق التلقائي من السطوع، والاهتزاز، ووجود عينات أوراق النبات لضمان أفضل دقة تحليل للـ AI.</span>
          </span>
        ) : (
          <span>يرجى التأكد من أن النبات واضح وتحت إضاءة جيدة لتزويد الذكاء الاصطناعي بعينة ممتازة.</span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CameraCapture;
