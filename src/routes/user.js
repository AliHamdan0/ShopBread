const { Router } = require('express');
const { loginUser, registerUser } = require('../controllers/user');
const validateToken = require('../middlewares/validateTokenHandler');
const userRouter = Router();

userRouter.post('/login', loginUser);

userRouter.post('/register', registerUser);

module.exports = userRouter;
