require('dotenv').config()
const Entry = require('../models/Entry')
const User = require('../models/User')
const {validationResult} = require('express-validator')


//POST: Controller for creating a new Entry. You need to be logged in to do so.
exports.createNewEntry = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json(errors.array())
    }

    try{
        const newEntry = await Entry.create({
            user: req.user,
            entrybody: req.body.entrybody,
            significantevent: req.body.significantevent
        })

        res.json(newEntry)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message: 'Internal Server Error!',
            success: false
        })
    }
} 


//GET: Controller for getting all the entries by a particular userId. You need to be logged in to do so.
exports.getEntryByUserId = async (req, res) => {
    try{
        const isThereEntries = await Entry.countDocuments({user: req.user})

        if(isThereEntries === 0) {
            return res.json([])
        }

        const allEntries = await Entry.find({user: req.user}).sort([['createdAt', -1]]).exec()

        res.json(allEntries)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message: 'Internal Server Error!',
            success: false
        })
    }
}


//GET: Controller for getting a single entry by an entry Id. You need to be logged in to do so.
exports.getEntryByEntryId = async (req, res) => {
    const entryId = req.params.id

    try{
        const isThereAnEntry = await Entry.countDocuments({id: entryId})

        if(isThereAnEntry === 0){
            return res.status(400).json({
                message: 'No such entry was found',
                success: false
            })
        }

        const entryOnTheDataBase = await Entry.findById(entryId)

        res.json(entryOnTheDataBase)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message: 'Internal Server Error!',
            success: false
        })
    }
}


//DELETE: Controller for deleting an entry. You need to be logged in to do so. 
exports.deleteEntryById = async (req, res) => {
    const entryId = req.params.id

    try{
        const deletedEntry = await Entry.findByIdAndDelete(entryId)

        res.json(deletedEntry)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            message: 'Internal Server Error!',
            success: false
        })
    }
}