import uuidv4 from 'uuid/v4';
import { User } from '../models/User';
import { db } from '../config/database';

const { Op } = require('sequelize');

function get(req, res) {
    if (req.query.loginSubstring && req.query.limit) {
        User.scope('active')
            .findAll({
                where: {
                    login: {
                        [Op.substring]: req.query.loginSubstring
                    }
                },
                limit: req.query.limit,
                order: [[db.col('login'), 'ASC']]
            })
            .then((users) => {
                if (users.length) {
                    res.status(200).send({
                        success: 'true',
                        users
                    });
                } else {
                    res.status(404).send({
                        success: 'false',
                        message: 'Trere are not any person with the login'
                    });
                }
            });
    } else {
        User.findAll()
            .then((users) => {
                if (users) {
                    res.status(200).send({
                        success: 'true',
                        users
                    });
                } else {
                    res.status(404).send({
                        success: 'false',
                        message: 'Trere aren`t any person in database'
                    });
                }
            })
            .catch(error => console.log('Error: ', error));
    }
}

function getById(req, res) {
    User.scope('active')
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({
                    success: 'false',
                    message: 'User not found'
                });
            }
        })
        .catch(error => console.log('Error: ', error));
}

function post(req, res) {
    const id = uuidv4();
    const person = {
        id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    User.create(person);

    return res.status(201).send({
        success: 'true',
        message: 'User added successfully',
        person
    });
}

function updateById(req, res) {
    User.scope('active')
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            if (user) {
                User.update({
                    login: req.body.login || user.login,
                    password: req.body.password || user.password,
                    age: req.body.age || user.age,
                    isDeleted: req.body.isDeleted || user.isDeleted,
                    updetedAt: new Date()
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => {
                        res.status(200).send({
                            success: 'true',
                            message: 'User updated successfully'
                        });
                    });
            } else {
                res.status(404).send({
                    success: 'false',
                    message: 'User not found'
                });
            }
        })
        .catch(error => console.log('Error: ', error));
}

function deleteById(req, res) {
    User.scope('active')
        .update({ isDeleted: true }, {
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (user) {
                res.status(200).send({
                    success: 'true',
                    message: 'Person deleted successfully'
                });
            } else {
                res.status(404).send({
                    success: 'false',
                    message: 'User not found'
                });
            }
        })
        .catch(error => console.log('Error: ', error));
}

export const routeHandlers = {
    get,
    getById,
    updateById,
    post,
    deleteById
};
