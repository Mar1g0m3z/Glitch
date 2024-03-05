import { csrfFetch } from "../store/csrf";

// Fetch the user's cart
export async function getCart() {
	const response = await csrfFetch(`/api/user/cart`, {
		method: "GET",
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error("Failed to fetch cart.");
	}
}

// Add an item to the cart
export async function addItemToCart({ gameId, quantity }) {
	const response = await csrfFetch(`/api/user/cart`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			gameId,
			quantity,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		window.dispatchEvent(new CustomEvent("cartUpdated"));
		return data;
	} else {
		throw new Error("Failed to add item to cart.");
	}
}

// Edit an item in the cart (e.g., change quantity)
export async function editCartItem(itemId, { quantity }) {
	const response = await csrfFetch(`/api/user/cart/item/${itemId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			quantity,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		window.dispatchEvent(new CustomEvent("cartUpdated"));
		return data;
	} else {
		throw new Error("Failed to update item in cart.");
	}
}

// Delete an item from the cart
export async function deleteCartItem(itemId) {
	const response = await csrfFetch(`/api/user/cart/item/${itemId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		window.dispatchEvent(new CustomEvent("cartUpdated"));
		return true;
	} else {
		throw new Error("Failed to delete item from cart.");
	}
}
