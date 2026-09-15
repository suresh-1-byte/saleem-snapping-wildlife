"use client";

import { motion } from "framer-motion";

export const LeafDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ rotate: -10, opacity: 0 }}
    whileInView={{ rotate: 10, opacity: 0.1 }}
    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
  >
    <path
      d="M12 2C7 2 3 6 3 11C3 15 5 18 8 20L12 22L16 20C19 18 21 15 21 11C21 6 17 2 12 2Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V12"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16L8 14"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12L16 10"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export const PawDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 0.1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    <path d="M12 20C15 20 18 18 18 15C18 12 15 11 12 11C9 11 6 12 6 15C6 18 9 20 12 20Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M7 10C8 10 9 8.5 9 7C9 5.5 8 4 7 4C6 4 5 5.5 5 7C5 8.5 6 10 7 10Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M12 9C13.5 9 14.5 7.5 14.5 6C14.5 4.5 13.5 3 12 3C10.5 3 9.5 4.5 9.5 6C9.5 7.5 10.5 9 12 9Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M17 10C18 10 19 8.5 19 7C19 5.5 18 4 17 4C16 4 15 5.5 15 7C15 8.5 16 10 17 10Z" stroke="currentColor" strokeWidth="1"/>
  </motion.svg>
);

export const BirdDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ x: -20, y: 10, opacity: 0 }}
    whileInView={{ x: 0, y: 0, opacity: 0.1 }}
    transition={{ duration: 2, ease: "easeOut" }}
  >
    <path d="M22 12C22 12 19 14 15 14C11 14 8 16 5 18C4 18 3 17 4 16C5 14 8 11 12 10C10 8 7 7 4 7C3 7 2 6 3 5C4 4 8 5 12 7C16 9 20 11 22 12Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </motion.svg>
);

export const TreeDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ scale: 0.9, y: 10, opacity: 0 }}
    whileInView={{ scale: 1, y: 0, opacity: 0.1 }}
    transition={{ duration: 2, ease: "easeOut" }}
  >
    <path d="M12 22V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8C12 8 8 10 6 12C4 14 3 16 5 16H12H19C21 16 20 14 18 12C16 10 12 8 12 8Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8C12 8 9 9 7 10C5 11 4 12 6 12H12H18C20 12 19 11 17 10C15 9 12 8 12 8Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8C12 8 10 8.5 8 9C6 9.5 5 10 7 10H12H17C19 10 18 9.5 16 9C14 8.5 12 8 12 8Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </motion.svg>
);

export const ButterDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ rotate: -15, opacity: 0 }}
    animate={{ 
      rotate: [- 15, 15, -15],
      y: [0, -10, 0],
      opacity: 0.1
    }}
    transition={{ 
      duration: 4, 
      ease: "easeInOut", 
      repeat: Infinity,
      repeatType: "loop"
    }}
  >
    <path d="M12 20V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="10" r="1" fill="currentColor"/>
    <path d="M6 12C4 10 3 7 4 5C5 3 7 3 9 4C10 5 11 7 11 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M13 9C13 7 14 5 15 4C17 3 19 3 20 5C21 7 20 10 18 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M6 14C4 16 3 19 4 21C5 23 7 23 9 22C10 21 11 19 11 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M13 17C13 19 14 21 15 22C17 23 19 23 20 21C21 19 20 16 18 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </motion.svg>
);

export const FeatherDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ rotate: 10, x: -10, opacity: 0 }}
    whileInView={{ rotate: -5, x: 0, opacity: 0.1 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
  >
    <path d="M20 4C20 4 15 6 12 8C9 10 6 14 4 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M12 8L10 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M14 9L12 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M16 7L14 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M10 12L8 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M8 14L6 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </motion.svg>
);

export const CameraDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 0.1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1"/>
    <path d="M8 8L9 5H15L16 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1"/>
    <circle cx="18" cy="10" r="0.5" fill="currentColor"/>
  </motion.svg>
);

export const MountainDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 0.1 }}
    transition={{ duration: 1.8, ease: "easeOut" }}
  >
    <path d="M3 20L8 10L12 15L16 8L21 20H3Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="6" r="2" stroke="currentColor" strokeWidth="1"/>
  </motion.svg>
);

export const BinocularsDoodle = ({ className = "" }: { className?: string }) => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`opacity-10 pointer-events-none ${className}`}
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 0.1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    <circle cx="7" cy="14" r="4" stroke="currentColor" strokeWidth="1"/>
    <circle cx="17" cy="14" r="4" stroke="currentColor" strokeWidth="1"/>
    <path d="M11 14H13" stroke="currentColor" strokeWidth="1"/>
    <path d="M5 10L7 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M19 10L17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </motion.svg>
);
