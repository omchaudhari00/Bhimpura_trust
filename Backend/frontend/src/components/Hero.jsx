import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="map-hero">
      <div className="map-hero-image" aria-hidden="true" />

      <div className="map-hero-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-label mb-8"
        >
          BHIMPURA CHARITABLE TRUST
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-gujarati text-[2.8rem] font-semibold leading-[1.18] text-ink sm:text-6xl lg:text-[5.35rem]"
        >
          સંકલ્પ સેવા સમર્પણ
          <br />
          <em className="font-medium not-italic text-gold">ચેરિટેબલ ટ્રસ્ટ</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22 }}
          className="mt-8 font-gujarati text-2xl text-earth md:text-3xl"
        >
          સેવા એ જ સાચો સંકલ્પ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link to="/donors" className="btn-primary">
            View Donors List
          </Link>
          <Link to="/about" className="btn-outline">
            About the Trust
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-[8%] text-[10px] uppercase tracking-wide text-mist"
      >
        Scroll
      </motion.div>
    </section>
  );
}
