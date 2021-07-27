const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 25
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    games: [{type: Number}],
    social: {
        steam: String,
        discord: String,
        twitch: String,
        skype: String
    },
    age: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://i.pinimg.com/originals/68/68/96/686896b40e3a27747def196525f75fb2.jpg"
    },
    allowPublish: {
        type: Boolean,
        default: true
    },
    IP: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)