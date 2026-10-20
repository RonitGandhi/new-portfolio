import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Billboard, Edges, Float, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { experiences, identity, projects, publications, sections, stackManifest } from "@/content";
import { districts, doors, facing, NEON, type District } from "./districts";
import { windowTexture } from "./textures";
import { input, ui, useUI } from "./store";

const FONT = "/fonts/orbitron-latin-900-normal.woff";
const FONT_BOLD = "/fonts/orbitron-latin-700-normal.woff";

const sectionOf = (id: District["id"]) => sections.find((s) => s.id === id)!;

/** Click a building: walk to its door, then open it. Ignores drags. */
function goTo(d: District) {
  return (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta > 6 || ui.get().open) return;
    input.walkTo = doors[d.id].clone();
    ui.set({ target: d.id });
  };
}

function useFacade(d: District) {
  return useMemo(() => {
    const base = windowTexture("facade", [NEON.cyan, NEON.pink, NEON.yellow, "#ffffff"], 0.32, 11);
    const tex = base.clone();
    tex.needsUpdate = true;
    tex.repeat.set(Math.max(1, d.size[0] / 6), Math.max(1, d.size[1] / 9));
    return tex;
  }, [d.size]);
}

function Shell({ d, children }: { d: District; children?: React.ReactNode }) {
  const tex = useFacade(d);
  const [w, h, dep] = d.size;
  return (
    <mesh position-y={h / 2} onClick={goTo(d)}>
      <boxGeometry args={[w, h, dep]} />
      <meshStandardMaterial
        color="#0C0A16"
        metalness={0.55}
        roughness={0.45}
        emissive="#ffffff"
        emissiveMap={tex}
        emissiveIntensity={0.55}
      />
      <Edges color={d.color} threshold={20} />
      {children}
    </mesh>
  );
}

/** Door, facade label, rooftop sign and ground pad, shared by every building. */
function Frontage({ d, signY }: { d: District; signY: number }) {
  const sec = sectionOf(d.id);
  const [w, , dep] = d.size;
  const label = sec.title.toUpperCase();
  const size = Math.min(1.5, Math.max(0.6, (w * 0.86) / (label.length * 0.82)));
  return (
    <group position-z={dep / 2}>
      {/* Door */}
      <mesh position={[0, 1.5, 0.02]}>
        <planeGeometry args={[2.4, 3.1]} />
        <meshBasicMaterial color={d.color} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.45, 0.04]}>
        <planeGeometry args={[2.1, 2.9]} />
        <meshBasicMaterial color="#05040A" />
      </mesh>
      <Text
        font={FONT_BOLD}
        fontSize={0.3}
        position={[0, 3.55, 0.06]}
        color={NEON.yellow}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {sec.eyebrow.toUpperCase()}
      </Text>
      {/* Rooftop sign, readable from across the plaza */}
      <Text
        font={FONT}
        fontSize={size}
        position={[0, signY, 0.15]}
        color={d.color}
        anchorX="center"
        anchorY="bottom"
        letterSpacing={0.04}
        outlineWidth={size * 0.03}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

function DoorPad({ d }: { d: District }) {
  const near = useUI((s) => s.nearby === d.id);
  const ref = useRef<THREE.Mesh>(null);
  const p = doors[d.id];
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime;
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = near ? 0.75 + Math.sin(t * 6) * 0.2 : 0.28 + Math.sin(t * 2) * 0.08;
    const s = near ? 1.08 : 1;
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, s, 0.15));
  });
  return (
    <mesh ref={ref} position={[p.x, 0.03, p.z]} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[1.05, 1.35, 48]} />
      <meshBasicMaterial color={d.color} toneMapped={false} transparent opacity={0.3} />
    </mesh>
  );
}

/* ---------- Building kinds ---------- */

function Tower({ d }: { d: District }) {
  const [w, h, dep] = d.size;
  const beacon = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (beacon.current) beacon.current.visible = Math.sin(clock.elapsedTime * 3) > 0;
  });
  return (
    <>
      <Shell d={d} />
      {/* One lit band per role; the live role glows green */}
      {experiences.map((e, i) => (
        <mesh key={e.id} position-y={6 + i * 5}>
          <boxGeometry args={[w + 0.25, 0.14, dep + 0.25]} />
          <meshBasicMaterial color={e.status === "LIVE" ? NEON.green : d.color} toneMapped={false} />
        </mesh>
      ))}
      <mesh position-y={h + 2.5}>
        <cylinderGeometry args={[0.06, 0.1, 5]} />
        <meshStandardMaterial color="#2B2642" metalness={0.8} />
      </mesh>
      <mesh ref={beacon} position-y={h + 5.1}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#FF2D55" toneMapped={false} />
      </mesh>
      <Frontage d={d} signY={h + 0.4} />
    </>
  );
}

function Arcade({ d }: { d: District }) {
  const [w, h, dep] = d.size;
  const shot = useTexture("/assets/images/fortuneflow.png");
  shot.colorSpace = THREE.SRGBColorSpace;
  const screens = useRef<THREE.MeshBasicMaterial[]>([]);
  const rest = projects.slice(1);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    screens.current.forEach((m, i) => {
      if (!m) return;
      m.color.setHSL((0.82 + i * 0.07 + t * 0.03) % 1, 1, 0.55 + Math.sin(t * 2 + i) * 0.08);
    });
  });
  return (
    <>
      <Shell d={d} />
      {/* Featured project billboard on the roof */}
      <group position={[0, h + 3.2, 0]}>
        <mesh position-z={-0.05}>
          <boxGeometry args={[7.6, 5.4, 0.2]} />
          <meshStandardMaterial color="#0C0A16" />
          <Edges color={d.color} />
        </mesh>
        <mesh position-z={0.07}>
          <planeGeometry args={[7.2, 5.25]} />
          <meshBasicMaterial map={shot} toneMapped={false} />
        </mesh>
        <mesh position={[0, -3.2, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#2B2642" metalness={0.8} />
        </mesh>
      </group>
      {/* One small screen per remaining project, flanking the door */}
      <group position-z={dep / 2 + 0.03}>
        {rest.map((p, i) => {
          const side = i < 4 ? -1 : 1;
          const k = i % 4;
          const x = side * (2.4 + (k % 2) * 1.9);
          const y = 1.4 + Math.floor(k / 2) * 1.6;
          return (
            <mesh key={p.id} position={[x, y, 0]}>
              <planeGeometry args={[1.6, 1.2]} />
              <meshBasicMaterial
                ref={(m) => {
                  if (m) screens.current[i] = m;
                }}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
      <Frontage d={d} signY={4.4} />
    </>
  );
}

function DataCenter({ d }: { d: District }) {
  const [w, h, dep] = d.size;
  const lights = useRef<THREE.MeshBasicMaterial[]>([]);
  const fans = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    lights.current.forEach((m, i) => {
      if (m) m.opacity = 0.35 + 0.65 * Math.max(0, Math.sin(t * (2 + i * 0.7) + i));
    });
    fans.current?.children.forEach((f, i) => (f.rotation.y = t * (2 + i)));
  });
  return (
    <>
      <Shell d={d} />
      {/* One blinking rack per skill category, each side of the door */}
      <group position-z={dep / 2 + 0.03}>
        {stackManifest.flatMap((cat, i) =>
          [-1, 1].map((side) => (
            <mesh key={`${cat.category}-${side}`} position={[side * (2 + i * 0.6), 2.6, 0]}>
              <planeGeometry args={[0.16, 4.2]} />
              <meshBasicMaterial
                ref={(m) => {
                  if (m) lights.current[i * 2 + (side > 0 ? 1 : 0)] = m;
                }}
                color={d.color}
                toneMapped={false}
                transparent
              />
            </mesh>
          )),
        )}
      </group>
      <group ref={fans} position-y={h + 0.3}>
        {[-3, 0, 3].map((x) => (
          <group key={x} position-x={x}>
            <mesh>
              <cylinderGeometry args={[1, 1, 0.5, 24]} />
              <meshStandardMaterial color="#1A1729" metalness={0.7} />
              <Edges color={d.color} threshold={40} />
            </mesh>
            <mesh position-y={0.3}>
              <boxGeometry args={[1.7, 0.05, 0.22]} />
              <meshBasicMaterial color={d.color} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
      <Frontage d={d} signY={h + 1.1} />
    </>
  );
}

function Archive({ d }: { d: District }) {
  const [w, h, dep] = d.size;
  const orbit = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (orbit.current) orbit.current.rotation.y = clock.elapsedTime * 0.4;
  });
  return (
    <>
      <Shell d={d} />
      {/* Columns */}
      {[-3.4, -1.9, 1.9, 3.4].map((x) => (
        <mesh key={x} position={[x, 3, dep / 2 + 0.8]}>
          <cylinderGeometry args={[0.28, 0.28, 6, 16]} />
          <meshStandardMaterial color="#141024" metalness={0.6} roughness={0.3} />
          <Edges color={d.color} threshold={40} />
        </mesh>
      ))}
      {/* Floating book with one glowing page per publication */}
      <Float speed={1.4} floatIntensity={0.8} rotationIntensity={0.2}>
        <group position-y={h + 3}>
          <mesh rotation-y={Math.PI / 5}>
            <boxGeometry args={[2.2, 2.8, 0.45]} />
            <meshStandardMaterial color="#1A1530" emissive={d.color} emissiveIntensity={0.35} />
            <Edges color={d.color} />
          </mesh>
          <group ref={orbit}>
            {publications.map((p, i) => {
              const a = (i / publications.length) * Math.PI * 2;
              return (
                <mesh key={p.id} position={[Math.cos(a) * 2.4, Math.sin(i) * 0.4, Math.sin(a) * 2.4]} rotation-y={-a}>
                  <planeGeometry args={[0.8, 1.05]} />
                  <meshBasicMaterial color={d.color} toneMapped={false} transparent opacity={0.75} side={THREE.DoubleSide} />
                </mesh>
              );
            })}
          </group>
        </group>
      </Float>
      <Frontage d={d} signY={6.7} />
    </>
  );
}

function Comms({ d }: { d: District }) {
  const [, h] = d.size;
  const beacon = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (beacon.current) beacon.current.scale.setScalar(1 + Math.sin(t * 4) * 0.25);
    if (ring.current) ring.current.rotation.z = t * 0.6;
  });
  return (
    <>
      <Shell d={d} />
      {/* Dish */}
      <group position={[0, h + 1.2, 0.6]} rotation-x={-0.6}>
        <mesh>
          <sphereGeometry args={[2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
          <meshStandardMaterial color="#1A1729" metalness={0.8} roughness={0.25} side={THREE.DoubleSide} />
          <Edges color={d.color} threshold={30} />
        </mesh>
      </group>
      <mesh ref={beacon} position-y={h + 3.6}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={NEON.pink} toneMapped={false} />
      </mesh>
      <mesh ref={ring} position-y={h * 0.62} rotation-x={Math.PI / 2}>
        <torusGeometry args={[4, 0.06, 8, 64]} />
        <meshBasicMaterial color={d.color} toneMapped={false} />
      </mesh>
      <Frontage d={d} signY={4.6} />
    </>
  );
}

/** Centre of the plaza: a hologram of the visitor's host. Opens About. */
function Monument({ d }: { d: District }) {
  const sign = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    // Hide the floating name when the camera passes through it
    if (sign.current) sign.current.visible = Math.hypot(camera.position.x, camera.position.z) > 6.5;
    if (ringA.current) ringA.current.rotation.set(t * 0.5, t * 0.3, 0);
    if (ringB.current) ringB.current.rotation.set(-t * 0.35, 0, t * 0.45);
    if (core.current) core.current.rotation.set(t * 0.2, t * 0.4, 0);
  });
  return (
    <group onClick={goTo(d)}>
      <mesh position-y={0.3}>
        <cylinderGeometry args={[2, 2.3, 0.6, 48]} />
        <meshStandardMaterial color="#110F1C" metalness={0.7} roughness={0.3} />
        <Edges color={d.color} threshold={30} />
      </mesh>
      <mesh position-y={0.62} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.7, 48]} />
        <meshBasicMaterial color={d.color} toneMapped={false} transparent opacity={0.25} />
      </mesh>
      {/* Light column */}
      <mesh position-y={3.2}>
        <cylinderGeometry args={[1.5, 1.7, 5, 32, 1, true]} />
        <meshBasicMaterial color={d.color} transparent opacity={0.06} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <group position-y={3.1}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshBasicMaterial color={NEON.pink} wireframe toneMapped={false} />
        </mesh>
        <mesh ref={ringA}>
          <torusGeometry args={[1.5, 0.03, 8, 80]} />
          <meshBasicMaterial color={d.color} toneMapped={false} />
        </mesh>
        <mesh ref={ringB}>
          <torusGeometry args={[1.8, 0.02, 8, 80]} />
          <meshBasicMaterial color={NEON.yellow} toneMapped={false} />
        </mesh>
      </group>
      <Billboard ref={sign} position={[0, 5.7, 0]}>
        <Text font={FONT} fontSize={0.78} color="#F2F0FF" anchorX="center" letterSpacing={0.05} outlineWidth={0.02} outlineColor={d.color}>
          {identity.name.toUpperCase()}
        </Text>
        <Text font={FONT_BOLD} fontSize={0.24} position-y={-0.62} color={d.color} anchorX="center" letterSpacing={0.1}>
          {identity.role.toUpperCase()}
        </Text>
      </Billboard>
      <Billboard position={[0, 1.35, 2.45]}>
        <Text font={FONT_BOLD} fontSize={0.22} color={NEON.yellow} anchorX="center" letterSpacing={0.1}>
          {sectionOf("about").eyebrow.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  );
}

const kinds = {
  tower: Tower,
  arcade: Arcade,
  datacenter: DataCenter,
  archive: Archive,
  comms: Comms,
  monument: Monument,
} as const;

export default function Buildings() {
  return (
    <>
      {districts.map((d) => {
        const Kind = kinds[d.kind];
        return (
          <group key={d.id}>
            <group position={[d.at[0], 0, d.at[1]]} rotation-y={facing(d)}>
              <Kind d={d} />
              {d.kind !== "monument" && (
                <pointLight position={[0, 4, d.size[2] / 2 + 3]} color={d.color} intensity={30} distance={16} decay={2} />
              )}
            </group>
            <DoorPad d={d} />
          </group>
        );
      })}
    </>
  );
}
