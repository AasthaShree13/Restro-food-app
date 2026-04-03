const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["placed", "preparing", "prepared", "on the way", "delivered"],
      default: "placed",
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("order", orderSchema);
