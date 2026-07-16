"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function TheStack() {
  const [activeTab, setActiveTab] = useState<"dev" | "it">("dev");
  const { t } = useLanguage();

  const categories = activeTab === "dev" ? t.categories.devCategories : t.categories.itCategories;

  return (
    <section className="relative w-full min-h-screen py-24 px-6 md:px-20">
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            {t.stack.title}
          </h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            {t.stack.subtitle}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
            {t.stack.selectDomain}
          </span>
          <div className="flex gap-4 p-1 border border-white/10 rounded-full bg-white/[0.02]">
            <button
              onClick={() => setActiveTab("dev")}
              className={`relative px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-colors z-10 ${
                activeTab === "dev" ? "text-black font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              {t.stack.dev}
              {activeTab === "dev" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("it")}
              className={`relative px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-colors z-10 ${
                activeTab === "it" ? "text-black font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              {t.stack.it}
              {activeTab === "it" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Animated Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {categories.map((category, index) => (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:bg-white/[0.04] transition-colors duration-500"
                >
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
                  
                  <h3 className="relative z-10 text-lg font-mono tracking-wider text-white mb-6 uppercase border-b border-white/10 pb-4">
                    {category.name}
                  </h3>
                  
                  <ul className="relative z-10 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li 
                        key={skill}
                        className="px-3 py-1 text-xs font-mono text-gray-300 border border-white/10 bg-black/40 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-default"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
