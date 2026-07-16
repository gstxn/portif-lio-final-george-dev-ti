"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2500;

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, initialPositions, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const initial = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles deep in Z axis so we can fly through them
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 120; // Very deep spread on Z

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;

      sz[i] = Math.random() * 2.5 + 0.5;
    }
    return [pos, initial, sz];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
    }),
    []
  );

  // Track mouse via window event — canvas stays pointer-events-none
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shaderRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      // Scale to match viewport space used in shader
      const targetX = x * (window.innerWidth / 100);
      const targetY = y * (window.innerHeight / 100);
      shaderRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector3(targetX, targetY, 0),
        0.05
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aInitialPosition" args={[initialPositions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform vec3 uMouse;
          attribute vec3 aInitialPosition;
          attribute float aSize;
          varying float vAlpha;

          void main() {
            vec3 pos = aInitialPosition;

            // Slow organic drift
            pos.y += sin(uTime * 0.2 + pos.x * 0.5) * 0.5;
            pos.x += cos(uTime * 0.15 + pos.y * 0.5) * 0.5;

            // Mouse water ripple effect
            float dist = distance(pos.xy, uMouse.xy);
            float attention = smoothstep(8.0, 0.0, dist);
            float wave = sin(dist * 1.5 - uTime * 2.0);
            pos.z += wave * attention * 2.0;
            pos.xy += (pos.xy - uMouse.xy) * wave * attention * 0.1;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * (18.0 / -mvPosition.z) * (1.0 + attention * 0.5);
            gl_Position = projectionMatrix * mvPosition;

            // Mais visível em repouso, brilha com o mouse
            vAlpha = 0.12 + attention * 0.5;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            float strength = smoothstep(0.5, 0.0, dist);
            gl_FragColor = vec4(1.0, 1.0, 1.0, strength * vAlpha);
          }
        `}
      />
    </points>
  );
}

function CameraController() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Camera travels from Z=15 all the way to Z=-55 through the deep particle field
    const targetZ = 15 - progress * 70;
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.04
    );
  });
  return null;
}

export default function LatentCanvas() {
  return (
    // pointer-events-none so UI elements below receive all events
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Particles />
        <CameraController />
      </Canvas>
    </div>
  );
}
