const mongoose = require('mongoose')
const { Schema } = mongoose

const RequestSchema = new Schema({
	date: {
		type: String,
	},
	fullName: {
		type: String,
	},
	phone: {
		type: Number,
	},
	problem: String,
})

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request
