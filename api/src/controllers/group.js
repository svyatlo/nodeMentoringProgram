import uuidv4 from 'uuid/v4';
import { DBRequest } from '../data-access/group';

async function getAllGroups(req, res) {
    try {
        const groups = await DBRequest.findAllGroups();

        if (groups.length) {
            res.status(200).send({
                success: 'true',
                groups
            });
        } else {
            res.status(404).send({
                success: 'false',
                message: 'There aren\'t any group.'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function getGroupById(req, res) {
    try {
        const group = await DBRequest.findGroupById(req.params.id);

        if (group) {
            res.status(200).send(group);
        } else {
            res.status(404).send({
                success: 'false',
                message: `Group with the id ${req.params.id} not found.`
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function createGroup(req, res) {
    const group_id = uuidv4();
    const group = {
        group_id,
        group_name: req.body.name,
        group_permissions: req.body.permissions
    };

    await DBRequest.createGroup(group);

    return res.status(201).send({
        success: 'true',
        message: `Group "${req.body.name}" created successfully.`
    });
}

async function updateGroupById(req, res) {
    try {
        const group = await DBRequest.findGroupById(req.params.id);

        if (group) {
            const updatedGroup = {
                group_id: req.params.id,
                group_name: req.body.name || group.group_name,
                group_permissions: req.body.permissions || group.group_permissions,
                createdAt: group.createdAt,
                updatedAt: new Date()
            };

            await DBRequest.updateGroupById(updatedGroup);

            res.status(200).send({
                success: 'true',
                message: `Group '${updatedGroup.group_name}' updated successfully.`
            });
        } else {
            res.status(404).send({
                success: 'false',
                message: 'Group not found.'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function deleteGroupById(req, res) {
    try {
        const group = await DBRequest.findGroupById(req.params.id);

        if (group) {
            await DBRequest.deleteGroupById(req.params.id);

            res.status(200).send({
                success: 'true',
                message: 'Group deleted successfully'
            });
        } else {
            res.status(404).send({
                success: 'false',
                message: 'Group not found.'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const controllers = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroupById,
    deleteGroupById
};
