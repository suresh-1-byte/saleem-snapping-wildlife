"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraScrollSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            // Play video when section comes into view
            video.play().catch((err) => console.log("Video play failed:", err));
            setHasPlayed(true);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of section is visible
    );

    observer.observe(section);

    // Reset hasPlayed when video ends
    const handleVideoEnd = () => {
      setHasPlayed(false);
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      observer.disconnect();
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [hasPlayed]);

  return (
    <div 
      ref={sectionRef}
      className="camera-scroll-section h-screen w-full bg-black relative overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/lens.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-cinzel font-bold tracking-wider mb-4 text-white drop-shadow-2xl text-center">
          THROUGH THE LENS
        </h2>
        <p className="text-lg md:text-xl font-playfair text-white/90 text-center max-w-2xl drop-shadow-lg">
          Every moment captured tells a story of wildlife in its natural beauty
        </p>
      </div>

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
        <span className="text-xs tracking-widest text-white uppercase">Continue</span>
      </div>
    </div>
  );
}
