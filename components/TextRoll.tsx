"use client";

import { motion } from "framer-motion";

interface TextRollProps {
  text: string;
  className?: string;
  textColor?: string;
  hoverColor?: string;
}

export default function TextRoll({
  text,
  className = "",
  textColor = "text-cream",
  hoverColor = "text-electricBlue",
}: TextRollProps) {
  const chars = text.split("");

  const letterVariants = {
    initial: { y: 0 },
    hover: { y: "-100%" },
  };

  const letterVariants2 = {
    initial: { y: "100%" },
    hover: { y: 0 },
  };

  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      {/* Initial display string */}
      <span className={`flex transition-colors duration-300 ${textColor}`}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1], // ultra-smooth spring-like cubic-bezier
              delay: i * 0.02,
            }}
            className="inline-block relative"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Hover display string (stacked beneath via absolute) */}
      <span className={`absolute inset-0 flex ${hoverColor}`}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants2}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.02,
            }}
            className="inline-block relative"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
