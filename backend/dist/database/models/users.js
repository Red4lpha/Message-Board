"use strict";
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
}, {
    timestamps: true
});
const Users = (0, mongoose_1.model)('Users', usersSchema);
module.exports = Users;
//# sourceMappingURL=users.js.map