require('dotenv').config()
const mongoose = require('mongoose')

const connectToMongo = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connection to the DataBase is successful...')
    }).catch(error => console.log(error))
}

module.exports = connectToMongo