import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../api/client";

const emptyForm = {
  name: "",
  amount_donated: "",
  village: "",
  current_place: "",
  photo: null,
};

export default function AddDonorModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhoto = (file) => {
    if (!file) return;
    updateField("photo", file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.amount_donated || !form.village || !form.current_place || !form.photo) {
      setError("All fields are mandatory.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("amount_donated", form.amount_donated);
    formData.append("village", form.village.trim());
    formData.append("current_place", form.current_place.trim());
    formData.append("photo", form.photo);

    try {
      setLoading(true);
      await api.addDonor(formData);
      setForm(emptyForm);
      setPreview(null);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(emptyForm);
    setPreview(null);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="section-label">Admin</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Add Donor</h2>
            <p className="mt-2 text-sm text-mist">
              All fields are required before saving.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                className="input-field"
                placeholder="Donor name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <input
                className="input-field"
                type="number"
                min="0"
                step="1"
                placeholder="Amount donated (INR)"
                value={form.amount_donated}
                onChange={(e) => updateField("amount_donated", e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Village"
                value={form.village}
                onChange={(e) => updateField("village", e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Current place"
                value={form.current_place}
                onChange={(e) => updateField("current_place", e.target.value)}
              />

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-gold/35 bg-white/50 px-4 py-8 text-center transition hover:bg-white">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mb-3 h-28 w-28 rounded-2xl object-cover"
                  />
                ) : (
                  <span className="mb-2 text-3xl text-gold">+</span>
                )}
                <span className="text-sm text-earth">Upload donor photo</span>
                <span className="mt-1 text-xs text-mist">JPG or PNG, max 5MB</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handlePhoto(e.target.files?.[0])}
                />
              </label>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" className="btn-outline flex-1" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={loading}>
                  {loading ? "Saving..." : "Add Donor"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
