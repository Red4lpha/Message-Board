"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __importDefault(require("../database/models/messages"));
const users_1 = __importDefault(require("../database/models/users"));
const mongoose_1 = require("mongoose");
const logging_1 = __importDefault(require("../config/logging"));
//? @desc Get all mesages for the topic
//? @route GET /api/messages
//? @access public
const messages_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info('messages_get', 'Loading messages displaying');
    return messages_1.default
        //.find({parent: null}) //? To only get top level messages
        .find({ deleted: false })
        .limit(50)
        .sort({ 'vote_count': -1 })
        .sort({ 'createdAt': 1 })
        .then((messages) => {
        //TODO: Add a parallel async to get the first two children of each parent
        return res.status(200).json(messages);
    })
        .catch((error) => {
        logging_1.default.error('messages_get', 'Error getting messages', error);
        return res.status(500).json({ error });
    });
});
//? @desc Create a new top level message
//? @route POST /api/messages/create
//? @access private
const messages_create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.body.user._id;
    const text = req.body.text;
    logging_1.default.info('messages_create', 'Loading messages creation');
    if (!req.body.text) {
        return res.status(400).json({ message: 'Please add some text' });
    }
    //TODO: Implement protection route, for validation of user
    //? Find the user name based off the id
    return users_1.default.findOne({ _id: user_id })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user) {
            const message = new messages_1.default({
                text: text,
                owner: {
                    name: user.name,
                    name_id: user.id,
                },
                votes: {
                    vote_count: 1,
                    voters: []
                }
            });
            yield message.save();
            logging_1.default.info('messages_create', 'message created');
            return res.status(201).json(message);
        }
        else {
            return res.status(400).json({ Message: `Error unknown user` });
        }
    }))
        .catch((error) => {
        logging_1.default.error('messages_create', 'Error cannot create new message', error);
        return res.status(500).json({ error });
    });
});
//? @desc Create a new reply message
//? @route POST /api/messages/:msgid/create
//? @access private
const messages_reply_create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.body.user._id;
    const user_name = req.body.user.name;
    const text = req.body.text;
    logging_1.default.info('messages_reply_create', 'Loading creating a reply message');
    let parentID;
    //? To ensure we catch errors from getting a param id that would not valid for ObjectId
    try {
        parentID = new mongoose_1.Types.ObjectId(req.params.id);
    }
    catch (_a) {
        return res.status(400).json({ Message: 'Invalid parent params' });
    }
    if (!req.body.text) {
        return res.status(400).json({ Message: 'Please add some text' });
    }
    return messages_1.default.findOne({ _id: parentID })
        .then((parentMessage) => __awaiter(void 0, void 0, void 0, function* () {
        if (!parentMessage) {
            return res.status(400).json({ Message: 'Cannot find original message' });
        }
        else if (parentMessage.deleted) {
            return res.status(401).json({ Message: 'Cannot reply on a deleted message' });
        }
        else {
            //? grabs the parent messages ancestors
            const ancestors = parentMessage.ancestors;
            ancestors === null || ancestors === void 0 ? void 0 : ancestors.push(parentID);
            //? Create the reply message
            const message = new messages_1.default({
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
            yield message.save();
            logging_1.default.info('messages_reply_create', 'Created a reply message');
            return res.status(200).json(message);
        }
    }))
        .catch((error) => {
        logging_1.default.error('messages_create', 'Error cannot create new message', error);
        return res.status(500).json({ error });
    });
});
//? @desc Update a message
//? @route PUT /api/messages/:msgid/update
//? @access private
const messages_update = (req, res) => {
    const user_id = req.body.user._id;
    const text = req.body.text;
    logging_1.default.info('messages_update', 'Loading messages updating');
    let message_id;
    //? To ensure we catch errors from getting a param id that would not valid for ObjectId
    try {
        message_id = new mongoose_1.Types.ObjectId(req.params.id);
    }
    catch (_a) {
        return res.status(400).json({ Message: 'Invalid parent params' });
    }
    if (!req.body.text) {
        res.status(400).json({ Message: 'Invalid text update' });
    }
    //TODO: Implement protection route, for validation of user
    //? Find the user name based off the id
    return messages_1.default.findOne({ _id: message_id })
        .then((message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message === null || message === void 0 ? void 0 : message.owner.name_id) {
            if ((user_id === null || user_id === void 0 ? void 0 : user_id.toString()) !== message.owner.name_id.toString()) {
                return res.status(401).json({ message: 'Unauthorized user - not the owner' });
            }
            message.text = text;
            yield message.save();
            logging_1.default.info('messages_update', `Message id: ${message_id} updated`);
            return res.status(201).json(message);
        }
        else {
            return res.status(400).json({ Message: `Unknown message` });
        }
    }))
        .catch((error) => {
        logging_1.default.error('messages_ update', 'Error update message', error);
        return res.status(500).json({ error });
    });
};
//? @desc Delete a message
//? @route DELETE /api/messages/:msgid/delete
//? @access private
const messages_delete = (req, res) => {
    const user_id = req.body.user._id;
    logging_1.default.info('messages_delete', 'Loading messages deleting');
    let message_id;
    //? To ensure we catch errors from getting a param id that would not valid for ObjectId
    try {
        message_id = new mongoose_1.Types.ObjectId(req.params.id);
    }
    catch (_a) {
        return res.status(400).json({ message: 'Invalid parent params' });
    }
    if (!req.body) {
        res.status(400).json({ message: 'Invalid request' });
    }
    //TODO: Implement protection route, for validation of user
    //? Find the user name based off the id
    return messages_1.default.findOne({ _id: message_id })
        .then((message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message === null || message === void 0 ? void 0 : message.owner.name_id) {
            if ((user_id === null || user_id === void 0 ? void 0 : user_id.toString()) !== message.owner.name_id.toString()) {
                return res.status(401).json({ message: 'Unauthorized user - not the owner' });
            }
            message.deleted = true;
            yield message.save();
            logging_1.default.info('messages_delete', `Message id: ${message_id} deleted`);
            return res.status(201).json(message);
        }
        else {
            return res.status(400).json({ message: 'Unknown message' });
        }
    }))
        .catch((error) => {
        logging_1.default.error('messages_delete', 'Error deleting message', error);
        return res.status(500).json({ error });
    });
};
//? @desc Upvote or downvote a message
//? @route POST /api/messages/:msgid/vote
//? @access private
const messages_vote = (req, res) => {
    const user_id = req.body.user._id;
    const vote = req.body.vote;
    logging_1.default.info('messages_vote', 'Loading messages voting');
    let message_id;
    //? To ensure we catch errors from getting a param id that would not valid for ObjectId
    try {
        message_id = new mongoose_1.Types.ObjectId(req.params.id);
    }
    catch (_a) {
        return res.status(400).json({ Message: 'Invalid params' });
    }
    if (!req.body) {
        res.status(400).json({ Message: 'Invalid request' });
    }
    //TODO: Implement protection route, for validation of user
    //? Find the user name based off the id
    return messages_1.default.findOne({ _id: message_id })
        .then((message) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (user_id == (message === null || message === void 0 ? void 0 : message.owner.name_id)) {
            return res.status(400).json({ message: "Cannot vote on your own message" });
        }
        //? Checks to see if the user has already voted
        const tempHolder = message === null || message === void 0 ? void 0 : message.votes.voters;
        if (tempHolder !== null) {
            if (tempHolder === null || tempHolder === void 0 ? void 0 : tempHolder.includes(user_id)) {
                return res.status(400).json({ message: "Already voted on this message" });
            }
        }
        //? If the vote something other than a vote up or down(+1 or -1)
        if (vote != 1 && vote != -1) {
            return res.status(400).json({ message: "Invalid vote amount" });
        }
        else if (message) {
            message.votes.vote_count = +message.votes.vote_count + +vote;
            (_b = message.votes) === null || _b === void 0 ? void 0 : _b.voters.push(user_id);
            yield message.save();
            logging_1.default.info('messages_vote', `User: ${user_id} voted: ${vote} on ${message_id}`);
            return res.status(201).json(message);
        }
        else {
            return res.status(401).json({ message: "Not found" });
        }
    }))
        .catch((error) => {
        logging_1.default.error('messages_vote', 'Error voting on a message', error);
        return res.status(500).json({ error });
    });
};
module.exports = {
    messages_get, messages_create, messages_reply_create, messages_update, messages_delete, messages_vote
};
//# sourceMappingURL=messagesController.js.map