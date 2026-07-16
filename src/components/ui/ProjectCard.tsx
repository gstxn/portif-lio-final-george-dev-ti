"use client";

import { Canvas } from "@react-three/fiber";
import { AbstractWaveShader } from "../3d/ProjectShaders";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  color?: string;
}

export default function ProjectCard({ title, category, description, color = "#ffffff" }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group border border-[#222] bg-black overflow-hidden cursor-crosshair transition-colors duration-500 hover:border-gray-600 h-[400px] flex flex-col justify-end p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Shader Background */}
      <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AbstractWaveShader color={color} />
        </Canvas>
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
        <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">
          {category}
        </p>
        <h3 className="text-2xl font-light text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {description}
        </p>
        
        <button 
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white border border-[#444] px-4 py-2 hover:bg-white hover:text-black transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            alert("Mock: Iniciando chat de IA com contexto: " + title);
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Talk to Project
        </button>
      </div>
    </div>
  );
}
