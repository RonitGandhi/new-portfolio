import * as THREE from "three";
import type { SectionId } from "@/content";

export type DistrictKind = "monument" | "tower" | "arcade" | "datacenter" | "archive" | "comms";

export type District = {
  id: SectionId;
  kind: DistrictKind;
  /** World x, z of the building centre. */
  at: [number, number];
  /** Footprint width, height, depth. */
  size: [number, number, number];
  color: string;
  /** Short code shown on the minimap. */
  code: string;
};

export const NEON = {
  cyan: "#00E5FF",
  pink: "#FF3CAC",
  yellow: "#FCEE0A",
  green: "#3DFFA2",
  violet: "#9D7BFF",
};

export const districts: District[] = [
  { id: "about", kind: "monument", at: [0, 0], size: [3.2, 3, 3.2], color: NEON.cyan, code: "ID" },
  { id: "experience", kind: "tower", at: [0, -21], size: [7, 28, 7], color: NEON.cyan, code: "EX" },
  { id: "projects", kind: "arcade", at: [20, -6], size: [13, 8, 7], color: NEON.pink, code: "PR" },
  { id: "skills", kind: "datacenter", at: [-20, -6], size: [11, 7, 8], color: NEON.yellow, code: "SK" },
  { id: "publications", kind: "archive", at: [-13, 17], size: [9, 10, 8], color: NEON.violet, code: "PB" },
  { id: "contact", kind: "comms", at: [13, 17], size: [5, 16, 5], color: NEON.green, code: "CT" },
];

export const PLAZA_RADIUS = 30;

/** Y rotation that turns a building's front (+z) toward the plaza centre. */
export function facing(d: District) {
  const [x, z] = d.at;
  if (x === 0 && z === 0) return 0;
  return Math.atan2(-x, -z);
}

/** Where the avatar stands to enter. */
export function doorPoint(d: District) {
  const [x, z] = d.at;
  if (d.kind === "monument") return new THREE.Vector3(0, 0, 3.4);
  const dir = new THREE.Vector2(-x, -z).normalize();
  const off = d.size[2] / 2 + 2.2;
  return new THREE.Vector3(x + dir.x * off, 0, z + dir.y * off);
}

/** Pushes a point out of every building footprint (rotated boxes) and keeps it inside the plaza. */
export function resolveCollision(p: THREE.Vector3, r = 0.45) {
  for (const d of districts) {
    const [x, z] = d.at;
    const wx = p.x - x;
    const wz = p.z - z;
    if (d.kind === "monument") {
      const min = 2.1 + r;
      const len = Math.hypot(wx, wz);
      if (len < min && len > 1e-4) {
        p.x = x + (wx / len) * min;
        p.z = z + (wz / len) * min;
      }
      continue;
    }
    const t = facing(d);
    const c = Math.cos(t);
    const s = Math.sin(t);
    let lx = wx * c - wz * s;
    let lz = wx * s + wz * c;
    const hx = d.size[0] / 2 + r;
    const hz = d.size[2] / 2 + r;
    if (Math.abs(lx) < hx && Math.abs(lz) < hz) {
      if (hx - Math.abs(lx) < hz - Math.abs(lz)) lx = Math.sign(lx || 1) * hx;
      else lz = Math.sign(lz || 1) * hz;
      p.x = x + lx * c + lz * s;
      p.z = z - lx * s + lz * c;
    }
  }
  const len = Math.hypot(p.x, p.z);
  if (len > PLAZA_RADIUS) {
    p.x *= PLAZA_RADIUS / len;
    p.z *= PLAZA_RADIUS / len;
  }
}

export const doors = Object.fromEntries(districts.map((d) => [d.id, doorPoint(d)])) as Record<
  SectionId,
  THREE.Vector3
>;

export const ENTER_RADIUS = 3;
