import { Group } from '../models/Group';
import { User } from '../models/User';

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

function createGroup(group) {
    Group.create(group);
}

function updateGroupById(group) {
    Group.update(group, {
        where: {
            group_id: group.group_id
        }
    });
}

function deleteGroupById(group_id) {
    Group.destroy({
        where: {
            group_id
        }
    });
}

export const DBRequest = {
    findAllGroups,
    findGroupById,
    updateGroupById,
    createGroup,
    deleteGroupById
};
