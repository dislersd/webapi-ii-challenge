const express = require("express");


const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Ah haaa! It's dat boi again!</h1>`);
});

module.exports = server;