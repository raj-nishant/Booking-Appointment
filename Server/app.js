const express = require("express");
const app = express();
const sequelize = require("./database/database");
const bodyparser = require("body-parser");
const router = require("./router/router");
const cors = require("cors");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(router);
sequelize
  .sync()
  .then((res) => app.listen(5000))
  .catch((err) => console.log(err, "error"));
