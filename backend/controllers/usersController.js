// @desc Create a new user
// @route POST /api/users/create
// @access public
const users_create = (req, res) => {
	res.status(200).json({message: 'User create'});
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
  users_create, users_update, users_delete
}
