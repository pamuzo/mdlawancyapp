"use client";

import Image from "next/image";

import "@/app/styles/screenprint.css";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  MoveRight,
  Sparkles,
} from "lucide-react";

const work = [
  {
    title: "PIZZA SLICE CLUB",
    type: "4 colour / tees",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    className: "tall",
  },
  {
    title: "FIELD NOTES",
    type: "2 colour / totes",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    className: "",
  },
  {
    title: "NIGHT SHIFT",
    type: "5 colour / hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
    className: "",
  },
  {
    title: "GOOD LUCK",
    type: "3 colour / paper",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
    className: "wide",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ScreenPrintingPage() {
  return (
    <main>
      <section className="hero noise">
        <div className="hero-copy" id="top">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="eyebrow"
          >
            <span />
            Independent screen printing studio / Lagos, NG
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
          >
            LOUD IDEAS.
            <br />
            <i>LASTING</i> INK.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            className="hero-bottom"
          >
            <p>
              We turn your sharpest ideas into tactile goods people want to
              keep. Apparel, paper and everything in between.
            </p>
            <a className="round-link" href="#work">
              <ArrowDownRight size={30} />
              <span>
                SCROLL
                <br />
                TO SEE
              </span>
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ rotate: -8, opacity: 0, scale: 0.8 }}
          animate={{ rotate: -8, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="stamp"
        >
          PULLED
          <br />
          BY HAND
          <br />
          <b>EST. 2016</b>
        </motion.div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun" />
          <div className="shape-one" />
          <div className="shape-two" />
          <div className="ink-text">
            INK
            <br />
            ON
            <br />
            EVERYTHING
          </div>
        </div>
      </section>

      <section className="intro" id="process">
        <p className="eyebrow dark">
          <span /> Made slow, made well
        </p>
        <div className="intro-grid">
          <h2>
            YOUR DESIGN
            <br />
            DESERVES <em>MORE</em>
            <br />
            THAN A TEMPLATE.
          </h2>
          <div className="intro-copy">
            <p>
              We are a small, obsessive print shop for brands, bands, artists
              and big ideas. Every colour is mixed by hand. Every print is
              pulled with purpose.
            </p>
            <a href="#contact" className="text-link">
              Meet the process <MoveRight size={18} />
            </a>
          </div>
        </div>
        <div className="ticker">
          <span>
            DESIGN <b>✳</b> PRINT <b>✳</b> REPEAT <b>✳</b> DESIGN <b>✳</b> PRINT{" "}
            <b>✳</b> REPEAT <b>✳</b>
          </span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> Selected work
            </p>
            <h2>
              FRESH OFF
              <br />
              THE PRESS.
            </h2>
          </div>
          <a className="pill" href="#contact">
            All projects <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="work-grid">
          {work.map((item, i) => (
            <motion.article
              key={item.title}
              className={`work-card ${item.className}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <div className="work-image">
                <Image
                  src={item.image}
                  alt={`${item.title} screen printing project`}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <div className="work-meta">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.type}</p>
                </div>
                <span>
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="services noise">
        <div className="services-title">
          <p className="eyebrow">
            <span /> What we print
          </p>
          <h2>
            PUT SOME
            <br />
            <i>INK</i> ON IT.
          </h2>
        </div>
        <div className="service-list">
          {[
            "Apparel & merch",
            "Paper goods",
            "Custom colour mixing",
            "Finishing & fulfilment",
          ].map((service, i) => (
            <motion.div whileHover={{ x: 8 }} className="service" key={service}>
              <span>0{i + 1}</span>
              <h3>{service}</h3>
              <ArrowUpRight size={25} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta" id="contact">
        <Sparkles size={34} />
        <p className="eyebrow dark">Have a project in mind?</p>
        <h2>
          LET&apos;S
          <br />
          SOMETHING <em>REAL.</em>
        </h2>
        <a className="cta-button" href="mailto:hello@inkworks.studio">
          START A PROJECT <ArrowUpRight size={22} />
        </a>
      </section>
    </main>
  );
}
