"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, CheckCircle } from "lucide-react";
import Magnetic from "./Magnetic";
import TextRoll from "./TextRoll";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("user_name") as string;
    const email = formData.get("user_email") as string;
    const message = formData.get("user_message") as string;

    const subject = encodeURIComponent(`AnaghaInteriors Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Open user's email client
    window.location.href = `mailto:anaghainteriors@yahoo.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-surfaceAlt text-cream relative overflow-hidden select-none border-b border-rustBrown/20">
      {/* Decorative background visual elements */}
      <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-electricBlue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[350px] h-[350px] bg-rustBrown/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        {/* Left Column: Direct Contact & Social Links */}
        <div className="lg:w-1/3 flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-electricBlue font-bold mb-4 font-poppins">
              Start a Project
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-poppins leading-[1.1] mb-8">
              <span className="font-dmSerif italic text-electricBlue font-normal block mb-1">Let&apos;s Design</span>
              <span className="font-poppins text-white block">Your Home.</span>
            </h2>
            <p className="text-cream/80 text-sm sm:text-base font-poppins font-light leading-relaxed mb-12 max-w-sm">
              Whether you are looking to engineer a custom modular kitchen, design modular wardrobes, or plan your complete home casework, let&apos;s collaborate to bring it to life.
            </p>

            {/* Direct Details */}
            <div className="flex flex-col gap-6">
              <motion.a
                href="mailto:anaghainteriors@yahoo.com"
                whileHover="hover"
                initial="initial"
                className="flex items-center gap-4 text-sm text-cream font-poppins font-light focus:outline-none relative group cursor-pointer"
              >
                <motion.span
                  variants={{
                    initial: { scale: 1, rotate: 0, borderColor: "rgba(160, 82, 45, 0.2)", backgroundColor: "transparent" },
                    hover: { scale: 1.15, rotate: 15, borderColor: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.05)" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="p-3 border rounded-full transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-electricBlue" />
                </motion.span>
                <span className="relative py-1">
                  anaghainteriors@yahoo.com
                  {/* Modern Underline Reveal */}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-electricBlue origin-right scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100 group-hover:origin-left" />
                </span>
              </motion.a>

              <motion.a
                href="tel:+919900176700"
                whileHover="hover"
                initial="initial"
                className="flex items-center gap-4 text-sm text-cream font-poppins font-light focus:outline-none relative group cursor-pointer"
              >
                <motion.span
                  variants={{
                    initial: { scale: 1, rotate: 0, borderColor: "rgba(160, 82, 45, 0.2)", backgroundColor: "transparent" },
                    hover: { scale: 1.15, rotate: 15, borderColor: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.05)" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="p-3 border rounded-full transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-electricBlue" />
                </motion.span>
                <span className="relative py-1">
                  +91 99001 76700
                  {/* Modern Underline Reveal */}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-electricBlue origin-right scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100 group-hover:origin-left" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Right Column: HTML Contact Form */}
        <div className="lg:w-2/3 bg-background/50 border border-rustBrown/20 backdrop-blur-md p-8 sm:p-14 rounded-sm shadow-2xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                {/* Name Field (Minimal Floating Label) */}
                <div className="relative z-0 w-full mb-8 group">
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    className="block py-3 px-0 w-full text-sm text-white bg-transparent border-b border-rustBrown/20 appearance-none focus:outline-none focus:ring-0 focus:border-electricBlue peer transition-colors duration-300 font-poppins"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="user_name"
                    className="absolute text-sm text-cream/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-electricBlue font-poppins font-light tracking-wide transition-all"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative z-0 w-full mb-8 group">
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    className="block py-3 px-0 w-full text-sm text-white bg-transparent border-b border-rustBrown/20 appearance-none focus:outline-none focus:ring-0 focus:border-electricBlue peer transition-colors duration-300 font-poppins"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="user_email"
                    className="absolute text-sm text-cream/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-electricBlue font-poppins font-light tracking-wide transition-all"
                  >
                    Email Address
                  </label>
                </div>

                {/* Message Field */}
                <div className="relative z-0 w-full mb-10 group">
                  <textarea
                    name="user_message"
                    id="user_message"
                    rows={4}
                    className="block py-3 px-0 w-full text-sm text-white bg-transparent border-b border-rustBrown/20 appearance-none focus:outline-none focus:ring-0 focus:border-electricBlue peer transition-colors duration-300 resize-none font-poppins"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="user_message"
                    className="absolute text-sm text-cream/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-electricBlue font-poppins font-light tracking-wide transition-all"
                  >
                    Tell us about your project
                  </label>
                </div>

                {/* Submit button with magnetic wrapper */}
                <div className="flex justify-start">
                  <Magnetic range={50}>
                    <motion.button
                      type="submit"
                      whileHover="hover"
                      initial="initial"
                      className="relative w-full sm:w-auto px-10 py-4 bg-rustBrown text-white font-poppins font-semibold tracking-[0.2em] text-[11px] uppercase focus:outline-none overflow-hidden group shadow-lg hover:shadow-electricBlue/20 transition-shadow duration-300 cursor-pointer"
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

                      {/* Text roll wrapper */}
                      <span className="relative z-10">
                        <TextRoll text="Submit Inquiry" textColor="text-white" hoverColor="text-white" />
                      </span>
                    </motion.button>
                  </Magnetic>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                  className="mb-6 p-4 bg-electricBlue/10 rounded-full"
                >
                  <CheckCircle className="w-16 h-16 text-electricBlue" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-4">
                  Inquiry Received.
                </h3>
                <p className="text-cream/80 text-sm sm:text-base font-poppins font-light max-w-md leading-relaxed mb-6">
                  Thank you for reaching out. A lead spatial planner from our studio will contact you within 24 hours to schedule a private consultation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-electricBlue hover:text-white font-poppins font-bold underline transition-colors duration-300 focus:outline-none"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
