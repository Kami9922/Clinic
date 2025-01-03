const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Invalid email',
		},
	},
	password: {
		type: String,
		required: true,
	},
})

const User = mongoose.model('User', UserSchema)

module.exports = User
