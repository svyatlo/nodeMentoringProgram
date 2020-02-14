import { UserGroup } from '../models/UserGroup';
import { db } from '../config/database';

async function addUsersToGroup(groupId, userIds) {
    const t = await db.transaction();

    try {
        const transactions = userIds.map(async (userId) => {
            await UserGroup.create({ group_id: groupId, user_id: userId }, { transaction: t });
        });

        await Promise.all(transactions);
        await t.commit();
        return true;
    } catch (error) {
        await t.rollback();
    }
}

export const DBRequest = {
    addUsersToGroup
};
