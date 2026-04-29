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
    <div className="flex gap-2 md:gap-8 justify-center flex-nowrap">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="glass-card p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center min-w-[70px] md:min-w-[130px] group">
          <span className="text-3xl md:text-6xl font-playfair text-maroon mb-1 group-hover:scale-110 transition-transform duration-500">{value}</span>
          <span className="text-[8px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-gold font-bold">{label}</span>
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
        
        <img
          src={cornerFlower}
          alt=""
          className="absolute -top-5 -right-5 w-32 md:w-80 opacity-60 md:opacity-80 mix-blend-multiply"
        />
        <img
          src={coupleCorner}
          alt=""
          className="absolute -bottom-5 -left-5 w-40 md:w-96 opacity-60 md:opacity-80 mix-blend-multiply"
        />
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

          <button
            onClick={toggleMusic}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-maroon hover:scale-110 transition-all ripple-effect overflow-hidden shadow-lg"
            aria-label="Toggle Music"
          >
            {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} className="opacity-40" />}
          </button>
        </div>
      </div>



      {/* Page Content with Transitions */}
      <main className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
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
                <div className="max-w-4xl w-full relative px-6">


                  <GaneshaIcon />

                  <div className="text-center space-y-4 md:space-y-6">
                    <p className="font-cormorant italic text-maroon/70 text-lg md:text-2xl leading-relaxed font-semibold">We joyfully invite you to the wedding of</p>

                    <h1 className="font-vibes text-maroon flex flex-col items-center leading-none py-2 md:py-8 font-normal">
                      <span style={{ fontSize: 'clamp(2.2rem, 14vw, 8.5rem)' }}>Krithick</span>
                      <span className="opacity-40" style={{ fontSize: 'clamp(1.2rem, 6vw, 4.5rem)' }}>&</span>
                      <span style={{ fontSize: 'clamp(2.2rem, 14vw, 8.5rem)' }}>Nithu</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 py-1 md:py-4">
                      <div className="h-[1px] w-6 md:w-12 bg-gold/50"></div>
                      <p className="font-lato text-maroon text-lg md:text-2xl tracking-widest uppercase">MAY 28, 2026</p>
                      <div className="h-[1px] w-6 md:w-12 bg-gold/50"></div>
                    </div>

                    <p className="font-cormorant text-base md:text-3xl text-maroon/60 italic font-light tracking-wide px-4">
                      "Where love found its forever..."
                    </p>

                    <div className="pt-4 md:pt-8 flex flex-col items-center">
                      <button
                        onClick={handleOpen}
                        className="relative group cursor-pointer"
                      >
                        {/* Interactive Aura */}
                        <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping scale-150 opacity-10"></div>
                        <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse scale-125"></div>

                        {/* Redesigned Glass Seal Button */}
                        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-maroon/90 backdrop-blur-md rounded-full flex flex-col items-center justify-center border-4 border-gold/40 shadow-[0_20px_50px_rgba(74,4,78,0.3)] group-hover:scale-110 group-active:scale-95 transition-all duration-500 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10"></div>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)]"></div>

                          <Sparkles className="text-gold mb-2 animate-pulse" size={24} />
                          <span className="font-lato text-[9px] tracking-[0.3em] text-gold font-bold uppercase">Open</span>

                          {/* Shimmer sweep */}
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] animate-[shimmer_3s_infinite]"></div>
                        </div>

                        {/* Label */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none">
                          <p className="font-lato text-[9px] tracking-[0.5em] text-maroon/40 uppercase animate-bounce">Reveal The Invite</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                  {/* Reception Card */}
                  <div className="glass-card p-8 md:p-12 rounded-[2.5rem] flex flex-col items-center text-center group">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-maroon/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Music className="text-maroon" size={32} />
                    </div>
                    <h3 className="font-vibes text-4xl md:text-5xl text-maroon mb-4">Reception</h3>
                    <p className="font-cormorant text-xl text-maroon/70 mb-2">May 27, 2026</p>
                    <p className="font-lato text-gold tracking-widest text-[10px] font-bold uppercase">6:30 PM Onwards</p>
                  </div>

                  {/* Muhurtham Card */}
                  <div className="glass-card p-8 md:p-12 rounded-[2.5rem] flex flex-col items-center text-center group">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-maroon/5 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Heart className="text-maroon" size={32} />
                    </div>
                    <h3 className="font-vibes text-4xl md:text-5xl text-maroon mb-4">Muhurtham</h3>
                    <p className="font-cormorant text-xl text-maroon/70 mb-2">May 28, 2026</p>
                    <p className="font-lato text-gold tracking-widest text-[10px] font-bold uppercase">7:30 AM - 9:00 AM</p>
                  </div>
                </div>

                {/* Venue Section - Compact & Elegant */}
                <div className="max-w-3xl mx-auto glass-card p-6 md:p-10 rounded-[2.5rem] mb-24 relative overflow-hidden group reveal-on-scroll">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    {/* Left: Styled Map Frame */}
                    <div className="w-full md:w-1/2">
                      <div className="relative group/map">
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-[2rem] aspect-[4/3] flex items-center justify-center border border-white/10 overflow-hidden">
                          <motion.div 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="flex flex-col items-center"
                          >
                            <MapPin size={48} className="text-maroon mb-2 opacity-60" />
                            <div className="w-16 h-[1px] bg-gold/30 rounded-full"></div>
                          </motion.div>
                          <div className="absolute bottom-3 left-0 right-0 text-center">
                            <span className="font-lato text-[7px] uppercase tracking-[0.4em] font-bold text-maroon/30">Musiri, Trichy</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Venue Details & Navigation */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                      <div className="mb-8 text-center md:text-left">
                        <span className="font-lato text-[9px] tracking-[0.5em] text-gold uppercase font-bold mb-1 block opacity-60">Venue</span>
                        <h3 className="flex flex-col leading-tight">
                          <span className="font-playfair text-xl md:text-2xl text-maroon/60 italic">The</span>
                          <span className="font-playfair text-4xl md:text-5xl text-maroon font-bold tracking-tight">Vaasan Mahal</span>
                        </h3>
                        <div className="h-[2px] w-12 bg-gold/30 mt-4 mx-auto md:mx-0"></div>
                      </div>
                      
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.google.com/maps/search/The+Vaasan+Mahal+Musiri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-4 bg-maroon text-gold rounded-full font-lato text-[10px] tracking-[0.4em] uppercase font-bold shadow-xl hover:shadow-maroon/20 transition-all duration-500 ripple-effect"
                      >
                        Navigate
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Countdown Section - Glass UI */}
                <div className="pt-20 border-t border-gold/10 text-center">
                  <span className="font-lato text-[8px] tracking-[0.6em] text-gold uppercase font-bold mb-12 block">The Celebration Begins In</span>
                  <div className="inline-block glass-card p-4 md:p-12 rounded-[2rem] md:rounded-[3rem] glow-shadow">
                    <Countdown targetDate="2026-05-28T07:30:00" />
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
