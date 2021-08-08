const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
	username: { type: String, unique: true },
	email: { type: String, unique: true },
	password: { type: String, required: true },
	roles: [{
		ref: 'Role',
		type: Schema.Types.ObjectId
	}]
}, {
	timestamp: true,
	versionKey: false
})

userSchema.methods.encryptPassword = async function (password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema)