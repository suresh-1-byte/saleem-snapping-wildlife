"use client";

import { useEffect, useState } from "react";
import { Caveat } from "next/font/google";
import Lightbox from "@/components/Lightbox";
import WatermarkedPhoto from "@/components/WatermarkedPhoto";

// Google Handwritten Font configuration
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type Category = "All" | "Birds" | "Mammals" | "Macro" | "Landscapes" | "Wildlife Moments";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: Category[];
  title: string;
  location: string;
}

const photoDetails: Record<string, Omit<Photo, "id" | "src" | "alt">> = {
  "portfolio-1.jpg": { category: ["All", "Birds"], title: "Great Egret at Dawn", location: "Vedanthangal, Tamil Nadu" },
  "portfolio-2.jpg": { category: ["All", "Mammals"], title: "Asian Elephant", location: "Bandipur, Karnataka" },
  "portfolio-3.jpg": { category: ["All", "Macro"], title: "Dragonfly Detail", location: "Chennai, Tamil Nadu" },
  "portfolio-4.jpg": { category: ["All", "Landscapes"], title: "Misty Morning", location: "Nilgiris, Tamil Nadu" },
  "portfolio-5.jpg": { category: ["All", "Wildlife Moments"], title: "Kingfisher Hunt", location: "Pulicat Lake, Tamil Nadu" },
  "portfolio-6.jpg": { category: ["All", "Birds"], title: "Painted Stork", location: "Vedanthangal, Tamil Nadu" },
};

const categories: Category[] = ["All", "Birds", "Mammals", "Macro", "Landscapes", "Wildlife Moments"];

// Custom rotation classes for realistic organic photo layout
const rotations = [
  "-rotate-2 hover:rotate-0",
  "rotate-2 hover:rotate-0",
  "-rotate-1 hover:rotate-0",
  "rotate-3 hover:rotate-0",
  "-rotate-3 hover:rotate-0",
  "rotate-1 hover:rotate-0",
];

export default function WildlifeGallery({ images }: { images: string[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    const categoryMap: Record<string, Category> = {
      birds: "Birds",
      mammals: "Mammals",
      macro: "Macro",
      landscapes: "Landscapes",
      moments: "Wildlife Moments",
    };

    if (category && categoryMap[category]) {
      setActiveCategory(categoryMap[category]);
    }
  }, []);

  const photos: Photo[] = images.map((src, index) => {
    const filename = src.split("/").pop() || "";
    const details = photoDetails[filename] || {
      category: ["All"] as Category[],
      title: `Wildlife Photograph ${index + 1}`,
      location: "South India",
    };

    return { id: index + 1, src, alt: details.title, ...details };
  });

  const filteredPhotos = activeCategory === "All"
    ? photos
    : photos.filter((photo) => photo.category.includes(activeCategory));

  return (
    <section className="section-spacing bg-[#121212] py-20 min-h-screen text-white overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto px-4">
        
        {/* Gallery Title Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif tracking-widest uppercase mb-2">
            The Wild, As I See It.
          </h2>
          <p className="text-stone-400 text-sm md:text-base italic">
            Wildlife Moments
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm md:text-base tracking-wide transition-all duration-300 pb-1 border-b-2 ${
                activeCategory === category
                  ? "opacity-100 border-white text-white font-medium"
                  : "opacity-40 border-transparent text-stone-300 hover:opacity-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4">
          {filteredPhotos.map((photo, index) => {
            const rotationClass = rotations[index % rotations.length];

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className={`group cursor-pointer relative self-start h-fit bg-[#fdfdfc] p-3 pt-3 pb-5 md:p-4 md:pb-7 rounded-sm shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-105 hover:z-30 ${rotationClass}`}
                style={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)"
                }}
              >
                {/* Photo Image Frame */}
                <div className="relative w-full h-fit overflow-hidden bg-stone-200 border border-black/5">
                  <WatermarkedPhoto
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  
                  {/* Glossy Paper Shimmer Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                </div>

                {/* Handwritten Text Area */}
                <div className="mt-3 md:mt-4 text-center px-1">
                  <p className={`${caveat.className} text-stone-900 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight tracking-wide drop-shadow-sm`}>
                    {photo.title}, {photo.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}