export type LiftStatus = "idle" | "moving" | "maintenance" | "emergency";
export type Direction = "up" | "down" | "idle";
export type UserRole = "admin" | "maintenance" | "security";

export interface Lift {
  id: string;
  liftNumber: number;
  currentFloor: number;
  targetFloor: number | null;
  direction: Direction;
  status: LiftStatus;
  occupancy: number;
  capacity: number;
  speed: number;
  eta: number | null;
  emergency: boolean;
  maintenance: boolean;
  requestQueue: number[];
}

export type RequestStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled";

export interface LiftRequest {
  id: string;
  pickupFloor: number;
  destinationFloor: number;
  direction: Direction;
  assignedLift: number | null;
  status: RequestStatus;
  createdAt: string;
}

export type NotificationType = "emergency" | "maintenance" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  performedBy: string;
  liftId: string | null;
  description: string;
  timestamp: string;
}

export interface MaintenanceRecord {
  id: string;
  liftId: string;
  liftNumber: number;
  riskScore: number;
  lastService: string;
  usageHours: number;
  breakdowns: number;
}

export interface AnalyticsSummary {
  totalLifts: number;
  activeLifts: number;
  maintenanceLifts: number;
  emergencyLifts: number;
  passengersToday: number;
  averageWaitTime: number;
  systemHealth: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface NavItem {
  label: string;
  href: string;
}