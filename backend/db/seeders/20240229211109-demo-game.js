("use strict");
const { Game } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
const { fetchGames, fetchGame } = require("../../utils/rawg");
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
