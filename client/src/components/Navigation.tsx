import { useEffect, useRef, useState } from "react";
import { Box } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation({ onEnterWorld }: { onEnterWorld?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in the middle of the screen
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock page scroll, close on Escape, return focus to the toggle
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header
        className={`glass fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid
            ? "bg-background/70 shadow-[0_1px_0_0_hsl(0_0%_100%/0.08)] backdrop-blur-2xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav aria-label="Primary" className="container-wide flex h-14 items-center justify-between">
          <a
            href="#top"
            className="font-display -ml-2 inline-flex min-h-11 items-center rounded-full px-2 text-lg font-semibold transition-opacity hover:opacity-70"
            aria-label="Ronit Gandhi, back to top"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            RG<span className="text-primary">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 bottom-2 h-px origin-left bg-primary transition-transform duration-500 ease-apple ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
            {onEnterWorld && (
              <li className="ml-3">
                <button type="button" onClick={onEnterWorld} className="hud-btn">
                  <Box className="h-4 w-4" aria-hidden="true" />
                  Enter 3D City
                </button>
              </li>
            )}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {/* Two lines that morph into an X, like Apple's mobile nav */}
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-foreground transition-all duration-500 ease-apple ${
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-foreground transition-all duration-500 ease-apple ${
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[calc(100%-1.5px)]"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="glass fixed inset-0 z-40 bg-background/90 backdrop-blur-2xl md:hidden"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 4.5rem)" }}
        >
          <nav aria-label="Mobile" className="container-wide">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <li
                  key={item.name}
                  className="menu-item-in"
                  style={{ ["--delay" as string]: `${60 + i * 45}ms` }}
                >
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display flex min-h-14 items-center text-[1.75rem] font-semibold text-foreground/90 transition-colors hover:text-primary-hi"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              {onEnterWorld && (
                <li className="menu-item-in mt-6" style={{ ["--delay" as string]: "360ms" }}>
                  <button type="button" onClick={onEnterWorld} className="hud-btn hud-btn-primary min-h-12">
                    <Box className="h-4 w-4" aria-hidden="true" />
                    Enter 3D City
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
