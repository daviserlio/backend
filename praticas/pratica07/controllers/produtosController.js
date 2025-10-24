const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

const criar = async (req, res) => {
  try {
    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco
    });
    res.status(201).json(novoProduto);
  } catch {
    res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
};

const listar = async (req, res) => {
  const produtos = await Produto.find({});
  res.status(200).json(produtos);
};

const buscar = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }
  const produto = await Produto.findById(id);
  if (!produto) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }
  req.produto = produto;
  next();
};

const exibir = (req, res) => res.status(200).json(req.produto);

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    await Produto.updateOne({ _id: id }, req.body);
    res.status(200).json({ _id: id, ...req.body });
  } catch {
    res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
};

const remover = async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

module.exports = { criar, listar, buscar, exibir, atualizar, remover };
