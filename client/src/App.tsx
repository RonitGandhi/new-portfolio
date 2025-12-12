import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Home from "@/pages/Home";

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Home />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;

