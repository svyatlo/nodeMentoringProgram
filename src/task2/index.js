import db from './db';
const express = require('express');
const app = express();
const port = 3001;

app.get('/persons', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'persons retrieved successfully',
        persons: db
    });
});

app.listen(port, () => {
    console.log(`server started at http:/localhost: ${port}`);
});
