const express  = require('express')
const http = require('http')
const YoutubeAPI = require('./api/youtubeApi')
const callSocketIo = require('./socket.io/call.socket')
const cors = require('cors')
const app = express()
const server = http.createServer(app)

app.use(cors({
    origin : "*"
}))
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("HI")
})
app.use('/search', YoutubeAPI)


callSocketIo(server)

server.listen(process.env.PORT || 5000, ()=>{
    console.log("Start Listenning")
})