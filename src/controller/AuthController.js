const User = require('../model/User')
const jwt = require('jsonwebtoken');
const Role = require('../model/Roles')
const { SECRET } = require('../config')

function createToken(user) {
	return jwt.sign({ id: user._id }, SECRET, { expiresIn: 60 * 60 * 24 })
}


exports.signup = async (req, res) => {
	const { email, username, password, roles } = req.body;
	const userFind = await User.findOne({ email: email })
	if (userFind) return res.json('user al ready exist')

	const user = new User({ username, email, password });
	user.password = await user.encryptPassword(password)

	if (roles) {
		const roleFound = await Role.find({ name: { $in: roles } })
		user.roles = roleFound.map(role => role.id)
	} else {
		const role = await Role.findOne({ name: 'user' })
		user.roles = [role._id]
	}

	const userSave = await user.save();
	res.json({ token: createToken(userSave) })
}

exports.signin = async (req, res) => {
	const { email, password } = req.body;
	const userFound = await User.findOne({ email }).populate('roles')

	if (!userFound) return res.json({ message: 'user not found' })

	const matchPassword = await userFound.comparePassword(password)
	if (!matchPassword) return res.json('incorrect password')

	res.json({ token: createToken(userFound) })
}

