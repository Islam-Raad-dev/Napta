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
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
      }, 150);
    } else if (uploadRef.current) {
      uploadRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = async (base64Image) => {
    await analyzeImage(base64Image);

    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <div dir="rtl" lang="ar" style={{ direction: 'rtl' }} className="relative min-h-screen bg-[#F9F9F9] dark:bg-dark-base text-[#2D2D2D] dark:text-[#F9F9F9] overflow-x-hidden selection:bg-accent-mustard/20 selection:text-primary-dark transition-colors duration-300">
      <Navbar
        onStart={scrollToUpload}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main id="main-content" aria-label="المحتوى الرئيسي">
        {currentPage === 'home' && (
          <>
            <Hero onStart={scrollToUpload} onDemoClick={() => setCurrentPage('demo')} />
            
            <div className="relative z-10 pt-12 md:pt-20">
              <UploadArea ref={uploadRef} onAnalyze={handleAnalyze} loading={loading} />
            </div>

            
            <div id="results" className="container mx-auto px-8 max-w-6xl py-8">
              <ResultsDisplay result={result} error={error} />
            </div>
          </>
        )}
        {currentPage === 'features' && <FeaturesPage />}
        {currentPage === 'demo' && <DemoPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'faq' && <FAQPage setCurrentPage={setCurrentPage} />}
      </main>

      <footer
        className="py-12 bg-primary-dark dark:bg-dark-deep text-white/40 font-cairo text-sm text-center border-t border-white/5 transition-colors duration-300"
        role="contentinfo"
      >
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-white/60">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 font-bold text-white bg-transparent border-none cursor-pointer hover:text-accent-mustard transition-colors rounded-lg p-1 focus-visible:ring-2 focus-visible:ring-accent-mustard"
              aria-label="العودة للرئيسية"
            >
              <span>نبتة الذكية</span>
              <div
                className="w-8 h-8 rounded-lg bg-accent-mustard flex items-center justify-center text-primary-dark shadow-[0_0_15px_rgba(225,173,1,0.3)]"
                aria-hidden="true"
              >
                🌿
              </div>
            </button>
            <div className="flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('privacy')}
                className="hover:text-white transition-colors bg-transparent border-none cursor-pointer font-cairo text-white/60 text-sm focus-visible:ring-2 focus-visible:ring-accent-mustard rounded-lg"
              >
                سياسة الخصوصية
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setTimeout(() => {
                    const el = document.getElementById('team-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 100);
                }}
                className="hover:text-white transition-colors bg-transparent border-none cursor-pointer font-cairo text-white/60 text-sm focus-visible:ring-2 focus-visible:ring-accent-mustard rounded-lg"
              >
                اتصل بنا
              </button>
              <button
                onClick={() => setCurrentPage('faq')}
                className="hover:text-white transition-colors bg-transparent border-none cursor-pointer font-cairo text-white/60 text-sm focus-visible:ring-2 focus-visible:ring-accent-mustard rounded-lg"
              >
                الأسئلة الشائعة
              </button>
            </div>
          </div>
          <p>© 2026 منصة نبتة الذكية. جميع الحقوق محفوظة. مدعوم بالذكاء الاصطناعي.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;