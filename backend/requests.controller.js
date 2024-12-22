const chalk = require('chalk')

const Request = require('./models/Request')

const getRequests = async () => {
	const requests = await Request.find()
	return requests
}
const getUser = async () => {
	const user = await Request.findOne()
	return user
}

const addRequest = async (date, fullName, problem, phone) => {
	await Request.create({ date, fullName, problem, phone })

	console.log(chalk.bgGreen('Request was added!'))
}

module.exports = {
	getRequests,
	addRequest,
}
