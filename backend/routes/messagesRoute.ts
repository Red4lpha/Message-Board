import { Router } from 'express';
const { messages_get, messages_create, messages_reply_create, messages_update, messages_delete, messages_vote} = 
require('../controllers/messagesController');
const {protect} =  require('../middleware/authMiddleware')

export const router = Router();
/* GET all the message */
router.route('/').get(messages_get);

/* POST a top level message */
router.route('/create').post(protect, messages_create);

/* POST a reply message */
router.route('/:id/create').post(protect, messages_reply_create);

/* update a message */
router.route('/:id/update').put(protect, messages_update);

/* DELETE a message */
router.route('/:id/delete').delete(protect, messages_delete)

/* Vote on a message */
router.route('/:id/vote').post(protect, messages_vote)

module.exports = router;