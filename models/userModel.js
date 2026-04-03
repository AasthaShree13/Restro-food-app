const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      unique: true,
    },
    userType: {
      type: String,
      enum: ["client", "admin", "vendor", "driver"],
      default: "client",
    },
    //if userType is vendor, then restaurant is required
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
      required: function () {
        return this.userType === "vendor";
      },
    },
    profile: {
      type: String,
      default: "https://commons.wikimedia.org/wiki/File:Sample_User_Icon.png",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
