const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createRestroController, getAllRestroController, getRestroByIdController, deleteRestroController } = require('../controllers/restroController');
const router = express.Router();

//create restro - post
router.post('/createRestro', authMiddleware, createRestroController);

//get all restro - get
router.get('/getAll', getAllRestroController);

//get restro by id -get
router.get('/get/:id', getRestroByIdController);

//delete restro - delete
router.delete('/deleteRestro/:id', deleteRestroController);

module.exports = router;