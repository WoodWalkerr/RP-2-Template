require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const path = require('path')

const usersController = require('./controller/usersController')


const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, './ui/build/')))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.get('/api/v1/users', (req, res) => {
    usersController.getAllUsers().then((data) => res.json(data))
})

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`)
})
