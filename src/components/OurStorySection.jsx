import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

// Import images
import img1 from '../assets/ourStory1.png';
import img2 from '../assets/ourStory2.png';
import img3 from '../assets/ourStory3.png';
import img4 from '../assets/ourStory4.png';
import img5 from '../assets/ourStory5.png';
import img6 from '../assets/ourStory6.png';
import img7 from '../assets/ourStory7.png';
import img8 from '../assets/ourStory8.png';

const stories = [
  { id: 1, image: img1, title: "2016", text: "He saw her." },
  { id: 2, image: img2, text: "She walked past." },
  { id: 3, image: img3, text: "But something stayed." },
  { id: 4, image: img4, text: "Not every story\nbegins with love.", highlightText: "But this one did." },
  { id: 5, image: img5, title: "Years passed.", text: "Laughter.\nFights.\nMemories.", highlightText: "Love stayed." },
  { id: 6, image: img6, title: "Distance came.", text: "But never distance\nbetween hearts." },
  { id: 7, image: img7, title: "And somehow...", text: "they found their way\nback to each other." },
  { id: 8, image: img8, title: "And this time—", text: "forever felt right." },
];

const OurStorySection = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    if (visibleIndex < stories.length) {
      const timer = setInterval(() => {
        setVisibleIndex((prev) => prev + 1);
      }, 1200);
      return () => clearInterval(timer);
    }
  }, [visibleIndex]);

  return (
    <section id="story" className="watercolor-bg py-32 px-4 relative overflow-hidden flex flex-col items-center">
      


      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="font-playfair text-5xl md:text-7xl text-accent-maroon mb-6 tracking-[0.3em] uppercase font-bold"
        >
          Our Story
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-lato text-[10px] md:text-xs text-story-text/50 tracking-[0.6em] uppercase font-bold">
            A journey written in time,
          </p>
          <p className="font-lato text-[10px] md:text-xs text-story-text/50 tracking-[0.6em] uppercase font-bold flex items-center gap-3">
            sealed in love <span className="text-red-200 scale-75">♥</span>
          </p>
        </motion.div>
        
        {/* Ornate Divider */}
        <div className="mt-12 flex justify-center items-center gap-6 text-accent-maroon/20">
          <div className="h-[0.5px] w-16 bg-current"></div>
          <span className="text-xl italic opacity-50">❦</span>
          <div className="h-[0.5px] w-16 bg-current"></div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Wiggly Dotted SVG Path - More delicate and thinner */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[60px] bottom-0 w-[2px]">
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
                 C 280 2360, 120 2460, 200 2560"
              fill="none"
              stroke="#d6c8bd"
              strokeWidth="1.5"
              className="dotted-path"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: visibleIndex / stories.length }}
              transition={{ duration: 1.2, ease: "linear" }}
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
              isVisible={index < visibleIndex}
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
