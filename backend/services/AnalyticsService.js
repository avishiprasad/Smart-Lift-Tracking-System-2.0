const Lift = require("../models/Lift");
const LiftRequest = require("../models/liftRequest");
const MaintenanceRecord = require("../models/MaintenanceRecord");

const getAnalytics = async () => {
  const lifts = await Lift.find();
  const requests = await LiftRequest.find();
  const maintenanceRecords = await MaintenanceRecord.find();

  const totalLifts = lifts.length;

  const activeLifts = lifts.filter(
    (lift) => lift.status !== "MAINTENANCE"
  ).length;

  const maintenanceLifts = lifts.filter(
    (lift) => lift.status === "MAINTENANCE"
  ).length;

  const emergencyLifts = lifts.filter(
    (lift) => lift.status === "EMERGENCY"
  ).length;

  const avgOccupancy =
    totalLifts === 0
      ? 0
      : (
          lifts.reduce((sum, lift) => sum + lift.occupancy, 0) /
          totalLifts
        ).toFixed(2);

  const avgETA =
    totalLifts === 0
      ? 0
      : (
          lifts.reduce((sum, lift) => sum + lift.eta, 0) /
          totalLifts
        ).toFixed(2);

  const completedRequests = requests.filter(
    (request) => request.status === "COMPLETED"
  ).length;

  const pendingRequests = requests.filter(
    (request) => request.status !== "COMPLETED"
  ).length;

  const maintenanceCount = maintenanceRecords.length;

  const averageRisk =
    maintenanceCount === 0
      ? 0
      : (
          maintenanceRecords.reduce(
            (sum, record) => sum + record.riskScore,
            0
          ) / maintenanceCount
        ).toFixed(2);

  const overdueMaintenance = maintenanceRecords.filter(
    (record) => record.status === "OVERDUE"
  ).length;

  return {
    totalLifts,
    activeLifts,
    maintenanceLifts,
    emergencyLifts,

    avgOccupancy,
    avgETA,

    completedRequests,
    pendingRequests,

    maintenanceCount,
    averageRisk,
    overdueMaintenance,
  };
};

module.exports = {
  getAnalytics,
};