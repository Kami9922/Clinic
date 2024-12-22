import { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { requestsTableSelector } from '../../selectors/requests-table-selectors/requests-selector'
import { getRequestsAsync } from '../../actions/get-requests-async'

const RequestsTableContainer = ({ className }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getRequestsAsync())
	}, [dispatch])

	const requests = useSelector(requestsTableSelector)

	return (
		<div className={className}>
			<h2>Заявки с формы</h2>
			<table>
				<thead>
					<tr>
						<th>Дата</th>
						<th>ФИО</th>
						<th>Телефон</th>
						<th>Проблема</th>
					</tr>
				</thead>
				<tbody>
					{requests.map((request) => (
						<tr key={request._id}>
							<td>{request.date}</td>
							<td>{request.fullName}</td>
							<td>{request.phone}</td>
							<td>{request.problem}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export const RequestsTable = styled(RequestsTableContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& h2 {
		text-align: center;
		font-size: 36px;
	}

	table {
		max-width: 900px;
		border: 1px solid #000;
		border-spacing: 0;
		text-align: center;
		box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2);
	}
	th {
		border: 1px solid black;
		padding: 15px;
	}
	td {
		padding: 15px;
		border: 1px solid black;
	}
`
