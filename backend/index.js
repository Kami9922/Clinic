const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const cors = require('cors')

const {
	addRequest,
	getRequests,
	loginUser,
	getUser,
} = require('./requests.controller')

const port = 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/requests', async (req, res) => {
	try {
		const requests = await getRequests()
		res.json(requests)
	} catch (error) {
		console.error(chalk.red('Error fetching requests:', error))
		res.status(500).json({ message: 'Ошибка при получении запросов' })
	}
})

app.get('/users', async (req, res) => {
	try {
		const user = await getUser()
		res.json(user)
	} catch (error) {
		console.error(chalk.red('Error fetching user:', error))
		res.status(500).json({ message: 'Ошибка при получении пользователя' })
	}
})

app.post('/users', async (req, res) => {
	try {
		const user = await loginUser(req.body.email, req.body.password)
		if (!user) {
			return res.status(401).json({ message: 'Неверные учетные данные' })
		}
		res.json(user)
	} catch (error) {
		console.error(chalk.red('Error logging in user:', error))
		res.status(500).json({ message: 'Ошибка при входе пользователя' })
	}
})

app.post('/requests', async (req, res) => {
	const { date, fullName, problem, phone } = req.body
	console.log(req.body)
	try {
		const newRequest = await addRequest(date, fullName, problem, phone)
		res.json(newRequest)
	} catch (error) {
		console.error(chalk.red('Error adding request:', error))
		res.status(500).json({ message: 'Ошибка при добавлении запроса' })
	}
})

mongoose
	.connect(
		'mongodb+srv://kami:jvtqhfthjljve111@cluster.coi65.mongodb.net/clinic?retryWrites=true&w=majority&appName=Cluster'
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`))
		})
	})
	.catch((error) => {
		console.error(chalk.red('Error connecting to the database:', error))
	})
