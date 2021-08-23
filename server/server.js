require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')

connectDB()

const app = express()

//middleware
app.use(express.json())

//Routes
app.use('/ap1/v1/bootcamps', require('./routes/bootcampRoutes'))


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server running on port ${PORT}`))