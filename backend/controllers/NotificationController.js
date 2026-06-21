const {
    getNotifications,
  } = require("../services/NotificationService");
  
  const getAllNotifications = async (req, res, next) => {
    try {
      const notifications = await getNotifications();
  
      res.json({
        success: true,
        count: notifications.length,
        data: notifications,
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getAllNotifications,
  };