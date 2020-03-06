import { DBRequest } from '../data-access/user';
import { logger } from '../config/logger';
import { createLogRequestLine } from '../utils/create-log-request-line';
import { message } from '../config/constants';
import jwt from 'jsonwebtoken';

async function verifyUser(req, res) {
    const requestArguments = {
        login: req.body.login,
        password: req.body.password
    };

    const method = 'verifyUser';
    const queryParameters = createLogRequestLine(requestArguments);

    try {
        const user = await DBRequest.findUserByLogin(req.body.login);

        if (!user || user.user_password !== req.body.password) {
            logger.error({ method, queryParameters, message: message.invalidLoginPassword });
            return res.sendStatus(403);
        }

        const payload = { id: user.user_id, isActive: !user.user_isDeleted };
        const token = jwt.sign(payload, 'Secret string in Node.js mentoring program', { expiresIn: '5s' });

        res.status(200).send(token);
        logger.info({ method, queryParameters, message: message.validLoginPassword });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

export const controllers = {
    verifyUser

};
