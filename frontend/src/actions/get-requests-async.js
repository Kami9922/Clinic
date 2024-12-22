import { getRequests } from '../api/get-requests'
import { setRequests } from './set-requests-action'

export const getRequestsAsync = () => async (dispatch) => {
	const requests = await getRequests()

	dispatch(setRequests(requests))
}
