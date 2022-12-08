const { Sequelize, sequelize } = require("./db.js");

const User = sequelize.define("User", {
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = { User };