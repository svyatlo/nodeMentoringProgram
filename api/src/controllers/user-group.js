import { DBRequest } from '../data-access/user_group';
import { DBRequest as userDBRequest } from '../data-access/user';
import { DBRequest as groupDBRequest } from '../data-access/group';

async function addUsersToGroup(req, res) {
    const usersBelongToGroup = [];
    const userIds = [];
    const groupName = req.body.groupName;
    const userLogins = req.body.userLogins;

    userLogins.forEach(async (userLogin) => {
        const userId = await userDBRequest.findUserIdByLogin(userLogin);
        userIds.push(userId);
    });

    const groupId = await groupDBRequest.findGroupIdByName(groupName);

    userIds.forEach(userId => {
        const userToGroup = {
            groupId,
            userId
        };
        usersBelongToGroup.push(userToGroup);
    });

    try {
        await DBRequest.addUsersToGroup(usersBelongToGroup);

        return res.status(201).send({
            success: 'true',
            message: 'Users were added to group successfully.'
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const controllers = {
    addUsersToGroup
};
