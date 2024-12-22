import styled from 'styled-components'

const ButtonContainer = ({
	children,
	className,
	margin,
	width,
	backgroundColor,
	fontSize,
	...props
}) => {
	return (
		<button
			className={className}
			{...props}>
			{children}
		</button>
	)
}

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${({ margin = '0' }) => margin};
	width: ${({ width = '100%' }) => width};
	height: ${({ height = '60px' }) => height};
	font-size: ${({ fontSize = '18px' }) => fontSize};
	background-color: ${({ backgroundColor = 'default' }) => backgroundColor};
	border: 1px solid #000;
	border-radius: 10px;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
