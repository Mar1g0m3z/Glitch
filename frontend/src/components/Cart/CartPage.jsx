import { useEffect, useState } from "react";
import {
	getCart,
	editCartItem,
	deleteCartItem,
} from "../../services/cart-service";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
	const [cart, setCart] = useState({ items: [], totalPrice: 0 });
	const navigate = useNavigate();
	const continueShopping = () => {
		navigate("/"); // Redirects user to the homepage
	};

	useEffect(() => {
		fetchCart();
	}, []); // Dependency array left empty to fetch cart on mount

	const fetchCart = async () => {
		try {
			const data = await getCart();
			setCart(data); // Assuming the data structure matches the state structure
		} catch (error) {
			console.error("Failed to fetch cart:", error);
		}
	};

	const handleEditItem = async (itemId, newQuantity) => {
		if (newQuantity < 1) {
			console.error("Quantity must be at least 1");
			return;
		}
		try {
			await editCartItem(itemId, { quantity: newQuantity });
			fetchCart(); // Refresh the cart to reflect the updated quantity
		} catch (error) {
			console.error("Failed to edit item quantity:", error);
		}
	};
	const handleDeleteItem = async (itemId) => {
		try {
			await deleteCartItem(itemId);
			fetchCart(); // Refresh the cart to reflect the item removal
		} catch (error) {
			console.error("Failed to delete item:", error);
		}
	};
	return (
		<div>
			<h2>My Cart</h2>
			{cart.items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<ul>
					{cart.items.map((item) => (
						<li key={item.id}>
							{item.game.name} - ${item.game.price} x {item.quantity}
							<button
								onClick={() => handleEditItem(item.id, item.quantity + 1)}>
								+
							</button>
							<button
								onClick={() =>
									handleEditItem(item.id, Math.max(1, item.quantity - 1))
								}>
								-
							</button>
							<button onClick={() => handleDeleteItem(item.id)}>Remove</button>
							{/* Buttons for editing and deleting items */}
						</li>
					))}
				</ul>
			)}
			<p>Total Price: ${cart.totalPrice}</p>
			<button onClick={continueShopping}>Continue Shopping</button>
		</div>
	);
};

export default CartPage;
