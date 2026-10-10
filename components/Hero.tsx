'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroVariant } from '@/types';

interface HeroProps {
  data: HeroVariant;
}

export default function Hero({ data: heroData }: HeroProps) {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = heroData.slides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${slides[currentSlide].image}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="max-w-2xl mt-6 md:mt-12"
          >
            <div className="flex items-center space-x-2 text-xs md:text-sm tracking-[0.2em] font-medium mb-3 md:mb-6">
              <span className="text-red-600 uppercase">{slides[currentSlide].subtitlePart1}</span>
              <span className="text-gray-300 uppercase">{slides[currentSlide].subtitlePart2}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans uppercase leading-[1.05] tracking-wide mb-4 md:mb-8">
              <span className="text-white block">{slides[currentSlide].titleLine1}</span>
              <span className="text-red-600 block">{slides[currentSlide].titleLine2}</span>
            </h1>

            <div 
              className="text-gray-300 text-sm md:text-xl font-light leading-relaxed mb-5 md:mb-10 max-w-lg"
              dangerouslySetInnerHTML={{ __html: slides[currentSlide].description }}
            />

            <motion.a
              href={slides[currentSlide].buttonLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 text-sm md:text-base font-bold tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {slides[currentSlide].buttonText}
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group py-2 focus:outline-none"
              >
                <div 
                  className={`h-1 transition-all duration-500 ease-out ${
                    idx === currentSlide 
                      ? 'w-10 bg-red-600' 
                      : 'w-6 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center text-red-500 hover:text-white hover:border-red-500 hover:bg-red-600/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
}
