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
  {
    id: 1,
    image: img1,
    title: "2016",
    text: "He saw me,\nand decided to try his luck",
    highlightText: "I was annoyed.\nMay be that was\ndestiny beginning its story."
  },
  {
    id: 2,
    image: img3,
    title: "The Friendship",
    text: "Months later..\na simple \"Hi\" on Facebook.",
    highlightText: "One message \nturned into many.. \nAnd somewhere in between,\nwe became friends."
  },
  {
    id: 3,
    image: img4,
    title: "The Shift",
    text: "And slowly..",
    highlightText: "What started as nothing,\nbecame everything."
  },
  {
    id: 4,
    image: img5,
    title: "The Journey",
    text: "Years passed..\nLaughter. Fights. Memories.",
    highlightText: "Through it all, we stayed.\nAnd our love quietly grew."
  },
  {
    id: 5,
    image: img6,
    title: "The Distance",
    text: "Then came the silence..",
    highlightText: "Life took us different ways.\nNo calls. \nNo conversations. \nJust distance..\nBut somehow, destiny never let go."
  },
  {
    id: 6,
    image: img7,
    title: "The Return",
    text: "And then..",
    highlightText: "Without a plan, without a reason—\nWe found our way back."
  },
  {
    id: 7,
    image: img8,
    title: "The Forever",
    text: "And this time..",
    highlightText: "Two hearts, one story..\nFinally finding our forever. ❤️"
  },
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
      <div className="max-w-4xl mx-auto text-center mb-[var(--section-gap)] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="fluid-label text-gold opacity-60">The Narrative</span>
          <h2 className="fluid-h2 text-maroon font-bold">
            Our Story
          </h2>
          <div className="flex items-center gap-6 mt-8">
            <div className="h-[1px] w-12 bg-gold/30"></div>
            <p className="fluid-body italic text-maroon/80">
              A journey written in time, sealed in love
            </p>
            <div className="h-[1px] w-12 bg-gold/30"></div>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Minimalist Single Dotted Path */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[40px] md:w-[200px] pointer-events-none">
          <svg
            viewBox="0 0 100 4200"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            {/* Single Fine Gold Thread - Precisely Aligned to Nodes */}
            <motion.path
              d="M 50 0 
                 C 65 150, 65 150, 50 300
                 C 35 600, 35 600, 50 900
                 C 65 1200, 65 1200, 50 1500
                 C 35 1800, 35 1800, 50 2100
                 C 65 2400, 65 2400, 50 2700
                 C 35 3000, 35 3000, 50 3300
                 C 65 3600, 65 3600, 50 3900
                 C 35 4100, 35 4100, 50 4200"
              initial={{ pathLength: 0 }}
              fill="transparent"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeDasharray="1 10"
              strokeLinecap="round"
              style={{ pathLength }}
              strokeOpacity="0.5"
            />

            {/* Subtle start/end points */}
            <circle cx="50" cy="0" r="1.5" fill="#D4AF37" opacity="0.5" />
            <circle cx="50" cy="4200" r="1.5" fill="#D4AF37" opacity="0.5" />
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
