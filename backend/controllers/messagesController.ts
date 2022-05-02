import { Request, Response } from "express";
import { MessagesInterface, UsersInterface, OwnerInterface, VoteInterface } from "types/types";
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
	const user_id: OwnerInterface["name_id"] = req.body.user._id;
	const text: MessagesInterface["text"] = req.body.text;

	logging.info('messages_create', 'Loading messages creation');

	if(!req.body.text){
    return res.status(400).json({message: 'Please add some text'})
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
				votes: {
					vote_count: 1,
					voters: []
				}
			});
			await message.save();
			return res.status(201).json({message})
		} else {
			return res.status(400).json({Message: `Error unknown user`})
		}
	})
	.catch((error) =>{
		logging.error('messages_create', 'Error cannot create new message', error);
		return res.status(500).json({error});  
	});
};

//? @desc Create a new reply message
//? @route POST /api/messages/:msgid/create
//? @access private
const messages_reply_create = async (req: Request, res: Response) => {
	const user_id: OwnerInterface["name_id"] = req.body.user._id;
	const user_name: OwnerInterface["name"] = req.body.user.name;
	const text: MessagesInterface["text"] = req.body.text;
	
	logging.info('messages_reply_create', 'Loading creating a reply message');
	let parentID: Types.ObjectId;
	//? To ensure we catch errors from getting a param id that would not valid for ObjectId
	try {
		parentID = new Types.ObjectId(req.params.id);
	} catch {
		return res.status(400).json({Message: 'Invalid params'})
	}
	console.info(`user: ${req.body.user}`);

	if(!req.body.text){
    return res.status(400).json({Message: 'Please add some text'});
  }

	return Messages.findOne({_id: parentID})
	.then( async(parentMessage) => {
		if(!parentMessage) {
			return res.status(400).json({Message: 'Cannot find original message'})
		}
		else if(parentMessage.deleted){
			return res.status(401).json({Message: 'Cannot reply on a deleted message'})	
		} else {
			//? grabs the parent messages ancestors
			const ancestors: MessagesInterface["ancestors"] = parentMessage.ancestors;
			ancestors?.push(parentID)
			//? Create the reply message
			const message = new Messages<MessagesInterface>({
				text: text,
				owner: {
					name: user_name,
					name_id: user_id
				},
				parent: parentID,
				ancestors: ancestors,
				votes: {
					vote_count: 1,
					voters: []
				}
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
//? @route PUT /api/messages/:msgid/update
//? @access private
const messages_update = (req: Request, res: Response) => {
	const user_id: OwnerInterface["name_id"] = req.body.user._id;
	const text: MessagesInterface["text"] = req.body.text;

	logging.info('messages_update', 'Loading messages updating');

	let message_id: MessagesInterface["id"];
	//? To ensure we catch errors from getting a param id that would not valid for ObjectId
	try {
		message_id = new Types.ObjectId(req.params.id);
	} catch {
		return res.status(400).json({Message: 'Invalid params'})
	}

	if(!req.body.text){
    res.status(400).json({Message: 'Invalid text update'});
  }

	//TODO: Implement protection route, for validation of user
	//? Find the user name based off the id
	return Messages.findOne({_id: message_id})
	.then(async (message) => {
		if(user_id != message?.owner.name_id) {
			return res.status(401).json({Message: `Unauthorized user - not the owner`})
		}
		if(message){
			message.text = text;
			await message.save();
			return res.status(201).json({message})
		} else {
			return res.status(400).json({Message: `Unknown message`})
		}
	})
	.catch((error) =>{
		logging.error('messages_ update', 'Error update message', error);
		return res.status(500).json({error});  
	});
};

//? @desc Delete a message
//? @route DELETE /api/messages/:msgid/delete
//? @access private
const messages_delete = (req: Request, res: Response) => {
	const user_id: OwnerInterface["name_id"] = req.body.user._id;

	logging.info('messages_delete', 'Loading messages deleting');

	let message_id: MessagesInterface["id"];
	//? To ensure we catch errors from getting a param id that would not valid for ObjectId
	try {
		message_id = new Types.ObjectId(req.params.id);
	} catch {
		return res.status(400).json({Message: 'Invalid params'})
	}

	if(!req.body){
    res.status(400).json({Message: 'Invalid request'});
  }

	//TODO: Implement protection route, for validation of user
	//? Find the user name based off the id
	return Messages.findOne({_id: message_id})
	.then(async (message) => {
		if(user_id != message?.owner.name_id) {
			return res.status(401).json({Message: `Unauthorized user - not the owner`})
		}
		if(message){
			message.deleted = true;
			await message.save();
			return res.status(201).json({message})
		} else {
			return res.status(400).json({Message: `Unknown message`})
		}
	})
	.catch((error) =>{
		logging.error('messages_delete', 'Error deleting message', error);
		return res.status(500).json({error});  
	});
};

//? @desc Upvote or downvote a message
//? @route POST /api/messages/:msgid/delete
//? @access private
const messages_vote = (req: Request, res: Response) => {
	const user_id: Types.ObjectId = req.body.user._id;
	const vote: VoteInterface["vote_count"] | undefined = req.body.vote;

	logging.info('messages_vote', 'Loading messages voting');

	let message_id: MessagesInterface["id"];
	//? To ensure we catch errors from getting a param id that would not valid for ObjectId
	try {
		message_id = new Types.ObjectId(req.params.id);
	} catch {
		return res.status(400).json({Message: 'Invalid params'})
	}

	if(!req.body){
    res.status(400).json({Message: 'Invalid request'});
  }

	//TODO: Implement protection route, for validation of user
	//? Find the user name based off the id
	return Messages.findOne({_id: message_id})
	.then(async (message) => {
		if(user_id == message?.owner.name_id) {
			return res.status(400).json({Message: `Cannot vote on your own message`})
		}
		//? Checks to see if the user has already voted
		const tempHolder = message?.votes.voters;
		if (tempHolder !== null ){
			if(tempHolder?.includes(user_id)){
				return res.status(400).json({Message: `Already voted on this message`})
			} 
		}
		//? If the vote something other than a vote up or down(+1 or -1)
		if (vote != 1 && vote !=-1 ){
			return res.status(400).json({Message: `Invalid vote amount`})
		}
		else if(message){
			message.votes.vote_count = +message.votes.vote_count + +vote;
			message.votes?.voters.push(user_id)
			await message.save();
			return res.status(201).json({message})
		} else {
			return res.status(400).json({Message: `Unknown message`})
		}
	})
	.catch((error) =>{
		logging.error('messages_vote', 'Error voting on a message', error);
		return res.status(500).json({error});  
	});
};

module.exports = {
  messages_get, messages_create, messages_reply_create, messages_update, messages_delete, messages_vote
}

