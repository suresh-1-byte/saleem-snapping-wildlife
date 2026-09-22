"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imageCompression from 'browser-image-compression';

interface FeaturedImage {
  id: string;
  cloudinaryUrl: string;
  uploadedAt: string;
}

export default function FeaturedManager() {
  const [images, setImages] = useState<FeaturedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/admin/featured');
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (error) {
      console.error('Failed to fetch featured images:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploading(true);
      setMessage("");

      try {
        const options = {
          maxSizeMB: 3,
          maxWidthOrHeight: 2400,
          useWebWorker: true,
          fileType: file.type,
        };
        
        const compressedFile = await imageCompression(file, options);
        
        const formData = new FormData();
        formData.append("file", compressedFile);

        const res = await fetch("/api/admin/featured", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        
        if (res.ok) {
          setMessage(`✓ Featured image added successfully!`);
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
    };

    input.click();
  }

  async function handleDelete(imageId: string) {
    if (!window.confirm('Delete this featured image?')) {
      return;
    }

    setDeleting(imageId);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/featured?id=${encodeURIComponent(imageId)}`, {
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
    return <div className="text-center py-8">Loading featured images...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">FEATURED WORK</h2>
          <p className="text-white/60">{images.length} images • Displayed on homepage</p>
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "+ Add Featured Image"}
        </button>
      </div>

      {message && (
        <div className={`px-4 py-3 rounded ${message.startsWith("✓") ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-colors"
          >
            <div className="relative aspect-video bg-black">
              <Image
                src={image.cloudinaryUrl}
                alt={`Featured work ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-medium">Featured Image {index + 1}</h4>
                <p className="text-xs text-white/40 mt-1">
                  Added {new Date(image.uploadedAt).toLocaleDateString()}
                </p>
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
          <p>No featured images yet. Click "Add Featured Image" to get started.</p>
        </div>
      )}
    </div>
  );
}
