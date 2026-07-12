"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Shirt,
  Palette,
  Clock3,
  ChevronRight,
  Scissors,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/embroidery/hero";

const works = [
  {
    title: "Corporate Polo Shirts",
    image: "/images/embroidery/polo.jpg",
  },
  {
    title: "Custom Hats",
    image: "/images/embroidery/hat.jpg",
  },
  {
    title: "Restaurant Uniforms",
    image: "/images/embroidery/uniforms.jpg",
  },
  {
    title: "Sports Jerseys",
    image: "/images/embroidery/jersey.jpg",
  },
  {
    title: "Traditional Native Attire",
    image: "/images/embroidery/native.jpg",
  },
  {
    title: "Hoodies",
    image: "/images/embroidery/hoodies.jpg",
  },
];

const services = [
  {
    title: "Corporate Apparel",
    description:
      "Professional embroidery for polos, button-down shirts, and uniforms.",
    icon: Shirt,
  },
  {
    title: "Logo Digitizing",
    description: "Convert your artwork into stitch-perfect embroidery files.",
    icon: Palette,
  },
  {
    title: "Fast Turnaround",
    description: "Reliable production with quick delivery for every order.",
    icon: Clock3,
  },
];

const process = [
  "Send Your Logo",
  "Artwork Digitizing",
  "Thread Selection",
  "Embroidery Production",
  "Quality Inspection",
  "Delivery",
];

const testimonials = [
  {
    name: "Michael R.",
    company: "Construction Company",
    text: "The embroidery quality exceeded our expectations. Every stitch was flawless.",
  },
  {
    name: "Sarah T.",
    company: "Restaurant Owner",
    text: "Professional service, quick turnaround, and beautiful uniforms.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0 },
};

export default function EmbroideryPage() {
  return (
    <main>
      {/* HERO */}
      <Hero />
      {/* <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/embroidery/hero.jpg"
            alt="Embroidery machine"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/65" />
        </div>

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Premium Custom Embroidery
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
              Precision Stitching That Elevates Your Brand
            </h1>

            <p className="mt-6 text-lg text-slate-200">
              From uniforms and polos to hats, jackets, and promotional
              apparel—we create premium embroidery designed to last.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">
                Request a Quote
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>

              <Button size="lg" variant="secondary">
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true }}
        >
          <Image
            src="/images/embroidery/about.jpg"
            alt="Embroidery"
            width={700}
            height={700}
            className="rounded-3xl object-cover shadow-xl"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileInView="show"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold">
            Crafted with Precision & Passion
          </h2>

          <p className="mt-6 text-slate-600 leading-8">
            Every embroidered design begins with careful digitizing and premium
            thread selection. Our commercial embroidery equipment produces
            durable, clean stitching that maintains its appearance through years
            of wear and washing.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Premium thread colors",
              "Commercial embroidery machines",
              "Clean, durable stitching",
              "Bulk & individual orders",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <BadgeCheck className="text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className=" py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold">
            Why Choose Our Embroidery
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <motion.div
                key={service.title}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
              >
                <Card className="rounded-3xl border-0 shadow-lg">
                  <CardContent className="p-8">
                    <service.icon className="mb-6 h-10 w-10 text-amber-500" />

                    <h3 className="text-2xl font-semibold">{service.title}</h3>

                    <p className="mt-4 text-slate-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold">
          Recent Embroidery Projects
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {works.map((work) => (
            <motion.div
              key={work.title}
              whileHover={{ scale: 1.03 }}
              className="group overflow-hidden rounded-3xl"
            >
              <div className="relative h-[350px]">
                <Image
                  fill
                  src={work.image}
                  alt={work.title}
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {work.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold">Our Process</h2>

          <div className="mt-16 grid gap-8 md:grid-cols-6">
            {process.map((step, index) => (
              <motion.div
                key={step}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-xl font-bold">
                  {index + 1}
                </div>

                <p className="mt-5">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold">What Our Clients Say</h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.name} className="rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <p className="italic text-slate-600">"{item.text}"</p>

                <div className="mt-6">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Scissors className="mx-auto h-12 w-12" />

          <h2 className="mt-6 text-5xl font-black">
            Ready to Stitch Your Brand Into Every Garment?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Whether you need one piece or a large production run, we're here to
            deliver premium embroidery with exceptional craftsmanship.
          </p>

          <Button size="lg" variant="secondary" className="mt-10">
            Get Your Free Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
