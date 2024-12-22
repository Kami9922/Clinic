const initialRequestsTableState = {
	requests: [],
}

export const requestsTableReducer = (
	state = initialRequestsTableState,
	{ type, payload }
) => {
	switch (type) {
		case 'SET_IS_REQUESTS':
			return {
				...state,
				requests: [...payload],
			}
		default:
			return state
	}
}
