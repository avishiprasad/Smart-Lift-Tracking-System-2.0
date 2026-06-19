import { cn } from "@/lib/utils";

function getRiskTone(score: number) {
  if (score >= 75) return { color: "text-danger", bg: "bg-danger", label: "Critical" };
  if (score >= 50) return { color: "text-warning", bg: "bg-warning", label: "Elevated" };
  if (score >= 25) return { color: "text-secondary", bg: "bg-secondary", label: "Moderate" };
  return { color: "text-success", bg: "bg-success", label: "Healthy" };
}

export function RiskIndicator({ score }: { score: number }) {
  const tone = getRiskTone(score);

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className={cn("font-medium", tone.color)}>{tone.label}</span>
        <span className="text-muted-foreground">{score}%</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background/60">
        <div className={cn("h-full rounded-full transition-all", tone.bg)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}