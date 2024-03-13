const express = require('express');
const hostname = '0.0.0.0';
const port = 3001;
const server = express();
const cors = require('cors')

server.use(cors());

let score = { team1: 0, team2: 0 };

setInterval(() => {
    let team = Math.floor(Math.random() * 2) + 1;
    score[`team${team}`]++;
}, 5000);

server.use(express.urlencoded());
server.use(express.json());

server.get('/score', (req, res) => {
    res.json(score);
});

server.listen(port, hostname, () =>
    console.log(`It's running m8, on ${hostname} ${port}`),
);