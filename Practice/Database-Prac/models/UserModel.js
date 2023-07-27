const {DataTypes} = require("sequelize")

const dbClient = require("../lib/db-conn.js");
const Post = require("./PostModel.js");

const User = dbClient.define(
	"User",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

/* You shoud create associations in the same place */
/* Both foreign keys stay on the Post table. This is weird for me though! */

User.hasMany(Post, {
  foreignKey: "postUserId"
})

Post.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
})

module.exports = User;