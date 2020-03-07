import { controllers } from '../controllers/group';
import { schema } from '../middleware/validation-schema';
import { checkToken } from '../middleware/check-token';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/groups')
    .get(checkToken, (req, res) => {
        controllers.getAllGroups(req, res);
    })
    .post(checkToken, validator.body(schema.groupSchema), (req, res) => {
        controllers.createGroup(req, res);
    });

router.route('/groups/:id')
    .all(checkToken, validator.params(schema.idSchema), (req, res, next) => next())
    .get((req, res) => controllers.getGroupById(req, res))
    .put((req, res) => controllers.updateGroupById(req, res))
    .delete((req, res) => controllers.deleteGroupById(req, res))
    .post((req, res) => controllers.addUsersToGroup(req, res));

export { router };
