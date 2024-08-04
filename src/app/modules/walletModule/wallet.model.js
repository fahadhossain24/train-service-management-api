const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: [{
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
            required: true,
            enum: ['credit', 'debit']
        }
    }]
}, {
    timestamps: true
});

const Wallet = mongoose.model('wallet', walletSchema);

module.exports = Wallet;
