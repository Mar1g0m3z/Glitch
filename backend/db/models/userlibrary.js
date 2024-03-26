"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserLibrary extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			UserLibrary.belongsTo(models.User, { foreignKey: "userId" });
			UserLibrary.belongsTo(models.Game, { foreignKey: "gameId" });
			// define association here
		}
	}
	UserLibrary.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "User", key: "id" },
			},
			gameId: DataTypes.INTEGER,
			purchaseDate: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "UserLibrary",
		}
	);
	return UserLibrary;
};
