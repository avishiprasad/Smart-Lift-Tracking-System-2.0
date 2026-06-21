const {
    getAnalytics,
  } = require("../services/AnalyticsService");
  
  const analytics = async (req, res, next) => {
    try {
      const data = await getAnalytics();
  
      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    analytics,
  };