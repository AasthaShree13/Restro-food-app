const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user || user.userType !== "vendor") {
      return res.status(403).send({
        success: false,
        message: "only vendor access",
      });
    }
    if (!user.restaurant) {
      return res.status(403).send({
        success: false,
        message: "vendor has no linked restaurant",
      });
    }
    req.vendorUser = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in vendor auth",
      error,
    });
  }
};
