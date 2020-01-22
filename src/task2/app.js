import router from './routes/user';

const sequelize = require('./config/database');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5003;

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database: ', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});

