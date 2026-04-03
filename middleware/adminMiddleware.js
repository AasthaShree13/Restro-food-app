const userModel = require("../models/userModel");

module.exports = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.userType !== "admin") {
      return res.status(401).send({
        success: false,
        message: "only Admin Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      error,
    });
  }
};
