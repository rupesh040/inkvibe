'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { BlogItem, BlogsVariant } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogsProps {
  data: BlogsVariant;
  isBlogPage?: boolean;
}

export default function Blogs({ data: blogsData, isBlogPage = false }: BlogsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogsData.blogs.length / itemsPerPage) || 1;

  const currentBlogs = isBlogPage
    ? blogsData.blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : blogsData.blogs.slice(0, 3);

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
    <section className="bg-black py-6 px-6 md:px-12 lg:px-18">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
            <span className="text-red-600 font-bold tracking-widest text-xs md:text-sm uppercase">
              {blogsData.subtitle}
            </span>
            <div className="h-[1px] w-12 md:w-16 bg-red-600"></div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans text-white uppercase tracking-wider">
            {blogsData.titleLine1} <span className="text-red-600">{blogsData.titleLine2}</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {currentBlogs.map((blog: BlogItem, index: number) => (
            <Link href={blog.link} key={index} className="block group">
              <motion.article 
                variants={itemVariants}
                className="h-full bg-[#0a0a0a] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(220,38,38,0.15)] flex flex-col border border-white/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={blog.image} 
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
                  />
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-5 text-[11px] font-bold tracking-widest">
                    <span className="bg-red-600 text-white px-2 py-1 uppercase">{blog.tag}</span>
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="w-px h-3 bg-neutral-600"></span>
                      {blog.date}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-inter text-white mb-4 leading-snug">{blog.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">{blog.description}</p>
                  <div className="inline-flex flex-col items-start mt-auto group/link">
                    <span className="flex items-center text-white font-bold text-[13px] tracking-widest uppercase mb-1">
                      Read More 
                      <span className="text-red-600 ml-2 transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </span>
                    <span className="h-[2px] w-8 bg-red-600 transition-all duration-300 group-hover/link:w-full"></span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {isBlogPage ? (
          totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-2 mt-16"
            >
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border ${
                    currentPage === page
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center mt-16"
          >
            <a href="/blogs">
              <button className="bg-red-600 text-white font-bold py-4 px-10 uppercase tracking-widest text-sm transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]">
                {blogsData.buttonText}
              </button>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
