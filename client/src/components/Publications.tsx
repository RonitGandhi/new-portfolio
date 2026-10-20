import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/motion";
import { publications } from "@/content";


export default function Publications() {
  return (
    <section id="publications" aria-labelledby="publications-title" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="// publications" title="Publications" id="publications-title" />

        <ol className="border-b border-border">
          {publications.map((pub, index) => (
            <Reveal as="li" key={pub.id} delay={index * 60} className="border-t border-border">
              <article className="grid gap-4 py-10 md:grid-cols-[4rem_1fr] md:gap-8 md:py-14">
                <span aria-hidden="true" className="font-mono text-sm text-subtle md:pt-1.5">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.8125rem]">
                    <span className="text-primary-hi">{pub.journal}</span>
                    <span className="text-subtle">{pub.date}</span>
                  </p>

                  <h3 className="font-display mt-4 text-2xl font-semibold leading-[1.2] tracking-[-0.02em] md:text-[1.875rem]">
                    {pub.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
                    {pub.description}
                  </p>

                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-full text-[0.9375rem] font-medium text-primary-hi"
                  >
                    Read Publication
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">: {pub.title} (opens in a new tab)</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
