"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const { messages_get, messages_create, messages_reply_create, messages_update, messages_delete, messages_vote } = require('../controllers/messagesController');
const { protect } = require('../middleware/authMiddleware');
exports.router = (0, express_1.Router)();
/* GET all the message */
exports.router.route('/').get(messages_get);
/* POST a top level message */
exports.router.route('/create').post(protect, messages_create);
/* POST a reply message */
exports.router.route('/:id/create').post(protect, messages_reply_create);
/* update a message */
exports.router.route('/:id/update').put(protect, messages_update);
/* DELETE a message */
exports.router.route('/:id/delete').delete(protect, messages_delete);
/* Vote on a message */
exports.router.route('/:id/vote').post(protect, messages_vote);
module.exports = exports.router;
//# sourceMappingURL=messagesRoute.js.map