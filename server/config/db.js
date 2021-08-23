/**
 * setting the mongoose connection 
*/
const mongoose = require('mongoose')

const connString = process.env.DATABASE_CONNECTION

const connectDB = async () => {
    try {
        await mongoose.connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('MongoDb connection is successfully')
    } catch (error) {
        console.log('MongoDb connection is fail ')
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB