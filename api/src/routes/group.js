import { controllers } from '../controllers/group';
import { schema } from '../data-access/validationSchema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/groups')
    .get((req, res) => {
        controllers.getAllGroups(req, res);
    })
    .post(validator.body(schema.groupSchema), (req, res) => {
        controllers.createGroup(req, res);
    });

router.route('/groups/:id')
    .all(validator.params(schema.idSchema), (req, res, next) => next())
    .get((req, res) => controllers.getGroupById(req, res))
    .put((req, res) => controllers.updateGroupById(req, res))
    .delete((req, res) => controllers.deleteGroupById(req, res));

export { router };
