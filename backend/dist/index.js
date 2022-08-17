"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const connectDB = require('./database/db');
const messagesRouter = require('./routes/messagesRoute');
const usersRouter = require('./routes/usersRoute');
//connect to DB
connectDB();
//console.log(process.env);
const NAMESPACE = 'Server';
const app = (0, express_1.default)();
//? ---Logging
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`);
    });
    next();
});
//? ---Request Parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//not current used
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//? ---Rules of the API
app.use((req, res, next) => {
    //TODO: Warning- we might need to update the origin to be restricted to frontend
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
//? ---Routes
app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);
//? ---Error Handling
/* app.use((req,res, next) => {
  const error = new Error('Not Found');
  
  return res.status(404).json({
    message: error.message
  });
}); */
//? Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
//? ---Create the server
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server running on ${config_1.default.server.hostname}:${config_1.default.server.port}`));
//const port: string = process.env.PORT || '3000'
//app.listen(port, () => console.log(`Running on port ${port}`))
//# sourceMappingURL=index.js.map