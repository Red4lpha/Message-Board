import { body, validationResult } from 'express-validator';
import { Request, Response } from "express";
const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';
import Users from '../database/models/users'
import { UsersInterface } from 'types/types';
import logging from '../config/logging';
import {Types} from 'mongoose'

//? @desc Create a new user
//? @route POST /api/users/create
//? @access public
const users_create = [
	//? Validate and sanitize fields.
	body('name').trim().isLength({ min: 3 }).escape().withMessage('Name must be at least 3 characters.')
		.isAlphanumeric().withMessage('User name only accepts alphanumeric characters'),
	body('email').isEmail().withMessage('Must be a valid email address'),
	body('password').isLength({ min: 5 }).withMessage('Password needs to be at least 5 characters'),

	async (req: Request, res: Response) => {
    const name: UsersInterface['name'] = req.body.name;
    const email: UsersInterface['email'] = req.body.email;
    const password: UsersInterface['password'] = req.body.password;
    
    logging.info('user_create', 'Loading user creation');
		//?If the validator caught any errors
		const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }	

		return Users.findOne({email})
      .then(async (userExists) => {
        if(userExists) {
          //TODO Possibly move this be with the other validators
          return res.status(400).json({Message: 'User already exists'})
        }
        else { //? Create user
          //?Hash password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          
          const user = new Users<UsersInterface>({
            name,
            email,
            password: hashedPassword,
          });
          await user.save();
          logging.info('user_create', `User: ${user.name} created`)
          //? Return the info back
          //TODO remove returning back the password and non-needed fields
          return res.status(201).json({
            user,
            token: generateToken(user._id)
          })
        }
      })
      .catch(error => {
        logging.error('user_create', 'Error creating new user', error);
        return res.status(500).json({error});   
      });
}];

//? @desc login an user
//? @route PUT /api/users/login
//? @access private
const users_login = async (req: Request, res: Response) => {
  const email: UsersInterface['email'] = req.body.email;
  const password: UsersInterface['password'] = req.body.password;
  
  logging.info('user_login', 'Loading user login');
  
  //?Check for user email
  return Users.findOne({email})
    .then(async user => {
      if(user && (await bcrypt.compare(password, user.password))){
        return res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        })
      } else {
        return res.status(400).json({message: 'Invalid email or password'});
      }
    })
    .catch(error => {
      logging.error('user_login', 'Error logging', error);
      return res.status(500).json({error});   
    });
};

//? @desc Update an user
//? @route PUT /api/users/:id/update
//? @access private
const users_update = (req: Request, res: Response) => {
	//TODO: Update user controller
  res.status(200).json({message: 'User updated'});
};

//? @desc Delete an user
//? @route DELETE /api/users/:id/delete
//? @access private
const users_delete = (req: Request, res: Response) => {
	//TODO: Delete user controller
  res.status(200).json({message: 'User DELETEd'});
};

//Generate JWT
const generateToken = (id: Types.ObjectId): string => {
  const secret: string = process.env.JWT_SECRET || ""
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  })
}

module.exports = {
  users_create, users_login, users_update, users_delete
}
