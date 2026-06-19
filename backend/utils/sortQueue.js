const sortQueue = (
    queue,
    currentFloor
) => {

    return queue.sort((a, b) => {

        return (
            Math.abs(a.floor - currentFloor)
            -
            Math.abs(b.floor - currentFloor)
        );

    });

};

module.exports = sortQueue;