import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import Users from '../database/models/users';
const dotenv = require('dotenv').config();

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | null = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1];

      const secret: string = process.env.JWT_SECRET || '';
      //Verify token
      const { id } = jwt.verify(token, secret) as {
        id: string;
      };

      //Get user from the token
      req.body.user = await Users.findById(id).select('-password');

      next();
    } catch (error) {
      logging.error('protect', 'Error with auth token', error);
      res.status(401).json({ message: 'Not Authorized' });
    }
  }
  if (token == null) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
