const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({

    action:String,

    performedBy:String,

    lift:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lift"
    },

    description:String

},{
    timestamps:true
});

module.exports =
  mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", activityLogSchema);