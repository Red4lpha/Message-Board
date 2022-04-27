import express from 'express'
import path from 'path';
//import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
const connectDB = require('./database/db')

const messagesRouter = require('./routes/messagesRoute')
const usersRouter = require('./routes/usersRoute')
//connect to DB
connectDB();
//console.log(process.env);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//not current used
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);


const port: string = process.env.PORT || '3000'
app.listen(port, () => console.log(`Running on port ${port}`))