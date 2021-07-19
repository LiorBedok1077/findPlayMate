const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.body.token
    console.log(token)
    if(!token) return res.status(401).send('Access denied. please try to login again.')

    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    } catch(err) {
        res.status(401).send('Invalid Token. please try to login again.')
    }
}

module.exports = auth