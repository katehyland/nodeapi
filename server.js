const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();             

//using MongoClient to interact with database. We initialize the app as an instance of Express, our framework 

const port = 8040;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true}, (err, database) => {
    if (err) return console.log(err)
    database = database.db("notes")

    require('./app/routes')(app, database);
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })

// MongoClient.connect(db.url, (err, database) => {
//     if (err) return console.log(err);
//     const database = database.db("note-api")
//     require('./app/routes')(app, database);
//     app.listen(port, () => {
//         console.log('We are live on ' + port)
// })
// });

//We tell our app to start listening for HTTP requests & we specify what port