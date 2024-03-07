import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					password,
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				"Confirm Password field must be the same as the Password field",
		});
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form
				className="signup"
				onSubmit={handleSubmit}>
				<div className="form-field">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{errors.email && <p className="error-messages">{errors.email}</p>}
				</div>
				<div className="form-field">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					{errors.username && (
						<p className="error-messages">{errors.username}</p>
					)}
				</div>
				<div className="form-field">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{errors.password && (
						<p className="error-messages">{errors.password}</p>
					)}
				</div>
				<div className="form-field">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						className="confirm-pass"
						type="password"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					{errors.confirmPassword && (
						<p className="error-messages">{errors.confirmPassword}</p>
					)}
				</div>
				<button
					className="sign-in-button"
					type="submit">
					Sign Up
				</button>
			</form>
		</>
	);
}

export default SignupFormModal;
