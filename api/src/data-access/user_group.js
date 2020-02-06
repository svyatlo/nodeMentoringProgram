// import { Group } from '../models/Group';
// import { User } from '../models/User';
import { UserGroup } from '../models/UserGroup';

function addUsersToGroup(object) {
    UserGroup.bulkCreate(object);
}

export const DBRequest = {
    addUsersToGroup
};
