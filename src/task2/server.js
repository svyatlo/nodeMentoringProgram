import router from './routs/routs';

const express = require('express');
const app = express();
const port = 5000;

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
    console.log(`server started at http:/localhost: ${app.get('port')}`);
});
