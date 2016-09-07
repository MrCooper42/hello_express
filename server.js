'use strict';

const fs = require('fs');
const path = require('path')
const guestsPath = path.join(__dirname, "guests.json")

const express = require('express');
const app = express();
const env = require('dotenv').config()
const port = process.env.PORT || 8000;

// app.use((req, res) => res.send('<br><br><h1 style="text-align: center; color: red;">Hello World</h1><br><iframe src="//giphy.com/embed/ECRWpamBUH3J6" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen align="middle"></iframe>'));

app.get('/', (req, res) => res.send('<br><br><h1 style="text-align: center; color: red;">Hello World</h1><br><iframe src="//giphy.com/embed/ECRWpamBUH3J6" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen align="middle"></iframe>'));


app.get('/guests', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      console.error('error', err.stack)
      return res.sendStatus(500)
    }
    let guests = JSON.parse(guestsJSON)
    res.send(guests)
  })
})

app.get('/guests/:id', (req, res) => {
  fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
    if (err) {
      console.error('errors', err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set("Content-Type", "text/plain");
    res.send(guests[id]);
  });
});

app.listen(port, () => console.log('Listening on port', port));
