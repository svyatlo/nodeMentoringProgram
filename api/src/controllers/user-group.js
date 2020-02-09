import { DBRequest } from '../data-access/user_group';

async function addUsersToGroup(req, res) {
    try {
        const transactionResult = await DBRequest.addUsersToGroup(req.body.groupId, req.body.userIds);

        if (transactionResult) {
            return res.status(201).send({
                success: true,
                message: 'User(s) were added to group successfully.'
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Transaction was cancelled. Please check if user is already included into group.'
            });
        }
        
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const controllers = {
    addUsersToGroup
};
