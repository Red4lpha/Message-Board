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
// @desc Get all mesages for the topic
// @route GET /api/messages
// @access public
const messages_get = (req, res) => {
    res.status(200).json({ message: 'messages GET' });
};
// @desc Create a new top level message
// @route POST /api/messages/create
// @access private
const messages_create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.body.owner;
    const text = req.body.text;
    if (!req.body) {
        res.status(400).json({ Message: 'Invalid request' });
    }
    const message = new messages_1.default({
        text: text,
        owner: owner,
    });
    yield message.save();
    res.status(200).json({
        _id: message.id,
        text: message.text,
        owner: message.owner,
        parent: message.parent,
        vote_count: message.vote_count,
    });
});
// @desc Create a new reply message
// @route POST /api/messages/:id/create
// @access private
const messages_reply_create = (req, res) => {
    res.status(200).json({ message: 'messages POST - reply' });
};
// @desc Update a message
// @route PUT /api/messages/:id/update
// @access private
const messages_update = (req, res) => {
    res.status(200).json({ message: 'messages PUT' });
};
// @desc Delete a message
// @route DELETE /api/messages/:id/delete
// @access public
const messages_delete = (req, res) => {
    res.status(200).json({ message: 'messages DELETE' });
};
module.exports = {
    messages_get, messages_create, messages_reply_create, messages_update, messages_delete,
};
//# sourceMappingURL=messagesController.js.map