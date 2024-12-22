const initialRequestState = {
	isPosting: false,
}

export const requestReducer = (
	state = initialRequestState,
	{ type, payload }
) => {
	switch (type) {
		case 'SET_IS_POSTING':
			return {
				...state,
				isPosting: payload,
			}
		default:
			return state
	}
}
