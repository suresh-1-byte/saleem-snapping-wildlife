"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCloudinaryImages } from "@/lib/useCloudinaryImages";
import AnimatedSection from "@/components/AnimatedSection";
import { ButterDoodle, LeafDoodle } from "@/components/Doodles";
import AdaptiveWatermarkImage from "@/components/AdaptiveWatermarkImage";

const featuredSpans = [
  "col-span-1 sm:col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 sm:col-span-2 row-span-1",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

export default function FeaturedWork({ images }: { images: string[] }) {
  const featuredImages = images.map((src, index) => ({
    src,
    alt: `Featured wildlife photograph ${index + 1}`,
    span: featuredSpans[index] || "col-span-1 row-span-1",
  }));

  return (
    <section className="py-0 bg-black relative overflow-hidden">
      {/* Decorative Doodles */}
      <ButterDoodle className="absolute top-20 right-12 w-20 h-20 text-earthy-green/40 hidden lg:block" />
      <LeafDoodle className="absolute bottom-32 left-16 w-24 h-24 text-white/5 hidden xl:block" />
      
      <div className="container-padding">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider uppercase mb-4">
              Featured Work
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-earthy-green to-transparent mx-auto" />
          </div>
        </AnimatedSection>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
        >
          {featuredImages.map((image, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className={`${image.span} group`}
            >
              <Link
                href="/wildlife"
                className="relative overflow-hidden bg-charcoal block w-full h-full"
                style={{
                  minHeight: image.span.includes("row-span-2") ? "400px" : "250px",
                }}
              >
                {/* Image with enhanced hover effect */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AdaptiveWatermarkImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    imageClassName="object-cover"
                    watermarkClassName="w-16 md:w-20"
                  />
                </motion.div>
                
                {/* Overlay with gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-colors duration-500"
                  initial={false}
                />
                
                {/* View indicator */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                    className="flex items-center gap-2 text-white text-sm tracking-wider uppercase"
                  >
                    <span>View</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
