const express = require('express');
const ticketControllers = require('./ticket.controller');
const auth = require('../../middlewares/auth');

const ticketRouter = express.Router();

// Ensure the user authorization for all ticket routes
ticketRouter.use(auth);

ticketRouter.post('/purchase', ticketControllers.purchaseTicket);

module.exports = ticketRouter;
