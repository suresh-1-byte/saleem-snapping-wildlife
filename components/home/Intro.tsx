"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { PawDoodle, TreeDoodle, MountainDoodle } from "@/components/Doodles";

export default function Intro() {
  return (
    <section className="section-spacing bg-[#0d0b09] text-[#e8dbc0] relative overflow-hidden py-24 md:py-32 border-y border-amber-950/40">
      
      {/* Vintage Paper Texture & Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#8b5e3c_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(15,10,5,0.8)] pointer-events-none" />

      {/* Camera Viewfinder / Field Journal Corner Crop Marks */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-800/30 pointer-events-none hidden md:block" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-800/30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-amber-800/30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-amber-800/30 pointer-events-none hidden md:block" />

      {/* Decorative Doodles (Styled with field journal colors) */}
      <PawDoodle className="absolute top-12 right-12 w-20 h-20 md:w-28 md:h-28 text-amber-900/20 rotate-[15deg] hidden lg:block select-none pointer-events-none" />
      <TreeDoodle className="absolute bottom-12 left-10 w-20 h-20 md:w-24 md:h-24 text-amber-900/20 hidden md:block select-none pointer-events-none" />
      <MountainDoodle className="absolute top-1/2 left-12 w-20 h-20 text-amber-900/15 -translate-y-1/2 hidden xl:block select-none pointer-events-none" />
      
      <div className="container-padding max-w-3xl mx-auto text-center relative z-10 px-6">
        
        {/* Archival Classification Header */}
        <AnimatedSection>
          <div className="inline-block mb-4 px-3 py-1 border border-amber-900/40 rounded-xs bg-[#171310]/80 backdrop-blur-xs">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-700/90 font-semibold">
              FIELD INTRO • ARCHIVE REF // 001
            </span>
          </div>
        </AnimatedSection>

        {/* Main Title with Serif Playfair/Journal Styling */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold italic tracking-tight mb-8 text-[#f4ebd0] leading-tight drop-shadow-md">
            Welcome to My Wild World.
          </h2>
        </AnimatedSection>
        
        {/* Narrative Description Block */}
        <AnimatedSection delay={0.25}>
          <div className="relative max-w-2xl mx-auto bg-[#16120f]/60 border border-amber-950/60 p-6 sm:p-8 rounded-xs shadow-xl backdrop-blur-xs">
            
            {/* Subtle corner tape look */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-amber-100/10 border border-amber-300/20 backdrop-blur-[1px] rotate-[-1deg]" />

            <p className="text-base sm:text-lg md:text-xl font-serif leading-relaxed text-[#d4c5a9] italic">
              &ldquo;Wildlife photography is my way of slowing down, observing, and documenting the moments that make the natural world unforgettable.&rdquo;
            </p>

            {/* Divider Line */}
            <div className="mt-6 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-amber-700/60 to-transparent" />
            
            <div className="mt-4 font-mono text-[11px] tracking-widest text-amber-800/80 uppercase">
              — Saleem Snapping, Field Naturalist & Observer
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}