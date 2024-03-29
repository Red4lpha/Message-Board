import { Router } from 'express';
const {
  users_create,
  users_login,
  users_update,
  users_delete
} = require('../controllers/usersController');

export const router = Router();
/* POST a new user */
router.route('/create').post(users_create);

/* update an user */
router.route('/:id/update').put(users_update);

/* DELETE an user */
router.route('/:id/delete').delete(users_delete);

/* login user */
router.route('/login').post(users_login);

module.exports = router;
