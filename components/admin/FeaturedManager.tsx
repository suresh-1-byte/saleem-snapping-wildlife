"use client";

import { useState, useEffect } from "react";
import { readJsonResponse, uploadImage } from "@/lib/adminUpload";
import { deliveryUrl } from "@/lib/siteImages";

interface FeaturedImage {
  id: string;
  cloudinaryUrl: string;
  uploadedAt: string;
}

export default function FeaturedManager() {
  const [images, setImages] = useState<FeaturedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch('/api/admin/featured', { cache: 'no-store' });
      const data = await readJsonResponse(res);
      setImages(data.images || []);
    } catch (error) {
      setMessage(`✗ Could not load featured images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  function pickFile(onFile: (file: File) => void) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) onFile(file);
    };
    input.click();
  }

  function handleUpload() {
    pickFile(async (file) => {
      setUploading(true);
      setMessage("");
      try {
        await uploadImage(file, { folder: "wildlife/featured" });
        setMessage("✓ Featured image added! It is now on the homepage.");
        fetchImages();
      } catch (error) {
        setMessage(`✗ Could not upload: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setUploading(false);
      }
    });
  }

  function handleReplace(image: FeaturedImage) {
    pickFile(async (file) => {
      setBusy(image.id);
      setMessage("");
      try {
        await uploadImage(file, { folder: "wildlife/featured", publicId: image.id.split("/").pop() });
        setMessage("✓ Featured image replaced.");
        fetchImages();
      } catch (error) {
        setMessage(`✗ Could not replace: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setBusy(null);
      }
    });
  }

  async function handleDelete(imageId: string) {
    if (!window.confirm('Delete this featured image? It will be removed from the homepage.')) {
      return;
    }

    setBusy(imageId);
    setMessage("");

    try {
      const res = await fetch(`/api/admin/featured?id=${encodeURIComponent(imageId)}`, {
        method: "DELETE",
      });
      await readJsonResponse(res);

      setImages((current) => current.filter((image) => image.id !== imageId));
      setMessage('✓ Image deleted from the homepage');
      fetchImages();
    } catch (error) {
      setMessage(`✗ Could not delete: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setBusy(null);
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-white/60 animate-pulse">Loading featured images...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">FEATURED WORK</h2>
          <p className="text-white/60">{images.length} images • Displayed on homepage (newest first)</p>
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="shrink-0 px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "+ Add Featured Image"}
        </button>
      </div>

      {message && (
        <div role="status" className={`px-4 py-3 rounded-lg border break-words ${
          message.startsWith("✓")
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-colors"
          >
            <div className="relative aspect-video bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={deliveryUrl(image.cloudinaryUrl, { width: 800 })}
                alt={`Featured work ${index + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-medium">Featured Image {index + 1}</h4>
                <p className="text-xs text-white/40 mt-1">
                  Added {new Date(image.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleReplace(image)}
                  disabled={busy === image.id}
                  className="px-3 py-2 bg-earthy-green hover:bg-earthy-green-light text-white text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
                >
                  {busy === image.id ? "Working..." : "Replace"}
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  disabled={busy === image.id}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-white/60">
          <p>No featured images yet. Click &quot;Add Featured Image&quot; to get started.</p>
        </div>
      )}
    </div>
  );
}
