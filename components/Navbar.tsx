'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import contentData from '@/data/content.json';
import { ContentData } from '@/types';

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

const typedContentData = contentData as ContentData;

const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shared = typedContentData.Tattoo.templateComponents["template-1"].shared;
  const topBar = typedContentData.Tattoo.sections.Topbar.variants[shared.Topbar];
  const mainNav = typedContentData.Tattoo.sections.Header.variants[shared.Header];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-[#0a0a0a] text-white relative z-50"
    >
      <div className="hidden lg:flex items-center justify-between px-8 py-2 border-b border-white/10 text-xs">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center space-x-6"
        >
          {topBar.location && (
            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span className="text-gray-300">{topBar.location}</span>
              {(topBar.phone || topBar.email) && <div className="w-px h-4 bg-white/20 ml-6" />}
            </div>
          )}
          {topBar.phone && (
            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-default">
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span className="text-gray-300">{topBar.phone}</span>
              {topBar.email && <div className="w-px h-4 bg-white/20 ml-6" />}
            </div>
          )}
          {topBar.email && (
            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-default">
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span className="text-gray-300">{topBar.email}</span>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <span className="text-gray-300 font-medium">Follow Us :</span>
          <div className="flex items-center space-x-2">
            {topBar.social.map((social, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href={social.href}
                  className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                  aria-label={social.name}
                >
                  <DynamicIcon svgStr={social.svg} className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <nav className="flex items-center justify-between px-4 md:px-8 py-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Link href="/" className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-[120px] h-[60px] md:w-[150px] md:h-[80px]">
              <Image 
                src={mainNav.logo} 
                alt="Logo" 
                fill 
                sizes="(max-width: 768px) 120px, 150px"
                className="object-contain" 
                priority
              />
            </div>
          </Link>
        </motion.div>

        <motion.div 
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center space-x-8"
        >
          {mainNav.links.map((link, idx) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
            <motion.div key={idx} variants={navItemVariants}>
              <Link
                href={link.href}
                className={`group relative text-sm font-semibold tracking-wider flex items-center transition-colors ${
                  active ? 'text-red-600' : 'text-white hover:text-red-500'
                }`}
              >
                {link.name}
                {active && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 rounded-full" 
                  />
                )}
                {!active && (
                  <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            </motion.div>
          )})}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="hidden md:flex items-center space-x-6"
        >
          <div className="w-px h-8 bg-white/20" />
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="relative overflow-hidden group bg-red-600 text-white text-sm font-semibold tracking-wider px-6 py-3 flex items-center rounded-sm"
            >
              <span className="relative z-10 flex items-center">
                {mainNav.button}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="md:hidden flex items-center">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navContainerVariants}
              className="flex flex-col px-6 py-4 space-y-4"
            >
              {mainNav.links.map((link, idx) => {
                const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                <motion.div key={idx} variants={navItemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-normal tracking-wider flex items-center justify-between ${
                      active ? 'text-red-600' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )})}
              <motion.div variants={navItemVariants} className="pt-4 mt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-normal tracking-wider px-6 py-3 flex items-center justify-center transition-colors rounded-sm"
                >
                  {mainNav.button}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
