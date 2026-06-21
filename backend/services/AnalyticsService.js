const Lift = require("../models/Lift");
const LiftRequest = require("../models/LiftRequest");

const getAnalytics = async () => {
  const lifts = await Lift.find();

  const requests = await LiftRequest.find();

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
    (r) => r.status === "COMPLETED"
  ).length;

  const pendingRequests = requests.filter(
    (r) => r.status !== "COMPLETED"
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
  };
};

module.exports = {
  getAnalytics,
};