const { StatusCodes } = require("http-status-codes")
const CustomError = require("../../errors")
const stationServices = require("./station.services")

// controller for create new station
const createStation = async(req, res) => {
    const {name, location, contactNumber, openingHours} = req.body
    if(!name || !location || !contactNumber || !openingHours){
        throw new CustomError.BadRequestError("Missing information in request body!")
    }

    const station = await stationServices.createStation(req.body);
    if(!station){
        throw new CustomError.BadRequestError("Failed to create new station!")
    }

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: "Station created",
        data: station,
    })
}

// controller for update specific station
const updateStation = async(req, res) => {
    const {id} = req.params
    if(!id){
        throw new CustomError.BadRequestError("Id missing in request parameter!")
    }

    const updatedStation = await stationServices.updateStation(id, req.body);
    if(!updatedStation.isModified){
        throw new CustomError.BadRequestError("Failed to update station!")
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        message: "Station updated"
    })
}

// controller for retrive station
const retriveStations = async(req, res) => {
    const stations = await stationServices.retriveStations()
    if(stations.length === 0){
        throw new CustomError.BadRequestError("No stations found!")
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        message: "Station found successfull",
        data: stations
    })
}


module.exports = {
    createStation,
    updateStation,
    retriveStations,
}