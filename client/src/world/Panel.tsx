import { useEffect, useRef, type CSSProperties } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { sections, type SectionId } from "@/content";
import { closeSection, input, ui, useUI } from "./store";
import { doors } from "./districts";
import { sectionContent } from "./SectionContent";

/* District accents as HSL triplets for the CSS frame */
export const hudHsl: Record<SectionId, string> = {
  about: "186 100% 50%",
  experience: "186 100% 50%",
  projects: "326 100% 62%",
  skills: "57 98% 51%",
  publications: "254 100% 74%",
  contact: "151 100% 62%",
};

export function walkTo(id: SectionId) {
  input.walkTo = doors[id].clone();
  ui.set({ target: id, open: null });
}

export default function Panel() {
  const open = useUI((s) => s.open);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (!returnTo.current) returnTo.current = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });
    dialog.current?.querySelector("[data-scroll]")?.scrollTo({ top: 0 });
  }, [open]);

  useEffect(() => {
    if (open) return;
    const el = returnTo.current;
    returnTo.current = null;
    if (el && document.contains(el) && el !== document.body) el.focus({ preventScroll: true });
  }, [open]);

  if (!open) return null;

  const idx = sections.findIndex((s) => s.id === open);
  const sec = sections[idx];
  const prev = sections[(idx - 1 + sections.length) % sections.length];
  const next = sections[(idx + 1) % sections.length];
  const Content = sectionContent[open];

  // Keep Tab inside the dialog
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeSection();
      return;
    }
    if (e.key !== "Tab" || !dialog.current) return;
    const focusables = dialog.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex justify-end md:p-5">
      <div
        key={open}
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        onKeyDown={onKeyDown}
        className="hud-frame scanlines glitch-in pointer-events-auto relative flex h-full w-full flex-col md:max-w-[700px]"
        style={{ "--hud": hudHsl[open] } as CSSProperties}
      >
        <header
          className="flex items-start justify-between gap-4 px-6 pb-5 pt-6 md:px-8"
          style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
        >
          <div>
            <p className="eyebrow">{sec.eyebrow}</p>
            <h2
              id="panel-title"
              className="font-hud mt-2 text-3xl md:text-4xl"
              style={{ color: `hsl(${hudHsl[open]})`, textShadow: `0 0 18px hsl(${hudHsl[open]} / 0.55)` }}
            >
              {sec.title}
            </h2>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={closeSection}
            className="hud-btn -mr-2 h-11 w-11 justify-center px-0"
            aria-label="Close panel"
            title="Close (Esc)"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div data-scroll className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8 md:px-8">
          <Content />
        </div>

        <footer
          className="flex items-center justify-between gap-2 border-t border-primary/15 px-6 py-4 md:px-8"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <button type="button" className="hud-btn" onClick={() => walkTo(prev.id)}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Walk to </span>
            {prev.nav}
          </button>
          <button type="button" className="hud-btn" onClick={() => walkTo(next.id)}>
            <span className="sr-only">Walk to </span>
            {next.nav}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </div>
  );
}
