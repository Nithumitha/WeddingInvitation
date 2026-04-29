import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TimelineItem = ({ index, image, title, text, highlightText, containerRef }) => {
  const itemRef = useRef(null);
  const isEven = index % 2 === 0;

  // Track scroll progress for this specific item
  const { scrollYProgress } = useScroll({
    target: itemRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  // 1. Vertical movement
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const physicsY = useSpring(y, { stiffness: 100, damping: 30 });

  // 2. Opacity and Scale
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // 3. Side movement - reduced for mobile to avoid horizontal scroll
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [isEven ? 20 : -20, isEven ? -10 : 10]
  );

  return (
    <div 
      ref={itemRef} 
      className={`relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center py-12 md:py-20 overflow-hidden`}
    >
      {/* Large Background Year/Title - Wrapped to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.04, 0]),
            x: useTransform(scrollYProgress, [0, 1], [isEven ? -50 : 50, isEven ? 50 : -50]),
            scale: 1.2
          }}
          className="absolute inset-0 flex items-center justify-center z-0 select-none"
        >
          <span className="font-playfair text-[10rem] md:text-[20rem] text-maroon font-bold whitespace-nowrap opacity-50">
            {title || index}
          </span>
        </motion.div>
      </div>

      <motion.div
        style={{ 
          y: physicsY, 
          x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : x, // Disable X on mobile
          opacity, 
          scale,
          filter: blur
        }}
        className={`relative z-10 w-full max-w-5xl flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 px-8 md:px-16`}
      >
        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full max-w-[220px] md:max-w-full"
          >
            <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full -z-10 transform scale-110"></div>
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[350px] md:max-h-[450px] object-contain mix-blend-multiply drop-shadow-xl"
              style={{ 
                filter: 'contrast(1.1) brightness(1.05)',
                maskImage: 'radial-gradient(circle, black 70%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle, black 70%, transparent 100%)'
              }}
            />
          </motion.div>
        </div>

        {/* Text Side */}
        <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-lato text-[9px] md:text-[10px] tracking-[0.5em] text-gold uppercase font-bold mb-3 md:mb-4 block">
              {title}
            </span>
            <h3 className="font-playfair text-2xl md:text-5xl text-maroon mb-4 md:mb-6 leading-tight font-bold">
              {text}
            </h3>
            <p className="font-cormorant text-lg md:text-2xl text-maroon/60 italic leading-relaxed px-4 md:px-0">
              {highlightText}
            </p>
            
            <div className={`mt-6 md:mt-8 h-[1px] w-12 bg-gold/30 ${isEven ? 'ml-auto' : 'mr-auto'}`}></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
