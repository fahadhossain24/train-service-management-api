const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')
const port = 5005

const dbConnection = async () => {
  mongoose.connect(config.database_url)
  console.log('Database connected')
  app.listen(config.port || port, () => {
    console.log('Server listing on port', config.port || port)
  })
}

dbConnection()
