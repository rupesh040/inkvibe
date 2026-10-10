"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Diamond,
  Users,
  Droplet,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Diamond,
  Users,
  Droplet,
  ShieldCheck,
};

export default function ServiceDetailAbout({
  data,
}: {
  data: any;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-2 sm:mx-4 lg:mx-0"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 5px rgba(220,38,38,0.2)",
                "0 0 16px rgba(220,38,38,0.65)",
                "0 0 5px rgba(220,38,38,0.2)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-[2px] border-2 border-red-600"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
            <Image
              src={data.image}
              alt={data.titleLine1 + " " + data.titleLine2}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -left-[2px] -top-[2px] h-8 w-8 border-l-2 border-t-2 border-red-500"
          />
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-[2px] -right-[2px] h-8 w-8 border-b-2 border-r-2 border-red-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:gap-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 sm:text-sm"
          >
            {data.subtitle}
          </motion.p>

          <h2 className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-extrabold uppercase leading-[1.12] tracking-tight text-white">
            <span>{data.titleLine1} </span>
            <span className="text-red-600">{data.titleLine2}</span>
          </h2>

          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              {data.description1}
            </p>

            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              {data.description2}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 border-t border-white/10 pt-6 sm:grid-cols-4 sm:pt-7">
            {data.features.map((item: any, idx: number) => {
              const Icon = iconMap[item.icon] || Diamond;

              return (
                <motion.div
                  key={item.title || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.12,
                  }}
                  whileHover={{ y: -5 }}
                  className={`flex min-w-0 flex-col items-center gap-3 px-3 py-4 text-center sm:py-2 ${
                    idx % 2 === 0
                      ? "border-r border-white/10"
                      : "border-r-0 sm:border-r sm:border-white/10"
                  } ${idx >= 2 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                    idx === 3 ? "sm:border-r-0" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      filter: "drop-shadow(0 0 8px rgba(220,38,38,0.8))",
                    }}
                    className="text-red-600"
                  >
                    <Icon
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      strokeWidth={1.7}
                    />
                  </motion.div>

                  <span className="whitespace-pre-line text-[11px] font-semibold uppercase leading-relaxed tracking-wide text-neutral-200 sm:text-xs">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}