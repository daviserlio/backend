const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

exports.criar = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};

exports.listar = async (req, res) => {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
};

exports.buscar = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  try {
    const produtoEncontrado = await Produto.findOne({ _id: req.params.id });

    if (!produtoEncontrado) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    req.produto = produtoEncontrado;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
};

exports.exibir = (req, res) => {
  res.status(200).json(req.produto);
};

exports.atualizar = async (req, res) => {

  if (Object.keys(req.body).length === 0) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }

  try {
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(produtoAtualizado);
  } catch (err) {
    
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};

exports.remover = async (req, res) => {
  await Produto.findOneAndDelete({ _id: req.params.id });
  res.status(204).send();
};