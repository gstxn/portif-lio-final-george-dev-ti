import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/gstxn", label: "github.com/gstxn" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/georgeddev/", label: "linkedin.com/in/georgeddev" },
  { name: "Email", url: "mailto:sobbianekge@gmail.com", label: "sobbianekge@gmail.com" },
];

export default function TheNetwork() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen py-24 px-6 md:px-20 flex flex-col items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tighter">
          {t.network.title1} <br /> <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.network.title2}</span>
        </h2>
        
        <p className="text-gray-400 font-mono text-sm max-w-xl leading-relaxed mb-16">
          {t.network.description}
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 w-full md:w-64"
            >
              <span className="text-white font-mono text-lg uppercase tracking-wider mb-2 flex items-center gap-2 group-hover:text-white/80">
                {link.name}
                {/* Simple arrow SVG */}
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 -translate-x-1 group-hover:translate-x-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-xs font-mono text-gray-500">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-32 border-t border-white/10 pt-8 w-full">
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
            {t.network.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}
