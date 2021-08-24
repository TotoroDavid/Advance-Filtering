/**
 * the controllers will export for our routes
 */

/**schema mongoose model */
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/asyncHandler')


/** get all the bootcamps */
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find()

    res.status(200).json({
        success: true,
        data: bootcamps,
    })
})

/**create a new bootcamp route */
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    res.send('create new bootcamps route')
})

//update a bootcamp by id 
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
    res.send('update a  bootcamp by id')
})

//delete a bootcamp by id route
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
    res.send('delete a bootcamp by id route')
})


/**
 * Controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to
 * the user to view in the browser.
 */