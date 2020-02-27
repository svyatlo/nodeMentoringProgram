import { User } from '../models/user';
import { db } from '../config/database';
import { Group } from '../models/group';

const { Op } = require('sequelize');

function findUsersByLogin(loginSubstring, limit) {
    const users = User.scope('active')
        .findAll({
            include: {
                model: Group
            },
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
            include: {
                model: Group
            },
            where: {
                user_id
            }
        });

    return user;
}

async function createUser(user) {
    const t = await db.transaction();
    try {
        await User.create(user, { transaction: t });
        await t.commit();

        return user;
    } catch (error) {
        await t.rollback();
    }
}

async function updateUserById(user) {
    const t = await db.transaction();

    try {
        await User.update(user, {
            where: {
                user_id: user.user_id
            },
            transaction: t
        });
        await t.commit();

        return user;
    } catch (error) {
        await t.rollback();
    }
}

async function deleteUserById(user_id) {
    const t = await db.transaction();

    try {
        await User.scope('active')
            .update({ user_isDeleted: true, updatedAt: new Date() }, {
                where: {
                    user_id
                },
                transaction: t
            });
        await t.commit();

        return true;
    } catch (error) {
        await t.rollback();
    }
}

export const DBRequest = {
    findUsersByLogin,
    findAllUsers,
    findUserById,
    updateUserById,
    createUser,
    deleteUserById
};
