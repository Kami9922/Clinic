const mongoose = require('mongoose')
const { Schema } = mongoose

const RequestSchema = new Schema({
	date: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	problem: String,
})

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request
