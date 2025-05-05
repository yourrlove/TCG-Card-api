const express = require('express');
const router = express.Router();
const api = express();

const authRouter = require("./auth");
const userRouter = require("./users");
const cardRouter = require("./cards");

api.use("/auth", authRouter);
api.use("/users", userRouter);
api.use("/cards", cardRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = api;
