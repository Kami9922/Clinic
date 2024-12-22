import { addRequest } from '../api/add-request'
import { setIsPosting } from './set-is-posting'

export const setIsLoadingAsync = (fullName, phone, problem) => (dispatch) => {
	dispatch(setIsPosting(true))
	addRequest(fullName, phone, problem).finally(() =>
		dispatch(setIsPosting(false))
	)
}
