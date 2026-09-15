import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About | Saleem Snapping",
  description: "Wildlife photographer from Chennai, India, documenting the quiet moments that often go unnoticed in the wild.",
  openGraph: {
    title: "About | Saleem Snapping",
    description: "Wildlife photographer from Chennai, India, documenting the quiet moments that often go unnoticed in the wild.",
  },
};

/* Wildlife Curved Paw Print Trail Background SVG */
function PawTrailBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 800"
      fill="none"
    >
      {/* Curved Safari Path Guide */}
      <path
        d="M -50,650 C 250,600 350,350 500,380 C 650,410 750,150 1050,100"
        stroke="rgba(212, 163, 115, 0.25)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />

      {/* Lion Paw Prints along the Path */}
      <g fill="currentColor" className="text-[#d4a373]">
        {/* Paw 1 */}
        <g transform="translate(100, 620) rotate(-15) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 2 */}
        <g transform="translate(190, 560) rotate(-25) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 3 */}
        <g transform="translate(280, 470) rotate(-35) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 4 */}
        <g transform="translate(380, 395) rotate(-10) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 5 */}
        <g transform="translate(480, 380) rotate(15) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 6 */}
        <g transform="translate(590, 350) rotate(-20) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 7 */}
        <g transform="translate(690, 260) rotate(-40) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
        {/* Paw 8 */}
        <g transform="translate(800, 170) rotate(-30) scale(0.65)">
          <ellipse cx="20" cy="25" rx="11" ry="9" />
          <circle cx="8" cy="8" r="3.5" />
          <circle cx="17" cy="4" r="3.5" />
          <circle cx="27" cy="5" r="3.5" />
          <circle cx="34" cy="11" r="3.5" />
        </g>
      </g>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0d1611] text-[#f4f1ea] relative overflow-hidden min-h-screen">
      {/* Background Glows for Forest Depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2d4a3e]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#523d2e]/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Wildlife Paw Print Curved Trail */}
      <PawTrailBackground />

      <div className="container-padding relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Page Header */}
        <AnimatedSection>
          <div className="mb-16">
            <span className="text-[#a3b18a] text-xs md:text-sm tracking-[0.3em] uppercase font-mono mb-3 block">
              Wildlife Photographer &amp; Visual Storyteller
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-widest text-[#f4f1ea] uppercase">
              ABOUT SALEEM SNAPPING
            </h1>
            {/* Multi-toned Natural Gradient Divider */}
            <div className="w-28 h-[3px] bg-gradient-to-r from-[#a3b18a] via-[#d4a373] to-transparent mt-6 rounded-full" />
          </div>
        </AnimatedSection>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-8 text-base md:text-lg leading-relaxed text-[#d1ccc0] font-light">
            <AnimatedSection delay={0.1}>
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#d4a373]">
                I&apos;m Saleem, a wildlife photographer based in Chennai, India.
                Through my lens, I document birds, mammals, landscapes, and the
                quiet, untamed moments that often go unnoticed in the wild.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p>
                For me, wildlife photography is far more than pressing a shutter button.
                It is an exercise in patience, silent observation, and respecting nature 
                by being fully present when a fleeting instinct transforms into a story.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="border-l-2 border-[#a3b18a]/60 pl-4 text-[#e2ded2]">
                This visual archive is a collection of those encounters—from the misty canopy of 
                the Western Ghats to the coastal wetlands and sanctuary reserves of South India.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="pt-4 border-l-2 border-[#c87d55] pl-6 italic font-serif text-xl md:text-2xl text-[#f4f1ea] bg-[#17241c]/50 py-3 pr-4 rounded-r-lg">
                &ldquo;Every frame carries a whisper of the wild. This is mine.&rdquo;
              </div>
              <div className="mt-4 flex justify-end pr-2">
                <Image
                  src="/images/watermark.png"
                  alt="Saleem Snapping signature"
                  width={240}
                  height={96}
                  className="w-40 md:w-52 h-auto object-contain"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Dynamic Auto-Adjusting Gallery Frame */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <AnimatedSection delay={0.2} className="w-full">
              {/* Outer Earthy Wood & Forest Frame Outer Container */}
              <div className="relative inline-block w-full h-auto p-4 md:p-5 rounded-md bg-gradient-to-br from-[#1d2d24] via-[#142019] to-[#0c140e] border border-[#3e5245]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
                
                {/* Terracotta/Copper Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c87d55] pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c87d55] pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c87d55] pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c87d55] pointer-events-none" />

                {/* Inner Forest Matting & Canvas Border (Auto-resizes to image proportions) */}
                <div className="relative w-full h-auto overflow-hidden rounded-sm border border-[#0d1611] bg-[#0c140e] p-2 shadow-inner">
                  
                  <div className="relative w-full h-auto overflow-hidden rounded-sm">
                    {/* Image automatically scales and adjusts frame height based on source aspect ratio */}
                    <Image
                      src="/images/about-portrait.jpg"
                      alt="Saleem Snapping - Wildlife Photographer"
                      width={800}
                      height={1000}
                      priority
                      className="w-full h-auto object-contain transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                    />

                    {/* Warm Sunset Canopy Glow Overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-[#c87d55]/15 via-transparent to-[#a3b18a]/15" />
                  </div>

                </div>

              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  );
}