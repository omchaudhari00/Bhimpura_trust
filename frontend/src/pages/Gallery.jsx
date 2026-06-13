import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/client";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getEventPhotos()
      .then(setPhotos)
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8">
      <p className="section-label">Gallery</p>
      <h1 className="mt-4 font-display text-6xl text-ink md:text-7xl">
        Moments of Seva
      </h1>
      <p className="mt-6 max-w-2xl text-earth">
        A visual archive of trust events and celebrations. Photos can be viewed
        and downloaded by all visitors.
      </p>

      <div className="editorial-line my-12" />

      {loading ? (
        <p className="text-mist">Loading gallery...</p>
      ) : photos.length === 0 ? (
        <div className="rounded-[2rem] border border-ink/8 bg-white/40 px-8 py-20 text-center text-mist">
          Gallery photos will appear here once uploaded by the admin.
        </div>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <motion.a
              key={photo.id}
              href={`/api/event-photos/${photo.id}/download/`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group mb-5 block break-inside-avoid overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white/50"
            >
              <img
                src={photo.image_url}
                alt="Trust event"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
