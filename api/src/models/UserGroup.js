import { db } from '../config/database';
import { User } from './User';
import { Group } from './Group';

export const UserGroup = db.define('user_group', {}, { timestamps: false });

Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });
