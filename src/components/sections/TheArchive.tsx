import ProjectCard from "../ui/ProjectCard";
import { useLanguage } from "../../context/LanguageContext";

const projects = [
  {
    id: 1,
    title: "E-Commerce Imersivo",
    category: "Fullstack / 3D",
    description: "Uma plataforma de e-commerce construída com Next.js, com visualização de produtos em 3D e renderização em tempo real.",
    color: "#ff3366", // Reddish
  },
  {
    id: 2,
    title: "Design System Adaptativo",
    category: "UI/UX",
    description: "Um design system focado em micro-interações fluidas, com componentes que reagem dinamicamente ao comportamento do usuário.",
    color: "#33ccff", // Cyan
  },
  {
    id: 3,
    title: "LLM Autonomous Agent",
    category: "AI / Fullstack",
    description: "Agente autônomo acoplado a um dashboard moderno em React, unindo o processamento cognitivo com uma UX limpa.",
    color: "#cc33ff", // Purple
  }
];

export default function TheArchive() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen py-24 px-6 md:px-20">
      {/* Subtle dark vignette behind content so text is readable over particles */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            {t.archive.title}
          </h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            {t.archive.subtitle}
          </p>
        </div>

        <div className="mb-12 border border-white/10 bg-black/40 backdrop-blur-sm p-4 flex items-center justify-center gap-3">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <p className="text-gray-300 font-mono text-sm uppercase tracking-widest text-center">
            {t.archive.construction}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50 pointer-events-none grayscale">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} {...proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
