export function deleteById(req, res, database) {
    database.map((person) => {
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
}
