"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 600], [0, 150]);
  const contentY = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/embroidery/hero.jpg"
          alt="Embroidery Machine"
          fill
          priority
          className="object-cover object-center"
        />

        {/* <div className="absolute inset-0 bg-black/65" /> */}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-700/50 to-transparent" />
      </motion.div>

      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 blur-[150px]"
      />

      {/* Decorative Blobs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-20 top-28 h-32 w-32 rounded-full border border-amber-300/20 bg-white/5 backdrop-blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute bottom-32 left-20 h-20 w-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
      />

      <motion.div
        style={{
          y: contentY,
          opacity,
        }}
        className="relative z-20 mx-auto w-full max-w-7xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center rounded-full border border-amber-400/30 bg-white/10 px-5 py-2 text-sm font-medium text-amber-300 backdrop-blur-md"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Premium Custom Embroidery
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
            }}
            className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl"
          >
            Precision Stitching
            {/* Stitching Excellence */}
            <br />
            That Elevates Your Brand
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
            }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            We create premium embroidered apparel for businesses, schools,
            sports teams, restaurants, hospitality, and organizations using
            commercial multi-head embroidery machines and high-quality threads.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
            }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="rounded-full text-white bg-[#00425a] px-8 hover:bg-[#003144]"
            >
              <Link href="/contact">
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="secondary" size="lg" className="rounded-full">
              <Link href="#gallery">View Our Work</Link>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
            }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div>
              <h3 className="text-4xl font-bold text-white">10K+</h3>
              <p className="text-slate-400">Garments</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">5+</h3>
              <p className="text-slate-400">Years</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-white">100+</h3>
              <p className="text-slate-400">Clients</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-white"
      >
        <ChevronDown className="h-8 w-8 opacity-70" />
      </motion.div>

      {/* Bottom Fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" /> */}
    </section>
  );
}
