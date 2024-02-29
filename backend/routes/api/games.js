const express = require("express");
const { fetchGames, fetchGame } = require("../../utils/rawg");

const router = express.Router();

router.get("/", (req, res) => {
	fetchGames(1).then((games) => {
		return res.json(games);
	});
});

router.get("/:gameId", (req, res) => {
	try {
		const gameId = req.params.gameId;
		fetchGame(gameId).then((game) => {
			return res.json(game);
		});
	} catch (error) {
		res.status(500).json({ message: "game not found" });
	}
});
module.exports = router;
