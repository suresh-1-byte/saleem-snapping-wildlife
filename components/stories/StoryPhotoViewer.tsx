"use client";

import { useState } from "react";
import Image from "next/image";
import WatermarkedPhoto from "@/components/WatermarkedPhoto";

export default function StoryPhotoViewer({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "#fcfaf2",
          padding: "16px 16px 28px 16px",
          border: "1px solid rgba(100,70,40,0.2)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
          transform: "rotate(-1.5deg)",
          position: "relative",
          margin: "20px 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "35%",
            width: "80px",
            height: "22px",
            backgroundColor: "rgba(235, 220, 180, 0.8)",
            border: "1px solid rgba(180, 150, 100, 0.4)",
            transform: "rotate(-3deg)",
          }}
        />
        <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden", border: "1px solid #dcd2bb", backgroundColor: "#e8ddc3" }}>
          <WatermarkedPhoto
            src={activeImage}
            alt={`${title} photo ${activeIndex + 1}`}
            fill
            className="h-full w-full object-contain [filter:sepia(0.12)]"
            watermarkClassName="w-20 md:w-24"
          />
          {images.length > 1 && (
            <>
              <button type="button" onClick={showPrevious} aria-label="Previous story photo" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #f4ebd0", background: "rgba(42,34,27,0.75)", color: "#f4ebd0", fontSize: "20px" }}>
                &#8592;
              </button>
              <button type="button" onClick={showNext} aria-label="Next story photo" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #f4ebd0", background: "rgba(42,34,27,0.75)", color: "#f4ebd0", fontSize: "20px" }}>
                &#8594;
              </button>
            </>
          )}
        </div>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "11px", color: "#5c4331", marginTop: "12px", display: "flex", justifyContent: "space-between" }}>
          <span>PLATE {activeIndex + 1} — {activeIndex === 0 ? "PRIMARY CAPTURE" : "FIELD NOTE"}</span>
          <span>{activeIndex + 1} / {images.length}</span>
        </div>
      </div>

      {images.length > 1 && (
        <div style={{ margin: "12px 0 20px", display: "flex", gap: "8px", overflowX: "auto", padding: "4px" }} aria-label="Story photo previews">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View story photo ${index + 1}`}
              style={{ flex: "0 0 72px", height: "54px", padding: "2px", border: index === activeIndex ? "2px solid #8c5a3c" : "1px solid #c8b793", background: "#fcfaf2", opacity: index === activeIndex ? 1 : 0.7 }}
            >
              <Image src={image} alt="" width={68} height={50} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
