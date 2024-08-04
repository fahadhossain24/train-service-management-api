
const CustomError = require("../../errors");
const { StatusCodes } = require("http-status-codes");
const walletService = require("./wallet.service");

const addFunds = async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        throw new CustomError.BadRequestError('Invalid amount!');
    }

    const userId = req.body.userId;
    const wallet = await walletService.addFunds(userId, amount);

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Funds added successfull',
        data: wallet
    });
};

const getWallet = async (req, res) => {
    const {id: userId} = req.params;
    const wallet = await walletService.getWallet(userId);

    if (!wallet) {
        throw new CustomError.NotFoundError('Wallet not found!');
    }

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: wallet
    });
};

module.exports = {
    addFunds,
    getWallet
};
