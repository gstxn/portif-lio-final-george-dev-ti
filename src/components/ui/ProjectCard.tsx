"use client";

import { Canvas } from "@react-three/fiber";
import { AbstractWaveShader } from "../3d/ProjectShaders";
import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  color?: string;
  githubLink?: string;
  liveLink?: string;
  curiosity?: string;
}

export default function ProjectCard({ title, category, description, color = "#ffffff", githubLink, liveLink, curiosity }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showCuriosity, setShowCuriosity] = useState(false);
  const beamControls = useAnimation();

  useEffect(() => {
    if (isHovered && !showCuriosity) {
      beamControls.start({
        x: ["-100%", "100%"],
        opacity: [0, 1, 1, 0],
        transition: { duration: 1.2, ease: "easeInOut" }
      });
    } else {
      // Instantly reset when not hovered
      beamControls.set({ x: "-100%", opacity: 0 });
    }
  }, [isHovered, beamControls, showCuriosity]);

  const isFiscal = title === "Fiscal Middleware";

  return (
    <motion.div
      className="relative group border bg-black overflow-hidden cursor-crosshair h-[400px] flex flex-col justify-end p-6"
      initial={{ borderColor: "#222222", boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }}
      whileHover={isFiscal ? {
        borderColor: "rgba(255, 51, 51, 0.15)",
        boxShadow: "0px 0px 30px 0px rgba(255, 51, 51, 0.1)",
        transition: { duration: 0.3 }
      } : isPipeline ? {
        borderColor: "rgba(0, 102, 255, 0.25)",
        transition: { duration: 0.3 }
      } : {
        borderColor: "rgba(100, 100, 100, 0.3)",
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowOptions(false); // Reset options when mouse leaves
        setShowCuriosity(false); // Reset curiosity when mouse leaves
      }}
    >
      {/* 3D Shader Background / Asset Container with Heartbeat & Hover Activation */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        initial={{ scale: 1, rotate: 0, opacity: 0.85, filter: "brightness(1)" }}
        animate={
          isHovered
            ? { scale: isPipeline ? 1.04 : 1.05, rotate: isPipeline ? 2 : 0, opacity: 1, filter: "brightness(1.2)", transition: { duration: isPipeline ? 0.6 : 0.4, ease: isPipeline ? [0.16, 1, 0.3, 1] : "easeOut" } }
            : isFiscal
              ? { scale: [1, 1.02, 1], rotate: 0, opacity: [0.85, 1, 0.85], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
              : { scale: 1, rotate: 0, opacity: 0.85 }
        }
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AbstractWaveShader color={color} />
        </Canvas>
      </motion.div>

      {/* Data Stream Laser Beam (Only for Fiscal Middleware) */}
      {isFiscal && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
            style={{
              background: "linear-gradient(135deg, transparent 45%, rgba(255,51,51,0.8) 48%, rgba(51,255,102,0.8) 52%, transparent 55%)",
              mixBlendMode: "screen",
            }}
            initial={{ x: "-100%", opacity: 0 }}
            animate={beamControls}
          />
        </div>
      )}

      {/* Glass overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

      {/* Curiosity Button */}
      {curiosity && (
        <button
          className="absolute top-4 right-4 z-40 text-gray-500 hover:text-white transition-colors p-2 rounded-full bg-black/50 border border-white/10 hover:border-white/30"
          onClick={(e) => {
            e.stopPropagation();
            setShowCuriosity(!showCuriosity);
          }}
          title="Ver Bastidores"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </button>
      )}

      {/* Curiosity Overlay */}
      <AnimatePresence>
        {showCuriosity && curiosity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Easter Egg: Por trás do visual
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {curiosity}
            </p>
            <button
              className="mt-6 self-start text-xs font-mono uppercase tracking-widest text-white border border-[#444] px-4 py-2 hover:bg-white hover:text-black transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowCuriosity(false);
              }}
            >
              Fechar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className={`relative z-20 transition-transform duration-500 group-hover:-translate-y-4 ${showCuriosity ? 'translate-y-32 opacity-0' : 'translate-y-2 opacity-100'}`}>
        <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
          {category}
        </p>
        <h3 className="text-2xl font-light text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {description}
        </p>

        {(githubLink || liveLink) ? (
          showOptions ? (
            <div className="flex gap-2 animate-in fade-in zoom-in duration-300">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center items-center gap-2 text-sm font-mono uppercase tracking-widest text-white border border-[#444] px-4 py-3 hover:bg-white hover:text-black transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
              )}
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center items-center gap-2 text-sm font-mono uppercase tracking-widest text-white border border-[#444] px-4 py-3 hover:bg-white hover:text-black transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </a>
              )}
            </div>
          ) : (
            <button
              className="inline-flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest text-white border border-[#444] px-6 py-3 hover:bg-white hover:text-black transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(true);
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              View Project
            </button>
          )
        ) : (
          <button
            className="flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest text-white border border-[#444] px-6 py-3 opacity-50 cursor-not-allowed"
            disabled
          >
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            Em Breve
          </button>
        )}
      </div>
    </motion.div>
  );
}
