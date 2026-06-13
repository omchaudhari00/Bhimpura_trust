import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import DonorCard from "../components/DonorCard";
import { api } from "../api/client";

export default function Home() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    api.trackHomepage().catch(() => {});
    api.getDonors().then(setDonors).catch(() => {});
  }, []);

  const topDonors = donors.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="editorial-line mb-16" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Recognition</p>
            <h2 className="mt-3 font-display text-5xl text-ink md:text-6xl">
              Our Generous Donors
            </h2>
          </div>
          <Link to="/donors" className="btn-outline self-start md:self-auto">
            View Full Donors List
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {topDonors.length === 0 ? (
            <p className="col-span-full rounded-lg border border-ink/8 bg-white/55 px-8 py-16 text-center text-mist shadow-[0_18px_45px_rgba(20,17,15,0.04)]">
              Donor records will appear here once added by the trust committee.
            </p>
          ) : (
            topDonors.map((donor, index) => (
              <DonorCard key={donor.id} donor={donor} rank={index + 1} />
            ))
          )}
        </div>
      </section>

      <section className="map-band py-24">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-gujarati text-3xl leading-relaxed text-charcoal md:text-4xl"
          >
            "સેવા એ જ સાચો સંકલ્પ" — together we build, together we serve.
          </motion.p>
        </div>
      </section>
    </>
  );
}
