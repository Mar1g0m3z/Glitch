// CartButton.jsx

import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./CartButton.css";
const CartButton = ({ itemCount = 0 }) => {
	let navigate = useNavigate();

	const goToCart = () => {
		navigate("/user/cart");
	};

	return (
		<button onClick={goToCart}>
			<FaShoppingCart />
			{itemCount > 0 && <span className="cart-item-count">{itemCount}</span>}
		</button>
	);
};

export default CartButton;
