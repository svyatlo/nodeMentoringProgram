import uuidv4 from 'uuid/v4';
import { DBRequest } from '../data-access/group';
import { logger } from '../config/logger';
import { createLogLine } from '../utils/create-log-line';
import { message } from '../config/constants';

async function getAllGroups(req, res) {
    const method = 'getAllGroups';

    try {
        const groups = await DBRequest.findAllGroups();

        if (!groups.length) {
            logger.error({ method, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        res.status(200).send(groups);
        logger.info({ method, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function getGroupById(req, res) {
    const requestArguments = {
        id: req.params.id
    };

    const method = 'getGroupById';
    const parameters = createLogLine(requestArguments);

    try {
        const group = await DBRequest.findGroupById(req.params.id);

        if (!group) {
            logger.error({ method, parameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        res.status(200).send(group);
        logger.info({ method, parameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function createGroup(req, res) {
    const group_id = uuidv4();
    const group = {
        group_id,
        group_name: req.body.name,
        group_permissions: req.body.permissions
    };

    const method = 'createGroup';
    const parameters = createLogLine(group);

    try {
        const postResult = await DBRequest.createGroup(group);

        if (!postResult) {
            logger.error({ method, parameters, message: message.transactionFailed });
            return res.status(400).send(message.transactionFailed);
        }

        res.status(201).send(group);
        logger.info({ method, parameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function updateGroupById(req, res) {
    const requestArguments = {
        id: req.params.id
    };

    const method = 'updateGroupById';
    const parameters = createLogLine(requestArguments);

    try {
        const group = await DBRequest.findGroupById(req.params.id);

        if (!group) {
            logger.error({ method, parameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        const updatedGroup = {
            group_id: req.params.id,
            group_name: req.body.name || group.group_name,
            group_permissions: req.body.permissions || group.group_permissions,
            createdAt: group.createdAt,
            updatedAt: new Date()
        };

        const updatedparameters = createLogLine(updatedGroup);
        const updateResult = await DBRequest.updateGroupById(updatedGroup);

        if (!updateResult) {
            logger.error({ method, parameters: updatedparameters, message: message.transactionFailed });
            return res.status(400).send(message.failedUpdate);
        }

        res.status(200).send(message.successUpdate);
        logger.info({ method, parameters: updatedparameters, message: message.successUpdate });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function deleteGroupById(req, res) {
    const requestArguments = {
        id: req.params.id
    };

    const method = 'deleteGroupById';
    const parameters = createLogLine(requestArguments);

    try {
        const group = await DBRequest.findGroupById(req.params.id);

        if (!group) {
            logger.error({ method, parameters, message: message.anyNotFound });
            return res.sendStatus(404);
        }

        const deleteResult = await DBRequest.deleteGroupById(req.params.id);

        if (!deleteResult) {
            logger.error({ method, parameters, message: message.transactionFailed });
            return res.status(400).send(message.failedRemove);
        }

        res.status(200).send(message.successRemove);
        logger.info({ method, parameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

async function addUsersToGroup(req, res) {
    const requestArguments = {
        groupId: req.params.id,
        userIds: req.body.userIds
    };

    const method = 'addUsersToGroup';
    const parameters = createLogLine(requestArguments);

    try {
        const transactionResult = await DBRequest.addUsersToGroup(req.params.id, req.body.userIds);

        if (!transactionResult) {
            logger.error({ method, parameters, message: message.transactionFailed });
            return res.sendStatus(404);
        }

        res.status(201).send({ message: message.success });
        logger.info({ method, parameters, message: message.success });
    } catch (error) {
        res.sendStatus(500);
        logger.error({ method, message: `${error}` });
    }
}

export const controllers = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroupById,
    deleteGroupById,
    addUsersToGroup

};
