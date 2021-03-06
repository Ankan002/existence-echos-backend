require('dotenv').config()
const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const {signUp, login, getUser, fetchUser, updateDiaryName} = require('../controllers/auth')


//POST: Route for signing up a new User. For performing this you need not to be signed in or validated user.
router.post('/user/signup',[
    body('firstname').isLength({min: 2}).withMessage('Your first name should be at least 2 characters long'),
    body('username').isLength({min:4, max: 30}).withMessage('The username must be at least 4 characters long'),
    body('password').isLength({min: 8, max: 20}).withMessage('The password must be at least 8 characters long and at max it can be 20 characters long')
], signUp)


//POST: Route for logging in an user. For performing this you need not to be signed in.
router.post('/user/login',[
    body('username').isLength({min:4, max: 30}).withMessage('The username must be at least 4 characters long'),
    body('password').isLength({min: 8, max: 20}).withMessage('The password must be at least 8 characters long and at max it can be 20 characters long')
], login)


//GET: Route for getting the user information. For performing this you need to be validated as well as signed in
router.get('/user/getuser', fetchUser, getUser)


//PUT: Route for updating the diary name. For performing this you need to be validated as well as signed in.
router.put('/user/updatediaryname', fetchUser, updateDiaryName)

//GET: TEST route and Controller
router.get('/', (req, res) => {
    res.json({message: 'Hello!'})
})


//export the routes for the main registry file
module.exports = router