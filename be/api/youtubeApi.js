const express = require('express')
const {YoutubeAPIKey} = require('../config.js')
const axios = require('axios')
const baseUrl = "https://youtube.googleapis.com/youtube/v3"

const YoutubeAPI = express.Router()

YoutubeAPI.get("/", (req, res)=>{
    const {q} = req.query
    axios({
        method : 'get',
        url : `${baseUrl}/search?part=snippet&maxResults=10&q=${q}&type=video&key=${YoutubeAPIKey}`
    })
    .then(respone=>{
       const listVideo = respone.data.items
       res.json(listVideo)
    })
})

module.exports = YoutubeAPI