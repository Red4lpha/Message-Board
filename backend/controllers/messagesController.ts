import { Request, Response } from "express";
import { MessagesInterface } from "types/types";
import Messages from '../database/models/messages'

// @desc Get all mesages for the topic
// @route GET /api/messages
// @access public
const messages_get = (req: Request, res: Response) => {
	res.status(200).json({message: 'messages GET'});
};

// @desc Create a new top level message
// @route POST /api/messages/create
// @access private
const messages_create = async (req: Request, res: Response) => {
	const owner: MessagesInterface["owner"] = req.body.owner;
	const text: MessagesInterface["text"] = req.body.text;

	if(!req.body){
    res.status(400).json({Message: 'Invalid request'});
  }

  const message = new Messages<MessagesInterface>({
    text: text,
		owner: owner,
  })
	await message.save();
	//TODO: need chance error here incase bad request
	res.status(200).json({
		_id: message.id,
		text: message.text,
		owner: message.owner,
		parent: message.parent,
		vote_count: message.vote_count,
	});
};

// @desc Create a new reply message
// @route POST /api/messages/:id/create
// @access private
const messages_reply_create = (req: Request, res: Response) => {
	res.status(200).json({message: 'messages POST - reply'});
};

// @desc Update a message
// @route PUT /api/messages/:id/update
// @access private
const messages_update = (req: Request, res: Response) => {
	res.status(200).json({message: 'messages PUT'});
};

// @desc Delete a message
// @route DELETE /api/messages/:id/delete
// @access public
const messages_delete = (req: Request, res: Response) => {
	res.status(200).json({message: 'messages DELETE'});
};

module.exports = {
  messages_get, messages_create, messages_reply_create, messages_update, messages_delete,
}

