"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Review, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
			User.hasOne(models.Cart, {
				foreignKey: "userId",
			});
			User.hasOne(models.UserLibrary, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
			// define association here
		}
	}

	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
		}
	);
	return User;
};
