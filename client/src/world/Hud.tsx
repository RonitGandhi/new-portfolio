import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, LayoutList, Map as MapIcon, X } from "lucide-react";
import { identity, sections } from "@/content";
import { districts, PLAZA_RADIUS } from "./districts";
import { cam, input, isTouch, openSection, player, ui, useUI } from "./store";
import { hudHsl, walkTo } from "./Panel";

const nameOf = (id: string) => sections.find((s) => s.id === id)!.nav;

function Minimap({ size }: { size: number }) {
  const arrow = useRef<SVGGElement>(null);
  const view = useRef<SVGPathElement>(null);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const deg = (-player.heading * 180) / Math.PI;
      arrow.current?.setAttribute("transform", `translate(${player.pos.x} ${player.pos.z}) rotate(${deg})`);
      const camDeg = (-cam.yaw * 180) / Math.PI + 180;
      view.current?.setAttribute("transform", `translate(${player.pos.x} ${player.pos.z}) rotate(${camDeg})`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const R = PLAZA_RADIUS + 2;
  return (
    <svg viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`} width={size} height={size} aria-hidden="true" className="block">
      <defs>
        <radialGradient id="cone" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(12)">
          <stop offset="0" stopColor="#00E5FF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r={PLAZA_RADIUS} fill="hsl(249 37% 4% / 0.6)" stroke="#FF3CAC" strokeOpacity="0.6" strokeWidth="0.4" />
      {[10, 20].map((r) => (
        <circle key={r} r={r} fill="none" stroke="#2B2642" strokeWidth="0.25" strokeDasharray="1 1.5" />
      ))}
      <path ref={view} d="M0 0 L-5 12 A13 13 0 0 0 5 12 Z" fill="url(#cone)" />
      {districts.map((d) => (
        <g key={d.id} transform={`translate(${d.at[0]} ${d.at[1]})`}>
          <rect x={-2.6} y={-2.6} width={5.2} height={5.2} fill="none" stroke={d.color} strokeWidth="0.6" />
          <text y={1.3} textAnchor="middle" fontSize="3.4" fill={d.color} fontFamily="Orbitron, sans-serif" fontWeight={700}>
            {d.code}
          </text>
        </g>
      ))}
      <g ref={arrow}>
        <path d="M0 2.6 L1.9 -1.8 L0 -0.8 L-1.9 -1.8 Z" fill="#F2F0FF" stroke="#00E5FF" strokeWidth="0.4" />
      </g>
    </svg>
  );
}

function Districts({ onPick }: { onPick?: () => void }) {
  const visited = useUI((s) => s.visited);
  const target = useUI((s) => s.target);
  const nearby = useUI((s) => s.nearby);
  return (
    <nav aria-label="Districts">
      <div className="mb-2 flex items-center justify-between font-mono text-[0.75rem] text-muted-foreground">
        <span>EXPLORED</span>
        <span>
          {visited.length}/{sections.length}
        </span>
      </div>
      <div className="mb-3 h-1 bg-foreground/10" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-hi transition-[width] duration-700"
          style={{ width: `${(visited.length / sections.length) * 100}%` }}
        />
      </div>
      <ul className="space-y-1">
        {districts.map((d) => {
          const done = visited.includes(d.id);
          const going = target === d.id;
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => {
                  onPick?.();
                  if (nearby === d.id) openSection(d.id);
                  else walkTo(d.id);
                }}
                className="group flex min-h-11 w-full items-center gap-3 px-2 text-left text-[0.875rem] transition-colors hover:bg-foreground/[0.06]"
                aria-label={`${nearby === d.id ? "Enter" : "Walk to"} ${nameOf(d.id)}${done ? ", visited" : ""}`}
              >
                <span
                  className="w-7 font-mono text-[0.75rem] font-medium"
                  style={{ color: d.color }}
                  aria-hidden="true"
                >
                  {d.code}
                </span>
                <span className={`flex-1 ${going ? "text-primary" : "text-foreground"}`}>
                  {nameOf(d.id)}
                  {going && <span className="ml-2 font-mono text-[0.75rem] text-primary">EN ROUTE</span>}
                </span>
                {done && <Check className="h-4 w-4 text-live" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Joystick() {
  const base = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const R = 46;
  const set = (x: number, y: number) => {
    input.joy.x = x / R;
    input.joy.y = y / R;
    if (knob.current) knob.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!base.current?.hasPointerCapture(e.pointerId)) return;
    const r = base.current.getBoundingClientRect();
    let x = e.clientX - (r.left + r.width / 2);
    let y = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(x, y);
    if (len > R) {
      x = (x / len) * R;
      y = (y / len) * R;
    }
    set(x, y);
  };
  return (
    <div
      ref={base}
      aria-hidden="true"
      className="pointer-events-auto relative flex h-32 w-32 touch-none items-center justify-center rounded-full bg-background/40 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.5),0_0_24px_hsl(var(--primary)/0.2)] backdrop-blur"
      onPointerDown={(e) => {
        e.stopPropagation();
        base.current?.setPointerCapture(e.pointerId);
        onMove(e);
      }}
      onPointerMove={onMove}
      onPointerUp={() => set(0, 0)}
      onPointerCancel={() => set(0, 0)}
    >
      <div ref={knob} className="h-14 w-14 rounded-full bg-primary/30 shadow-[inset_0_0_0_2px_hsl(var(--primary)),0_0_18px_hsl(var(--primary)/0.6)]" />
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-6 items-center justify-center px-1.5 py-0.5 font-mono text-[0.75rem] text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.5)]">
      {children}
    </kbd>
  );
}

export function Controls() {
  return (
    <ul className="space-y-1.5 text-[0.8125rem] text-muted-foreground">
      <li className="flex items-center gap-2">
        <Kbd>W</Kbd>
        <Kbd>A</Kbd>
        <Kbd>S</Kbd>
        <Kbd>D</Kbd>
        <span>or arrows to move</span>
      </li>
      <li className="flex items-center gap-2">
        <Kbd>Shift</Kbd>
        <span>run</span>
        <Kbd>Q</Kbd>
        <Kbd>E</Kbd>
        <span>turn camera</span>
      </li>
      <li className="flex items-center gap-2">
        <Kbd>F</Kbd>
        <span>enter a building</span>
        <Kbd>Esc</Kbd>
        <span>close</span>
      </li>
      <li>Drag to look around · scroll to zoom · click anywhere to walk there</li>
    </ul>
  );
}

export default function Hud({ onClassic }: { onClassic: () => void }) {
  const nearby = useUI((s) => s.nearby);
  const target = useUI((s) => s.target);
  const open = useUI((s) => s.open);
  const touch = isTouch();
  const [mapOpen, setMapOpen] = useState(false);

  const prompt = !open && nearby && !target;

  return (
    <div className="pointer-events-none fixed inset-0 z-30" style={{ padding: "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)" }}>
      {/* Screen reader updates */}
      <p className="sr-only" aria-live="polite">
        {open ? "" : target ? `Walking to ${nameOf(target)}.` : nearby ? `At ${nameOf(nearby)}. Press F to enter.` : ""}
      </p>

      {/* Identity card */}
      <div className="hud-frame scanlines pointer-events-auto absolute left-3 top-3 max-w-[calc(100%-9rem)] px-4 py-3 md:left-5 md:top-5 md:max-w-sm md:px-5 md:py-4">
        <p className="eyebrow hidden md:block">// init.identity</p>
        <h1 className="font-hud neon-glow text-base text-foreground md:mt-1 md:text-xl">{identity.name}</h1>
        <p className="mt-1 flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-live shadow-[0_0_8px_hsl(var(--live))]" aria-hidden="true" />
          {identity.role}
        </p>
        <p className="mt-2 hidden text-[0.8125rem] leading-relaxed text-subtle md:block">{identity.tagline}</p>
      </div>

      {/* Top-right actions */}
      <div className="pointer-events-auto absolute right-3 top-3 flex gap-2 md:right-5 md:top-5">
        {touch && (
          <button type="button" className="hud-btn h-11 w-11 justify-center px-0" aria-expanded={mapOpen} aria-label={mapOpen ? "Hide map" : "Show map"} onClick={() => setMapOpen((v) => !v)}>
            {mapOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <MapIcon className="h-5 w-5" aria-hidden="true" />}
          </button>
        )}
        <button type="button" className="hud-btn" onClick={onClassic}>
          <LayoutList className="h-4 w-4" aria-hidden="true" />
          <span className={touch ? "sr-only" : ""}>Classic view</span>
        </button>
      </div>

      {/* Minimap + districts */}
      {(!touch || mapOpen) && (
        <div
          className="hud-frame scanlines pointer-events-auto absolute right-3 top-[4.25rem] w-[min(15rem,calc(100%-1.5rem))] p-4 md:right-5 md:top-[5rem]"
        >
          <div className="mb-3 flex justify-center">
            <Minimap size={176} />
          </div>
          <Districts onPick={() => setMapOpen(false)} />
        </div>
      )}

      {/* Bottom: controls, joystick, prompt */}
      {!touch && (
        <div className="hud-frame pointer-events-auto absolute bottom-5 left-5 hidden px-4 py-3 lg:block">
          <Controls />
        </div>
      )}
      {touch && !open && (
        <div className="absolute bottom-5 left-5" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
          <Joystick />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-6 flex justify-center px-4 max-md:bottom-[10.5rem] md:bottom-8">
        {prompt && (
          <button
            type="button"
            onClick={() => openSection(nearby!)}
            className="hud-btn prompt-pulse pointer-events-auto min-h-12 bg-background/80 px-5 text-sm"
            style={{ "--primary": hudHsl[nearby!] } as CSSProperties}
          >
            {!touch && <Kbd>F</Kbd>}
            Enter {nameOf(nearby!)}
          </button>
        )}
        {!open && target && (
          <p className="hud-frame pointer-events-auto relative flex min-h-11 items-center gap-3 px-4 font-mono text-[0.8125rem] text-primary">
            <span className="caret">Walking to {nameOf(target)}</span>
            <button
              type="button"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              onClick={() => {
                input.walkTo = null;
                ui.set({ target: null });
              }}
            >
              Cancel
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
