const MaintenanceRecord = require("../models/MaintenanceRecord");
const Lift = require("../models/Lift");

const {
  logActivity,
} = require("./ActivityLogService");

const calculateRisk = ({
  usageHours,
  breakdowns,
  lastServiceDate,
}) => {
  const days =
    Math.floor(
      (Date.now() -
        new Date(lastServiceDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

  let score =
    usageHours * 0.5 +
    breakdowns * 10 +
    days * 0.2;

  score = Math.min(100, Math.round(score));

  return score;
};

const getAllMaintenance = async () => {
  return await MaintenanceRecord.find()
    .populate("lift", "liftNumber")
    .sort({
      nextServiceDate: 1,
    });
};

const createMaintenance = async (body) => {
  const lift = await Lift.findById(body.lift);

  if (!lift)
    throw new Error("Lift not found.");

  const riskScore =
    calculateRisk({
      usageHours:
        body.usageHours || 0,

      breakdowns:
        body.breakdowns || 0,

      lastServiceDate:
        body.lastServiceDate || new Date(),
    });

  const record =
    await MaintenanceRecord.create({
      ...body,
      riskScore,
    });

  lift.status = "MAINTENANCE";

  await lift.save();

  await logActivity({
    action: "MAINTENANCE",
    lift: lift._id,
    description: `Maintenance scheduled for Lift ${lift.liftNumber}`,
    performedBy:
      body.engineer,
  });

  return record.populate(
    "lift",
    "liftNumber"
  );
};

const updateMaintenance = async (
  id,
  body
) => {
  const record =
    await MaintenanceRecord.findById(id);

  if (!record)
    throw new Error(
      "Maintenance record not found."
    );

  if (
    body.usageHours !== undefined ||
    body.breakdowns !== undefined ||
    body.lastServiceDate
  ) {
    record.riskScore =
      calculateRisk({
        usageHours:
          body.usageHours ??
          record.usageHours,

        breakdowns:
          body.breakdowns ??
          record.breakdowns,

        lastServiceDate:
          body.lastServiceDate ??
          record.lastServiceDate,
      });
  }

  Object.assign(record, body);

  await record.save();

  return record.populate(
    "lift",
    "liftNumber"
  );
};

const deleteMaintenance =
  async (id) => {
    const record =
      await MaintenanceRecord.findById(id);

    if (!record)
      throw new Error(
        "Maintenance record not found."
      );

    const lift =
      await Lift.findById(
        record.lift
      );

    if (lift) {
      lift.status = "IDLE";

      await lift.save();
    }

    await MaintenanceRecord.findByIdAndDelete(
      id
    );

    return true;
  };

module.exports = {
  getAllMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
  calculateRisk,
};