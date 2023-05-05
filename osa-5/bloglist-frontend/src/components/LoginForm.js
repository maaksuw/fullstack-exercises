import { useState } from 'react'

const LoginForm = ({login}) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		login({
			username,
			password,
		})
		setUsername('')
		setPassword('')
	  }

	return (
		<form onSubmit={handleLogin}>
			<div>
				Username:
					<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password:
					<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	)
}

export default LoginForm