
const mongoose = require('mongoose')

const connstr = 'mongodb://localhost:27017/employees'

const connectDB = mongoose.connect(connstr)

module.exports = connectDB