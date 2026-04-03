const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const vendorMiddleware = require("../middleware/vendorMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestroController,
  getFoodByCategoryCOntroller,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  getAllOrdersController,
  changeOrderStatusController,
} = require("../controllers/foodController");
const router = express.Router();

//create food - post (vendor only)
router.post("/create", authMiddleware, vendorMiddleware, createFoodController);

//get all food - get
router.get("/getAll", getAllFoodController);

//get food by id - get
router.get("/get/:id", getFoodByIdController);

//get food by restroID - get
router.get("/getByRestro/:id", getFoodByRestroController);

//get food by categoryID - get
router.get("/getByCat/:id", getFoodByCategoryCOntroller);

//update food - put (vendor only)
router.put("/update/:id", authMiddleware, vendorMiddleware, updateFoodController);

//delete food - delete (vendor only)
router.delete("/delete/:id", authMiddleware, vendorMiddleware, deleteFoodController);

//place order
router.post("/placeOrder", authMiddleware, placeOrderController);

//get all orders (vendor only)
router.get("/getAllOrders", authMiddleware, vendorMiddleware, getAllOrdersController);

//change order status (vendor only)
router.put(
  "/changeOrderStatus/:id",
  authMiddleware,
  vendorMiddleware,
  changeOrderStatusController,
);

module.exports = router;
