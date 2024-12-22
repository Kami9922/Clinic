export const generateDate = () => {
	const dateObj = new Date()
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}
	const formattedDate = dateObj.toLocaleDateString('ru-RU', options)
	return formattedDate
}
