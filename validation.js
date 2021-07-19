const Joi = require('@hapi/joi')

//validate the data that sent to the register route
const registerValidation = (data) => {
const schema = Joi.object({
    username: Joi.string().min(6).max(25).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().required(),
    social: Joi.object().required(),
    games: Joi.array().required(),
    language: Joi.string().required(),
    profilePicture: Joi.string(),
    allowPublish: Joi.boolean()
})

return schema.validate(data)
}

//validate the data that sent to the login route
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    })
    
    return schema.validate(data)
    }


    const updateDetailsValidation = (data) => {
        const schema = Joi.object({
            token: Joi.string(),
            username: Joi.string().min(6).max(25),
            email: Joi.string().min(6).email(),
            password: Joi.string().min(6),
            age: Joi.number(),
            social: Joi.object(),
            games: Joi.array(),
            language: Joi.string(),
            profilePicture: Joi.string(),
            allowPublish: Joi.boolean()
        })
        
        return schema.validate(data)
        }

module.exports = {registerValidation, loginValidation, updateDetailsValidation}