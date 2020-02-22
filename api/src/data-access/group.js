import { Group } from '../models/group';
import { User } from '../models/user';
import { UserGroup } from '../models/user-group';
import { db } from '../config/database';

function findAllGroups() {
    return Group.findAll({
        include: {
            model: User
        }
    });
}

function findGroupById(group_id) {
    const group = Group.findOne({
        include: {
            model: User
        },
        where: {
            group_id
        }
    });

    return group;
}

async function createGroup(group) {
    const t = await db.transaction();
    try {
        await Group.create(group, { transaction: t });
        await t.commit();
        return group;
    } catch (error) {
        await t.rollback();
    }
}

async function updateGroupById(group) {
    const t = await db.transaction();
    try {
        await Group.update(group, {
            where: {
                group_id: group.group_id
            },
            transaction: t
        });
        await t.commit();
        return group;
    } catch (error) {
        await t.rollback();
    }
}

async function deleteGroupById(group_id) {
    const t = await db.transaction();
    try {
        await Group.destroy({
            where: {
                group_id
            }
        });
        await t.commit();
        return true;
    } catch (error) {
        await t.rollback();
    }
}

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
    findAllGroups,
    findGroupById,
    updateGroupById,
    createGroup,
    deleteGroupById,
    addUsersToGroup
};
