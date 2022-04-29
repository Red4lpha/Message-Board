import { Request, Response } from "express";
import { MessagesInterface } from "types/types";
import Messages from '../database/models/messages'
import {Types} from 'mongoose'

//? @desc Get all mesages for the topic
//? @route GET /api/messages
//? @access public
const messages_get = async (req: Request, res: Response) => {
	const messages: MessagesInterface[] = await Messages
		.find({parent: null}) //? To only get top level messages
		.limit(50)
		.sort({'vote_count': -1})
		.sort({'createdAt': 1})

	//TODO: Add a parallel async to get the first two children of each parent
	res.status(200).json(messages);
};

//? @desc Create a new top level message
//? @route POST /api/messages/create
//? @access private
const messages_create = async (req: Request, res: Response) => {
	const owner: MessagesInterface["owner"] = req.body.owner;
	const text: MessagesInterface["text"] = req.body.text;

	if(!req.body){
    res.status(400).json({Message: 'Invalid request'});
  }
	//TODO: Implement protection route, for validation of user
	const message = new Messages<MessagesInterface>({
		text: text,
		owner: owner,
	});

	try {
		await message.save();
	} catch {
		throw new Error('Cannot create message');
	}
	
	//TODO: need chance error here incase bad request
	res.status(200).json({
		_id: message.id,
		text: message.text,
		owner: message.owner,
		parent: message.parent,
		vote_count: message.vote_count,
	});
};

//? @desc Create a new reply message
//? @route POST /api/messages/:id/create
//? @access private
const messages_reply_create = async (req: Request, res: Response) => {
	const owner: MessagesInterface["owner"] = req.body.owner;
	const text: MessagesInterface["text"] = req.body.text;
	const parentID: MessagesInterface["id"] = new Types.ObjectId(req.params.id);

	if(!req.body){
    res.status(400).json({Message: 'Invalid request'});
  }
	//check to see if the message id is correct
	const messageExist: MessagesInterface | null = await Messages.findOne({_id: parentID})

	if(!messageExist) {
		//throw new Error('User already exists');
		return res.status(400).json({Message: 'Cannot find original message'})
	}
	//Create the reply message
	const message = new Messages<MessagesInterface>({
		text: text,
		owner: owner,
		parent: parentID,
	});

	try {
		await message.save();
	} catch {
		throw new Error('Cannot create reply message');
	}
	
	//TODO: need chance error here incase bad request
	res.status(200).json({
		_id: message.id,
		text: message.text,
		owner: message.owner,
		parent: message.parent,
		vote_count: message.vote_count,
	});


	//TODO: Use protection route to validate user
	res.status(200).json({message: 'messages POST - reply'});
};

//? @desc Update a message
//? @route PUT /api/messages/:id/update
//? @access private
const messages_update = (req: Request, res: Response) => {
	//TODO: Update message controller
		//TODO: Make sure 'updatedAt' is updated to new time
	//TODO: Use protection route to validate user
	//TODO: Check to make sure id matches with owner of message
	//TODO: Ensure message id is valid 
	res.status(200).json({message: 'messages PUT'});
};

//? @desc Delete a message
//? @route DELETE /api/messages/:id/delete
//? @access public
const messages_delete = (req: Request, res: Response) => {
	//TODO: Delete message controller
	//TODO: Use protection route to validate user
	//TODO: Check to make sure id matches with owner of message
	//TODO: Ensure message id is valid 
	res.status(200).json({message: 'messages DELETE'});
};

module.exports = {
  messages_get, messages_create, messages_reply_create, messages_update, messages_delete,
}

