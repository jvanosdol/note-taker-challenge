// app.get('api/notes')
// app.post('api/notes') each new review that we create is unique use uuid
// app.delete('api/notes')


const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const uuid = require('uuid')

let db = require('./db/db.json')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'))
    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);

}
  
 
);

app.post('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    res.json(db);
    
});

app.listen(PORT, () => {
    console.log(`Listening in PORT ${PORT}`)
})

