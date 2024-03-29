// CartButton.jsx

import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./CartButton.css";
const CartButton = ({ title, itemCount = 0 }) => {
	let navigate = useNavigate();

	const goToCart = () => {
		navigate("/user/cart");
	};

	return (
		<button
			className="cart-button"
			title={title}
			onClick={goToCart}>
			<FaShoppingCart />
			{itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
			<span className="tooltip">Cart</span>
		</button>
	);
};

export default CartButton;
