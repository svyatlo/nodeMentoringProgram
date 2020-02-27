import { db } from '../config/database';
import { User } from './user';
import { Group } from './group';

export const UserGroup = db.define('user_group', {}, { timestamps: false });

Group.belongsToMany(User, { through: UserGroup, foreignKey: 'group_id' });
User.belongsToMany(Group, { through: UserGroup, foreignKey: 'user_id' });
