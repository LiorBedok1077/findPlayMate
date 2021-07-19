const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const actionsRoute = require('./routes/actionsRoute')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoute)
app.use('/actions', actionsRoute)

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to DB.")
})
app.listen(5000, () => {
    console.log("server is up!")
})