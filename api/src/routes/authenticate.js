import { controllers } from '../controllers/authenticate';
import { schema } from '../middleware/validation-schema';

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

router.route('/authenticate')
    .post(validator.body(schema.authenticateSchema), (req, res) => {
        controllers.verifyUser(req, res);
    });

export { router };
