"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Games",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				description: {
					type: Sequelize.STRING,
				},
				imageUrl: {
					type: Sequelize.STRING,
				},
				price: {
					type: Sequelize.DECIMAL(10, 2), // Add the price attribute
					allowNull: false,
					defaultValue: 0,
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
		options.tableName = "Games";
		await queryInterface.dropTable(options);
	},
};
