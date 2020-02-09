import { db } from '../config/database';
import { User } from './User';
import { Group } from './Group';

export const UserGroup = db.define('user_group', {}, { timestamps: false });

Group.belongsToMany(User, { through: UserGroup, foreignKey: 'group_id' });
User.belongsToMany(Group, { through: UserGroup, foreignKey: 'user_id' });
