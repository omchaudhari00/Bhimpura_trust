import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonorCard({ donor, rank, onEdit, onDelete, hideMenu = false }) {
  const { loggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      className="group relative overflow-hidden rounded-[2rem] border border-ink/8 bg-white/55 p-5 shadow-[0_20px_50px_rgba(20,17,15,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_28px_60px_rgba(20,17,15,0.1)]"
    >
      <div className="absolute right-5 top-5 font-display text-5xl font-light text-gold/20 transition group-hover:text-gold/35">
        {String(rank).padStart(2, "0")}
      </div>

      {loggedIn && !hideMenu && (
        <div className="absolute right-5 bottom-5 z-20">
          <button 
            type="button" 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex h-8 w-8 flex-col items-center justify-center gap-[3px] rounded-full bg-white border border-ink/10 transition hover:bg-parchment"
          >
            <span className="h-[3px] w-[3px] rounded-full bg-ink"></span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink"></span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink"></span>
          </button>
          
          {menuOpen && (
            <div className="absolute bottom-full right-0 mb-2 flex w-28 flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-lg">
              <button 
                type="button" 
                onClick={() => { setMenuOpen(false); onEdit?.(donor); }}
                className="px-4 py-2.5 text-left text-sm font-medium text-ink transition hover:bg-parchment"
              >
                Edit
              </button>
              <button 
                type="button" 
                onClick={() => { setMenuOpen(false); onDelete?.(donor.id); }}
                className="px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-[1.5rem] border border-gold/20 bg-parchment sm:mx-0">
          <img
            src={donor.photo_url}
            alt={donor.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-[11px] uppercase tracking-editorial text-mist">Donor</p>
          <h3 className="mt-1 font-gujarati text-3xl font-medium text-ink">
            {donor.name}
          </h3>
          <p className="mt-2 text-2xl font-bold text-gold">
            {formatAmount(donor.amount_donated)}
          </p>
          <div className="mt-4 grid gap-2 text-sm text-earth sm:grid-cols-2 pr-10">
            <p>
              <span className="text-mist">Village:</span> {donor.village}
            </p>
            <p>
              <span className="text-mist">Current place:</span> {donor.current_place}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
