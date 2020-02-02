import { User } from '../models/User';
import { db } from '../config/database';

const { Op } = require('sequelize');

function findUsersByLogin(loginSubstring, limit) {
    const users = User.scope('active')
        .findAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring
                }
            },
            limit: limit,
            order: [[db.col('login'), 'ASC']]
        });

    return users;
}    

function findAllUsers() {
    return User.findAll();
}

function findUserById(id) {
    const user = User.scope('active')
        .findOne({
            where: {
                id
            }
        });

    return user;
}

function createUser(user) {
    return User.create(user);
}

function updateUserById(user) {
   User.update(user, {
        where: {
            id: user.id
        }
    });
}

function deleteUserById(id) {
    User.scope('active')
        .update({ isDeleted: true, updatedAt: new Date }, {
            where: {
                id
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
