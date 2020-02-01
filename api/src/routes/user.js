import { routeHandlers } from '../data-access/user';
import { schema } from '../data-access/validationSchema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/users')
    .get((req, res) => {
        routeHandlers.get(req, res);
    })
    .post(validator.body(schema.objectSchema), (req, res) => {
        routeHandlers.post(req, res);
    });

router.route('/users/:id')
    .all(validator.params(schema.idSchema), (req, res, next) => next())
    .get((req, res) => routeHandlers.getById(req, res))
    .put((req, res) => routeHandlers.updateById(req, res))
    .delete((req, res) => routeHandlers.deleteById(req, res));

export default router;
