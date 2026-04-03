const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "food title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    imgUrl: {
      type: String,
      default:
        "https://depositphotos.com/vector/restaurant-logo-label-menu-food-service-symbol-vector-illustration-isolated-232782318.html",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
      required: [true, "resturant is required"],
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("food", foodSchema);
