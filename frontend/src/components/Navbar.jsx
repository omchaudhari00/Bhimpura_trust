import React from "react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-[80] glass-nav border-b border-ink/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold/30 bg-parchment shadow-[0_8px_24px_rgba(20,17,15,0.08)] transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Bhimpura Trust Logo"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23EDE6D8' width='100' height='100'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='34' fill='%23B8952E'%3Eશ%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-lg font-semibold leading-tight text-ink tracking-tight">
              Bhimpura Trust
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mist">
              Charitable Trust
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-[11px] font-medium uppercase tracking-editorial transition-colors duration-300 ${
                  isActive ? "text-ink" : "text-mist hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-gold"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-ink/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-px w-5 bg-ink transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-ink transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-ink/5 bg-cream/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                    location.pathname === link.to
                      ? "bg-parchment text-ink"
                      : "text-earth"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
