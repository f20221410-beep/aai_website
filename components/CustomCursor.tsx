"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isViewHovered, setIsViewHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Framer Motion motion values for coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configurations for organic, fluid pointer tracking
  const springConfig = { damping: 40, stiffness: 450, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only execute if it's a device that supports fine pointer (mouse)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Spawn ripple shockwave
      setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };
    
    const handleMouseUp = () => setIsClicked(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect if element or its parent is an interactive link/button
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='expand']") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);

      // Check if hovering over project card or elements with data-cursor="view"
      const hasView = target.closest("[data-cursor='view']");
      setIsViewHovered(!!hasView);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  const cleanUpRipple = (id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Click concentric ripple shockwaves */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed w-4 h-4 border border-electricBlue/60 rounded-full pointer-events-none z-[99999] hidden md:block"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() => cleanUpRipple(ripple.id)}
        />
      ))}

      {/* Floating dynamic "VIEW" text inside the morphed cursor ring */}
      <AnimatePresence>
        {isViewHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed text-[8px] font-bold tracking-[0.25em] text-white font-poppins pointer-events-none select-none z-[100000] hidden md:block"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            VIEW
          </motion.span>
        )}
      </AnimatePresence>

      {/* Outer premium ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[40px] h-[40px] border rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.82 : isViewHovered ? 2.2 : isHovered ? 1.5 : 1,
          backgroundColor: isClicked
            ? "rgba(59, 130, 246, 0.25)"
            : isViewHovered
            ? "rgba(160, 82, 45, 0.2)" // translucent rustBrown overlay
            : isHovered
            ? "rgba(59, 130, 246, 0.15)"
            : "rgba(59, 130, 246, 0)",
          borderColor: isClicked
            ? "#3B82F6"
            : isViewHovered
            ? "#A0522D" // rustBrown on projects
            : isHovered
            ? "#A0522D"
            : "#3B82F6",
          borderWidth: isClicked ? "2px" : isHovered ? "1.5px" : "1px",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      />
      {/* Inner precise dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-electricBlue rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 1.4 : isViewHovered ? 0 : isHovered ? 0.3 : 1, // dot hides on view hover
          backgroundColor: isClicked ? "#3B82F6" : isHovered ? "#A0522D" : "#3B82F6",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />
    </>
  );
}
