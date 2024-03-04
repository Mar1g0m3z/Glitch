const express = require("express");

const { Sequelize } = require("sequelize");

const { User, Cart, CartItem, Game } = require("../../db/models");

const { Op } = require("sequelize");

const router = express.Router();

const { requireAuth } = require("../../utils/auth");

async function calculateTotalPrice(cartId) {
	const cartItems = await CartItem.findAll({
		where: { cartId },
		include: [
			{
				model: Game,
				attributes: ["price"],
			},
		],
	});

	let totalPrice = 0;
	cartItems.forEach((item) => {
		totalPrice += item.quantity * item.Game.price;
	});

	return totalPrice.toFixed(2); // Format to two decimal places if needed
}

router.get("/cart", requireAuth, async (req, res) => {
	const userId = req.user.id;

	try {
		const cart = await Cart.findOne({
			where: { userId },
			include: [
				{
					model: CartItem,
					include: [
						{
							model: Game,
							attributes: ["id", "name", "imageUrl", "price"],
						},
					],
				},
			],
		});

		if (!cart) {
			return res.status(404).json({ message: "Cart not found." });
		}

		// Assuming cartItems mapping is done to prepare items data
		const cartItems = cart.CartItems.map((item) => ({
			id: item.id,
			gameId: item.gameId,
			quantity: item.quantity,
			game: {
				name: item.Game.name,
				imageUrl: item.Game.imageUrl,
				price: item.Game.price,
			},
		}));

		// Calculate the total price of items in the cart
		const totalPrice = await calculateTotalPrice(cart.id);

		res.status(200).json({
			cartId: cart.id,
			userId: cart.userId,
			items: cartItems,
			totalPrice, // Include the calculated total price in the response
			createdAt: cart.createdAt,
			updatedAt: cart.updatedAt,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.post("/cart", requireAuth, async (req, res) => {
	const userId = req.user.id;
	let { gameId, quantity } = req.body;

	gameId = parseInt(gameId, 10);
	quantity = parseInt(quantity, 10);

	if (isNaN(gameId) || isNaN(quantity)) {
		return res.status(400).json({ message: "Invalid 'gameId' or 'quantity'." });
	}

	try {
		let cart = await Cart.findOne({ where: { userId } });

		if (!cart) {
			cart = await Cart.create({ userId });
		}

		const game = await Game.findByPk(gameId);
		if (!game) {
			return res.status(404).json({ message: "Game not found." });
		}

		let item = await CartItem.findOne({
			where: { cartId: cart.id, gameId },
		});

		if (item) {
			item.quantity += quantity;
			await item.save();
		} else {
			item = await CartItem.create({
				cartId: cart.id,
				gameId,
				quantity,
			});
		}

		res.status(201).json({
			message: "Item added to cart successfully.",
			item: {
				id: item.id,
				cartId: item.cartId,
				gameId: item.gameId,
				quantity: item.quantity,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Failed to add item to cart.",
			error: error.toString(),
		});
	}
});

router.put("/cart/item/:itemId", requireAuth, async (req, res) => {
	const userId = req.user.id;
	const { itemId } = req.params;
	const { quantity } = req.body;

	try {
		const cart = await Cart.findOne({ where: { userId } });
		if (!cart) return res.status(404).json({ message: "Cart not found." });

		const item = await CartItem.findOne({
			where: { id: itemId, cartId: cart.id },
		});
		if (!item)
			return res.status(404).json({ message: "Item not found in cart." });

		item.quantity = quantity;
		await item.save();

		const totalPrice = await calculateTotalPrice(cart.id);

		res.json({ message: "Item updated successfully", item, totalPrice });
	} catch (error) {
		res.status(500).json({
			message: "Failed to update item in cart.",
			error: error.message,
		});
	}
});

router.delete("/cart/item/:itemId", requireAuth, async (req, res) => {
	const userId = req.user.id;
	const { itemId } = req.params;

	try {
		const cart = await Cart.findOne({ where: { userId } });
		if (!cart) return res.status(404).json({ message: "Cart not found." });

		const item = await CartItem.findOne({
			where: { id: itemId, cartId: cart.id },
		});
		if (!item)
			return res.status(404).json({ message: "Item not found in cart." });

		await item.destroy();

		const totalPrice = await calculateTotalPrice(cart.id);

		res
			.status(200)
			.json({ message: "Item deleted successfully from cart.", totalPrice });
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete item from cart.",
			error: error.message,
		});
	}
});

module.exports = router;
