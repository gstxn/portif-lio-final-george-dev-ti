"use client";

import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest"
      >
        <span className={language === 'pt' ? 'text-white font-bold' : 'opacity-50'}>PT</span>
        <span className="opacity-30">|</span>
        <span className={language === 'en' ? 'text-white font-bold' : 'opacity-50'}>EN</span>
      </motion.button>
    </div>
  );
}
