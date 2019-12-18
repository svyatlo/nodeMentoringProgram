import { persons } from '../exampleDB';
import { routsHandlers } from '../api/routsHandlers';
import { schema } from '../api/validationSchema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/persons')
    .get((req, res) => {
        validator.response(schema.arraySchema);
        routsHandlers.get(req, res, persons);
    })
    .post((req, res) => {
        validator.body(schema.objectSchema);
        routsHandlers.post(req, res, persons);
    });

router.route('/persons/:id')
    .all((req, res, next) => {
        validator.params(schema.idSchema);
        next();
    })
    .get((req, res) => routsHandlers.getById(req, res, persons))
    .put((req, res) => routsHandlers.updateById(req, res, persons))
    .delete((req, res) => routsHandlers.deleteById(req, res, persons));

export default router;
