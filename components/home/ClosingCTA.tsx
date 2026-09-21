"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCloudinaryImages } from "@/lib/useCloudinaryImages";
import AnimatedSection from "@/components/AnimatedSection";
import { BirdDoodle, FeatherDoodle, CameraDoodle } from "@/components/Doodles";

export default function ClosingCTA() {
  const { getImageUrl } = useCloudinaryImages();
  
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          src={getImageUrl("/images/closing-cta")}
          alt="Final cinematic wildlife image"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </motion.div>

      {/* Decorative Doodles */}
      <BirdDoodle className="absolute top-20 right-1/4 w-24 h-24 md:w-32 md:h-32 text-white z-10 hidden md:block" />
      <FeatherDoodle className="absolute bottom-24 left-1/4 w-20 h-20 text-white/60 z-10 hidden lg:block" />
      <CameraDoodle className="absolute top-1/3 left-12 w-16 h-16 text-white/40 z-10 hidden xl:block" />

      {/* Floating accent elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-white/30 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 4) * 15}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container-padding text-center">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 uppercase drop-shadow-2xl">
              Every Frame Has a Story.
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-earthy-green to-transparent mx-auto mb-8" />
          </motion.div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl font-light mb-12 max-w-2xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Explore more moments from the wild.
          </motion.p>
        </AnimatedSection>
        
        <AnimatedSection delay={0.4}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/wildlife"
              className="group relative inline-block px-12 py-5 bg-white text-black text-sm tracking-widest uppercase font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-earthy-green"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                View the Portfolio
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
