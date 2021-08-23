const express = require('express')
const router = express.Router()

//@route  '/ap1/v1/bootcamps/'
router.route('/').get().post()

//@route  '/ap1/v1/bootcamps/someId'
router.route('/:id').put().delete()

module.exports = router