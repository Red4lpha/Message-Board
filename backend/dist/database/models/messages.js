"use strict";
const mongoose_1 = require("mongoose");
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
    votes: {
        vote_count: {
            type: Number,
            default: 1
        },
        voters: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Users',
            }]
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Messages = (0, mongoose_1.model)('Messages', messagesSchema);
module.exports = Messages;
//# sourceMappingURL=messages.js.map