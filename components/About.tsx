'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AboutVariant } from '@/types';

interface AboutProps {
  data: AboutVariant;
  showButton?: boolean;
}

export default function About({ data: aboutData, showButton = true }: AboutProps) {

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

  return (
    <section className="w-full bg-[#050505] text-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative pr-4 pb-4"
          >
            <div className="absolute top-12 -left-4 w-16 h-32 border-t-[1px] border-l-[1px] border-red-600 z-10 hidden md:block shadow-[-2px_-2px_8px_rgba(220,38,38,0.3)]" />
            <div className="absolute -top-4 right-[30%] w-8 h-16 border-t-[1px] border-r-[1px] border-red-600 z-10 hidden md:block shadow-[2px_-2px_8px_rgba(220,38,38,0.3)]" />
            <div className="absolute -bottom-4 left-[20%] w-32 h-8 border-b-[1px] border-r-[1px] border-red-600 z-10 hidden md:block shadow-[2px_2px_8px_rgba(220,38,38,0.3)]" />

            <div className="grid grid-cols-[2.2fr_1fr] gap-4 md:gap-6 h-[500px] md:h-[600px] relative z-0">
              <div className="relative h-full w-full border border-gray-400/30 overflow-hidden bg-[#0a0a0a] rounded-sm">
                <Image
                  src={aboutData.image1}
                  alt="Tattoo Artist"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="grid grid-rows-2 gap-4 md:gap-6 h-full">
                <div className="relative h-full w-full border border-gray-400/30 overflow-hidden bg-[#0a0a0a] rounded-sm">
                  <Image
                    src={aboutData.image2}
                    alt="Tattoo Art"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="relative h-full w-full border border-gray-400/30 overflow-hidden bg-[#0a0a0a] rounded-sm">
                  <Image
                    src={aboutData.image3}
                    alt="Tattoo Studio"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-6">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {aboutData.subtitle}
              </h3>
              <div className="w-16 h-[1px] bg-white/20" />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide mb-8">
              <span className="text-white block">{aboutData.titleLine1}</span>
              <span className="text-red-600 block">{aboutData.titleLine2}</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              {aboutData.description1}
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed mb-12">
              {aboutData.description2}
            </motion.p>

           
            {showButton && aboutData.buttonText && (
              <motion.a
                variants={itemVariants}
                href={aboutData.buttonLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 text-sm font-bold tracking-wider uppercase overflow-hidden w-fit"
              >
                <span className="relative z-10 flex items-center">
                  {aboutData.buttonText}
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

