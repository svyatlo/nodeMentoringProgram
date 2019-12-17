export function getById(req, res, database) {
    database.map((person) => {
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
}
