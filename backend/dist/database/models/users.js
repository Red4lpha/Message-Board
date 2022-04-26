"use strict";
const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
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
module.exports = mongoose.model('Users', usersSchema);
//# sourceMappingURL=users.js.map