const {
    registerValidation,
    loginValidation,
    updateDetailsValidation
} = require("../validation")
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {

    //validate the data with hapi/Joi
    const {
        error
    } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check if the email is already exist
    const userExist = await User.findOne({
        email: req.body.email
    })
    if (userExist) return res.status(400).send('The email address exists in the system. Please login')

    //check if the username is already exist
    const usernameExist = await User.findOne({
        username: req.body.username
    })
    if (usernameExist) return res.status(400).send('The username you selected exists in the system. Please select another username')

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create the user object and upload it to the database
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        social: req.body.social,
        games: req.body.games,
        language: req.body.language,
        profilePicture: req.body.profilePicture,
        allowPublish: req.body.allowPublish
    })

    try {
        const savedUser = await user.save()
        res.send("the user created successfuly !").status(200)

    } catch (err) {
        res.json({
            err
        }).status(400)
    }
}

const Login = async (req, res) => {

    //validate the data with hapi/Joi
    const {
        error
    } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking if the email exist
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send('Email or password is wrong. try again.')

    //check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or password is wrong. try again.')

    //sign the jwt
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN)

    //send success response with the auth token
    res.json({token: token}).status(200)

}

const updatePersonalDetails = async (req, res) => {

    //validate the data with hapi/Joi
    const {
        error
    } = updateDetailsValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //update the details
    await User.findOneAndUpdate({
        _id: req.user._id
    }, req.body)
    res.send("Details updated successfuly!").status(200)
}

const getPersonalDetails = async (req, res) => {

    //find the user and send the data
    const userData = await User.findOne({
        _id: req.user._id
    })
    res.json(userData).status(200)

}
module.exports = {
    Register,
    Login,
    updatePersonalDetails,
    getPersonalDetails
}