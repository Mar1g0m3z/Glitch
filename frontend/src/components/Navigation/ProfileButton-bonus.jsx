import { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./ProfileButton.css";

function ProfileButton({ user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		navigate("/");
		closeMenu();
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<div className="profile-elements">
				<button
					className="profile-button"
					onClick={toggleMenu}>
					<FaUser></FaUser>
				</button>
				<ul
					className={ulClassName}
					ref={ulRef}>
					{user ? (
						<>
							<li className="user-name">Hello, {user.username}</li>
							<li className="user-email">{user.email}</li>

							<li>
								<button
									className="log-out-button"
									onClick={logout}>
									Log Out
								</button>
							</li>
						</>
					) : (
						<>
							<OpenModalMenuItem
								itemText="Log In"
								onItemClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
							<OpenModalMenuItem
								itemText="Sign Up"
								onItemClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</>
					)}
				</ul>
			</div>
		</>
	);
}

export default ProfileButton;
