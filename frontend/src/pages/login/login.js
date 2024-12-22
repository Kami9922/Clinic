import styled from 'styled-components'
import { Button } from '../../components/button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максмиум 15 символов'),
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
	const {
		register,
		// reset,
		handleSubmit,
		// formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const onSubmit = ({ login, password }) => {
		// server.authorize(login, password).then(({ error, res }) => {
		// dispatch(setUser(res))
		// })
	}

	return (
		<div className={className}>
			<h2 className='login-title'>Login</h2>
			<form
				className='login-form'
				onSubmit={handleSubmit(onSubmit)}>
				<input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => {},
					})}
				/>
				<input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => {},
					})}
				/>
				<Button
					height='50px'
					width='200px'
					type='submit'>
					Авторизоваться
				</Button>
				{/* {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>} */}
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
`
