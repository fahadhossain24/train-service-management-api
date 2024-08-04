const Ticket = require('./ticket.model');
const CustomError = require("../../errors");
const walletService = require('../walletModule/wallet.service');

const ticketService = {
    purchaseTicket: async (userId, trainId, stop, amount) => {
        const wallet = await walletService.createTransaction(userId, amount, 'debit');
        
        if (wallet.balance < 0) {
            throw new CustomError.BadRequestError('Insufficient funds');
        }

        const ticket = await Ticket.create({ user: userId, train: trainId, stop, amount });
        return ticket;
    }
};

module.exports = ticketService;
