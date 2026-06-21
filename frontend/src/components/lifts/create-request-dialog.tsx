"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRequestSchema, CreateRequestFormValues } from "@/lib/validation/request";

export function CreateRequestDialog({ onCreate }: { onCreate: (requestedFloor: number, destinationFloor: number) => void }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRequestFormValues>({
    resolver: zodResolver(createRequestSchema),
  });

  function onSubmit(values: CreateRequestFormValues) {
    onCreate(values.requestedFloor, values.destinationFloor);
    reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Pickup Floor</Label>
            <Input type="number" {...register("requestedFloor")} className="border-border bg-background/60 text-white" />
            {errors.requestedFloor && <p className="text-xs text-danger">{errors.requestedFloor.message}</p>}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Destination Floor</Label>
            <Input type="number" {...register("destinationFloor")} className="border-border bg-background/60 text-white" />
            {errors.destinationFloor && <p className="text-xs text-danger">{errors.destinationFloor.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}