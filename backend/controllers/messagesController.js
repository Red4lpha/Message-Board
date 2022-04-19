// @desc Get all mesages for the topic
// @route GET /api/messages
// @access public
const messages_get = (req, res) => {
	res.status(200).json({message: 'messages GET'});
};

// @desc Create a new top level message
// @route POST /api/messages/create
// @access private
const messages_create = (req, res) => {
	res.status(200).json({message: 'messages POST - top level'});
};

// @desc Create a new reply message
// @route POST /api/messages/:id/create
// @access private
const messages_reply_create = (req, res) => {
	res.status(200).json({message: 'messages POST - reply'});
};

// @desc Update a message
// @route PUT /api/messages/:id/update
// @access private
const messages_update = (req, res) => {
	res.status(200).json({message: 'messages PUT'});
};

// @desc Delete a message
// @route DELETE /api/messages/:id/delete
// @access public
const messages_delete = (req, res) => {
	res.status(200).json({message: 'messages DELETE'});
};

module.exports = {
  messages_get, messages_create, messages_reply_create, messages_update, messages_delete,
}

