/**
 * the controllers will export for our routes
 */
//schema mongoose model
const Bootcamp = require('../models/Bootcamp')


//get all the bootcamps
exports.getAllBootcamps = async (req, res, next) => {
    const bootcamps = await Bootcamp.find()

    res.status(200).json({
        success: true,
        data: bootcamps,
    })
}

//create a new bootcamp route
exports.createNewBootcamp = (req, res, next) => {
    res.send('create new bootcamps route')
}

//update a bootcamp by id 
exports.updateBootcampById = (req, res, next) => {
    res.send('update a  bootcamp by id')
}

//delete a bootcamp by id route
exports.deleteBootcampById = (req, res, next) => {
    res.send('delete a bootcamp by id route')
}