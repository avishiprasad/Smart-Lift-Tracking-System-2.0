"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddLiftDialog({ onAdd }: { onAdd: (liftNumber: number, capacity: number) => void }) {
  const [open, setOpen] = useState(false);
  const [liftNumber, setLiftNumber] = useState("");
  const [capacity, setCapacity] = useState("10");

  function submit() {
    if (!liftNumber) return;
    onAdd(Number(liftNumber), Number(capacity));
    setLiftNumber("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-glow hover:bg-primary/90">
          <Plus className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Lift</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Lift Number</Label>
            <Input value={liftNumber} onChange={(e) => setLiftNumber(e.target.value)} type="number" className="border-border bg-background/60 text-white" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Capacity</Label>
            <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" className="border-border bg-background/60 text-white" />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-primary text-white hover:bg-primary/90" onClick={submit}>
            Add Lift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}