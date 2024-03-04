const express = require("express");
const { Sequelize } = require("sequelize");
const { Game, Review, User } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get("/:gameId", async (req, res) => {
	const { gameId } = req.params;

	try {
		const reviews = await Review.findAll({
			where: { gameId: gameId },
			attributes: ["id", "userId", "gameId", "content", "rating", "createdAt"],
		});

		if (!reviews || reviews.length === 0) {
			return res.status(200).json({ Reviews: [] }); // Return an empty array if no reviews found
		}
		const reviewsWithDetails = await Promise.all(
			reviews.map(async (review) => {
				const user = await User.findByPk(review.userId, {
					attributes: ["id", "username"],
				});

				return {
					id: review.id,
					userId: review.userId,
					gameId: review.gameId,
					content: review.content,
					rating: review.rating,
					createdAt: review.createdAt,

					User: user,
				};
			})
		);

		res.status(200).json({
			Reviews: reviewsWithDetails,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});
router.post("/:gameId", requireAuth, async (req, res) => {
	const { gameId } = req.params;
	const userId = req.user.id;
	const { content, rating } = req.body;

	const game = await Game.findByPk(gameId);
	if (!game) {
		return res.status(404).json({ message: "Game couldn't be found" });
	}

	const existingReview = await Review.findOne({
		where: { userId: userId, gameId: gameId },
	});
	if (existingReview) {
		return res
			.status(403)
			.json({ message: "User already has a review for this spot" });
	}

	const errors = {};
	if (!content) {
		errors.content = "Review text is required";
	}
	if (rating === undefined) {
		errors.rating = "Please choose a rating";
	}
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ message: "Bad Request", errors });
	}

	const newReview = await Review.create({
		userId,
		gameId,
		content,
		rating,
	});

	res.status(201).json(newReview);
});

router.put("/:reviewId", requireAuth, async (req, res) => {
	const { reviewId } = req.params;
	const userId = req.user.id;
	const existingReview = await Review.findByPk(reviewId);

	if (!existingReview) {
		return res.status(404).json({ message: "Review couldn't be found" });
	}

	if (existingReview.userId !== userId) {
		return res.status(403).json({ message: "Unauthorized access to review" });
	}
	const { content, rating } = req.body;

	const errors = {};
	if (!content) errors.content = "Review text is required";
	if (rating === undefined) errors.rating = "Choose a rating.";
	if (Object.keys(errors).length > 0) {
		return res.status(400).json({ message: "Bad Request", errors });
	}

	existingReview.content = content;
	existingReview.rating = rating;

	await existingReview.save();
	res.json(existingReview);
});

router.delete("/:reviewId", requireAuth, async (req, res) => {
	try {
		const { reviewId } = req.params;
		const userId = req.user.id;

		const existingReview = await Review.findByPk(reviewId);

		if (!existingReview) {
			return res.status(404).json({ message: "Review couldn't be found" });
		}

		if (existingReview.userId !== userId) {
			return res.status(403).json({ message: "Unauthorized access to review" });
		}

		await existingReview.destroy();

		res.status(200).json({ message: "Successfully deleted" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
