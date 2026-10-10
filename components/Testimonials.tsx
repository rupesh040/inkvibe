'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Testimonial, TestimonialVariant } from '@/types';

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 14.5L8.5 18.5H4.5L6.5 14.5V7.5H11.5V14.5H10.5Z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 14.5L17.5 18.5H13.5L15.5 14.5V7.5H20.5V14.5H19.5Z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface TestimonialsProps {
  data: TestimonialVariant;
}

export default function Testimonials({ data: testimonialData }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const testimonials = testimonialData.testimonials;

  const goNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  };

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="flex flex-col border border-red-600/30 p-8 md:p-10 bg-[#080808] h-full">
      <div className="flex justify-between items-start mb-8">
        <QuoteIcon />
        <div className="flex space-x-1 mt-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
          ))}
        </div>
      </div>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 flex-grow">
        {testimonial.text}
      </p>
      <div className="mt-auto">
        <div className="w-8 h-[2px] bg-red-600 mb-4" />
        <h4 className="uppercase text-xs font-bold tracking-[0.15em] text-gray-400">
          {testimonial.author}
        </h4>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#050505] text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-8">
          <div className="flex flex-col">
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center space-x-4 mb-4">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {testimonialData.subtitle}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </motion.div>
            <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-5xl md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide">
              <span className="text-white mr-4">{testimonialData.titleLine1}</span>
              <span className="text-red-600">{testimonialData.titleLine2}</span>
            </motion.h2>
          </div>

          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex space-x-4 pb-2">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-[#dc2626] flex items-center justify-center text-white hover:bg-[#b91c1c] transition-colors"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>

        <div className="block md:hidden relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80, transition: { duration: 0.3, ease: 'easeIn' } }}
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-8 bg-red-600' : 'w-4 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial: Testimonial, idx: number) => (
            <motion.div key={idx} variants={itemVariants}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
