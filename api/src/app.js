import { router } from './routes/index';
import { db } from './config/database';
import cors from 'cors';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5858;

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database: ', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router.userRouter);
app.use(router.groupRouter);
app.use(router.authenticateRouter);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
    console.error('There was an uncaught error', error);
    process.exit(1);
})
