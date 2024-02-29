"use strict";

const { Review } = require("../models");
let options = {};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate(
			[
				{
					content:
						"An absolute masterpiece. The open-world, the storyline, the characters - everything is just perfect!",
					rating: true, // Positive review
					userId: 1, // User ID 1
					gameId: 1, // Grand Theft Auto V
				},
				{
					content:
						"The Witcher 3 sets the bar for open-world RPGs. The attention to detail is incredible, and the story is captivating.",
					rating: true, // Positive review
					userId: 2, // User ID 2
					gameId: 2, // The Witcher 3: Wild Hunt
				},
				{
					content:
						"Portal 2 is a mind-bending puzzle game with an engaging narrative. The co-op mode is especially fun!",
					rating: true, // Positive review
					userId: 3, // User ID 3
					gameId: 3, // Portal 2
				},
				{
					content:
						"CS:GO is the ultimate competitive FPS experience. The gameplay mechanics are solid, and the community is active.",
					rating: true, // Positive review
					userId: 4, // User ID 4
					gameId: 4, // Counter-Strike: Global Offensive
				},
				{
					content:
						"Tomb Raider delivers an adrenaline-pumping adventure with stunning visuals and exciting gameplay.",
					rating: true, // Positive review
					userId: 5, // User ID 5
					gameId: 5, // Tomb Raider (2013)
				},
				{
					content:
						"Red Dead Redemption 2 lacks innovation and feels repetitive at times. Disappointed with the overall experience.",
					rating: false, // Negative review
					userId: 6, // User ID 6
					gameId: 9, // Red Dead Redemption 2
				},
				{
					content:
						"BioShock Infinite has a confusing storyline and lacks engaging gameplay elements. Not worth the hype.",
					rating: false, // Negative review
					userId: 7, // User ID 7
					gameId: 10, // BioShock Infinite
				},
				// Add more reviews as needed...
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		return queryInterface.bulkDelete(options, {}, {});
	},
};
