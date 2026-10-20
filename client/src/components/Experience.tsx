import { Reveal, SectionHeader, useScrollProgress } from "@/components/motion";
import { experiences } from "@/content";


export default function Experience() {
  const lineRef = useScrollProgress<HTMLDivElement>("center");

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="container-x">
        <SectionHeader eyebrow="// deployment.log" title="Experience" id="experience-title" />

        <div ref={lineRef} className="relative pl-8 md:pl-0">
          {/* Timeline: a quiet rail that fills with brass as you scroll */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px overflow-hidden bg-border md:left-[219px]"
          >
            <div className="timeline-fill absolute inset-0 bg-gradient-to-b from-primary-hi via-primary to-primary/0" />
          </div>

          <ol className="space-y-16 md:space-y-24">
            {experiences.map((exp) => {
              const live = exp.status === "LIVE";
              return (
                <li key={exp.id} className="relative md:grid md:grid-cols-[180px_1fr] md:gap-20">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 top-[0.45rem] h-[11px] w-[11px] rounded-full md:left-[214px] ${
                      live ? "live-dot" : "bg-background shadow-[inset_0_0_0_2px_hsl(var(--subtle))]"
                    }`}
                  />

                  {/* Sticky meta column on wide screens */}
                  <Reveal className="mb-4 md:sticky md:top-28 md:mb-0 md:self-start md:text-right">
                    <p
                      className={`font-mono text-[0.8125rem] font-medium tracking-wider ${
                        live ? "text-live" : "text-subtle"
                      }`}
                    >
                      {live ? "● LIVE" : "◎ ARCHIVED"}
                      <span className="ml-3 text-subtle">{exp.duration}</span>
                    </p>
                    <p className="mt-1.5 font-mono text-[0.8125rem] text-muted-foreground">{exp.period}</p>
                  </Reveal>

                  <div>
                    <Reveal as="h3" className="font-display text-[1.75rem] font-semibold leading-tight md:text-[2rem]">
                      {exp.role}
                    </Reveal>
                    <Reveal as="p" delay={60} className="mt-2 text-lg text-primary-hi">
                      {exp.company}
                    </Reveal>

                    <ul className="mt-6 space-y-3.5">
                      {exp.achievements.map((achievement, i) => (
                        <Reveal
                          as="li"
                          key={i}
                          delay={100 + i * 60}
                          className="flex gap-3.5 text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] h-1 w-1 flex-shrink-0 rounded-full bg-primary"
                          />
                          <span>{achievement}</span>
                        </Reveal>
                      ))}
                    </ul>

                    <Reveal as="ul" delay={200} className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                      {exp.stack.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-foreground/[0.05] px-3 py-1 font-mono text-[0.8125rem] text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
