require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var app = express();

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

const apidocsRouter = require("./routes/apidocsRouter");
const usuariosRouter = require("./routes/usuariosRouter");

app.use("/api-docs", apidocsRouter);
app.use("/usuarios", usuariosRouter);

module.exports = app;
