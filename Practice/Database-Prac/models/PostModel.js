const {DataTypes} = require("sequelize")

const dbClient = require("../lib/db-conn.js");

const Post = dbClient.define(
	"Post",
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Post;