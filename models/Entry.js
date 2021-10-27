const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const entrySchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    entrybody:{
        type: String,
        minlength: 10,
        required: true,
    },
    significantevent: {
        type: String,
        minlength: 5,
        required: false
    }
},{timestamps: true})

module.exports = mongoose.model('Entry', entrySchema)