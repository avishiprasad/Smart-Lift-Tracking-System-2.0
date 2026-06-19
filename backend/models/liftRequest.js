const mongoose = require("mongoose");
// Passenger, Creates Request, Scheduler, Assign Lift,Lift Queue,Simulation,WebSocket

const liftRequestSchema = new mongoose.Schema(
  {
    requestedFloor: {
      type: Number,
      required: true,
    },

    destinationFloor: {
      type: Number,
      required: true,
    },

    direction: {
      type: String,
      enum: ["UP", "DOWN"],
      required: true,
    },

    assignedLift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lift",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ASSIGNED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.LiftRequest ||
  mongoose.model("LiftRequest", liftRequestSchema);