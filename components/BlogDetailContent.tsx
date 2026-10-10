'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogDetailContent({ data, currentId }: { data: any; currentId?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full bg-[#050505] text-white py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-10"
          >
            <motion.div variants={itemVariants} className="relative w-full aspect-[16/9] border border-white/5 rounded-sm overflow-hidden bg-[#0a0a0a]">
              <Image 
                src={data.image} 
                alt={data.title || "Blog Image"} 
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed">
              {data.description}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-10 mt-8">
              {data.sections.map((sec: any, idx: number) => (
                <div key={idx} className="flex flex-col space-y-3 pl-4 border-l-2 border-red-600">
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 font-inter font-bold text-3xl leading-none">
                      {sec.number}
                    </span>
                    <h3 className="text-2xl font-inter font-bold uppercase tracking-wider text-white">
                      {sec.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {sec.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[400px] flex flex-col space-y-16"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-inter font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-4 mb-8">
                {data.sidebar.recentPostsTitle || "RECENT POSTS"}
              </h3>
              <div className="flex flex-col space-y-6">
                {data.sidebar.recentPosts
                  .filter((post: any) => !currentId || !post.link?.includes(currentId))
                  .reduce((unique: any[], post: any) => {
                    if (!unique.find((p: any) => p.title === post.title)) {
                      unique.push(post);
                    }
                    return unique;
                  }, [])
                  .slice(0, 3)
                  .map((post: any, idx: number) => (
                  <a key={idx} href={post.link} className="flex gap-4 group">
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden border border-white/10">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-1">
                      <h4 className="text-sm font-bold font-inter text-white leading-snug group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h4>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-inter font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-4 mb-8">
                {data.sidebar.categoriesTitle || "CATEGORIES"}
              </h3>
              <div className="flex flex-col border-t border-white/10">
                {data.sidebar.categories.map((cat: any, idx: number) => (
                  <a key={idx} href={cat.link} className="flex items-center justify-between py-4 border-b border-white/10 group hover:pl-2 transition-all">
                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-red-600 transition-colors">
                      <span className="text-red-600 font-bold">&gt;</span>
                      {cat.name}
                    </div>
                    <span className="text-sm text-gray-500 group-hover:text-white transition-colors">
                      ({cat.count})
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] border border-red-600 p-8 flex flex-col justify-end overflow-hidden group">
              <Image 
                src={data.sidebar.cta.image || '/blogs/blog.webp'} 
                alt={data.sidebar.cta.titleLine1 || "CTA Background"} 
                fill 
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover z-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none z-10" />

              <div className="relative z-20 flex flex-col space-y-3">
                <h3 className="text-3xl font-bold font-inter uppercase leading-none">
                  <span className="text-white">{data.sidebar.cta.titleLine1}</span><br/>
                  <span className="text-red-600">{data.sidebar.cta.titleLine2}</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-[90%]">
                  {data.sidebar.cta.text}
                </p>
                <a href={data.sidebar.cta.link} className="inline-flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase mt-4 hover:text-red-600 transition-colors">
                  {data.sidebar.cta.buttonText || "BOOK NOW"} <span className="text-red-600">&rarr;</span>
                </a>
              </div>
            </div>

          </motion.aside>

        </div>
      </div>
    </section>
  );
}
