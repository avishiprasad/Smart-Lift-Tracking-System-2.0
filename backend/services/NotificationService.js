const Lift = require("../models/lift");
const MaintenanceRecord = require("../models/MaintenanceRecord");

const getNotifications = async () => {
  const notifications = [];

  const lifts = await Lift.find();

  const maintenance =
    await MaintenanceRecord.find().populate(
      "lift",
      "liftNumber"
    );

  // Lift Notifications
  lifts.forEach((lift) => {
    if (lift.status === "EMERGENCY") {
      notifications.push({
        type: "danger",
        title: "Emergency",
        message: `Lift ${lift.liftNumber} is in emergency mode.`,
      });
    }

    if (lift.status === "MAINTENANCE") {
      notifications.push({
        type: "warning",
        title: "Maintenance",
        message: `Lift ${lift.liftNumber} is under maintenance.`,
      });
    }

    if (lift.occupancy >= 8) {
      notifications.push({
        type: "info",
        title: "High Occupancy",
        message: `Lift ${lift.liftNumber} occupancy is ${lift.occupancy}.`,
      });
    }
  });

  // Maintenance Notifications
  maintenance.forEach((record) => {
    if (record.status === "OVERDUE") {
      notifications.push({
        type: "danger",
        title: "Maintenance Overdue",
        message: `Lift ${record.lift.liftNumber} maintenance is overdue.`,
      });
    }

    if (record.status === "IN_PROGRESS") {
      notifications.push({
        type: "info",
        title: "Maintenance Running",
        message: `Lift ${record.lift.liftNumber} is currently being serviced.`,
      });
    }
  });

  return notifications;
};

module.exports = {
  getNotifications,
};