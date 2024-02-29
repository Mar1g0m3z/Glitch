"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Review.belongsTo(models.Game, {
				foreignKey: "gameId",
			});
			Review.belongsTo(models.User, {
				foreignKey: "userId",
			});
			// define association here
		}
	}
	Review.init(
		{
			content: DataTypes.STRING,
			rating: DataTypes.BOOLEAN,
			userId: {
				type: DataTypes.INTEGER,
				references: { model: "User", key: "id" },
			},
			gameId: {
				type: DataTypes.INTEGER,
				references: { model: "Game", key: "id" },
			},
		},
		{
			sequelize,
			modelName: "Review",
		}
	);
	return Review;
};
