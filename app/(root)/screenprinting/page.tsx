"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Palette,
  PenTool,
  Printer,
  Quote,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navItems = ["Work", "Services", "Process", "FAQ"];

const services = [
  {
    icon: Shirt,
    title: "Custom apparel",
    text: "Retail-quality tees, hoodies, totes, and uniforms your people will reach for again.",
  },
  {
    icon: Palette,
    title: "Art & separations",
    text: "Print-aware design support, color matching, and expert separations before ink hits the screen.",
  },
  {
    icon: Printer,
    title: "Brand merchandise",
    text: "Cohesive goods for launches, events, artists, and teams—packed and ready to hand out.",
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
    alt: "Stack of colorful printed shirts",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",
    alt: "Clothing hanging on a rack",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    alt: "Folded graphic sweatshirt",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
    alt: "Streetwear model wearing a printed shirt",
    className: "md:col-span-2",
  },
];

const projects = [
  {
    category: "Festival merch",
    title: "Sunset Sounds",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
    color: "bg-[#f4d8ee]",
  },
  {
    category: "Hospitality",
    title: "Luna Coffee Co.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
    color: "bg-[#dcebd7]",
  },
  {
    category: "Independent label",
    title: "Off Grid Supply",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    color: "bg-[#e9d9bb]",
  },
];

const steps = [
  [
    "01",
    "Share your idea",
    "Send a sketch, a finished file, or simply a rough thought. We’ll help shape the route.",
  ],
  [
    "02",
    "Approve the proof",
    "We refine artwork, garments, ink colors, and quantities into one clear production proof.",
  ],
  [
    "03",
    "We make it",
    "Our team prints, cures, quality-checks, folds, and packs every piece in our studio.",
  ],
  [
    "04",
    "Wear it everywhere",
    "Pickup, local delivery, or shipping—your fresh goods arrive ready for their next chapter.",
  ],
];

const testimonials = [
  [
    "They translated a loose moodboard into merch that felt completely like us. The colors are unreal in person.",
    "Maya Chen",
    "Founder, Luna Coffee Co.",
  ],
  [
    "The whole thing was painless: great guidance, fast communication, beautiful shirts. We sold out at the first show.",
    "Andre Bell",
    "Sunset Sounds Festival",
  ],
  [
    "Ink & Thread makes us look like a much bigger brand. Every detail—down to the fold—was considered.",
    "Jess Rivera",
    "Off Grid Supply",
  ],
];

const faqs = [
  [
    "What is your minimum order?",
    "Our standard minimum is 24 pieces per design. For larger runs, our per-piece pricing becomes even more competitive.",
  ],
  [
    "How long will my order take?",
    "Most orders are ready in 7–10 business days after proof approval. Rush options are available when our production calendar allows.",
  ],
  [
    "Can you help with artwork?",
    "Absolutely. Bring us a finished vector file, a sketch, or a half-formed idea—our art team can prepare print-ready artwork and separations.",
  ],
  [
    "What garments can I print on?",
    "We source trusted blanks across price points, including heavyweight cotton, soft ringspun tees, fleece, workwear, and eco-minded options.",
  ],
];

export default function ScreenPrintingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Ink & Thread — Custom Screen Printing";
    const description =
      "Custom screen printing and thoughtful merchandise for brands, artists, and communities.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#fbfaf6] text-[#172018] selection:bg-[#d7f15b]">
      <section
        id="top"
        className="relative isolate min-h-[760px] overflow-hidden pt-20"
      >
        <div className="absolute inset-0 -z-20 bg-[#f4f0e8]" />
        <div className="absolute -right-24 top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#d7f15b] blur-3xl opacity-55" />
        <div className="absolute bottom-0 left-0 -z-10 h-52 w-full bg-[radial-gradient(#172018_1px,transparent_1px)] bg-[size:14px_14px] opacity-[0.07]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#6e8919]">
              <Sparkles size={15} /> Made to be worn
            </p>
            <h1 className="max-w-3xl font-serif text-6xl leading-[.88] tracking-[-.06em] sm:text-7xl lg:text-[6.75rem]">
              Print your <span className="italic text-[#6e8919]">boldest</span>{" "}
              ideas.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#52604e]">
              Thoughtfully printed goods for brands, bands, businesses, and big
              ideas. From first sketch to final fold, we make it feel easy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-[#172018] px-7 hover:bg-[#3b4a38]"
              >
                <a href="#quote">
                  Get a custom quote <ArrowRight />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-[#172018]/20 bg-transparent px-7"
              >
                <a href="#work">See our work</a>
              </Button>
            </div>
            <div className="mt-14 flex gap-8 border-t border-[#172018]/15 pt-6 text-sm">
              <div>
                <b className="block text-2xl">10+ yrs</b>
                <span className="text-[#52604e]">printing with care</span>
              </div>
              <div>
                <b className="block text-2xl">2.5M</b>
                <span className="text-[#52604e]">prints and counting</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#d7f15b] p-3 shadow-2xl shadow-[#172018]/15">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85"
                alt="Person wearing a colorful custom printed shirt"
                className="h-full w-full rounded-[1.4rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-7 max-w-[185px] rotate-[-7deg] rounded-xl bg-[#fa7653] p-4 shadow-lg">
              <p className="font-serif text-xl leading-none">
                "Good ink. Good people. Great stuff."
              </p>
            </div>
            <div className="absolute -right-5 top-10 grid h-24 w-24 rotate-12 place-items-center rounded-full border-2 border-[#172018] bg-[#fbfaf6] text-center text-xs font-extrabold uppercase leading-tight">
              Printed
              <br />
              by hand
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="bg-[#172018] px-5 py-24 text-[#fbfaf6] lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d7f15b]">
            Our studio
          </p>
          <div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              A small, obsessive print shop with a big soft spot for{" "}
              <span className="text-[#d7f15b] italic">good design.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#c7d0c4]">
              We’re a team of artists, ink nerds, and friendly problem-solvers.
              Based in the neighborhood and shipping far beyond it, we make
              merchandise people keep—not stuff that disappears into a drawer.
            </p>
            <a
              href="#process"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#d7f15b] pb-1 text-sm font-bold text-[#d7f15b]"
            >
              Meet the process <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#6e8919]">
              What we do
            </p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">
              Ink meets intention.
            </h2>
          </div>
          <p className="max-w-sm text-[#52604e]">
            Big launch or small batch, every order gets the same careful
            attention.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full rounded-2xl border-[#172018]/10 bg-white shadow-none">
                <CardContent className="p-7">
                  <service.icon
                    className="mb-12 text-[#6e8919]"
                    size={30}
                    strokeWidth={1.6}
                  />
                  <h3 className="font-serif text-2xl">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#52604e]">
                    {service.text}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-1 text-sm font-bold">
                    Learn more <ArrowRight size={14} />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="work" className="bg-[#eee9df] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#6e8919]">
              Fresh off the press
            </p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">
              Made for the real world.
            </h2>
          </div>
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
            {gallery.map((item) => (
              <motion.div
                key={item.src}
                whileHover={{ scale: 1.015 }}
                className={`group relative overflow-hidden rounded-2xl ${item.className}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#6e8919]">
              Featured projects
            </p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">
              Good company.
            </h2>
          </div>
          <a
            href="#quote"
            className="hidden items-center gap-1 text-sm font-bold sm:flex"
          >
            View all work <ArrowRight size={15} />
          </a>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${project.color}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[.15em] text-[#6e8919]">
                {project.category}
              </p>
              <h3 className="mt-1 flex items-center justify-between font-serif text-3xl">
                {project.title}
                <ArrowRight className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="bg-[#d7f15b] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#526b0c]">
              How it works
            </p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">
              Your idea, in very good hands.
            </h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#172018]/20 bg-[#172018]/20 md:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <div key={number} className="bg-[#d7f15b] p-6">
                <span className="font-serif text-4xl text-[#6e8919]">
                  {number}
                </span>
                <h3 className="mt-12 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3f513d]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#6e8919]">
              Kind words
            </p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">
              People we print for.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {testimonials.map(([quote, name, role]) => (
              <Card
                key={name}
                className="rounded-2xl border-[#172018]/10 bg-white shadow-none"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <Quote
                    className="text-[#fa7653]"
                    fill="currentColor"
                    size={24}
                  />
                  <p className="mt-5 flex-1 leading-relaxed">{quote}</p>
                  <div className="mt-7 border-t border-[#172018]/10 pt-4 text-sm">
                    <b>{name}</b>
                    <span className="mt-1 block text-[#52604e]">{role}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#eee9df] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#6e8919]">
              Questions, answered
            </p>
            <h2 className="mt-3 font-serif text-5xl tracking-tight">
              The practical stuff.
            </h2>
            <p className="mt-5 text-[#52604e]">
              Still wondering? Our helpful humans are just an email away.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(([question, answer], i) => (
              <AccordionItem
                key={question}
                value={`item-${i}`}
                className="border-[#172018]/15"
              >
                <AccordionTrigger className="text-left font-serif text-xl hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="max-w-xl text-base leading-relaxed text-[#52604e]">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="quote" className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#fa7653] px-7 py-16 text-[#172018] sm:px-14 lg:flex lg:items-end lg:justify-between lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em]">
              Let’s make something
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[.95] tracking-tight sm:text-6xl">
              Got an idea worth wearing?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-[#432a22]">
              Tell us what you’re dreaming up and we’ll get a thoughtful quote
              back to you within one business day.
            </p>
          </div>
          <Button
            size="lg"
            className="mt-8 rounded-full bg-[#172018] px-7 text-white hover:bg-[#3b4a38] lg:mt-0"
          >
            <a href="mailto:hello@inkandthread.studio">
              Start your project <ArrowRight />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
