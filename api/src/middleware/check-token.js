import jwt from 'jsonwebtoken';
import { authenticate, message } from '../config/constants';
import { logger } from '../config/logger';
import { createLogLine } from '../utils/create-log-line';

export function checkToken(req, res, next) {
    const method = 'checkToken';

    if (!req.headers.hasOwnProperty(authenticate.tokenHeader)) {
        res.sendStatus(401);
        logger.error({ method, message: message.invalidHeader });
    }
    const token = req.headers[authenticate.tokenHeader];

    try {
        if (token) {
            jwt.verify(token, authenticate.secretWord, (error, decoded) => {
                if (error) {
                    res.sendStatus(403);
                    logger.error({ method, message: `${error}` });
                } else {
                    const parameters = createLogLine(decoded);
                    logger.info({ method, parameters, message: message.decoded });
                    next();
                }
            });
        }
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}
