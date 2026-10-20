import type { CSSProperties } from "react";
import { GraduationCap, BookOpen, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader, trackSpotlight, useScrollProgress } from "@/components/motion";
import { aboutFacts, aboutParagraphs, aboutStatement, education, research, type Rich } from "@/content";

export function RichText({ parts, emClass = "text-foreground" }: { parts: Rich; emClass?: string }) {
  return (
    <>
      {parts.map((p, i) => (p.em ? <span key={i} className={emClass}>{p.text}</span> : <span key={i}>{p.text}</span>))}
    </>
  );
}

const words = aboutStatement.flatMap((seg) =>
  seg.text.split(" ").filter(Boolean).map((w) => ({ w, em: !!seg.em })),
);

export default function About() {
  const scrubRef = useScrollProgress<HTMLParagraphElement>("center");

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="// profile" title="About Me" id="about-title" />

        <p
          ref={scrubRef}
          className="text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.025em] sm:text-4xl md:text-[2.75rem] md:leading-[1.15]"
          style={{ "--n": words.length } as CSSProperties}
        >
          {words.map(({ w, em }, i) => (
            <span
              key={i}
              className={`scrub-word ${em ? "text-primary-hi" : "text-foreground"}`}
              style={{ "--i": i } as CSSProperties}
            >
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-20 grid items-start gap-14 md:mt-28 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div className="space-y-6">
            {aboutParagraphs.map((para, i) => (
              <Reveal as="p" key={i} delay={i * 80} className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                <RichText parts={para} />
              </Reveal>
            ))}

            <Reveal as="ul" delay={160} className="flex flex-wrap gap-2 pt-2">
              {aboutFacts.map((fact, i) => (
                <li key={fact} className="hairline flex items-center gap-2 rounded-full px-4 py-2">
                  {i === 0 && <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-live" aria-hidden="true" />}
                  <span className="font-mono text-[0.8125rem] text-muted-foreground">{fact}</span>
                </li>
              ))}
            </Reveal>
          </div>

          <div className="space-y-4">
            {education.map((ed, i) => (
              <Reveal key={ed.title} delay={i * 100} className="surface rounded-3xl p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 rounded-xl bg-primary/10 p-2.5">
                    <GraduationCap className="h-5 w-5 text-primary-hi" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">{ed.title}</h3>
                    <p className="mt-1 font-mono text-[0.8125rem] text-subtle">{ed.meta}</p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{ed.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={200}>
              <a
                href={research.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={trackSpotlight}
                className="spotlight surface group block rounded-3xl p-6 transition-transform duration-500 ease-apple hover:-translate-y-1 md:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 rounded-xl bg-primary/15 p-2.5">
                    <BookOpen className="h-5 w-5 text-primary-hi" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">{research.title}</h3>
                    <p className="mt-1 font-mono text-[0.8125rem] text-subtle">{research.meta}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-primary-hi">
                      {research.label}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </p>
                    <span className="sr-only">(opens in a new tab)</span>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
