"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, ListChecks } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { RequestStatusBadge } from "@/components/lifts/request-status-badge";
import { CreateRequestDialog } from "@/components/lifts/create-request-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequests, useCreateRequest } from "@/hooks/useRequests";
import { RequestStatus } from "@/types";
import { cn } from "@/lib/utils";

const FILTERS: { value: RequestStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function RequestsPage() {
  const { data: requests, isLoading } = useRequests();
  const { mutate: createRequest } = useCreateRequest();
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? requests : requests?.filter((r) => r.status === filter)),
    [requests, filter]
  );

  function handleCreate(requestedFloor: number, destinationFloor: number) {
    createRequest({ requestedFloor, destinationFloor });
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-white">Request Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Passenger lift requests across the building.</p>
          </div>
          <CreateRequestDialog onCreate={handleCreate} />
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as RequestStatus | "all")}>
          <TabsList className="bg-card/40">
            {FILTERS.map((f) => (
              <TabsTrigger key={f.value} value={f.value} className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-white">
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <Skeleton className="h-80 w-full rounded-2xl bg-card/40" />
        ) : !filtered?.length ? (
          <EmptyState icon={ListChecks} title="No requests found" description="Requests matching this filter will appear here." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-background/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Pickup</th>
                  <th className="px-5 py-3 font-medium">Destination</th>
                  <th className="px-5 py-3 font-medium">Direction</th>
                  <th className="px-5 py-3 font-medium">Assigned Lift</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-b border-border/60 last:border-0 hover:bg-white/5">
                    <td className="px-5 py-3 text-white">{r.requestedFloor}</td>
                    <td className="px-5 py-3 text-white">{r.destinationFloor}</td>
                    <td className="px-5 py-3">
                      <span className={cn("inline-flex items-center gap-1", r.direction === "UP" ? "text-success" : "text-secondary")}>
                        {r.direction === "UP" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
                        {r.direction}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{r.assignedLift ?? "—"}</td>
                    <td className="px-5 py-3"><RequestStatusBadge status={r.status} /></td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(r.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}