"use client";

import { motion } from "framer-motion";
import TheArchive from "./TheArchive";
import TheLab from "./TheLab";
import TheGraph from "./TheGraph";
import TheStack from "./TheStack";
import TheJourney from "./TheJourney";
import TheNetwork from "./TheNetwork";

import { useLanguage } from "../../context/LanguageContext";

function SectionWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`relative min-h-screen snap-start flex items-center w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} // slower elegant ease
        viewport={{ once: false, amount: 0.25 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function ScrollOrchestrator() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      
      {/* ── Hero Title ─────────────────────────────── */}
      <section className="relative min-h-screen snap-start flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white mix-blend-difference text-center">
            GEORGE DANDOLINI <span className="font-bold opacity-80">|</span> CREATIVE AI
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-400 font-mono tracking-widest uppercase text-center max-w-[80vw]">
            {t.hero.subtitle}
          </p>
          <p className="mt-8 text-xs text-gray-600 font-mono animate-bounce">
            {t.hero.scroll}
          </p>
        </motion.div>
      </section>

      {/* ── The Graph ────────────────── */}
      <SectionWrapper>
        <TheGraph />
      </SectionWrapper>

      {/* ── The Stack ────────────────── */}
      <SectionWrapper>
        <TheStack />
      </SectionWrapper>

      {/* ── The Archive ───────────────────── */}
      <SectionWrapper>
        <TheArchive />
      </SectionWrapper>

      {/* ── The Journey ───────────────────── */}
      <SectionWrapper>
        <TheJourney />
      </SectionWrapper>

      {/* ── The Lab ───────────────────── */}
      <SectionWrapper>
        <TheLab />
      </SectionWrapper>

      {/* ── The Network ───────────────────── */}
      <SectionWrapper>
        <TheNetwork />
      </SectionWrapper>

    </div>
  );
}
