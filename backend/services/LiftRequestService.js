const Lift = require("../models/Lift");
const LiftRequest = require("../models/liftRequest");
const { assignNearestLift } = require("./LiftScheduler");
const { queueContainsStop } = require("../utils/queueUtils");
const sortQueue = require("../utils/sortQueue");

const createLiftRequest = async ({
    requestedFloor,
    destinationFloor,
    direction
}) => {

    const lift = await assignNearestLift({
        requestedFloor,
        destinationFloor
    });

    if (!lift) {
        throw new Error("No suitable lift available.");
    }

    const request = await LiftRequest.create({
        requestedFloor,
        destinationFloor,
        direction,
        assignedLift: lift._id,
        status: "ASSIGNED"
    });

    if (!queueContainsStop(lift.requestQueue, requestedFloor, "PICKUP")) {
        lift.requestQueue.push({
            floor: requestedFloor,
            type: "PICKUP",
            requestId: request._id
        });
    }

    if (!queueContainsStop(lift.requestQueue, destinationFloor, "DROPOFF")) {
        lift.requestQueue.push({
            floor: destinationFloor,
            type: "DROPOFF",
            requestId: request._id
        });
    }

    lift.requestQueue = sortQueue(
        lift.requestQueue,
        lift.currentFloor
    );

    await Lift.findByIdAndUpdate(
        lift._id,
        {
            requestQueue: lift.requestQueue
        }
    );

    return request;
};

module.exports = {
    createLiftRequest
};