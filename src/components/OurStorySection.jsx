import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

import { useScroll, useSpring, useTransform } from 'framer-motion';

const OurStorySection = ({ scrollContainerRef }) => {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90, restDelta: 0.001 });

  // Map scroll progress to the dot's position (roughly 0-100% of the path)
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);


  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-transparent py-32 px-4 relative overflow-hidden flex flex-col items-center"
    >



      {/* Header */}
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
        {/* Wiggly Dotted SVG Path - Repositioned for mobile to avoid overlap */}
        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-[60px] bottom-0 w-[4px]">
          <svg width="400" height="100%" className="overflow-visible absolute left-1/2 -translate-x-1/2" style={{ top: 0 }}>
            <motion.path
              d="M 200 0 
                 C 280 120, 120 220, 200 320 
                 C 280 440, 120 540, 200 640 
                 C 280 760, 120 860, 200 960 
                 C 280 1080, 120 1180, 200 1280 
                 C 280 1400, 120 1500, 200 1600
                 C 280 1720, 120 1820, 200 1920
                 C 280 2040, 120 2140, 200 2240
                 C 280 2360, 120 2460, 200 2560
                 C 280 2680, 120 2780, 200 2880
                 C 280 3000, 120 3100, 200 3200
                 C 280 3320, 120 3420, 200 3520
                 C 280 3640, 120 3740, 200 3840
                 C 280 3960, 120 4060, 200 4160"
              initial={{ pathLength: 0 }}
              fill="transparent"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="8 12"
              strokeLinecap="round"
              style={{ pathLength }}
            />
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



      {/* Background Watercolor Sprinkles */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-gradient-to-bl from-purple-200 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 bg-gradient-to-tr from-purple-200 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default OurStorySection;
