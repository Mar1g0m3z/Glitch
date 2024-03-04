import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CartButton from "../Cart/CartButton";
function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const sessionLinks = sessionUser ? (
		<div className="profile-menu">
			<CartButton user={sessionUser}></CartButton>
			<ProfileButton user={sessionUser} />
			<ul className="profile-dropdown">{/* Dropdown items here */}</ul>
		</div>
	) : (
		<>
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
		</>
	);

	return (
		<>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				{isLoaded && sessionLinks}
			</ul>
		</>
	);
}

export default Navigation;
