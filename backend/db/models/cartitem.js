"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CartItem extends Model {
		static associate(models) {
			// define association here
			// CartItem to Cart (Many to One)
			CartItem.belongsTo(models.Cart, {
				foreignKey: "cartId",
			});

			// CartItem to Game (Many to One)
			CartItem.belongsTo(models.Game, {
				foreignKey: "gameId",
			});
		}
	}
	CartItem.init(
		{
			cartId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Cart",
					key: "id",
				},
			},
			gameId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Game",
					key: "id",
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
		},
		{
			sequelize,
			modelName: "CartItem",
		}
	);
	return CartItem;
};
