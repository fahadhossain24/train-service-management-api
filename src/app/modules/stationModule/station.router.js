const express = require('express');
const stationControllers = require('./station.controller');


stationRouter = express.Router();

stationRouter.post('/create', stationControllers.createStation)
stationRouter.patch('/update/:id', stationControllers.updateStation)
stationRouter.get('/all', stationControllers.retriveStations)

module.exports = stationRouter;