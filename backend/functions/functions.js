
const Employee = require('../Models/Employee')
const {customErrorHandling} = require('../CustomClass/CustomErrorHandling')
const AsyncWrapper = require('../AyncWrapper/AsyncwrapperClass')

const getSingleData = 
    async(req,res,next) => {

    const {id : id} = req.params
    const employee = await Employee.findById(id)
    if(!employee){
        return next (new customErrorHandling(`Can't find employee with id : ${id}` , 404))
    }
    res.status(200).json(employee)
}

const getAllData =
    async (req,res,next) => {
        const employee = await Employee.find({})
        res.status(200).json(employee)
    }

const postdata = async (req,res) => {
    try {
        let emp = new Employee({
            name: req.body.name,
            position: req.body.position, 
            dept:req.body.dept,
            salary: req.body.salary
        });

        let doc = await emp.save();
        res.status(200).json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving employee', error: error });
    }
}

// AsyncWrapper(
    // async ( req,res,next) => {
    //     const data = req.body
    //     const employee = await Employee.create(data)
    //     res.status(200).json({employee}) 
    // }
// )

const updateData = async (req,res) => {
    
    const {id : id} = req.params
    console.log(id);

    const employee = await Employee.findById({_id : id})
    if(!employee){
        return next (new customErrorHandling(`Can't find employee with id : ${id}` , 404))
    }

    let emp = {
        name: req.body.name,
        position: req.body.position, 
        dept:req.body.dept,
        salary: req.body.salary
    }

    const updemp = await Employee.findByIdAndUpdate({
        _id:id, }, 
        {$set} = emp,
        {new : true}
    )
    if(updemp) {
        console.log(updemp);
    }
    return res.status(200).send(updemp)
}



// AsyncWrapper(
//     async (req,res,next) => {
//         const {id : id} = req.params
//         const employee = await Employee.findOneAndUpdate({_id : id},req.body,{
//             new:true})
//         if(!employee){
//             return next (new customErrorHandling(`Can't find employee with id : ${id}` , 404))
//         }
//         res.status(200).json({employee})
//     }
// )

const deleteData = 
    async (req,res,next) => {
        const {id : id} = req.params
        const employee = await Employee.findOneAndDelete({_id : id})
        if(!employee){
            return next (new customErrorHandling(`Can't find employee with id : ${id}` , 404))
        }
        res.status(200).json({data : "Success"})
    }


module.exports = {getAllData,postdata,getSingleData,updateData,deleteData}