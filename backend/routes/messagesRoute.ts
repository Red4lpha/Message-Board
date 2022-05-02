import { Router } from 'express';
const { messages_get, messages_create, messages_reply_create, messages_update, messages_delete, messages_vote} = 
require('../controllers/messagesController');

export const router = Router();
/* GET all the message */
router.route('/').get(messages_get);

/* POST a top level message */
router.route('/create').post(messages_create);

/* POST a reply message */
router.route('/:id/create').post(messages_reply_create);

/* update a message */
router.route('/:id/update').put(messages_update);

/* DELETE a message */
router.route('/:id/delete').delete(messages_delete)

/* Vote on a message */
router.route('/:id/vote').post(messages_vote)

module.exports = router;