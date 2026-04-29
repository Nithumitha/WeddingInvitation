import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Heart, Clock, Music, ArrowDown, Sparkles, Volume2, VolumeX, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from './assets/bg-music.mp3';
import OurStorySection from './components/OurStorySection';
import cornerFlower from './assets/cornerFlowerImage.png';
import coupleCorner from './assets/coupleCornerImage.png';
import vinayagarImage from './assets/vinayagarImage.jpg';
import cloudsBg from './assets/grayscaleClouds.png';

// --- Sub-components ---

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`min-h-screen flex flex-col items-center justify-center relative py-20 px-4 ${className}`}>
    {children}
  </section>
);

const DecorativeCorner = ({ className }) => (
  <svg className={`absolute w-16 h-16 md:w-32 md:h-32 text-gold/40 ${className}`} viewBox="0 0 100 100">
    <path d="M0 0 L100 0 L100 5 L5 5 L5 100 L0 100 Z" fill="currentColor" />
    <circle cx="15" cy="15" r="5" fill="currentColor" />
    <path d="M30 0 Q30 30 0 30" stroke="currentColor" fill="none" strokeWidth="2" />
  </svg>
);

const GaneshaIcon = () => (
  <div className="flex justify-center mb-8">
    <img
      src={vinayagarImage}
      alt="Vinayagar"
      className="w-20 h-auto mix-blend-multiply transition-all duration-1000 hover:scale-110"
      style={{
        filter: 'contrast(1.2) brightness(1.1)',
        maskImage: 'radial-gradient(circle, black 40%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 90%)'
      }}
    />
  </div>
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
    <div className="flex gap-2 md:gap-8 justify-center w-full max-w-4xl mx-auto px-2">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="bg-[#FFFBF0] border border-gold/40 flex-1 p-3 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col items-center min-w-0 group shadow-lg transition-transform hover:scale-105">
          <span className="text-2xl md:text-6xl font-playfair text-maroon mb-1 group-hover:scale-110 transition-transform duration-500 font-bold">{value}</span>
          <span className="text-[7px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.4em] text-maroon/60 font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
};

const RosePetals = () => {
  const petalsCount = 12; // Premium, non-cluttered limit
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
  const [coupleImgLoaded, setCoupleImgLoaded] = useState(false);
  const audioRef = useRef(null);

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

  // Lock scroll on Home Page
  useEffect(() => {
    if (currentStep === 0) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    };
  }, [currentStep]);

  const handleOpen = () => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      setIsPlaying(true);
    }
    nextStep();
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Elegant Corner Decorations & Cloud Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#fffaf5]">
        {/* Colorful Cloud Layer */}
        <img
          src={cloudsBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply"
          style={{
            filter: 'sepia(0.6) hue-rotate(240deg) saturate(3) brightness(1.5)'
          }}
        />

        {/* Top Right Flower - Consistent across all pages */}
        <motion.img
          src={cornerFlower}
          alt=""
          animate={{
            scale: 1,
            x: 0,
            y: 0,
            opacity: 0.8
          }}
          className="absolute -top-5 -right-5 w-52 md:w-[28rem] mix-blend-multiply pointer-events-none"
        />

        {/* Bottom Left Couple - Only on Home Page */}
        <AnimatePresence>
          {currentStep === 0 && (
            <motion.img
              key="coupleCorner"
              src={coupleCorner}
              alt=""
              fetchpriority="high"
              onLoad={() => setCoupleImgLoaded(true)}
              initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              animate={{ 
                opacity: coupleImgLoaded ? 0.8 : 0, 
                scale: coupleImgLoaded ? 1 : 0.95, 
                x: 0, 
                y: 0 
              }}
              exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -bottom-5 -left-5 w-52 md:w-[28rem] mix-blend-multiply pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Minimal Navigation & Music - Pinned to Corners */}
      <div className="fixed top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-[100] flex justify-between items-center pointer-events-none">
        {/* Top Left: Back Arrow */}
        <div className="pointer-events-auto">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon/60 hover:text-maroon hover:scale-110 transition-all shadow-lg"
              aria-label="Previous Page"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Top Right: Next Arrow & Music */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon/60 hover:text-maroon hover:scale-110 transition-all shadow-lg"
              aria-label="Next Page"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Right: Music Control */}
      <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
        <button
          onClick={toggleMusic}
          className="pointer-events-auto w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon hover:scale-110 transition-all ripple-effect overflow-hidden shadow-lg"
          aria-label="Toggle Music"
        >
          {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} className="opacity-40" />}
        </button>
      </div>



      {/* Page Content with Transitions */}
      <main className={`h-dvh w-full flex items-center justify-center relative overflow-hidden bg-transparent fixed inset-0 ${currentStep === 0 ? 'touch-none' : ''}`}>
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="front"
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="w-full flex justify-center relative h-full items-center overflow-hidden"
            >
              <RosePetals />
              <Section id="home" className="bg-transparent py-0 h-full overflow-hidden flex items-center justify-center">
                <div className="max-w-4xl w-full relative px-6 -top-12 md:-top-20">


                  <GaneshaIcon />

                  <div className="text-center space-y-4 md:space-y-6">
                    <p className="font-cormorant italic text-maroon/70 text-lg md:text-2xl leading-relaxed font-semibold">With hearts full of love, we invite you to witness the beginning of our forever.</p>

                    <h1 
                      className="font-vibes text-maroon flex flex-col items-center leading-none py-2 md:py-8 font-medium"
                      style={{ textShadow: '0.4px 0 currentColor' }}
                    >
                      <span style={{ fontSize: 'clamp(2.2rem, 14vw, 8.5rem)' }}>Krithick</span>
                      <span className="opacity-40" style={{ fontSize: 'clamp(1.2rem, 6vw, 4.5rem)' }}>&</span>
                      <span style={{ fontSize: 'clamp(2.2rem, 14vw, 8.5rem)' }}>Nithu</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 py-1 md:py-4">
                      <div className="h-[1px] w-6 md:w-12 bg-gold/50"></div>
                      <p className="font-lato text-maroon text-lg md:text-2xl tracking-widest uppercase">MAY 28, 2026</p>
                      <div className="h-[1px] w-6 md:w-12 bg-gold/50"></div>
                    </div>

                    <div className="pt-4 md:pt-8 flex flex-col items-center">
                      <button
                        onClick={handleOpen}
                        className="relative group cursor-pointer"
                      >
                        {/* Interactive Aura */}
                        <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping scale-150 opacity-10"></div>
                        <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse scale-125"></div>

                        {/* Modern Enhanced Open Button */}
                        <div className="relative group/btn">
                          {/* Pulsing Halo Background */}
                          <div className="absolute inset-[-10px] bg-gold/20 rounded-full blur-xl group-hover/btn:bg-gold/40 transition-all duration-700 animate-pulse"></div>
                          
                          {/* Rotating Decorative Outer Ring */}
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-6px] border border-gold/30 rounded-full border-dashed"
                          ></motion.div>

                          <div className="relative w-24 h-24 bg-gradient-to-br from-maroon to-[#3B0066] rounded-full flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(75,0,130,0.4)] border border-gold/40 group-hover/btn:scale-110 transition-transform duration-500">
                            <div className="flex flex-col items-center z-10">
                              <Sparkles className="text-gold/80 mb-1.5 animate-pulse" size={18} />
                              <span className="font-lato text-[9px] tracking-[0.4em] text-white font-bold uppercase ml-1">Open</span>
                            </div>

                            {/* Shimmer Sweep Animation */}
                            <motion.div 
                              animate={{ x: ["-200%", "200%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                          </div>
                        </div>


                      </button>
                    </div>
                  </div>
                </div>
              </Section>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="story"
              ref={scrollContainerRef}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="w-full h-full overflow-y-auto scrollbar-hide py-20"
            >
              <div className="max-w-6xl mx-auto px-4">
                <OurStorySection scrollContainerRef={scrollContainerRef} />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="event"
              initial={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
              transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 overflow-y-auto scrollbar-hide py-32 px-4"
            >
              <div className="max-w-4xl mx-auto px-6">
                <header className="text-center mb-24">
                  <span className="font-lato text-[10px] tracking-[0.5em] text-gold uppercase font-bold mb-4 block">Save The Date</span>
                  <h2 className="font-playfair text-5xl md:text-7xl text-maroon mb-6">Celebration</h2>
                  <div className="h-[1px] w-32 bg-gold/30 mx-auto"></div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                  {/* Celebration Card 1: Reception */}
                  <div className="relative bg-[#FFFBF0] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(212,175,55,0.15)] border border-gold/30 group transition-all duration-700 hover:-translate-y-3">
                    {/* Floating Pill Badge - Always highlighted on mobile */}
                    <div className="absolute -top-4 left-10 bg-gold text-white md:bg-white md:text-maroon px-6 py-2 rounded-full border border-gold/40 shadow-lg flex items-center gap-3 z-20 md:group-hover:bg-gold md:group-hover:text-white transition-colors duration-500">
                      <Music className="md:text-maroon md:group-hover:text-white text-white" size={14} />
                      <span className="font-lato text-[10px] tracking-[0.3em] font-bold uppercase">The Reception</span>
                    </div>

                    {/* Clipping Layer for Background Elements */}
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                      {/* Subtle Background Mandala */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000">
                        <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold">
                          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
                          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                        </svg>
                      </div>
                    </div>

                    {/* Inner Decorative Border */}
                    <div className="absolute inset-4 border border-gold/10 rounded-[1.8rem] pointer-events-none"></div>

                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="font-playfair text-4xl md:text-6xl text-maroon mb-6 font-bold leading-tight">
                        Reception <br />
                        <span className="text-2xl md:text-3xl font-light italic opacity-60">Ceremony</span>
                      </h3>

                      {/* Description */}
                      <p className="font-lato text-maroon/70 text-base md:text-lg mb-10 max-w-sm leading-relaxed">
                        Join us for an enchanting night of dinner, melodies and heartfelt toasts.
                      </p>

                      {/* Info Section */}
                      <div className="space-y-6 pt-6 border-t border-gold/20">
                        <div className="flex items-start gap-5">
                          <div className="mt-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                          <div className="flex flex-col">
                            <span className="font-lato text-[9px] uppercase tracking-widest text-gold font-bold mb-1">Date & Day</span>
                            <span className="font-playfair text-xl text-maroon font-semibold">Wed, 27 May 2026</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-5">
                          <div className="mt-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                          <div className="flex flex-col">
                            <span className="font-lato text-[9px] uppercase tracking-widest text-gold font-bold mb-1">Time</span>
                            <span className="font-playfair text-xl text-maroon font-semibold">06:30 PM Onwards</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Celebration Card 2: Muhurtham */}
                  <div className="relative bg-[#FFFBF0] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(212,175,55,0.15)] border border-gold/30 group transition-all duration-700 hover:-translate-y-3">
                    {/* Floating Pill Badge - Always highlighted on mobile */}
                    <div className="absolute -top-4 left-10 bg-gold text-white md:bg-white md:text-maroon px-6 py-2 rounded-full border border-gold/40 shadow-lg flex items-center gap-3 z-20 md:group-hover:bg-gold md:group-hover:text-white transition-colors duration-500">
                      <Heart className="md:text-maroon md:group-hover:text-white text-white" size={14} />
                      <span className="font-lato text-[10px] tracking-[0.3em] font-bold uppercase">The Wedding</span>
                    </div>

                    {/* Clipping Layer for Background Elements */}
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                      {/* Subtle Background Mandala */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000">
                        <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold">
                          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
                          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                        </svg>
                      </div>
                    </div>

                    {/* Inner Decorative Border */}
                    <div className="absolute inset-4 border border-gold/10 rounded-[1.8rem] pointer-events-none"></div>

                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="font-playfair text-4xl md:text-6xl text-maroon mb-6 font-bold leading-tight">
                        Divine <br />
                        <span className="text-2xl md:text-3xl font-light italic opacity-60">Muhurtham</span>
                      </h3>

                      {/* Description */}
                      <p className="font-lato text-maroon/70 text-base md:text-lg mb-10 max-w-sm leading-relaxed">
                        In the witness of the sacred fire and our loved ones, we unite as one.
                      </p>

                      {/* Info Section */}
                      <div className="space-y-6 pt-6 border-t border-gold/20">
                        <div className="flex items-start gap-5">
                          <div className="mt-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                          <div className="flex flex-col">
                            <span className="font-lato text-[9px] uppercase tracking-widest text-gold font-bold mb-1">Date & Day</span>
                            <span className="font-playfair text-xl text-maroon font-semibold">Thu, 28 May 2026</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-5">
                          <div className="mt-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                          <div className="flex flex-col">
                            <span className="font-lato text-[9px] uppercase tracking-widest text-gold font-bold mb-1">Time</span>
                            <span className="font-playfair text-xl text-maroon font-semibold">07:30 AM - 09:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue Section - Scaled Down Designer Style */}
                <div className="max-w-3xl mx-auto relative bg-[#FFFBF0] rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(212,175,55,0.15)] border border-gold/30 group transition-all duration-700">
                  {/* Floating Pill Badge - Always highlighted on mobile */}
                  <div className="absolute -top-4 left-10 bg-gold text-white md:bg-white md:text-maroon px-6 py-2 rounded-full border border-gold/40 shadow-lg flex items-center gap-3 z-20 md:group-hover:bg-gold md:group-hover:text-white transition-colors duration-500">
                    <MapPin className="md:text-maroon md:group-hover:text-white text-white" size={14} />
                    <span className="font-lato text-[10px] tracking-[0.3em] font-bold uppercase">The Venue</span>
                  </div>

                  {/* Clipping Layer for Background Elements */}
                  <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                    {/* Subtle Background Mandala */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000">
                      <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                      </svg>
                    </div>
                  </div>

                  {/* Inner Decorative Border */}
                  <div className="absolute inset-4 border border-gold/10 rounded-[1.8rem] pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    {/* Left: Styled Map Frame */}
                    <div className="w-full md:w-2/5">
                      <div className="relative p-2 border-2 border-gold/20 rounded-2xl bg-white shadow-xl group-hover:border-gold/40 transition-colors duration-500">
                        <div className="relative bg-[#FFFBF0] rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="flex flex-col items-center"
                          >
                            <MapPin size={36} className="text-maroon mb-2" />
                            <div className="w-12 h-[1.5px] bg-gold/40 rounded-full"></div>
                          </motion.div>
                          <div className="absolute bottom-3 left-0 right-0 text-center">
                            <span className="font-lato text-[7px] uppercase tracking-[0.4em] font-bold text-maroon/40">Musiri, Trichy</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Venue Details & Navigation */}
                    <div className="w-full md:w-3/5 flex flex-col items-center md:items-start">
                      <div className="mb-6 text-center md:text-left">
                        <h3 className="flex flex-col leading-tight">
                          <span className="font-playfair text-xl md:text-2xl text-maroon/60 italic font-light">The Grand</span>
                          <span className="font-playfair text-3xl md:text-5xl text-maroon font-bold tracking-tighter">Vaasan Mahal</span>
                        </h3>
                        <div className="h-[2px] w-20 bg-gold/30 mt-4 mx-auto md:mx-0"></div>
                      </div>

                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                        <p className="font-lato text-maroon/70 text-base md:text-lg">Musiri - Trichy Main Road, Musiri.</p>
                      </div>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://www.google.com/maps/search/The+Vaasan+Mahal+Musiri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-3.5 bg-gold text-maroon rounded-full font-lato text-[10px] tracking-[0.4em] uppercase font-bold shadow-lg hover:shadow-gold/40 transition-all duration-500 border border-gold/20 flex items-center gap-3"
                      >
                        Locate on Map
                        <ChevronRight size={14} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Countdown Section - Designer Frame Style */}
                <div className="pt-32 px-4 pb-20">
                  <div className="max-w-3xl mx-auto relative bg-[#FFFBF0] p-6 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(212,175,55,0.15)] border border-gold/30 group">
                    {/* Floating Pill Badge - Always highlighted on mobile */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white md:bg-white md:text-maroon px-8 py-2 rounded-full border border-gold/40 shadow-lg flex items-center gap-3 z-20 md:group-hover:bg-gold md:group-hover:text-white transition-colors duration-500">
                      <Clock className="md:text-maroon md:group-hover:text-white text-white" size={14} />
                      <span className="font-lato text-[10px] tracking-[0.4em] font-bold uppercase whitespace-nowrap">Forever begins in</span>
                    </div>

                    {/* Clipping Layer for Mandala & Texture */}
                    <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden pointer-events-none">
                      {/* Subtle Background Mandala */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000">
                        <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold">
                          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
                          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                        </svg>
                      </div>
                      <div className="silk-texture"></div>
                    </div>

                    {/* Inner Decorative Border */}
                    <div className="absolute inset-4 md:inset-5 border border-gold/10 rounded-[1.8rem] md:rounded-[2.2rem] pointer-events-none"></div>

                    <div className="relative z-10 w-full">
                      <Countdown targetDate="2026-05-28T07:30:00" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>





    </div>
  );
}

export default App;
