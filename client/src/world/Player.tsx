import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cam, input, openSection, player, ui } from "./store";
import { districts, doors, ENTER_RADIUS, resolveCollision } from "./districts";
import { NEON } from "./districts";

const WALK = 5.2;
const RUN = 9.5;
const tmp = new THREE.Vector3();
const lookAt = new THREE.Vector3();
const camTarget = new THREE.Vector3();

function keyAxis() {
  const k = input.keys;
  let x = 0;
  let z = 0;
  if (k.has("KeyW") || k.has("ArrowUp")) z -= 1;
  if (k.has("KeyS") || k.has("ArrowDown")) z += 1;
  if (k.has("KeyA") || k.has("ArrowLeft")) x -= 1;
  if (k.has("KeyD") || k.has("ArrowRight")) x += 1;
  x += input.joy.x;
  z += input.joy.y;
  const len = Math.hypot(x, z);
  if (len > 1) {
    x /= len;
    z /= len;
  }
  return { x, z, len: Math.min(1, len) };
}

/** The visitor: a small cyber-runner with a glowing visor. Also drives the follow camera. */
export default function Player({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const phase = useRef(0);

  // Place the camera behind the player on first frame
  useEffect(() => {
    camera.position.set(0, 4.5, player.pos.z + cam.dist);
  }, [camera]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const state = ui.get();
    const locked = !state.started || state.open !== null;

    // ---- Camera turn (Q / E) ----
    if (!locked) {
      if (input.keys.has("KeyQ")) cam.yaw += dt * 1.9;
      if (input.keys.has("KeyE")) cam.yaw -= dt * 1.9;
    }

    // ---- Movement ----
    let vx = 0;
    let vz = 0;
    const axis = locked ? { x: 0, z: 0, len: 0 } : keyAxis();
    const run = input.keys.has("ShiftLeft") || input.keys.has("ShiftRight");

    if (axis.len > 0.05) {
      // Manual input cancels auto-walk
      if (input.walkTo) {
        input.walkTo = null;
        if (state.target) ui.set({ target: null });
      }
      const s = Math.sin(cam.yaw);
      const c = Math.cos(cam.yaw);
      // Camera-relative: forward is away from the camera
      const fx = -s;
      const fz = -c;
      const rx = c;
      const rz = -s;
      const speed = (run ? RUN : WALK) * axis.len;
      vx = (rx * axis.x - fx * axis.z) * speed;
      vz = (rz * axis.x - fz * axis.z) * speed;
    } else if (input.walkTo && !locked) {
      tmp.copy(input.walkTo).sub(player.pos).setY(0);
      const dist = tmp.length();
      if (dist < 0.35) {
        input.walkTo = null;
        if (state.target) openSection(state.target);
      } else {
        tmp.normalize().multiplyScalar(Math.min(RUN * 0.85, dist * 4));
        vx = tmp.x;
        vz = tmp.z;
      }
    }

    player.pos.x += vx * dt;
    player.pos.z += vz * dt;
    resolveCollision(player.pos);
    const speed = Math.hypot(vx, vz);
    player.speed = THREE.MathUtils.damp(player.speed, speed, 10, dt);

    if (speed > 0.1) {
      const target = Math.atan2(vx, vz);
      let diff = target - player.heading;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      player.heading += diff * Math.min(1, dt * 12);
    }

    // ---- Proximity to a district entrance ----
    let near: (typeof districts)[number]["id"] | null = null;
    let best = ENTER_RADIUS;
    for (const d of districts) {
      const dd = doors[d.id].distanceTo(tmp.set(player.pos.x, 0, player.pos.z));
      if (dd < best) {
        best = dd;
        near = d.id;
      }
    }
    if (near !== state.nearby) ui.set({ nearby: near });

    // ---- Avatar pose ----
    if (root.current) {
      root.current.position.set(player.pos.x, 0, player.pos.z);
      root.current.rotation.y = player.heading;
    }
    const moving = Math.min(1, player.speed / WALK);
    phase.current += dt * (4 + player.speed * 1.4);
    const swing = Math.sin(phase.current) * 0.75 * moving;
    if (legL.current) legL.current.rotation.x = swing;
    if (legR.current) legR.current.rotation.x = -swing;
    if (armL.current) armL.current.rotation.x = -swing * 0.8;
    if (armR.current) armR.current.rotation.x = swing * 0.8;
    if (body.current) {
      const t = performance.now() / 1000;
      body.current.position.y = Math.abs(Math.cos(phase.current)) * 0.07 * moving + Math.sin(t * 2) * 0.015;
      body.current.rotation.x = moving * 0.08;
    }
    if (ring.current) {
      const t = performance.now() / 1000;
      const s = 1 + Math.sin(t * 3) * 0.06;
      ring.current.scale.set(s, s, s);
    }

    // ---- Follow camera ----
    const cp = Math.cos(cam.pitch);
    camTarget.set(
      player.pos.x + Math.sin(cam.yaw) * cam.dist * cp,
      1.4 + Math.sin(cam.pitch) * cam.dist,
      player.pos.z + Math.cos(cam.yaw) * cam.dist * cp,
    );
    // Keep the camera out of building walls
    resolveCollision(camTarget, 0.8);
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 6);
    camera.position.lerp(camTarget, k);
    lookAt.set(player.pos.x, 2.1, player.pos.z);
    camera.lookAt(lookAt);
  });

  const suit = (
    <meshStandardMaterial color="#141024" metalness={0.7} roughness={0.35} />
  );

  return (
    <group ref={root}>
      {/* Ground ring */}
      <mesh ref={ring} rotation-x={-Math.PI / 2} position-y={0.02}>
        <ringGeometry args={[0.55, 0.68, 40]} />
        <meshBasicMaterial color={NEON.cyan} toneMapped={false} transparent opacity={0.85} />
      </mesh>
      <pointLight position={[0, 2.2, 0.6]} color={NEON.cyan} intensity={6} distance={7} decay={2} />

      <group ref={body}>
        {/* Legs (pivot at hip) */}
        <group ref={legL} position={[-0.15, 0.85, 0]}>
          <mesh position-y={-0.42} castShadow>
            <boxGeometry args={[0.2, 0.84, 0.22]} />
            {suit}
          </mesh>
          <mesh position={[0, -0.82, 0.04]}>
            <boxGeometry args={[0.22, 0.08, 0.32]} />
            <meshBasicMaterial color={NEON.pink} toneMapped={false} />
          </mesh>
        </group>
        <group ref={legR} position={[0.15, 0.85, 0]}>
          <mesh position-y={-0.42}>
            <boxGeometry args={[0.2, 0.84, 0.22]} />
            {suit}
          </mesh>
          <mesh position={[0, -0.82, 0.04]}>
            <boxGeometry args={[0.22, 0.08, 0.32]} />
            <meshBasicMaterial color={NEON.pink} toneMapped={false} />
          </mesh>
        </group>

        {/* Torso */}
        <mesh position-y={1.22}>
          <boxGeometry args={[0.6, 0.78, 0.34]} />
          <meshStandardMaterial color="#1A1530" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Jacket collar light strip */}
        <mesh position={[0, 1.22, 0.175]}>
          <boxGeometry args={[0.06, 0.7, 0.01]} />
          <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[0.62, 0.06, 0.36]} />
          <meshBasicMaterial color={NEON.cyan} toneMapped={false} />
        </mesh>

        {/* Arms (pivot at shoulder) */}
        <group ref={armL} position={[-0.39, 1.55, 0]}>
          <mesh position-y={-0.36}>
            <boxGeometry args={[0.16, 0.72, 0.18]} />
            {suit}
          </mesh>
        </group>
        <group ref={armR} position={[0.39, 1.55, 0]}>
          <mesh position-y={-0.36}>
            <boxGeometry args={[0.16, 0.72, 0.18]} />
            {suit}
          </mesh>
        </group>

        {/* Head + visor */}
        <mesh position-y={1.84}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#221B3A" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.87, 0.205]}>
          <boxGeometry args={[0.34, 0.1, 0.02]} />
          <meshBasicMaterial color={NEON.pink} toneMapped={false} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0.14, 2.14, -0.05]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22]} />
          <meshBasicMaterial color="#8E89AD" />
        </mesh>
        <mesh position={[0.14, 2.26, -0.05]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshBasicMaterial color={NEON.yellow} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
