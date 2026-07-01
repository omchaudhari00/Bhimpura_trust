import React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Gallery() {
  const { loggedIn } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const loadPhotos = () => {
    api
      .getEventPhotos()
      .then(setPhotos)
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("image", file);
        return api.addEventPhoto(formData);
      });
      await Promise.all(uploadPromises);
      loadPhotos();
    } catch (err) {
      alert("Failed to upload some photos: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleDelete = async (photoId) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await api.deleteEventPhoto(photoId);
      if (selectedPhoto?.id === photoId) setSelectedPhoto(null);
      loadPhotos();
    } catch (err) {
      alert("Failed to delete photo: " + err.message);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label">Gallery</p>
          <h1 className="mt-4 font-display text-6xl text-ink md:text-7xl">
            Moments of Seva
          </h1>
          <p className="mt-6 max-w-2xl text-earth">
            A visual archive of trust events and celebrations. Photos can be viewed
            and downloaded by all visitors.
          </p>
        </div>
        
        {loggedIn && (
          <div className="flex self-start md:self-auto">
            <label className={`btn-primary cursor-pointer ${uploading ? "opacity-70" : ""}`}>
              {uploading ? "Uploading..." : "Upload Photos"}
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={handleUpload} 
                disabled={uploading}
              />
            </label>
          </div>
        )}
      </div>

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
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group mb-5 block break-inside-avoid overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white/50 cursor-pointer"
            >
              <img
                src={photo.image_url}
                alt="Trust event"
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="modal-backdrop z-[110]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-h-[95vh] w-[95vw] max-w-7xl rounded-3xl bg-ink p-4 shadow-[0_30px_80px_rgba(20,17,15,0.8)] flex flex-col items-center justify-center border border-white/10"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 hover:text-gold"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
              <div className="relative flex h-full max-h-[80vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-charcoal/50">
                <img 
                  src={selectedPhoto.image_url} 
                  alt="Enlarged event" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-6 flex w-full justify-center gap-4 pb-2">
                <a 
                  href={`${import.meta.env.VITE_API_URL || ""}/api/event-photos/${selectedPhoto.id}/download/`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-primary border-white/20 bg-white/10 text-white hover:border-gold hover:bg-gold hover:text-ink"
                >
                  Download Photo
                </a>
                {loggedIn && (
                  <button 
                    onClick={() => handleDelete(selectedPhoto.id)}
                    className="btn-outline border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    Delete Photo
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
