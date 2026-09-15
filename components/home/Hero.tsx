"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rye, Cormorant_Garamond } from "next/font/google";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-[580px] min-h-0 md:h-screen md:min-h-[700px] overflow-hidden flex items-center justify-center bg-[#151810]">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 12,
          ease: "linear",
        }}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <Image
          src="/images/hero%20pg.png"
          alt="Wildlife photographer capturing a moment in nature"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-[30%_center] sm:object-center"
        />

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Center darkness for typography */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_15%,rgba(0,0,0,0.28)_60%,rgba(0,0,0,0.7)_100%)]" />

        {/* Bottom darkness */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/70 to-transparent" />

        {/* Slight olive cinematic tint */}
        <div className="absolute inset-0 bg-[#4b5030]/10 mix-blend-color" />
      </motion.div>


      {/* =========================================================
          CONTENT
      ========================================================= */}

      <motion.main
        className="absolute right-0 bottom-4 md:bottom-10 z-10 w-full max-w-[1500px] px-3 sm:px-8 md:px-12 text-right"
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 30,
        }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        {/* =======================================================
            WILDLIFE
        ======================================================= */}

        <motion.div
          className="relative flex justify-end"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 0.96,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* WILDLIFE */}
          <span
            className={`
              ${rye.className}
              relative
              z-10
              inline-block
              uppercase
              text-[#eee5d0]
              leading-[0.78]
              tracking-[0.015em]
              text-[11vw]
              sm:text-[10vw]
              md:text-[13vw]
              lg:text-[11.5vw]
              xl:text-[11rem]
              2xl:text-[13rem]
              drop-shadow-[0_7px_12px_rgba(0,0,0,0.65)]
            `}
          >
            {/* W - Rye font (old/default) */}
            W
            {/* I - Cormorant font (new) */}
            <span className={cormorant.className}>I</span>
            {/* L - Cormorant font (new) */}
            <span className={cormorant.className}>L</span>
            {/* D - Rye font (old/default) */}
            D
            {/* L - Rye font (old/default) */}
            L
            {/* I - Cormorant font (new) */}
            <span className={cormorant.className}>I</span>
            {/* F - Cormorant font (new) */}
            <span className={cormorant.className}>F</span>
            {/* E - Rye font (old/default) */}
            E


            {/* FLYING BIRD */}
            <motion.svg
              viewBox="0 0 120 70"
              className="
                absolute
                left-[57%]
                -top-8
                sm:-top-10
                md:-top-12
                w-12
                sm:w-14
                md:w-16
                text-[#eee5d0]
              "
              fill="currentColor"
              animate={{
                y: [-2, 3, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path d="
                M8 39
                C28 20 42 20 58 34
                C74 20 91 20 112 39
                C92 33 78 35 60 46
                C42 35 27 33 8 39
                Z
              " />
            </motion.svg>
          </span>


        </motion.div>


        {/* =======================================================
            THROUGH MY
        ======================================================= */}

        <motion.div
          className="
            relative
            flex
            items-center
            justify-end
            gap-3
            sm:gap-5
            md:gap-7
            -mt-1
            md:-mt-2
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{
            duration: 0.9,
            delay: 0.8,
          }}
        >

          {/* LEFT LEAVES */}
          <svg
            viewBox="0 0 130 70"
            className="
              w-14
              sm:w-20
              md:w-24
              lg:w-28
              shrink-0
              text-[#a7aa70]
            "
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M125 35 C88 33 53 27 8 8" />

            <path d="M75 31 C73 19 65 10 51 7" />

            <path d="M96 34 C98 22 108 13 120 11" />

            <path d="M57 27 C48 37 36 43 21 42" />
          </svg>


          {/* THROUGH MY */}
          <span
            className={`
              ${cormorant.className}
              uppercase
              whitespace-nowrap
              font-semibold
              text-[#a7aa70]
              leading-none
              tracking-[0.13em]
              text-[5.8vw]
              sm:text-[5vw]
              md:text-[4.5vw]
              lg:text-[3.8rem]
              xl:text-[4.2rem]
              drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]
            `}
          >
            THROUGH MY
          </span>


          {/* RIGHT LEAVES */}
          <svg
            viewBox="0 0 130 70"
            className="
              w-14
              sm:w-20
              md:w-24
              lg:w-28
              shrink-0
              text-[#a7aa70]
              scale-x-[-1]
            "
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M125 35 C88 33 53 27 8 8" />

            <path d="M75 31 C73 19 65 10 51 7" />

            <path d="M96 34 C98 22 108 13 120 11" />

            <path d="M57 27 C48 37 36 43 21 42" />
          </svg>

        </motion.div>


        {/* =======================================================
            LENS
        ======================================================= */}

        <motion.div
          className="relative flex justify-end mt-1"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 0.96,
          }}
          transition={{
            duration: 1,
            delay: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <span
            className={`
              ${rye.className}
              relative
              inline-block
              uppercase
              text-[#eee5d0]
              leading-[0.78]
              tracking-[0.015em]
              text-[12vw]
              sm:text-[10vw]
              md:text-[13vw]
              lg:text-[11.5vw]
              xl:text-[11rem]
              2xl:text-[13rem]
              drop-shadow-[0_7px_12px_rgba(0,0,0,0.65)]
            `}
          >

            L


            {/* E */}
            <span className="relative inline-block">

              E

              {/* PAW PRINT */}
              <svg
                viewBox="0 0 100 100"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[30%]
                  h-[30%]
                  text-[#171b13]
                "
                fill="currentColor"
              >

                <ellipse
                  cx="50"
                  cy="63"
                  rx="19"
                  ry="15"
                />

                <ellipse
                  cx="27"
                  cy="37"
                  rx="9"
                  ry="12"
                  transform="rotate(-20 27 37)"
                />

                <ellipse
                  cx="43"
                  cy="28"
                  rx="9"
                  ry="12"
                  transform="rotate(-7 43 28)"
                />

                <ellipse
                  cx="60"
                  cy="28"
                  rx="9"
                  ry="12"
                  transform="rotate(7 60 28)"
                />

                <ellipse
                  cx="75"
                  cy="37"
                  rx="9"
                  ry="12"
                  transform="rotate(20 75 37)"
                />

              </svg>

            </span>


            NS.

          </span>

        </motion.div>


        {/* =======================================================
            SUBTITLE
        ======================================================= */}

        <motion.p
          className={`
            ${cormorant.className}
            mt-4
            sm:mt-5
            md:mt-9
            text-[#eee5d0]
            text-sm
            sm:text-base
            md:text-xl
            lg:text-[1.35rem]
            italic
            tracking-wide
            drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]
          `}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isLoaded ? 0.95 : 0,
            y: isLoaded ? 0 : 10,
          }}
          transition={{
            duration: 0.9,
            delay: 1.15,
          }}
        >
          Stories from the wild, captured one moment at a time.
        </motion.p>


        {/* =======================================================
            BUTTON
        ======================================================= */}

        <motion.div
          className="mt-4 md:mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            y: isLoaded ? 0 : 15,
          }}
          transition={{
            duration: 0.8,
            delay: 1.3,
          }}
        >

          <Link
            href="/wildlife"
            className="
              group
              relative
              inline-flex
              items-center
              gap-3
              overflow-hidden
              rounded-full
              border
              border-[#a7aa70]
              px-6
              md:px-10
              py-2.5
              md:py-3.5
              text-[#eee5d0]
              text-xs
              tracking-[0.18em]
              uppercase
              transition-all
              duration-500
              hover:text-[#151810]
            "
          >

            <span
              className="
                absolute
                inset-0
                bg-[#a7aa70]
                scale-x-0
                origin-left
                transition-transform
                duration-500
                group-hover:scale-x-100
              "
            />

            <span className="relative z-10">
              Explore Wildlife
            </span>

            <span
              className="
                relative
                z-10
                text-lg
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>

          </Link>

        </motion.div>

      </motion.main>


    </section>
  );
}