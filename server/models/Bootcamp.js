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
        required: [true, 'Please provide a rating for a bootcamp']
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

/**
 *  In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the
 * document. It's a way to express expected properties and values as well as constraints and indexes. A model defines a
 * programming interface for interacting with the database (read, insert, update, etc)
 */