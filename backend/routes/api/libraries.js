const express = require("express");
const { UserLibrary, Cart, Game } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

router.get("/", requireAuth, async (req, res) => {
	const userId = req.user.id; // Using req.user.id to get the user ID

	try {
		// Fetch the user's library items
		const libraryItems = await UserLibrary.findAll({
			where: { userId },
			include: [
				{
					model: Game,
					attributes: ["id", "name", "imageUrl"],
				},
			],
		});

		// Return the library items
		res.json({
			success: true,
			libraryItems,
		});
	} catch (error) {
		console.error("Error fetching user library:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
});
router.post("/checkout", requireAuth, async (req, res) => {
	const userId = req.user.id; // Using req.user.id to get the user ID

	try {
		// Find the cart for the user
		const cart = await Cart.findOne({
			where: { userId },
			include: "CartItems",
		});
		console.log(cart);
		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		// Extract gameIds from the cart items
		const gameIds = cart.CartItems.map((item) => item.gameId);

		// Bulk create user library entries for the games in the cart
		await UserLibrary.bulkCreate(
			gameIds.map((gameId) => ({
				userId,
				gameId,
				purchaseDate: new Date(), // Assuming you want to record the purchase date
			}))
		);

		res.status(200).json({ message: "Games added to library successfully" });
	} catch (error) {
		console.error("Error during checkout:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
