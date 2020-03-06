import jwt from 'jsonwebtoken';
import { tokenHeader } from '../config/constants';
import { logger } from '../config/logger';

export function checkToken(req, res, next) {
    const token = req.headers[tokenHeader];
    const method = 'checkToken';

    try {
        if (token) {
            jwt.verify(token, 'Secret string in Node.js mentoring program', () => next());
        }
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}
