const ActivityLog = require("../models/activityLog");

const createMaintenanceLog = async ({
    lift,
    engineer,
    action,
}) => {
    return await ActivityLog.create({
        action,
        lift,
        performedBy: engineer,
        description: `${action} by ${engineer}`,
    });
};

const getAllLogs = async () => {
    return await ActivityLog.find()
        .populate("lift", "liftNumber")
        .sort({ createdAt: -1 });
};

module.exports = {
    createMaintenanceLog,
    getAllLogs,
};