const ActivityLog =
require("../models/ActivityLog");

const logActivity = async ({
    action,
    lift,
    description,
    performedBy="SYSTEM"
})=>{

    await ActivityLog.create({

        action,

        lift,

        description,

        performedBy

    });

};

module.exports={
    logActivity
};