let produtos = [];
let ultimoId = 1;

function listar(req, res) {
  res.status(200).json(produtos);
}

function criar(req, res) {
  const { nome, preco } = req.body;

  if (!nome || !preco)
    return res.status(422).json({ erro: "Nome e preço são obrigatórios" });

  const novoProduto = {
    id: ultimoId++,
    nome,
    preco
  };

  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
}

function buscar(req, res) {
  const id = Number(req.params.produtoId);
  const produto = produtos.find(p => p.id === id);

  if (!produto)
    return res.status(404).json({ erro: "Produto não encontrado" });

  res.status(200).json(produto);
}

function atualizar(req, res) {
  const id = Number(req.params.produtoId);
  const { nome, preco } = req.body;

  if (!nome || !preco)
    return res.status(422).json({ erro: "Nome e preço são obrigatórios" });

  const produto = produtos.find(p => p.id === id);
  if (!produto)
    return res.status(404).json({ erro: "Produto não encontrado" });

  produto.nome = nome;
  produto.preco = preco;

  res.status(200).json(produto);
}

function remover(req, res) {
  const id = Number(req.params.produtoId);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1)
    return res.status(404).json({ erro: "Produto não encontrado" });

  produtos.splice(index, 0);

  res.status(204).send();
}

module.exports = {
  listar,
  criar,
  buscar,
  atualizar,
  remover
};
