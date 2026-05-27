"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const philosophyCards = [
  {
    num: "01",
    title: "Materiality",
    desc: "We prioritize honest, textural components. Premium milled wood, modern laminate finishes, and custom textures speak directly to the human sensory experience.",
  },
  {
    num: "02",
    title: "Proportion",
    desc: "Symmetry, volume, and balance form our structural bedrock. Every residential space is custom-tailored to create visual calm, fluid flow, and daily comfort.",
  },
  {
    num: "03",
    title: "Bespoke Carpentry",
    desc: "We work directly with a dedicated team of personal carpenters. By handling the woodwork in-house, we guarantee high-precision casework, modular joinery, and excellent execution.",
  },
];

interface CardProps {
  card: {
    num: string;
    title: string;
    desc: string;
  };
  isDesktop?: boolean;
}

function PhilosophyCard({ card, isDesktop = false }: CardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const desktopClasses =
    "w-[420px] h-[480px] bg-surfaceAlt shrink-0 p-12 flex flex-col justify-between border shadow-2xl relative group overflow-hidden select-none cursor-pointer";
  const mobileClasses =
    "bg-surfaceAlt p-10 flex flex-col justify-between h-[360px] border shadow-xl relative group overflow-hidden select-none cursor-pointer";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { borderColor: "rgba(160, 82, 45, 0.2)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" },
        hover: { borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.2)" },
      }}
      transition={{ duration: 0.4 }}
      className={isDesktop ? desktopClasses : mobileClasses}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />

      {/* Large Ghost Index Number behind card content */}
      <motion.span
        variants={{
          initial: { scale: 1, rotate: 0, color: "rgba(59, 130, 246, 0.08)" },
          hover: { scale: 1.15, rotate: -6, color: "rgba(59, 130, 246, 0.18)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`absolute font-poppins font-bold leading-none select-none pointer-events-none z-0 ${
          isDesktop ? "right-6 top-6 text-[10vw]" : "right-4 top-2 text-[12vw] sm:text-[10vw]"
        }`}
      >
        {card.num}
      </motion.span>

      <div className="flex justify-between items-start z-10 relative">
        <span className="text-xs font-bold tracking-[0.2em] text-rustBrown font-poppins">
          APPROACH
        </span>
      </div>

      <div className={`flex flex-col z-10 relative ${isDesktop ? "gap-4" : "gap-3"}`}>
        <h3 className={`${isDesktop ? "text-3xl" : "text-2xl"} font-bold text-white font-poppins`}>
          {card.title}
        </h3>
        <p className={`text-cream/85 leading-relaxed font-poppins font-light ${isDesktop ? "text-sm" : "text-xs"}`}>
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <>
      {/* DESKTOP HORIZONTAL SCROLL SCENE (lg screen sizes and above) */}
      <div ref={targetRef} className="hidden lg:block relative h-[250vh] bg-surface border-b border-rustBrown/20">
        <div id="philosophy" className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Static Title/Intro Left Side */}
          <div className="absolute left-0 top-0 bottom-0 w-[35vw] flex flex-col justify-center pl-16 xl:pl-24 bg-gradient-to-r from-surface via-surface/95 to-transparent z-10">
            <span className="text-xs uppercase tracking-[0.2em] text-electricBlue font-bold mb-4 font-poppins">
              The Core Approach
            </span>
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight font-poppins mb-6">
              <span className="font-dmSerif italic text-electricBlue font-normal block">Space.</span>
              <span className="text-white font-poppins block">Shaped by Philosophy.</span>
            </h2>
            <p className="text-cream/80 text-sm xl:text-base max-w-[320px] leading-relaxed font-poppins font-light">
              We believe a home is a living gallery. Every detail is curated to enhance and echo human behavior.
            </p>
          </div>

          {/* Sliding Cards Belt */}
          <motion.div style={{ x }} className="flex gap-8 pl-[38vw] pr-24">
            {philosophyCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="shrink-0"
              >
                <PhilosophyCard card={card} isDesktop={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MOBILE & TABLET STACKED SCENE (Falls back to vertical grid on smaller screens) */}
      <section
        id="philosophy-mobile"
        className="lg:hidden py-24 px-6 sm:px-12 bg-surface border-b border-rustBrown/20"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-electricBlue font-bold mb-3 font-poppins">
              The Core Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="font-dmSerif italic text-electricBlue font-normal">Space. </span>
              <span className="text-white font-poppins font-bold">Shaped by Philosophy.</span>
            </h2>
            <p className="text-cream/80 text-sm sm:text-base mt-4 font-poppins font-light max-w-lg">
              We believe a home is a living gallery. Every detail is curated to enhance and echo human behavior.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {philosophyCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <PhilosophyCard card={card} isDesktop={false} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
