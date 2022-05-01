import { Request, Response } from "express";
import { MessagesInterface, UsersInterface } from "types/types";
import Messages from '../database/models/messages'
import Users from "../database/models/users";
import {Types} from 'mongoose'
import logging from "../config/logging";

//? @desc Get all mesages for the topic
//? @route GET /api/messages
//? @access public
const messages_get = async (req: Request, res: Response) => {
	logging.info('messages_get', 'Loading messages displaying');

	return Messages
		.find({parent: null}) //? To only get top level messages
		.limit(50)
		.sort({'vote_count': -1})
		.sort({'createdAt': 1})
		.then((messages) => {
			//TODO: Add a parallel async to get the first two children of each parent
			return res.status(200).json(messages);
		})
		.catch((error) => {
			logging.error('messages_get', 'Error getting messages', error);
			return res.status(500).json({error});  
		});
};

//? @desc Create a new top level message
//? @route POST /api/messages/create
//? @access private
const messages_create = async (req: Request, res: Response) => {
	const user_id: UsersInterface["id"] = req.body.user_id;
	const text: MessagesInterface["text"] = req.body.text;

	logging.info('messages_create', 'Loading messages creation');

	if(!req.body){
    res.status(400).json({Message: 'Invalid request'});
  }

	//TODO: Implement protection route, for validation of user
	//? Find the user name based off the id
	return Users.findOne({_id: user_id})
	.then(async (user) => {
		if(user){
			const message = new Messages<MessagesInterface>({
				text: text,
				owner: {
					name: user.name,
					name_id: user.id ,
				},
			});
			await message.save();
			return res.status(201).json({user})
		} else {
			return res.status(400).json({Message: `Unknown user`})
		}
	})
	.catch((error) =>{
		logging.error('messages_create', 'Error  cannot create new message', error);
		return res.status(500).json({error});  
	});
};

//? @desc Create a new reply message
//? @route POST /api/messages/:id/create
//? @access private
const messages_reply_create = async (req: Request, res: Response) => {
	//TODO: Update controller for name message schema
	const user_id: UsersInterface["id"] = req.body.user_id;
	const text: MessagesInterface["text"] = req.body.text;
	
	logging.info('messages_reply_create', 'Loading creating a reply message');

	let parentID: Types.ObjectId;
	try {
		parentID = new Types.ObjectId(req.params.id);
	} catch {
		return res.status(400).json({Message: 'Invalid params'})
	}
	
	if(!req.body){
    return res.status(400).json({Message: 'Invalid request'});
  }

	//? Find the user name based off the id
	const user: UsersInterface | null = await Users.findOne({_id: user_id})
	if(!user) {
		return res.status(400).json({Message: 'Cannot find user'})
	}
	
	return Messages.findOne({_id: parentID})
	.then( async(parentMessage) => {
		if(!parentMessage) {
			return res.status(400).json({Message: 'Cannot find original message'})
		} else {
			//? grabs the parent messages ancestors
			const ancestors: MessagesInterface["ancestors"] = parentMessage.ancestors;
			ancestors?.push(parentID)
			//? Create the reply message
			const message = new Messages<MessagesInterface>({
				text: text,
				owner: {
					name: user.name,
					name_id: user.id ,
				},
				parent: parentID,
				ancestors: ancestors,
			});
			await message.save();
			return res.status(200).json({message});
		}
	})
	.catch((error) => {
		logging.error('messages_create', 'Error  cannot create new message', error);
		return res.status(500).json({error});  
	});

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

