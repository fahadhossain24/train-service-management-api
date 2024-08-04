const express = require('express')
const userRouter = require('../../modules/userModule/user.router')
const stationRouter = require('../../modules/stationModule/station.router')
const trainRouter = require('../../modules/trainModule/train.router')
const walletRouter = require('../../modules/walletModule/wallet.router')
const ticketRouter = require('../../modules/ticketModule/ticket.router')

const router = express.Router()

router.use('/user', userRouter)
router.use('/station', stationRouter)
router.use('/train', trainRouter)
router.use('/wallet', walletRouter)
router.use('/ticket', ticketRouter)

module.exports = router
