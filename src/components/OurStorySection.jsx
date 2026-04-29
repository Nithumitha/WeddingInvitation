import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Floating decorative elements parallax
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-transparent py-32 px-4 relative flex flex-col items-center overflow-x-hidden"
    >
      {/* Decorative Floating Elements */}
      <motion.div 
        style={{ y: decorY1, rotate: decorRotate }}
        className="absolute top-1/4 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        style={{ y: decorY2, rotate: -decorRotate }}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-maroon/5 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <span className="font-lato text-[11px] md:text-xs text-gold tracking-[0.8em] uppercase font-bold opacity-70">
            A Journey Through Time
          </span>
          <h2 className="font-playfair text-6xl md:text-9xl text-maroon tracking-tighter font-bold">
            Our Story
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-gold/40 mt-4"
          />
        </motion.div>
      </div>

      {/* Timeline Items Container */}
      <div className="relative w-full max-w-7xl mx-auto space-y-32 md:space-y-0">
        {stories.map((story, index) => (
          <TimelineItem
            key={story.id}
            index={index + 1}
            image={story.image}
            title={story.title}
            text={story.text}
            highlightText={story.highlightText}
            containerRef={scrollContainerRef}
          />
        ))}
      </div>

      {/* Background Watercolor Sprinkles */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-1 h-1 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]"></div>
        <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-maroon/20 rounded-full"></div>
        <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-gold/30 rounded-full"></div>
        <div className="absolute top-[80%] right-[5%] w-1 h-1 bg-maroon/40 rounded-full"></div>
      </div>
    </section>
  );
};

export default OurStorySection;
