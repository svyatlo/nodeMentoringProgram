import persons from './exampleDB';
import { routs } from './api/routs';
import { schema } from './api/validationSchema';

const express = require('express');
const app = express();
const validator = require('express-joi-validation').createValidator({});
const port = 5000;

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/persons', validator.response(schema.arraySchema), (req, res) => routs.get(req, res, persons));
app.get('/persons/:id', validator.params(schema.idSchema), (req, res) => routs.getById(req, res, persons));
app.put('/persons/:id', validator.params(schema.idSchema), (req, res) => routs.updateById(req, res, persons));
app.post('/persons', validator.body(schema.objectSchema), (req, res) => routs.post(req, res, persons));
app.delete('/persons/:id', validator.params(schema.idSchema), (req, res) => routs.deleteById(req, res, persons));

app.listen(port, () => {
    console.log(`server started at http:/localhost: ${app.get('port')}`);
});
