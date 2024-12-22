const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const DEFAULT_TEST = require('./constants/test')
const Request = require('./models/Request')
const cors = require('cors')

const { addRequest, getRequests } = require('./requests.controller')

const port = 5000
const app = express()

app.use(express.json())

app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(cors())

app.get('/requests', async (req, res) => {
	const requests = await getRequests()

	res.json(requests)
})

app.post('/requests', async (req, res) => {
	const { date, fullName, problem, phone } = req.body

	const newRequest = await addRequest(date, fullName, problem, phone)
	res.json(newRequest)
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
