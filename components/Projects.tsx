"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  gridClass: string;
  location: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "The Neoclassic Salon",
    category: "Living & Wall Architecture",
    imageUrl: "/projects/living-accent.jpg",
    gridClass: "md:col-span-2 h-[450px] lg:h-[500px]",
    location: "Assetz, T.C Palya",
  },
  {
    id: 2,
    title: "Minimalist Bicolor Wardrobe",
    category: "Bespoke Casing",
    imageUrl: "/projects/wardrobe-bicolor.jpg",
    gridClass: "md:col-span-1 h-[450px] lg:h-[500px]",
    location: "Sobha Pristine, Jakkur road",
  },
  {
    id: 3,
    title: "The Floating Study Portal",
    category: "Workspace Design",
    imageUrl: "/projects/study-floating.jpg",
    gridClass: "md:col-span-1 h-[450px] lg:h-[500px]",
    location: "Assetz, T.C Palya",
  },
  {
    id: 4,
    title: "The Teal Casework Suite",
    category: "Bespoke Kitchens",
    imageUrl: "/projects/kitchen-teal.jpg",
    gridClass: "md:col-span-2 h-[450px] lg:h-[500px]",
    location: "Gopalan Urban Woods, Mahadevpura",
  },
];

// Helper component for managing localized 3D Parallax Tilt for each Bento card
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values to track mouse coordinate offsets
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform coordinates to 3D rotation angles (limit tilt to 8 degrees max for elegance)
  const rotateXTransform = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateYTransform = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  // Spring relaxed configuration for buttery organic inertia
  const rotateX = useSpring(rotateXTransform, { damping: 25, stiffness: 200 });
  const rotateY = useSpring(rotateYTransform, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized cursor coordinates from the center of the card
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      data-cursor="view" // Triggers CustomCursor's VIEW badge reveal on hover
      className={`relative overflow-hidden group shadow-2xl border border-rustBrown/10 cursor-pointer rounded-sm ${project.gridClass}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Project Image (Slightly shifts opposite to create parallax depth) */}
      <motion.div
        className="w-full h-full relative"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{
          transformStyle: "preserve-3d",
          translateZ: -20, // push image back slightly
        }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </motion.div>

      {/* Dynamic Rust Brown Overlay (Floats forward inside 3D environment) */}
      <motion.div
        className="absolute inset-0 bg-rustBrown/95 flex flex-col justify-between p-10 md:p-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          translateZ: 30, // pull overlay details forward
        }}
      >
        {/* Top Corner Details */}
        <div className="flex justify-between items-start">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 font-poppins">
            {project.category}
          </span>
          <div className="p-2 border border-white/30 rounded-full text-white hover:bg-white hover:text-rustBrown transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Title & Reveal */}
        <div className="flex flex-col gap-2">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-white font-poppins"
            animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {project.title}
          </motion.h3>
          <motion.div
            className="flex flex-col gap-1"
            animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-xs text-white/70 font-poppins font-light italic">
              {project.location}
            </span>
            <span className="text-[10px] text-white/95 uppercase tracking-widest font-poppins font-semibold">
              View Project Case Study
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Standard subtle shadow overlay at the bottom for responsive visibility when not hovered */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent pointer-events-none md:opacity-0 group-hover:opacity-0 transition-opacity duration-300 z-0" />
      <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:hidden text-white pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-poppins">{project.category}</span>
        <h3 className="text-lg font-bold font-poppins">{project.title}</h3>
        <span className="text-[11px] text-white/70 font-poppins font-light italic mt-1">{project.location}</span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-surfaceAlt border-b border-rustBrown/20 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-electricBlue font-bold mb-3 font-poppins">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-poppins leading-[1.1] max-w-[500px]">
              Portraits of Contemporary Living.
            </h2>
          </div>
          <p className="text-cream/80 text-sm sm:text-base max-w-sm font-poppins font-light leading-relaxed">
            A carefully selected portfolio of high-end private residences, where tactile luxury meets geometric clarity.
          </p>
        </div>

        {/* Bento Grid Layout holding 3D Parallax TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
