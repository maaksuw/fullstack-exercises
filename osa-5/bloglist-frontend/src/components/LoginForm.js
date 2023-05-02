const LoginForm = ({form}) => {
	const [handleLogin, setUsername, setPassword] = form.functions
	const [username, password] = form.variables
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