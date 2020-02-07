import { User } from '../models/User';
import { db } from '../config/database';
import { Group } from '../models/Group';

const { Op } = require('sequelize');

function findUsersByLogin(loginSubstring, limit) {
    const users = User.scope('active')
        .findAll({
            where: {
                user_login: {
                    [Op.substring]: loginSubstring
                }
            },
            limit,
            order: [[db.col('user_login'), 'ASC']]
        });

    return users;
}

function findAllUsers() {
    return User.findAll({
        include: {
            model: Group
        }
    });
}

function findUserById(user_id) {
    const user = User.scope('active')
        .findOne({
            where: {
                user_id
            }
        });

    return user;
}

function createUser(user) {
    User.create(user);
}

function updateUserById(user) {
    User.update(user, {
        where: {
            user_id: user.user_id
        }
    });
}

function deleteUserById(user_id) {
    User.scope('active')
        .update({ user_isDeleted: true, updatedAt: new Date() }, {
            where: {
                user_id
            }
        });
}

export const DBRequest = {
    findUsersByLogin,
    findAllUsers,
    findUserById,
    updateUserById,
    createUser,
    deleteUserById
};
