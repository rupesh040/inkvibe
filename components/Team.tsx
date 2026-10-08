'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import contentData from '@/data/content.json';
import { ContentData, TeamMember, TeamSocialLink } from '@/types';

const typedContentData = contentData as ContentData;

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.19-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const IconMap: Record<string, React.ElementType> = {
  'instagram': InstagramIcon,
  'facebook': FacebookIcon,
  'whatsapp': WhatsappIcon,
};

export default function Team() {
  const teamVariantId = typedContentData.Tattoo.templateComponents["template-1"].pages.home.Team;
  const teamData = typedContentData.Tattoo.sections.Team.variants[teamVariantId];

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
    <section className="w-full bg-[#050505] text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="flex flex-col w-full lg:w-1/2">
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center space-x-4 mb-4">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {teamData.subtitle}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </motion.div>
            <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-5xl md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-tight">
              <span className="text-white mr-4">{teamData.titleLine1}</span>
              <span className="text-red-600">{teamData.titleLine2}</span>
            </motion.h2>
          </div>
          
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full lg:w-1/2 lg:pl-16">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {teamData.description}
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {teamData.members.map((member: TeamMember, idx: number) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex flex-col border border-red-600/30 group bg-[#080808]"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              <div className="flex flex-col p-6 flex-grow">
                <h4 className="text-xl font-bold text-white uppercase tracking-wide">
                  {member.name}
                </h4>
                <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {member.role}
                </span>
                
                <div className="w-8 h-[2px] bg-red-600 my-5" />
                
                <div className="flex items-center space-x-3 mt-auto">
                  {member.socials.map((social: TeamSocialLink, sIdx: number) => {
                    const Icon = IconMap[social.platform] || InstagramIcon;
                    const isFirst = sIdx === 0;
                    return (
                      <Link 
                        href={social.url} 
                        key={sIdx}
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isFirst 
                            ? 'border-red-600/50 text-white hover:bg-red-600 hover:border-red-600' 
                            : 'border-gray-700 text-gray-400 hover:border-red-600 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
