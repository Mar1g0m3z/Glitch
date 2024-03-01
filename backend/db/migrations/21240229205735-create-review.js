"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Reviews",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				content: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				rating: {
					type: Sequelize.BOOLEAN,
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Users",
						key: "id",
					},
					onDelete: "CASCADE",
				},
				gameId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Games",
						key: "id",
					},
					onDelete: "CASCADE",
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
		options.tableName = "Reviews";
		await queryInterface.dropTable(options);
	},
};
