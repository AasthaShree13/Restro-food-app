const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

//create category - post
router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  createCategoryController,
);

//get all - get
router.get("/getAll", getAllCategoryController);

//update category - put
router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryController,
);

//delete ctegory - delete
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategoryController,
);

module.exports = router;
