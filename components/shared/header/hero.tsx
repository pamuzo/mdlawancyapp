"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AUTO_PLAY_DELAY = 6000;

const slides = [
  {
    id: 1,
    title: "Premium Branding & Custom Printing Solutions",
    description:
      "From embroidery and screen printing to engraving and heat transfer, we help businesses create premium apparel and promotional products that leave lasting impressions.",
    image: "/images/heropix1.png",
    primaryBtn: "Get Started",
    secondaryBtn: "View Services",
  },
  {
    id: 2,
    title: "Heat Transfer Printing",
    description:
      "Vibrant, durable heat transfer printing for jerseys, uniforms, promotional wear and custom apparel.",
    image: "/images/carousal.png",
    primaryBtn: "Order Now",
    secondaryBtn: "Learn More",
  },
  {
    id: 3,
    title: "Precision Laser Engraving",
    description:
      "Premium laser engraving for awards, plaques, gifts, signage and branded promotional products.",
    image: "/images/hero/engraving.jpg",
    primaryBtn: "Explore",
    secondaryBtn: "Request Quote",
  },
  {
    id: 4,
    title: "Professional Embroidery",
    description:
      "High-quality embroidery for uniforms, polos, caps, jackets and premium corporate apparel.",
    image: "/images/embroidery/hero.jpg",
    primaryBtn: "Start Order",
    secondaryBtn: "Portfolio",
  },
  {
    id: 5,
    title: "Screen Printing Excellence",
    description:
      "Bulk screen printing for T-shirts, uniforms, promotional campaigns and branded merchandise.",
    image: "/images/hero/screen-printing.jpg",
    primaryBtn: "Print With Us",
    secondaryBtn: "Contact Us",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // autoplay
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(timer);
  }, [paused]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  const previous = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative h-[95vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: current === index ? 1 : 0,
              scale: current === index ? 1.08 : 1,
            }}
            transition={{
              opacity: {
                duration: 1.4,
                ease: "easeInOut",
              },
              scale: {
                duration: AUTO_PLAY_DELAY / 1000,
                ease: "linear",
              },
            }}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </motion.div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
              >
                Premium Printing & Branding
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                }}
                className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.6,
                }}
                className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button size="lg" className="rounded-full px-8 py-6 text-base">
                  {slides[current].primaryBtn}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white bg-white/10 px-8 py-6 text-base text-white backdrop-blur-md hover:bg-white hover:text-black"
                >
                  {slides[current].secondaryBtn}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PREVIOUS */}
      <button
        onClick={previous}
        className="absolute left-6 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:flex"
      >
        <ChevronLeft />
      </button>

      {/* NEXT */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:flex"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            layout
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "w-10 bg-white"
                : "w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-white/10">
        <motion.div
          key={current}
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: AUTO_PLAY_DELAY / 1000,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
