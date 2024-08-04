const express = require('express');
const walletControllers = require('./wallet.controller');
const auth = require('../../middlewares/auth');

const walletRouter = express.Router();

// Ensure the user authorization for all wallet routes
walletRouter.use(auth);

walletRouter.post('/add-funds', walletControllers.addFunds);
walletRouter.get('/my-wallet/:id', walletControllers.getWallet);

module.exports = walletRouter;
