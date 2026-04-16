import React, { useRef, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UploadArea from './components/UploadArea'
import ResultsDisplay from './components/ResultsDisplay'
import FeaturesPage from './components/FeaturesPage'
import DemoPage from './components/DemoPage'
import AboutPage from './components/AboutPage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import FAQPage from './components/FAQPage'
import { useGemini } from './hooks/useGemini'

function App() {
  const { analyzeImage, loading, error, result } = useGemini();
  const uploadRef = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToUpload = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (uploadRef.current) uploadRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (uploadRef.current) {
      uploadRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = async (base64Image) => {
    await analyzeImage(base64Image);
    // Scroll to results after a short delay to allow rendering
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#F9F9F9] dark:bg-[#122318] text-[#2D2D2D] dark:text-[#F9F9F9] overflow-x-hidden selection:bg-accent-mustard/20 selection:text-primary-dark transition-colors duration-300">
      <Navbar onStart={scrollToUpload} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onStart={scrollToUpload} onDemoClick={() => setCurrentPage('demo')} />
            
            <div className="relative z-10 -mt-20">
              <UploadArea ref={uploadRef} onAnalyze={handleAnalyze} loading={loading} />
            </div>

            <ResultsDisplay result={result} error={error} />
          </>
        )}
        {currentPage === 'features' && <FeaturesPage />}
        {currentPage === 'demo' && <DemoPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'faq' && <FAQPage setCurrentPage={setCurrentPage} />}
      </main>

      <footer className="py-12 bg-primary-dark dark:bg-[#0D1610] text-white/40 font-cairo text-sm text-center border-t border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-white/60">
             <div className="flex items-center gap-2 font-bold text-white">
                <div className="w-8 h-8 rounded-lg bg-accent-mustard flex items-center justify-center text-primary-dark shadow-[0_0_15px_rgba(225,173,1,0.3)]">
                  🌿
                </div>
                <span>نبتة الذكية</span>
             </div>
             <div className="flex items-center gap-8">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('privacy'); }} className="hover:text-white transition-colors">سياسة الخصوصية</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); setTimeout(() => { const el = document.getElementById('team-section'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100); }} className="hover:text-white transition-colors">اتصل بنا</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('faq'); }} className="hover:text-white transition-colors">الأسئلة الشائعة</a>
             </div>
          </div>
          <p>© 2026 منصة نبتة الذكية. جميع الحقوق محفوظة. مدعوم بالذكاء الاصطناعي.</p>
        </div>
      </footer>

      {/* Cursor Glow effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(225,173,1,0.05)_0%,transparent_50%)]" 
           onMouseMove={(e) => {
             document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
             document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
           }} 
      />
    </div>
  )
}

export default App
