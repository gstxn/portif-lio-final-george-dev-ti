"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AbstractWaveShader({ color = "#ffffff" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) }
  }), [color]);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 16]} />
      <shaderMaterial
        transparent
        wireframe
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying float vDistortion;
          
          void main() {
            vec3 pos = position;
            float distortion = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * 0.5;
            pos += normal * distortion;
            vDistortion = distortion;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vDistortion;
          
          void main() {
            float intensity = 0.5 + vDistortion * 2.0;
            gl_FragColor = vec4(uColor * intensity, 0.6);
          }
        `}
      />
    </mesh>
  );
}
