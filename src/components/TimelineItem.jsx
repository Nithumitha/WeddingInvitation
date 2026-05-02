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
      className={`relative flex flex-col md:flex-row ${isIllustrationLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-start md:justify-between w-full h-auto md:h-[clamp(350px,70vh,600px)] gap-8 md:gap-[5vmin] pb-16 md:pb-0`}
    >
      {/* Illustration Area - Floating Effect */}
      <div className="w-full md:w-1/2 flex items-center justify-center pl-12 md:pl-0">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative group rounded-full overflow-hidden"
          style={{ backgroundColor: '#ffdede' }}
        >
          <img
            src={image}
            alt={`Story step ${index}`}
            className="relative h-auto object-contain mix-blend-multiply transition-all duration-1000 group-hover:scale-105"
            style={{
              width: 'clamp(120px, 40vmin, 400px)',
              filter: 'contrast(1.25) brightness(1.05) saturate(1.1)',
              maskImage: 'radial-gradient(circle, black 60%, transparent 98%)',
              WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 98%)'
            }}
          />
        </motion.div>
      </div>

      {/* Center Node on the path - Fixed to the left on mobile */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-8 z-20">
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: false }}
          className="bg-white border-2 border-gold relative"
          style={{ width: 'clamp(10px, 2vmin, 16px)', height: 'clamp(10px, 2vmin, 16px)' }}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gold/20 animate-pulse"></div>

          {/* Outer Ring */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 border border-gold/30 rounded-full"
          ></motion.div>
        </motion.div>
      </div>

      {/* Text Area - Emotional Typography */}
      <div className="w-full md:w-1/2 flex flex-col items-start pl-12 md:px-0">
        <div className={`w-full max-w-none md:max-w-[45vmin] ${isIllustrationLeft ? 'text-left md:items-start' : 'text-left md:text-right md:items-end'} flex flex-col`}>
          {title && (
            <span className="fluid-label text-[#8B6B00] mb-2 md:mb-4 block font-bold">
              {title}
            </span>
          )}
          <h3 className="fluid-h3 text-maroon mb-2 md:mb-6 font-bold whitespace-pre-line">
            {text}
          </h3>
          {highlightText && (
            <p className="fluid-body text-maroon/80 italic whitespace-pre-line">
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
