const foodModel = require("../models/foodModel");
const restroModel = require("../models/restroModel");
const userModel = require("../models/userModel");

const createRestroController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    const newRestraaunt = new restroModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestraaunt.save();
    res.status(200).send({
      success: true,
      message: "new restro created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create restro api",
      error,
    });
  }
};

const getAllRestroController = async (req, res) => {
  try {
    const resturants = await restroModel.find();
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No resturants available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.loog(error);
    res.status(500).send({
      success: false,
      message: "error in get all API",
      error,
    });
  }
};

const getRestroByIdController = async (req, res) => {
  try {
    const restroID = req.params.id;
    if (!restroID) {
      return res.status(404).send({
        success: false,
        message: "please provide restro Id",
      });
    }
    const resturant = await restroModel.findById(restroID);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "resturant found successfully",
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get restro by id API",
      error,
    });
  }
};

//delete restro controller
const deleteRestroController = async (req, res) => {
  try {
    const restroID = req.params.id;
    if (!restroID) {
      return res.status(404).send({
        success: false,
        message: "please provide restro Id",
      });
    }
    const restro = await restroModel.findById(restroID);
    if (!restro) {
      return res.status(404).send({
        success: false,
        message: "restro not found",
      });
    }
    await userModel.deleteMany({
      userType: "vendor",
      restaurant: restroID,
    });
    await foodModel.deleteMany({ resturant: restroID });
    await restroModel.findByIdAndDelete(restroID);

    res.status(200).send({
      success: true,
      message: "resturant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete restro API",
      error,
    });
  }
};

module.exports = {
  createRestroController,
  getAllRestroController,
  getRestroByIdController,
  deleteRestroController,
};
