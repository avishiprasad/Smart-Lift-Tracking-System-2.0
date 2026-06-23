import {
    getMaintenanceRecords,
    createMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
  } from "@/api/maintenance";
  import {
    MaintenanceRecord,
    CreateMaintenancePayload,
    UpdateMaintenancePayload,
  } from "@/types";
  
  export const MaintenanceService = {
    getAll: (): Promise<MaintenanceRecord[]> => getMaintenanceRecords(),
    create: (payload: CreateMaintenancePayload): Promise<MaintenanceRecord> =>
      createMaintenanceRecord(payload),
    update: (id: string, payload: UpdateMaintenancePayload): Promise<MaintenanceRecord> =>
      updateMaintenanceRecord(id, payload),
    remove: (id: string): Promise<void> => deleteMaintenanceRecord(id),
  };