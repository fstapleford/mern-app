const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body 
    if (!email) {
        res.status(400)
        throw new Error('No Email. Please enter an email address')
    }
    if (!name) {
        res.status(400)
        throw new Error('No name. Please enter a name')
    }
    if (!password) {
        res.status(400)
        throw new Error('No password. Please enter a password')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body 
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


const getMe = asyncHandler(async (req, res) => {

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    res.status(200).json({user})
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'} )
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}