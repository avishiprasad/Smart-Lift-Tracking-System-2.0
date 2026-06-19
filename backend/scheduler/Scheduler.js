const {
    tick
} = require("../engine/LiftEngine");

const startScheduler = () => {

    setInterval(async () => {

        try {

            await tick();

        }

        catch (err) {

            console.log(err);

        }

    },1000);

};

module.exports = {
    startScheduler
};