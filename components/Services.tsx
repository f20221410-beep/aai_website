"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

interface Service {
  index: string;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    index: "01",
    name: "Bespoke Kitchen Design",
    description: "Specialized modular kitchen engineering and layout choreography. We design custom modular cabinets, optimal cooking zones, and integrated storage to fit your space.",
  },
  {
    index: "02",
    name: "Custom Furniture & Wardrobes",
    description: "Bespoke wardrobes, integrated storage casings, and custom bedroom casework. Built by our team of carpenters using the newest standard materials and premium hardware.",
  },
  {
    index: "03",
    name: "Spatial Layouts & Drawings",
    description: "Detailed 2D space planning, utility choreography, cabinetry layouts, and execution blueprints. We translate ideas into precise structural drawings.",
  },
  {
    index: "04",
    name: "End-to-End Execution",
    description: "Complete execution from the initial layout blueprint to final on-site implementation. We manage the carpentry team to deliver finished residential casework.",
  },
];

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const offsetTop = contactSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-background border-b border-rustBrown/20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column: Fixed Title (Scroll relative) */}
        <div className="lg:w-1/3 flex flex-col z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-electricBlue font-bold mb-3 font-poppins">
            Specialized Craft
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-poppins leading-[1.1] mb-6">
            Bespoke Services.
          </h2>
          <p className="text-cream/80 text-sm sm:text-base font-poppins font-light leading-relaxed max-w-[320px]">
            From initial layouts and technical drawings to custom modular kitchen implementation, we offer a complete interior execution experience.
          </p>
        </div>

        {/* Right Column: Minimal List Style */}
        <div className="lg:w-2/3 flex flex-col relative">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              onClick={handleServiceClick}
              className="relative py-10 md:py-12 cursor-pointer flex flex-col md:flex-row gap-4 md:gap-12 justify-between items-start md:items-center group overflow-hidden"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
            >
              {/* Staggered Viewport-Entry Bottom Divider Line */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[1px] bg-rustBrown/20 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
              />

              {/* Left Side: Dedicated DM Serif Display Index Column */}
              <div className="flex items-center gap-6 shrink-0 z-10 relative">
                <span className="font-dmSerif italic text-3xl md:text-4xl text-electricBlue w-12 block select-none pointer-events-none">
                  {service.index}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-electricBlue font-poppins transition-colors duration-300">
                  {service.name}
                </h3>
              </div>

              {/* Right Side: Description & Functional Arrow */}
              <div className="flex items-center gap-6 max-w-[420px] ml-18 md:ml-0 z-10 relative">
                <p className="text-cream/85 text-xs md:text-sm font-poppins font-light leading-relaxed">
                  {service.description}
                </p>
                
                {/* Micro-interaction Arrow wrapped in Magnetic */}
                <div className="hidden md:block">
                  <Magnetic range={40}>
                    <motion.div
                      animate={{
                        x: hoveredIdx === idx ? 6 : 0,
                        color: hoveredIdx === idx ? "#3B82F6" : "#E8DDD0",
                        borderColor: hoveredIdx === idx ? "#3B82F6" : "rgba(232, 221, 208, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="p-2 border rounded-full transition-colors duration-300"
                    >
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </motion.div>
                  </Magnetic>
                </div>
              </div>

              {/* Animated Expand Underline on Hover (Primary Highlight) */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-electricBlue origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIdx === idx ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
