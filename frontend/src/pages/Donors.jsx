import React, { useCallback, useEffect, useState } from "react";
import DonorCard from "../components/DonorCard";
import AddDonorModal from "../components/AddDonorModal";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Donors() {
  const { loggedIn, logout } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);

  const loadDonors = useCallback(() => {
    setLoading(true);
    api
      .getDonors()
      .then(setDonors)
      .catch(() => setDonors([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadDonors();
  }, [loadDonors, loggedIn]);

  const handleEdit = (donor) => {
    setEditingDonor(donor);
    setModalOpen(true);
  };

  const handleDelete = async (donorId) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await api.deleteDonor(donorId);
        loadDonors();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-36 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label">Donor Recognition Wall</p>
          <h1 className="mt-4 font-display text-6xl text-ink md:text-7xl">
            Donors List
          </h1>
        </div>

        {loggedIn && (
          <div className="flex flex-wrap gap-3">
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => {
                setEditingDonor(null);
                setModalOpen(true);
              }}
            >
              Add Donor
            </button>
            <button type="button" className="btn-outline" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="editorial-line my-12" />

      {loading ? (
        <p className="text-mist">Loading donors...</p>
      ) : donors.length === 0 ? (
        <div className="rounded-[2rem] border border-ink/8 bg-white/40 px-8 py-20 text-center text-mist">
          No donors have been added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {donors.map((donor, index) => (
            <DonorCard 
              key={donor.id} 
              donor={donor} 
              rank={index + 1} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <AddDonorModal
        open={modalOpen}
        initialData={editingDonor}
        onClose={() => setModalOpen(false)}
        onSuccess={loadDonors}
      />
    </section>
  );
}
