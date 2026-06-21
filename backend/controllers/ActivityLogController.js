const {
    getAllLogs,
  } = require("../services/ActivityLogService");
  
  const getLogs = async (req, res, next) => {
    try {
      const logs = await getAllLogs();
  
      res.json({
        success: true,
        count: logs.length,
        data: logs,
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getLogs,
  };