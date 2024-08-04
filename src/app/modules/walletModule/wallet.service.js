const Wallet = require('./wallet.model');
const CustomError = require("../../errors");

const walletService = {
    getWallet: async (userId) => {
        return await Wallet.findOne({ user: userId });
    },

    addFunds: async (userId, amount) => {
        const wallet = await Wallet.findOneAndUpdate(
            { user: userId },
            { $inc: { balance: amount }, $push: { transactions: { amount, type: 'credit' } } },
            { new: true, upsert: true }
        );
        if (!wallet) throw new CustomError.NotFoundError('Wallet not found!');
        return wallet;
    },

    createTransaction: async (userId, amount, type) => {
        const wallet = await Wallet.findOneAndUpdate(
            { user: userId },
            { $inc: { balance: type === 'credit' ? amount : -amount }, $push: { transactions: { amount, type } } },
            { new: true, upsert: true }
        );
        if (!wallet) throw new CustomError.NotFoundError('Wallet not found!');
        return wallet;
    }
};

module.exports = walletService;
