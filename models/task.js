const mongoose = require("mongoose");
const loginSchema = require("./user");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "must provide the title"],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending"],
      default: "pending",
      trim: true,
    },
    enddate: {
        type: Date,
        required: true,
        trim: true
    },
  },
  { timestamps: true }
);

module.exports = taskSchema;
