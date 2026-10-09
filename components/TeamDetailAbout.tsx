"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";
import type { TeamMember } from "@/types";

interface TeamDetailAboutProps {
  member: TeamMember;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TeamDetailAbout({
  member,
}: TeamDetailAboutProps) {
  if (!member.aboutText && !member.quote) return null;

  return (
    <section className="relative isolate w-full overflow-hidden border-y border-white/10 bg-[#050505] text-white">
      {member.quoteImage && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[48%]">
          <Image
            src={member.quoteImage}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover object-center grayscale opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent lg:via-[#050505]/35" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 lg:grid-cols-[1.4fr_0.9fr] lg:gap-12 lg:px-6 lg:py-16"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center"
        >
          {member.aboutSubtitle && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-red-600 sm:text-sm">
              {member.aboutSubtitle}
            </p>
          )}

          {(member.aboutTitleLine1 || member.aboutTitleLine2) && (
            <h2 className="mb-5 text-3xl font-extrabold uppercase leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {member.aboutTitleLine1 && (
                <span className="text-white">
                  {member.aboutTitleLine1}{" "}
                </span>
              )}
              {member.aboutTitleLine2 && (
                <span className="text-red-600">
                  {member.aboutTitleLine2}
                </span>
              )}
            </h2>
          )}

          <div className="max-w-2xl space-y-3">
            {member.aboutText?.map((paragraph, index) => (
              <motion.p
                key={`${index}-${paragraph.slice(0, 20)}`}
                variants={itemVariants}
                className="text-sm leading-6 text-white/75 sm:text-base sm:leading-7"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {member.quote && (
          <motion.div
            variants={itemVariants}
            className="relative max-w-64 flex min-h-64 flex-col justify-center border border-white/10 bg-black/35 p-6 backdrop-blur-[2px] transition-colors duration-300 hover:border-red-600/40 sm:min-h-72 sm:p-8 lg:p-7 xl:p-9"
          >
            <Quote
              aria-hidden="true"
              className="mb-4 h-9 w-9 fill-red-600 text-red-600 sm:h-10 sm:w-10"
            />

            <blockquote className="text-base font-medium leading-7 text-white/90 sm:text-lg sm:leading-8">
              {member.quote}
            </blockquote>

            <div className="mt-6 h-0.5 w-10 bg-red-600" />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
