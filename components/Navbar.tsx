"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import TextRoll from "./TextRoll";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    opened: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    opened: { opacity: 1, x: 0 },
  } as const;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-b-[0.5px] border-electricBlue/15 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Magnetic range={50}>
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="text-xl md:text-2xl font-bold tracking-[0.1em] text-white font-poppins focus:outline-none"
            >
              AnaghaInteriors<span className="text-electricBlue">.</span>
            </a>
          </Magnetic>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Magnetic key={link.name} range={40}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  whileHover="hover"
                  initial="initial"
                  className="relative py-2 text-[11px] uppercase tracking-[0.2em] font-semibold font-poppins group focus:outline-none"
                >
                  <TextRoll text={link.name} />
                  {/* Modern Hover Underline */}
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-electricBlue origin-right scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100 group-hover:origin-left" />
                </motion.a>
              </Magnetic>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream hover:text-electricBlue focus:outline-none relative z-50 p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Full-screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center items-center md:hidden"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
          >
            {/* Soft decorative background glow */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-electricBlue/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-rustBrown/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col space-y-8 text-center relative z-10">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Magnetic range={50}>
                    <motion.a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      whileHover="hover"
                      initial="initial"
                      className="text-2xl font-bold tracking-[0.2em] font-poppins block py-2 px-6 uppercase focus:outline-none"
                    >
                      <TextRoll text={link.name} textColor="text-white" hoverColor="text-electricBlue" />
                    </motion.a>
                  </Magnetic>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer Meta */}
            <motion.div
              className="absolute bottom-12 text-center text-dimmed text-[10px] tracking-[0.25em] font-poppins uppercase"
              variants={itemVariants}
            >
              SPACE. CRAFTED WITH INTENTION.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
