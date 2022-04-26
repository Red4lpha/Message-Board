"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const connectDB = require('./database/db');
const messagesRouter = require('./routes/messagesRoute');
const usersRouter = require('./routes/usersRoute');
//connect to DB
connectDB();
//console.log(process.env);
const app = (0, express_1.default)();
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public')));
//routes
//app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);
const port = process.env.port || '5000';
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map