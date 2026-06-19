const validateRequest = (body) => {

    const {
        requestedFloor,
        destinationFloor
    } = body;

    if (
        requestedFloor === undefined ||
        destinationFloor === undefined
    ) {
        return "Requested and destination floor are required.";
    }

    if (requestedFloor === destinationFloor) {
        return "Pickup and destination cannot be same.";
    }

    if (requestedFloor < 1 || destinationFloor < 1) {
        return "Invalid floor.";
    }

    return null;
};

module.exports = validateRequest;