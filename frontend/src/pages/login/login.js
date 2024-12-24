import styled from 'styled-components'
import { Button } from '../../components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/loginUser'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните почту')
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
			'Неверная почта. Допускаются только буквы и цифры'
		)
		.min(3, 'Неверная почта. Минимум 3 символа')
		.max(15, 'Неверная почта. Максмиум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверный пароль. Допускаются  буквы, цифры и знаки % #'
		)
		.min(6, 'Неверный пароль. Минимум 6 символов')
		.max(30, 'Неверный пароль. Максиум 30 символов'),
})

const LoginContainer = ({ className }) => {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const onSubmit = async ({ email, password }) => {
		await loginUser(email, password).then((res) => {
			if (res.ok) {
				navigate('/requests')
			}
			if (!res.ok) {
				setErrorMessage('Данные введены неправильно!')
			}
		})
	}

	return (
		<div className={className}>
			<h2 className='login-title'>Login</h2>
			<form
				className='login-form'
				onSubmit={handleSubmit(onSubmit)}>
				<input
					type='email'
					name='email'
					placeholder='Почта...'
					{...register('email')}
				/>
				{errors.email && <span>{errors.email.message}</span>}
				<input
					type='password'
					name='password'
					placeholder='Пароль...'
					{...register('password')}
				/>
				{errors.password && <span>{errors.password.message}</span>}
				<Button
					height='50px'
					width='200px'
					type='submit'>
					Войти
				</Button>
				{errorMessage && <span>{errorMessage}</span>}{' '}
			</form>
		</div>
	)
}

export const Login = styled(LoginContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .login-title {
		font-size: 44px;
	}

	& .login-form {
		display: flex;
		flex-direction: column;
		border: 1px solid #000;
		border-radius: 15px;
		padding: 20px;
		align-items: center;
		gap: 20px;
		width: 475px;
		height: 300px;
		justify-content: center;
		box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
	}

	span {
		color: red;
	}
`
