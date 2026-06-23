"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarPlus } from "lucide-react";
import {
  createMaintenanceSchema,
  CreateMaintenanceFormInput,
  CreateMaintenanceFormValues,
} from "@/lib/validation/maintenance";
import { useCreateMaintenance } from "@/hooks/useAnalytics";

interface Props {
  liftId: string;
  liftNumber: number;
}

export function ScheduleMaintenanceDialog({ liftId, liftNumber }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: createMaintenance, isPending } = useCreateMaintenance();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMaintenanceFormInput, unknown, CreateMaintenanceFormValues>({
    resolver: zodResolver(createMaintenanceSchema),
    defaultValues: {
      lift: liftId,
      engineer: "",
      description: "",
      usageHours: 0,
      breakdowns: 0,
      lastServiceDate: "",
      nextServiceDate: "",
    },
  });

  function onSubmit(values: CreateMaintenanceFormValues) {
    createMaintenance(values, {
      onSuccess: () => {
        toast.success(`Maintenance scheduled for Lift ${liftNumber}`);
        reset();
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-full gap-2 border-border text-white hover:bg-white/5">
          <CalendarPlus className="h-3.5 w-3.5" /> Schedule Maintenance
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Maintenance — Lift {liftNumber}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input type="hidden" {...register("lift")} />

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Engineer</Label>
            <Input
              {...register("engineer")}
              placeholder="Engineer name"
              className="border-border bg-background/60 text-white"
            />
            {errors.engineer && (
              <p className="text-xs text-danger">{errors.engineer.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Input
              {...register("description")}
              placeholder="e.g. Quarterly Inspection"
              className="border-border bg-background/60 text-white"
            />
            {errors.description && (
              <p className="text-xs text-danger">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Usage Hours</Label>
              <Input
                type="number"
                {...register("usageHours")}
                className="border-border bg-background/60 text-white"
              />
              {errors.usageHours && (
                <p className="text-xs text-danger">{errors.usageHours.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Breakdowns</Label>
              <Input
                type="number"
                {...register("breakdowns")}
                className="border-border bg-background/60 text-white"
              />
              {errors.breakdowns && (
                <p className="text-xs text-danger">{errors.breakdowns.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Last Service Date</Label>
              <Input
                type="date"
                {...register("lastServiceDate")}
                className="border-border bg-background/60 text-white"
              />
              {errors.lastServiceDate && (
                <p className="text-xs text-danger">{errors.lastServiceDate.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Next Service Date</Label>
              <Input
                type="date"
                {...register("nextServiceDate")}
                className="border-border bg-background/60 text-white"
              />
              {errors.nextServiceDate && (
                <p className="text-xs text-danger">{errors.nextServiceDate.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {isPending ? "Saving…" : "Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}