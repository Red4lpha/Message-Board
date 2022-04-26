import express from 'express'
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
//app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);


const port: string = process.env.port || '5000'

app.listen(port, () => console.log(`Running on port ${port}`))