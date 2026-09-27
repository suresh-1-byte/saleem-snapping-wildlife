"use client";

import { useState, useEffect } from "react";
import { readJsonResponse, uploadImage } from "@/lib/adminUpload";
import { deliveryUrl } from "@/lib/siteImages";

interface WildlifeImage {
  id: string;
  cloudinaryUrl: string;
  title: string;
  location: string;
  category: string[];
  uploadedAt: string;
}

const CATEGORY_OPTIONS = ["Birds", "Mammals", "Macro", "Landscapes", "Wildlife Moments"];

export default function WildlifeManager() {
  const [images, setImages] = useState<WildlifeImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [replacing, setReplacing] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Form state for ADD
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Form state for EDIT
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editCategories, setEditCategories] = useState<string[]>([]);

  // Fetch images
  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/admin/portfolio', { cache: 'no-store' });
      const data = await readJsonResponse(res);
      setImages(data.images || []);
    } catch (error) {
      setMessage(`✗ Could not load wildlife images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function resetForm() {
    setSelectedFile(null);
    setPreviewUrl(null);
    setTitle("");
    setLocation("");
    setSelectedCategories([]);
    setShowAddForm(false);
  }

  function startEdit(image: WildlifeImage) {
    setEditing(image.id);
    setEditTitle(image.title);
    setEditLocation(image.location);
    setEditCategories(image.category.filter((cat) => CATEGORY_OPTIONS.includes(cat)));
  }

  function cancelEdit() {
    setEditing(null);
    setEditTitle("");
    setEditLocation("");
    setEditCategories([]);
  }

  async function saveEdit(imageId: string) {
    if (!editTitle.trim() || !editLocation.trim() || editCategories.length === 0) {
      setMessage("✗ Please fill all fields");
      return;
    }

    try {
      // The ID contains slashes ("wildlife/portfolio/..."), so it must be encoded.
      const res = await fetch(`/api/admin/portfolio/${encodeURIComponent(imageId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          location: editLocation,
          categories: editCategories.join(', '),
        }),
      });
      await readJsonResponse(res);

      setMessage("✓ Updated! The Wildlife page now shows the changes.");
      cancelEdit();
      fetchImages();
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      setMessage(`✗ Could not update: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Swap the photo file but keep its title, location and categories.
  function handleReplacePhoto(image: WildlifeImage) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setReplacing(image.id);
      setMessage("");
      try {
        await uploadImage(file, {
          folder: "wildlife/portfolio",
          publicId: image.id.split("/").pop(),
          context: {
            title: editTitle.trim() || image.title,
            location: editLocation.trim() || image.location,
            category: (editCategories.length > 0 ? editCategories : image.category).join(', '),
          },
        });
        setMessage(`✓ Photo replaced for "${image.title}".`);
        fetchImages();
        setTimeout(() => setMessage(""), 4000);
      } catch (error) {
        setMessage(`✗ Could not replace photo: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setReplacing(null);
      }
    };

    input.click();
  }

  async function handleUpload() {
    if (!selectedFile || !title.trim() || !location.trim() || selectedCategories.length === 0) {
      setMessage("✗ Please fill all fields: image, title, location, and at least one category");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      await uploadImage(selectedFile, {
        folder: "wildlife/portfolio",
        context: {
          title: title.trim(),
          location: location.trim(),
          category: selectedCategories.join(', '),
        },
      });

      setMessage(`✓ "${title.trim()}" added! It is now on the Wildlife page.`);
      resetForm();
      fetchImages();
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      setMessage(`✗ Could not upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(imageId: string, imageTitle: string) {
    if (!window.confirm(`Delete "${imageTitle}"? It will be removed from the website.`)) {
      return;
    }

    setDeleting(imageId);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(imageId)}`, {
        method: "DELETE",
      });
      await readJsonResponse(res);

      setImages((current) => current.filter((image) => image.id !== imageId));
      setMessage(`✓ "${imageTitle}" deleted from the website`);
      fetchImages();
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      setMessage(`✗ Could not delete: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-white/60">Loading wildlife images...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">WILDLIFE GALLERY</h2>
          <p className="text-white/60">
            {images.length} {images.length === 1 ? 'image' : 'images'} • Shown on Wildlife page
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="shrink-0 px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
        >
          {showAddForm ? "✕ Cancel" : "+ Add Image"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div role="status" className={`px-4 py-3 rounded-lg border break-words ${
          message.startsWith("✓")
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {message}
        </div>
      )}

      {/* Upload Form */}
      {showAddForm && (
        <div className="bg-charcoal border border-white/20 rounded-lg p-4 sm:p-6 space-y-5">
          <h3 className="text-xl font-semibold mb-4 text-earthy-green-light">Add New Wildlife Image</h3>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white/90">Select Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-4 py-3 bg-black border border-white/20 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-earthy-green file:text-white file:cursor-pointer hover:file:bg-earthy-green-light"
            />
            {previewUrl && (
              <div className="mt-3 relative w-full h-48 bg-black rounded overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Great Egret at Dawn"
              className="w-full px-4 py-3 bg-black border border-white/20 rounded text-white placeholder-white/40 focus:border-earthy-green focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/90">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Vedanthangal, Tamil Nadu"
              className="w-full px-4 py-3 bg-black border border-white/20 rounded text-white placeholder-white/40 focus:border-earthy-green focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white/90">
              Categories * (select at least one)
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  type="button"
                  className={`px-4 py-2 rounded border transition-all ${
                    selectedCategories.includes(category)
                      ? "bg-earthy-green border-earthy-green text-white shadow-lg"
                      : "bg-black border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {selectedCategories.includes(category) && "✓ "}
                  {category}
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <p className="text-sm text-earthy-green-light mt-2">
                Selected: {selectedCategories.join(', ')}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !title.trim() || !location.trim() || selectedCategories.length === 0}
            className="w-full px-6 py-4 bg-earthy-green hover:bg-earthy-green-light text-white font-semibold text-lg tracking-wide rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Wildlife Image"}
          </button>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-all"
          >
            <div className="relative aspect-square bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={deliveryUrl(image.cloudinaryUrl, { width: 800 })}
                alt={image.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Image Details or Edit Form */}
            <div className="p-4 space-y-3">
              {editing === image.id ? (
                // EDIT MODE
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full px-3 py-2 bg-black border border-white/20 rounded text-white text-sm"
                  />
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full px-3 py-2 bg-black border border-white/20 rounded text-white text-sm"
                  />
                  <div className="flex flex-wrap gap-1">
                    {CATEGORY_OPTIONS.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          if (editCategories.includes(cat)) {
                            setEditCategories(editCategories.filter(c => c !== cat));
                          } else {
                            setEditCategories([...editCategories, cat]);
                          }
                        }}
                        className={`text-xs px-2 py-1 rounded ${
                          editCategories.includes(cat)
                            ? "bg-earthy-green text-white"
                            : "bg-black border border-white/20 text-white/60"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleReplacePhoto(image)}
                    disabled={replacing === image.id}
                    className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-colors disabled:opacity-50"
                  >
                    {replacing === image.id ? "Uploading..." : "🖼️ Replace photo"}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => saveEdit(image.id)}
                      className="px-3 py-2 bg-earthy-green hover:bg-earthy-green-light text-white text-sm font-medium rounded transition-colors"
                    >
                      ✓ Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-colors"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <div>
                    <h4 className="font-semibold text-lg break-words">{image.title}</h4>
                    <p className="text-sm text-white/60 mt-1 break-words">{image.location}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.category.map(cat => (
                        <span key={cat} className="text-xs px-2 py-1 bg-earthy-green/20 text-earthy-green-light rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      Added {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => startEdit(image)}
                      className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 text-sm font-medium tracking-wide rounded transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image.id, image.title)}
                      disabled={deleting === image.id}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
                    >
                      {deleting === image.id ? "Deleting..." : "🗑️ Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {images.length === 0 && !showAddForm && (
        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-lg">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold mb-2">No wildlife images yet</h3>
          <p className="text-white/60 mb-6">Start building your wildlife gallery</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
          >
            + Add First Image
          </button>
        </div>
      )}
    </div>
  );
}
