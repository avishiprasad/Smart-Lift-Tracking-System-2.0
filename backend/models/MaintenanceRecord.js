const mongoose = require("mongoose");

const maintenanceRecordSchema = new mongoose.Schema(
  {
    lift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lift",
      required: true,
    },

    engineer: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    usageHours: {
      type: Number,
      default: 0,
    },

    breakdowns: {
      type: Number,
      default: 0,
    },

    riskScore: {
      type: Number,
      default: 0,
    },

    lastServiceDate: {
      type: Date,
      default: Date.now,
    },

    nextServiceDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "SCHEDULED",
        "IN_PROGRESS",
        "COMPLETED",
        "OVERDUE",
      ],
      default: "SCHEDULED",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.MaintenanceRecord ||
  mongoose.model(
    "MaintenanceRecord",
    maintenanceRecordSchema
  );