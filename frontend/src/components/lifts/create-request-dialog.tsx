"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateRequestDialog({ onCreate }: { onCreate: (pickup: number, destination: number) => void }) {
  const [open, setOpen] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  function submit() {
    if (!pickup || !destination) return;
    onCreate(Number(pickup), Number(destination));
    setPickup("");
    setDestination("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Create Request
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Lift Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Pickup Floor</Label>
            <Input value={pickup} onChange={(e) => setPickup(e.target.value)} type="number" className="border-border bg-background/60 text-white" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Destination Floor</Label>
            <Input value={destination} onChange={(e) => setDestination(e.target.value)} type="number" className="border-border bg-background/60 text-white" />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-primary text-white hover:bg-primary/90" onClick={submit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}