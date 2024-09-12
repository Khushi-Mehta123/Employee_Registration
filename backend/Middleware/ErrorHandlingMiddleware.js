
const {customErrorHandling} = require('../CustomClass/CustomErrorHandling')

const errorhandlingMiddleware = (err,req,res,next)=> {

    // res.status(404).json({})
    
    if(err instanceof customErrorHandling){
        return res.status(err.status).json({msg : err.message})
    }

    return res.status(404).json("error")
}

module.exports = errorhandlingMiddleware