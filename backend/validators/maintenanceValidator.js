const validateMaintenance = (data) => {
    const {
      lift,
      engineer,
      nextServiceDate,
    } = data;
  
    if (!lift)
      throw new Error("Lift is required.");
  
    if (!engineer)
      throw new Error("Engineer name is required.");
  
    if (!nextServiceDate)
      throw new Error("Next service date is required.");
  };
  
  module.exports = {
    validateMaintenance,
  };