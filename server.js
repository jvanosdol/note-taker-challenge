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

// HTTP MEthods
// GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS



// function writeToDB(note) {
//     fs.appendFileSync('./db/db.json', JSON.stringify(note));
// }

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, './public/index.html'))
 //  console.log(req);   // USER Submitting form data
  res.sendFile(path.join(__dirname, './public/index.html'))
 // res.send("Hello There"); // SEND STRING type data
 // res.json({ "name": "Bull"});
});

app.post('/', (req, res) => {
  // create temp object fill in with USER data
  const newObject = {
    first_name: req.body.first,
    last_name: req.body.last
  }

  // Save this new data into a Database --> Object, Array


  // send a response back
})


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
        note_id: uuid
      };

      let notesData = fs.readFileSync('./db/db.json', 'utf8')
      //let notesData = db;

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

app.delete('/api/notes/:id', (req, res) => {

  console.log(req.params.id)
  // console.log(req.body.name)
  // we want to capture what the ID is

  // Make a request for our DATA --> fs.readFile()

  // remove specified ID (Find the record by ID)

  // Rewrite the data without the old record (Return(respond) with the Information)

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
    //res.json(db);
    
});

app.listen(PORT, () => {
    console.log(`Listening in PORT ${PORT}`)
})

