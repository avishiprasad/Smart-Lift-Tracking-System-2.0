const queueContainsStop = (
    queue,
    floor,
    type
) => {

    return queue.some(
        stop =>
            stop.floor === floor &&
            stop.type === type
    );

};

module.exports = {
    queueContainsStop
};