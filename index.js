const { User } = require("./User.js");
const { Board } = require("./Board.js");
const { Cheese } = require("./Cheese.js");

User.hasMany(Board);
Board.belongsTo(User);
Board.belongsToMany(Cheese, { through: "BoardCheese" });
Cheese.belongsToMany(Board, { through: "BoardCheese" });

module.exports = { User, Board, Cheese };