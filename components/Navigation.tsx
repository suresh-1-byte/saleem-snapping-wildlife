"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Wildlife", href: "/wildlife" },
  { name: "Stories", href: "/stories" },
  { name: "Species", href: "/species" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animation-smooth ${
          isScrolled ? "bg-black/95 backdrop-blur-lg shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="container-padding">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo with animation */}
            <Link
              href="/"
              className="group flex items-center gap-3 text-sm lg:text-base font-medium tracking-[0.18em] hover:opacity-70 transition-opacity duration-300"
            >
              <Image
                src="/images/watermark.png"
                alt="Saleem Snapping logo"
                width={180}
                height={72}
                className="w-20 sm:w-24 lg:w-28 h-auto object-contain"
              />
              <motion.span
                className="inline-block font-serif"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                SALEEM SNAPPING
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 font-serif">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`group text-sm tracking-wide transition-all duration-300 hover:opacity-100 relative inline-block ${
                      pathname === item.href ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {item.name}
                    {/* Underline animation */}
                    <span className={`absolute -bottom-1 left-0 h-px bg-earthy-green transition-all duration-300 ${
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button with enhanced animation */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 relative z-50"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="w-6 h-px bg-white"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="w-6 h-px bg-white"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? -10 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-px bg-white"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Background overlay */}
            <motion.div 
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: "20%",
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
            
            {/* Menu items */}
            <div className="relative h-full flex flex-col items-center justify-center space-y-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group text-2xl sm:text-3xl tracking-wider transition-all duration-300 hover:opacity-100 relative inline-block ${
                      pathname === item.href ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {item.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-earthy-green"
                      initial={{ width: pathname === item.href ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xs tracking-widest text-white/50 uppercase mt-8"
              >
                Wildlife Photography • Chennai, India
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
