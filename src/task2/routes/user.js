import { routsHandlers } from '../data-access/user';
import { schema } from '../data-access/validationSchema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/users')
    .get((req, res) => {
        routsHandlers.get(req, res);
    })
    .post(validator.body(schema.objectSchema), (req, res) => {
        routsHandlers.post(req, res);
    });

router.route('/users/:id')
    .all(validator.params(schema.idSchema), (req, res, next) => next())
    .get((req, res) => routsHandlers.getById(req, res))
    .put((req, res) => routsHandlers.updateById(req, res))
    .delete((req, res) => routsHandlers.deleteById(req, res));

export default router;
