/**
 * the controllers will export for our routes
 */

/**schema mongoose model */
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')


/** get all the bootcamps */
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {

    let query
    let uiValues = {
        filtering: {},
        sorting: {}
    }
    const reqQuery = { ...req.query }
    const removeFields = ['sort']

    removeFields.forEach((val) => delete reqQuery[val])

    const filterKeys = Object.keys(reqQuery)
    const filterValues = Object.values(reqQuery)

    filterKeys.forEach(
        (val, idx) => uiValues.filtering[val] = filterValues[idx]
    )

    /** handling filtering on backend */
    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr
        .replace(/\b(gt|gte|lt|lte|in)\b/g, (match) =>
            `$${match}`
        )

    query = Bootcamp.find(JSON.parse(queryStr))
    /** handling sorting on backend */
    if (req.query.sort) {
        const sortByArr = req.query.sort.split(',')

        /** return ui values from api */
        sortByArr.forEach((val) => {
            let order

            if (val[0] === '-') {
                order = 'descending'
            } else {
                order = 'ascending'
            }

            uiValues.sorting[val.replace('-', '')] = order
        })

        const sortByStr = sortByArr.join(' ')
        query = query.sort(sortByStr)

    } else {
        query = query.sort('-price')
    }

    const bootcamps = await query

    const maxPrice = await Bootcamp
        .find()
        .sort({ price: -1 })
        .limit(1)
        .select('-_id price')

    const minPrice = await Bootcamp
        .find()
        .sort({ price: 1 })
        .limit(1)
        .select('-_id price')

    uiValues.maxPrice = maxPrice[0].price
    uiValues.minPrice = minPrice[0].price

    res.status(200).json({
        success: true,
        data: bootcamps,
        uiValues,
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