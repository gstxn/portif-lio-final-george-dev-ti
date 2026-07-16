import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function TheJourney() {
  const { t } = useLanguage();
  const experiences = t.journey.experiences;

  return (
    <section className="relative w-full min-h-screen py-24 px-6 md:px-20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            {t.journey.title}
          </h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            {t.journey.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-12 pb-16 last:pb-0 group">
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-1 w-[10px] h-[10px] bg-black border border-white/30 rounded-full group-hover:bg-white transition-colors duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2 md:gap-0">
                <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-white/80 transition-colors">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-gray-500 tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5 w-fit">
                  {exp.period}
                </span>
              </div>
              
              <h4 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
                {exp.company}
              </h4>
              
              <p className="text-gray-400 font-light leading-relaxed max-w-2xl text-sm md:text-base border-l border-white/5 pl-4 py-1">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
