const categoryModel = require("../models/categoryModel");

//create category
const createCategoryController = async (req, res) => {
  try {
    const { title, imgUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide title",
      });
    }
    const newCategory = new categoryModel({
      title,
      imgUrl,
    });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "new category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create category API",
      error,
    });
  }
};

//get all
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      success: true,
      categoryCount: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all category API",
      error,
    });
  }
};

//update category
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imgUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imgUrl },
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update category API",
      error,
    });
  }
};

//delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide id in params",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "no category found with given id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
