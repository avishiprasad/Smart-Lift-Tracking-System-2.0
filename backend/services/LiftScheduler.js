const Lift = require("../models/lift");
// score =distance+(queue length × 2)
const assignNearestLift = async ({
  requestedFloor,
  destinationFloor,
}) => {

  const lifts = await Lift.find({
    status: {
      $nin: [
        "MAINTENANCE",
        "EMERGENCY",
      ],
    },
  });

  let bestLift = null;
  let bestScore = Number.MAX_SAFE_INTEGER;

  for (const lift of lifts) {

    // Lift must serve BOTH floors
    if (
      !lift.servingFloors.includes(requestedFloor) ||
      !lift.servingFloors.includes(destinationFloor)
    ) {
      continue;
    }

    const distance = Math.abs(
      lift.currentFloor - requestedFloor
    );

    // Queue penalty
    const score =
      distance +
      (lift.requestQueue.length * 2);

    if (score < bestScore) {
      bestScore = score;
      bestLift = lift;
    }
  }

  return bestLift;
};

module.exports = {
  assignNearestLift,
};