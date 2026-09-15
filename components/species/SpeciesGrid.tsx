"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Species } from "@/lib/content";
import WatermarkedPhoto from "@/components/WatermarkedPhoto";

export default function SpeciesGrid({ species }: { species: Species[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const observedElement = ref.current;

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, []);

  return (
    <section ref={ref} className="section-spacing bg-neutral-950 py-16 text-white">
      <div className="container-padding max-w-7xl mx-auto">
        
        {/* Header Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4 text-stone-100">
            SPECIES INDEX
          </h2>
          <p className="text-stone-400 text-sm md:text-base tracking-widest font-light">
            A visual archive of wildlife encounters
          </p>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {species.map((entry, index) => (
            <Link
              key={entry.id}
              href={`/species/${entry.id}`}
              className={`group transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* 3D Metal Frame Outer Housing */}
              <div 
                className="relative p-3.5 md:p-4 rounded-xl bg-gradient-to-br from-slate-300 via-zinc-100 to-slate-500 shadow-[0_20px_40px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.7)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.95),inset_0_2px_6px_rgba(255,255,255,0.9)] group-hover:-translate-y-2 transition-all duration-500 ease-out"
              >
                {/* Frame Corner Rivets / Metallic Detail */}
                <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-600 shadow-inner opacity-80" />
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-600 shadow-inner opacity-80" />
                <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-600 shadow-inner opacity-80" />
                <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-600 shadow-inner opacity-80" />

                {/* Inner Beveled Photo Housing */}
                <div className="overflow-hidden rounded-md bg-black border border-black/80 shadow-[inset_0_0_12px_rgba(0,0,0,0.9)]">
                  
                  {/* Photo Image */}
                  <WatermarkedPhoto
                    src={entry.images[0]}
                    alt={entry.commonName}
                    className="transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-90"
                  />

                  {/* CAMERA VIEWFINDER HUD OVERLAY (Triggered on Mouse Hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-4 flex flex-col justify-between font-mono text-xs text-white/90 bg-black/20 backdrop-blur-[0.5px]">
                    
                    {/* Viewfinder Outer Corner Markings */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/80" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/80" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/80" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/80" />

                    {/* Camera Top HUD */}
                    <div className="flex justify-between items-center z-10">
                      <div className="flex items-center gap-2 bg-black/60 px-2 py-1 rounded border border-white/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block" />
                        <span className="text-red-500 font-bold tracking-wider text-[11px]">● REC</span>
                      </div>
                      <div className="bg-black/60 px-2 py-1 rounded border border-white/10 text-[10px] tracking-widest text-emerald-400">
                        4K RAW • 60FPS
                      </div>
                    </div>

                    {/* Center Camera Autofocus Reticle */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 border border-emerald-400/50 relative group-hover:scale-100 scale-125 transition-transform duration-300 ease-out">
                        {/* Target Crosshairs */}
                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400" />
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400" />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400" />
                        
                        {/* Center Target Dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                        </div>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-emerald-400/90 tracking-widest font-sans uppercase">
                          AF-C LOCKED
                        </span>
                      </div>
                    </div>

                    {/* Camera Bottom Telemetry HUD */}
                    <div className="flex justify-between items-end text-[11px] bg-black/70 backdrop-blur-md p-2 rounded-md border border-white/15 tracking-wider z-10">
                      <div className="space-y-0.5">
                        <span className="text-amber-400 font-bold block">ISO 400</span>
                        <span className="text-stone-200 block">f/2.8 &nbsp; 1/2000s</span>
                      </div>
                      <div className="text-right space-y-0.5">
                        <span className="text-cyan-400 block">+0.3 EV</span>
                        <span className="text-stone-400 text-[9px] block">WB 5600K</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Species Text Info Below Card */}
              <div className="mt-4 px-1">
                <h3 className="text-2xl font-light tracking-wide mb-1 text-stone-100 group-hover:text-amber-200 transition-colors duration-300">
                  {entry.commonName}
                </h3>
                <p className="text-sm italic text-stone-400 mb-2">{entry.scientificName}</p>
                <p className="text-sm text-stone-300 mb-1">{entry.locations.join(", ")}</p>
                <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">{entry.observation}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}