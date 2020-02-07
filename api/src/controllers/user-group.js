import { DBRequest } from '../data-access/user_group';
// import { DBRequest as userDBRequest } from '../data-access/user';
// import { DBRequest as groupDBRequest } from '../data-access/group';

async function addUsersToGroup(req, res) {
    const groupId = req.body.groupId;
    const userIds = req.body.userIds;
    console.log('groupId: ', groupId, ', userIds: ', userIds);

    const usersBelongToGroup = [];

    userIds.forEach(userId => usersBelongToGroup.push({ groupGroupId: groupId, userUserId: userId }));
    console.log('usersBelongToGroup: ', usersBelongToGroup);

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
