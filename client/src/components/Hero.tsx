import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useScrollProgress } from "@/components/motion";
import { stackChips } from "@/content";


const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  const ref = useScrollProgress<HTMLElement>("leave");

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      {/* Fine grid that fades out toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)]"
      />

      <div className="hero-recede container-x relative pb-24 pt-32 text-center">
        <p className="eyebrow rise-in mb-8 select-none" style={d(0)}>
          // init.identity
        </p>

        <h1
          id="hero-title"
          className="font-display rise-in text-gradient-neon mx-auto font-semibold leading-[0.92] [font-size:clamp(2.75rem,0.5rem+9vw,7.5rem)]"
          style={d(120)}
        >
          Ronit
          <br />
          Gandhi
        </h1>

        <div className="rise-in mt-10 flex items-center justify-center gap-3" style={d(300)}>
          <span className="live-dot h-2 w-2 flex-shrink-0 rounded-full" aria-hidden="true" />
          <span className="text-base font-medium text-foreground md:text-lg">
            AI Platform Engineer @ Exo Imaging Inc.
          </span>
        </div>

        <p
          className="rise-in mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={d(420)}
        >
          Building scalable backends and AI integrations for hospital-facing medical imaging systems. M.S. Statistics, Rutgers.
        </p>

        <ul
          className="rise-in mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2"
          style={d(540)}
          aria-label="Core stack"
        >
          {stackChips.map((tag) => (
            <li
              key={tag}
              className="hairline rounded-full bg-foreground/[0.03] px-3.5 py-1.5 font-mono text-[0.8125rem] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="rise-in mt-12 flex flex-wrap items-center justify-center gap-3" style={d(660)}>
          <a href="#experience" className={buttonVariants({ size: "lg" })}>
            View Work
          </a>
          <a href="#contact" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Get In Touch
          </a>
        </div>
      </div>

      <div className="rise-in absolute inset-x-0 bottom-8 flex justify-center" style={d(1000)}>
        <a
          href="#about"
          aria-label="Scroll to About"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-subtle transition-colors hover:text-foreground"
        >
          <ArrowDown className="h-5 w-5 motion-safe:animate-bounce" />
        </a>
      </div>
    </section>
  );
}
