const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updatePasswordContrroller, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router()

//get user - get
router.get('/getUser', authMiddleware, getUserController);

//update user - put
router.put('/updateUser', authMiddleware, updateUserController);

//update password - post
router.post('/updatePassword', authMiddleware, updatePasswordContrroller);

//reset password - post
router.post('/resetPassword', resetPasswordController);

//delete user
router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

module.exports = router