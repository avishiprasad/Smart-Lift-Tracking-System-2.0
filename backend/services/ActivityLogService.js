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