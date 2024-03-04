import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const sessionLinks = sessionUser ? (
		<div className="profile-menu">
			<ProfileButton user={sessionUser} />
		</div>
	) : (
		<>
			<ul className="user-buttons">
				<li className="log-in-but">
					<OpenModalButton
						buttonText="Log In"
						modalComponent={<LoginFormModal />}
					/>
				</li>
				<li className="sign-up-but">
					<OpenModalButton
						buttonText="Sign Up"
						modalComponent={<SignupFormModal />}
					/>
				</li>
			</ul>
		</>
	);

	return (
		<>
			<ul className="nav-bar">
				<li className="logo">
					<NavLink to="/">
						<img
							src="../glitch-logo.png"
							alt="Glitch GIF"></img>
					</NavLink>
				</li>
				{isLoaded && <li className="user-profile">{sessionLinks}</li>}
			</ul>
		</>
	);
}

export default Navigation;
