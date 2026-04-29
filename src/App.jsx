import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Heart, Clock, Music, ArrowDown, Sparkles, Volume2, VolumeX, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from './assets/bg-music.mp3';
import OurStorySection from './components/OurStorySection';
import cornerFlower from './assets/cornerFlowerImage.png';
import coupleCorner from './assets/coupleCornerImage.png';

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
  <div className="flex justify-center mb-8 opacity-80">
    <svg width="60" height="60" viewBox="0 0 100 100" className="text-maroon fill-current">
      <path d="M50 10 C40 10 30 20 30 35 C30 50 40 60 50 60 C60 60 70 50 70 35 C70 20 60 10 50 10 M50 25 C45 25 42 28 42 32 C42 36 45 39 50 39 C55 39 58 36 58 32 C58 28 55 25 50 25 M30 70 Q50 90 70 70 Q90 60 90 40 Q90 20 70 10" stroke="currentColor" fill="none" strokeWidth="2" />
      <circle cx="50" cy="50" r="2" />
    </svg>
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
    <div className="flex gap-0.5 md:gap-8 justify-center flex-nowrap">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="bg-white/20 backdrop-blur-xl p-2 md:p-8 rounded-[0.8rem] md:rounded-[2rem] border border-white/30 shadow-2xl flex flex-col items-center min-w-[62px] md:min-w-[120px] group hover:scale-105 transition-all duration-500">
          <span className="text-xl md:text-6xl font-playfair text-maroon mb-1 animate-pulse">{value}</span>
          <span className="text-[7px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.4em] text-gold font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
};

const RosePetals = () => {
  const petals = Array.from({ length: 25 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      {petals.map((_, i) => {
        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.3;

        return (
          <div
            key={i}
            className="petal"
            style={{
              width: `${size}px`,
              height: `${size * 0.8}px`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: opacity
            }}
          />
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

      {/* Elegant Corner Decorations - Persistent across all pages */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#fffaf5]">
        <img
          src={cornerFlower}
          alt=""
          className="absolute -top-5 -right-5 w-32 md:w-80 opacity-60 md:opacity-80"
        />
        <img
          src={coupleCorner}
          alt=""
          className="absolute -bottom-5 -left-5 w-40 md:w-96 opacity-60 md:opacity-80"
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
      <main className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-peach-blush">
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

                  <div className="text-center space-y-6">
                    <p className="font-lato text-gold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-6 font-bold">Om</p>
                    <p className="font-cormorant italic text-maroon/70 text-xl md:text-3xl leading-relaxed font-semibold">We joyfully invite you to the wedding of</p>

                    <h1 className="font-vibes text-maroon flex flex-col items-center leading-none py-4 md:py-8 font-normal">
                      <span style={{ fontSize: 'clamp(2.5rem, 12vw, 8.5rem)' }}>Krithick</span>
                      <span className="opacity-40" style={{ fontSize: 'clamp(1.5rem, 6vw, 4.5rem)' }}>&</span>
                      <span style={{ fontSize: 'clamp(2.5rem, 12vw, 8.5rem)' }}>Nithu</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 py-2 md:py-6">
                      <div className="h-[1px] w-8 md:w-12 bg-gold/50"></div>
                      <p className="font-display text-maroon text-xl md:text-2xl tracking-widest uppercase">MAY 28, 2026</p>
                      <div className="h-[1px] w-8 md:w-12 bg-gold/50"></div>
                    </div>

                    <p className="font-cormorant text-lg md:text-4xl text-maroon/60 italic font-light tracking-wide px-4">
                      "Where love found its forever..."
                    </p>

                    <div className="pt-8 md:pt-12 flex flex-col items-center">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
                  {/* Reception Card */}
                  <div className="glass-card p-6 md:p-10 rounded-[2rem] flex flex-col items-center text-center group hover:translate-y-[-10px] transition-all duration-500">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-maroon/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                      <Music className="text-maroon" size={28} md:size={32} />
                    </div>
                    <h3 className="font-vibes text-4xl md:text-5xl text-maroon mb-4">Reception</h3>
                    <p className="font-cormorant text-xl text-maroon/70 mb-2">May 27, 2026</p>
                    <p className="font-lato text-gold tracking-widest text-[10px] font-bold uppercase">6:30 PM Onwards</p>
                  </div>

                  {/* Muhurtham Card */}
                  <div className="glass-card p-6 md:p-10 rounded-[2rem] flex flex-col items-center text-center group hover:translate-y-[-10px] transition-all duration-500">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-maroon/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                      <Heart className="text-maroon" size={28} md:size={32} />
                    </div>
                    <h3 className="font-vibes text-4xl md:text-5xl text-maroon mb-4">Muhurtham</h3>
                    <p className="font-cormorant text-xl text-maroon/70 mb-2">May 28, 2026</p>
                    <p className="font-lato text-gold tracking-widest text-[10px] font-bold uppercase">7:30 AM - 9:00 AM</p>
                  </div>
                </div>

                {/* Venue Section - Redesigned as a Wide Scene */}
                <div className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] mb-24 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                      <div className="bg-maroon/5 rounded-2xl aspect-video flex items-center justify-center border border-maroon/10 mb-6 overflow-hidden">
                        <div className="flex flex-col items-center opacity-30">
                          <MapPin size={48} className="mb-2" />
                          <span className="font-lato text-[8px] uppercase tracking-widest font-bold">Interactive Map Preview</span>
                        </div>
                      </div>
                      <h3 className="font-vibes text-6xl text-maroon mb-4">The Vaasan Mahal</h3>
                      <p className="font-lato text-maroon/50 text-[10px] tracking-[0.2em] uppercase">Musiri, Trichy</p>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                      <p className="font-cormorant text-2xl text-maroon/70 italic mb-10 text-center md:text-left leading-relaxed">
                        "In a setting as timeless as our love, we await your presence to grace our union."
                      </p>
                      <a
                        href="https://www.google.com/maps/search/The+Vaasan+Mahal+Musiri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 py-5 bg-maroon text-gold rounded-full font-lato text-[11px] tracking-[0.4em] uppercase font-bold hover:scale-110 active:scale-95 transition-all shadow-2xl glow-shadow glow-text"
                      >
                        Navigate to Venue
                      </a>
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
