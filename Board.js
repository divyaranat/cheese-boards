const { Sequelize, sequelize } = require("./db.js");

const Board = sequelize.define("Board", {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER
});

module.exports = { Board };