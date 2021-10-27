const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    firstname:{
        type: String,
        minlength: 2,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        trim: true,
        default: '',
    },
    username: {
        type: String,
        minlength: 4,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    diaryname: {
        type: String,
        required: false,
        default: 'My Diary'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)