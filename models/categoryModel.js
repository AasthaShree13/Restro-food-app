const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " category title is required"],
    },
    imgUrl: {
      type: String,
      default: "https://pngtree.com/so/food-logo",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
