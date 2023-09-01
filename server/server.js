require('dotenv').config()

const express = require("express")
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.DB_PORT || 8080

// midlleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, './frontens/build')))
app.use(bodyParser.json())

const userController = require('./controller/usersController')

app.get('/api/v1/users', (req, res) => {
    userController.getAllusers().then((data) => res.json(data))
});

app.post('/api/v1/users', (req, res) => {
    console.log('Eto yung body', req.body)
    userController.createUsers(req.body.users).then((data) => res.json(data))
});

app.put('/api/v1/users', (req, res) => {
    userController.updateUsers(req.body).then((data) => res.json(data))
});

app.delete('/api/v1/users/:id', (req, res) => {
    userController.deleteUsers(req.params.id).then((data) => res.json(data))
});
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})