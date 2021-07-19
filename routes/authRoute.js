const express = require('express')
const authController = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()



router.post('/register', (req, res) => {

    authController.Register(req,res)
})


router.post('/login', (req, res) => {
    
    authController.Login(req, res)
})

router.patch('/updateDetails', verifyToken, (req, res) => {
    authController.updatePersonalDetails(req, res)
})

router.post('/getDetails', verifyToken, (req, res) => {
    authController.getPersonalDetails(req, res)
})
module.exports = router