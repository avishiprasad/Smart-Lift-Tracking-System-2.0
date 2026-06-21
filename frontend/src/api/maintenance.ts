import { mockMaintenanceRecords } from "@/lib/mockData";
import { MaintenanceRecord } from "@/lib/mockData"; // see note below

// No backend endpoint exists for maintenance records yet.
// Mocked in isolation per integration spec — swap this implementation
// once a real /api/maintenance endpoint is available.
export async function getMaintenanceRecords(): Promise<MaintenanceRecord[]> {
  return Promise.resolve(mockMaintenanceRecords);
}