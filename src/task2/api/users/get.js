import { findByLogin } from './findByLogin';

export function get(req, res, database) {
    if (req.query.loginSubstring && req.query.limit) {
        return findByLogin(req, res);
    }

    return res.status(200).send(database);
}
