"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarPlus } from "lucide-react";
import { scheduleMaintenanceSchema, ScheduleMaintenanceFormValues } from "@/lib/validation/maintenance";

export function ScheduleMaintenanceDialog({ liftId, liftNumber }: { liftId: string; liftNumber: number }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleMaintenanceFormValues>({
    resolver: zodResolver(scheduleMaintenanceSchema),
    defaultValues: { liftId, scheduledDate: "", notes: "" },
  });

  function onSubmit() {
    // No backend endpoint exists for scheduling maintenance yet.
    // Validated client-side per spec; persistence is a no-op until the API exists.
    toast(`Maintenance noted for Lift ${liftNumber} (not yet persisted — no backend endpoint)`);
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-full gap-2 border-border text-white hover:bg-white/5">
          <CalendarPlus className="h-3.5 w-3.5" /> Schedule Maintenance
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Schedule Maintenance — Lift {liftNumber}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Date</Label>
            <Input type="date" {...register("scheduledDate")} className="border-border bg-background/60 text-white" />
            {errors.scheduledDate && <p className="text-xs text-danger">{errors.scheduledDate.message}</p>}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Notes (optional)</Label>
            <Input {...register("notes")} className="border-border bg-background/60 text-white" />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}