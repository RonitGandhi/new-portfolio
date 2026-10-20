import { useEffect, useMemo } from "react";
import Scene from "./Scene";
import Hud from "./Hud";
import Panel from "./Panel";
import Boot from "./Boot";
import { cam, closeSection, input, isTouch, openSection, player, ui, useUI } from "./store";

const MOVE_KEYS = new Set([
  "KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "ShiftLeft", "ShiftRight",
]);

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

export default function World({ onClassic }: { onClassic: () => void }) {
  const started = useUI((s) => s.started);
  const glLost = useUI((s) => s.glLost);
  const lite = useMemo(isTouch, []);
  const reducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const s = ui.get();
      if (e.code === "Escape") {
        if (s.open) closeSection();
        else if (s.target || input.walkTo) {
          input.walkTo = null;
          ui.set({ target: null });
        }
        return;
      }
      if (!s.started || s.open) return;
      if (MOVE_KEYS.has(e.code)) {
        input.keys.add(e.code);
        if (e.code.startsWith("Arrow")) e.preventDefault();
        return;
      }
      // Enter / Space only when nothing else has focus, so HUD buttons keep working
      const free = document.activeElement === document.body || document.activeElement === null;
      if (s.nearby && (e.code === "KeyF" || (free && (e.code === "Enter" || e.code === "Space")))) {
        e.preventDefault();
        openSection(s.nearby);
      }
    };
    const up = (e: KeyboardEvent) => input.keys.delete(e.code);
    const clear = () => input.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      clear();
    };
  }, []);

  // Hidden hook for automated screenshots: /?view=world&debug
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("debug")) {
      (window as unknown as Record<string, unknown>).__city = { player, cam, ui, input };
    }
  }, []);

  // Opening a panel drops any held movement keys
  useEffect(() => ui.subscribe(() => ui.get().open && input.keys.clear()), []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <Scene lite={lite} reducedMotion={reducedMotion} />
      {started && <Hud onClassic={onClassic} />}
      <Panel />
      {!started && <Boot onClassic={onClassic} />}
      {glLost && (
        <div role="alertdialog" aria-labelledby="gl-lost" className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4">
          <div className="hud-frame relative max-w-md p-7">
            <h2 id="gl-lost" className="font-hud text-xl text-primary">Signal lost</h2>
            <p className="mt-3 text-muted-foreground">Your browser paused the 3D graphics. Reload the city, or read everything in Classic view.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="hud-btn hud-btn-primary" onClick={() => window.location.reload()}>Reload city</button>
              <button type="button" className="hud-btn" onClick={onClassic}>Classic view</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
