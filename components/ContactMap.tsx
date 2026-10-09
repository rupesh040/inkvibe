'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ContactMapProps {
  mapData: {
    address: string;
    iframeSrc: string;
  };
}

export default function ContactMap({ mapData }: ContactMapProps) {
  if (!mapData || !mapData.iframeSrc) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative"
    >
      <div className="w-full h-[400px] md:h-[550px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-700"></div>
        <iframe
          src={mapData.iframeSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map location for ${mapData.address}`}
          className="grayscale-[0.8] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out absolute inset-0"
        />
      </div>
    </motion.div>
  );
}
