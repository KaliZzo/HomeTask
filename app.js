const express = require('express');
const app = express()
const port = 3001


const API_Key =process.env.PixaBay_API 


app.get('/',(req,res)=>{
    res.send('server is running (mission 1)')
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}...`)
})