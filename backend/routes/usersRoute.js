const express = require('express');
const router = express.Router();
const { users_create, users_update, users_delete} = require('../controllers/usersController');

/* POST a new user */
router.route('/create').post(messages_create);

/* update an user */
router.route('/:id/update').put(messages_update);

/* DELETE an user */
router.route('/:id/delete').delete(messages_delete)

module.exports = router;