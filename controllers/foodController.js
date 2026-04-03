const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//create food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "please provide food title, description, price and resturant",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "new food created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create food API",
      error,
    });
  }
};

//get all food
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }

    res.status(200).send({
      success: true,
      foodCount: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all food API",
      error,
    });
  }
};

//get single food by id
const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "please provide food id in params",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "food found",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get food API",
      error,
    });
  }
};

//get by restro
const getFoodByRestroController = async (req, res) => {
  try {
    const restoId = req.params.id;
    if (!restoId) {
      return res.status(500).send({
        success: false,
        message: "please provide restro id in params",
      });
    }
    const food = await foodModel.find({ resturant: restoId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    res.status(200).send({
      success: true,
      foodCount: food.length,
      message: "food based on restro found",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get food API",
      error,
    });
  }
};

//get food by category
const getFoodByCategoryCOntroller = async (req, res) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res.status(500).send({
        success: false,
        message: "please provide category id in params",
      });
    }
    const food = await foodModel.find({ category: catId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    res.status(200).send({
      success: true,
      foodCount: food.length,
      message: "food based on category found",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get food API",
      error,
    });
  }
};

//update food by id
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "please provide food id in params",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imgUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true },
    );
    await updatedFood.save();
    res.status(200).send({
      success: true,
      message: "food details updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get food API",
      error,
    });
  }
};

//delete food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "please provide food is in params",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get food API",
      error,
    });
  }
};

//place order
const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart || !payment) {
      return res.status(500).send({
        success: false,
        message: "please provide food cart and payment method",
      });
    }
    let total = 0;
    //calculate price
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment,
      buyer: req.body.id,
      total,
    });

    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "order placed",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in place order API",
      error,
    });
  }
};

//change order status
const changeOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).send({
        success: false,
        message: "lease provide orderId in params",
      });
    }
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    const { status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    await updatedOrder.save();
    res.status(200).send({
      success: true,
      message: "status updated",
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in change order status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestroController,
  getFoodByCategoryCOntroller,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  changeOrderStatusController,
};
