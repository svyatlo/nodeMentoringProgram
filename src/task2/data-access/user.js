import { getAutoSuggestUsers } from '../utils/getAutoSuggestUsers';
import uuidv4 from 'uuid/v4';

function get(req, res, database) {
    if (req.query.loginSubstring && req.query.limit) {
        return findByLogin(req, res);
    }

    return res.status(200).send(database);
}

function findByLogin(req, res) {
    const response = getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);

    if (response) {
        return res.status(200).send({
            success: 'true',
            response
        });
    }

    return res.status(404).send({
        success: 'false',
        message: 'Trere are not any person with this login'
    });
}

function getById(req, res, database) {
    database.map((person) => {
        if (req.params.id === person.id && !person.isDeleted) {
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
}

function post(req, res, database) {
    const id = uuidv4();
    const person = {
        id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    database.push(person);

    return res.status(201).send({
        success: 'true',
        message: 'person added successfully',
        person
    });
}

function updateById(req, res, database) {
    let foundedPerson = null;
    let foundedPersonIndex = null;

    database.map((person, personIndex) => {
        if (req.params.id === person.id && !person.isDeleted) {
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

    database.splice(foundedPersonIndex, 1, updatedPerson);

    return res.status(201).send({
        success: 'true',
        message: 'person updated successfully',
        updatedPerson
    });
}

function deleteById(req, res, database) {
    database.map((person) => {
        if (req.params.id === person.id && !person.isDeleted) {
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
}

export const routsHandlers = {
    get,
    getById,
    updateById,
    post,
    deleteById,
    findByLogin
};
