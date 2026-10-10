'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shared = typedContentData.Tattoo.templateComponents["template-1"].shared;
  const topBar = typedContentData.Tattoo.sections.Topbar.variants[shared.Topbar];
  const mainNav = typedContentData.Tattoo.sections.Header.variants[shared.Header];

  return (
    <header className="w-full bg-[#0a0a0a] text-white relative z-50">
      <div className="hidden lg:flex items-center justify-between px-8 py-2 border-b border-white/10 text-xs">
        <div className="flex items-center space-x-6">
          {topBar.location && (
            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span className="text-gray-300">{topBar.location}</span>
              {(topBar.phone || topBar.email) && <div className="w-px h-4 bg-white/20 ml-6" />}
            </div>
          )}
          {topBar.phone && (
            <div className="flex items-center">
              <a
                href={`tel:${topBar.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors"
                aria-label={`Call ${topBar.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>{topBar.phone}</span>
              </a>
              {topBar.email && <div className="w-px h-4 bg-white/20 ml-6" />}
            </div>
          )}
          {topBar.email && (
            <a
              href={`mailto:${topBar.email}`}
              className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors"
              aria-label={`Email ${topBar.email}`}
            >
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>{topBar.email}</span>
            </a>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-300 font-medium">{(topBar as any).followUsLabel || 'Follow Us :'}</span>
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
        </div>
      </div>

      <nav className="flex items-center justify-between px-4 md:px-8 py-4">
        <div>
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
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {mainNav.links.map((link, idx) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <div key={idx}>
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
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!active && (
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex items-center space-x-6">
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
        </div>

        <div className="md:hidden flex items-center">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
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
            <div className="flex flex-col px-6 py-4 space-y-4">
              {mainNav.links.map((link, idx) => {
                const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <div key={idx}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm font-normal tracking-wider flex items-center justify-between ${
                        active ? 'text-red-600' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-normal tracking-wider px-6 py-3 flex items-center justify-center transition-colors rounded-sm"
                >
                  {mainNav.button}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
