const Lift = require("../models/Lift");

const getNotifications = async () => {
  const notifications = [];

  const lifts = await Lift.find();

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

  return notifications;
};

module.exports = {
  getNotifications,
};
