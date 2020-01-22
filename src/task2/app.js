import router from './routs/routs';

const db = require('./config/database');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database: ', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});

