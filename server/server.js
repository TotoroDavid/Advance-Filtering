/** The process.env property returns an object containing the user environment.*/
require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

connectDB()

const app = express()

/** middleware */
app.use(express.json())

/** Routes middleware */
app.use('/ap1/v1/bootcamps', require('./routes/bootcampRoutes'))

/** error handler */
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server running on port ${PORT}`))