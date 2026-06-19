"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { SettingsSection } from "@/components/dashboard/settings-section";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [building, setBuilding] = useState({ totalFloors: 12, travelTimePerFloor: 3, doorOpenTime: 4 });
  const [emergencyContact, setEmergencyContact] = useState({ name: "", phone: "" });
  const [notifPrefs, setNotifPrefs] = useState({ emergency: true, maintenance: true, occupancy: false });
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState("en");

  function save() {
    toast("Settings saved");
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Configure building parameters and preferences.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SettingsSection title="Building Configuration" description="Physical parameters used in ETA calculations.">
            <Field label="Total Floors">
              <Input
                type="number"
                value={building.totalFloors}
                onChange={(e) => setBuilding((b) => ({ ...b, totalFloors: Number(e.target.value) }))}
                className="border-border bg-background/60 text-white"
              />
            </Field>
            <Field label="Travel Time Per Floor (s)">
              <Input
                type="number"
                value={building.travelTimePerFloor}
                onChange={(e) => setBuilding((b) => ({ ...b, travelTimePerFloor: Number(e.target.value) }))}
                className="border-border bg-background/60 text-white"
              />
            </Field>
            <Field label="Door Open Time (s)">
              <Input
                type="number"
                value={building.doorOpenTime}
                onChange={(e) => setBuilding((b) => ({ ...b, doorOpenTime: Number(e.target.value) }))}
                className="border-border bg-background/60 text-white"
              />
            </Field>
          </SettingsSection>

          <SettingsSection title="Emergency Contacts" description="Notified immediately when an emergency is triggered.">
            <Field label="Contact Name">
              <Input
                value={emergencyContact.name}
                onChange={(e) => setEmergencyContact((c) => ({ ...c, name: e.target.value }))}
                className="border-border bg-background/60 text-white"
              />
            </Field>
            <Field label="Phone Number">
              <Input
                value={emergencyContact.phone}
                onChange={(e) => setEmergencyContact((c) => ({ ...c, phone: e.target.value }))}
                className="border-border bg-background/60 text-white"
              />
            </Field>
          </SettingsSection>

          <SettingsSection title="Notification Preferences">
            <Toggle label="Emergency Alerts" checked={notifPrefs.emergency} onChange={(v) => setNotifPrefs((p) => ({ ...p, emergency: v }))} />
            <Toggle label="Maintenance Alerts" checked={notifPrefs.maintenance} onChange={(v) => setNotifPrefs((p) => ({ ...p, maintenance: v }))} />
            <Toggle label="Occupancy Alerts" checked={notifPrefs.occupancy} onChange={(v) => setNotifPrefs((p) => ({ ...p, occupancy: v }))} />
          </SettingsSection>

          <SettingsSection title="Appearance & Language">
            <Field label="Theme">
              <div className="flex gap-2">
                {(["dark", "light"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={cn(
                      "flex-1 rounded-xl border px-3 py-2 text-sm capitalize transition-colors",
                      theme === t ? "border-primary/50 bg-primary/10 text-white" : "border-border text-muted-foreground hover:bg-white/5"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Language">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-white"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="hi">हिन्दी</option>
              </select>
            </Field>
          </SettingsSection>
        </div>

        <Button className="bg-primary text-white hover:bg-primary/90" onClick={save}>
          Save Changes
        </Button>
      </div>
    </DashboardShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={cn("relative h-6 w-11 rounded-full transition-colors", checked ? "bg-primary" : "bg-card")}
      >
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
      </button>
    </div>
  );
}