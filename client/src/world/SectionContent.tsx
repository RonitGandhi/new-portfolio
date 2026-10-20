import type { ReactNode } from "react";
import { ArrowUpRight, GraduationCap, BookOpen, MapPin } from "lucide-react";
import {
  aboutFacts,
  aboutParagraphs,
  aboutStatement,
  contactLinks,
  contactLocation,
  education,
  experiences,
  openTo,
  projects,
  publications,
  research,
  stackManifest,
  type SectionId,
} from "@/content";
import { RichText } from "@/components/About";
import ContactForm from "@/components/ContactForm";
import { contactIcons } from "@/components/Contact";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const NewTab = () => <span className="sr-only">(opens in a new tab)</span>;

function Block({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative bg-foreground/[0.03] p-5 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.16)] ${className}`}>
      {children}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="bg-primary/[0.08] px-2.5 py-1 font-mono text-[0.8125rem] text-muted-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.2)]">
      {children}
    </li>
  );
}

function About() {
  return (
    <div className="space-y-6">
      <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">
        <RichText parts={aboutStatement} emClass="text-primary neon-glow" />
      </p>
      {aboutParagraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]">
          <RichText parts={p} />
        </p>
      ))}
      <ul className="flex flex-wrap gap-2">
        {aboutFacts.map((f) => (
          <Tag key={f}>{f}</Tag>
        ))}
      </ul>
      <div className="grid gap-3 sm:grid-cols-2">
        {education.map((ed) => (
          <Block key={ed.title}>
            <GraduationCap className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold">{ed.title}</h3>
            <p className="mt-1 font-mono text-[0.8125rem] text-subtle">{ed.meta}</p>
            <p className="mt-2 text-[0.9375rem] text-muted-foreground">{ed.body}</p>
          </Block>
        ))}
      </div>
      <Block className="shadow-[inset_0_0_0_1px_hsl(var(--primary-hi)/0.4)]">
        <BookOpen className="mb-3 h-5 w-5 text-primary-hi" aria-hidden="true" />
        <h3 className="font-semibold">{research.title}</h3>
        <p className="mt-1 font-mono text-[0.8125rem] text-subtle">{research.meta}</p>
        <a href={research.href} {...ext} className="mt-3 inline-flex min-h-11 items-center gap-1 font-medium text-primary-hi hover:underline">
          {research.label}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <NewTab />
        </a>
      </Block>
    </div>
  );
}

function Experience() {
  return (
    <ol className="space-y-5">
      {experiences.map((exp) => {
        const live = exp.status === "LIVE";
        return (
          <li key={exp.id}>
            <Block className={live ? "shadow-[inset_0_0_0_1px_hsl(var(--live)/0.5)]" : ""}>
              <p className={`font-mono text-[0.8125rem] tracking-wider ${live ? "text-live" : "text-subtle"}`}>
                {live ? "● LIVE" : "◎ ARCHIVED"}
                <span className="ml-3 text-subtle">{exp.duration}</span>
                <span className="ml-3 text-muted-foreground">{exp.period}</span>
              </p>
              <h3 className="mt-3 text-xl font-semibold">{exp.role}</h3>
              <p className="mt-1 text-primary">{exp.company}</p>
              <ul className="mt-4 space-y-2.5">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-shrink-0 bg-primary-hi" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {exp.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </ul>
            </Block>
          </li>
        );
      })}
    </ol>
  );
}

function Skills() {
  return (
    <dl className="space-y-5">
      {stackManifest.map((s) => (
        <Block key={s.category}>
          <dt className="font-hud text-sm text-primary">{s.category}</dt>
          <dd className="mt-3">
            <ul className="flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </ul>
          </dd>
        </Block>
      ))}
    </dl>
  );
}

function Projects() {
  const [featured, ...rest] = projects;
  return (
    <div className="space-y-4">
      <a href={featured.url} {...ext} className="group block">
        <Block className="shadow-[inset_0_0_0_1px_hsl(var(--primary-hi)/0.5)] transition-colors group-hover:bg-primary-hi/[0.06]">
          <img
            src="/assets/images/fortuneflow.png"
            alt="FortuneFlow home page: Plan Smart. Invest Better. Build Wealth."
            className="mb-4 aspect-[16/9] w-full object-cover object-top"
            loading="lazy"
          />
          <p className="font-mono text-[0.8125rem]">
            <span className="text-primary-hi">featured</span>
            <span className="ml-3 text-muted-foreground">{featured.category}</span>
            <span className="ml-3 text-subtle">{featured.date}</span>
          </p>
          <h3 className="font-hud mt-3 text-2xl">{featured.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{featured.description}</p>
          <span className="mt-3 inline-flex items-center gap-1 font-medium text-primary-hi">
            {featured.urlLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <NewTab />
          </span>
        </Block>
      </a>
      <ul className="grid gap-3 sm:grid-cols-2">
        {rest.map((p) => (
          <li key={p.id} className="flex">
            <a href={p.url} {...ext} className="group flex w-full">
              <Block className="flex w-full flex-col transition-colors group-hover:bg-primary/[0.06]">
                <p className="flex justify-between gap-2 font-mono text-[0.8125rem]">
                  <span className="text-primary">{p.category}</span>
                  <span className="text-subtle">{p.date}</span>
                </p>
                <h3 className="mt-3 font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-muted-foreground">{p.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[0.875rem] font-medium text-foreground group-hover:text-primary">
                  {p.urlLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <NewTab />
                </span>
              </Block>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Publications() {
  return (
    <ol className="space-y-4">
      {publications.map((pub, i) => (
        <li key={pub.id}>
          <Block>
            <p className="font-mono text-[0.8125rem]">
              <span className="text-subtle" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="ml-3 text-primary-hi">{pub.journal}</span>
              <span className="ml-3 text-subtle">{pub.date}</span>
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug">{pub.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{pub.description}</p>
            <a href={pub.doi} {...ext} className="mt-2 inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline">
              Read Publication
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">: {pub.title} (opens in a new tab)</span>
            </a>
          </Block>
        </li>
      ))}
    </ol>
  );
}

function Contact() {
  return (
    <div className="space-y-5">
      <Block className="shadow-[inset_0_0_0_1px_hsl(var(--live)/0.4)]">
        <h3 className="font-semibold">{openTo.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{openTo.body}</p>
      </Block>
      <Block>
        <h3 className="font-semibold">Connect With Me</h3>
        <ul className="mt-2">
          {contactLinks.map((l) => {
            const Icon = contactIcons[l.kind];
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? ext : {})}
                  className="flex min-h-11 items-center gap-3 break-all text-[0.9375rem] hover:text-primary"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                  {l.label}
                  {l.external && <NewTab />}
                </a>
              </li>
            );
          })}
          <li className="flex min-h-11 items-center gap-3 text-[0.9375rem]">
            <MapPin className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
            {contactLocation}
          </li>
        </ul>
      </Block>
      <Block>
        <ContactForm idPrefix="hud-" />
      </Block>
    </div>
  );
}

export const sectionContent: Record<SectionId, () => JSX.Element> = {
  about: About,
  experience: Experience,
  skills: Skills,
  projects: Projects,
  publications: Publications,
  contact: Contact,
};
