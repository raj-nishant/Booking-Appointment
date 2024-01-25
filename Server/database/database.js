const { Sequelize } = require("sequelize"); //This will be a constructor function
const sequelize = new Sequelize("node-app", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
