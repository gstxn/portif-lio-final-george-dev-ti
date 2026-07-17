"use client";

import { useEffect } from "react";

export default function SecurityGuard() {
  useEffect(() => {
    // Bloqueia o clique direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Bloqueia atalhos comuns de desenvolvedor
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      
      // Ctrl+Shift+I ou Cmd+Option+I (DevTools)
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
        (e.metaKey && e.altKey && e.key.toLowerCase() === "i")
      ) {
        e.preventDefault();
      }

      // Ctrl+Shift+J ou Cmd+Option+J (Console)
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") ||
        (e.metaKey && e.altKey && e.key.toLowerCase() === "j")
      ) {
        e.preventDefault();
      }

      // Ctrl+U ou Cmd+U (View Source)
      if (
        (e.ctrlKey && e.key.toLowerCase() === "u") ||
        (e.metaKey && e.key.toLowerCase() === "u")
      ) {
        e.preventDefault();
      }
    };

    // Adiciona os listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Remove os listeners ao desmontar (embora este componente fique na raiz)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // O componente não renderiza nada visualmente
}
