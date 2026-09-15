export default function CameraScrollSection() {
  return (
    <div className="camera-scroll-section h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Camera Lens - Pure CSS, No GSAP */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer Ring - Rotates continuously */}
        <div className="absolute w-80 h-80 rounded-full border-4 border-white/20" />
        
        {/* Middle Ring - Rotates opposite direction */}
        <div className="absolute w-60 h-60 rounded-full border-4 border-white/30" />

        {/* Center Camera Icon */}
        <div className="absolute w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
          <div className="text-6xl">📷</div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute w-96 h-96 rounded-full border border-white/10" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
        <h2 className="text-4xl md:text-6xl font-cinzel font-bold tracking-wider mb-4 text-white drop-shadow-2xl text-center">
          THROUGH THE LENS
        </h2>
        <p className="text-lg md:text-xl font-playfair text-white/70 text-center max-w-2xl">
          Every moment captured tells a story of wildlife in its natural beauty
        </p>
      </div>

      {/* Simple vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.4) 100%)",
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
