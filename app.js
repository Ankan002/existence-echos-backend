//Module Imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
const app = express()


//Importing all the routes
const authRoutes = require('./routes/auth')
const entryRoutes = require('./routes/entry')


//Declaring the PORT Number
const port = process.env.PORT || 8000


//Database Connection
connectToMongo()


//Middleware Declaration
app.use(express.json())
app.use(cors())


//All the routes for the app
app.use('/api', authRoutes)
app.use('/api', entryRoutes)


//Starting the App
app.listen(port, () => console.log(`The App is running at ${port}`))