const ActivityLog = require("../models/activityLog");

const logActivity = async ({
  action,
  lift,
  description,
  performedBy = "SYSTEM",
}) => {
  return await ActivityLog.create({
    action,
    lift,
    description,
    performedBy,
  });
};

const createMaintenanceLog = async ({
  lift,
  engineer,
  action,
}) => {
  return await ActivityLog.create({
    action,
    lift,
    performedBy: engineer,
    description: `${action} by ${engineer}`,
  });
};

const getAllLogs = async () => {
  return await ActivityLog.find()
    .populate("lift", "liftNumber")
    .sort({ createdAt: -1 });
};

module.exports = {
  logActivity,
  createMaintenanceLog,
  getAllLogs,
};