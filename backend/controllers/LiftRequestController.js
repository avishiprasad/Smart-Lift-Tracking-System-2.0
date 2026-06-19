const {
    createLiftRequest,
  } = require("../services/LiftRequestService");
  
  const validateRequest = require("../validators/requestValidator");
  
  const createRequest = async (req, res, next) => {
    try {
      // Validate request
      const error = validateRequest(req.body);
  
      if (error) {
        return res.status(400).json({
          success: false,
          message: error,
        });
      }
  
      const { requestedFloor, destinationFloor } = req.body;
  
      const direction =
        destinationFloor > requestedFloor ? "UP" : "DOWN";
  
      const request = await createLiftRequest({
        requestedFloor,
        destinationFloor,
        direction,
      });
  
      return res.status(201).json({
        success: true,
        message: "Lift assigned successfully.",
        data: request,
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    createRequest,
  };