import { controllers } from '../controllers/user';
import { schema } from '../middleware/validation-schema';
import { checkToken } from '../middleware/check-token';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/users')
    .get(checkToken, (req, res) => {
        controllers.getUsers(req, res);
    })
    .post(checkToken, validator.body(schema.userSchema), (req, res) => {
        controllers.postUser(req, res);
    });

router.route('/users/:id')
    .all(checkToken, validator.params(schema.idSchema), (req, res, next) => next())
    .get((req, res) => controllers.getUserById(req, res))
    .put((req, res) => controllers.updateUserById(req, res))
    .delete((req, res) => controllers.deleteUserById(req, res));

export { router };
