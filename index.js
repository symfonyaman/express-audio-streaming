const express = require('express')
const app = express()
const fs = require('fs');
const port = 3000

// const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
  });

// Define a route for audio streaming
app.get('/audio', (req, res) => {
    const audioFileStream = fs.createReadStream('./audio/song.mp3');
    audioFileStream.on('data', (chunk) => {
        // Log the streaming process
        console.log(`Streaming ${chunk.length} bytes of audio data.`);
      });
      
      audioFileStream.on('end', () => {
        // Log the completion of streaming
        console.log('Audio streaming completed.');
      });
    
      // Set the appropriate response headers
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Accept-Ranges', 'bytes');
    
      // Stream the audio file to the response
      audioFileStream.pipe(res);
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  