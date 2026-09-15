"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Story } from "@/lib/content";
import WatermarkedPhoto from "@/components/WatermarkedPhoto";

export default function StoriesGrid({ stories }: { stories: Story[] }) {
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
    <section ref={ref} className="section-spacing bg-black">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto space-y-12">
          {stories.map((story, index) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className={`group block transition-all duration-700 animation-smooth ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              } border border-white/10 bg-charcoal/25 p-4 md:p-6 lg:p-8 hover:border-earthy-green/50`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden bg-charcoal border border-white/10">
                    <WatermarkedPhoto
                      src={story.images[0]}
                      alt={story.title}
                      className="transition-transform duration-700 animation-smooth group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="text-xs tracking-widest uppercase opacity-60 mb-4">
                    {story.location} • {story.date}
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6 group-hover:opacity-70 transition-opacity duration-300">
                    {story.title}
                  </h2>
                  <p className="text-lg opacity-80 leading-relaxed mb-6">
                    {story.introduction}
                  </p>
                  <span className="inline-block text-sm tracking-wider uppercase border-b border-white pb-1 group-hover:opacity-70 transition-opacity duration-300">
                    Read Story
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
