const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const express = require('express');
const router = express.Router();

//create category - post
router.post('/create', authMiddleware, createCategoryController);

//get all - get
router.get('/getAll', getAllCategoryController);

//update category - put
router.put('/update/:id', authMiddleware, updateCategoryController);

//delete ctegory - delete
router.delete('/delete/:id', authMiddleware, deleteCategoryController);

module.exports = router;