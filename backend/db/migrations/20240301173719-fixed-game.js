"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn(
			"Games",
			"description",
			{
				type: Sequelize.TEXT,
			},
			options
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn(
			"Games",
			"description",
			{
				type: Sequelize.STRING,
			},
			options
		);
	},
};
