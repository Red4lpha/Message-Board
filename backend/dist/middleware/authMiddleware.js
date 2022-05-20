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
const logging_1 = __importDefault(require("../config/logging"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../database/models/users"));
const dotenv = require('dotenv').config();
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET || "";
            //Verify token
            const { id } = jsonwebtoken_1.default.verify(token, secret);
            //Get user from the token
            req.body.user = yield users_1.default.findById(id).select('-password');
            next();
        }
        catch (error) {
            logging_1.default.error('protect', 'Error with auth token', error);
            res.status(401).json({ message: 'Not Authorized' });
        }
    }
    if (token == null) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
});
module.exports = { protect };
//# sourceMappingURL=authMiddleware.js.map