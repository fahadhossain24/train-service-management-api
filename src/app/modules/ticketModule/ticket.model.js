const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'train',
        required: true
    },
    stop: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
