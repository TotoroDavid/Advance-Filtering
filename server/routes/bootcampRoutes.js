const express = require('express')
const {
    getAllBootcamps, createNewBootcamp, updateBootcampById, deleteBootcampById
} = require('../controllers/bootcampControllers')
const router = express.Router()

//@route  http://localhost:3001/ap1/v1/bootcamps/
router.route('/').get(getAllBootcamps).post(createNewBootcamp)

//@route  '/ap1/v1/bootcamps/someId'
router.route('/:id').put(updateBootcampById).delete(deleteBootcampById)

module.exports = router