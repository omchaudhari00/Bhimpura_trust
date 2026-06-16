import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Footer() {
  const { loggedIn } = useAuth();
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      api.getHomepageVisits()
        .then((data) => setVisits(data.total_count))
        .catch(() => {});
    }
  }, [loggedIn]);

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
        {loggedIn && visits !== null && (
          <div className="text-right">
            <p className="text-sm text-mist">
              Homepage Visits: <span className="font-bold text-ink">{visits}</span>
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
