import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { FaUser } from "react-icons/fa";
import "./ProfileButton.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button
				className="user-profile-button"
				onClick={toggleMenu}>
				<FaUser></FaUser>
				<span className="tooltip">User</span>
			</button>
			<ul
				className={ulClassName}
				ref={ulRef}>
				<li>{user.username}</li>

				<li>{user.email}</li>

				<li>
					<button
						className="log-off"
						onClick={logout}>
						Log Out
					</button>
				</li>
			</ul>
		</>
	);
}

export default ProfileButton;
