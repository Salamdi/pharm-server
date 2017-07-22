const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const db            = require('./config/db');
const bodyParser    = require('body-parser');
const parse        = require('./app/parser');
const app           = express();


// PORT
const port = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../dist'));

// DB Connection
MongoClient.connect(db.url, (err, database) => {
  if (err) throw err;
  Promise.all(parse(database))
    .then((result) => {
        console.log(result);
        require('./app/routes')(app, database);
        app.listen(port, (err) => {
            if (err) throw err;
            console.log('We are live on ' + port);
        });
    })
    .catch(err => console.error(err));
});
