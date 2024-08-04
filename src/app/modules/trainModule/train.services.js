const Train = require("./train.model");


const trainServices = {
    createTrain: async (payload) => {
        return await Train.create(payload);
    },

    getAllTrains: async () => {
        return await Train.find();
    },

    updateTrain: async (id, payload) => {
        return await Train.findByIdAndUpdate(id, payload, { new: true });
    },

    updateTrainStatus: async (trains) => {
        const currentTime = new Date();

        const updatePromises = trains.map(async (train) => {
            const stopUpdates = train.stops.map(async (stop) => {
                if (currentTime > stop.arrivalTime && currentTime < stop.departureTime) {
                    stop.status = 'reached';
                } else if (currentTime > stop.departureTime) {
                    stop.status = 'late';
                } else {
                    stop.status = 'on-schedule';
                }
                return stop.save();
            });

            await Promise.all(stopUpdates);

            const lastStop = train.stops[train.stops.length - 1];
            train.status = currentTime > lastStop.departureTime ? 'Arrived' : 'On Time';

            return train.save();
        });

        await Promise.all(updatePromises);

    },

    retrieveTrainSchedules: async () => {
        return await Train.find()
    }
}

module.exports = trainServices;
