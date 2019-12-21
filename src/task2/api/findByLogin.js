import { getAutoSuggestUsers } from '../services/getAutoSuggestUsers';

export function findByLogin(req, res) {
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
