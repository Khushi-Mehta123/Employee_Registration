
const mongoose = require('mongoose')

const Empschema = new mongoose.Schema({

    name : {
        type : String,
    },
    position : {
        type : String
    },
    dept : {
        type : String
    },
    salary : {
        type : Number
    }
})

module.exports = mongoose.model("Employee",Empschema)