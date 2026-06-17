import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────── */
/*  YouTube SVG icon                                           */
/* ─────────────────────────────────────────────────────────── */
const YTIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.12C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.388.52A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.11 2.12C4.495 20.454 12 20.454 12 20.454s7.505 0 9.388-.52a2.997 2.997 0 0 0 2.11-2.12C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────── */
/*  Countdown hook                                             */
/* ─────────────────────────────────────────────────────────── */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ expired: true });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

/* ─────────────────────────────────────────────────────────── */
/*  Countdown unit                                             */
/* ─────────────────────────────────────────────────────────── */
function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-white/60 shadow-inner backdrop-blur-sm md:h-16 md:w-16">
        <span className="font-display text-2xl font-bold text-ink md:text-3xl">
          {String(value ?? 0).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-mist">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Live Stream Embed                                          */
/* ─────────────────────────────────────────────────────────── */
function LiveStreamEmbed({ event }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const playerRef = useRef(null);

  // Scroll into view when player opens
  useEffect(() => {
    if (showPlayer && playerRef.current) {
      setTimeout(() => playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
  }, [showPlayer]);

  // Build embed URL: prefer specific video ID, else channel live
  const embedSrc = event.youtubeVideoId
    ? `https://www.youtube.com/embed/${event.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`
    : event.youtubeChannelId
      ? `https://www.youtube.com/embed/live_stream?channel=${event.youtubeChannelId}&autoplay=1&rel=0`
      : null;

  if (!embedSrc) return null;

  return (
    <div className="mt-6" ref={playerRef}>
      {/* ── Live player toggle ─── */}
      {event.isLive ? (
        /* Auto-show player when live */
        <div className="overflow-hidden rounded-[1.5rem] border border-red-500/30 bg-black shadow-[0_16px_56px_rgba(239,68,68,0.18)]">
          {/* Header bar */}
          <div className="flex items-center justify-between bg-gradient-to-r from-red-700 to-red-600 px-5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_#fff] animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">
                Live Stream
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <YTIcon className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white">{event.telecast}</span>
            </div>
          </div>

          {/* iframe */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={embedSrc}
              title={`${event.title} – Live Stream`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between bg-black/80 px-5 py-3">
            <p className="text-xs text-white/50">
              Powered by YouTube · {event.telecast}
            </p>
            <a
              href={event.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition hover:bg-red-500"
            >
              <YTIcon className="h-3.5 w-3.5" />
              Open on YouTube
            </a>
          </div>
        </div>
      ) : (
        /* Pre-live: show "Watch Live" CTA that expands player */
        <AnimatePresence mode="wait">
          {showPlayer ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-black shadow-[0_16px_56px_rgba(20,17,15,0.18)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-charcoal px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Live Stream Preview
                </span>
                <button
                  onClick={() => setShowPlayer(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={embedSrc}
                  title={`${event.title} – Preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowPlayer(true)}
              className="group flex w-full items-center justify-center gap-3 rounded-[1.25rem] border border-red-500/20 bg-gradient-to-br from-red-50 to-red-100/60 px-6 py-5 text-left transition hover:border-red-500/40 hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.4)] transition group-hover:scale-105 group-hover:shadow-[0_6px_24px_rgba(239,68,68,0.5)]">
                <YTIcon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-ink">Watch Live Stream on Website</p>
                <p className="text-xs text-earth">
                  Embedded YouTube player · {event.telecast}
                </p>
              </div>
              <svg
                className="ml-auto h-4 w-4 text-red-500 transition group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Event Card                                                 */
/* ─────────────────────────────────────────────────────────── */
function EventCard({ event }) {
  const countdown = useCountdown(event.dateISO);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[2rem] border border-gold/20 bg-white/60 shadow-[0_12px_48px_rgba(184,149,46,0.12)] backdrop-blur-sm"
    >
      {/* ── POSTER IMAGE — responsive ──────────────────── */}
      <div className="relative w-full overflow-hidden">
        {/* Mobile: vertical/portrait poster — full height, no crop */}
        <img
          src={event.posterVertical}
          alt={event.title}
          className="block w-full md:hidden"
        />
        {/* Desktop: horizontal/landscape poster — full height, no crop */}
        <img
          src={event.posterHorizontal}
          alt={event.title}
          className="hidden w-full md:block"
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/90 to-transparent" />

        {/* Live badge */}
        {event.isLive && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3.5 py-1.5 shadow-lg">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Live Now
            </span>
          </div>
        )}

        {/* YouTube badge */}
        {event.youtubeUrl && (
          <a
            href={event.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/70 px-3.5 py-1.5 backdrop-blur transition hover:bg-red-600"
          >
            <YTIcon className="h-4 w-4 text-white" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Watch Live
            </span>
          </a>
        )}
      </div>

      {/* ── EVENT DETAILS ─────────────────────────────── */}
      <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6">
        {/* Title */}
        <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl lg:text-5xl">
          {event.title}
        </h2>
        <p className="mt-2 text-base text-earth md:text-lg">{event.subtitle}</p>

        <div className="editorial-line my-6" />

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: "📍", label: "સ્થાન", value: event.location },
            { icon: "📅", label: "તારીખ", value: event.date },
            { icon: "🕗", label: "સમય", value: event.time },
            { icon: "🎙", label: "ટેલિકાસ્ટ", value: event.telecast },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 rounded-2xl border border-ink/8 bg-white/50 px-4 py-3.5"
            >
              <span className="text-lg">{item.icon}</span>
              <p className="text-[10px] font-medium uppercase tracking-wide text-mist">
                {item.label}
              </p>
              <p className="text-sm font-semibold leading-snug text-ink">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Countdown */}
        {!countdown.expired && countdown.days !== undefined && (
          <div className="mt-8">
            <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-widest text-mist">
              Event starts in
            </p>
            <div className="flex items-start justify-center gap-3 md:gap-5">
              <CountUnit value={countdown.days} label="Days" />
              <span className="mt-3 text-2xl font-bold text-gold opacity-60">:</span>
              <CountUnit value={countdown.hours} label="Hours" />
              <span className="mt-3 text-2xl font-bold text-gold opacity-60">:</span>
              <CountUnit value={countdown.minutes} label="Mins" />
              <span className="mt-3 text-2xl font-bold text-gold opacity-60">:</span>
              <CountUnit value={countdown.seconds} label="Secs" />
            </div>
          </div>
        )}

        {countdown.expired && (
          <p className="mt-6 text-center text-sm font-medium text-gold">
            ✨ This event has concluded. Thank you for your blessings!
          </p>
        )}

        {/* ── LIVE STREAM EMBED ─── */}
        <LiveStreamEmbed event={event} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Event data                                                 */
/*                                                             */
/*  To go LIVE on the day of the event:                        */
/*    1. Set  isLive: true                                     */
/*    2. Set  youtubeVideoId: "YOUR_LIVE_VIDEO_ID"             */
/*       (Get it from the YouTube live stream URL)             */
/* ─────────────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 1,
    title: "રજત જયંતિ મહોત્સવ",
    subtitle: "ૐ શ્રી નીલકંઠ મહાદેવ તથા શ્રી નાનાભાઈ માતાજીના — 25મો ઉત્સવ",
    dateISO: "2026-06-28T20:30:00+05:30",
    date: "28/06/2026 · રવિવાર",
    time: "રાત્રે 8:30 કલાકે",
    location: "ભીમપુરા નવરાત્રી ચોક",
    telecast: "YouTube · STAR LIVE",
    youtubeUrl: "https://www.youtube.com/watch?app=desktop&v=yfZa5iVTadc&list=WL&index=1&ra=m",
    // ↓ Set this to the YouTube video/live ID on event day, e.g. "dQw4w9WgXcQ"
    youtubeVideoId: "yfZa5iVTadc",
    // ↓ Fallback: your channel ID (used if youtubeVideoId is blank)
    youtubeChannelId: "",
    // ↓ Flip to true on the day of the event to show the embedded player automatically
    isLive: true,
    posterVertical: "/event-poster-vertical.jpg",
    posterHorizontal: "/event-poster-horizontal.png",
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  Events Page                                                */
/* ─────────────────────────────────────────────────────────── */
export default function Events() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-36 md:px-8">
      {/* Header */}
      <div className="mb-12">
        <p className="section-label">Events</p>
        <h1 className="mt-4 font-display text-6xl text-ink md:text-7xl">
          Upcoming Events
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-earth">
          Celebrate with us. Forthcoming trust events are listed below with live
          telecast details, countdown timers, and an embedded live stream.
        </p>
      </div>

      <div className="editorial-line mb-12" />

      {/* Event cards */}
      <div className="flex flex-col gap-10">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
