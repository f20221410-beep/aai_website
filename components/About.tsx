"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StatCounter from "./StatCounter";

export default function About() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalized client coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  return (
    <section id="about" className="w-full overflow-hidden border-b border-rustBrown/20 flex flex-col lg:flex-row bg-surface">
      {/* 60% Column: Full-height Editorial Visual with Floating Portal */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setCoords({ x: 0, y: 0 });
        }}
        className="w-full lg:w-3/5 h-[50vh] sm:h-[60vh] lg:h-[700px] relative select-none overflow-hidden cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="w-full h-full relative"
        >
          <motion.div
            animate={{
              scale: hovered ? 1.06 : 1,
              x: hovered ? coords.x * -25 : 0,
              y: hovered ? coords.y * -25 : 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
            className="w-full h-full relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop"
              alt="Interior design studio consultation desk"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
          {/* Subtle gradient to ease transition to the text container */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 pointer-events-none z-10" />
        </motion.div>
      </div>

      {/* 40% Column: Editorial Text Content with SurfaceAlt background */}
      <div className="w-full lg:w-2/5 bg-surfaceAlt flex flex-col justify-center px-8 sm:px-16 py-20 lg:py-0 border-l border-rustBrown/20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[440px] flex flex-col"
        >
          {/* Section Category */}
          <span className="text-xs uppercase tracking-[0.2em] text-electricBlue font-bold mb-4 font-poppins">
            About AnaghaInteriors
          </span>

          {/* Mixed Typography Section Title */}
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins leading-[1.15] mb-6">
            <span className="font-dmSerif italic text-electricBlue font-normal block">Elegance.</span>
            <span className="text-white block">Drawn from Silence.</span>
          </h2>

          {/* Body Content */}
          <p className="text-cream/80 text-sm sm:text-base font-poppins font-light leading-relaxed mb-6">
            At AnaghaInteriors, we design custom living sanctuaries. Our methodology is built on spatial flow, high-precision joinery, and absolute material integrity.
          </p>

          <p className="text-cream/70 text-xs sm:text-sm font-poppins font-light leading-relaxed mb-12">
            We work directly with our personal carpentry team and modular fabricators to execute custom residential spaces that are both visual masterpieces and comfortable living environments.
          </p>

          {/* Stat Counters Row */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-8 border-t border-rustBrown/20">
            <StatCounter value={15} suffix="+" label="Years" />
            <StatCounter value={100} suffix="+" label="Projects" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
