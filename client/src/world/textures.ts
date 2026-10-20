import * as THREE from "three";

const cache = new Map<string, THREE.CanvasTexture>();

/** Seeded random so the city looks the same on every visit. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Dark facade with a grid of lit windows in the given neon palette. */
export function windowTexture(key: string, palette: string[], density = 0.35, seed = 7) {
  const hit = cache.get(key);
  if (hit) return hit;
  const cols = 8;
  const rows = 24;
  const cw = 16;
  const ch = 12;
  const canvas = document.createElement("canvas");
  canvas.width = cols * cw;
  canvas.height = rows * ch;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const rand = rng(seed);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rand() > density) continue;
      const c = palette[Math.floor(rand() * palette.length)];
      ctx.globalAlpha = 0.35 + rand() * 0.65;
      ctx.fillStyle = c;
      ctx.fillRect(x * cw + 3, y * ch + 3, cw - 6, ch - 5);
    }
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  cache.set(key, tex);
  return tex;
}
