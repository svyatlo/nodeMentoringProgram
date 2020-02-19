import uuidv4 from 'uuid/v4';
import { DBRequest } from '../data-access/user';
import { logger } from '../config/logger';
import { createLogRequestLine } from '../utils/create-log-request-line';
import { message } from '../config/constants';

async function getUsers(req, res) {
    const requestArguments = {
        loginSubstring: req.query.loginSubstring,
        limit: req.query.limit
    };

    const method = 'getUsers';
    const queryParameters = createLogRequestLine(requestArguments);
    let users = [];

    try {
        if (req.query.loginSubstring && req.query.limit) {
            users = await DBRequest.findUsersByLogin(req.query.loginSubstring, req.query.limit);
        } else {
            users = await DBRequest.findAllUsers();
        }

        if (!users.length) {
            logger.error({ method, queryParameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        res.status(200).send(users);
        logger.info({ method, queryParameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function getUserById(req, res) {
    const requestArguments = {
        id: req.params.id
    };

    const method = 'getUserById';
    const queryParameters = createLogRequestLine(requestArguments);

    try {
        const user = await DBRequest.findUserById(req.params.id);

        if (!user) {
            logger.error({ method, queryParameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        res.status(200).send(user);
        logger.info({ method, queryParameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function postUser(req, res) {
    const user_id = uuidv4();
    const user = {
        user_id,
        user_login: req.body.login,
        user_password: req.body.password,
        user_age: req.body.age,
        user_isDeleted: req.body.isDeleted
    };

    const method = 'postUser';
    const queryParameters = createLogRequestLine(user);

    try {
        const postResult = await DBRequest.createUser(user);

        if (!postResult) {
            logger.error({ method, queryParameters, message: message.transactionFailed });
            return res.status(400).send(message.transactionFailed);
        }

        res.status(201).send(user);
        logger.info({ method, queryParameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function updateUserById(req, res) {
    const requestArguments = {
        id: req.params.id
    };

    const method = 'updateUserById';
    const queryParameters = createLogRequestLine(requestArguments);

    try {
        const user = await DBRequest.findUserById(req.params.id);

        if (!user) {
            logger.error({ method, queryParameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        const updatedUser = {
            user_id: req.params.id,
            user_login: req.body.login || user.user_login,
            user_password: req.body.password || user.user_password,
            user_age: req.body.age || user.user_age,
            user_isDeleted: req.body.isDeleted || user.user_isDeleted,
            createdAt: user.createdAt,
            updatedAt: new Date()
        };

        const updatedQueryParameters = createLogRequestLine(updatedUser);
        const updateResult = await DBRequest.updateUserById(updatedUser);

        if (!updateResult) {
            logger.error({ method, queryParameters: updatedQueryParameters, message: message.transactionFailed });
            return res.status(400).send(message.failedUpdate);
        }

        res.status(200).send(message.successUpdate);
        logger.info({ method, queryParameters: updatedQueryParameters, message: message.successUpdate });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function deleteUserById(req, res) {
    const requestArguments = {
        id: req.params.id
    };

    const method = 'deleteUserById';
    const queryParameters = createLogRequestLine(requestArguments);

    try {
        const user = await DBRequest.findUserById(req.params.id);

        if (!user) {
            logger.error({ method, queryParameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        const deleteResult = await DBRequest.deleteUserById(req.params.id);

        if (!deleteResult) {
            logger.error({ method, queryParameters, message: message.transactionFailed });
            return res.status(400).send(message.failedRemove);
        }

        res.status(200).send(message.successRemove);
        logger.info({ method, queryParameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

export const controllers = {
    getUsers,
    getUserById,
    updateUserById,
    postUser,
    deleteUserById
};
