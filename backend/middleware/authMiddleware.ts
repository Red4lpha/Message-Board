import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
const jwt = require('jsonwebtoken');
import Users from "../database/models/users";
const dotenv = require('dotenv').config();

const protect = async(req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.body.user = await Users.findById(decoded.id).select('-password')

      next();
    } catch (error) {
      logging.error('protect', 'Error with auth token', error);
      res.status(401).json({message: 'Not Authorized'})
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

module.exports = { protect }