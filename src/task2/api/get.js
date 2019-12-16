export function get(req, res, database) {
    return res.status(200).send({
        success: 'true',
        message: 'persons retrieved successfully',
        database
    });
}
