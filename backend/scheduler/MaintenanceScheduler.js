const MaintenanceRecord = require("../models/MaintenanceRecord");

const updateMaintenanceStatus = async () => {
  const today = new Date();

  await MaintenanceRecord.updateMany(
    {
      nextServiceDate: {
        $lt: today,
      },
      status: "SCHEDULED",
    },
    {
      status: "OVERDUE",
    }
  );
};

module.exports = {
  updateMaintenanceStatus,
};