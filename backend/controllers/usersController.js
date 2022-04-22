const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Users = require('../database/models/users');

// @desc Create a new user
// @route POST /api/users/create
// @access public
const users_create = [
	// Validate and sanitize fields.
	body('name').trim().isLength({ min: 3 }).escape().withMessage('Name must be at least 3 characters.')
		.isAlphanumeric().withMessage('User name only accepts alphanumeric characters'),
	body('email').isEmail().withMessage('Must be a valid email address'),
	body('password').isLength({ min: 5 }).withMessage('Password needs to be at least 5 characters'),

	async (req, res) => {
		const { name, email, password } = req.body;
		//If the validator caught any errors
		const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }	
		const userExist = await Users.findOne({email})

    if(userExist) {
      //TODO move this be with the other validators
      //throw new Error('User already exists');
			return res.status(400).json({Message: 'User already exists'})
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create User
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    })
    //TODO generate token
    //TODO remove returning back the password and non-needed fields
		if(user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      })
    } else {
      res.status(400).json({message: 'Invalid user data'});
    }
}];

// @desc login an user
// @route PUT /api/users/login
// @access private
const users_login = async (req, res) => {
  const { email, password } = req.body;

   //Check for user email
  const user = await Users.findOne({email});
  
  //TODO generate the token
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400).json({message: 'Invalid user info'});
  }
};

// @desc Update an user
// @route PUT /api/users/:id/update
// @access private
const users_update = (req, res) => {
	res.status(200).json({message: 'User updated'});
};

// @desc Delete an user
// @route DELETE /api/users/:id/delete
// @access private
const users_delete = (req, res) => {
	res.status(200).json({message: 'User DELETEd'});
};

module.exports = {
  users_create, users_login, users_update, users_delete
}
