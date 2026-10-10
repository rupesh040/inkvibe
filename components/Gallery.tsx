'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

export default function Gallery({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };
    handleResize(); // set initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalculate if current page is out of bounds after resize
  const totalPages = Math.ceil(data.images.length / itemsPerPage) || 1; 
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  
  const currentImages = data.images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % data.images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + data.images.length) % data.images.length);
    }
  };

  return (
    <section className="w-full bg-[#050505] py-6 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {currentImages.map((src: string, index: number) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            return (
              <motion.div
                key={`${src}-${globalIndex}`}
                variants={itemVariants}
                onClick={() => setSelectedIndex(globalIndex)}
                className="relative aspect-square w-full group overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a] cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Gallery image ${globalIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex items-center justify-center space-x-2">
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
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[60]"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 text-white/70 hover:text-white hover:bg-black/80 rounded-full transition-all z-[60]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 text-white/70 hover:text-white hover:bg-black/80 rounded-full transition-all z-[60]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9]"
            >
              <Image
                src={data.images[selectedIndex]}
                alt={`Gallery image full ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
