"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function TheLab() {
  const { language, t } = useLanguage();
  const { messages, status, sendMessage } = useChat({
    onError: (err) => {
      console.error("Chat Error:", err);
      alert("Erro na IA: " + err.message);
    },
    api: "/api/chat",
    headers: {
      'x-portfolio-language': language
    }
  });

  const isLoading = status === "streaming" || status === "submitted";

  const [input, setInput] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) {
      return;
    }
    
    try {
      sendMessage({ text: input });
      setInput("");
    } catch (err: any) {
      alert("Erro ao enviar: " + err.message);
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const renderMessageContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-2 text-center">
          {t.lab.title}
        </h2>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-8 text-center">
          {t.lab.subtitle}
        </p>

        {/* Terminal Window */}
        <div className="w-full relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative flex flex-col bg-black/80 border border-white/10 w-full h-[420px]">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                system / gemini-2.5-flash
              </span>
              <span className={`w-2 h-2 rounded-full ${isLoading ? "bg-yellow-400 animate-pulse" : "bg-green-500"}`} />
            </div>

            {/* Messages */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-700 font-mono text-sm text-center leading-relaxed">
                    {">"} {t.lab.systemReady}<br />
                    <span className="text-gray-600">{t.lab.askSomething}</span>
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <span className="text-white/30 font-mono text-xs mt-1 shrink-0">AI</span>
                  )}
                  <div 
                    className={`max-w-[80%] ${
                      m.role === 'user' 
                        ? 'text-white/80' 
                        : 'text-gray-300'
                    } font-mono text-sm leading-relaxed whitespace-pre-wrap`}
                  >
                    {renderMessageContent(m.parts?.map((p: any) => p.type === 'text' ? p.text : '').join(''))}
                  </div>
                  {m.role === "user" && (
                    <span className="text-white/30 font-mono text-xs mt-1 shrink-0">YOU</span>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <span className="text-white/30 font-mono text-xs mt-1">AI</span>
                  <span className="text-gray-500 font-mono text-sm animate-pulse">▋</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/5 px-5 py-3 flex items-center gap-3"
            >
              <span className="text-white/40 font-mono text-sm shrink-0">{">"}</span>
              <input
                type="text"
                value={input || ""}
                onChange={handleInputChange}
                placeholder={t.lab.placeholder}
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/20 disabled:opacity-50"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="text-white/30 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors disabled:opacity-20"
              >
                {t.lab.send}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
