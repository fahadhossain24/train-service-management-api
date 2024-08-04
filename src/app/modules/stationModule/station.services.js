const Station = require("./station.model")

const stationServices = {
    createStation: async(payload) => {
        return await Station.create(payload)
    },

    updateStation: async(id, payload) => {
      return await Station.findByIdAndUpdate(id, payload, { new: true });
    },

    retriveStations: async() => {
        return await Station.find();
    }
}

module.exports = stationServices;