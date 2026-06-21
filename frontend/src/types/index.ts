export type LiftStatus = "IDLE" | "MOVING" | "MAINTENANCE" | "EMERGENCY";
export type Direction = "UP" | "DOWN" | "IDLE";
export type QueueItemType = "PICKUP" | "DROPOFF";
export type RequestStatus = "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type NotificationType = "warning" | "danger" | "info";
export type UserRole = "admin" | "maintenance" | "security";

export interface QueueItem {
  floor: number;
  type: QueueItemType;
  requestId: string;
}

export interface Lift {
  _id: string;
  liftNumber: number;
  servingFloors: number[];
  currentFloor: number;
  targetFloor: number | null;
  direction: Direction;
  status: LiftStatus;
  occupancy: number;
  eta: number | null;
  requestQueue: QueueItem[];
  createdAt: string;
  updatedAt: string;
}

export interface LiftRequest {
  _id: string;
  requestedFloor: number;
  destinationFloor: number;
  direction: Direction;
  assignedLift: string | null;
  status: RequestStatus;
  createdAt: string;
}

export interface Notification {
  type: NotificationType;
  title: string;
  message: string;
}

export interface ActivityLogLiftRef {
  _id: string;
  liftNumber: number;
}

export interface ActivityLog {
  _id: string;
  action: string;
  performedBy: string;
  lift: ActivityLogLiftRef | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  totalLifts: number;
  activeLifts: number;
  maintenanceLifts: number;
  emergencyLifts: number;
  avgOccupancy: string;
  avgETA: string;
  completedRequests: number;
  pendingRequests: number;
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

// Generic envelope every backend response follows
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}