import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="map-hero">
      <div className="map-hero-image" />

      <div className="map-hero-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-label mb-8"
        >
          Bhimpura Charitable Trust
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="hero-title font-gujarati text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          સંકલ્પ સેવા<br />સમર્પણ
          <br />
          <em className="font-medium not-italic text-gold">ચેરીટેબલ ટ્રસ્ટ</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22 }}
          className="hero-tagline mt-8 font-gujarati text-2xl text-earth md:text-3xl max-w-xl leading-relaxed"
        >
          સેવા એ જ સાચો સંકલ્પ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34 }}
          className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
        >
          <Link to="/donors" className="btn-primary font-gujarati text-sm px-10 py-4">
            દાતાશ્રી
          </Link>
          <Link to="/about" className="btn-outline text-sm px-10 py-4">
            About the Trust
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink z-20"
      >
        Scroll
      </motion.div>
    </section>
  );
}
