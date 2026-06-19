import { ArrowUpDown } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <ArrowUpDown className="h-4 w-4 text-white" />
          </div>
          <span className="text-white">Smart Lift Tracking System</span>
        </div>
        <p>Built as a real-time systems portfolio project.</p>
      </div>
    </footer>
  );
}