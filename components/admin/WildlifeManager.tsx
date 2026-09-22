"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imageCompression from 'browser-image-compression';

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
  const [message, setMessage] = useState("");
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch images
  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/admin/portfolio');
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Failed to fetch wildlife images:', error);
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
    setShowForm(false);
  }

  async function handleUpload() {
    if (!selectedFile || !title || !location || selectedCategories.length === 0) {
      setMessage("✗ Please fill all fields: image, title, location, and at least one category");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // Compress image
      const options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 2400,
        useWebWorker: true,
        fileType: selectedFile.type,
      };
      
      const compressedFile = await imageCompression(selectedFile, options);
      
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("title", title);
      formData.append("location", location);
      formData.append("categories", selectedCategories.join(', '));

      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage(`✓ Wildlife image "${title}" added successfully!`);
        resetForm();
        fetchImages();
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : (data.error || 'Unknown error');
        setMessage(`✗ Failed to upload: ${errorMsg}`);
      }
    } catch (error) {
      setMessage(`✗ Error uploading: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(imageId: string, imageTitle: string) {
    if (!window.confirm(`Delete "${imageTitle}"?`)) {
      return;
    }

    setDeleting(imageId);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(imageId)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage(`✓ "${imageTitle}" deleted successfully`);
        fetchImages();
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await res.json();
        setMessage(`✗ ${data.error || 'Failed to delete'}`);
      }
    } catch (error) {
      setMessage('✗ Error deleting image');
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">WILDLIFE GALLERY</h2>
          <p className="text-white/60">
            {images.length} {images.length === 1 ? 'image' : 'images'} • Displayed on Wildlife page
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
        >
          {showForm ? "✕ Cancel" : "+ Add New Image"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`px-4 py-3 rounded-lg border ${
          message.startsWith("✓") 
            ? "bg-green-500/10 border-green-500/30 text-green-400" 
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {message}
        </div>
      )}

      {/* Upload Form */}
      {showForm && (
        <div className="bg-charcoal border border-white/20 rounded-lg p-6 space-y-5">
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
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  fill 
                  className="object-contain" 
                  unoptimized
                />
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
            disabled={uploading || !selectedFile || !title || !location || selectedCategories.length === 0}
            className="w-full px-6 py-4 bg-earthy-green hover:bg-earthy-green-light text-white font-semibold text-lg tracking-wide rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Wildlife Image"}
          </button>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-all hover:shadow-xl hover:shadow-earthy-green/10"
          >
            <div className="relative aspect-square bg-black">
              <Image
                src={image.cloudinaryUrl}
                alt={image.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-lg">{image.title}</h4>
                <p className="text-sm text-white/60 mt-1">{image.location}</p>
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
              <button
                onClick={() => handleDelete(image.id, image.title)}
                disabled={deleting === image.id}
                className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
              >
                {deleting === image.id ? "Deleting..." : "🗑️ Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {images.length === 0 && !showForm && (
        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-lg">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold mb-2">No wildlife images yet</h3>
          <p className="text-white/60 mb-6">Start building your wildlife gallery</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
          >
            + Add First Image
          </button>
        </div>
      )}
    </div>
  );
}
