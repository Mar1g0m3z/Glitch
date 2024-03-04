("use strict");
const { Game } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
const { fetchGames, fetchGame } = require("../../utils/rawg");
// Function to generate a random price within a specified range
function generateRandomPrice(min, max) {
	return (Math.random() * (max - min) + min).toFixed(2); // Generates a random price between min and max
}

module.exports = {
	async up(queryInterface, Sequelize) {
		for (let page = 1; page <= 10; page++) {
			await fetchGames(page).then((res) => {
				const games = res.results;
				Promise.all(
					games.map(async (game) => {
						return {
							name: game.name,
							description: await fetchGame(game.id).then((gameDetails) => {
								return gameDetails.description;
							}),
							imageUrl: game.background_image,
							price: generateRandomPrice(10, 60), // Generate a random price between $10 and $60
						};
					})
				).then((mappedGames) => {
					Game.bulkCreate(mappedGames);
				});
			});
		}
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Games";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {}, {});
	},
};
