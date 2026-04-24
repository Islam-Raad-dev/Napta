import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RotateCcw, Check } from 'lucide-react';

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

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
      setError("تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [isFrontCamera]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const confirmPhoto = () => {
    onCapture(capturedImage);
    onClose();
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10"
    >
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video rounded-[2rem] overflow-hidden bg-dark-base shadow-2xl border border-white/10">
        
        {/* Video Preview */}
        {!capturedImage ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            {error && (
              <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                <p className="text-white font-cairo text-lg">{error}</p>
              </div>
            )}
            
            {/* Camera Overlay Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
              <button 
                onClick={toggleCamera}
                className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md"
                title="تبديل الكاميرا"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              
              <button 
                onClick={capturePhoto}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary-dark shadow-luxury hover:scale-110 active:scale-95 transition-all"
                title="التقط صورة"
              >
                <Camera className="w-10 h-10" />
              </button>

              <button 
                onClick={onClose}
                className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md"
                title="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          /* Image Preview */
          <>
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
              <button 
                onClick={retakePhoto}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all backdrop-blur-md font-cairo"
              >
                <RotateCcw className="w-5 h-5" />
                <span>إعادة التصوير</span>
              </button>
              
              <button 
                onClick={confirmPhoto}
                className="flex items-center gap-3 px-10 py-4 bg-accent-mustard text-primary-dark rounded-2xl transition-all shadow-lg font-cairo font-bold hover:scale-105 active:scale-95"
              >
                <Check className="w-6 h-6" />
                <span>استخدام هذه الصورة</span>
              </button>
            </div>
          </>
        )}

        {/* Close Button Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
      
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-8 text-white/60 font-cairo text-center max-w-md"
      >
        يرجى التأكد من أن النبات واضح وتحت إضاءة جيدة للحصول على أفضل النتائج.
      </motion.p>
    </motion.div>
  );
};

export default CameraCapture;
