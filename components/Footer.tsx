'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Phone, Mail, ChevronUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import contentData from '@/data/content.json';
import { ContentData } from '@/types';

const typedContentData = contentData as ContentData;

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

export default function Footer() {
  const shared = typedContentData.Tattoo.templateComponents["template-1"].shared;
  const footerData = typedContentData.Tattoo.sections.Footer.variants[shared.Footer];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  };

  return (
    <footer className="w-full bg-[#050505] text-white pt-16 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/80 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          <motion.div variants={itemVariants} className="relative flex flex-col space-y-6 lg:pr-8">
            <div className="hidden lg:block absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.2)]" />
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-[180px] h-[70px]">
                <Image 
                  src={footerData.logo} 
                  alt="InkVibe Logo" 
                  fill 
                  sizes="(max-width: 768px) 180px, 180px"
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {footerData.description}
            </p>
            <div className="flex items-center space-x-4 pt-2">
              {footerData.social.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-red-600/50 flex items-center justify-center text-white hover:text-red-500 hover:border-red-500 transition-colors"
                  aria-label={social.name}
                >
                  <DynamicIcon svgStr={social.svg} className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex flex-col space-y-6 lg:px-8">
            <div className="hidden lg:block absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.2)]" />
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm uppercase">{footerData.quickLinks.title}</h3>
              <div className="w-12 h-[2px] bg-gradient-to-r from-red-600 to-red-400 mt-3 shadow-[0_0_8px_rgba(220,38,38,0.8)] rounded-full" />
            </div>
            <ul className="space-y-4">
              {footerData.quickLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative flex items-center text-sm text-gray-400 hover:text-white transition-colors w-fit">
                    <ChevronRight className="w-3.5 h-3.5 text-red-600 mr-2 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex flex-col space-y-6 lg:px-8">
            <div className="hidden lg:block absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.2)]" />
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm uppercase">{footerData.services.title}</h3>
              <div className="w-12 h-[2px] bg-gradient-to-r from-red-600 to-red-400 mt-3 shadow-[0_0_8px_rgba(220,38,38,0.8)] rounded-full" />
            </div>
            <ul className="space-y-4">
              {footerData.services.links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative flex items-center text-sm text-gray-400 hover:text-white transition-colors w-fit">
                    <ChevronRight className="w-3.5 h-3.5 text-red-600 mr-2 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col space-y-6 lg:pl-8">
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm uppercase">{footerData.contact.title}</h3>
              <div className="w-12 h-[2px] bg-gradient-to-r from-red-600 to-red-400 mt-3 shadow-[0_0_8px_rgba(220,38,38,0.8)] rounded-full" />
            </div>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full border border-red-600/50 flex-shrink-0 flex items-center justify-center mr-4 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">{footerData.contact.info.address}</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full border border-red-600/50 flex-shrink-0 flex items-center justify-center mr-4">
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="text-sm text-gray-400">{footerData.contact.info.phone}</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full border border-red-600/50 flex-shrink-0 flex items-center justify-center mr-4">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="text-sm text-gray-400">{footerData.contact.info.email}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative bg-[#030303]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between relative z-10">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            {footerData.bottomBar.copyright}
          </p>
          <div className="flex items-center space-x-6 text-xs text-gray-400">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#dc2626', color: '#fff' }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="ml-4 w-8 h-8 rounded-full border border-red-600 flex items-center justify-center text-red-500 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
