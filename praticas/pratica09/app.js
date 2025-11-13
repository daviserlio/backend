const express = require('express');
const cookieParser = require('cookie-parser');

const apidocsRouter = require('./routes/apidocsRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', apidocsRouter);
app.use('/produtos', produtosRouter);

module.exports = app;
