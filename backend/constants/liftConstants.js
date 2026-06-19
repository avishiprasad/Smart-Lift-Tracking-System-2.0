const FLOOR_TRAVEL_TIME = 3;

const DOOR_OPEN_TIME = 5;

const MAX_OCCUPANCY = 10;

const STATUS = {
    IDLE: "IDLE",
    MOVING: "MOVING",
    MAINTENANCE: "MAINTENANCE",
    EMERGENCY: "EMERGENCY",
  };
  
  const DIRECTION = {
    UP: "UP",
    DOWN: "DOWN",
    IDLE: "IDLE",
  };
  
  const STOP_TYPE = {
    PICKUP: "PICKUP",
    DROPOFF: "DROPOFF",
  };
  
  module.exports = {
    FLOOR_TRAVEL_TIME,
    DOOR_OPEN_TIME,
    MAX_OCCUPANCY,
    STATUS,
    DIRECTION,
    STOP_TYPE,
  };

