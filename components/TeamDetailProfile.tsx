'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
import { TeamMember } from '@/types';
import Link from 'next/link';

interface TeamDetailProfileProps {
  member: TeamMember;
}

export default function TeamDetailProfile({ member }: TeamDetailProfileProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  };

  return (
    <section className="w-full bg-[#050505] text-white py-6 relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
        >
          {/* Left Image */}
          <motion.div variants={itemVariants} className="w-full lg:w-[45%]">
            <div className="relative w-full aspect-square border-2 border-red-600/60 p-2 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.15)] group">
              <div className="relative w-full h-full">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Info */}
          <motion.div variants={itemVariants} className="w-full lg:w-[55%] flex flex-col">
            <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase mb-2">
              {member.role}
            </h3>
            
            <h2 className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-none tracking-tight mb-6">
              <span className="text-white mr-4">{member.name.split(' ')[0]}</span>
              <span className="text-red-600">{member.name.split(' ').slice(1).join(' ')}</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              {member.biography}
            </p>

            <div className="flex flex-col space-y-6 mb-10 w-full max-w-md">
              {member.experience && (
                <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                  <Star className="w-6 h-6 text-red-600" />
                  <span className="text-white font-medium">{member.experience}</span>
                </div>
              )}
              {member.location && (
                <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                  <span className="text-white font-medium">{member.location}</span>
                </div>
              )}
              {member.instagramHandle && (
                <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                  <InstagramIcon className="w-6 h-6 text-red-600" />
                  <span className="text-white font-medium">{member.instagramHandle}</span>
                </div>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="self-start">
              <Link 
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-sm flex items-center transition-colors rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
