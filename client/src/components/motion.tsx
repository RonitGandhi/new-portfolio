import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

/* One shared observer for every reveal on the page. */
let revealObserver: IntersectionObserver | null = null;
function getRevealObserver() {
  if (revealObserver || typeof window === "undefined") return revealObserver;
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );
  return revealObserver;
}

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  delay?: number;
  children?: ReactNode;
};

/** Fades, rises and un-blurs its content the first time it scrolls into view. */
export function Reveal({ as = "div", delay = 0, className = "", style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const io = getRevealObserver();
    if (!el || !io) return;
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${className}`,
      style: { ...style, "--delay": `${delay}ms` } as CSSProperties,
      ...rest,
    },
    children,
  );
}

/* One shared scroll/resize loop for every progress-tracked element. */
type Tracked = { el: HTMLElement; mode: ProgressMode };
type ProgressMode = "leave" | "through" | "center";
const tracked = new Set<Tracked>();
let ticking = false;

function measure() {
  ticking = false;
  const vh = window.innerHeight;
  tracked.forEach(({ el, mode }) => {
    const r = el.getBoundingClientRect();
    let p: number;
    if (mode === "leave") {
      // 0 when the top of the element is at the top of the viewport, 1 when it has scrolled away
      p = -r.top / Math.max(r.height, 1);
    } else if (mode === "center") {
      // 0 when the element enters from below, 1 when its bottom reaches the middle of the screen
      p = (vh - r.top) / (r.height + vh * 0.5);
    } else {
      // 0 when the element enters, 1 when it leaves
      p = (vh - r.top) / (r.height + vh);
    }
    el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
  });
}

function schedule() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(measure);
  }
}

/**
 * Writes scroll progress (0..1) to a `--p` CSS variable on the element.
 * CSS does the rest, so nothing re-renders while scrolling.
 */
export function useScrollProgress<T extends HTMLElement>(mode: ProgressMode = "through") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    const entry = { el, mode };
    if (tracked.size === 0) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }
    tracked.add(entry);
    schedule();
    return () => {
      tracked.delete(entry);
      if (tracked.size === 0) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
  }, [mode]);

  return ref;
}

/** Moves the `.spotlight` light to follow the pointer. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Section header used across the page. */
export function SectionHeader({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal as="p" className="eyebrow mb-4">
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        id={id}
        delay={80}
        className="font-display text-[2.75rem] font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
      >
        {title}
      </Reveal>
    </header>
  );
}
