const Lift = require("../models/Lift");
const LiftRequest = require("../models/LiftRequest");

const {
  FLOOR_TRAVEL_TIME,
  STATUS,
} = require("../constants/liftConstants");

const {
  logActivity,
} = require("../services/ActivityLogService");

const tick = async () => {
  const lifts = await Lift.find();

  for (const lift of lifts) {
    // No pending requests
    if (lift.requestQueue.length === 0) {
      await Lift.findByIdAndUpdate(lift._id, {
        status: STATUS.IDLE,
        direction: "IDLE",
        eta: 0,
      });

      continue;
    }

    const stop = lift.requestQueue[0];

    let current = lift.currentFloor;

    // Move UP
    if (current < stop.floor) {
      current++;
    }

    // Move DOWN
    else if (current > stop.floor) {
      current--;
    }

    // Reached stop
    else {
      lift.requestQueue.shift();

      const request = await LiftRequest.findById(
        stop.requestId
      );

      if (request) {
        if (stop.type === "PICKUP") {
          request.status = "IN_PROGRESS";
        } else {
          request.status = "COMPLETED";
        }

        await request.save();
      }

      await logActivity({
        action: stop.type,
        lift: lift._id,
        description: `Lift ${lift.liftNumber} ${stop.type} at floor ${stop.floor}`,
      });
    }

    const target =
      lift.requestQueue.length > 0
        ? lift.requestQueue[0].floor
        : current;

    const direction =
      current < target
        ? "UP"
        : current > target
        ? "DOWN"
        : "IDLE";

    const status =
      lift.requestQueue.length > 0
        ? STATUS.MOVING
        : STATUS.IDLE;

    const eta =
      Math.abs(target - current) *
      FLOOR_TRAVEL_TIME;

    await Lift.findByIdAndUpdate(
      lift._id,
      {
        currentFloor: current,
        targetFloor: target,
        direction,
        status,
        eta,
        requestQueue: lift.requestQueue,
      }
    );
  }
};

module.exports = {
  tick,
};