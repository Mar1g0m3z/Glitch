"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"CartItems",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				cartId: {
					type: Sequelize.INTEGER,
				},
				gameId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Games",
						key: "id",
					},
				},
				quantity: {
					type: Sequelize.INTEGER,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "CartItems";
		await queryInterface.dropTable(options);
	},
};
