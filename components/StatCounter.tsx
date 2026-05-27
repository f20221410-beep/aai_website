"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Premium quadratic ease-out curve
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      whileHover="hover"
      initial="initial"
      className="flex flex-col gap-2 select-none cursor-pointer group"
    >
      <motion.span
        variants={{
          initial: { scale: 1, textShadow: "0 0 0px rgba(59, 130, 246, 0)" },
          hover: { scale: 1.08, textShadow: "0 0 15px rgba(59, 130, 246, 0.6)" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins tabular-nums inline-block origin-left"
      >
        {count}
        <span className="text-electricBlue font-light">{suffix}</span>
      </motion.span>
      <motion.span
        variants={{
          initial: { x: 0, color: "rgba(232, 221, 208, 0.75)" },
          hover: { x: 4, color: "#3B82F6" },
        }}
        transition={{ duration: 0.3 }}
        className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold font-poppins"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
