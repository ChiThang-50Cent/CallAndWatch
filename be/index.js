const express  = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send("Helloooo")
})

app.listen(5000, ()=>{
    console.log("Start Listenning")
})