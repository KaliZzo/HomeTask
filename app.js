const express = require('express');
const app = express()
const path =require('path')
const port = 3001


const API_Key =process.env.PixaBay_API 


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'main.html'))
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}...`)
})