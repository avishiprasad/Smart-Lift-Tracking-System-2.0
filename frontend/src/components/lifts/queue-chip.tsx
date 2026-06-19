export function QueueChip({ floor }: { floor: number }) {
    return (
      <span className="flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-card/60 px-1.5 text-xs text-muted-foreground">
        {floor}
      </span>
    );
  }