const express  = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const callSocketIo = require('./socket.io/call.socket')

app.get('/', (req, res)=>{
    res.send("Helloooo")
})

callSocketIo(server)

server.listen(5000, ()=>{
    console.log("Start Listenning")
})