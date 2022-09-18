// app.get('api/notes')
// app.post('api/notes') each new review that we create is unique use uuid
// app.delete('api/notes')


const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const uuid = require('uuid')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));



let db = require('./db/db.json')


// function writeToDB(note) {
//     fs.appendFileSync('./db/db.json', JSON.stringify(note));
// }

app.get('/', (req, res) =>
  //res.sendFile(path.join(__dirname, './public/index.html'))
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {

  
  res.sendFile(path.join(__dirname, './public/notes.html'))
    // // Log our request to the terminal
    // console.info(`${req.method} request received to get reviews`);

}
  
 
);

app.get('/api/notes', (req, res) => {
    console.log('/api/notes-get');

    let notesData = fs.readFileSync('./db/db.json', 'utf8')

    res.json(JSON.parse(notesData));
    //console.log(res.json(JSON.parse(notesData)));

});

app.post('/api/notes', (req, res) => {
    //res.sendFile(path.join(__dirname, './public/notes.html'));

    const newNotes = {
        title: req.body.title,
        text: req.body.text,
        note_id: uuid.v1()
      };

      let notesData = fs.readFileSync('./db/db.json', 'utf8')

      let notesDataJSON = JSON.parse(notesData);
      notesDataJSON.push(newNotes)


      fs.writeFile(`./db/db.json`, JSON.stringify(notesDataJSON), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for user has been written to JSON file`
          )
    );

    return res.json(notesDataJSON )

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    //res.json(db);
    
});

app.listen(PORT, () => {
    console.log(`Listening in PORT ${PORT}`)
})

