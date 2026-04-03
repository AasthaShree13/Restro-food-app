const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestroController,
  getFoodByCategoryCOntroller,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  changeOrderStatusController,
} = require("../controllers/foodController");
const router = express.Router();

//create food - post
router.post("/create", authMiddleware, createFoodController);

//get all food - get
router.get("/getAll", getAllFoodController);

//get food by id - get
router.get("/get/:id", getFoodByIdController);

//get food by restroID - get
router.get("/getByRestro/:id", getFoodByRestroController);

//get food by categoryID - get
router.get("/getByCat/:id", getFoodByCategoryCOntroller);

//update food - put
router.put("/update/:id", authMiddleware, updateFoodController);

//delete food - delete
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//place order
router.post("/placeOrder", authMiddleware, placeOrderController);

//change order status
router.put(
  "/changeOrderStatus/:id",
  authMiddleware,
  changeOrderStatusController,
);

module.exports = router;
