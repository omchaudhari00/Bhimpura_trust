import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="inner-page-shell mx-auto max-w-5xl px-5 pb-24 pt-36 md:px-8">
      <p className="section-label">About Us</p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 font-display text-6xl text-ink md:text-7xl"
      >
        Our Mission
      </motion.h1>

      <div className="editorial-line my-12" />

      <div className="space-y-8 text-lg leading-relaxed text-earth">
        <p>
          સંકલ્પ સેવા સમર્પણ ચેરિટેબલ ટ્રસ્ટ is dedicated to community seva,
          temple development, and supporting the people of Bhimpura through
          collective compassion and action.
        </p>
        <p>
          Guided by the belief that{" "}
          <span className="font-gujarati text-ink">સેવા એ જ સાચો સંકલ્પ</span>,
          the trust works to preserve cultural heritage, uplift donors and
          volunteers, and create lasting impact for future generations.
        </p>
        <p>
          Every contribution, every hour of service, and every act of kindness
          strengthens the foundation of our shared purpose.
        </p>
      </div>
    </section>
  );
}
