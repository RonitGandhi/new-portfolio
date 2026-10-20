import { lazy, Suspense, useCallback, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Home from "@/pages/Home";

const World = lazy(() => import("@/world/World"));

type View = "world" | "classic";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function initialView(): View {
  const q = new URLSearchParams(window.location.search).get("view");
  if (q === "classic" || q === "world") return q === "world" && !supportsWebGL() ? "classic" : q;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("view");
  } catch {
    /* storage blocked */
  }
  if (saved === "classic") return "classic";
  if (!supportsWebGL()) return "classic";
  // People who asked their device for less motion start on the calm page
  if (saved !== "world" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "classic";
  return "world";
}

function WorldLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <p className="font-hud caret text-sm text-primary">Booting city</p>
    </div>
  );
}

function App() {
  const [view, setViewState] = useState<View>(initialView);

  const setView = useCallback((v: View) => {
    setViewState(v);
    try {
      localStorage.setItem("view", v);
    } catch {
      /* storage blocked */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("view", v);
    url.hash = "";
    window.history.replaceState(null, "", url);
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        {view === "world" ? (
          <Suspense fallback={<WorldLoading />}>
            <World onClassic={() => setView("classic")} />
          </Suspense>
        ) : (
          <Home onEnterWorld={supportsWebGL() ? () => setView("world") : undefined} />
        )}
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
