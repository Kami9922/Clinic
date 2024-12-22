import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Login } from './pages/login/login'
import { RequestsTable } from './pages/requests-table/requests-table'
import { Request } from './pages/request/request'

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`
const Page = styled.div`
	padding: 60px 20px;
`

const App = () => {
	return (
		<AppColumn>
			<Page>
				<Routes>
					<Route
						path='/request'
						element={<Request />}
					/>
					<Route
						path='/requests'
						element={<RequestsTable />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
				</Routes>
			</Page>
		</AppColumn>
	)
}

export default App
