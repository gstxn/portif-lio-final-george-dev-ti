import LatentCanvas from "@/components/3d/LatentCanvas";
import ScrollOrchestrator from "@/components/sections/ScrollOrchestrator";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Fixed 3D background — always visible */}
      <LatentCanvas />

      {/* Scroll orchestrator drives all section visibility */}
      <ScrollOrchestrator />
    </main>
  );
}
