const express = require('express');
const router = express.Router();
const api = express();

const authRouter = require("./auth");
const userRouter = require("./users");
const cardRouter = require("./cards");
const collectionRouter = require("./collections");

api.use("/auth", authRouter);
api.use("/users", userRouter);
api.use("/cards", cardRouter);
api.use("/collections", collectionRouter);

module.exports = api;
