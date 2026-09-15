"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  images: string[];
  locations: string[];
  observation: string;
}

const CATEGORIES = ["Birds", "Mammals", "Macro", "Reptiles", "Amphibians"];

export default function SpeciesManager() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [editingSpecies, setEditingSpecies] = useState<Species | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    fetchSpecies();
  }, []);

  async function fetchSpecies() {
    try {
      const res = await fetch("/api/admin/species");
      if (res.ok) {
        const data = await res.json();
        setSpecies(data.species || []);
      }
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  }

  async function handleSaveSpecies(spec: Species) {
    try {
      const res = await fetch("/api/admin/species", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spec),
      });

      if (res.ok) {
        fetchSpecies();
        setShowForm(false);
        setEditingSpecies(null);
      }
    } catch (error) {
      console.error("Error saving species:", error);
    }
  }

  async function uploadSpeciesPhoto(file: File, slot: "main" | "additional") {
    if (!editingSpecies) return;

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const imagePath = `/images/species-${editingSpecies.id}-${slot}-${Date.now()}.${extension}`;
    setUploadingPhoto(slot);
    setFormMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("imagePath", imagePath);
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setFormMessage("Could not upload that photo.");
        return;
      }

      setEditingSpecies((current) => {
        if (!current) return current;
        const images = slot === "main"
          ? [imagePath, ...current.images.filter((image) => image !== current.images[0])]
          : [...current.images, imagePath];

        return { ...current, images };
      });
      setFormMessage("Photo added. Save the species to publish it.");
    } catch (error) {
      setFormMessage("Could not upload that photo.");
    } finally {
      setUploadingPhoto(null);
    }
  }

  function removeSpeciesPhoto(index: number) {
    setEditingSpecies((current) => {
      if (!current || index === 0) return current;
      return { ...current, images: current.images.filter((_, photoIndex) => photoIndex !== index) };
    });
  }

  async function handleDeleteSpecies(id: string) {
    if (!confirm("Are you sure you want to delete this species?")) return;

    try {
      const res = await fetch(`/api/admin/species?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchSpecies();
      }
    } catch (error) {
      console.error("Error deleting species:", error);
    }
  }

  function handleNewSpecies() {
    setEditingSpecies({
      id: Date.now().toString(),
      commonName: "",
      scientificName: "",
      category: "Birds",
      images: [],
      locations: [],
      observation: "",
    });
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">MANAGE SPECIES</h2>
          <p className="text-white/60">Add, edit, or delete species entries</p>
        </div>
        <button
          onClick={handleNewSpecies}
          className="px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
        >
          + Add New Species
        </button>
      </div>

      {showForm && editingSpecies && (
        <div className="bg-charcoal border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingSpecies.id ? "Edit Species" : "New Species"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSpecies(editingSpecies);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Common Name *</label>
                <input
                  type="text"
                  value={editingSpecies.commonName}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, commonName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Scientific Name</label>
                <input
                  type="text"
                  value={editingSpecies.scientificName}
                  onChange={(e) =>
                    setEditingSpecies({ ...editingSpecies, scientificName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                  placeholder="Italicized Latin name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={editingSpecies.category}
                onChange={(e) =>
                  setEditingSpecies({ ...editingSpecies, category: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Locations (comma-separated)</label>
              <input
                type="text"
                value={editingSpecies.locations.join(", ")}
                onChange={(e) =>
                  setEditingSpecies({
                    ...editingSpecies,
                    locations: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                placeholder="e.g., Vedanthangal, Pulicat, Bandipur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Observation/Notes</label>
              <textarea
                value={editingSpecies.observation}
                onChange={(e) =>
                  setEditingSpecies({ ...editingSpecies, observation: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                placeholder="Share your observations about this species..."
              />
            </div>

            <div className="border border-white/10 rounded-lg p-4 space-y-4">
              <div>
                <h4 className="font-semibold">Species Photos</h4>
                <p className="text-sm text-white/60 mt-1">
                  Add one main photo and optional additional photos. Each photo appears only once.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="px-4 py-2 bg-earthy-green hover:bg-earthy-green-light rounded text-sm font-medium cursor-pointer transition-colors">
                  {uploadingPhoto === "main" ? "Uploading..." : "Add Main Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingPhoto !== null}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) uploadSpeciesPhoto(file, "main");
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
                <label className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm font-medium cursor-pointer transition-colors">
                  {uploadingPhoto === "additional" ? "Uploading..." : "Add Additional Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingPhoto !== null}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) uploadSpeciesPhoto(file, "additional");
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>

              {editingSpecies.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {editingSpecies.images.map((image, index) => (
                    <div key={image} className="relative aspect-video bg-black/40 border border-white/10 rounded overflow-hidden">
                      <Image src={image} alt={`${editingSpecies.commonName || "Species"} photo ${index + 1}`} fill className="object-cover" unoptimized />
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-black/60 flex items-center justify-between gap-2">
                        <span>{index === 0 ? "Main photo" : `Photo ${index + 1}`}</span>
                        {index > 0 && (
                          <button type="button" onClick={() => removeSpeciesPhoto(index)} className="text-red-300 hover:text-red-200">
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {formMessage && <p className="text-sm text-earthy-green-light">{formMessage}</p>}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-earthy-green hover:bg-earthy-green-light text-white font-medium rounded transition-colors"
              >
                Save Species
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingSpecies(null);
                }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {species.map((spec) => (
          <div
            key={spec.id}
            className="bg-charcoal border border-white/10 rounded-lg p-6 hover:border-earthy-green/50 transition-colors"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{spec.commonName}</h3>
              {spec.scientificName && (
                <p className="text-sm text-white/60 italic">{spec.scientificName}</p>
              )}
              <span className="inline-block mt-2 px-3 py-1 bg-earthy-green/20 text-earthy-green text-xs font-medium rounded">
                {spec.category}
              </span>
            </div>
            <p className="text-sm text-white/80 mb-4 line-clamp-2">
              {spec.observation || "No observations yet."}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingSpecies(spec);
                  setShowForm(true);
                }}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteSpecies(spec.id)}
                className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 text-sm font-medium rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {species.length === 0 && !showForm && (
        <div className="text-center py-12 text-white/40">
          <p>No species entries yet. Click &quot;Add New Species&quot; to get started.</p>
        </div>
      )}
    </div>
  );
}
