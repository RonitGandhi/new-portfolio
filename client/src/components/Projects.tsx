import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader, trackSpotlight, useScrollProgress } from "@/components/motion";
import { projects } from "@/content";


const featured = projects[0];
const rest = projects.slice(1);

export default function Projects() {
  const imgRef = useScrollProgress<HTMLDivElement>("through");

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-wide">
        <div className="mx-auto max-w-[980px]">
          <SectionHeader eyebrow="// projects" title="Projects" id="projects-title" />
        </div>

        {/* Featured */}
        <Reveal>
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={trackSpotlight}
            className="spotlight surface group relative grid overflow-hidden rounded-[2rem] lg:grid-cols-[1fr_1.15fr]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative flex flex-col p-8 sm:p-10 md:p-14">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-[0.8125rem] text-primary-hi">
                  featured
                </span>
                <span className="font-mono text-[0.8125rem] text-muted-foreground">{featured.category}</span>
                <span className="font-mono text-[0.8125rem] text-subtle">· {featured.date}</span>
              </div>

              <h3 className="font-display mt-8 text-5xl font-semibold leading-none md:text-6xl">
                {featured.title}
              </h3>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                {featured.description}
              </p>

              <span className="mt-10 inline-flex min-h-11 items-center gap-1.5 self-start text-base font-medium text-primary-hi lg:mt-auto lg:pt-10">
                {featured.urlLabel}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </div>

            {/* Product shot in a browser frame */}
            <div ref={imgRef} className="relative px-6 pb-0 sm:px-10 lg:py-14 lg:pl-0 lg:pr-0">
              <div className="overflow-hidden rounded-t-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-apple group-hover:-translate-y-2 lg:rounded-l-2xl lg:rounded-tr-none">
                <div className="flex h-8 items-center gap-1.5 bg-[#1C1E24] px-3.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <div className="aspect-[1227/860] overflow-hidden bg-[#e8f5ec]">
                  <img
                    src="/assets/images/fortuneflow.png"
                    alt="FortuneFlow home page: Plan Smart. Invest Better. Build Wealth."
                    loading="lazy"
                    decoding="async"
                    className="parallax-img h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Grid */}
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 2) * 90} className="flex">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={trackSpotlight}
                className="spotlight surface group flex w-full flex-col rounded-3xl p-7 transition-transform duration-500 ease-apple hover:-translate-y-1.5 md:p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[0.8125rem] text-primary-hi">{project.category}</span>
                  <span className="flex-shrink-0 font-mono text-[0.8125rem] text-subtle">{project.date}</span>
                </div>

                <h3 className="mt-6 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em]">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <span className="mt-8 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-foreground/90 transition-colors group-hover:text-primary-hi">
                  {project.urlLabel}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
