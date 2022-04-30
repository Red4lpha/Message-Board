"use strict";
const mongoose_1 = require("mongoose");
/* interface MessagesInterface {
    text: string,
    owner: Types.ObjectId,
    parent?: Types.ObjectId,
    vote_count?: number,
} */
const messagesSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, 'Error: Please add a message']
    },
    owner: {
        name: {
            type: String,
            required: [true, 'Error: Missing owners name']
        },
        name_id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Error: Need an owner']
        }
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Messages',
        default: null, //If left at default, then assumed to be a top level message
    },
    ancestors: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Messages',
        }],
    vote_count: {
        type: Number,
        //required: [true, 'Error:  Need a vote count'],
        default: 1
    }
}, {
    timestamps: true
});
const Messages = (0, mongoose_1.model)('Messages', messagesSchema);
module.exports = Messages;
//# sourceMappingURL=messages.js.map