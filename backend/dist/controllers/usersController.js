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
const express_validator_1 = require("express-validator");
const bcrypt = require('bcryptjs');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../database/models/users"));
const logging_1 = __importDefault(require("../config/logging"));
//? @desc Create a new user
//? @route POST /api/users/create
//? @access public
const users_create = [
    //? Validate and sanitize fields.
    (0, express_validator_1.body)('name').trim().isLength({ min: 3 }).escape().withMessage('Name must be at least 3 characters.')
        .isAlphanumeric().withMessage('User name only accepts alphanumeric characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Must be a valid email address'),
    (0, express_validator_1.body)('password').isLength({ min: 5 }).withMessage('Password needs to be at least 5 characters'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        logging_1.default.info('user_create', 'Loading user creation');
        //?If the validator caught any errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return users_1.default.findOne({ email })
            .then((userExists) => __awaiter(void 0, void 0, void 0, function* () {
            if (userExists) {
                //TODO Possibly move this be with the other validators
                return res.status(400).json({ Message: 'User already exists' });
            }
            else { //? Create user
                //?Hash password
                const salt = yield bcrypt.genSalt(10);
                const hashedPassword = yield bcrypt.hash(password, salt);
                const user = new users_1.default({
                    name,
                    email,
                    password: hashedPassword,
                });
                yield user.save();
                //? Return the info back
                //TODO remove returning back the password and non-needed fields
                return res.status(201).json({
                    user,
                    token: generateToken(user._id)
                });
            }
        }))
            .catch(error => {
            logging_1.default.error('user_create', 'Error creating new user', error);
            return res.status(500).json({ error });
        });
    })
];
//? @desc login an user
//? @route PUT /api/users/login
//? @access private
const users_login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    logging_1.default.info('user_login', 'Loading user login');
    //?Check for user email
    return users_1.default.findOne({ email })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user && (yield bcrypt.compare(password, user.password))) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
        else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    }))
        .catch(error => {
        logging_1.default.error('user_login', 'Error logging', error);
        return res.status(500).json({ error });
    });
});
//? @desc Update an user
//? @route PUT /api/users/:id/update
//? @access private
const users_update = (req, res) => {
    //TODO: Update user controller
    res.status(200).json({ message: 'User updated' });
};
//? @desc Delete an user
//? @route DELETE /api/users/:id/delete
//? @access private
const users_delete = (req, res) => {
    //TODO: Delete user controller
    res.status(200).json({ message: 'User DELETEd' });
};
//Generate JWT
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || "";
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: '30d',
    });
};
module.exports = {
    users_create, users_login, users_update, users_delete
};
//# sourceMappingURL=usersController.js.map