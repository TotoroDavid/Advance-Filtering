/**
 * Routes
 */

const express = require('express')
/**controllersRoutes */
const {
    getAllBootcamps, createNewBootcamp, updateBootcampById, deleteBootcampById
} = require('../controllers/bootcampControllers')
const router = express.Router()

/** @route  http://localhost:3001/ap1/v1/bootcamps/ */
router.route('/')
    /** get all the bootcamps */
    .get(getAllBootcamps)
    //update a bootcamp by id 
    .post(createNewBootcamp)

/** @route  '/ap1/v1/bootcamps/someId' */
router.route('/:id')
    /** update a bootcamp by id */
    .put(updateBootcampById)
    /** delete a bootcamp by id route */
    .delete(deleteBootcampById)

module.exports = router


/*
"Routes" to forward the supported requests (and any information encoded in request URLs) to the appropriate controller
functions.
*/