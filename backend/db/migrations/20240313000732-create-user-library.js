"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"UserLibraries",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Users", // Name of the Users table
						key: "id",
					},

					onDelete: "CASCADE",
				},
				gameId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Games", // Name of the Games table
						key: "id",
					},

					onDelete: "CASCADE",
				},
				purchaseDate: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "UserLibraries";
		return queryInterface.dropTable(options);
	},
};
