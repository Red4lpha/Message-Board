import express from 'express'
import path from 'path';
//import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import bodyParser from 'body-parser';
import http from 'http';
import logging from './config/logging';
import config from './config/config';
const connectDB = require('./database/db')
const messagesRouter = require('./routes/messagesRoute')
const usersRouter = require('./routes/usersRoute')
//connect to DB
connectDB();
//console.log(process.env);
const NAMESPACE = 'Server';
const app = express();

//? ---Logging
app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`);
  });
  next();
})

//? ---Request Parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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

  if (req.method == 'OPTIONS'){
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
  console.log('production hit')
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}


//? ---Create the server
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
console.log(process.env.NODE_ENV);
//const port: string = process.env.PORT || '3000'
//app.listen(port, () => console.log(`Running on port ${port}`))