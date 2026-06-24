"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createLiftSchema,
  CreateLiftFormInput,
  CreateLiftFormValues,
} from "@/lib/validation/lift";

export function AddLiftDialog({
  onAdd,
}: {
  onAdd: (
    liftNumber: number,
    servingFloors: number[]
  ) => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(createLiftSchema),
    defaultValues: {
      liftNumber: 1,
      servingFloors: "1,2,3,4,5",
    },
  });

  function onSubmit(values: any) {
    onAdd(
      values.liftNumber,
      values.servingFloors
    );
  
    reset({
      liftNumber: 1,
      servingFloors: "1,2,3,4,5",
    });
  
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-glow hover:bg-primary/90">
          <Plus className="h-6 w-6" />
        </button>
      </DialogTrigger>

      <DialogContent className="border-border bg-card text-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            Add Lift
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              Lift Number
            </Label>

            <Input
              type="number"
              {...register("liftNumber", {
                valueAsNumber: true,
              })}
              className="border-border bg-background/60 text-white"
            />

            {errors.liftNumber && (
              <p className="text-xs text-danger">
                {String(errors.liftNumber.message)}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              Serving Floors (comma-separated)
            </Label>

            <Input
              {...register("servingFloors")}
              className="border-border bg-background/60 text-white"
            />

            {errors.servingFloors && (
              <p className="text-xs text-danger">
                {String(errors.servingFloors.message)}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              Add Lift
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}