const chalk = require('chalk')

const Request = require('./models/Request')
const User = require('./models/User')

const getRequests = async () => {
	try {
		const requests = await Request.find()
		return requests
	} catch (error) {
		console.error(chalk.red('Ошибка при получении запросов:'), error)
		throw new Error('Не удалось получить запросы. Попробуйте позже.')
	}
}

const getUser = async () => {
	try {
		const user = await User.findOne()
		if (!user) {
			throw new Error('Пользователь не найден!')
		}
		return user
	} catch (error) {
		console.error(chalk.red('Ошибка при получении пользователя:'), error)
		throw new Error('Не удалось получить пользователя. Попробуйте позже.')
	}
}

const loginUser = async (email, password) => {
	try {
		const user = await User.findOne({ email })

		if (!user) {
			throw new Error('Пользователь не найден!')
		}

		if (user && user.email === email && user.password === password) {
			return user
		} else {
			throw new Error('Неправильный пароль!')
		}
	} catch (error) {
		console.error(chalk.red('Ошибка при входе пользователя:'), error)
		throw new Error('Ошибка при входе. Проверьте свои учетные данные.')
	}
}

const addRequest = async (date, fullName, problem, phone) => {
	try {
		await Request.create({ date, fullName, problem, phone })
		console.log(chalk.bgGreen('Request was added!'))
	} catch (error) {
		console.error(chalk.red('Ошибка при добавлении запроса:'), error)
		throw new Error('Не удалось добавить запрос. Попробуйте позже.')
	}
}

module.exports = {
	getRequests,
	addRequest,
	loginUser,
	getUser,
}
