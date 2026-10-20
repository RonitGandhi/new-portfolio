import { Reveal, SectionHeader } from "@/components/motion";
import { stackManifest } from "@/content";


export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="// stack.manifest" title="Skills" id="skills-title" />

        <dl className="border-b border-border">
          {stackManifest.map((section, i) => (
            <Reveal
              key={section.category}
              delay={i * 50}
              className="grid gap-4 border-t border-border py-8 md:grid-cols-[220px_1fr] md:gap-10 md:py-10"
            >
              <dt className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                {section.category}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <li
                      key={tag}
                      className="hairline rounded-full px-3.5 py-1.5 text-[0.9375rem] text-muted-foreground transition-colors duration-300 hover:text-foreground hover:shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.6)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
