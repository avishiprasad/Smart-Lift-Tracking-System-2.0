import { ReactNode } from "react";

export function SettingsSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}