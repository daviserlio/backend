require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');

const produtosRouter = require('./routes/produtosRouter');

const app = express();


const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri)
  .then(() => console.log("Conectado ao MongoDB Atlas com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/produtos', produtosRouter);

module.exports = app;
