const express = require('express')
require('express-async-errors')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const globalErrorHandler = require('./app/middlewares/globalErrorHandler')
const notFound = require('./app/middlewares/notFound')
const Router = require('./app/routers/version1/index')

const app = express()

// global middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('/v1/uploads', express.static(path.join('uploads')))

// application middleware
app.use('/v1', Router)

app.get('/', (req, res) => {
  res.send('Train service management server is running now')
})

// error handling middlewares
app.use(globalErrorHandler)
app.use(notFound)

module.exports = app
