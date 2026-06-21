const {
    getAllMaintenance,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
  } = require("../services/MaintenanceService");
  
  const {
    validateMaintenance,
  } = require("../validators/maintenanceValidator");
  
  const getMaintenance = async (req, res, next) => {
    try {
      const records = await getAllMaintenance();
  
      res.json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const create = async (req, res, next) => {
    try {
      validateMaintenance(req.body);
  
      const record = await createMaintenance(req.body);
  
      res.status(201).json({
        success: true,
        data: record,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const record = await updateMaintenance(
        req.params.id,
        req.body
      );
  
      res.json({
        success: true,
        data: record,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const remove = async (req, res, next) => {
    try {
      await deleteMaintenance(req.params.id);
  
      res.json({
        success: true,
        message:
          "Maintenance record deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getMaintenance,
    create,
    update,
    remove,
  };