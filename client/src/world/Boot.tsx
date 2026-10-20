import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useProgress } from "@react-three/drei";
import { identity, sections } from "@/content";
import { isTouch, ui } from "./store";
import { Controls } from "./Hud";

/** Boot sequence shown while the city loads. Doubles as the controls tutorial. */
export default function Boot({ onClassic }: { onClassic: () => void }) {
  const { progress, active } = useProgress();
  const [minDone, setMinDone] = useState(false);
  const enterBtn = useRef<HTMLButtonElement>(null);
  const touch = isTouch();

  useEffect(() => {
    const t = setTimeout(() => setMinDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const ready = minDone && (!active || progress >= 100);

  useEffect(() => {
    if (ready) enterBtn.current?.focus();
  }, [ready]);

  const lines = [
    "> booting night_city.os",
    "> // init.identity ............ ok",
    ...sections.slice(1).map((s) => `> mounting ${s.eyebrow.replace("// ", "")} ...... ok`),
    `> welcome, visitor`,
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-title"
    >
      <div className="hud-frame scanlines relative w-full max-w-xl p-6 md:p-9">
        <ol className="space-y-1 font-mono text-[0.8125rem] text-muted-foreground" aria-hidden="true">
          {lines.map((l, i) => (
            <li key={i} className="boot-line" style={{ "--delay": `${i * 140}ms` } as CSSProperties}>
              {l}
            </li>
          ))}
        </ol>

        <h1 id="boot-title" className="font-hud neon-glow mt-7 text-3xl leading-tight text-foreground md:text-5xl">
          {identity.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{identity.role}</p>

        <div className="mt-6 border-t border-primary/20 pt-5">
          {touch ? (
            <p className="text-[0.875rem] text-muted-foreground">
              Use the joystick to walk, drag to look around, tap a building to walk there. Open the map for quick travel.
            </p>
          ) : (
            <Controls />
          )}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            ref={enterBtn}
            type="button"
            disabled={!ready}
            onClick={() => ui.set({ started: true })}
            className="hud-btn hud-btn-primary min-h-12 px-6 text-sm disabled:opacity-60"
          >
            {ready ? "Enter the city" : `Loading ${Math.round(progress)}%`}
          </button>
          <button type="button" onClick={onClassic} className="hud-btn min-h-12">
            Classic view
          </button>
        </div>
      </div>
    </div>
  );
}
