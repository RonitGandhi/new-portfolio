import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Grid, MeshReflectorMaterial, Sparkles, Text } from "@react-three/drei";
import * as THREE from "three";
import { stackChips } from "@/content";
import { districts, doors, NEON, PLAZA_RADIUS } from "./districts";
import { input, player, ui } from "./store";
import { rng, windowTexture } from "./textures";

const FONT = "/fonts/orbitron-latin-700-normal.woff";

function Ground({ lite }: { lite: boolean }) {
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > 6 || ui.get().open) return;
    input.walkTo = new THREE.Vector3(e.point.x, 0, e.point.z);
    ui.set({ target: null });
  };
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} onClick={onClick}>
        <planeGeometry args={[260, 260]} />
        {lite ? (
          <meshStandardMaterial color="#0A0814" metalness={0.6} roughness={0.55} />
        ) : (
          <MeshReflectorMaterial
            blur={[400, 120]}
            resolution={512}
            mixBlur={1}
            mixStrength={28}
            roughness={0.9}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#0A0814"
            metalness={0.65}
            mirror={0.6}
          />
        )}
      </mesh>
      <Grid
        position={[0, 0.012, 0]}
        args={[200, 200]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1E1A33"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#0E5C6E"
        fadeDistance={70}
        fadeStrength={1.6}
        infiniteGrid
      />
      {/* Plaza edge */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <ringGeometry args={[PLAZA_RADIUS - 0.25, PLAZA_RADIUS, 128]} />
        <meshBasicMaterial color={NEON.pink} toneMapped={false} transparent opacity={0.6} />
      </mesh>
    </>
  );
}

/** Light strips from the monument to each door, so every building is findable. */
function Paths() {
  return (
    <>
      {districts
        .filter((d) => d.kind !== "monument")
        .map((d) => {
          const door = doors[d.id];
          const dir = door.clone().normalize();
          const start = dir.clone().multiplyScalar(2.6);
          const end = door.clone().sub(dir.clone().multiplyScalar(1.4));
          const len = start.distanceTo(end);
          const mid = start.clone().add(end).multiplyScalar(0.5);
          const ang = Math.atan2(door.x, door.z);
          return (
            <group key={d.id} position={[mid.x, 0.018, mid.z]} rotation-y={ang}>
              {[-0.7, 0.7].map((x) => (
                <mesh key={x} position-x={x} rotation-x={-Math.PI / 2}>
                  <planeGeometry args={[0.08, len]} />
                  <meshBasicMaterial color={d.color} toneMapped={false} transparent opacity={0.55} />
                </mesh>
              ))}
            </group>
          );
        })}
    </>
  );
}

function Skyline({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tex = useMemo(() => {
    const t = windowTexture("skyline", [NEON.cyan, NEON.pink, "#FFB547", "#9D7BFF"], 0.22, 3).clone();
    t.needsUpdate = true;
    t.repeat.set(1, 3);
    return t;
  }, []);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const r = rng(42);
    const o = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + r() * 0.08;
      const rad = 42 + r() * 38;
      const h = 12 + r() * 48;
      const w = 5 + r() * 8;
      o.position.set(Math.cos(a) * rad, h / 2, Math.sin(a) * rad);
      o.scale.set(w, h, 5 + r() * 8);
      o.rotation.y = -a;
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, [count]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial color="#08070F" emissive="#ffffff" emissiveMap={tex} emissiveIntensity={0.7} metalness={0.4} roughness={0.6} />
    </instancedMesh>
  );
}

/** Holo-ads floating over the skyline, showing the core stack. */
function HoloAds() {
  const colors = [NEON.cyan, NEON.pink, NEON.yellow, NEON.green, NEON.violet, NEON.cyan];
  return (
    <>
      {stackChips.map((chip, i) => {
        const a = (i / stackChips.length) * Math.PI * 2 + 0.5;
        const r = 46;
        return (
          <group key={chip} position={[Math.cos(a) * r, 22 + (i % 3) * 6, Math.sin(a) * r]} rotation-y={-a - Math.PI / 2}>
            <Text font={FONT} fontSize={1.6} color={colors[i]} anchorX="center" letterSpacing={0.06}>
              {chip.toUpperCase()}
            </Text>
          </group>
        );
      })}
    </>
  );
}

function Rain({ count }: { count: number }) {
  const ref = useRef<THREE.LineSegments>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const speeds = new Float32Array(count);
    const r = rng(9);
    for (let i = 0; i < count; i++) {
      const x = (r() - 0.5) * 60;
      const y = r() * 30;
      const z = (r() - 0.5) * 60;
      positions.set([x, y, z, x + 0.05, y + 0.7, z], i * 6);
      speeds[i] = 22 + r() * 14;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const ls = ref.current;
    if (!ls) return;
    const attr = ls.geometry.getAttribute("position") as THREE.BufferAttribute;
    const p = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const o = i * 6;
      let y = p[o + 1] - speeds[i] * dt;
      if (y < 0) y += 30;
      p[o + 1] = y;
      p[o + 4] = y + 0.7;
    }
    attr.needsUpdate = true;
    // Rain follows the visitor so it is always around them
    ls.position.set(player.pos.x, 0, player.pos.z);
  });

  return (
    <lineSegments ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#7DF4FF" transparent opacity={0.28} />
    </lineSegments>
  );
}

function FlyingCars({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const cars = useMemo(() => {
    const r = rng(5);
    return Array.from({ length: count }, (_, i) => ({
      radius: 34 + r() * 22,
      height: 13 + r() * 14,
      speed: (0.05 + r() * 0.08) * (i % 2 ? 1 : -1),
      offset: r() * Math.PI * 2,
      color: i % 3 === 0 ? NEON.pink : i % 3 === 1 ? NEON.cyan : NEON.yellow,
    }));
  }, [count]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current?.children.forEach((c, i) => {
      const car = cars[i];
      const a = car.offset + t * car.speed;
      c.position.set(Math.cos(a) * car.radius, car.height + Math.sin(t + i) * 0.4, Math.sin(a) * car.radius);
      c.rotation.y = -a + (car.speed > 0 ? 0 : Math.PI);
    });
  });
  return (
    <group ref={group}>
      {cars.map((car, i) => (
        <group key={i}>
          <mesh>
            <boxGeometry args={[0.9, 0.35, 2]} />
            <meshStandardMaterial color="#15122A" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 1.02]}>
            <planeGeometry args={[0.8, 0.12]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, -1.3]}>
            <boxGeometry args={[0.6, 0.08, 0.7]} />
            <meshBasicMaterial color={car.color} toneMapped={false} transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function City({ lite }: { lite: boolean }) {
  return (
    <>
      <color attach="background" args={["#05040B"]} />
      <fog attach="fog" args={["#0B0718", 22, 95]} />
      <ambientLight intensity={0.45} color="#5B4A9E" />
      <hemisphereLight args={["#3A1D6E", "#05040B", 0.6]} />
      <directionalLight position={[20, 40, 10]} intensity={0.5} color="#7DF4FF" />
      <pointLight position={[0, 6, 0]} color={NEON.pink} intensity={40} distance={20} decay={2} />

      <Ground lite={lite} />
      <Paths />
      <Skyline count={lite ? 45 : 80} />
      <HoloAds />
      <FlyingCars count={lite ? 5 : 10} />
      <Rain count={lite ? 500 : 1600} />
      <Sparkles count={lite ? 40 : 90} scale={[50, 14, 50]} position-y={6} size={2.5} speed={0.3} color={NEON.cyan} />
    </>
  );
}
