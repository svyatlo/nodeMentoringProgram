import { controllers } from '../controllers/user-group';

const express = require('express');
const router = express.Router();

router.route('/add-users-to-group')
    .post((req, res) => {
        controllers.addUsersToGroup(req, res);
    });

export { router };
