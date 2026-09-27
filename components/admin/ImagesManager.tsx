"use client";

import { useCallback, useEffect, useState } from "react";
import { readJsonResponse, uploadImage } from "@/lib/adminUpload";
import { deliveryUrl, publicIdForPath, resolveSiteImage, type SiteImageMap } from "@/lib/siteImages";

interface ImageSlot {
  label: string;
  /** Local default in /public; an upload replaces it everywhere on the website. */
  path: string;
  description: string;
  fit?: "cover" | "contain";
}

// Every slot here is displayed on the website.
const IMAGE_CATEGORIES: { category: string; images: ImageSlot[] }[] = [
  {
    category: "Hero & Backgrounds",
    images: [
      { label: "Hero Background", path: "/images/hero%20pg.png", description: "Homepage top banner, shown at full original quality" },
      { label: "Closing Background", path: "/images/closing-cta.jpg", description: "Homepage bottom section" },
      { label: "Contact Page Background", path: "/images/contact-bg.jpg", description: "Behind the contact form" },
    ],
  },
  {
    category: "Explore by Category (Homepage)",
    images: [
      { label: "Birds", path: "/images/species-birds.jpg", description: "Homepage category tile" },
      { label: "Mammals", path: "/images/species-mammals.jpg", description: "Homepage category tile" },
      { label: "Macro", path: "/images/species-macro.jpg", description: "Homepage category tile" },
      { label: "Landscapes", path: "/images/species-landscapes.jpg", description: "Homepage category tile" },
      { label: "Wildlife Moments", path: "/images/species-moments.jpg", description: "Homepage category tile" },
    ],
  },
  {
    category: "Default Story Photos",
    images: [
      { label: "Story Main Photo", path: "/images/story-hero.jpg", description: "Used by stories still using the default photos" },
      { label: "Story Photo 2", path: "/images/story-support-1.jpg", description: "Used by stories still using the default photos" },
      { label: "Story Photo 3", path: "/images/story-support-2.jpg", description: "Used by stories still using the default photos" },
    ],
  },
  {
    category: "About Page",
    images: [
      { label: "About Portrait", path: "/images/about-portrait.jpg", description: "Portrait on the About page", fit: "contain" },
    ],
  },
  {
    category: "Logo & Watermark",
    images: [
      { label: "Logo / Watermark", path: "/images/watermark.png", description: "Navigation logo, footer signature and the watermark on every photo (use a transparent PNG)", fit: "contain" },
    ],
  },
];

type Message = { type: "success" | "error"; text: string } | null;

export default function ImagesManager() {
  const [images, setImages] = useState<SiteImageMap>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<Message>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/images", { cache: "no-store" });
      const data = await readJsonResponse(res);
      setImages(data.images || {});
    } catch (error) {
      setMessage({ type: "error", text: `Could not load images: ${error instanceof Error ? error.message : "Unknown error"}` });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function handleReplace(slot: ImageSlot) {
    const publicId = publicIdForPath(slot.path)!;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setBusy(publicId);
      setMessage(null);
      try {
        const [folder, name] = publicId.split("/");
        const uploaded = await uploadImage(file, { folder, publicId: name });
        setImages((current) => ({ ...current, [uploaded.publicId]: uploaded.url }));
        setMessage({ type: "success", text: `${slot.label} updated. It is now live on the website.` });
        fetchImages();
      } catch (error) {
        setMessage({ type: "error", text: `Could not upload ${slot.label}: ${error instanceof Error ? error.message : "Unknown error"}` });
      } finally {
        setBusy(null);
      }
    };

    input.click();
  }

  async function handleRestoreDefault(slot: ImageSlot) {
    const publicId = publicIdForPath(slot.path)!;
    if (!window.confirm(`Remove your uploaded ${slot.label} and go back to the original image?`)) return;

    setBusy(publicId);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/upload-image?publicId=${encodeURIComponent(publicId)}`, { method: "DELETE" });
      await readJsonResponse(res);
      setImages((current) => {
        const next = { ...current };
        delete next[publicId];
        return next;
      });
      setMessage({ type: "success", text: `${slot.label} restored to the original image.` });
      fetchImages();
    } catch (error) {
      setMessage({ type: "error", text: `Could not remove ${slot.label}: ${error instanceof Error ? error.message : "Unknown error"}` });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-wider mb-2">MANAGE IMAGES</h2>
        <p className="text-white/60">
          Replace any image on the website. Changes go live immediately; &ldquo;Restore default&rdquo; brings back the original.
        </p>
      </div>

      {message && (
        <div
          role="status"
          className={`px-4 py-3 rounded-lg border break-words ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {IMAGE_CATEGORIES.map((category) => (
        <div key={category.category} className="space-y-4">
          <h3 className="text-lg font-semibold tracking-wide text-earthy-green uppercase">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {category.images.map((slot) => {
              const publicId = publicIdForPath(slot.path)!;
              const isUploaded = Boolean(images[publicId]);
              const isBusy = busy === publicId;
              const preview = deliveryUrl(resolveSiteImage(slot.path, images), { width: 800 });

              return (
                <div
                  key={publicId}
                  className="bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-earthy-green/50 transition-colors"
                >
                  <div className="relative aspect-video bg-black">
                    {!loading && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt={slot.label}
                        className={`absolute inset-0 w-full h-full ${slot.fit === "contain" ? "object-contain p-2" : "object-cover"}`}
                      />
                    )}
                    <span
                      className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold tracking-widest uppercase rounded ${
                        isUploaded ? "bg-earthy-green text-white" : "bg-black/70 text-white/70"
                      }`}
                    >
                      {loading ? "Loading…" : isUploaded ? "Your upload" : "Default"}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-medium">{slot.label}</h4>
                      <p className="text-sm text-white/60 mt-1">{slot.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleReplace(slot)}
                        disabled={isBusy || loading}
                        className="px-3 py-2.5 bg-earthy-green hover:bg-earthy-green-light text-white text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-50"
                      >
                        {isBusy ? "Working…" : "Replace"}
                      </button>
                      <button
                        onClick={() => handleRestoreDefault(slot)}
                        disabled={isBusy || loading || !isUploaded}
                        title={isUploaded ? undefined : "Already showing the original image"}
                        className="px-3 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-medium tracking-wide rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Restore default
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
