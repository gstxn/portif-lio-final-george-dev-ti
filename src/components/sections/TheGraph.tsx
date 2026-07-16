import NeuralGraph from "../3d/NeuralGraph";
import { useLanguage } from "../../context/LanguageContext";

export default function TheGraph() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text / About Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            {t.graph.title}
          </h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-8">
            {t.graph.subtitle}
          </p>
          
          <div className="space-y-6 text-gray-300 font-light leading-relaxed">
            <p>
              {t.graph.p1}
            </p>
            <p>
              {t.graph.p2}
            </p>
            <div className="mt-8">
              <span className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                {t.graph.coreNodes}
              </span>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li>+ Fullstack Web Dev</li>
                <li>+ UI/UX Design</li>
                <li>+ 3D / WebGL</li>
                <li>+ AI & Machine Learning</li>
                <li>+ Generative Experiences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3D Neural Map */}
        <div className="relative border border-white/10 h-[500px] overflow-hidden">
          <NeuralGraph />
        </div>

      </div>
    </section>
  );
}
