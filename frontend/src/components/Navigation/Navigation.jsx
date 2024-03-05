import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { getCart } from "../../services/cart-service";
import "./Navigation.css";
import CartButton from "../Cart/CartButton";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [cartItemCount, setCartItemCount] = useState(0);

	useEffect(() => {
		const fetchAndUpdateCart = async () => {
			if (sessionUser) {
				try {
					const cartData = await getCart();
					// console.log(cartData);
					const itemCount = cartData.items.reduce(
						(total, item) => total + item.quantity,
						0
					);
					setCartItemCount(itemCount);
				} catch (error) {
					console.error("Failed to fetch cart:", error);
				}
			}
		};

		fetchAndUpdateCart();

		const handleCartUpdate = () => {
			fetchAndUpdateCart();
		};

		window.addEventListener("cartUpdated", handleCartUpdate);

		return () => {
			window.removeEventListener("cartUpdated", handleCartUpdate);
		};
	}, [sessionUser]); // Re-fetch cart when the sessionUser changes or a cartUpdated event is emitted

	const sessionLinks = sessionUser ? (
		<div className="profile-menu">
			<CartButton itemCount={cartItemCount} />
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
