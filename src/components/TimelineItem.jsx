import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ index, image, title, text, highlightText, isVisible }) => {
  const isIllustrationLeft = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-start md:items-center justify-center w-full mb-12 md:mb-16 ${
        isIllustrationLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } pl-16 md:pl-0 gap-6 md:gap-0`}
    >
      {/* Illustration Area */}
      <div className={`w-full md:w-[45%] flex ${isIllustrationLeft ? 'justify-start md:justify-end md:pr-12' : 'justify-start md:pl-12'}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={`Story step ${index}`} 
            className="w-full max-w-[200px] md:max-w-[300px] h-auto object-contain mix-blend-multiply opacity-95 transition-transform duration-1000 hover:scale-105"
          />
        </div>
      </div>

      {/* Center Node on the path */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1/2 story-line-node"></div>

      {/* Text Area */}
      <div className={`w-full md:w-[45%] flex flex-col items-start px-0 md:px-6`}>
        <div className={`max-w-[300px] text-left ${isIllustrationLeft ? '' : 'md:text-right'}`}>
          {title && (
            <h3 className="font-playfair text-xl md:text-2xl text-story-text mb-2 flex items-center gap-2 opacity-90 font-bold uppercase tracking-wider">
              {title}
            </h3>
          )}
          <div className="font-playfair text-lg md:text-xl text-story-text/90 leading-relaxed space-y-1 italic">
            {text.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            {highlightText && (
              <p className="text-accent-maroon font-bold mt-2 text-xl font-lato uppercase tracking-wider not-italic">{highlightText}</p>
            )}
          </div>
          
          {/* Decorative line */}
          <div className={`h-[1px] w-8 bg-accent-maroon/10 mt-3 ${
            isIllustrationLeft ? 'mr-auto' : 'ml-auto'
          }`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
