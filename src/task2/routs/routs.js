import routes from '../exampleDB';
import { routsHandlers } from '../api/routsHandlers';
import { schema } from '../api/validationSchema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/users')
    .get((req, res) => {
        validator.response(schema.arraySchema);
        routsHandlers.get(req, res, routes);
    })
    .post((req, res) => {
        validator.body(schema.objectSchema);
        routsHandlers.post(req, res, routes);
    });

router.route('/users/:id')
    .all((req, res, next) => {
        validator.params(schema.idSchema);
        next();
    })
    .get((req, res) => routsHandlers.getById(req, res, routes))
    .put((req, res) => routsHandlers.updateById(req, res, routes))
    .delete((req, res) => routsHandlers.deleteById(req, res, routes));

export default router;
