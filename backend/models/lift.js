const mongoose = require("mongoose");
const liftSchema = new mongoose.Schema({
    liftNumber: {
        type: Number,
        required: true,
        unique: true,
    },

    servingFloors: {
        type: [Number],
        required: true,
        default: [1],
    },

    currentFloor: {
        type: Number,
        default: 1,
    },

    targetFloor: {
        type: Number,
        default: 1,
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
    },

    eta: {
        type: Number,
        default: 0,
    },

    requestQueue: [
        {
          floor: {
            type: Number,
            required: true,
          },
      
          type: {
            type: String,
            enum: ["PICKUP", "DROPOFF"],
            required: true,
          },
      
          requestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LiftRequest",
            required: true,
          },
        },
      ],
}, { timestamps: true });

module.exports = mongoose.model("Lift", liftSchema);