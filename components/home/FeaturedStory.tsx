"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { LeafDoodle, FeatherDoodle } from "@/components/Doodles";
import AdaptiveWatermarkImage from "@/components/AdaptiveWatermarkImage";
import type { Story } from "@/lib/content";

export default function FeaturedStory({ story }: { story?: Story }) {
  const featuredStory = story ?? {
    id: "featured-story",
    title: "A Morning at Vedanthangal",
    location: "Vedanthangal, Tamil Nadu",
    date: "",
    introduction: "Dawn breaks over the wetlands, and thousands of wings take flight.",
    content: "",
    heroImage: "/images/story-hero.jpg",
    images: ["/images/story-hero.jpg", "/images/story-support-1.jpg", "/images/story-support-2.jpg"],
    species: [],
  } satisfies Story;
  return (
    <section className="section-spacing bg-charcoal relative overflow-hidden">
      {/* Decorative Doodles */}
      <LeafDoodle className="absolute bottom-20 left-10 w-20 h-20 md:w-24 md:h-24 text-earthy-green-light hidden lg:block" />
      <FeatherDoodle className="absolute top-16 right-20 w-20 h-20 text-white/5 hidden xl:block" />
      
      <div className="container-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image with sophisticated reveal */}
          <AnimatedSection>
            <motion.div 
              className="relative w-full aspect-[21/9] mb-8 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                <AdaptiveWatermarkImage
                  src={featuredStory.images[0]}
                  alt={featuredStory.title}
                  fill
                  imageClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  watermarkClassName="w-20 md:w-28"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
              </motion.div>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20" />
            </motion.div>
          </AnimatedSection>

          {/* Story Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8">
            <AnimatedSection delay={0.2}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-4">
                  <span className="text-xs tracking-widest text-earthy-green uppercase">Featured Story</span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-6 uppercase">
                  {featuredStory.title}
                </h3>
                <div className="w-12 h-px bg-earthy-green mb-6" />
                <p className="text-base md:text-lg opacity-85 leading-relaxed mb-8">
                  {featuredStory.introduction}
                </p>
                <Link
                  href="/stories"
                  className="group inline-flex items-center gap-3 px-8 py-3 border border-white text-sm tracking-widest uppercase hover:bg-white hover:text-charcoal transition-all duration-300 animation-smooth"
                >
                  <span>Read Story</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatedSection>

            {/* Supporting Images with stagger */}
            <AnimatedSection delay={0.3}>
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                {featuredStory.images.slice(1, 3).map((img, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-[4/5] overflow-hidden group"
                  >
                    <AdaptiveWatermarkImage
                      src={img}
                      alt={`${featuredStory.title} supporting image ${idx + 1}`}
                      fill
                      imageClassName="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      watermarkClassName="w-12 md:w-16"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
