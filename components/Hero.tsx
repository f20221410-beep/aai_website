"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import TextRoll from "./TextRoll";

export default function Hero() {
  const [isGlitching, setIsGlitching] = useState(true);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Resolve glitch after 1.2 seconds
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 1200);

    // Staggered load slide-in with spring using Framer Motion's useAnimate
    animate(
      scope.current,
      { opacity: [0, 1], y: [40, 0] },
      { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    );

    return () => clearTimeout(timer);
  }, [animate, scope]);

  // Animations config
  const imageVariants = {
    hidden: { scale: 1.12, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  } as const;

  const handleScrollDown = () => {
    const philosophySection = document.querySelector("#philosophy");
    if (philosophySection) {
      const offsetTop = philosophySection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-background overflow-hidden border-b border-rustBrown/20"
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-electricBlue/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Content Left */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 pt-28 md:pt-0 z-10 relative">
        <motion.div
          ref={scope}
          className="max-w-[650px] flex flex-col"
        >
          {/* Subtitle */}
          <span className="text-xs uppercase tracking-[0.2em] text-rustBrown font-bold mb-4 font-poppins">
            Bespoke Interior & Kitchen Design
          </span>

          {/* Mixed Typography Gen Z Glitch Title */}
          <h1 className="flex flex-col gap-1 tracking-tight leading-[1.05] mb-6 select-none">
            <span
              data-text="Space."
              className={`font-dmSerif italic text-electricBlue text-[clamp(60px,10vw,110px)] font-normal relative block ${
                isGlitching ? "glitch-active" : ""
              }`}
            >
              Space.
            </span>
            <span
              data-text="Crafted with intention."
              className={`font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-white font-bold relative block ${
                isGlitching ? "glitch-active" : ""
              }`}
            >
              Crafted with intention.
            </span>
          </h1>

          {/* Intro Description */}
          <p className="text-base text-cream/80 leading-relaxed font-poppins font-light max-w-[500px] mb-8">
            We curate architectural forms and premium materials to elevate contemporary physical spaces into authentic, cinematic living experiences.
          </p>

          {/* CTA wrapped in Magnetic */}
          <div>
            <Magnetic range={60}>
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const projectsSection = document.querySelector("#projects");
                  if (projectsSection) {
                    window.scrollTo({
                      top: projectsSection.getBoundingClientRect().top + window.scrollY - 80,
                      behavior: "smooth",
                    });
                  }
                }}
                whileHover="hover"
                initial="initial"
                className="relative inline-flex items-center justify-center px-8 py-4 bg-rustBrown text-white font-poppins font-semibold tracking-[0.2em] text-[11px] uppercase focus:outline-none overflow-hidden group shadow-lg hover:shadow-electricBlue/20 transition-shadow duration-300"
              >
                {/* Liquid background fill sliding up */}
                <motion.div
                  className="absolute inset-0 bg-electricBlue"
                  variants={{
                    initial: { scaleY: 0 },
                    hover: { scaleY: 1 },
                  }}
                  style={{ originY: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {/* Text Roll with white text on both states */}
                <span className="relative z-10">
                  <TextRoll text="Explore Portfolio" textColor="text-white" hoverColor="text-white" />
                </span>
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Scroll Indicator wrapped in Magnetic */}
        <div className="absolute bottom-8 left-6 sm:left-12 md:left-16 lg:left-24">
          <Magnetic range={50}>
            <motion.div
              onClick={handleScrollDown}
              whileHover="hover"
              initial="initial"
              className="flex items-center gap-3 cursor-pointer select-none text-cream/70"
            >
              <TextRoll text="Scroll down" textColor="text-cream/70" hoverColor="text-electricBlue" className="text-[11px] uppercase tracking-[0.2em] font-semibold font-poppins" />
              
              <motion.div
                variants={{
                  initial: { scale: 1, borderColor: "rgba(232, 221, 208, 0.2)", boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
                  hover: { scale: 1.15, borderColor: "#3B82F6", boxShadow: "0 0 12px 2px rgba(59, 130, 246, 0.4)" }
                }}
                transition={{ duration: 0.3 }}
                className="p-1 border rounded-full relative"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          </Magnetic>
        </div>
      </div>

      {/* Hero Image Right */}
      <div className="flex-1 relative w-full h-[50vh] md:h-full mt-10 md:mt-0 select-none">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop"
            alt="Cinematic Modern Living Room Interior Design"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-40 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
