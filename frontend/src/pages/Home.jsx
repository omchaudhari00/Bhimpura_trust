import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import DonorCard from "../components/DonorCard";
import { api } from "../api/client";

export default function Home() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("hasVisited")) {
      api.trackHomepage()
        .then(() => sessionStorage.setItem("hasVisited", "true"))
        .catch(() => { });
    }
    api.getDonors().then(setDonors).catch(() => { });
  }, []);

  const topDonors = donors.slice(0, 5);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="editorial-line mb-16" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mist mb-4">Recognition</p>
            <h2 className="font-gujarati text-6xl font-medium tracking-tighter text-ink md:text-[5rem] lg:text-[6rem] leading-none">
              દાતાશ્રી ની યાદી
            </h2>
          </div>
          <Link to="/donors" className="btn-outline font-gujarati self-start md:self-auto">
            દાતાશ્રી ની સંપૂર્ણ યાદી
          </Link>
        </div>

        <div className="mt-14 space-y-6">
          {topDonors.length === 0 ? (
            <p className="rounded-[2rem] border border-ink/8 bg-white/40 px-8 py-16 text-center text-mist">
              Donor records will appear here once added by the trust committee.
            </p>
          ) : (
            topDonors.map((donor, index) => (
              <DonorCard key={donor.id} donor={donor} rank={index + 1} />
            ))
          )}
        </div>
      </section>

      <section className="bg-parchment/60 py-24">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-gujarati text-3xl leading-relaxed text-charcoal md:text-4xl"
          >
            “સેવા એ જ સાચો સંકલ્પ — together we build, together we serve.”
          </motion.p>
        </div>
      </section>
    </>
  );
}
