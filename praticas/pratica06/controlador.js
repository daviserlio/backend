
const Tarefa = require('./modelo');

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);
  await tarefa.init();
  await tarefa.inserir();
  return tarefa;
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  const encontrado = await tarefa.buscar();
  return encontrado ? tarefa : null;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  const encontrado = await tarefa.buscar();
  if (!encontrado) return null;
  
  tarefa.concluida = (concluida === 'true' || concluida === true);
  await tarefa.alterar();
  return tarefa;
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  const encontrado = await tarefa.buscar();
  if (!encontrado) return false;
  await tarefa.deletar();
  return true;
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};
