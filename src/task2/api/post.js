import uuidv4 from 'uuid/v4';

export function post(req, res, database) {
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
