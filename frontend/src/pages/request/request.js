import styled from 'styled-components'
// import { FullName } from './full-name'
// import { Phone } from './phone'
// import { Problem } from './problem'
import { Button } from '../../components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoadingAsync } from '../../actions/add-request-async-action'
import { isPostingSelector } from '../../selectors/request-selectors/is-posting-selector'
import { useState } from 'react'

const authFormSchema = yup.object().shape({
	phone: yup
		.string()
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			'Номер введен некорректно'
		),
})

const RequestContainer = ({ className }) => {
	const dispatch = useDispatch()

	const [isPosted, setIsPosted] = useState(false)

	const isPosting = useSelector(isPostingSelector)

	const {
		register,
		// reset,
		handleSubmit,
		// formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: '',
			phone: '',
			problem: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const onSubmit = async ({ fullName, phone, problem }) => {
		dispatch(setIsLoadingAsync(fullName, phone, problem))
		setIsPosted(true)

		// .then(({ error, res }) => {
		// 	// dispatch()
		// })
	}

	return (
		<div className={className}>
			<h2>Запись к врачу</h2>
			<form
				className='request-form'
				onSubmit={handleSubmit(onSubmit)}>
				<input
					type='text'
					placeholder='ФИО...'
					{...register('fullName', {})}
				/>
				<input
					type='phone'
					placeholder='Номер телефона...'
					{...register('phone', {})}
				/>
				<textarea
					className='problem-area'
					type='text'
					placeholder='Опишите вашу проблему...'
					{...register('problem', {})}
				/>
				{isPosted && (
					<span className='success-message'>Заявка отправлена!</span>
				)}
				<Button
					disabled={isPosting}
					height='50px'
					width='200px'
					type='submit'>
					Отправить
				</Button>
				{/* {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>} */}
			</form>
			{/* <Button>Отправить</Button> */}
		</div>
	)
}

export const Request = styled(RequestContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .problem-area {
		resize: none;
		width: 400px;
		height: 100px;
		padding: 5px;
	}

	& .request-form {
		display: flex;
		flex-direction: column;
		border: 1px solid #000;
		border-radius: 15px;
		padding: 20px;
		align-items: center;
		gap: 10px;
		width: 475px;
		box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2);
	}

	& .success-message {
		color: green;
	}
`
