const mongoose = require('mongoose')

// const MONGO_USERNAME = 'rio'
// const MONGO_PASSWORD = process.env.dbPassword
// const MONGO_HOSTNAME = '127.0.0.1'
// const MONGO_PORT = '27017'
// const MONGO_DB = 'rio'

// const url = process.env.NODE_ENV === 'production'
//   ? process.env.mongoURI
//   : `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const url = process.env.mongoURI

// Connect to MongoDB
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
