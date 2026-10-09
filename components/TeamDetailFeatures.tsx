'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TeamFeature } from '@/types';

const DynamicIcon = ({ svgStr, className }: { svgStr?: string; className?: string }) => {
  if (svgStr) {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: svgStr }} 
        className={`[&>svg]:w-full [&>svg]:h-full ${className}`} 
      />
    );
  }
  return null;
};

interface TeamDetailFeaturesProps {
  features: TeamFeature[];
}

export default function TeamDetailFeatures({ features }: TeamDetailFeaturesProps) {
  if (!features || features.length === 0) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="w-full bg-[#030303] text-white border-y border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`flex items-center space-x-4 ${idx !== 0 ? 'lg:pl-8' : ''}`}
            >
              <div className="flex-shrink-0 w-10 h-10 text-red-600">
                <DynamicIcon svgStr={feature.icon} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-400">
                  {feature.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
