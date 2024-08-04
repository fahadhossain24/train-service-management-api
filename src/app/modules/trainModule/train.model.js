const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stops: [{
        station: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'station',
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        stopStatus: {
            type: String,
            enum: ['on-schedule', 'reached', 'late'],
            default: "on-schedule",
        }
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ['on-time', 'arrived', 'delayed'],
        default: "on-time"
    }
}, {
    timestamps: true
});

const Train = mongoose.model('train', trainSchema);

module.exports = Train
