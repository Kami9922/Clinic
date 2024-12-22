import { generateDate } from '../utils/generate-date'

export const addRequest = (fullName, phone, problem) =>
	fetch('http://localhost:5000/requests', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			date: generateDate(),
			fullName,
			phone,
			problem,
		}),
	})
