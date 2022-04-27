"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
//import cookieParser from 'cookie-parser';
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const connectDB = require('./database/db');
const messagesRouter = require('./routes/messagesRoute');
const usersRouter = require('./routes/usersRoute');
//connect to DB
connectDB();
//console.log(process.env);
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//not current used
//app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//routes
app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);
const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map