export function updateById(req, res, database) {
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
