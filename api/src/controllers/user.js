import uuidv4 from 'uuid/v4';
import { DBRequest } from '../data-access/user';

async function getUsers(req, res) {
    let users = [];

    try {
        if (req.query.loginSubstring && req.query.limit) {
            users = await DBRequest.findUsersByLogin(req.query.loginSubstring, req.query.limit);
        } else {
            users = await DBRequest.findAllUsers();
        }

        if (users.length) {
            res.status(200).send({
                success: 'true',
                users
            });
        } else {
            res.status(404).send({
                success: 'false',
                message: 'There aren\'t any person for this request'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function getUserById(req, res) {
    try {
        const user = await DBRequest.findUserById(req.params.id);

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({
                success: 'false',
                message: 'User not found'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function postUser(req, res) {
    const user_id = uuidv4();
    const user = {
        user_id,
        user_login: req.body.login,
        user_password: req.body.password,
        user_age: req.body.age,
        user_isDeleted: req.body.isDeleted
    };

    await DBRequest.createUser(user);

    return res.status(201).send({
        success: 'true',
        message: 'User added successfully',
        user
    });
}

async function updateUserById(req, res) {
    try {
        const user = await DBRequest.findUserById(req.params.id);

        if (user) {
            const updatedUser = {
                user_id: req.params.id,
                user_login: req.body.login || user.user_login,
                user_password: req.body.password || user.user_password,
                user_age: req.body.age || user.user_age,
                user_isDeleted: req.body.isDeleted || user.user_isDeleted,
                createdAt: user.createdAt,
                updatedAt: new Date()
            };

            await DBRequest.updateUserById(updatedUser);

            res.status(200).send({
                success: 'true',
                message: 'User updated successfully'
            });
        } else {
            res.status(404).send({
                success: 'false',
                message: 'User not found'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

async function deleteUserById(req, res) {
    try {
        const user = await DBRequest.findUserById(req.params.id);

        if (user) {
            await DBRequest.deleteUserById(req.params.id);

            res.status(200).send({
                success: 'true',
                message: 'User deleted successfully'
            });
        } else {
            res.status(404).send({
                success: 'false',
                message: 'User not found'
            });
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const controllers = {
    getUsers,
    getUserById,
    updateUserById,
    postUser,
    deleteUserById
};
