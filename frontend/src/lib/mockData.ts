import { Lift, LiftRequest, Notification, ActivityLog, MaintenanceRecord, AnalyticsSummary } from "@/types";

export const mockLifts: Lift[] = Array.from({ length: 6 }, (_, i) => {
  const statuses: Lift["status"][] = ["moving", "idle", "moving", "maintenance", "moving", "emergency"];
  const directions: Lift["direction"][] = ["up", "idle", "down", "idle", "up", "idle"];
  return {
    id: `lift-${i + 1}`,
    liftNumber: i + 1,
    currentFloor: Math.floor(Math.random() * 12) + 1,
    targetFloor: statuses[i] === "idle" ? null : Math.floor(Math.random() * 12) + 1,
    direction: directions[i],
    status: statuses[i],
    occupancy: Math.floor(Math.random() * 8),
    capacity: 10,
    speed: 1.2,
    eta: statuses[i] === "idle" ? null : Math.floor(Math.random() * 30) + 5,
    emergency: statuses[i] === "emergency",
    maintenance: statuses[i] === "maintenance",
    requestQueue: [3, 7, 9].slice(0, Math.floor(Math.random() * 3)),
  };
});

export const mockRequests: LiftRequest[] = [
  { id: "req-1", pickupFloor: 3, destinationFloor: 9, direction: "up", assignedLift: 1, status: "in_progress", createdAt: new Date().toISOString() },
  { id: "req-2", pickupFloor: 7, destinationFloor: 2, direction: "down", assignedLift: null, status: "pending", createdAt: new Date().toISOString() },
  { id: "req-3", pickupFloor: 5, destinationFloor: 8, direction: "up", assignedLift: 3, status: "completed", createdAt: new Date().toISOString() },
];

export const mockNotifications: Notification[] = [
  { id: "n1", type: "emergency", title: "Lift 6 emergency activated", message: "Emergency stop triggered on floor 4.", read: false, createdAt: new Date().toISOString() },
  { id: "n2", type: "maintenance", title: "Lift 4 entered maintenance", message: "Scheduled maintenance started.", read: false, createdAt: new Date().toISOString() },
  { id: "n3", type: "warning", title: "Lift 2 occupancy high", message: "Occupancy exceeded 90%.", read: true, createdAt: new Date().toISOString() },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: "log1", action: "EMERGENCY_TRIGGERED", performedBy: "System", liftId: "lift-6", description: "Emergency triggered on Lift 6", timestamp: new Date().toISOString() },
  { id: "log2", action: "MAINTENANCE_STARTED", performedBy: "Admin", liftId: "lift-4", description: "Maintenance scheduled for Lift 4", timestamp: new Date().toISOString() },
];

export const mockMaintenanceRecords: MaintenanceRecord[] = mockLifts.map((l) => ({
  id: `maint-${l.liftNumber}`,
  liftId: l.id,
  liftNumber: l.liftNumber,
  riskScore: Math.floor(Math.random() * 100),
  lastService: new Date(Date.now() - Math.random() * 1e10).toISOString(),
  usageHours: Math.floor(Math.random() * 5000),
  breakdowns: Math.floor(Math.random() * 5),
}));

export const mockAnalyticsSummary: AnalyticsSummary = {
  totalLifts: mockLifts.length,
  activeLifts: mockLifts.filter((l) => l.status === "moving").length,
  maintenanceLifts: mockLifts.filter((l) => l.status === "maintenance").length,
  emergencyLifts: mockLifts.filter((l) => l.status === "emergency").length,
  passengersToday: 1284,
  averageWaitTime: 18.4,
  systemHealth: 94,
};