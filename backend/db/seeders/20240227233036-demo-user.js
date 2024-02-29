"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await User.bulkCreate(
			[
				{
					email: "demo@user.io",
					username: "Demo-lition",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password2"),
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password3"),
				},
				{
					email: "cyberwarrior23@gmail.com",
					username: "CyberWarrior",
					hashedPassword: bcrypt.hashSync("cyberSec@rity"),
				},
				{
					email: "wanderlustgamer@email.com",
					username: "WanderlustGamer",
					hashedPassword: bcrypt.hashSync("adventur3r"),
				},
				{
					email: "cosmicgamer@universe.net",
					username: "CosmicGamer",
					hashedPassword: bcrypt.hashSync("sp@ceGame1"),
				},
				{
					email: "wizardlygamer@magicrealm.com",
					username: "WizardlyGamer",
					hashedPassword: bcrypt.hashSync("mysticP0w3r"),
				},
				{
					email: "steampunkgamer@clockworks.io",
					username: "SteampunkGamer",
					hashedPassword: bcrypt.hashSync("brassandg3ars"),
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, {}, {});
	},
};
