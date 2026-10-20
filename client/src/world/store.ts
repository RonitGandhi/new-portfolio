import { useSyncExternalStore } from "react";
import * as THREE from "three";
import type { SectionId } from "@/content";

/* Mutable per-frame state: read and written inside useFrame, never triggers React renders. */
export const player = {
  pos: new THREE.Vector3(0, 0, 10),
  heading: Math.PI, // radians, 0 = facing +z
  speed: 0,
};

export const cam = { yaw: 0, pitch: 0.34, dist: 11.5 };

export const input = {
  keys: new Set<string>(),
  joy: { x: 0, y: 0 },
  /** Ground point or door the avatar is walking to on its own. */
  walkTo: null as THREE.Vector3 | null,
};

/* UI state: small, changes rarely, drives the HUD. */
type UI = {
  started: boolean;
  /** The browser dropped the 3D context (driver reset, memory pressure). */
  glLost: boolean;
  nearby: SectionId | null;
  open: SectionId | null;
  /** District the avatar is auto-walking to; opens on arrival. */
  target: SectionId | null;
  visited: SectionId[];
};

let state: UI = { started: false, glLost: false, nearby: null, open: null, target: null, visited: [] };
const subs = new Set<() => void>();

export const ui = {
  get: () => state,
  set(patch: Partial<UI>) {
    state = { ...state, ...patch };
    subs.forEach((f) => f());
  },
  subscribe(f: () => void) {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};

export function useUI<T>(select: (s: UI) => T): T {
  return useSyncExternalStore(ui.subscribe, () => select(state));
}

export function openSection(id: SectionId) {
  const visited = state.visited.includes(id) ? state.visited : [...state.visited, id];
  input.walkTo = null;
  ui.set({ open: id, target: null, visited });
}

export function closeSection() {
  ui.set({ open: null });
}

export const isTouch = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
