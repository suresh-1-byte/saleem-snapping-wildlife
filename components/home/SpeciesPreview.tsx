"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { PawDoodle, BinocularsDoodle } from "@/components/Doodles";
import AdaptiveWatermarkImage from "@/components/AdaptiveWatermarkImage";

const speciesCategories = [
  { name: "Birds", href: "/wildlife?category=birds", image: "/images/species-birds.jpg" },
  { name: "Mammals", href: "/wildlife?category=mammals", image: "/images/species-mammals.jpg" },
  { name: "Macro", href: "/wildlife?category=macro", image: "/images/species-macro.jpg" },
  { name: "Landscapes", href: "/wildlife?category=landscapes", image: "/images/species-landscapes.jpg" },
  { name: "Wildlife Moments", href: "/wildlife?category=moments", image: "/images/species-moments.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

export default function SpeciesPreview() {
  return (
    <section className="section-spacing bg-black relative overflow-hidden">
      {/* Decorative Doodles */}
      <PawDoodle className="absolute top-16 left-12 w-24 h-24 text-white/5 hidden xl:block" />
      <BinocularsDoodle className="absolute bottom-20 right-16 w-20 h-20 text-earthy-green/30 hidden lg:block" />
      
      <div className="container-padding">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider uppercase mb-4">
              Explore by Category
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-earthy-green to-transparent mx-auto" />
          </div>
        </AnimatedSection>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto"
        >
          {speciesCategories.map((category, index) => (
            <motion.div 
              key={category.name} 
              variants={itemVariants}
              className="group"
            >
              <Link
                href={category.href}
                className="relative aspect-square overflow-hidden block"
              >
                {/* Image container with zoom effect */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AdaptiveWatermarkImage
                    src={category.image}
                    alt={category.name}
                    fill
                    imageClassName="object-cover"
                    watermarkClassName="w-12 md:w-16"
                  />
                </motion.div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/40" />
                
                {/* Border effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
                
                {/* Text label with slide-up effect */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm sm:text-base tracking-wider uppercase font-medium block mb-1">
                      {category.name}
                    </span>
                    <motion.div
                      className="w-8 h-px bg-white mx-auto opacity-0 group-hover:opacity-100"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
                
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/0 group-hover:border-white/50 transition-all duration-300" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/0 group-hover:border-white/50 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
