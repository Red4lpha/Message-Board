"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const { users_create, users_login, users_update, users_delete } = require('../controllers/usersController');
exports.router = (0, express_1.Router)();
/* POST a new user */
exports.router.route('/create').post(users_create);
/* update an user */
exports.router.route('/:id/update').put(users_update);
/* DELETE an user */
exports.router.route('/:id/delete').delete(users_delete);
/* login user */
exports.router.route('/login').post(users_login);
module.exports = exports.router;
//# sourceMappingURL=usersRoute.js.map