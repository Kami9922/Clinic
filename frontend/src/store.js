import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { requestReducer } from './reducers/request-reducer'
import { requestsTableReducer } from './reducers/requests-table-reducer'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	request: requestReducer,
	requestsTable: requestsTableReducer,
})

export const store = createStore(
	reducer,
	composeEnchancers(applyMiddleware(thunk))
)
