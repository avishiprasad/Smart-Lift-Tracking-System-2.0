import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { QueueItem } from "@/types";
import { cn } from "@/lib/utils";

export function QueueChip({ item }: { item: QueueItem }) {
  const Icon = item.type === "PICKUP" ? ArrowUpFromLine : ArrowDownToLine;
  return (
    <span
      className={cn(
        "flex h-6 items-center gap-1 rounded-md border border-border bg-card/60 px-1.5 text-xs text-muted-foreground"
      )}
      title={item.type}
    >
      <Icon className="h-3 w-3" />
      {item.floor}
    </span>
  );
}