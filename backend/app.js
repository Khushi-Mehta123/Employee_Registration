
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const router = require('./routers/router')
const connectDB = require('./connection/db')
const errorhandlingMiddleware = require('./Middleware/ErrorHandlingMiddleware')
const bodyParser = require('body-parser')

// app.use(bodyParser.json())
app.use(cors({
    origin : 'http://localhost:4200',
}))
app.use(express.json())
app.use('/api/v1/employee',router)
app.use(errorhandlingMiddleware)

const start = async () => {

    try {
        await connectDB
        app.listen(port, () => 
            console.log(`Server listening on port ${port}!`
        ))
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
}

start()
