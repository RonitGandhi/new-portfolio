import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader, trackSpotlight } from "@/components/motion";
import ContactForm from "@/components/ContactForm";
import { contactLinks, contactLocation, openTo } from "@/content";

export const contactIcons = { github: Github, linkedin: Linkedin, mail: Mail } as const;

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(50%_60%_at_50%_100%,hsl(var(--primary)/0.12),transparent_70%)]"
      />
      <div className="container-x relative">
        <SectionHeader eyebrow="// contact" title="Get In Touch" id="contact-title" />

        <div className="grid gap-5 md:grid-cols-5">
          <Reveal className="surface rounded-3xl p-6 sm:p-8 md:col-span-3 md:p-10">
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-5 md:col-span-2">
            <Reveal delay={100} className="surface rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.01em]">Connect With Me</h3>
              <ul className="mt-4 -mx-3 space-y-1">
                {contactLinks.map((l) => {
                  const Icon = contactIcons[l.kind];
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onMouseMove={trackSpotlight}
                        className="spotlight group flex min-h-12 items-center gap-3 rounded-2xl px-3 transition-colors hover:bg-foreground/[0.04]"
                      >
                        <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary-hi" aria-hidden="true" />
                        <span className="min-w-0 flex-1 break-words text-[0.9375rem]">{l.label}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 flex-shrink-0 text-subtle opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                        {l.external && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  );
                })}
                <li className="flex min-h-12 items-center gap-3 px-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-[0.9375rem]">{contactLocation}</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={180} className="flex-1 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/[0.07] to-transparent p-6 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)] sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.01em]">{openTo.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{openTo.body}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
