"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imageCompression from 'browser-image-compression';

interface PortfolioImage {
  id: string;
  cloudinaryUrl: string;
  title: string;
  location: string;
  category: string[];
  uploadedAt: string;
}

const CATEGORY_OPTIONS = ["Birds", "Mammals", "Macro", "Landscapes", "Wildlife Moments"];

export default function PortfolioManager() {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      console.error('Failed to fetch portfolio images:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  async function handleUpload() {
    if (!selectedFile || !title || !location || selectedCategories.length === 0) {
      setMessage("✗ Please fill all fields and select at least one category");
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
        setMessage(`✓ Portfolio image added successfully!`);
        // Reset form
        setSelectedFile(null);
        setTitle("");
        setLocation("");
        setSelectedCategories([]);
        setShowForm(false);
        // Refresh images
        fetchImages();
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

  async function handleDelete(imageId: string) {
    if (!window.confirm('Delete this portfolio image?')) {
      return;
    }

    setDeleting(imageId);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/portfolio?id=${encodeURIComponent(imageId)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage('✓ Image deleted successfully');
        fetchImages();
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
    return <div className="text-center py-8">Loading portfolio...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">PORTFOLIO GALLERY</h2>
          <p className="text-white/60">{images.length} images in portfolio</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Portfolio Image"}
        </button>
      </div>

      {message && (
        <div className={`px-4 py-3 rounded ${message.startsWith("✓") ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
          {message}
        </div>
      )}

      {/* Upload Form */}
      {showForm && (
        <div className="bg-charcoal border border-white/10 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Add New Portfolio Image</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Select Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 bg-black border border-white/20 rounded text-white"
            />
            {selectedFile && (
              <p className="text-sm text-white/60 mt-1">Selected: {selectedFile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Great Egret at Dawn"
              className="w-full px-3 py-2 bg-black border border-white/20 rounded text-white placeholder-white/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Vedanthangal, Tamil Nadu"
              className="w-full px-3 py-2 bg-black border border-white/20 rounded text-white placeholder-white/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Categories (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded border transition-colors ${
                    selectedCategories.includes(category)
                      ? "bg-earthy-green border-earthy-green text-white"
                      : "bg-black border-white/20 text-white/60 hover:border-white/40"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <p className="text-sm text-white/60 mt-2">Selected: {selectedCategories.join(', ')}</p>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !title || !location || selectedCategories.length === 0}
            className="w-full px-4 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Portfolio Image"}
          </button>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-colors"
          >
            <div className="relative aspect-video bg-black">
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
                <h4 className="font-medium">{image.title}</h4>
                <p className="text-sm text-white/60 mt-1">{image.location}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {image.category.map(cat => (
                    <span key={cat} className="text-xs px-2 py-1 bg-earthy-green/20 text-earthy-green-light rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDelete(image.id)}
                disabled={deleting === image.id}
                className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
              >
                {deleting === image.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-white/60">
          <p>No portfolio images yet. Click &quot;Add Portfolio Image&quot; to get started.</p>
        </div>
      )}
    </div>
  );
}
