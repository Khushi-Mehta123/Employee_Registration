
const express = require('express')
const router = express.Router()
const {getAllData,postdata,getSingleData,updateData,deleteData}= require('../functions/functions') 

router.route('/').get(getAllData).post(postdata)

router.route('/:id').get(getSingleData).put(updateData).delete(deleteData)

module.exports = router