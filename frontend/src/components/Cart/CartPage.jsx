import { useEffect, useState } from "react";
import {
	getCart,
	editCartItem,
	deleteCartItem,
} from "../../services/cart-service";

import { addToUserLibrary } from "../../services/library-service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CartPage.css";

const CartPage = () => {
	const [showError, setShowError] = useState(false);
	const [cart, setCart] = useState({ items: [], totalPrice: 0 });
	const [checkoutCompleted, setCheckoutCompleted] = useState(false);
	const navigate = useNavigate();
	const continueShopping = () => {
		navigate("/"); // Redirects user to the homepage
	};

	const sessionUser = useSelector((state) => state.session.user); // Example selector, adjust based on your state shape

	useEffect(() => {
		// Check if there's a logged-in user
		if (!sessionUser) {
			navigate("/"); // Redirect to home if no user is logged in
		} else {
			fetchCart();
		}
	}, [sessionUser, navigate]);

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

	const handleCheckout = async () => {
		if (cart.items.length === 0) {
			setShowError(true); // Show error message if cart is empty
			// Optionally clear the error message after a delay
			setTimeout(() => setShowError(false), 3000);
			return;
		}
		try {
			await addToUserLibrary(cart.items.map((item) => item.gameId));
			// Assuming editCartItem and deleteCartItem can modify the backend
			// Iterate over all items in the cart and delete them using deleteCartItem
			for (const item of cart.items) {
				await deleteCartItem(item.id);
			}
			// After all items are deleted, reset the cart state
			setCart({ items: [], totalPrice: 0 });
			// Set checkoutCompleted to true to show any post-checkout message if you plan to use it
			setCheckoutCompleted(true);
		} catch (error) {
			console.error("Failed to clear the cart:", error);
		}
	};
	const viewLibrary = () => {
		navigate("/library"); // Assuming '/library' is the route to the user's library
		setCheckoutCompleted(false);
	};
	return (
		<div>
			<div className="cart-box">
				<h2>My Cart</h2>
				{checkoutCompleted ? (
					<>
						<p>Thank you for your purchase!</p>
						<button onClick={viewLibrary}>View Your Library</button>
					</>
				) : cart.items.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<ul className="cart-items">
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
								<button onClick={() => handleDeleteItem(item.id)}>
									Remove
								</button>
								{/* Buttons for editing and deleting items */}
							</li>
						))}
					</ul>
				)}
				<p>Total Price: ${cart.totalPrice}</p>
				{showError && <p className="error-message">No items to purchase.</p>}
				{!checkoutCompleted && (
					<button
						className="checkout"
						onClick={handleCheckout}>
						Checkout
					</button>
				)}
				<button
					className="keep-shopping"
					onClick={continueShopping}>
					Continue Shopping
				</button>
			</div>
		</div>
	);
};

export default CartPage;
