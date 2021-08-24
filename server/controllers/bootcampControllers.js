/**
 * the controllers will export for our routes
 */

/**schema mongoose model */
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')


/** get all the bootcamps */
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find()

    res.status(200).json({
        success: true,
        data: bootcamps,
    })
})

/** create a new bootcamp route */
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

/** update a bootcamp by id */
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404))
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    })

    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

/** delete a bootcamp by id route */
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404))
    }

    await bootcamp.remove()

    res.status(200).json({
        success: true,
        data: {}
    })
})


/**
 * Controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to
 * the user to view in the browser.
 */