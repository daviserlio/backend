// index.js
const express = require('express');
const app = express();

// Array em memória
let tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware para interpretar JSON no body
app.use(express.json());

// Middleware de log (data/hora, método, URL)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Router para /tarefas
const router = express.Router();

// GET /tarefas -> lista todas
router.get('/', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas -> cria nova
router.post('/', (req, res) => {
  const { nome, concluida } = req.body;
  const nova = {
    id: tarefas.length ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
    nome: nome || 'Tarefa sem nome',
    concluida: !!concluida
  };
  tarefas.push(nova);
  res.status(201).json(nova);
});

// GET /tarefas/:tarefaId -> busca pelo id
router.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId, 10);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error('Tarefa não localizada'));
  res.json(tarefa);
});

// PUT /tarefas/:tarefaId -> atualiza
router.put('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId, 10);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error('Tarefa não localizada'));
  const { nome, concluida } = req.body;
  if (nome !== undefined) tarefa.nome = nome;
  if (concluida !== undefined) tarefa.concluida = !!concluida;
  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId -> remove
router.delete('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId, 10);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return next(new Error('Tarefa não localizada'));
  tarefas.splice(index, 1);
  res.status(204).send();
});

// registra o router em /tarefas
app.use('/tarefas', router);

// middleware de erro (responde JSON com código 400)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ erro: err.message });
});

// iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// exporta app (opcional)
module.exports = app;
