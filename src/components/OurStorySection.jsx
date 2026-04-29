import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import TimelineItem from './TimelineItem';

// Import images
import img1 from '../assets/ourStory1.png';
import img3 from '../assets/ourStory3.png';
import img4 from '../assets/ourStory4.png';
import img5 from '../assets/ourStory5.png';
import img6 from '../assets/ourStory6.png';
import img7 from '../assets/ourStory7.png';
import img8 from '../assets/ourStory8.png';

const stories = [
  { id: 1, image: img1, title: "2016", text: "He saw me…and proposed.", highlightText: "I was annoyed. But maybe, destiny had already began." },
  { id: 2, image: img3, title: "The Friendship", text: "Months later… a simple “Hi” on Facebook.", highlightText: "One message became many… Somewhere in between we became friends." },
  { id: 3, image: img4, title: "The Shift", text: "And slowly… without a moment to mark it—", highlightText: "What started as nothing…became everything." },
  { id: 4, image: img5, title: "The Journey", text: "Years passed… Laughter. Fights. Memories.", highlightText: "Through it all—we stayed. And love… quietly grew." },
  { id: 5, image: img6, title: "The Distance", text: "Then came the silence… 🌙", highlightText: "Life took us different ways. No calls. No conversations. Just distance… But somehow, destiny never let go." },
  { id: 6, image: img7, title: "The Return", text: "And then… 🕊️", highlightText: "Without a plan, without a reason—We found our way back. Like we were always meant to." },
  { id: 7, image: img8, title: "The Forever", text: "And this time… 💍", highlightText: "Two hearts, one story… Finally finding their forever. ❤️" },
];

const OurStorySection = ({ scrollContainerRef }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90, restDelta: 0.001 });

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-transparent py-32 px-4 relative flex flex-col items-center overflow-x-hidden"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-lato text-[11px] md:text-xs text-gold tracking-[0.6em] uppercase font-bold opacity-60">The Narrative</span>
          <h2 className="font-playfair text-5xl md:text-8xl text-maroon tracking-tight font-bold">
            Our Story
          </h2>
          <div className="flex items-center gap-6 mt-8">
            <div className="h-[1px] w-12 bg-gold/30"></div>
            <p className="font-cormorant italic text-xl md:text-2xl text-maroon/50 leading-relaxed">
              A journey written in time, sealed in love
            </p>
            <div className="h-[1px] w-12 bg-gold/30"></div>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Curvy Dotted SVG Path - Premium Implementation */}
        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[400px] pointer-events-none">
          <svg 
            viewBox="0 0 400 4200" 
            width="400" 
            height="100%" 
            preserveAspectRatio="none" 
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#D4AF37" stopOpacity="1" />
                <stop offset="80%" stopColor="#D4AF37" stopOpacity="1" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
              </linearGradient>
              
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Background Path (Static Dotted) */}
            <path
              d="M 200 0 
                 C 280 75, 280 225, 200 300
                 C 120 450, 120 750, 200 900
                 C 280 1050, 280 1350, 200 1500
                 C 120 1650, 120 1950, 200 2100
                 C 280 2250, 280 2550, 200 2700
                 C 120 2850, 120 3150, 200 3300
                 C 280 3450, 280 3750, 200 3900
                 C 120 4050, 120 4150, 200 4200"
              fill="transparent"
              stroke="#D4AF37"
              strokeWidth="4"
              strokeDasharray="0.1 20"
              strokeLinecap="round"
              strokeOpacity="0.1"
            />

            {/* Intertwining Dotted Path (The Companion) */}
            <motion.path
              d="M 200 0 
                 C 120 75, 120 225, 200 300
                 C 280 450, 280 750, 200 900
                 C 120 1050, 120 1350, 200 1500
                 C 280 1650, 280 1950, 200 2100
                 C 120 2250, 120 2550, 200 2700
                 C 280 2850, 280 3150, 200 3300
                 C 120 3450, 120 3750, 200 3900
                 C 280 4050, 280 4150, 200 4200"
              initial={{ pathLength: 0 }}
              fill="transparent"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeDasharray="0.1 12"
              strokeLinecap="round"
              style={{ pathLength }}
              strokeOpacity="0.4"
            />

            {/* Main Animated Dotted Path (Primary Trail) */}
            <motion.path
              d="M 200 0 
                 C 280 75, 280 225, 200 300
                 C 120 450, 120 750, 200 900
                 C 280 1050, 280 1350, 200 1500
                 C 120 1650, 120 1950, 200 2100
                 C 280 2250, 280 2550, 200 2700
                 C 120 2850, 120 3150, 200 3300
                 C 280 3450, 280 3750, 200 3900
                 C 120 4050, 120 4150, 200 4200"
              initial={{ pathLength: 0 }}
              fill="transparent"
              stroke="url(#goldGradient)"
              strokeWidth="5"
              strokeDasharray="0.1 18"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ pathLength }}
            />

            {/* Decorative Nodes at Intersections */}
            {[0, 300, 900, 1500, 2100, 2700, 3300, 3900, 4200].map((y, i) => (
              <motion.g key={y}>
                <motion.circle
                  cx="200"
                  cy={y}
                  r="4"
                  fill="#D4AF37"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
                <motion.circle
                  cx="200"
                  cy={y}
                  r="8"
                  fill="transparent"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Timeline Items */}
        <div className="relative z-10">
          {stories.map((story, index) => (
            <TimelineItem
              key={story.id}
              index={index + 1}
              image={story.image}
              title={story.title}
              text={story.text}
              highlightText={story.highlightText}
            />
          ))}
        </div>
      </div>

      {/* Background Watercolor & Kolam Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-gradient-to-bl from-gold/30 to-transparent pointer-events-none blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 bg-gradient-to-tr from-maroon/20 to-transparent pointer-events-none blur-3xl"></div>
      
      {/* Kolam Watermarks */}
      <motion.img 
        src="/kolam_pattern_gold_1777461678251.png"
        className="absolute top-40 -left-20 w-80 h-80 opacity-[0.03] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />
      <motion.img 
        src="/kolam_pattern_gold_1777461678251.png"
        className="absolute bottom-40 -right-20 w-96 h-96 opacity-[0.03] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default OurStorySection;
