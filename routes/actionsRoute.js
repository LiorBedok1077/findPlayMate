const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const actionsController = require('../controllers/actionsController')


router.post('/findMatch/:game', verifyToken, (req, res) => {

    actionsController.findMatch(req, res)
})

module.exports = router