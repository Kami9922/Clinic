export const getRequests = () =>
	fetch(`http://localhost:5000/requests`)
		.then((loadedRequests) => loadedRequests.json())
		.then((loadedRequests) => loadedRequests)
