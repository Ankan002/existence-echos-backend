require('dotenv').config()
const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//POST: Controller for Signing Up a new user.
exports.signUp = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json(errors.array())
    }

    try{
        const isThereExistingUsername = await User.findOne({username: req.body.username})

        if(isThereExistingUsername){
            return res.status(400).json({
                message: 'There is an existing user with the same username',
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname : (req.body.lastname) ? req.body.lastname : '',
            username: req.body.username, 
            password: securedPassword,
            diaryname: (req.body.diaryname) ? req.body.diaryname : 'My Diary'
        })

        const data = {
            user: newUser._id
        }

        const authToken = jwt.sign(data, process.env.SECRET)
        res.json(authToken)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message:'Internal Server Error!',
            success: false
        })
    }
}


//POST: Controller for logging in an user
exports.login = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json(errors.array())
    }

    const {username, password} = req.body

    try{
        const user = await User.findOne({username})

        if(!user){
            return res.status(400).json({
                message: 'Please try again with correct credentials',
                success: false
            })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if(!passwordCompare){
            return res.status(400).json({
                message: 'Please try again with correct credentials',
                success: false
            })
        }

        const data = {
            user: user._id
        }

        const authToken = jwt.sign(data, process.env.SECRET)

        res.json(authToken)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message:'Internal Server Error!',
            success: false
        })
    }
}


//GET: Controller for getting a requested user. You need to be logged in to do so.
exports.getUser = async (req, res) => {
    try{
        const userId = req.user

        const user = await User.findById(userId).select("-password")

        res.json(user)
    }
    catch(error){
        console.error(message.error)
        res.status(500).json({
            message:'Internal Server Error!',
            success: false
        })
    }
}


//PUT: Controller for updating the name of the diary. You need to be logged in to do so.
exports.updateDiaryName = async (req, res) => {

    const {diaryname} = req.body

    try{
        const userId = req.user

        const newUser = {}

        if(diaryname){newUser.diaryname= diaryname}

        const updatedUserWithDiaryName = await User.findByIdAndUpdate(userId, {$set: newUser}, {new: true}).select("-password")

        res.json(updatedUserWithDiaryName)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message: 'Internal Server Error!',
            success: false
        })
    }
}


//Some custom controller
exports.fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')

    if(!token){
        res.status(401).json({
            error: 'Please authenticate using a valid token',
            success: false
        })
    }

    try{
        const data = jwt.verify(token, process.env.SECRET)

        req.user = data.user
        next()
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message:'Internal Server Error!',
            success: false
        })
    }
}