import { DBRequest } from '../data-access/user';
import { logger } from '../config/logger';
import { createLogLine } from '../utils/create-log-request-line';
import { message, authenticate } from '../config/constants';
import jwt from 'jsonwebtoken';

async function verifyUser(req, res) {
    const requestArguments = {
        login: req.body.login,
        password: req.body.password
    };

    const method = 'verifyUser';
    const parameters = createLogLine(requestArguments);

    try {
        const user = await DBRequest.findUserByLogin(req.body.login);

        if (!user || user.user_password !== req.body.password) {
            logger.error({ method, parameters, message: message.invalidLoginPassword });
            return res.sendStatus(403);
        }

        const payload = { id: user.user_id, isActive: !user.user_isDeleted };
        const token = jwt.sign(payload, authenticate.secretWord, { expiresIn: 20 });

        res.status(200).send(token);
        logger.info({ method, parameters, message: message.validLoginPassword });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

export const controllers = {
    verifyUser

};
