const express = require('express');
const app = express()
require('dotenv').config()
const path =require('path')
const port = 3001


const API_Key =process.env.PixaBay_API 

const cache = {}

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'main.html'))
})

app.get('/api/v1', async (req,res)=>{
    const query =req.query.q
    const URL = `https://pixabay.com/api/?key=${API_Key}&q=${encodeURIComponent(query)}`

    if (cache[query]) {
        console.log('cache running...');
        return res.json(cache[query]); 
    }

    
    try {
        const response = await fetch(URL); 
        if (!response.ok) {
            throw new Error('Failed to fetch ');
        }

        const data = await response.json(); 
        cache[query] = data
        console.log('Data saved in cache...');
        res.json(data); 
    } catch (error) {
        console.error('Failed to fetch:', error);
        res.status(500).json({ error: 'Failed to fetch'})
    }
})

app.get('/api/v1/randomPhotos', async (req, res) => {
    const URL = `https://pixabay.com/api/?key=${API_Key}&order=latest`;

    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error('Failed to fetch...')
        }

        const data = await response.json();
        res.json(data); 
    } catch (error) {
        console.error('Error to fetch...', error);
        res.status(500).json({ error: 'Failed to fetch....' });
    }
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}...`)
})

