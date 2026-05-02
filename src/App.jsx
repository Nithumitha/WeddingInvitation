import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Heart, Clock, Music, ArrowDown, Sparkles, Volume2, VolumeX, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from './assets/bg-music.mp3';
import OurStorySection from './components/OurStorySection';
import cornerFlower from './assets/cornerFlowerImage.webp';
import coupleCorner from './assets/coupleCornerImage.webp';
import vinayagarImage from './assets/vinayagarImage.webp';
import cloudsBg from './assets/grayscaleClouds.webp';
import story1 from './assets/ourStory1.webp';
import story3 from './assets/ourStory3.webp';
import story4 from './assets/ourStory4.webp';
import story5 from './assets/ourStory5.webp';
import story6 from './assets/ourStory6.webp';
import story7 from './assets/ourStory7.webp';
import story8 from './assets/ourStory8.webp';
import mahalImg from './assets/mahal.png';

// --- Sub-components (Moved to bottom or removed duplicates) ---

const DecorativeCorner = ({ className }) => (
  <svg className={`absolute text-gold/40 ${className}`} style={{ width: 'clamp(4rem, 15vmin, 8rem)', height: 'clamp(4rem, 15vmin, 8rem)' }} viewBox="0 0 100 100">
    <path d="M0 0 L100 0 L100 5 L5 5 L5 100 L0 100 Z" fill="currentColor" />
    <circle cx="15" cy="15" r="5" fill="currentColor" />
    <path d="M30 0 Q30 30 0 30" stroke="currentColor" fill="none" strokeWidth="2" />
  </svg>
);

const CornerMotifs = () => (
  <>
    <div className="corner-motif corner-motif-tl">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20V2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <path d="M6 14V6H14" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </div>
    <div className="corner-motif corner-motif-tr">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20V2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <path d="M6 14V6H14" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </div>
    <div className="corner-motif corner-motif-bl">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20V2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <path d="M6 14V6H14" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </div>
    <div className="corner-motif corner-motif-br">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 20V2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <path d="M6 14V6H14" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </div>
  </>
);




const RosePetals = () => {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const petalsCount = isMobile ? 6 : 12;
  const petals = Array.from({ length: petalsCount });

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      {petals.map((_, i) => {
        // Create 3 layers of depth
        const layer = i % 3; // 0: Background, 1: Mid, 2: Front

        let size, duration, blur, zIndex, opacity;

        if (layer === 0) { // Background (Slow & Blurry)
          size = Math.random() * 8 + 8;
          duration = Math.random() * 10 + 20;
          blur = "blur(3px)";
          zIndex = 10;
          opacity = 0.4;
        } else if (layer === 1) { // Mid
          size = Math.random() * 10 + 12;
          duration = Math.random() * 8 + 14;
          blur = "none";
          zIndex = 20;
          opacity = 0.7;
        } else { // Front (Large & Fast)
          size = Math.random() * 12 + 18;
          duration = Math.random() * 6 + 10;
          blur = "none";
          zIndex = 30;
          opacity = 0.9;
        }

        const left = Math.random() * 100;
        const delay = Math.random() * -20; // Negative delay starts the animation mid-way
        const drift = Math.random() * 150 - 75; // Horizontal drift range

        return (
          <motion.div
            key={i}
            initial={{ y: -100, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "110vh",
              x: drift,
              opacity: [0, opacity, opacity, 0],
              rotate: [0, 180, 360, 540]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{
              filter: blur,
              zIndex: zIndex,
              left: `${left}%`
            }}
          >
            <div
              className="bg-gradient-to-br from-pink-200 to-pink-400 shadow-sm"
              style={{
                width: `${size}px`,
                height: `${size * 0.8}px`,
                borderRadius: '50% 0 50% 50%',
                transform: 'skewX(-10deg)'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// --- Main App ---

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Front, 1: Story, 2: Event, 3: Venue
  const scrollContainerRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. Critical Assets (Must load before showing the Home page)
    const criticalImages = [cloudsBg, cornerFlower, coupleCorner, vinayagarImage, story1];
    let criticalLoaded = 0;

    const checkCriticalLoaded = () => {
      criticalLoaded++;
      if (criticalLoaded === criticalImages.length) {
        if (document.fonts) {
          document.fonts.ready.then(() => setAssetsLoaded(true));
        } else {
          setAssetsLoaded(true);
        }
        // 2. Background Assets (Load quietly while user is on Home page)
        preloadBackgroundAssets();
      }
    };

    const preloadBackgroundAssets = () => {
      const backgroundImages = [story3, story4, story5, story6, story7, story8, mahalImg];
      backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = checkCriticalLoaded;
      img.onerror = checkCriticalLoaded;
    });
  }, []);

  const steps = [
    { id: 'front', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'event', label: 'Celebration' }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Lock scroll on Home Page only
  useEffect(() => {
    if (currentStep === 0) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    };
  }, [currentStep]);

  // Handle audio playback speed and custom looping (30s to 2:20)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = 1.5;

      const handleTimeUpdate = () => {
        if (audio.currentTime >= 140) {
          audio.currentTime = 30;
        }
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [bgMusic]);

  const handleOpen = () => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.currentTime = 30; // Start at 30 seconds
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      setIsPlaying(true);
    }
    nextStep();
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // If playing for the first time or before the 30s mark, jump to 30s
      if (audioRef.current.currentTime < 30) {
        audioRef.current.currentTime = 30;
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Loading Spinner Overlay (Mirroring wedding-invitation) */}
      {!assetsLoaded && (
        <div className="loading-spinner-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Preparing Invitation...</p>
        </div>
      )}

      {/* Unified Master Background - Reference Stability + Perfect Blending */}
      <div className="fixed inset-0 z-[-15] bg-[#ffdede] pointer-events-none overflow-hidden [transform:translate3d(0,0,0)]">
        {/* Cloud Texture with 10% safety bleed */}
        <div 
          className="absolute -inset-[5%] opacity-40"
          style={{
            backgroundImage: `url(${cloudsBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.4) hue-rotate(240deg) saturate(1.5) brightness(1.2)',
          }}
        />

        {/* Fixed Corner Decorations - Blended against the unified layer */}
        <motion.img
          src={cornerFlower}
          alt=""
          className="absolute -top-[2vmin] -right-[2vmin] mix-blend-multiply pointer-events-none"
          style={{ width: 'clamp(150px, 40vmin, 550px)' }}
        />

        <AnimatePresence>
          {currentStep === 0 && (
            <motion.img
              key="coupleCorner"
              src={coupleCorner}
              alt=""
              initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              animate={{ opacity: 0.8, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -bottom-[2vmin] -left-[2vmin] mix-blend-multiply pointer-events-none"
              style={{ width: 'clamp(150px, 40vmin, 550px)' }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative overflow-x-hidden">

        {/* Audio Element - Persistent across all pages for consistent speed and timing */}
        <audio ref={audioRef} src={bgMusic} loop preload="auto" crossOrigin="anonymous" />

        {/* Minimal Navigation & Music - Fluid Spacing */}
        <div
          className="fixed z-[100] flex justify-between items-center pointer-events-none w-full"
          style={{
            top: 'clamp(1rem, 4vmin, 2.5rem)',
            paddingLeft: 'clamp(1rem, 4vmin, 2.5rem)',
            paddingRight: 'clamp(1rem, 4vmin, 2.5rem)'
          }}
        >
          {/* Top Left: Back Arrow */}
          <div className="pointer-events-auto">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="w-[clamp(2.5rem,8vmin,3.5rem)] h-[clamp(2.5rem,8vmin,3.5rem)] bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon/60 hover:text-maroon hover:scale-110 transition-all shadow-lg"
                aria-label="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          {/* Top Right: Next Arrow */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <button
                onClick={nextStep}
                className="w-[clamp(2.5rem,8vmin,3.5rem)] h-[clamp(2.5rem,8vmin,3.5rem)] bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon/60 hover:text-maroon hover:scale-110 transition-all shadow-lg"
                aria-label="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="fixed z-[100] pointer-events-none" style={{ bottom: 'var(--fluid-px)', right: 'var(--fluid-px)' }}>
          <button onClick={toggleMusic} className="pointer-events-auto w-[clamp(2.5rem,8vmin,3.5rem)] h-[clamp(2.5rem,8vmin,3.5rem)] bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon hover:scale-110 transition-all shadow-lg">
            {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} className="opacity-40" />}
          </button>
        </div>

        <main className="w-full flex flex-col relative bg-transparent z-[50] [will-change:transform] [-webkit-overflow-scrolling:touch] overflow-x-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="front"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative shrink-0"
              >
                <RosePetals />

                {/* Branding Section - Centered for perfect visual balance (Reference Style) */}
                <div className="w-full max-w-4xl flex flex-col items-center gap-[clamp(1rem,3vh,2rem)] relative z-10 shrink-0">
                  <GaneshaIcon />

                  <div className="text-center space-y-[clamp(1rem,3vh,2.5rem)]">
                    <p className="fluid-body italic text-maroon/70 font-semibold max-w-lg mx-auto leading-relaxed">
                      With hearts full of love, we invite you to witness the beginning of our forever.
                    </p>

                    <h1 className="fluid-h1 text-maroon flex flex-col items-center">
                      <span>Krithick</span>
                      <span className="opacity-40 text-[0.45em] my-[1vh] leading-none">&</span>
                      <span>Nithu</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4">
                      <div className="h-[1px] w-[8vmin] bg-gold/30"></div>
                      <p className="fluid-label text-gold font-black tracking-[0.3em]">MAY 28, 2026</p>
                      <div className="h-[1px] w-[8vmin] bg-gold/30"></div>
                    </div>
                  </div>
                </div>

                {/* Open Button - Naturally follows the content with a guaranteed gap - Layered above petals */}
                <div className="mt-8 md:mt-12 relative z-[60] shrink-0">
                  <button onClick={handleOpen} className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping scale-150 opacity-10"></div>
                    <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse scale-125"></div>

                    <div className="relative group/btn">
                      <div className="absolute inset-[-8px] bg-gold/20 rounded-full blur-lg group-hover/btn:bg-gold/40 transition-all duration-700 animate-pulse"></div>

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-5px] border border-gold/30 rounded-full border-dashed"
                      ></motion.div>

                      <div className="relative w-[clamp(5rem,15vmin,6rem)] h-[clamp(5rem,15vmin,6rem)] bg-gradient-to-br from-maroon to-[#3B0066] rounded-full flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(75,0,130,0.4)] border border-gold/40 group-hover/btn:scale-110 transition-transform duration-500">
                        <div className="flex flex-col items-center z-10">
                          <Sparkles className="text-gold/80 mb-1 animate-pulse" size={16} />
                          <span className="font-lato text-[8px] tracking-[0.3em] text-white font-bold uppercase ml-1">Open</span>
                        </div>
                        <motion.div
                          animate={{ x: ["-200%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="story"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="w-full relative py-[10vh]"
              >
                <div className="max-w-6xl mx-auto px-4">
                  <OurStorySection scrollContainerRef={scrollContainerRef} onNext={nextStep} />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="event"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="w-full relative pt-[6vh] pb-[15vh] px-4"
              >
                <div className="max-w-5xl mx-auto px-4">
                  <header className="text-center mb-[var(--section-gap)]">
                    <span className="fluid-label text-gold mb-4 block">Save The Date</span>
                    <h2 className="fluid-h2 text-maroon font-bold">Celebration</h2>
                    <div className="h-[1px] w-32 bg-gold/30 mx-auto mt-6"></div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--section-gap)] mb-[var(--section-gap)]">
                    {/* Celebration Card 1: Reception */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-white/40 backdrop-blur-md rounded-[2.5rem] p-[var(--card-padding)] shadow-xl border border-white/40 group"
                    >
                      <div className="absolute -top-4 left-6 bg-gold text-white px-6 py-2 rounded-full fluid-label !text-[10px] !tracking-[0.2em] shadow-lg z-20">
                        The Reception
                      </div>

                      <div className="relative z-10">
                        <h3 className="fluid-h3 text-maroon mb-6 font-bold flex flex-col">
                          <span className="italic opacity-60 text-[0.7em] mb-1">Grand Evening</span>
                          Reception
                        </h3>
                        <p className="fluid-body text-maroon/70 mb-10 max-w-sm leading-relaxed">
                          Join us for an enchanting night of dinner, melodies and heartfelt toasts.
                        </p>

                        <div className="space-y-6 pt-6 border-t border-gold/15">
                          <div className="flex items-center gap-5">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            <div className="flex flex-col">
                              <span className="fluid-label !text-[9px] !tracking-wider text-gold uppercase opacity-80">When</span>
                              <span className="fluid-h3 !text-lg text-maroon font-semibold">Wed, 27 May 2026</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            <div className="flex flex-col">
                              <span className="fluid-label !text-[9px] !tracking-wider text-gold uppercase opacity-80">Starting at</span>
                              <span className="fluid-h3 !text-lg text-maroon font-semibold">06:30 PM Onwards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Celebration Card 2: Wedding (Staggered Offset) */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative bg-white/40 backdrop-blur-md rounded-[2.5rem] p-[var(--card-padding)] shadow-xl border border-white/40 group md:translate-y-12"
                    >
                      <div className="absolute -top-4 left-6 bg-gold text-white px-6 py-2 rounded-full fluid-label !text-[10px] !tracking-[0.2em] shadow-lg z-20">
                        The Wedding
                      </div>

                      <div className="relative z-10">
                        <h3 className="fluid-h3 text-maroon mb-6 font-bold flex flex-col">
                          <span className="italic opacity-60 text-[0.7em] mb-1">Sacred Union</span>
                          Muhurtham
                        </h3>
                        <p className="fluid-body text-maroon/70 mb-10 max-w-sm leading-relaxed">
                          In the witness of the sacred fire and our loved ones, we unite as one.
                        </p>

                        <div className="space-y-6 pt-6 border-t border-gold/15">
                          <div className="flex items-center gap-5">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            <div className="flex flex-col">
                              <span className="fluid-label !text-[9px] !tracking-wider text-gold uppercase opacity-80">When</span>
                              <span className="fluid-h3 !text-lg text-maroon font-semibold">Thu, 28 May 2026</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            <div className="flex flex-col">
                              <span className="fluid-label !text-[9px] !tracking-wider text-gold uppercase opacity-80">Auspicious Time</span>
                              <span className="fluid-h3 !text-lg text-maroon font-semibold">07:31 AM - 09:00 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto relative bg-white/25 backdrop-blur-xl rounded-[3rem] p-6 md:p-12 shadow-2xl border border-white/30 mt-[15vh]"
                  >
                    {/* Subtle Background Glow for Venue */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/5 to-transparent pointer-events-none"></div>

                    <div className="absolute -top-4 left-6 bg-gold text-white px-6 py-2 rounded-full fluid-label !text-[10px] !tracking-[0.2em] shadow-lg z-20">
                      The Venue
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 pt-6 md:pt-0">
                      <div className="w-full md:w-1/3">
                        <div className="relative p-2 border border-white/40 rounded-2xl bg-white/30 backdrop-blur-md shadow-inner">
                          <div className="relative bg-[#FFFBF0]/60 rounded-xl aspect-[16/9] md:aspect-square flex items-center justify-center overflow-hidden">
                            <motion.img
                              src={mahalImg}
                              alt="Vaasan Mahal"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                              className="w-full h-full object-cover mix-blend-multiply opacity-90"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-6">
                          <h3 className="flex flex-col leading-tight">
                            <span className="italic opacity-60 fluid-h3 !text-xl">The Grand</span>
                            <span className="fluid-h3 text-maroon font-bold">Vaasan Mahal</span>
                          </h3>
                          <div className="h-[2.5px] w-16 bg-gold/40 mt-4 mx-auto md:mx-0 rounded-full"></div>
                        </div>
                        <p className="fluid-body text-maroon/70 mb-8 font-medium">T - Pettai Road, Musiri.</p>
                        <motion.a
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(212,175,55,0.4)" }}
                          whileTap={{ scale: 0.98 }}
                          href="https://www.google.com/maps/search/The+Vaasan+Mahal+Musiri" target="_blank" rel="noopener noreferrer"
                          className="px-8 md:px-12 py-4 bg-gold text-white rounded-full fluid-label !text-[11px] !tracking-[0.3em] shadow-xl border border-gold/20 flex items-center gap-3 whitespace-nowrap"
                        >
                          Locate on Map <ChevronRight size={16} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Magical Floating Countdown Section */}
                  <div className="pt-[15vh] pb-[5vh] relative">
                    {/* Background Aura for Countdown */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="max-w-3xl mx-auto relative z-10">
                      <div className="flex flex-col items-center mb-12">
                        <div className="bg-gold/10 text-gold px-8 py-2.5 rounded-full border border-gold/20 shadow-sm flex items-center gap-3 backdrop-blur-sm">
                          <Clock size={16} />
                          <span className="font-lato text-[10px] tracking-[0.3em] font-bold uppercase whitespace-nowrap">Forever begins in</span>
                        </div>
                      </div>

                      <div className="w-full px-4">
                        <Countdown targetDate="2026-05-28T07:30:00" />
                      </div>
                    </div>
                  </div>

                  {/* Final Poetic Closing Statement */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="text-center pb-0 px-6"
                  >
                    <p className="fluid-body italic text-maroon/80 whitespace-pre-line leading-relaxed">
                      {"We can't wait\nto celebrate this beautiful moment\nwith you. ❤️"}
                    </p>
                    <div className="h-[1px] w-12 bg-gold/30 mx-auto mt-8"></div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`flex flex-col items-center relative py-[var(--section-gap)] px-[4vmin] ${className}`}>
    {children}
  </section>
);

const GaneshaIcon = () => (
  <div className="flex justify-center mb-[4vh]">
    <img
      src={vinayagarImage}
      alt="Vinayagar"
      className="h-auto mix-blend-multiply transition-all duration-1000 hover:scale-110"
      style={{
        width: 'clamp(5rem, 15vmin, 8rem)',
        filter: 'contrast(1.2) brightness(1.1)',
        maskImage: 'radial-gradient(circle, black 40%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 90%)'
      }}
    />
  </div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-[1.5vmin] justify-center w-full max-w-4xl mx-auto px-2">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="bg-[#FFFBF0] border border-gold/40 flex-1 rounded-[2vmin] flex flex-col items-center group shadow-md transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
          style={{ padding: 'clamp(0.75rem, 3vmin, 1.5rem) 0' }}
        >
          <div className="flex flex-col items-center justify-center w-full">
            <span className="fluid-h3 text-maroon font-bold leading-[1.1] mb-1">
              {value}
            </span>
            <span className="fluid-label !text-[clamp(0.5rem,1.4vmin,0.75rem)] text-maroon/60 font-bold !tracking-[0.1em] !mb-0">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
