"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ServiceDetailOurWork({
  data,
}: {
  data: any;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const firstCard = container.firstElementChild as HTMLElement | null;

    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width + 12
      : container.clientWidth;

    container.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-black px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="min-w-0 space-y-1"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600 sm:text-xs">
              {data.subtitle}
            </p>

            <h2 className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-extrabold uppercase leading-none tracking-tight">
              {data.title}
            </h2>
          </motion.div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08, borderColor: "#dc2626" }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("left")}
              aria-label="Previous artworks"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-600/70 bg-transparent transition-colors hover:bg-red-600/10 sm:h-11 sm:w-11"
            >
              <ArrowLeft className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 22px rgba(220,38,38,0.55)",
              }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("right")}
              aria-label="Next artworks"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-600 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.25)] transition-colors hover:bg-red-700 sm:h-11 sm:w-11"
            >
              <ArrowRight className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
        >
          {data.images.map((img: string, idx: number) => (
            <motion.div
              key={`${img}-${idx}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[3/2] w-[78%] shrink-0 snap-start overflow-hidden border border-white/15 bg-neutral-950 sm:w-[48%] lg:w-[calc((100%-36px)/4)]"
            >
              <Image
                src={img}
                alt={`Tattoo artwork ${idx + 1}`}
                fill
                sizes="(max-width: 639px) 78vw, (max-width: 1023px) 48vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

              <motion.div
                initial={false}
                className="pointer-events-none absolute inset-0 border border-red-600/0 transition-colors duration-300 group-hover:border-red-600/80"
              />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-red-600" />
                <div className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-red-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}