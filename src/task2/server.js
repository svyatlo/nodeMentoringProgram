import persons from './exampleDB';
import uuidv4 from 'uuid/v4';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/persons', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'persons retrieved successfully',
        persons
    });
});

app.get('/persons/:id', (req, res) => {
    persons.map((person) => {
        if (req.params.id === person.id) {
            return res.status(200).send({
                success: 'true',
                message: 'Person deleted successfully',
                person
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'Person not found'
    });
});

app.put('/persons/:id', (req, res) => {
    let foundedPerson = null;
    let foundedPersonIndex = null;

    persons.map((person, personIndex) => {
        if (req.params.id === person.id) {
            foundedPerson = person;
            foundedPersonIndex = personIndex;
        }
    });

    if (!foundedPerson) {
        return res.status(404).send({
            success: 'false',
            message: 'Person not found.'
        });
    }

    const updatedPerson = {
        id: foundedPerson.id,
        login: req.body.login || foundedPerson.login,
        password: req.body.password || foundedPerson.password,
        age: req.body.age || foundedPerson.age,
        isDeleted: req.body.isDeleted || foundedPerson.isDeleted
    };

    persons.splice(foundedPersonIndex, 1, updatedPerson);

    return res.status(201).send({
        success: 'true',
        message: 'person updated successfully',
        updatedPerson
    });
});

app.post('/persons', (req, res) => {
    const id = uuidv4();
    const person = {
        id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    persons.push(person);

    return res.status(201).send({
        success: 'true',
        message: 'person added successfully',
        person
    });
});

app.delete('/persons/:id', (req, res) => {
    persons.map((person) => {
        if (req.params.id === person.id) {
            person.isDeleted = true;
            return res.status(200).send({
                success: 'true',
                message: 'Person deleted successfully'
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'Person not found'
    });
});

app.listen(PORT, () => {
    console.log(`server started at http:/localhost: ${app.get('port')}`);
});
