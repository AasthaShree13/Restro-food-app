const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { createRestroController, getAllRestroController, getRestroByIdController, deleteRestroController } = require('../controllers/restroController');
const router = express.Router();

//create restro - post (admin only)
router.post('/createRestro', authMiddleware, adminMiddleware, createRestroController);

//get all restro - get
router.get('/getAll', getAllRestroController);

//get restro by id -get
router.get('/get/:id', getRestroByIdController);

//delete restro - delete (admin only)
router.delete('/deleteRestro/:id', authMiddleware, adminMiddleware, deleteRestroController);

module.exports = router;