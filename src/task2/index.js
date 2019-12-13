import persons from './db';
const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send(`Hello world from ${JSON.stringify(persons[0])}`);
});

app.listen(port, () => {
    console.log(`server started at http:/localhost: ${port}`);
});
