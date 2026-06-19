const mongoose = require("mongoose");

const liftSchema = new mongoose.Schema(
  {
    liftNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    currentFloor: {
      type: Number,
      default: 0,
    },

    targetFloor: {
      type: Number,
      default: 0,
    },

    direction: {
      type: String,
      enum: ["UP", "DOWN", "IDLE"],
      default: "IDLE",
    },

    status: {
      type: String,
      enum: ["IDLE", "MOVING", "MAINTENANCE", "EMERGENCY"],
      default: "IDLE",
    },

    occupancy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    eta: {
      type: Number,
      default: 0,
    },

    emergency: {
      type: Boolean,
      default: false,
    },

    maintenance: {
      type: Boolean,
      default: false,
    },

    requestQueue: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lift", liftSchema);