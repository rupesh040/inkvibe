'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageBannerVariant } from '@/types';

interface PageBannerProps {
  pageName: string;
  data: PageBannerVariant;
  customTitle?: string;
  customBreadcrumb?: string[];
}

export default function PageBanner({ pageName, data, customTitle, customBreadcrumb }: PageBannerProps) {
  const pageData = data?.pages?.[pageName];

  const title = customTitle || pageData?.title || 'Details';
  const breadcrumb = customBreadcrumb || pageData?.breadcrumb || ['Home', 'Details'];

  return (
    <section className="font-bebas relative w-full h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-start overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={data?.image || '/page-banner.webp'}
          alt={title}
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center space-x-2 text-xs md:text-sm tracking-widest text-red-600 mb-4 capitalize">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < breadcrumb.length - 1 && (
                  <span className="text-white/50">&gt;</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-bebas text-white uppercase tracking-widest mb-6 leading-[1.05]"
          >
            {title}
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-md h-[1px] bg-white/20 origin-left relative"
          >
            <div className="absolute top-0 left-0 w-12 h-full bg-red-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
