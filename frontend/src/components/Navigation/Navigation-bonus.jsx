import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<header>
			<ul className="header-ul">
				<li>
					<NavLink to="/">HOME</NavLink>
				</li>
				<li className="name-container">
					<h1 className="app-name"> LevelUp Lodgings </h1>
				</li>

				{isLoaded && (
					<li className="profile-button-container">
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</header>
	);
}

export default Navigation;
