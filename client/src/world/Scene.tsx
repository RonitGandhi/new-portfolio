import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import City from "./City";
import Buildings from "./Buildings";
import Player from "./Player";
import { cam, ui } from "./store";

const aberration = new THREE.Vector2(0.0007, 0.0009);

export default function Scene({ lite, reducedMotion }: { lite: boolean; reducedMotion: boolean }) {
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);

  return (
    <div
      className="absolute inset-0 touch-none select-none"
      aria-hidden="true"
      onPointerDown={(e) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        cam.yaw -= (e.clientX - d.x) * 0.0055;
        cam.pitch = THREE.MathUtils.clamp(cam.pitch + (e.clientY - d.y) * 0.003, 0.1, 0.95);
        d.x = e.clientX;
        d.y = e.clientY;
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      onPointerLeave={() => (drag.current = null)}
      onWheel={(e) => {
        cam.dist = THREE.MathUtils.clamp(cam.dist + e.deltaY * 0.01, 5, 18);
      }}
    >
      <Canvas
        dpr={lite ? [1, 1.5] : [1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ fov: 52, near: 0.1, far: 240, position: [0, 5, 18] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          gl.domElement.addEventListener("webglcontextlost", () => ui.set({ glLost: true }));
          gl.domElement.addEventListener("webglcontextrestored", () => ui.set({ glLost: false }));
        }}
      >
        <Suspense fallback={null}>
          <City lite={lite} />
          <Buildings />
          <Player reducedMotion={reducedMotion} />
          <Preload all />
        </Suspense>
        <EffectComposer multisampling={lite ? 0 : 4}>
          <Bloom mipmapBlur intensity={lite ? 0.9 : 1.15} luminanceThreshold={0.32} luminanceSmoothing={0.25} />
          <ChromaticAberration offset={aberration} radialModulation={false} modulationOffset={0} />
          <Vignette darkness={0.65} offset={0.28} />
        </EffectComposer>
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}
