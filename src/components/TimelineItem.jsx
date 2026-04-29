import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ index, image, title, text, highlightText }) => {
  const isIllustrationLeft = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-32 md:mb-56 ${isIllustrationLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } gap-12 md:gap-32 pl-20 md:pl-0`}
    >
      {/* Illustration Area - Floating Effect */}
      <div className="w-full md:w-1/2 flex items-center justify-center md:justify-center">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative group"
        >
          <img
            src={image}
            alt={`Story step ${index}`}
            className="relative w-full max-w-[200px] md:max-w-[360px] h-auto object-contain mix-blend-multiply transition-all duration-1000 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Center Node on the path */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 w-4 h-4 bg-white border-2 border-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)] z-10"></div>

      {/* Text Area - Emotional Typography */}
      <div className={`w-full md:w-1/2 flex flex-col items-start px-0 md:px-0`}>
        <div className={`max-w-[400px] text-left ${isIllustrationLeft ? 'md:text-left md:items-start' : 'md:text-right md:items-end'} flex flex-col`}>
          {title && (
            <span className="font-lato text-[10px] tracking-[0.6em] text-gold uppercase font-bold mb-4 block">
              {title}
            </span>
          )}
          <h3 className="font-playfair text-2xl md:text-5xl text-maroon mb-6 leading-tight opacity-90">
            {text}
          </h3>
          {highlightText && (
            <p className="font-cormorant text-xl md:text-3xl text-maroon/50 italic font-light leading-relaxed">
              {highlightText}
            </p>
          )}

          {/* Decorative line - Desktop Only */}
          <div className={`hidden md:block h-[1px] w-8 bg-maroon/10 mt-3 ${isIllustrationLeft ? '' : 'md:ml-auto'
            }`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
