/**
 * setting the mongoose connection 
*/
const mongoose = require('mongoose')

const connString = process.env.DATABASE_CONNECTION

const connectDB = async () => {
    try {
        await mongoose.connect(connString, {
            /** false by default. Set to `true` to make all connections set the option by default */
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('MongoDb connection is successfully')
    } catch (error) {
        console.log('MongoDb connection is fail ')
        console.log(error)
        /** If it is necessary to terminate the Node.js process due to an error condition */
        process.exit(1)
    }
}

module.exports = connectDB

/**
 * There are several deprecations in the MongoDB Node.js driver that Mongoose users should be aware
 * of. Mongoose provides options to work around these deprecation warnings, but you need to test whether
 *  these options cause any problems for your application.
 */