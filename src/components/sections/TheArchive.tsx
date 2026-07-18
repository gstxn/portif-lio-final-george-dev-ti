import ProjectCard from "../ui/ProjectCard";
import { useLanguage } from "../../context/LanguageContext";

const projects = [
  {
    id: 1,
    title: "Fiscal Middleware",
    category: "Backend / Mensageria",
    description: "Middleware de resiliência com .NET 9 e RabbitMQ para integrações tolerantes a falhas em alta volumetria.",
    color: "#ff6600", // Orange
    githubLink: "https://github.com/gstxn/fiscalmiddlewaredashboard",
    liveLink: "https://fiscalmiddlewaredashboard.vercel.app/"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} {...proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
