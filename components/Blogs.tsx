'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { BlogItem, BlogsVariant } from '@/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface BlogsProps {
  data: BlogsVariant;
  isBlogPage?: boolean;
}

const CATEGORIES = [
  'All',
  'Tattoo Tips',
  'Design Inspiration',
  'Aftercare Guide',
  'Tattoo Styles',
  'Studio Updates',
];

const matchCategory = (blog: BlogItem, category: string) => {
  if (!category || category.toLowerCase() === 'all') return true;
  const cat = category.toLowerCase().trim();
  const tag = (blog.tag || '').toLowerCase().trim();
  const title = (blog.title || '').toLowerCase().trim();

  if (tag === cat) return true;
  if (cat.includes(tag) || tag.includes(cat)) return true;
  if (cat.includes('inspiration') && (tag.includes('inspiration') || title.includes('styles'))) return true;
  if (cat.includes('aftercare') && (tag.includes('aftercare') || title.includes('aftercare') || tag.includes('tips'))) return true;
  if (cat.includes('style') && (tag.includes('style') || title.includes('style') || tag.includes('inspiration'))) return true;
  if (cat.includes('studio') && (tag.includes('studio') || tag.includes('life') || title.includes('session'))) return true;
  if (cat.includes('tip') && (tag.includes('tip') || title.includes('tip'))) return true;

  return false;
};

function BlogsContent({ data: blogsData, isBlogPage = false, categoryParam = '' }: BlogsProps & { categoryParam?: string }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (isBlogPage) {
      if (cat === 'All') {
        router.push('/blogs', { scroll: false });
      } else {
        router.push(`/blogs?category=${encodeURIComponent(cat)}`, { scroll: false });
      }
    }
  };

  const filteredBlogs = useMemo(() => {
    if (!isBlogPage || selectedCategory === 'All') {
      return blogsData.blogs;
    }
    const matched = blogsData.blogs.filter((blog: BlogItem) => matchCategory(blog, selectedCategory));
    return matched.length > 0 ? matched : blogsData.blogs;
  }, [blogsData.blogs, selectedCategory, isBlogPage]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;

  const currentBlogs = isBlogPage
    ? filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
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
    <section className="bg-black py-10 px-6 md:px-12 lg:px-18">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10"
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

          {isBlogPage && (
            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer border ${
                      isActive
                        ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                        : 'bg-[#0a0a0a] text-gray-400 border-white/10 hover:border-red-600/60 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {isBlogPage && selectedCategory !== 'All' && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs tracking-wider uppercase text-gray-400">
                Filtered by category: <strong className="text-red-500">{selectedCategory}</strong> ({filteredBlogs.length} posts)
              </span>
              <button
                type="button"
                onClick={() => handleSelectCategory('All')}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white underline cursor-pointer"
              >
                <X className="w-3 h-3" /> Clear filter
              </button>
            </div>
          )}
        </motion.div>

        <motion.div 
          key={`${selectedCategory}-${currentPage}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {currentBlogs.map((blog: BlogItem, index: number) => (
            <Link href={blog.link} key={index} className="block group cursor-pointer">
              <motion.article 
                variants={itemVariants}
                className="h-full bg-[#0a0a0a] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(220,38,38,0.2)] flex flex-col border border-white/5 group-hover:border-red-600/40"
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
                  <h3 className="text-xl md:text-2xl font-bold font-inter text-white mb-4 leading-snug group-hover:text-red-500 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                    {blog.description}
                  </p>
                  <div className="inline-flex flex-col items-start mt-auto group/link">
                    <span className="flex items-center text-white font-bold text-[13px] tracking-widest uppercase mb-1">
                      {(blogsData as any).readMoreText || 'Read More'} 
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
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 mt-16"
            >
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border cursor-pointer ${
                    currentPage === page
                      ? 'bg-red-600 border-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                      : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mt-16"
          >
            <Link
              href="/blogs"
              className="group relative inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-10 uppercase tracking-widest text-sm transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                {blogsData.buttonText || "View Blog"}
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function BlogsWithParams(props: BlogsProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  return <BlogsContent {...props} categoryParam={categoryParam} />;
}

export default function Blogs(props: BlogsProps) {
  if (props.isBlogPage) {
    return (
      <React.Suspense fallback={<BlogsContent {...props} categoryParam="" />}>
        <BlogsWithParams {...props} />
      </React.Suspense>
    );
  }
  return <BlogsContent {...props} categoryParam="" />;
}
