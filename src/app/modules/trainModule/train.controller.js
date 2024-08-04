const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const trainServices = require("./train.services");
const cron = require('node-cron');

// controller for creating a new train
const createTrain = async (req, res) => {
    const train = await trainServices.createTrain(req.body);
    if (!train) {
        throw new CustomError.BadRequestError("Failed to create new train!");
    }

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: "Train created",
        data: train,
    });
};

const updateTrain = async(req, res) => {
    const {id} = req.params
    if(!id){
        throw new CustomError.BadRequestError("Missing id in request params!")
    }
    const updatedTrain = await trainServices.updateTrain(id, req.body);
    if(!updatedTrain.isModified){
        throw new CustomError.BadRequestError("Failed to update train")
    }
    
    res.status(StatusCodes.OK).json({
        status: 'success',
        message: "Train update successfull"
    })
}

// controller for updating train schedule
const updateTrainStatus = async (req, res) => {

    const trains = await trainServices.getAllTrains();
    if(trains.length === 0){
        throw new CustomError.BadRequestError("No trains found!")
    }

    cron.schedule("9 * * * * *", async function(){
        const updatedTrains = await trainServices.updateTrainStatus(trains);
        console.log(updatedTrains)
    })

    res.status(StatusCodes.OK).json({
        status: "success",
        message: "Train status updated"
    });
};

// controller for retrieving trains
const retrieveTrainSchedules = async (req, res) => {
   const trainSchedules = await trainServices.retrieveTrainSchedules();
   if(trainSchedules.length === 0){
    throw new CustomError.BadRequestError("No train schedules found!")
   }

   res.status(StatusCodes.OK).json({
    status: 'success',
    message: "Train schedules found",
    data: trainSchedules
   })
};

module.exports = {
    createTrain,
    updateTrain,
    updateTrainStatus,
    retrieveTrainSchedules,
};
