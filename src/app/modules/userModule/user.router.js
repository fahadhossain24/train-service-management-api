const express = require('express');
const userControllers = require('./user.controller');


const userRouter = express.Router();

userRouter.post('/create', userControllers.createUser)
userRouter.post('/login', userControllers.userLogin)


module.exports = userRouter;