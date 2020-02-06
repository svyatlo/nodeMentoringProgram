import { controllers } from '../controllers/user';
import { schema } from '../data-access/validationSchema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/users')
    .get((req, res) => {
        controllers.getUsers(req, res);
    })
    .post(validator.body(schema.userSchema), (req, res) => {
        controllers.postUser(req, res);
    });

router.route('/users/:id')
    .all(validator.params(schema.idSchema), (req, res, next) => next())
    .get((req, res) => controllers.getUserById(req, res))
    .put((req, res) => controllers.updateUserById(req, res))
    .delete((req, res) => controllers.deleteUserById(req, res));

export { router };
