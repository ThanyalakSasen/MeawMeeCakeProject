const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema(
  {
    position_name: { type: String, required: true, unique: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Positions", positionSchema);