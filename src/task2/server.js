import persons from './exampleDB';
import { get } from './api/get';
import { getById } from './api/getById';
import { updateById } from './api/updateById';
import { post } from './api/post';
import { deleteById } from './api/deleteById';

const express = require('express');
const app = express();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const PORT = process.env.PORT || 5000;

const querySchema = Joi.object({
    id: Joi.required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.string().required(),
    isDeleted: Joi.boolean().required()
});

app.set('port', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/persons', validator.query(querySchema), (req, res) => get(req, res, persons));
app.get('/persons/:id', (req, res) => getById(req, res, persons));
app.put('/persons/:id', (req, res) => updateById(req, res, persons));
app.post('/persons', (req, res) => post(req, res, persons));
app.delete('/persons/:id', (req, res) => deleteById(req, res, persons));

app.listen(PORT, () => {
    console.log(`server started at http:/localhost: ${app.get('port')}`);
});
