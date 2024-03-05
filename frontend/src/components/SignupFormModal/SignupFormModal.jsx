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

	// const buttonEnable =
	// 	username.length >= 4 &&
	// 	password.length >= 6 &&
	// 	email.length >= 1 &&
	// 	firstName.length >= 1;
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
				<label>
					<input
						type="text"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p className="error-messages">{errors.email}</p>}
				<label>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors.username && <p className="error-messages">{errors.username}</p>}

				<label>
					<input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p className="error-messages">{errors.password}</p>}
				<label>
					<input
						className="confirm-pass"
						type="password"
						value={confirmPassword}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors.confirmPassword && (
					<p className="error-messages">{errors.confirmPassword}</p>
				)}
				<button
					className="sign-in-button"
					type="submit"
					// disabled={!buttonEnable}
				>
					Sign Up
				</button>
			</form>
		</>
	);
}

export default SignupFormModal;
