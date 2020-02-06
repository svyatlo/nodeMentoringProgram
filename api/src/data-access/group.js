import { Group } from '../models/Group';

function findAllGroups() {
    return Group.findAll();
}

function findGroupById(id) {
    const group = Group.findOne({
        where: {
            id
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
            id: group.id
        }
    });
}

function deleteGroupById(id) {
    Group.destroy({
        where: {
            id
        }
    });
}

function findGroupIdByName(name) {
    const groupId = Group.findOne({
        where: {
            name
        }
    });

    return groupId;
}

export const DBRequest = {
    findAllGroups,
    findGroupById,
    updateGroupById,
    createGroup,
    deleteGroupById,
    findGroupIdByName
};
