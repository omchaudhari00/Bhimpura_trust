import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

export default function Footer() {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    api.getHomepageVisits()
      .then((data) => setVisits(data.total_count))
      .catch(() => {});
  }, []);
  return (
    <footer className="border-t border-ink/8 bg-parchment/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-gujarati text-lg font-semibold text-ink">
            સંકલ્પ સેવા સમર્પણ ચેરીટેબલ ટ્રસ્ટ
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
            Serving the community through seva, compassion, and collective
            dedication.
          </p>
        </div>
        
        {visits !== null && (
          <div className="text-left md:text-right">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-mist/70 mb-1">Total Visits</span>
            <span className="font-display text-2xl text-ink">{visits}</span>
          </div>
        )}
      </div>
    </footer>
  );
}
