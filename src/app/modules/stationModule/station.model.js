const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: String,
    openingHours: String,
    isActive: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
});

const Station = mongoose.model('station', stationSchema)

module.exports = Station
