const express = require('express')
const app = express()

const clients_list = require('../users/users.json')
module.exports = clients_list

app.get('/client_list', (req, res) => {
    for (let client of clients_list) {
        if (client.status === "open") {
            client.status = "closed"
            return res.status(200).json(client.user_id)
        }
    }
    res.status(400).send({message: "There is no available user_id"})
})

app.get('/client_list/:id', (req, res) => {
    let id = parseInt(req.params.id)
    for (let client of clients_list) {
        if (client.id === id) {
            client.status = "open"
            return res.status(200).send({message: 'Client ' + id + ' is available now'})
        }
    }
    res.status(400).send({message: "Not existing id"})
})

app.get('/client_list_all', (req, res) => {
    res.status(200).json(clients_list)
})

app.listen(8000, ()=> {
    console.log('Server listening on port 8000')
})