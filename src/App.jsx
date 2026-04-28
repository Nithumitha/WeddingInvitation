import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Heart, Clock, Music, ArrowDown, Sparkles, Volume2, VolumeX, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from './assets/bg-music.mp3';
import OurStorySection from './components/OurStorySection';
import backgroundImg from './assets/background.jpg';

// --- Sub-components ---

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`min-h-screen flex flex-col items-center justify-center relative py-20 px-4 ${className}`}>
    {children}
  </section>
);

const DecorativeCorner = ({ className }) => (
  <svg className={`absolute w-16 h-16 md:w-32 md:h-32 text-gold/40 ${className}`} viewBox="0 0 100 100">
    <path d="M0 0 L100 0 L100 5 L5 5 L5 100 L0 100 Z" fill="currentColor"/>
    <circle cx="15" cy="15" r="5" fill="currentColor"/>
    <path d="M30 0 Q30 30 0 30" stroke="currentColor" fill="none" strokeWidth="2"/>
  </svg>
);

const GaneshaIcon = () => (
  <div className="flex justify-center mb-8 opacity-80">
    <svg width="60" height="60" viewBox="0 0 100 100" className="text-maroon fill-current">
      <path d="M50 10 C40 10 30 20 30 35 C30 50 40 60 50 60 C60 60 70 50 70 35 C70 20 60 10 50 10 M50 25 C45 25 42 28 42 32 C42 36 45 39 50 39 C55 39 58 36 58 32 C58 28 55 25 50 25 M30 70 Q50 90 70 70 Q90 60 90 40 Q90 20 70 10" stroke="currentColor" fill="none" strokeWidth="2"/>
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
    <div className="flex gap-4 md:gap-8 justify-center mt-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="bg-white/50 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gold/20 shadow-inner flex flex-col items-center min-w-[70px]">
          <span className="text-2xl md:text-4xl font-display text-maroon">{value}</span>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{label}</span>
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
        const delay = Math.random() * 10;
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
      
      {/* Global Background Image - Only on First Page */}
      {currentStep === 0 && (
        <div 
          className="fixed inset-0 z-[-1] opacity-40 pointer-events-none"
          style={{ 
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Audio Element */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Music Toggle Button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[60] bg-white/80 backdrop-blur-md p-4 rounded-full border border-gold/30 shadow-lg text-gold hover:scale-110 transition-all active:scale-95 group"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 size={24} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 flex gap-0.5">
               <span className="w-1 h-3 bg-gold animate-[music_1s_ease-in-out_infinite_0.1s] rounded-full"></span>
               <span className="w-1 h-4 bg-gold animate-[music_1s_ease-in-out_infinite_0.3s] rounded-full"></span>
               <span className="w-1 h-2 bg-gold animate-[music_1s_ease-in-out_infinite_0.5s] rounded-full"></span>
            </div>
          </div>
        ) : (
          <VolumeX size={24} className="opacity-50" />
        )}
      </button>
      


      {/* Page Content with Transitions */}
      <main className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="front"
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full flex justify-center relative h-full items-center"
            >
              <RosePetals />
              <Section id="home" className="bg-transparent py-0 h-auto">
                <div className="invite-card max-w-4xl w-full relative">


                  <GaneshaIcon />
                  
                  <div className="text-center space-y-6">
                    <p className="font-lato text-gold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-6 font-bold">Shri Ganeshay Namah</p>
                    <p className="font-cormorant italic text-maroon/70 text-xl md:text-3xl leading-relaxed font-semibold">We joyfully invite you to the wedding of</p>
                    
                    <h1 className="font-vibes text-maroon flex flex-col items-center leading-none py-8 font-normal">
                      <span style={{ fontSize: 'clamp(3.5rem, 12vw, 8.5rem)' }}>Krithick</span>
                      <span className="opacity-40" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>&</span>
                      <span style={{ fontSize: 'clamp(3.5rem, 12vw, 8.5rem)' }}>Nithu</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 py-6">
                      <div className="h-[1px] w-12 bg-gold/50"></div>
                      <p className="font-display text-maroon text-2xl tracking-widest">MAY 27 - 28, 2026</p>
                      <div className="h-[1px] w-12 bg-gold/50"></div>
                    </div>

                    <p className="font-cormorant text-2xl md:text-4xl text-maroon/60 italic font-light tracking-wide">
                      "Where love found its forever..."
                    </p>

                    <div className="pt-12 flex flex-col items-center">
                      <button 
                        onClick={handleOpen}
                        className="relative group cursor-pointer"
                      >
                        {/* Pulsing Outer Rings */}
                        <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping scale-150 opacity-20"></div>
                        <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse scale-125"></div>
                        
                        {/* The Seal Button */}
                        <div className="relative w-24 h-24 bg-maroon rounded-full flex flex-col items-center justify-center border-4 border-gold/50 shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                          <Sparkles className="text-gold mb-1 animate-pulse" size={24} />
                          <span className="font-display text-[8px] tracking-[0.2em] text-gold font-bold uppercase">Open</span>
                        </div>
                        
                        {/* Label */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 text-center">
                           <p className="font-display text-[10px] tracking-[0.4em] text-maroon/60 uppercase animate-bounce">Tap to Reveal</p>
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl h-[85vh] overflow-y-auto scrollbar-hide py-10 my-auto"
            >
              <OurStorySection />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="event"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl h-[85vh] overflow-y-auto scrollbar-hide py-10 my-auto"
            >
              <div className="invite-card w-full bg-white/40 backdrop-blur-md border-2 border-gold/10 p-8 md:p-16 relative">
                <DecorativeCorner className="top-0 left-0 opacity-20" />
                <DecorativeCorner className="top-0 right-0 rotate-90 opacity-20" />
                
                <header className="text-center mb-20">
                  <h2 className="font-playfair text-4xl md:text-5xl text-maroon tracking-[0.2em] mb-4 uppercase">Join us in Celebration</h2>
                  <div className="h-[1px] w-24 bg-gold/40 mx-auto"></div>
                </header>

                <div className="relative space-y-24">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/20 -translate-x-1/2 hidden md:block"></div>

                  {/* 1. Reception */}
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
                    <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1">
                      <h3 className="font-vibes text-6xl text-maroon">Reception</h3>
                      <p className="font-cormorant text-2xl text-maroon/80 mt-2">Wednesday, May 27, 2026</p>
                      <p className="font-lato text-gold tracking-widest text-sm mt-1 font-bold">6:30 PM Onwards</p>
                    </div>
                    <div className="relative z-10 w-20 h-20 bg-white border-2 border-gold/20 rounded-full flex items-center justify-center shadow-lg order-1 md:order-2 md:mx-auto">
                      <Music className="text-maroon" size={28} />
                    </div>
                    <div className="md:w-1/2 md:pl-16 order-3 hidden md:block">
                      <p className="font-cormorant text-2xl text-maroon/50 italic font-light">An evening of celebration and dinner</p>
                    </div>
                  </div>

                  {/* 2. Muhurtham */}
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
                    <div className="md:w-1/2 md:pr-16 order-2 md:order-1 hidden md:block md:text-right">
                      <p className="font-cormorant text-2xl text-maroon/50 italic font-light">Seeking your blessings for our new journey</p>
                    </div>
                    <div className="relative z-10 w-20 h-20 bg-white border-2 border-gold/20 rounded-full flex items-center justify-center shadow-lg order-1 md:order-2 md:mx-auto">
                      <Heart className="text-maroon" size={28} />
                    </div>
                    <div className="md:w-1/2 md:pl-16 order-3">
                      <h3 className="font-vibes text-6xl text-maroon">Muhurtham</h3>
                      <p className="font-cormorant text-2xl text-maroon/80 mt-2">Thursday, May 28, 2026</p>
                      <p className="font-lato text-gold tracking-widest text-sm mt-1 font-bold">7:30 AM - 9:00 AM</p>
                    </div>
                  </div>

                  {/* 3. Venue */}
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
                    <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1">
                      <h3 className="font-vibes text-6xl text-maroon">The Venue</h3>
                      <p className="font-cormorant text-2xl text-maroon/80 mt-2">The Vaasan Mahal</p>
                      <p className="font-lato text-maroon/50 text-[10px] tracking-[0.2em] uppercase mt-1">T. Pettai Road, Musiri, Trichy</p>
                    </div>
                    <div className="relative z-10 w-20 h-20 bg-maroon text-white rounded-full flex items-center justify-center shadow-xl order-1 md:order-2 md:mx-auto scale-110">
                      <MapPin size={28} />
                    </div>
                    <div className="md:w-1/2 md:pl-16 order-3">
                      <a 
                        href="https://www.google.com/maps/search/The+Vaasan+Mahal+Musiri" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block border border-gold/40 text-gold hover:bg-gold hover:text-white px-8 py-3 rounded-full font-lato text-[10px] tracking-[0.3em] transition-all uppercase font-bold"
                      >
                        Open Maps
                      </a>
                    </div>
                  </div>
                </div>

                {/* Countdown Section */}
                <div className="mt-32 pt-16 border-t border-gold/10 text-center">
                  <h4 className="font-vibes text-7xl text-maroon mb-10">Days Until Forever</h4>

                  <Countdown targetDate="2026-05-28T07:30:00" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Navigation Controls */}
        {currentStep > 0 && (
          <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4">
            <button 
              onClick={prevStep}
              className="p-3 bg-white/80 backdrop-blur-md rounded-full border border-gold/20 shadow-lg text-gold hover:scale-110 transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="font-display text-[10px] tracking-[0.3em] text-maroon uppercase">
              Page {currentStep + 1} / {steps.length}
            </span>
            {currentStep < steps.length - 1 && (
              <button 
                onClick={nextStep}
                className="p-3 bg-white/80 backdrop-blur-md rounded-full border border-gold/20 shadow-lg text-gold hover:scale-110 transition-all active:scale-95"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </main>





    </div>
  );
}

export default App;
