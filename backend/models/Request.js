const mongoose = require('mongoose')
const { Schema } = mongoose

const RequestSchema = new Schema({
	date: Object,
	fullName: String,
	problem: String,
	phone: Number,
})

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request
