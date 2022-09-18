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

function writeToDB(note) {
    fs.appendFileSync('./db/db.json', JSON.stringify(note));
}

app.get('/', (req, res) =>
  //res.sendFile(path.join(__dirname, './public/index.html'))
  res.writeFileSync(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'))
    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);
}
  
 
);

app.get('/api/notes', (req, res) => {
    console.log('/api/notes-get');
    //console.log(res.json(db));
    console.log(res);
});

app.post('/notes', (req, res) => {
    //res.sendFile(path.join(__dirname, './public/notes.html'));
    let newNote = req.body;
    console.log(req)
    newNote.id = uuid.v1();
    db.push(newNote);
    writeToDB(db);
    

    const newNotes = {
        title: req.body.title,
        text: req.body.text,
        note_id: uuid.v1()
      };

    // req.body.title
    // req.body.text

      const reviewString = JSON.stringify(newNotes);

db.push(reviewString)

      fs.writeFileSync(`./db/db.json`, reviewString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for user has been written to JSON file`
          )
    );

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    res.json(db);
    
});

app.listen(PORT, () => {
    console.log(`Listening in PORT ${PORT}`)
})

