const Lift = require("../models/lift");

// Create Lift
const createLift = async (req, res) => {
  try {
    const {
      liftNumber,
      servingFloors,
      currentFloor,
      targetFloor
    } = req.body;
    servingFloors.sort((a,b)=>a-b);
    // Required fields
    if (!liftNumber || !servingFloors) {
      return res.status(400).json({
        message: "Lift number and serving floors are required."
      });
    }

    // Duplicate lift number
    const existingLift = await Lift.findOne({ liftNumber });

    if (existingLift) {
      return res.status(409).json({
        message: "Lift number already exists."
      });
    }

    // Current floor validation
    if (
      currentFloor &&
      !servingFloors.includes(currentFloor)
    ) {
      return res.status(400).json({
        message: "Current floor is not served by this lift."
      });
    }

    // Target floor validation
    if (
      targetFloor &&
      !servingFloors.includes(targetFloor)
    ) {
      return res.status(400).json({
        message: "Target floor is not served by this lift."
      });
    }

    const lift = await Lift.create(req.body);

    res.status(201).json({
        success:true,
        message:"Lift created successfully.",
        data:lift
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get all lifts
const getAllLifts = async (req, res) => {
  try {
    const lifts = await Lift.find();
    res.status(200).json(lifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lift by ID
const getLiftById = async (req, res) => {
  try {
    const lift = await Lift.findById(req.params.id);

    if (!lift) {
      return res.status(404).json({ message: "Lift not found" });
    }

    res.status(200).json(lift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lift
const updateLift = async (req, res) => {
    try {
  
      const lift = await Lift.findById(req.params.id);
  
      if (!lift) {
        return res.status(404).json({
          message: "Lift not found."
        });
      }
  
      // Prevent updates during emergency
      if (
        lift.status === "EMERGENCY" &&
        req.body.status !== "IDLE"
      ) {
        return res.status(400).json({
          message: "Lift is currently in emergency mode."
        });
      }
  
      // Prevent updates during maintenance
      if (
        lift.status === "MAINTENANCE" &&
        req.body.status !== "IDLE"
      ) {
        return res.status(400).json({
          message: "Lift is under maintenance."
        });
      }
  
      // Validate current floor
      if (
        req.body.currentFloor !== undefined &&
        !lift.servingFloors.includes(req.body.currentFloor)
      ) {
        return res.status(400).json({
          message: "Invalid current floor."
        });
      }
  
      // Validate target floor
      if (
        req.body.targetFloor !== undefined &&
        !lift.servingFloors.includes(req.body.targetFloor)
      ) {
        return res.status(400).json({
          message: "Invalid target floor."
        });
      }
  
      Object.assign(lift, req.body);
  
      await lift.save();
  
      res.json(lift);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  };

// Delete lift
const deleteLift = async (req, res) => {
  try {
    const lift = await Lift.findByIdAndDelete(req.params.id);

    if (!lift) {
      return res.status(404).json({ message: "Lift not found" });
    }

    res.status(200).json({ message: "Lift deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLift,
  getAllLifts,
  getLiftById,
  updateLift,
  deleteLift,
};
