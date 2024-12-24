import styled from 'styled-components'
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
		.required('Телефон обязателен для заполнения')
		.matches(
			/^\+?[0-9]{1,3}[-\s]?([0-9]{3})[-\s]?([0-9]{3})[-\s]?([0-9]{2})[-\s]?([0-9]{2})$/,
			'Номер введен некорректно'
		)
		.length(12, 'Номер должен содержать 12 символов'),
	fullName: yup
		.string()
		.required('ФИО обязательно для заполнения')
		.matches(
			/^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/,
			'ФИО должно быть в формате "Фамилия Имя Отчество"'
		),
	problem: yup.string().max(90, 'Превышено допустимое кол-во символов!'),
})

const RequestContainer = ({ className }) => {
	const dispatch = useDispatch()

	const [isPosted, setIsPosted] = useState(false)

	const isPosting = useSelector(isPostingSelector)

	const {
		register,
		handleSubmit,
		formState: { errors },
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
				{errors.fullName && <span>{errors.fullName.message}</span>}
				<input
					{...register('phone', { required: true })}
					placeholder='Номер телефона...'
				/>
				{errors.phone && <span>{errors.phone.message}</span>}
				<textarea
					className='problem-area'
					type='text'
					placeholder='Опишите вашу проблему...'
					{...register('problem', {})}
				/>
				{errors.problem && <span>{errors.problem.message}</span>}
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
			</form>
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
		height: 50px;
		padding: 5px;
		font-size: 15px;
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

	span {
		color: red;
	}

	h2 {
		font-size: 38px;
	}
`
