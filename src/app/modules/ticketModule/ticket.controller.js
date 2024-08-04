const ticketService = require('./ticket.services');
const CustomError = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const purchaseTicket = async (req, res) => {
    const { userId, trainId, stop, amount } = req.body;
    if (!userId || !trainId || !stop || !amount || amount <= 0) {
        throw new CustomError.BadRequestError('Invalid ticket data!');
    }
    const ticket = await ticketService.purchaseTicket(userId, trainId, stop, amount);

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'Ticket purchased successfull',
        data: ticket
    });
};

module.exports = {
    purchaseTicket
};
