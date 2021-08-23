/**
 * build schema and validate the data
 */

const mongoose = require('mongoose')

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name to the bootcamp'],
        unique: true,
    },
    rating: {
        type: Number,
        required: [true.valueOf, 'Please provide a rating for a bootcamp']
    },
    description: {
        type: String,
        required: [true, 'please provide bootcamp description']
    },
    price: {
        type: Number,
        required: [true, 'please provide bootcamp with price']
    }
})

const Bootcamp = mongoose.model('Bootcamp', bootcampSchema)

module.exports = Bootcamp