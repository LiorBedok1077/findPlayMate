const User = require('../models/User')

//get all the users that play the spesific game, and choose 1 random user.
const findMatch = async (req, res) => {

    const user = await User.findOne({
        _id: req.user._id
    })
    const language = user.language
    const counted = await User.countDocuments({
        games: parseInt(req.params.game),
        language: (language),
        allowPublish: true
    })
    const random = Math.floor(Math.random() * counted)

    User.findOne({
        games: parseInt(req.params.game),
        language: (language),
        allowPublish: true
    }).skip(random).exec(
        (err, result) => {
            res.send({
                username: result.username,
                games: result.games,
                social: result.social,
                birthDate: result.birthDate,
                profilePicture: result.profilePicture
            }).status(200)
        }
    )

}

module.exports = {
    findMatch
}