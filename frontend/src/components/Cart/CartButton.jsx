// CartButton.jsx

import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = () => {
	let navigate = useNavigate();

	const goToCart = () => {
		navigate("/user/cart");
	};

	return (
		<button onClick={goToCart}>
			<FaShoppingCart></FaShoppingCart>
		</button>
	);
};

export default CartButton;
