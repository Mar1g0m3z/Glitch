const express = require("express");
// const { fetchGames, fetchGame } = require("../../utils/rawg");
const { Game } = require("../../db/models");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const games = await Game.findAll({
			attributes: ["id", "name", "description", "imageUrl", "price"],
		});

		res.status(200).json({ Games: games });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/:gameId", async (req, res) => {
	try {
		const gameId = req.params.gameId;
		const game = await Game.findByPk(gameId, {
			attributes: ["id", "name", "description", "imageUrl", "price"],
		});
		res.status(200).json({ Game: game });
	} catch (error) {
		res.status(500).json({ message: "game not found" });
	}
});
module.exports = router;
