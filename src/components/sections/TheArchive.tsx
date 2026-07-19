import ProjectCard from "../ui/ProjectCard";
import { useLanguage } from "../../context/LanguageContext";

const projects = [
  {
    id: 1,
    title: "Fiscal Middleware",
    category: "Backend / Mensageria",
    description: "Sistema arquitetado para atuar como camada de resiliência e mensageria usando .NET 9 e RabbitMQ. Protege integrações síncronas contra falhas e timeouts em alta volumetria.",
    color: "#ff6600", // Orange
    githubLink: "https://github.com/gstxn/fiscalmiddlewaredashboard",
    liveLink: "https://fiscalmiddlewaredashboard.vercel.app/",
    curiosity: "O pulso contínuo ao fundo representa o Worker em .NET, sempre 'vivo' e ouvindo. Ao passar o mouse, o feixe simula a jornada de uma mensagem no middleware: o tráfego caótico entra (vermelho), passa pelas regras de resiliência e sai validado no destino (verde)."
  },
  {
    id: 2,
    title: "Pipeline Reativo de Arquivos Massivos",
    category: "Backend / Big Data / Arquitetura",
    description: "Solução arquitetural corporativa para processamento assíncrono de big data (CSVs massivos). Utiliza .NET 8, PostgreSQL (Bulk Insert), React, SignalR e MinIO para garantir alto throughput e estabilidade de memória.",
    color: "#512BD4", // .NET Purple
    githubLink: "https://github.com/gstxn/Pipeline-de-Processamento-Reativo-de-Arquivos-Massivos",
    liveLink: "",
    curiosity: "A malha 3D pulsante ao fundo representa o oceano de dados brutos. Ao passar o mouse, o feixe de laser de alta velocidade simula a ação do IAsyncEnumerable no backend: a API atua como um scanner, varrendo e processando (slicing) os milhões de registros linha a linha sob demanda (PostgreSQL COPY). O arquivo gigantesco é consumido sem nunca estourar a memória (OutOfMemory)."
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
