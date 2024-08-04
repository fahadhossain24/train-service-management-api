const express = require('express');
const trainControllers = require('./train.controller');
const auth = require('../../middlewares/auth');

trainRouter = express.Router();

// Ensure the user authorization for all train routes
trainRouter.use(auth)

trainRouter.post('/create', trainControllers.createTrain);
trainRouter.patch('/update/:id', trainControllers.updateTrain);
trainRouter.get('/schedules', trainControllers.retrieveTrainSchedules);

module.exports = trainRouter;
