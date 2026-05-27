"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import TextRoll from "./TextRoll";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-background py-16 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-rustBrown/20 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Segment: Logo & Nav Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-rustBrown/20">
          {/* Logo */}
          <Magnetic range={40}>
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="text-xl font-bold tracking-[0.1em] text-white font-poppins focus:outline-none"
            >
              AnaghaInteriors<span className="text-electricBlue">.</span>
            </a>
          </Magnetic>

          {/* Minimal Links List */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {footerLinks.map((link) => (
              <Magnetic key={link.name} range={30}>
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  whileHover="hover"
                  initial="initial"
                  className="text-[11px] uppercase tracking-[0.2em] font-poppins font-semibold focus:outline-none cursor-pointer"
                >
                  <TextRoll text={link.name} />
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Bottom Segment: Copyright & Editorial Meta */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-cream/50 text-[10px] md:text-xs tracking-wider font-poppins">
          <div>
            &copy; {new Date().getFullYear()} AnaghaInteriors. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
