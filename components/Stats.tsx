'use client';

import React from 'react';
import Image from 'next/image';
import { PenTool, Users, Trophy, Star } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import contentData from '@/data/content.json';
import { ContentData, StatItem } from '@/types';

const typedContentData = contentData as ContentData;

const IconMap: Record<string, React.ElementType> = {
  'pen-tool': PenTool,
  'users': Users,
  'trophy': Trophy,
  'star': Star,
};

export default function Stats() {
  const statsVariantId = typedContentData.Tattoo.templateComponents["template-1"].pages.home.Stats;
  const statsData = typedContentData.Tattoo.sections.Stats.variants[statsVariantId];

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
    <section className="w-full bg-black text-white py-24 md:py-32 relative overflow-hidden">
      
      <div 
        className="absolute top-0 left-0 w-3/4 md:w-1/3 h-full z-0 pointer-events-none" 
        style={{ 
          maskImage: 'linear-gradient(to right, black 20%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)' 
        }}
      >
        <Image 
          src={statsData.imageLeft} 
          alt="Tattoo Machine" 
          fill 
          className="object-cover opacity-20 md:opacity-60 mix-blend-lighten" 
        />
      </div>

      <div 
        className="absolute top-0 right-0 w-3/4 md:w-1/3 h-full z-0 pointer-events-none" 
        style={{ 
          maskImage: 'linear-gradient(to left, black 20%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)' 
        }}
      >
        <Image 
          src={statsData.imageRight} 
          alt="Tattoo Artist" 
          fill 
          className="object-cover opacity-20 md:opacity-60 mix-blend-lighten" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 items-center justify-center relative z-10"
        >
          {statsData.stats.map((stat: StatItem, idx: number) => {
            const IconComponent = IconMap[stat.icon] || Star;
            
            let borderClasses = "border-red-600/30 ";
            if (idx === 0) borderClasses += "border-r border-b md:border-b-0";
            else if (idx === 1) borderClasses += "border-b md:border-b-0 md:border-r";
            else if (idx === 2) borderClasses += "border-r";
            else borderClasses += "";
            
            return (
              <motion.div 
                variants={itemVariants}
                key={idx} 
                className={`flex flex-col items-center text-center py-10 md:py-0 ${borderClasses}`}
              >
                <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-red-600 mb-4 md:mb-6" strokeWidth={1.5} />
                <span className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-gray-300 text-xs md:text-base tracking-wide">
                  {stat.label}
                </span>
                <div className="w-6 md:w-8 h-[2px] bg-red-600 mt-4 md:mt-6" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
